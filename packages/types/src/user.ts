import { UserRole } from './enums';

export interface User {
  id: string;
  email: string;
  phone: string | null;
  full_name: string;
  avatar_url: string | null;
  role: UserRole;
  stripe_customer_id: string | null;
  onesignal_player_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateUserInput {
  email: string;
  phone?: string;
  full_name: string;
  role: UserRole;
}

export interface UpdateUserInput {
  phone?: string;
  full_name?: string;
  avatar_url?: string;
}

export interface Address {
  id: string;
  user_id: string;
  label: string;
  street_address: string;
  unit_number: string | null;
  city: string;
  state: string;
  zip_code: string;
  latitude: number;
  longitude: number;
  access_instructions: string | null;
  gate_code: string | null;
  is_default: boolean;
  created_at: string;
}

export interface CreateAddressInput {
  label: string;
  street_address: string;
  unit_number?: string;
  city: string;
  state: string;
  zip_code: string;
  latitude: number;
  longitude: number;
  access_instructions?: string;
  gate_code?: string;
  is_default?: boolean;
}
