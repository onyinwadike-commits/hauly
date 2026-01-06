-- Orders (the core business entity)
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_number TEXT NOT NULL UNIQUE,
  customer_id UUID NOT NULL REFERENCES public.users(id),
  driver_id UUID REFERENCES public.users(id),
  status order_status NOT NULL DEFAULT 'requested',
  service_type service_type NOT NULL,
  load_size load_size NOT NULL,

  -- Pickup location
  pickup_address_id UUID REFERENCES public.addresses(id),
  pickup_address_text TEXT NOT NULL,
  pickup_location GEOGRAPHY(POINT, 4326) NOT NULL,
  pickup_instructions TEXT,
  pickup_gate_code TEXT,

  -- Dropoff location (null for junk removal)
  dropoff_address_id UUID REFERENCES public.addresses(id),
  dropoff_address_text TEXT,
  dropoff_location GEOGRAPHY(POINT, 4326),
  dropoff_instructions TEXT,

  -- Schedule
  scheduled_date DATE NOT NULL,
  scheduled_time_start TIME NOT NULL,
  scheduled_time_end TIME NOT NULL,

  -- Pricing (all in cents)
  base_price_cents INTEGER NOT NULL,
  platform_fee_cents INTEGER NOT NULL, -- 25%
  driver_payout_cents INTEGER NOT NULL, -- 75%
  tip_cents INTEGER DEFAULT 0,
  total_cents INTEGER NOT NULL,
  estimated_hours DECIMAL(3,1) NOT NULL,

  -- Additional info
  customer_notes TEXT,
  item_description TEXT,

  -- Status timestamps
  accepted_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  arrived_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_orders_customer_id ON public.orders(customer_id);
CREATE INDEX idx_orders_driver_id ON public.orders(driver_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_scheduled_date ON public.orders(scheduled_date);
CREATE INDEX idx_orders_job_number ON public.orders(job_number);
CREATE INDEX idx_orders_pickup_location ON public.orders USING GIST(pickup_location);

-- Composite index for available jobs query
CREATE INDEX idx_orders_available ON public.orders(status, scheduled_date)
  WHERE status = 'requested';

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Updated timestamp trigger
CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
