-- Driver profiles (additional data for drivers)
CREATE TABLE public.driver_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,

  -- Stripe Connect
  stripe_account_id TEXT,
  stripe_account_status TEXT DEFAULT 'pending',

  -- Vehicle info
  vehicle_type vehicle_type NOT NULL,
  vehicle_make TEXT NOT NULL,
  vehicle_model TEXT NOT NULL,
  vehicle_year INTEGER NOT NULL,
  vehicle_color TEXT NOT NULL,
  license_plate TEXT NOT NULL,

  -- Documents
  drivers_license_number TEXT,
  drivers_license_expiry DATE,
  insurance_policy_number TEXT,
  insurance_expiry DATE,

  -- Background check
  background_check_status TEXT DEFAULT 'pending',
  background_check_date DATE,

  -- Performance metrics
  tier driver_tier NOT NULL DEFAULT 'bronze',
  rating DECIMAL(3,2) DEFAULT 5.00,
  total_jobs INTEGER DEFAULT 0,
  total_earnings_cents BIGINT DEFAULT 0,

  -- Availability
  is_online BOOLEAN DEFAULT FALSE,
  current_location GEOGRAPHY(POINT, 4326),
  last_location_update TIMESTAMPTZ,

  -- Approval
  is_approved BOOLEAN DEFAULT FALSE,
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES public.users(id),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Spatial index for location queries
CREATE INDEX idx_driver_profiles_location ON public.driver_profiles USING GIST(current_location);
CREATE INDEX idx_driver_profiles_is_online ON public.driver_profiles(is_online) WHERE is_online = TRUE;
CREATE INDEX idx_driver_profiles_is_approved ON public.driver_profiles(is_approved);
CREATE INDEX idx_driver_profiles_stripe_account ON public.driver_profiles(stripe_account_id);

-- Enable RLS
ALTER TABLE public.driver_profiles ENABLE ROW LEVEL SECURITY;

-- Drivers can view/update their own profile
CREATE POLICY "Drivers can view own profile"
  ON public.driver_profiles FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Drivers can update own profile"
  ON public.driver_profiles FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Customers can view basic driver info for their orders
CREATE POLICY "Public can view approved driver basics"
  ON public.driver_profiles FOR SELECT
  USING (is_approved = TRUE);

-- Updated timestamp trigger
CREATE TRIGGER driver_profiles_updated_at
  BEFORE UPDATE ON public.driver_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
