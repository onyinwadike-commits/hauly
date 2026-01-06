import { supabase } from '../client';
import type { DriverProfile, VehicleType, Order, DriverTier } from '@hauly/types';

export interface NearbyDriver {
  driver_id: string;
  user_id: string;
  full_name: string;
  vehicle_type: VehicleType;
  vehicle_make: string;
  vehicle_model: string;
  rating: number;
  tier: DriverTier;
  distance_miles: number;
}

export async function getDriverProfile(): Promise<DriverProfile | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('driver_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data as DriverProfile | null;
}

export async function updateDriverLocation(latitude: number, longitude: number) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await (supabase
    .from('driver_profiles') as any)
    .update({
      current_location: `POINT(${longitude} ${latitude})`,
      last_location_update: new Date().toISOString()
    })
    .eq('user_id', user.id);

  if (error) throw error;
}

export async function setOnlineStatus(isOnline: boolean) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await (supabase
    .from('driver_profiles') as any)
    .update({ is_online: isOnline })
    .eq('user_id', user.id);

  if (error) throw error;
}

export async function getAvailableJobs(
  latitude: number,
  longitude: number,
  radiusMiles: number = 10
): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('status', 'requested')
    .order('scheduled_date', { ascending: true });

  // Note: Distance filtering is done client-side for now
  // In production, use PostGIS ST_DWithin

  if (error) throw error;
  return data as Order[];
}

export async function acceptJob(orderId: string): Promise<Order> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await (supabase
    .from('orders') as any)
    .update({
      driver_id: user.id,
      status: 'accepted',
      accepted_at: new Date().toISOString()
    })
    .eq('id', orderId)
    .eq('status', 'requested')
    .select()
    .single();

  if (error) throw error;
  return data as Order;
}

export async function findNearbyDrivers(
  latitude: number,
  longitude: number,
  radiusMiles: number = 10,
  vehicleType?: VehicleType
): Promise<NearbyDriver[]> {
  const { data, error } = await (supabase.rpc as any)('find_nearby_drivers', {
    p_pickup_lat: latitude,
    p_pickup_lng: longitude,
    p_radius_miles: radiusMiles,
    p_vehicle_type: vehicleType
  });

  if (error) throw error;
  return data as NearbyDriver[];
}
