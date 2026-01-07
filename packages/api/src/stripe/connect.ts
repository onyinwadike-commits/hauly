import { stripe } from './index';
import Stripe from 'stripe';

export interface CreateConnectAccountParams {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  userId: string;
  country?: string;
}

export interface OnboardingLinkParams {
  accountId: string;
  refreshUrl: string;
  returnUrl: string;
}

// Create Express Connect account for driver
export async function createConnectAccount(
  params: CreateConnectAccountParams
): Promise<Stripe.Account> {
  const account = await stripe.accounts.create({
    type: 'express',
    country: params.country || 'US',
    email: params.email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    business_type: 'individual',
    individual: {
      first_name: params.firstName,
      last_name: params.lastName,
      email: params.email,
      phone: params.phone,
    },
    business_profile: {
      mcc: '4214', // Motor freight carriers and trucking
      url: 'https://hauly.app',
      product_description: 'Hauling and delivery services',
    },
    metadata: {
      hauly_user_id: params.userId,
    },
    settings: {
      payouts: {
        schedule: {
          interval: 'weekly',
          weekly_anchor: 'monday',
        },
      },
    },
  });

  return account;
}

// Generate onboarding link for driver
export async function createOnboardingLink(
  params: OnboardingLinkParams
): Promise<Stripe.AccountLink> {
  return stripe.accountLinks.create({
    account: params.accountId,
    refresh_url: params.refreshUrl,
    return_url: params.returnUrl,
    type: 'account_onboarding',
  });
}

// Generate login link for Express dashboard
export async function createLoginLink(
  accountId: string
): Promise<Stripe.LoginLink> {
  return stripe.accounts.createLoginLink(accountId);
}

// Get Connect account details
export async function getConnectAccount(
  accountId: string
): Promise<Stripe.Account | null> {
  try {
    return await stripe.accounts.retrieve(accountId);
  } catch {
    return null;
  }
}

// Check if account is fully onboarded
export function isAccountOnboarded(account: Stripe.Account): boolean {
  return (
    account.charges_enabled === true &&
    account.payouts_enabled === true &&
    account.details_submitted === true
  );
}

// Get account onboarding status
export function getOnboardingStatus(account: Stripe.Account): {
  status: 'pending' | 'in_progress' | 'complete' | 'restricted';
  requirements: string[];
} {
  if (isAccountOnboarded(account)) {
    return { status: 'complete', requirements: [] };
  }

  const requirements = [
    ...(account.requirements?.currently_due || []),
    ...(account.requirements?.eventually_due || []),
  ];

  if (account.requirements?.disabled_reason) {
    return { status: 'restricted', requirements };
  }

  if (account.details_submitted) {
    return { status: 'in_progress', requirements };
  }

  return { status: 'pending', requirements };
}

// Create transfer to driver (for tips or adjustments)
export async function createTransfer(
  accountId: string,
  amountCents: number,
  description: string,
  metadata?: Record<string, string>
): Promise<Stripe.Transfer> {
  return stripe.transfers.create({
    amount: amountCents,
    currency: 'usd',
    destination: accountId,
    description,
    metadata,
  });
}

// Get driver's balance
export async function getAccountBalance(
  accountId: string
): Promise<Stripe.Balance> {
  return stripe.balance.retrieve({
    stripeAccount: accountId,
  });
}

// List driver's payouts
export async function listPayouts(
  accountId: string,
  limit: number = 10
): Promise<Stripe.Payout[]> {
  const payouts = await stripe.payouts.list(
    { limit },
    { stripeAccount: accountId }
  );
  return payouts.data;
}

// Update payout schedule
export async function updatePayoutSchedule(
  accountId: string,
  interval: 'daily' | 'weekly' | 'monthly',
  weeklyAnchor?: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'
): Promise<Stripe.Account> {
  const params: Stripe.AccountUpdateParams = {
    settings: {
      payouts: {
        schedule: {
          interval,
        },
      },
    },
  };

  if (interval === 'weekly' && weeklyAnchor) {
    params.settings!.payouts!.schedule!.weekly_anchor = weeklyAnchor;
  }

  return stripe.accounts.update(accountId, params);
}
