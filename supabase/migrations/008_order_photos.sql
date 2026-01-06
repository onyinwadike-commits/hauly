-- Order photos (before/after documentation)
CREATE TABLE public.order_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  photo_type photo_type NOT NULL,
  storage_path TEXT NOT NULL, -- Path in Supabase Storage
  public_url TEXT, -- CDN URL after upload
  location GEOGRAPHY(POINT, 4326), -- GPS where photo was taken
  captured_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_order_photos_order_id ON public.order_photos(order_id);
CREATE INDEX idx_order_photos_type ON public.order_photos(order_id, photo_type);

-- Enable RLS
ALTER TABLE public.order_photos ENABLE ROW LEVEL SECURITY;

-- Only driver of the order can insert photos
CREATE POLICY "Drivers can add photos to their orders"
  ON public.order_photos FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE id = order_id AND driver_id = auth.uid()
    )
  );

-- Customer and driver can view photos for their orders
CREATE POLICY "Order participants can view photos"
  ON public.order_photos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE id = order_id AND (customer_id = auth.uid() OR driver_id = auth.uid())
    )
  );

-- Admins can view all photos
CREATE POLICY "Admins can view all photos"
  ON public.order_photos FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );
