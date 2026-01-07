const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api';

// Types
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface GeocodingResult {
  formatted_address: string;
  coordinates: Coordinates;
  place_id: string;
  address_components: {
    street_number?: string;
    route?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
}

export interface DistanceResult {
  distance: {
    text: string;
    value: number; // meters
  };
  duration: {
    text: string;
    value: number; // seconds
  };
}

export interface DirectionsResult {
  distance: DistanceResult['distance'];
  duration: DistanceResult['duration'];
  polyline: string;
  steps: Array<{
    instruction: string;
    distance: string;
    duration: string;
  }>;
}

// Geocoding - Address to Coordinates
export async function geocodeAddress(address: string): Promise<GeocodingResult | null> {
  if (!GOOGLE_MAPS_API_KEY) {
    console.warn('Google Maps API key not configured');
    return null;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();

    if (data.status !== 'OK' || !data.results[0]) {
      console.warn('Geocoding failed:', data.status);
      return null;
    }

    const result = data.results[0];
    const components = result.address_components.reduce((acc: any, comp: any) => {
      if (comp.types.includes('street_number')) acc.street_number = comp.short_name;
      if (comp.types.includes('route')) acc.route = comp.short_name;
      if (comp.types.includes('locality')) acc.city = comp.short_name;
      if (comp.types.includes('administrative_area_level_1')) acc.state = comp.short_name;
      if (comp.types.includes('postal_code')) acc.zip = comp.short_name;
      if (comp.types.includes('country')) acc.country = comp.short_name;
      return acc;
    }, {});

    return {
      formatted_address: result.formatted_address,
      coordinates: {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
      },
      place_id: result.place_id,
      address_components: components,
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
}

// Reverse Geocoding - Coordinates to Address
export async function reverseGeocode(coords: Coordinates): Promise<GeocodingResult | null> {
  if (!GOOGLE_MAPS_API_KEY) return null;

  try {
    const response = await fetch(
      `${BASE_URL}/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();

    if (data.status !== 'OK' || !data.results[0]) {
      return null;
    }

    const result = data.results[0];
    return {
      formatted_address: result.formatted_address,
      coordinates: coords,
      place_id: result.place_id,
      address_components: {},
    };
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    throw error;
  }
}

// Distance Matrix - Calculate distance and duration
export async function getDistanceMatrix(
  origin: Coordinates | string,
  destination: Coordinates | string
): Promise<DistanceResult | null> {
  if (!GOOGLE_MAPS_API_KEY) return null;

  const originStr = typeof origin === 'string'
    ? origin
    : `${origin.lat},${origin.lng}`;
  const destStr = typeof destination === 'string'
    ? destination
    : `${destination.lat},${destination.lng}`;

  try {
    const response = await fetch(
      `${BASE_URL}/distancematrix/json?origins=${encodeURIComponent(originStr)}&destinations=${encodeURIComponent(destStr)}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();

    if (data.status !== 'OK' || !data.rows[0]?.elements[0]) {
      return null;
    }

    const element = data.rows[0].elements[0];
    if (element.status !== 'OK') {
      return null;
    }

    return {
      distance: element.distance,
      duration: element.duration,
    };
  } catch (error) {
    console.error('Distance matrix error:', error);
    throw error;
  }
}

// Directions - Get route with polyline
export async function getDirections(
  origin: Coordinates | string,
  destination: Coordinates | string,
  waypoints?: Array<Coordinates | string>
): Promise<DirectionsResult | null> {
  if (!GOOGLE_MAPS_API_KEY) return null;

  const originStr = typeof origin === 'string'
    ? origin
    : `${origin.lat},${origin.lng}`;
  const destStr = typeof destination === 'string'
    ? destination
    : `${destination.lat},${destination.lng}`;

  let url = `${BASE_URL}/directions/json?origin=${encodeURIComponent(originStr)}&destination=${encodeURIComponent(destStr)}&key=${GOOGLE_MAPS_API_KEY}`;

  if (waypoints && waypoints.length > 0) {
    const waypointStr = waypoints
      .map((wp) => (typeof wp === 'string' ? wp : `${wp.lat},${wp.lng}`))
      .join('|');
    url += `&waypoints=${encodeURIComponent(waypointStr)}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK' || !data.routes[0]) {
      return null;
    }

    const route = data.routes[0];
    const leg = route.legs[0];

    return {
      distance: leg.distance,
      duration: leg.duration,
      polyline: route.overview_polyline.points,
      steps: leg.steps.map((step: any) => ({
        instruction: step.html_instructions.replace(/<[^>]*>/g, ''),
        distance: step.distance.text,
        duration: step.duration.text,
      })),
    };
  } catch (error) {
    console.error('Directions error:', error);
    throw error;
  }
}

// Calculate ETA
export async function calculateETA(
  driverLocation: Coordinates,
  destination: Coordinates
): Promise<{ eta: string; minutes: number } | null> {
  const result = await getDistanceMatrix(driverLocation, destination);
  if (!result) return null;

  const minutes = Math.ceil(result.duration.value / 60);
  const arrivalTime = new Date(Date.now() + result.duration.value * 1000);
  const eta = arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return { eta, minutes };
}

// Validate address exists
export async function validateAddress(address: string): Promise<boolean> {
  const result = await geocodeAddress(address);
  return result !== null;
}

// Get place details
export async function getPlaceDetails(placeId: string): Promise<any> {
  if (!GOOGLE_MAPS_API_KEY) return null;

  try {
    const response = await fetch(
      `${BASE_URL}/place/details/json?place_id=${placeId}&fields=name,formatted_address,geometry,formatted_phone_number,opening_hours&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();

    if (data.status !== 'OK') {
      return null;
    }

    return data.result;
  } catch (error) {
    console.error('Place details error:', error);
    throw error;
  }
}
