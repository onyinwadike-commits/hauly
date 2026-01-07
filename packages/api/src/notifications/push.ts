const ONESIGNAL_APP_ID = process.env.ONESIGNAL_APP_ID;
const ONESIGNAL_API_KEY = process.env.ONESIGNAL_API_KEY;

const BASE_URL = 'https://onesignal.com/api/v1';

interface PushNotificationParams {
  userIds: string[];
  title: string;
  message: string;
  data?: Record<string, any>;
  buttons?: Array<{ id: string; text: string }>;
  smallIcon?: string;
  largeIcon?: string;
  bigPicture?: string;
  sound?: string;
  ttl?: number;
}

interface OneSignalResponse {
  id: string;
  recipients: number;
  errors?: string[];
}

export async function sendPushNotification(
  params: PushNotificationParams
): Promise<OneSignalResponse | null> {
  if (!ONESIGNAL_APP_ID || !ONESIGNAL_API_KEY) {
    console.warn('OneSignal not configured, push not sent:', params);
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${ONESIGNAL_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        include_external_user_ids: params.userIds,
        headings: { en: params.title },
        contents: { en: params.message },
        data: params.data,
        buttons: params.buttons,
        small_icon: params.smallIcon || 'ic_notification',
        large_icon: params.largeIcon,
        big_picture: params.bigPicture,
        android_sound: params.sound,
        ios_sound: params.sound,
        ttl: params.ttl || 86400, // 24 hours default
      }),
    });

    const result = await response.json();

    if (result.errors && result.errors.length > 0) {
      console.error('OneSignal errors:', result.errors);
    }

    console.log(`Push notification sent: ${result.id}, recipients: ${result.recipients}`);
    return result;
  } catch (error) {
    console.error('Failed to send push notification:', error);
    throw error;
  }
}

// Send to specific user segments
export async function sendToSegment(
  segment: string,
  title: string,
  message: string,
  data?: Record<string, any>
): Promise<OneSignalResponse | null> {
  if (!ONESIGNAL_APP_ID || !ONESIGNAL_API_KEY) {
    console.warn('OneSignal not configured');
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${ONESIGNAL_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        included_segments: [segment],
        headings: { en: title },
        contents: { en: message },
        data,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('Failed to send segment notification:', error);
    throw error;
  }
}

// Pre-built push notification templates
export const PushTemplates = {
  // Customer notifications
  orderConfirmed: (jobNumber: string) => ({
    title: 'Booking Confirmed! 🎉',
    message: `Your booking ${jobNumber} is confirmed. We're finding you a Hauler.`,
    data: { screen: 'OrderDetail', jobNumber },
  }),

  driverMatched: (driverName: string, jobNumber: string) => ({
    title: 'Hauler Assigned! 🚚',
    message: `${driverName} will handle your job ${jobNumber}.`,
    data: { screen: 'OrderTracking', jobNumber },
  }),

  driverEnRoute: (driverName: string, eta: string) => ({
    title: `${driverName} is on the way! 📍`,
    message: `Arriving in approximately ${eta}`,
    data: { screen: 'LiveTracking' },
  }),

  driverArrived: (driverName: string) => ({
    title: 'Your Hauler has arrived! 🏁',
    message: `${driverName} is at the pickup location`,
    data: { screen: 'LiveTracking' },
  }),

  jobCompleted: (jobNumber: string) => ({
    title: 'Job Complete! ✅',
    message: `${jobNumber} is done. View photos and rate your Hauler.`,
    data: { screen: 'OrderComplete', jobNumber },
  }),

  // Driver notifications
  newJobAvailable: (earnings: string, distance: string) => ({
    title: 'New Job Available! 💰',
    message: `Earn ${earnings} • ${distance} away`,
    data: { screen: 'AvailableJobs' },
    sound: 'job_alert.wav',
  }),

  jobAccepted: (jobNumber: string) => ({
    title: 'Job Accepted! 🎯',
    message: `You got ${jobNumber}. Navigate to pickup now.`,
    data: { screen: 'ActiveJob', jobNumber },
  }),

  reminderUpcoming: (jobNumber: string, time: string) => ({
    title: 'Upcoming Job Reminder ⏰',
    message: `${jobNumber} starts at ${time}. Get ready!`,
    data: { screen: 'ActiveJob', jobNumber },
  }),

  paymentReceived: (amount: string) => ({
    title: 'Payment Received! 💵',
    message: `${amount} has been added to your balance`,
    data: { screen: 'Earnings' },
  }),

  tipReceived: (amount: string, customerName: string) => ({
    title: 'You got a tip! 🎉',
    message: `${customerName} tipped you ${amount}`,
    data: { screen: 'Earnings' },
  }),

  weeklyEarnings: (amount: string, jobCount: number) => ({
    title: 'Weekly Summary 📊',
    message: `You earned ${amount} from ${jobCount} jobs this week!`,
    data: { screen: 'Earnings' },
  }),
};

// Send templated notification
export async function sendTemplatedPush(
  userIds: string[],
  template: keyof typeof PushTemplates,
  ...args: any[]
): Promise<OneSignalResponse | null> {
  const templateFn = PushTemplates[template] as (...args: any[]) => {
    title: string;
    message: string;
    data?: Record<string, any>;
    sound?: string;
  };
  const { title, message, data, sound } = templateFn(...args);
  return sendPushNotification({ userIds, title, message, data, sound });
}
