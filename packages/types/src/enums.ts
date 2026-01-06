export const UserRole = {
  CUSTOMER: 'customer',
  DRIVER: 'driver',
  ADMIN: 'admin'
} as const;
export type UserRole = typeof UserRole[keyof typeof UserRole];

export const OrderStatus = {
  REQUESTED: 'requested',
  MATCHED: 'matched',
  ACCEPTED: 'accepted',
  EN_ROUTE: 'en_route',
  ARRIVED: 'arrived',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  PAID: 'paid',
  CANCELLED: 'cancelled'
} as const;
export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export const ServiceType = {
  APARTMENT_TURN: 'apartment_turn',
  FURNITURE_DELIVERY: 'furniture_delivery',
  JUNK_REMOVAL: 'junk_removal',
  OTHER: 'other'
} as const;
export type ServiceType = typeof ServiceType[keyof typeof ServiceType];

export const LoadSize = {
  LIGHT: 'light',
  MEDIUM: 'medium',
  HEAVY: 'heavy'
} as const;
export type LoadSize = typeof LoadSize[keyof typeof LoadSize];

export const VehicleType = {
  SEDAN: 'sedan',
  SUV: 'suv',
  PICKUP: 'pickup',
  CARGO_VAN: 'cargo_van',
  BOX_TRUCK: 'box_truck'
} as const;
export type VehicleType = typeof VehicleType[keyof typeof VehicleType];

export const PhotoType = {
  BEFORE: 'before',
  AFTER: 'after'
} as const;
export type PhotoType = typeof PhotoType[keyof typeof PhotoType];

export const PaymentStatus = {
  PENDING: 'pending',
  AUTHORIZED: 'authorized',
  CAPTURED: 'captured',
  FAILED: 'failed',
  REFUNDED: 'refunded'
} as const;
export type PaymentStatus = typeof PaymentStatus[keyof typeof PaymentStatus];

export const DriverTier = {
  BRONZE: 'bronze',
  SILVER: 'silver',
  GOLD: 'gold',
  PLATINUM: 'platinum'
} as const;
export type DriverTier = typeof DriverTier[keyof typeof DriverTier];
