// Generated types for Supabase database
// Regenerate with: supabase gen types typescript --local > packages/api/src/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          phone: string | null
          full_name: string
          avatar_url: string | null
          role: Database['public']['Enums']['user_role']
          stripe_customer_id: string | null
          onesignal_player_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          phone?: string | null
          full_name: string
          avatar_url?: string | null
          role?: Database['public']['Enums']['user_role']
          stripe_customer_id?: string | null
          onesignal_player_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          phone?: string | null
          full_name?: string
          avatar_url?: string | null
          role?: Database['public']['Enums']['user_role']
          stripe_customer_id?: string | null
          onesignal_player_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      driver_profiles: {
        Row: {
          id: string
          user_id: string
          stripe_account_id: string | null
          stripe_account_status: string | null
          vehicle_type: Database['public']['Enums']['vehicle_type']
          vehicle_make: string
          vehicle_model: string
          vehicle_year: number
          vehicle_color: string
          license_plate: string
          drivers_license_number: string | null
          drivers_license_expiry: string | null
          insurance_policy_number: string | null
          insurance_expiry: string | null
          background_check_status: string | null
          background_check_date: string | null
          tier: Database['public']['Enums']['driver_tier']
          rating: number | null
          total_jobs: number | null
          total_earnings_cents: number | null
          is_online: boolean | null
          current_location: unknown | null
          last_location_update: string | null
          is_approved: boolean | null
          approved_at: string | null
          approved_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_account_id?: string | null
          stripe_account_status?: string | null
          vehicle_type: Database['public']['Enums']['vehicle_type']
          vehicle_make: string
          vehicle_model: string
          vehicle_year: number
          vehicle_color: string
          license_plate: string
          drivers_license_number?: string | null
          drivers_license_expiry?: string | null
          insurance_policy_number?: string | null
          insurance_expiry?: string | null
          background_check_status?: string | null
          background_check_date?: string | null
          tier?: Database['public']['Enums']['driver_tier']
          rating?: number | null
          total_jobs?: number | null
          total_earnings_cents?: number | null
          is_online?: boolean | null
          current_location?: unknown | null
          last_location_update?: string | null
          is_approved?: boolean | null
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_account_id?: string | null
          stripe_account_status?: string | null
          vehicle_type?: Database['public']['Enums']['vehicle_type']
          vehicle_make?: string
          vehicle_model?: string
          vehicle_year?: number
          vehicle_color?: string
          license_plate?: string
          drivers_license_number?: string | null
          drivers_license_expiry?: string | null
          insurance_policy_number?: string | null
          insurance_expiry?: string | null
          background_check_status?: string | null
          background_check_date?: string | null
          tier?: Database['public']['Enums']['driver_tier']
          rating?: number | null
          total_jobs?: number | null
          total_earnings_cents?: number | null
          is_online?: boolean | null
          current_location?: unknown | null
          last_location_update?: string | null
          is_approved?: boolean | null
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          label: string
          street_address: string
          unit_number: string | null
          city: string
          state: string
          zip_code: string
          location: unknown
          access_instructions: string | null
          gate_code: string | null
          is_default: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          label: string
          street_address: string
          unit_number?: string | null
          city: string
          state: string
          zip_code: string
          location: unknown
          access_instructions?: string | null
          gate_code?: string | null
          is_default?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          label?: string
          street_address?: string
          unit_number?: string | null
          city?: string
          state?: string
          zip_code?: string
          location?: unknown
          access_instructions?: string | null
          gate_code?: string | null
          is_default?: boolean | null
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          job_number: string
          customer_id: string
          driver_id: string | null
          status: Database['public']['Enums']['order_status']
          service_type: Database['public']['Enums']['service_type']
          load_size: Database['public']['Enums']['load_size']
          pickup_address_id: string | null
          pickup_address_text: string
          pickup_location: unknown
          pickup_instructions: string | null
          pickup_gate_code: string | null
          dropoff_address_id: string | null
          dropoff_address_text: string | null
          dropoff_location: unknown | null
          dropoff_instructions: string | null
          scheduled_date: string
          scheduled_time_start: string
          scheduled_time_end: string
          base_price_cents: number
          platform_fee_cents: number
          driver_payout_cents: number
          tip_cents: number | null
          total_cents: number
          estimated_hours: number
          customer_notes: string | null
          item_description: string | null
          accepted_at: string | null
          started_at: string | null
          arrived_at: string | null
          completed_at: string | null
          cancelled_at: string | null
          cancellation_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_number?: string
          customer_id: string
          driver_id?: string | null
          status?: Database['public']['Enums']['order_status']
          service_type: Database['public']['Enums']['service_type']
          load_size: Database['public']['Enums']['load_size']
          pickup_address_id?: string | null
          pickup_address_text: string
          pickup_location: unknown
          pickup_instructions?: string | null
          pickup_gate_code?: string | null
          dropoff_address_id?: string | null
          dropoff_address_text?: string | null
          dropoff_location?: unknown | null
          dropoff_instructions?: string | null
          scheduled_date: string
          scheduled_time_start: string
          scheduled_time_end: string
          base_price_cents: number
          platform_fee_cents: number
          driver_payout_cents: number
          tip_cents?: number | null
          total_cents: number
          estimated_hours: number
          customer_notes?: string | null
          item_description?: string | null
          accepted_at?: string | null
          started_at?: string | null
          arrived_at?: string | null
          completed_at?: string | null
          cancelled_at?: string | null
          cancellation_reason?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_number?: string
          customer_id?: string
          driver_id?: string | null
          status?: Database['public']['Enums']['order_status']
          service_type?: Database['public']['Enums']['service_type']
          load_size?: Database['public']['Enums']['load_size']
          pickup_address_id?: string | null
          pickup_address_text?: string
          pickup_location?: unknown
          pickup_instructions?: string | null
          pickup_gate_code?: string | null
          dropoff_address_id?: string | null
          dropoff_address_text?: string | null
          dropoff_location?: unknown | null
          dropoff_instructions?: string | null
          scheduled_date?: string
          scheduled_time_start?: string
          scheduled_time_end?: string
          base_price_cents?: number
          platform_fee_cents?: number
          driver_payout_cents?: number
          tip_cents?: number | null
          total_cents?: number
          estimated_hours?: number
          customer_notes?: string | null
          item_description?: string | null
          accepted_at?: string | null
          started_at?: string | null
          arrived_at?: string | null
          completed_at?: string | null
          cancelled_at?: string | null
          cancellation_reason?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_photos: {
        Row: {
          id: string
          order_id: string
          photo_type: Database['public']['Enums']['photo_type']
          storage_path: string
          public_url: string | null
          location: unknown | null
          captured_at: string
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          photo_type: Database['public']['Enums']['photo_type']
          storage_path: string
          public_url?: string | null
          location?: unknown | null
          captured_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          photo_type?: Database['public']['Enums']['photo_type']
          storage_path?: string
          public_url?: string | null
          location?: unknown | null
          captured_at?: string
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          order_id: string
          stripe_payment_intent_id: string | null
          stripe_transfer_id: string | null
          amount_cents: number
          platform_fee_cents: number
          driver_payout_cents: number
          tip_cents: number | null
          status: Database['public']['Enums']['payment_status']
          authorized_at: string | null
          captured_at: string | null
          transferred_at: string | null
          failed_at: string | null
          failure_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          stripe_payment_intent_id?: string | null
          stripe_transfer_id?: string | null
          amount_cents: number
          platform_fee_cents: number
          driver_payout_cents: number
          tip_cents?: number | null
          status?: Database['public']['Enums']['payment_status']
          authorized_at?: string | null
          captured_at?: string | null
          transferred_at?: string | null
          failed_at?: string | null
          failure_reason?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          stripe_payment_intent_id?: string | null
          stripe_transfer_id?: string | null
          amount_cents?: number
          platform_fee_cents?: number
          driver_payout_cents?: number
          tip_cents?: number | null
          status?: Database['public']['Enums']['payment_status']
          authorized_at?: string | null
          captured_at?: string | null
          transferred_at?: string | null
          failed_at?: string | null
          failure_reason?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          order_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          reviewer_id?: string
          reviewee_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_pricing: {
        Args: {
          p_load_size: Database['public']['Enums']['load_size']
          p_estimated_hours: number
        }
        Returns: {
          base_price_cents: number
          platform_fee_cents: number
          driver_payout_cents: number
          total_cents: number
        }[]
      }
      find_nearby_drivers: {
        Args: {
          p_pickup_lat: number
          p_pickup_lng: number
          p_radius_miles?: number
          p_vehicle_type?: Database['public']['Enums']['vehicle_type']
        }
        Returns: {
          driver_id: string
          user_id: string
          full_name: string
          vehicle_type: Database['public']['Enums']['vehicle_type']
          vehicle_make: string
          vehicle_model: string
          rating: number
          tier: Database['public']['Enums']['driver_tier']
          distance_miles: number
        }[]
      }
      generate_job_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      update_driver_stats: {
        Args: {
          p_driver_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      user_role: 'customer' | 'driver' | 'admin'
      order_status: 'requested' | 'matched' | 'accepted' | 'en_route' | 'arrived' | 'in_progress' | 'completed' | 'paid' | 'cancelled'
      service_type: 'apartment_turn' | 'furniture_delivery' | 'junk_removal' | 'other'
      load_size: 'light' | 'medium' | 'heavy'
      vehicle_type: 'sedan' | 'suv' | 'pickup' | 'cargo_van' | 'box_truck'
      photo_type: 'before' | 'after'
      payment_status: 'pending' | 'authorized' | 'captured' | 'failed' | 'refunded'
      driver_tier: 'bronze' | 'silver' | 'gold' | 'platinum'
    }
  }
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
export type Functions<T extends keyof Database['public']['Functions']> = Database['public']['Functions'][T]
