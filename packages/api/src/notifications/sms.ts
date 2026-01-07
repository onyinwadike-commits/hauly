import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !fromNumber) {
  console.warn('Twilio credentials not configured');
}

const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

export interface SendSMSParams {
  to: string;
  body: string;
}

export async function sendSMS(params: SendSMSParams): Promise<string | null> {
  if (!client) {
    console.warn('Twilio not configured, SMS not sent:', params);
    return null;
  }

  try {
    // Format phone number
    const toNumber = formatPhoneNumber(params.to);

    const message = await client.messages.create({
      body: params.body,
      to: toNumber,
      from: fromNumber,
    });

    console.log(`SMS sent: ${message.sid}`);
    return message.sid;
  } catch (error) {
    console.error('Failed to send SMS:', error);
    throw error;
  }
}

function formatPhoneNumber(phone: string): string {
  // Remove non-digits
  const digits = phone.replace(/\D/g, '');

  // Add country code if not present
  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }

  return `+${digits}`;
}

// Pre-built notification templates
export const SMSTemplates = {
  // Customer notifications
  orderConfirmed: (jobNumber: string) => ({
    body: `HAULY: Your booking ${jobNumber} is confirmed! We're matching you with a Hauler now. Track your order in the app.`,
  }),

  driverMatched: (jobNumber: string, driverName: string, eta: string) => ({
    body: `HAULY: Great news! ${driverName} has been assigned to your job ${jobNumber}. ETA: ${eta}. Track live in the app.`,
  }),

  driverEnRoute: (driverName: string, eta: string) => ({
    body: `HAULY: ${driverName} is on the way! Arriving in approximately ${eta}. Track live: hauly.app/track`,
  }),

  driverArrived: (driverName: string) => ({
    body: `HAULY: ${driverName} has arrived! Please meet them at the pickup location.`,
  }),

  jobStarted: (jobNumber: string) => ({
    body: `HAULY: Job ${jobNumber} has started. Before photos captured. You'll receive after photos upon completion.`,
  }),

  jobCompleted: (jobNumber: string, total: string) => ({
    body: `HAULY: Job ${jobNumber} complete! Total: ${total}. Rate your Hauler in the app. Thank you for using Hauly!`,
  }),

  // Driver notifications
  newJobAvailable: (earnings: string, location: string) => ({
    body: `HAULY: New job available! Earn ${earnings}. Location: ${location}. Open app to accept.`,
  }),

  jobAssigned: (jobNumber: string, pickupAddress: string, time: string) => ({
    body: `HAULY: You've been assigned job ${jobNumber}. Pickup: ${pickupAddress} at ${time}. Open app for details.`,
  }),

  paymentReceived: (amount: string, jobNumber: string) => ({
    body: `HAULY: Payment received! ${amount} for job ${jobNumber} has been added to your balance.`,
  }),

  weeklyPayout: (amount: string) => ({
    body: `HAULY: Your weekly payout of ${amount} is on its way to your bank account. Thanks for hauling with us!`,
  }),

  // Admin notifications
  newApplication: (driverName: string) => ({
    body: `HAULY ADMIN: New driver application from ${driverName}. Review at admin.hauly.app`,
  }),

  highValueOrder: (jobNumber: string, total: string) => ({
    body: `HAULY ADMIN: High-value order ${jobNumber} placed. Total: ${total}. Monitor at admin.hauly.app`,
  }),
};

// Send notification with template
export async function sendNotification(
  to: string,
  template: keyof typeof SMSTemplates,
  ...args: any[]
): Promise<string | null> {
  const templateFn = SMSTemplates[template] as (...args: any[]) => { body: string };
  const { body } = templateFn(...args);
  return sendSMS({ to, body });
}
