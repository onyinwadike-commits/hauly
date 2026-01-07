# Supabase Production Setup Guide

## 1. Create Production Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Configure:
   - **Organization**: Hauly
   - **Project name**: hauly-production
   - **Database password**: Generate a strong password (save securely!)
   - **Region**: us-west-1 (closest to Henderson, NV)
4. Wait for project to initialize (~2 minutes)

## 2. Get Project Credentials

After project creation, go to **Settings > API** and note:

```
Project URL:      https://[PROJECT_REF].supabase.co
Anon Key:         eyJ... (public)
Service Role Key: eyJ... (private - never expose!)
```

Update your `.env.production` files with these values.

## 3. Apply Database Migrations

```bash
cd supabase

# Login to Supabase CLI
supabase login

# Link to production project
supabase link --project-ref YOUR_PROJECT_REF

# Push all migrations
supabase db push

# Verify migrations applied
supabase db diff
```

**Migrations will create:**
- Extensions (uuid-ossp, postgis, pgcrypto)
- Custom enums (user_role, order_status, vehicle_type, etc.)
- Tables (users, driver_profiles, orders, payments, reviews, etc.)
- RLS policies for security
- Functions (nearby_drivers, generate_job_number, etc.)
- Storage buckets (order-photos, driver-documents, profile-avatars)

## 4. Configure Authentication

### Email Authentication
1. Go to **Authentication > Providers > Email**
2. Enable email provider
3. Configure:
   - Confirm email: **Enabled**
   - Secure email change: **Enabled**
   - Double confirm email changes: **Enabled**

### Phone Authentication (with Twilio)
1. Go to **Authentication > Providers > Phone**
2. Enable phone provider
3. Configure Twilio:
   - Account SID: `AC...`
   - Auth Token: `...`
   - Message Service SID or Sender Phone: `+1...`

### Auth Settings
Go to **Authentication > URL Configuration**:

**Site URL:**
```
https://hauly.app
```

**Redirect URLs:**
```
https://hauly.app/*
https://admin.hauly.app/*
hauly://auth/*
exp://192.168.*.*:8081/*
```

### Email Templates
Go to **Authentication > Email Templates** and customize:
- Confirm signup
- Magic link
- Change email
- Reset password

## 5. Configure Storage

Storage buckets are created by migration `015_storage.sql`:

| Bucket | Public | Max Size | Allowed Types |
|--------|--------|----------|---------------|
| order-photos | Yes | 10MB | jpeg, png, webp, heic |
| driver-documents | No | 20MB | jpeg, png, pdf |
| profile-avatars | Yes | 5MB | jpeg, png, webp |

Verify buckets in **Storage** section of dashboard.

## 6. Enable Database Features

### Connection Pooling
1. Go to **Settings > Database**
2. Enable **Connection Pooling**
3. Note the pooler connection string for high-traffic scenarios:
   ```
   postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   ```

### Point-in-Time Recovery (Pro Plan)
1. Go to **Database > Backups**
2. Enable **Point-in-Time Recovery**
3. Set retention period (7 days recommended)

## 7. Set Up Edge Functions

Hauly uses the following Edge Functions:

| Function | Description |
|----------|-------------|
| `stripe-webhook` | Handle Stripe payment events |
| `send-notification` | Send SMS (Twilio) and push (OneSignal) notifications |
| `match-driver` | Auto-match drivers to orders using PostGIS |
| `generate-invoice` | Generate and email PDF invoices |

### Deploy All Functions

```bash
# Deploy all functions
supabase functions deploy stripe-webhook --project-ref YOUR_PROJECT_REF
supabase functions deploy send-notification --project-ref YOUR_PROJECT_REF
supabase functions deploy match-driver --project-ref YOUR_PROJECT_REF
supabase functions deploy generate-invoice --project-ref YOUR_PROJECT_REF
```

### Set Function Secrets

```bash
supabase secrets set --project-ref YOUR_PROJECT_REF \
  STRIPE_SECRET_KEY=sk_live_... \
  STRIPE_WEBHOOK_SECRET=whsec_... \
  TWILIO_ACCOUNT_SID=AC... \
  TWILIO_AUTH_TOKEN=... \
  TWILIO_PHONE_NUMBER=+1... \
  ONESIGNAL_APP_ID=... \
  ONESIGNAL_API_KEY=... \
  RESEND_API_KEY=re_... \
  FROM_EMAIL="Hauly <noreply@hauly.app>"
```

### Function URLs

After deployment, functions are available at:
```
https://[PROJECT_REF].supabase.co/functions/v1/stripe-webhook
https://[PROJECT_REF].supabase.co/functions/v1/send-notification
https://[PROJECT_REF].supabase.co/functions/v1/match-driver
https://[PROJECT_REF].supabase.co/functions/v1/generate-invoice
```

## 8. Configure Stripe Webhook

1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Add endpoint:
   - URL: `https://[PROJECT_REF].supabase.co/functions/v1/stripe-webhook`
   - Events to listen:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `account.updated`
     - `payout.paid`
     - `payout.failed`
     - `charge.refunded`
     - `charge.dispute.created`
3. Copy the signing secret to `STRIPE_WEBHOOK_SECRET`

## 9. Security Checklist

- [ ] Enable RLS on all tables (migrations do this automatically)
- [ ] Verify service role key is not exposed in client apps
- [ ] Enable 2FA for dashboard access
- [ ] Set up database backup alerts
- [ ] Configure rate limiting for auth endpoints
- [ ] Review and audit RLS policies

## 10. Monitoring & Alerts

### Enable Logging
1. Go to **Settings > Logs**
2. Enable API logs
3. Set retention period

### Set Up Alerts (Pro Plan)
1. Go to **Settings > Integrations**
2. Configure alerts for:
   - Database CPU > 80%
   - Storage > 80%
   - API errors spike
   - Auth failures spike

## Environment Variables Reference

After setup, update these files:

### Root `.env.production`
```env
SUPABASE_URL=https://[PROJECT_REF].supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### `apps/web/.env.production`
```env
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### `apps/admin/.env.production`
```env
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### `apps/mobile/.env.production`
```env
EXPO_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## Troubleshooting

### Migration Fails
```bash
# Check migration status
supabase db diff

# Reset and re-run (CAUTION: destroys data)
supabase db reset
```

### RLS Policy Issues
```sql
-- Check RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

-- View policies on a table
SELECT * FROM pg_policies WHERE tablename = 'orders';
```

### Connection Issues
- Verify project is not paused (free tier pauses after 1 week inactive)
- Check if IP is allowlisted (Settings > Database > Network Bans)
- Use pooler connection string for serverless environments
