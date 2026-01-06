-- Function to find nearby online drivers
CREATE OR REPLACE FUNCTION find_nearby_drivers(
  p_pickup_lat DOUBLE PRECISION,
  p_pickup_lng DOUBLE PRECISION,
  p_radius_miles DOUBLE PRECISION DEFAULT 10,
  p_vehicle_type vehicle_type DEFAULT NULL
)
RETURNS TABLE (
  driver_id UUID,
  user_id UUID,
  full_name TEXT,
  vehicle_type vehicle_type,
  vehicle_make TEXT,
  vehicle_model TEXT,
  rating DECIMAL,
  tier driver_tier,
  distance_miles DOUBLE PRECISION
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    dp.id AS driver_id,
    dp.user_id,
    u.full_name,
    dp.vehicle_type,
    dp.vehicle_make,
    dp.vehicle_model,
    dp.rating,
    dp.tier,
    ST_Distance(
      dp.current_location::geography,
      ST_SetSRID(ST_MakePoint(p_pickup_lng, p_pickup_lat), 4326)::geography
    ) / 1609.344 AS distance_miles -- Convert meters to miles
  FROM public.driver_profiles dp
  JOIN public.users u ON u.id = dp.user_id
  WHERE
    dp.is_online = TRUE
    AND dp.is_approved = TRUE
    AND dp.current_location IS NOT NULL
    AND ST_DWithin(
      dp.current_location::geography,
      ST_SetSRID(ST_MakePoint(p_pickup_lng, p_pickup_lat), 4326)::geography,
      p_radius_miles * 1609.344 -- Convert miles to meters
    )
    AND (p_vehicle_type IS NULL OR dp.vehicle_type = p_vehicle_type)
  ORDER BY
    dp.tier DESC, -- Platinum first
    distance_miles ASC,
    dp.rating DESC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql STABLE;
