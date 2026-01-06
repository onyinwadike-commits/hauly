-- User roles
CREATE TYPE user_role AS ENUM ('customer', 'driver', 'admin');

-- Order status (matches state machine)
CREATE TYPE order_status AS ENUM (
  'requested',
  'matched',
  'accepted',
  'en_route',
  'arrived',
  'in_progress',
  'completed',
  'paid',
  'cancelled'
);

-- Service types
CREATE TYPE service_type AS ENUM (
  'apartment_turn',
  'furniture_delivery',
  'junk_removal',
  'other'
);

-- Load sizes
CREATE TYPE load_size AS ENUM ('light', 'medium', 'heavy');

-- Vehicle types
CREATE TYPE vehicle_type AS ENUM ('sedan', 'suv', 'pickup', 'cargo_van', 'box_truck');

-- Photo types
CREATE TYPE photo_type AS ENUM ('before', 'after');

-- Payment status
CREATE TYPE payment_status AS ENUM ('pending', 'authorized', 'captured', 'failed', 'refunded');

-- Driver tier (for gamification)
CREATE TYPE driver_tier AS ENUM ('bronze', 'silver', 'gold', 'platinum');
