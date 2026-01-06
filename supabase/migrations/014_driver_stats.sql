-- Function to update driver statistics after job completion
CREATE OR REPLACE FUNCTION update_driver_stats(p_driver_id UUID)
RETURNS VOID AS $$
DECLARE
  v_total_jobs INTEGER;
  v_total_earnings BIGINT;
  v_avg_rating DECIMAL;
  v_new_tier driver_tier;
BEGIN
  -- Calculate totals from completed orders
  SELECT
    COUNT(*),
    COALESCE(SUM(driver_payout_cents + tip_cents), 0)
  INTO v_total_jobs, v_total_earnings
  FROM public.orders
  WHERE driver_id = p_driver_id AND status IN ('completed', 'paid');

  -- Calculate average rating
  SELECT COALESCE(AVG(rating)::DECIMAL(3,2), 5.00)
  INTO v_avg_rating
  FROM public.reviews
  WHERE reviewee_id = p_driver_id;

  -- Determine tier based on total jobs
  v_new_tier := CASE
    WHEN v_total_jobs >= 300 THEN 'platinum'
    WHEN v_total_jobs >= 150 THEN 'gold'
    WHEN v_total_jobs >= 50 THEN 'silver'
    ELSE 'bronze'
  END;

  -- Update driver profile
  UPDATE public.driver_profiles
  SET
    total_jobs = v_total_jobs,
    total_earnings_cents = v_total_earnings,
    rating = v_avg_rating,
    tier = v_new_tier,
    updated_at = NOW()
  WHERE user_id = p_driver_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update stats when order is completed
CREATE OR REPLACE FUNCTION trigger_update_driver_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status IN ('completed', 'paid') AND OLD.status != NEW.status THEN
    PERFORM update_driver_stats(NEW.driver_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_update_driver_stats
  AFTER UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION trigger_update_driver_stats();

-- Also trigger on new review
CREATE OR REPLACE FUNCTION trigger_review_update_stats()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM update_driver_stats(NEW.reviewee_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reviews_update_driver_stats
  AFTER INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION trigger_review_update_stats();
