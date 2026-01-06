import { VehicleType, DriverTier } from './enums';

export interface DriverProfile {
  id: string;
  user_id: string;
  stripe_account_id: string | null;
  stripe_account_status: string | null;
  vehicle_type: VehicleType;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number;
  vehicle_color: string;
  license_plate: string;
  drivers_license_number: string | null;
  drivers_license_expiry: string | null;
  insurance_policy_number: string | null;
  insurance_expiry: string | null;
  background_check_status: string | null;
  background_check_date: string | null;
  tier: DriverTier;
  rating: number | null;
  total_jobs: number | null;
  total_earnings_cents: number | null;
  is_online: boolean | null;
  current_location: unknown | null;
  last_location_update: string | null;
  is_approved: boolean | null;
  approved_at: string | null;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateDriverProfileInput {
  vehicle_type: VehicleType;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number;
  vehicle_color: string;
  license_plate: string;
}

export interface UpdateDriverProfileInput {
  vehicle_type?: VehicleType;
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_year?: number;
  vehicle_color?: string;
  license_plate?: string;
  drivers_license_number?: string;
  drivers_license_expiry?: string;
  insurance_policy_number?: string;
  insurance_expiry?: string;
}
