# Production Verification Checklist

Final verification steps before going live. Complete all checks to ensure the system is ready for launch.

## 1. Web App (https://hauly.app)

- [ ] Homepage loads correctly
- [ ] Pricing page displays
- [ ] Quote flow works
- [ ] Demo request submits

## 2. Admin Dashboard (https://admin.hauly.app)

- [ ] Login works for admin users
- [ ] Dashboard metrics display
- [ ] Orders table loads
- [ ] Driver applications visible

## 3. Mobile App

- [ ] Download from TestFlight/Internal Testing
- [ ] Sign up flow works
- [ ] Sign in flow works
- [ ] Book a test order
- [ ] As driver: go online, accept job
- [ ] Complete full job flow with photos

## 4. Integrations

- [ ] Complete a $1 test payment
- [ ] Verify Stripe webhook received
- [ ] Verify SMS notification sent
- [ ] Verify push notification received
- [ ] Verify email confirmation sent

## 5. Monitoring

- [ ] Trigger test error, verify Sentry captures
- [ ] Check Vercel analytics
- [ ] Check Supabase dashboard metrics

---

## Verification Sign-off

| Check | Verified By | Date | Notes |
|-------|-------------|------|-------|
| Web App | | | |
| Admin Dashboard | | | |
| Mobile App (iOS) | | | |
| Mobile App (Android) | | | |
| Payment Integration | | | |
| Notifications | | | |
| Monitoring | | | |

---

**If all checks pass, you are ready for launch!** 🚀
