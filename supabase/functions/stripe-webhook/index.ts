import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@13.0.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

serve(async (req: Request) => {
  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return new Response('Missing signature', { status: 400 });
  }

  const body = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return new Response('Invalid signature', { status: 400 });
  }

  console.log('Received Stripe event:', event.type);

  try {
    switch (event.type) {
      // Payment Intent Events
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata.order_id;

        if (orderId) {
          await supabase
            .from('orders')
            .update({
              payment_status: 'paid',
              stripe_payment_intent_id: paymentIntent.id,
              paid_at: new Date().toISOString(),
            })
            .eq('id', orderId);

          await supabase.from('payments').insert({
            order_id: orderId,
            stripe_payment_intent_id: paymentIntent.id,
            amount_cents: paymentIntent.amount,
            currency: paymentIntent.currency,
            status: 'succeeded',
          });

          console.log(`Payment succeeded for order ${orderId}`);
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata.order_id;

        if (orderId) {
          await supabase
            .from('orders')
            .update({ payment_status: 'failed' })
            .eq('id', orderId);

          await supabase.from('payments').insert({
            order_id: orderId,
            stripe_payment_intent_id: paymentIntent.id,
            amount_cents: paymentIntent.amount,
            currency: paymentIntent.currency,
            status: 'failed',
            failure_reason: paymentIntent.last_payment_error?.message,
          });

          console.log(`Payment failed for order ${orderId}`);
        }
        break;
      }

      // Connect Account Events
      case 'account.updated': {
        const account = event.data.object as Stripe.Account;
        const userId = account.metadata?.hauly_user_id;

        if (userId) {
          const isOnboarded =
            account.charges_enabled &&
            account.payouts_enabled &&
            account.details_submitted;

          await supabase
            .from('driver_profiles')
            .update({
              stripe_account_id: account.id,
              stripe_account_status: isOnboarded ? 'active' : 'pending',
              stripe_charges_enabled: account.charges_enabled,
              stripe_payouts_enabled: account.payouts_enabled,
            })
            .eq('user_id', userId);

          console.log(`Connect account updated for user ${userId}`);
        }
        break;
      }

      case 'account.external_account.created': {
        const externalAccount = event.data.object as Stripe.BankAccount;
        console.log('External account added:', externalAccount.id);
        break;
      }

      // Payout Events
      case 'payout.paid': {
        const payout = event.data.object as Stripe.Payout;
        console.log(`Payout completed: ${payout.id}, amount: ${payout.amount}`);
        break;
      }

      case 'payout.failed': {
        const payout = event.data.object as Stripe.Payout;
        console.log(`Payout failed: ${payout.id}, reason: ${payout.failure_message}`);
        // TODO: Notify driver of failed payout
        break;
      }

      // Refund Events
      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        const paymentIntentId = charge.payment_intent as string;

        await supabase
          .from('payments')
          .update({
            status: 'refunded',
            refunded_at: new Date().toISOString(),
          })
          .eq('stripe_payment_intent_id', paymentIntentId);

        console.log(`Refund processed for payment intent ${paymentIntentId}`);
        break;
      }

      // Dispute Events
      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute;
        console.log(`Dispute created: ${dispute.id}, amount: ${dispute.amount}`);
        // TODO: Alert admin of dispute
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return new Response('Webhook processing failed', { status: 500 });
  }
});
