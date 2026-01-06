-- Customers can view their own orders
CREATE POLICY "Customers can view own orders"
  ON public.orders FOR SELECT
  USING (customer_id = auth.uid());

-- Customers can create orders
CREATE POLICY "Customers can create orders"
  ON public.orders FOR INSERT
  WITH CHECK (
    customer_id = auth.uid() AND
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'customer')
  );

-- Customers can cancel their own orders (before in_progress)
CREATE POLICY "Customers can cancel own orders"
  ON public.orders FOR UPDATE
  USING (
    customer_id = auth.uid() AND
    status IN ('requested', 'matched', 'accepted', 'en_route', 'arrived')
  )
  WITH CHECK (
    customer_id = auth.uid() AND
    status = 'cancelled'
  );

-- Drivers can view available orders (status = requested)
CREATE POLICY "Drivers can view available orders"
  ON public.orders FOR SELECT
  USING (
    status = 'requested' AND
    EXISTS (
      SELECT 1 FROM public.driver_profiles
      WHERE user_id = auth.uid() AND is_approved = TRUE AND is_online = TRUE
    )
  );

-- Drivers can view their assigned orders
CREATE POLICY "Drivers can view assigned orders"
  ON public.orders FOR SELECT
  USING (driver_id = auth.uid());

-- Drivers can update their assigned orders (status transitions)
CREATE POLICY "Drivers can update assigned orders"
  ON public.orders FOR UPDATE
  USING (driver_id = auth.uid())
  WITH CHECK (driver_id = auth.uid());

-- Admins can do anything
CREATE POLICY "Admins have full access"
  ON public.orders FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );
