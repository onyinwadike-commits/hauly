# Hauly Launch Checklist

## Infrastructure
- [ ] Supabase production project created
- [ ] All migrations applied to production
- [ ] RLS policies tested thoroughly
- [ ] Edge functions deployed
- [ ] Storage buckets configured with proper permissions
- [ ] PITR backups enabled
- [ ] Connection pooling configured

## Web Deployment
- [ ] apps/web deployed to Vercel
- [ ] apps/admin deployed to Vercel
- [ ] Custom domains configured (hauly.app, admin.hauly.app)
- [ ] SSL certificates active
- [ ] Environment variables set in Vercel
- [ ] Sentry error tracking configured

## Mobile Deployment
- [ ] EAS secrets configured
- [ ] iOS build successful
- [ ] Android build successful
- [ ] App submitted to App Store
- [ ] App submitted to Google Play Store
- [ ] Deep linking tested
- [ ] Push notifications working

## Integrations
- [ ] Stripe live keys configured
- [ ] Stripe webhooks registered and tested
- [ ] Stripe Connect onboarding flow tested
- [ ] Twilio phone number verified
- [ ] SMS notifications working
- [ ] OneSignal configured
- [ ] Push notifications working
- [ ] Google Maps API keys restricted by domain/app
- [ ] Email provider (Resend) configured

## Security
- [ ] All API keys rotated from test keys
- [ ] Environment variables secured (not in git)
- [ ] Stripe webhook signature verification enabled
- [ ] Admin routes protected
- [ ] Rate limiting configured
- [ ] CORS properly configured

## Legal & Compliance
- [ ] Terms of Service published
- [ ] Privacy Policy published
- [ ] Driver Agreement published
- [ ] Insurance documentation uploaded
- [ ] Business licenses verified
- [ ] NV Secretary of State filing complete

## Operations
- [ ] Admin user accounts created
- [ ] First driver accounts created and verified
- [ ] Support email configured (support@hauly.app)
- [ ] Intercom/support chat installed (optional)
- [ ] Analytics tracking verified

## Testing
- [ ] Full customer booking flow tested
- [ ] Full driver job completion flow tested
- [ ] Payment processing tested with real cards
- [ ] Refund process tested
- [ ] Driver payout tested
- [ ] Photo upload/download tested
- [ ] All notification types tested

## Monitoring
- [ ] Sentry alerts configured
- [ ] Uptime monitoring configured (Vercel/external)
- [ ] Database performance monitoring enabled
- [ ] Stripe dashboard monitored

## Launch Day
- [ ] Announce soft launch to initial driver network
- [ ] Monitor for errors in first 24 hours
- [ ] Have rollback plan ready
- [ ] Support team briefed

---

## Emergency Contacts

| Role | Name | Phone | Email |
|------|------|-------|-------|
| Tech Lead | | | |
| Stripe Support | | 1-888-926-2289 | |
| Supabase Support | | | support@supabase.io |
| Twilio Support | | | |

---

## Rollback Procedures

### Web Apps
1. Go to Vercel dashboard
2. Select deployment to rollback to
3. Click "Promote to Production"

### Mobile Apps
1. iOS: Request expedited review for hotfix
2. Android: Use staged rollout, halt if issues

### Database
1. Use Supabase PITR to restore
2. Or manually revert migration
