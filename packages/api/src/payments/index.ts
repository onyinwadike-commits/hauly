import { supabase } from '../client';
import type { PaymentStatus } from '@hauly/types';

export interface Payment {
  id: string;
  order_id: string;
  stripe_payment_intent_id: string | null;
  stripe_transfer_id: string | null;
  amount_cents: number;
  platform_fee_cents: number;
  driver_payout_cents: number;
  tip_cents: number | null;
  status: PaymentStatus;
  authorized_at: string | null;
  captured_at: string | null;
  transferred_at: string | null;
  failed_at: string | null;
  failure_reason: string | null;
  created_at: string;
  updated_at: string;
}

export async function getPaymentByOrderId(orderId: string): Promise<Payment | null> {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('order_id', orderId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data as Payment | null;
}

export async function getPaymentsByStatus(status: PaymentStatus): Promise<Payment[]> {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Payment[];
}
