-- Payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,

  -- Stripe IDs
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_transfer_id TEXT, -- Transfer to driver

  -- Amounts (all in cents)
  amount_cents INTEGER NOT NULL,
  platform_fee_cents INTEGER NOT NULL,
  driver_payout_cents INTEGER NOT NULL,
  tip_cents INTEGER DEFAULT 0,

  status payment_status NOT NULL DEFAULT 'pending',

  -- Timestamps
  authorized_at TIMESTAMPTZ,
  captured_at TIMESTAMPTZ,
  transferred_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  failure_reason TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_payments_order_id ON public.payments(order_id);
CREATE INDEX idx_payments_stripe_pi ON public.payments(stripe_payment_intent_id);
CREATE INDEX idx_payments_status ON public.payments(status);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Customers and drivers can view payments for their orders
CREATE POLICY "Order participants can view payments"
  ON public.payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE id = order_id AND (customer_id = auth.uid() OR driver_id = auth.uid())
    )
  );

-- Only service role can modify payments (via edge functions)
-- No INSERT/UPDATE policies for regular users

CREATE TRIGGER payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
