-- Sequence for job numbers (resets each year)
CREATE SEQUENCE IF NOT EXISTS job_number_seq START 1;

-- Function to generate job number in format HAU-YYYY-XXX
CREATE OR REPLACE FUNCTION generate_job_number()
RETURNS TEXT AS $$
DECLARE
  current_year TEXT;
  seq_num INTEGER;
  job_num TEXT;
BEGIN
  current_year := TO_CHAR(CURRENT_DATE, 'YYYY');
  seq_num := nextval('job_number_seq');
  job_num := 'HAU-' || current_year || '-' || LPAD(seq_num::TEXT, 3, '0');
  RETURN job_num;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate job number on order insert
CREATE OR REPLACE FUNCTION set_job_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.job_number IS NULL THEN
    NEW.job_number := generate_job_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_set_job_number
  BEFORE INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION set_job_number();
