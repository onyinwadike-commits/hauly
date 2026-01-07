import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is required');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
});

// Types
export interface CreatePaymentIntentParams {
  amountCents: number;
  customerId?: string;
  customerEmail?: string;
  orderId: string;
  driverStripeAccountId?: string;
  applicationFeeCents: number;
  metadata?: Record<string, string>;
}

export interface CreateConnectAccountParams {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  userId: string;
}

export interface CreateCustomerParams {
  email: string;
  name: string;
  phone?: string;
  userId: string;
}

// Customer Management
export async function createCustomer(params: CreateCustomerParams): Promise<Stripe.Customer> {
  const customer = await stripe.customers.create({
    email: params.email,
    name: params.name,
    phone: params.phone,
    metadata: {
      hauly_user_id: params.userId,
    },
  });

  return customer;
}

export async function getCustomer(customerId: string): Promise<Stripe.Customer | null> {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    if (customer.deleted) return null;
    return customer as Stripe.Customer;
  } catch {
    return null;
  }
}

export async function updateCustomer(
  customerId: string,
  data: Stripe.CustomerUpdateParams
): Promise<Stripe.Customer> {
  return stripe.customers.update(customerId, data);
}

// Payment Methods
export async function attachPaymentMethod(
  paymentMethodId: string,
  customerId: string
): Promise<Stripe.PaymentMethod> {
  return stripe.paymentMethods.attach(paymentMethodId, {
    customer: customerId,
  });
}

export async function listPaymentMethods(
  customerId: string
): Promise<Stripe.PaymentMethod[]> {
  const methods = await stripe.paymentMethods.list({
    customer: customerId,
    type: 'card',
  });
  return methods.data;
}

export async function setDefaultPaymentMethod(
  customerId: string,
  paymentMethodId: string
): Promise<Stripe.Customer> {
  return stripe.customers.update(customerId, {
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  });
}

// Payment Intents
export async function createPaymentIntent(
  params: CreatePaymentIntentParams
): Promise<Stripe.PaymentIntent> {
  const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
    amount: params.amountCents,
    currency: 'usd',
    metadata: {
      order_id: params.orderId,
      ...params.metadata,
    },
    automatic_payment_methods: {
      enabled: true,
    },
  };

  // Add customer if provided
  if (params.customerId) {
    paymentIntentParams.customer = params.customerId;
  }

  // Add Connect destination for driver payout
  if (params.driverStripeAccountId) {
    paymentIntentParams.transfer_data = {
      destination: params.driverStripeAccountId,
    };
    paymentIntentParams.application_fee_amount = params.applicationFeeCents;
  }

  return stripe.paymentIntents.create(paymentIntentParams);
}

export async function confirmPaymentIntent(
  paymentIntentId: string,
  paymentMethodId: string
): Promise<Stripe.PaymentIntent> {
  return stripe.paymentIntents.confirm(paymentIntentId, {
    payment_method: paymentMethodId,
  });
}

export async function capturePaymentIntent(
  paymentIntentId: string,
  amountToCapture?: number
): Promise<Stripe.PaymentIntent> {
  const params: Stripe.PaymentIntentCaptureParams = {};
  if (amountToCapture) {
    params.amount_to_capture = amountToCapture;
  }
  return stripe.paymentIntents.capture(paymentIntentId, params);
}

export async function cancelPaymentIntent(
  paymentIntentId: string
): Promise<Stripe.PaymentIntent> {
  return stripe.paymentIntents.cancel(paymentIntentId);
}

// Refunds
export async function createRefund(
  paymentIntentId: string,
  amountCents?: number,
  reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer'
): Promise<Stripe.Refund> {
  const params: Stripe.RefundCreateParams = {
    payment_intent: paymentIntentId,
  };

  if (amountCents) {
    params.amount = amountCents;
  }

  if (reason) {
    params.reason = reason;
  }

  return stripe.refunds.create(params);
}

export { stripe as stripeClient };
