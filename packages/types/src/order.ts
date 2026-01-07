import { OrderStatus, ServiceType, LoadSize, PhotoType } from './enums';

export interface Order {
  id: string;
  job_number: string; // Format: HAU-YYYY-XXX
  customer_id: string;
  driver_id: string | null;
  status: OrderStatus;
  service_type: ServiceType;
  load_size: LoadSize;

  // Pickup
  pickup_address_id: string | null;
  pickup_address_text: string;
  pickup_latitude: number;
  pickup_longitude: number;
  pickup_instructions: string | null;
  pickup_gate_code: string | null;
  unit_number: string | null;

  // Dropoff (null for junk removal)
  dropoff_address_id: string | null;
  dropoff_address_text: string | null;
  dropoff_latitude: number | null;
  dropoff_longitude: number | null;
  dropoff_instructions: string | null;

  // Schedule
  scheduled_date: string; // YYYY-MM-DD
  scheduled_time_start: string; // HH:MM
  scheduled_time_end: string; // HH:MM

  // Pricing (all in cents to avoid floating point)
  base_price_cents: number;
  platform_fee_cents: number; // 25% of base
  driver_payout_cents: number; // 75% of base
  tip_cents: number;
  total_cents: number;
  estimated_hours: number;

  // Details
  customer_notes: string | null;
  item_description: string | null;

  // Status timestamps
  accepted_at: string | null;
  started_at: string | null;
  arrived_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  cancellation_reason: string | null;

  created_at: string;
  updated_at: string;
}

export interface OrderPhoto {
  id: string;
  order_id: string;
  photo_type: PhotoType;
  storage_path: string;
  public_url: string;
  latitude: number | null;
  longitude: number | null;
  captured_at: string;
  created_at: string;
}

export interface CreateOrderInput {
  service_type: ServiceType;
  load_size: LoadSize;
  pickup_address_text: string;
  pickup_latitude: number;
  pickup_longitude: number;
  pickup_instructions?: string;
  pickup_gate_code?: string;
  dropoff_address_text?: string;
  dropoff_latitude?: number;
  dropoff_longitude?: number;
  dropoff_instructions?: string;
  scheduled_date: string;
  scheduled_time_start: string;
  scheduled_time_end: string;
  customer_notes?: string;
  item_description?: string;
  estimated_hours: number;
}

// Pricing constants
export const PRICING = {
  LIGHT: 8900, // $89.00 in cents
  MEDIUM: 14900, // $149.00 in cents
  HEAVY: 24900, // $249.00 in cents
  PLATFORM_FEE_PERCENT: 25,
  MINIMUM_HOURS: 2
} as const;
