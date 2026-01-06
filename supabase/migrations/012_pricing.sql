-- Function to calculate order pricing
-- Returns: base_price_cents, platform_fee_cents, driver_payout_cents, total_cents
CREATE OR REPLACE FUNCTION calculate_pricing(
  p_load_size load_size,
  p_estimated_hours DECIMAL
)
RETURNS TABLE (
  base_price_cents INTEGER,
  platform_fee_cents INTEGER,
  driver_payout_cents INTEGER,
  total_cents INTEGER
) AS $$
DECLARE
  hourly_rate INTEGER;
  hours_to_bill DECIMAL;
  base INTEGER;
  platform INTEGER;
  driver INTEGER;
BEGIN
  -- Pricing matrix (in cents per hour)
  hourly_rate := CASE p_load_size
    WHEN 'light' THEN 8900   -- $89.00
    WHEN 'medium' THEN 14900 -- $149.00
    WHEN 'heavy' THEN 24900  -- $249.00
    ELSE 14900 -- Default to medium
  END;

  -- Minimum 2 hours
  hours_to_bill := GREATEST(p_estimated_hours, 2);

  -- Calculate amounts
  base := (hourly_rate * hours_to_bill)::INTEGER;
  platform := (base * 0.25)::INTEGER; -- 25% platform fee
  driver := base - platform; -- 75% to driver

  RETURN QUERY SELECT base, platform, driver, base;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Example usage:
-- SELECT * FROM calculate_pricing('medium', 2.5);
