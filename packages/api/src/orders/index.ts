import { supabase } from '../client';
import type { Order, CreateOrderInput, OrderStatus, LoadSize, PRICING } from '@hauly/types';

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  // Calculate pricing
  const { data: pricing } = await supabase.rpc('calculate_pricing', {
    p_load_size: input.load_size,
    p_estimated_hours: input.estimated_hours
  }).single();

  if (!pricing) throw new Error('Failed to calculate pricing');

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('orders')
    .insert({
      customer_id: user.id,
      service_type: input.service_type,
      load_size: input.load_size,
      pickup_address_text: input.pickup_address_text,
      pickup_location: `POINT(${input.pickup_longitude} ${input.pickup_latitude})`,
      pickup_instructions: input.pickup_instructions,
      pickup_gate_code: input.pickup_gate_code,
      dropoff_address_text: input.dropoff_address_text,
      dropoff_location: input.dropoff_latitude && input.dropoff_longitude
        ? `POINT(${input.dropoff_longitude} ${input.dropoff_latitude})`
        : null,
      dropoff_instructions: input.dropoff_instructions,
      scheduled_date: input.scheduled_date,
      scheduled_time_start: input.scheduled_time_start,
      scheduled_time_end: input.scheduled_time_end,
      customer_notes: input.customer_notes,
      item_description: input.item_description,
      estimated_hours: input.estimated_hours,
      base_price_cents: pricing.base_price_cents,
      platform_fee_cents: pricing.platform_fee_cents,
      driver_payout_cents: pricing.driver_payout_cents,
      total_cents: pricing.total_cents
    })
    .select()
    .single();

  if (error) throw error;
  return data as Order;
}

export async function getOrder(orderId: string): Promise<Order | null> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (error) throw error;
  return data as Order;
}

export async function getCustomerOrders(status?: OrderStatus): Promise<Order[]> {
  let query = supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Order[];
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus
): Promise<Order> {
  const timestampField = getTimestampField(newStatus);

  const updates: any = { status: newStatus };
  if (timestampField) {
    updates[timestampField] = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', orderId)
    .select()
    .single();

  if (error) throw error;
  return data as Order;
}

export async function cancelOrder(orderId: string, reason: string): Promise<Order> {
  const { data, error } = await supabase
    .from('orders')
    .update({
      status: 'cancelled',
      cancelled_at: new Date().toISOString(),
      cancellation_reason: reason
    })
    .eq('id', orderId)
    .select()
    .single();

  if (error) throw error;
  return data as Order;
}

function getTimestampField(status: OrderStatus): string | null {
  const map: Record<string, string> = {
    accepted: 'accepted_at',
    en_route: 'started_at',
    arrived: 'arrived_at',
    completed: 'completed_at',
    cancelled: 'cancelled_at'
  };
  return map[status] || null;
}

export async function calculateQuote(loadSize: LoadSize, estimatedHours: number) {
  const { data, error } = await supabase.rpc('calculate_pricing', {
    p_load_size: loadSize,
    p_estimated_hours: estimatedHours
  }).single();

  if (error) throw error;
  return data;
}
