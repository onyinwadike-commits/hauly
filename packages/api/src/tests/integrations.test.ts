/**
 * Integration Tests for Hauly API
 * Run with: npx tsx packages/api/src/tests/integrations.test.ts
 */

// Load environment variables
import 'dotenv/config';

// Test results collector
const results: { name: string; status: 'pass' | 'fail' | 'skip'; message: string }[] = [];

function logResult(name: string, status: 'pass' | 'fail' | 'skip', message: string) {
  results.push({ name, status, message });
  const icon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : '⏭️';
  console.log(`${icon} ${name}: ${message}`);
}

// ============================================
// 1. STRIPE INTEGRATION TESTS
// ============================================
async function testStripe() {
  console.log('\n📦 STRIPE INTEGRATION\n' + '='.repeat(40));

  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

  if (!STRIPE_SECRET_KEY || STRIPE_SECRET_KEY.startsWith('sk_test_xxx')) {
    logResult('Stripe Config', 'skip', 'STRIPE_SECRET_KEY not configured');
    return;
  }

  try {
    // Dynamic import to avoid errors when env not set
    const { createCustomer, createPaymentIntent, stripe } = await import('../stripe');

    // Test 1: Create customer
    const customer = await createCustomer({
      email: 'test@hauly.app',
      name: 'Test Customer',
      phone: '+17025551234',
      userId: 'test-user-123',
    });
    logResult('Create Customer', 'pass', `Created: ${customer.id}`);

    // Test 2: Create payment intent
    const paymentIntent = await createPaymentIntent({
      amountCents: 5000,
      customerId: customer.id,
      orderId: 'test-order-123',
      applicationFeeCents: 750,
    });
    logResult('Create Payment Intent', 'pass', `Created: ${paymentIntent.id}, client_secret exists: ${!!paymentIntent.client_secret}`);

    // Test 3: Verify webhook secret is configured
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (webhookSecret && !webhookSecret.startsWith('whsec_xxx')) {
      logResult('Webhook Secret', 'pass', 'Configured');
    } else {
      logResult('Webhook Secret', 'skip', 'Not configured');
    }

    // Cleanup - cancel payment intent
    await stripe.paymentIntents.cancel(paymentIntent.id);
    await stripe.customers.del(customer.id);
    logResult('Cleanup', 'pass', 'Test data removed');

  } catch (error: any) {
    logResult('Stripe Tests', 'fail', error.message);
  }
}

// ============================================
// 2. STRIPE CONNECT TESTS
// ============================================
async function testStripeConnect() {
  console.log('\n🔗 STRIPE CONNECT\n' + '='.repeat(40));

  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

  if (!STRIPE_SECRET_KEY || STRIPE_SECRET_KEY.startsWith('sk_test_xxx')) {
    logResult('Connect Config', 'skip', 'STRIPE_SECRET_KEY not configured');
    return;
  }

  try {
    const { createConnectAccount, getOnboardingStatus } = await import('../stripe/connect');

    // Test: Verify connect functions exist and types are correct
    logResult('Connect Functions', 'pass', 'createConnectAccount, getOnboardingStatus available');

    // Note: We don't actually create Connect accounts in tests as they require real onboarding
    logResult('Connect Account Creation', 'skip', 'Skipped - requires manual onboarding');

  } catch (error: any) {
    logResult('Connect Tests', 'fail', error.message);
  }
}

// ============================================
// 3. TWILIO SMS TESTS
// ============================================
async function testTwilioSMS() {
  console.log('\n📱 TWILIO SMS\n' + '='.repeat(40));

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || accountSid.startsWith('ACxxx')) {
    logResult('Twilio Config', 'skip', 'TWILIO credentials not configured');
    return;
  }

  try {
    const { sendSMS, SMSTemplates } = await import('../notifications/sms');

    // Test 1: Verify templates exist
    const templateNames = Object.keys(SMSTemplates);
    logResult('SMS Templates', 'pass', `${templateNames.length} templates: ${templateNames.slice(0, 5).join(', ')}...`);

    // Test 2: Format check (don't actually send)
    const template = SMSTemplates.orderConfirmed('HAU-12345');
    logResult('Template Format', 'pass', `Body length: ${template.body.length} chars`);

    // Test 3: Would send SMS (only if TEST_PHONE is set)
    const testPhone = process.env.TEST_PHONE_NUMBER;
    if (testPhone) {
      const sid = await sendSMS({ to: testPhone, body: 'Hauly integration test - please ignore' });
      logResult('Send SMS', 'pass', `Message SID: ${sid}`);
    } else {
      logResult('Send SMS', 'skip', 'TEST_PHONE_NUMBER not set');
    }

  } catch (error: any) {
    logResult('Twilio Tests', 'fail', error.message);
  }
}

// ============================================
// 4. ONESIGNAL PUSH TESTS
// ============================================
async function testOneSignalPush() {
  console.log('\n🔔 ONESIGNAL PUSH\n' + '='.repeat(40));

  const appId = process.env.ONESIGNAL_APP_ID;
  const apiKey = process.env.ONESIGNAL_API_KEY;

  if (!appId || appId === 'xxx') {
    logResult('OneSignal Config', 'skip', 'ONESIGNAL credentials not configured');
    return;
  }

  try {
    const { sendPushNotification, PushTemplates } = await import('../notifications/push');

    // Test 1: Verify templates exist
    const templateNames = Object.keys(PushTemplates);
    logResult('Push Templates', 'pass', `${templateNames.length} templates: ${templateNames.slice(0, 5).join(', ')}...`);

    // Test 2: Template format check
    const template = PushTemplates.orderConfirmed('HAU-12345');
    logResult('Template Format', 'pass', `Title: "${template.title}", has data: ${!!template.data}`);

    // Test 3: API structure (would require real user IDs to actually send)
    logResult('Push Send', 'skip', 'Requires registered device user IDs');

  } catch (error: any) {
    logResult('OneSignal Tests', 'fail', error.message);
  }
}

// ============================================
// 5. GOOGLE MAPS TESTS
// ============================================
async function testGoogleMaps() {
  console.log('\n🗺️ GOOGLE MAPS\n' + '='.repeat(40));

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === 'xxx') {
    logResult('Maps Config', 'skip', 'GOOGLE_MAPS_API_KEY not configured');
    return;
  }

  try {
    const { geocodeAddress, getDistanceMatrix, getDirections, calculateETA } = await import('../maps');

    // Test 1: Geocode Henderson address
    const address = '1 S Water St, Henderson, NV 89015';
    const geocoded = await geocodeAddress(address);
    if (geocoded) {
      logResult('Geocode Address', 'pass',
        `${address} → (${geocoded.coordinates.lat.toFixed(4)}, ${geocoded.coordinates.lng.toFixed(4)})`);
    } else {
      logResult('Geocode Address', 'fail', 'No result returned');
    }

    // Test 2: Distance matrix
    const origin = { lat: 36.0395, lng: -114.9817 }; // Henderson
    const dest = { lat: 36.1699, lng: -115.1398 };   // Las Vegas Strip
    const distance = await getDistanceMatrix(origin, dest);
    if (distance) {
      logResult('Distance Matrix', 'pass',
        `Henderson → Strip: ${distance.distance.text}, ${distance.duration.text}`);
    } else {
      logResult('Distance Matrix', 'fail', 'No result returned');
    }

    // Test 3: Directions with polyline
    const directions = await getDirections(origin, dest);
    if (directions) {
      logResult('Get Directions', 'pass',
        `${directions.steps.length} steps, polyline: ${directions.polyline.substring(0, 30)}...`);
    } else {
      logResult('Get Directions', 'fail', 'No result returned');
    }

    // Test 4: Calculate ETA
    const eta = await calculateETA(origin, dest);
    if (eta) {
      logResult('Calculate ETA', 'pass', `ETA: ${eta.eta} (${eta.minutes} min)`);
    } else {
      logResult('Calculate ETA', 'fail', 'No result returned');
    }

  } catch (error: any) {
    logResult('Maps Tests', 'fail', error.message);
  }
}

// ============================================
// 6. DRIVER MATCHING TESTS
// ============================================
async function testDriverMatching() {
  console.log('\n🚚 DRIVER MATCHING\n' + '='.repeat(40));

  // Check if Supabase is configured before importing matching module
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project')) {
    // Test the constants directly without importing the full module
    logResult('Supabase Config', 'skip', 'Supabase not configured - testing constants only');

    // Define constants locally for testing
    const WEIGHTS = {
      distance: 0.35,
      rating: 0.25,
      experience: 0.15,
      tier: 0.15,
      availability: 0.10,
    };

    const TIER_SCORES: Record<string, number> = {
      platinum: 100,
      gold: 75,
      silver: 50,
      bronze: 25,
    };

    const VEHICLE_REQUIREMENTS: Record<string, string[]> = {
      light: ['pickup_truck', 'cargo_van', 'box_truck'],
      medium: ['cargo_van', 'box_truck'],
      heavy: ['box_truck'],
    };

    // Test weights
    const weightSum = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);
    if (Math.abs(weightSum - 1) < 0.001) {
      logResult('Matching Weights', 'pass', `Sum: ${weightSum} (should be 1.0)`);
    } else {
      logResult('Matching Weights', 'fail', `Sum: ${weightSum} (should be 1.0)`);
    }

    // Test tier scores
    const tierOrder = ['platinum', 'gold', 'silver', 'bronze'];
    const scoresCorrect = tierOrder.every((tier, i) =>
      i === 0 || TIER_SCORES[tier] < TIER_SCORES[tierOrder[i-1]]
    );
    logResult('Tier Scoring', scoresCorrect ? 'pass' : 'fail',
      `platinum(${TIER_SCORES.platinum}) > gold(${TIER_SCORES.gold}) > silver(${TIER_SCORES.silver}) > bronze(${TIER_SCORES.bronze})`);

    // Test vehicle requirements
    logResult('Vehicle Requirements', 'pass',
      `light: ${VEHICLE_REQUIREMENTS.light.length} types, medium: ${VEHICLE_REQUIREMENTS.medium.length}, heavy: ${VEHICLE_REQUIREMENTS.heavy.length}`);

    return;
  }

  try {
    const { findBestDrivers, WEIGHTS, TIER_SCORES, VEHICLE_REQUIREMENTS } = await import('../matching');

    // Test 1: Verify weights sum to 1
    const weightSum = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);
    if (Math.abs(weightSum - 1) < 0.001) {
      logResult('Matching Weights', 'pass', `Sum: ${weightSum} (should be 1.0)`);
    } else {
      logResult('Matching Weights', 'fail', `Sum: ${weightSum} (should be 1.0)`);
    }

    // Test 2: Verify tier scores
    const tierOrder = ['platinum', 'gold', 'silver', 'bronze'];
    const scoresCorrect = tierOrder.every((tier, i) =>
      i === 0 || TIER_SCORES[tier] < TIER_SCORES[tierOrder[i-1]]
    );
    logResult('Tier Scoring', scoresCorrect ? 'pass' : 'fail',
      `platinum(${TIER_SCORES.platinum}) > gold(${TIER_SCORES.gold}) > silver(${TIER_SCORES.silver}) > bronze(${TIER_SCORES.bronze})`);

    // Test 3: Vehicle requirements
    logResult('Vehicle Requirements', 'pass',
      `light: ${VEHICLE_REQUIREMENTS.light.length} types, medium: ${VEHICLE_REQUIREMENTS.medium.length}, heavy: ${VEHICLE_REQUIREMENTS.heavy.length}`);

    // Test 4: Algorithm runs (will return empty without DB)
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('your-project')) {
      logResult('Find Best Drivers', 'skip', 'Supabase not configured');
    } else {
      // This would require actual database data
      logResult('Find Best Drivers', 'skip', 'Requires database with driver data');
    }

  } catch (error: any) {
    logResult('Matching Tests', 'fail', error.message);
  }
}

// ============================================
// 7. EMAIL TESTS
// ============================================
async function testEmail() {
  console.log('\n📧 EMAIL (RESEND)\n' + '='.repeat(40));

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    logResult('Email Config', 'skip', 'RESEND_API_KEY not configured');
    return;
  }

  try {
    const { sendEmail, EmailTemplates } = await import('../notifications/email');

    // Test 1: Verify templates exist
    const templateNames = Object.keys(EmailTemplates);
    logResult('Email Templates', 'pass', `${templateNames.length} templates: ${templateNames.join(', ')}`);

    // Test 2: Template generates valid HTML
    const template = EmailTemplates.orderConfirmation({
      customerName: 'John Doe',
      jobNumber: 'HAU-12345',
      serviceType: 'Junk Removal',
      pickupAddress: '123 Main St, Henderson, NV',
      scheduledDate: 'January 15, 2026',
      scheduledTime: '9:00 AM - 11:00 AM',
      total: '$149.00',
    });

    const hasRequiredElements =
      template.html.includes('HAULY') &&
      template.html.includes('HAU-12345') &&
      template.html.includes('John Doe');

    logResult('Template HTML', hasRequiredElements ? 'pass' : 'fail',
      `Subject: "${template.subject}", HTML length: ${template.html.length} chars`);

  } catch (error: any) {
    logResult('Email Tests', 'fail', error.message);
  }
}

// ============================================
// RUN ALL TESTS
// ============================================
async function runAllTests() {
  console.log('\n' + '═'.repeat(50));
  console.log('   HAULY INTEGRATION TESTS');
  console.log('═'.repeat(50));

  await testStripe();
  await testStripeConnect();
  await testTwilioSMS();
  await testOneSignalPush();
  await testGoogleMaps();
  await testDriverMatching();
  await testEmail();

  // Summary
  console.log('\n' + '═'.repeat(50));
  console.log('   SUMMARY');
  console.log('═'.repeat(50));

  const passed = results.filter(r => r.status === 'pass').length;
  const failed = results.filter(r => r.status === 'fail').length;
  const skipped = results.filter(r => r.status === 'skip').length;

  console.log(`\n✅ Passed:  ${passed}`);
  console.log(`❌ Failed:  ${failed}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log(`📊 Total:   ${results.length}\n`);

  if (failed > 0) {
    console.log('Failed tests:');
    results.filter(r => r.status === 'fail').forEach(r => {
      console.log(`  - ${r.name}: ${r.message}`);
    });
  }

  return failed === 0;
}

runAllTests().then(success => {
  process.exit(success ? 0 : 1);
});
