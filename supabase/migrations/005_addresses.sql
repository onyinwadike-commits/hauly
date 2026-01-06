-- User saved addresses
CREATE TABLE public.addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  label TEXT NOT NULL, -- e.g., "Home", "Office", "Unit 204"
  street_address TEXT NOT NULL,
  unit_number TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  access_instructions TEXT,
  gate_code TEXT, -- Encrypted sensitive field
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_addresses_user_id ON public.addresses(user_id);
CREATE INDEX idx_addresses_location ON public.addresses USING GIST(location);

-- Enable RLS
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

-- Users can only access their own addresses
CREATE POLICY "Users can manage own addresses"
  ON public.addresses FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Ensure only one default address per user
CREATE UNIQUE INDEX idx_addresses_default ON public.addresses(user_id) WHERE is_default = TRUE;
