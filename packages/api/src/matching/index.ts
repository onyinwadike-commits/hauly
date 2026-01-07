import { createServerClient } from '../client';
import { getDistanceMatrix, Coordinates } from '../maps';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DriverRow = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OrderRow = any;

interface MatchedDriver {
  userId: string;
  driverProfileId: string;
  name: string;
  rating: number;
  totalJobs: number;
  tier: string;
  vehicleType: string;
  distance: number;
  eta: number;
  score: number;
}

interface MatchingCriteria {
  pickupLocation: Coordinates;
  loadSize: 'light' | 'medium' | 'heavy';
  serviceType: string;
  scheduledDate: string;
  scheduledTimeStart: string;
  maxDistanceKm?: number;
  preferredTier?: string;
}

// Matching weights
const WEIGHTS = {
  distance: 0.35,      // Closer is better
  rating: 0.25,        // Higher rating is better
  experience: 0.15,    // More jobs is better
  tier: 0.15,          // Higher tier is better
  availability: 0.10,  // Recently active is better
};

// Tier scores
const TIER_SCORES: Record<string, number> = {
  platinum: 100,
  gold: 75,
  silver: 50,
  bronze: 25,
};

// Vehicle type requirements
const VEHICLE_REQUIREMENTS: Record<string, string[]> = {
  light: ['pickup_truck', 'cargo_van', 'box_truck'],
  medium: ['cargo_van', 'box_truck'],
  heavy: ['box_truck'],
};

export async function findBestDrivers(
  criteria: MatchingCriteria,
  limit: number = 5
): Promise<MatchedDriver[]> {
  const supabaseAdmin = createServerClient();
  const maxDistance = criteria.maxDistanceKm || 25; // Default 25km radius

  // Get all online, approved drivers with compatible vehicles
  const compatibleVehicles = VEHICLE_REQUIREMENTS[criteria.loadSize];

  const { data, error } = await supabaseAdmin
    .from('driver_profiles')
    .select(`
      *,
      user:users!driver_profiles_user_id_fkey(id, full_name, phone)
    `)
    .eq('is_online', true)
    .eq('is_approved', true)
    .eq('stripe_account_status', 'active')
    .in('vehicle_type', compatibleVehicles);

  const drivers = data as DriverRow[] | null;

  if (error || !drivers || drivers.length === 0) {
    console.log('No available drivers found');
    return [];
  }

  // Calculate scores for each driver
  const scoredDrivers: MatchedDriver[] = [];

  for (const driver of drivers) {
    // Parse driver location
    if (!driver.current_location) continue;

    const driverCoords = parsePostGISPoint(driver.current_location);
    if (!driverCoords) continue;

    // Get distance and ETA
    const distanceResult = await getDistanceMatrix(driverCoords, criteria.pickupLocation);
    if (!distanceResult) continue;

    const distanceKm = distanceResult.distance.value / 1000;
    const etaMinutes = Math.ceil(distanceResult.duration.value / 60);

    // Skip if too far
    if (distanceKm > maxDistance) continue;

    // Calculate component scores (0-100)
    const distanceScore = Math.max(0, 100 - (distanceKm / maxDistance) * 100);
    const ratingScore = ((driver.rating as number) / 5) * 100;
    const experienceScore = Math.min(100, ((driver.total_jobs as number) / 100) * 100);
    const tierScore = TIER_SCORES[driver.tier as string] || 0;
    const availabilityScore = calculateAvailabilityScore(driver.last_active_at as string | null);

    // Calculate weighted total score
    const totalScore =
      distanceScore * WEIGHTS.distance +
      ratingScore * WEIGHTS.rating +
      experienceScore * WEIGHTS.experience +
      tierScore * WEIGHTS.tier +
      availabilityScore * WEIGHTS.availability;

    scoredDrivers.push({
      userId: driver.user_id as string,
      driverProfileId: driver.id as string,
      name: (driver as any).user?.full_name || 'Unknown',
      rating: driver.rating as number,
      totalJobs: driver.total_jobs as number,
      tier: driver.tier as string,
      vehicleType: driver.vehicle_type as string,
      distance: distanceKm,
      eta: etaMinutes,
      score: totalScore,
    });
  }

  // Sort by score (highest first) and return top N
  return scoredDrivers
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// Auto-match and assign driver to order
export async function autoMatchDriver(orderId: string): Promise<MatchedDriver | null> {
  const supabaseAdmin = createServerClient();

  // Get order details
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  const order = data as OrderRow | null;

  if (error || !order) {
    console.error('Order not found:', orderId);
    return null;
  }

  // Parse pickup location
  const pickupCoords = parsePostGISPoint(order.pickup_location as string | null);
  if (!pickupCoords) {
    console.error('Invalid pickup location for order:', orderId);
    return null;
  }

  // Find best drivers
  const drivers = await findBestDrivers({
    pickupLocation: pickupCoords,
    loadSize: order.load_size as 'light' | 'medium' | 'heavy',
    serviceType: order.service_type as string,
    scheduledDate: order.scheduled_date as string,
    scheduledTimeStart: order.scheduled_time_start as string,
  });

  if (drivers.length === 0) {
    console.log('No drivers available for order:', orderId);
    return null;
  }

  // Assign best driver
  const bestDriver = drivers[0];

  const { error: updateError } = await (supabaseAdmin
    .from('orders') as any)
    .update({
      driver_id: bestDriver.userId,
      status: 'matched',
      matched_at: new Date().toISOString(),
    })
    .eq('id', orderId);

  if (updateError) {
    console.error('Failed to assign driver:', updateError);
    return null;
  }

  console.log(`Order ${orderId} matched with driver ${bestDriver.name}`);
  return bestDriver;
}

// Broadcast job to nearby drivers (for manual acceptance)
export async function broadcastToNearbyDrivers(
  orderId: string,
  radiusKm: number = 15
): Promise<string[]> {
  const supabaseAdmin = createServerClient();

  const { data } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  const order = data as OrderRow | null;

  if (!order) return [];

  const pickupCoords = parsePostGISPoint(order.pickup_location as string | null);
  if (!pickupCoords) return [];

  const drivers = await findBestDrivers(
    {
      pickupLocation: pickupCoords,
      loadSize: order.load_size as 'light' | 'medium' | 'heavy',
      serviceType: order.service_type as string,
      scheduledDate: order.scheduled_date as string,
      scheduledTimeStart: order.scheduled_time_start as string,
      maxDistanceKm: radiusKm,
    },
    20 // Get up to 20 nearby drivers
  );

  return drivers.map((d) => d.userId);
}

// Helper: Parse PostGIS POINT to coordinates
function parsePostGISPoint(point: string | null): Coordinates | null {
  if (!point) return null;

  // Format: "POINT(lng lat)" or "(lng,lat)"
  const match = point.match(/POINT\(([-\d.]+)\s+([-\d.]+)\)/);
  if (match) {
    return {
      lng: parseFloat(match[1]),
      lat: parseFloat(match[2]),
    };
  }

  return null;
}

// Helper: Calculate availability score based on last activity
function calculateAvailabilityScore(lastActiveAt: string | null): number {
  if (!lastActiveAt) return 0;

  const lastActive = new Date(lastActiveAt);
  const now = new Date();
  const minutesAgo = (now.getTime() - lastActive.getTime()) / (1000 * 60);

  // Active in last 5 minutes = 100, drops off after that
  if (minutesAgo <= 5) return 100;
  if (minutesAgo <= 15) return 80;
  if (minutesAgo <= 30) return 60;
  if (minutesAgo <= 60) return 40;
  return 20;
}

export type { MatchedDriver, MatchingCriteria };
