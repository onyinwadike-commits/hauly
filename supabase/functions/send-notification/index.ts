import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID');
const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN');
const TWILIO_PHONE_NUMBER = Deno.env.get('TWILIO_PHONE_NUMBER');
const ONESIGNAL_APP_ID = Deno.env.get('ONESIGNAL_APP_ID');
const ONESIGNAL_API_KEY = Deno.env.get('ONESIGNAL_API_KEY');

interface NotificationRequest {
  type: 'sms' | 'push' | 'both';
  to: string; // phone number or user ID
  title?: string;
  message: string;
  data?: Record<string, any>;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    const { type, to, title, message, data }: NotificationRequest = await req.json();

    if (!type || !to || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: type, to, message' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const results: any = {};

    // Send SMS
    if (type === 'sms' || type === 'both') {
      if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_PHONE_NUMBER) {
        const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;

        const formData = new URLSearchParams();
        formData.append('To', to);
        formData.append('From', TWILIO_PHONE_NUMBER);
        formData.append('Body', message);

        const smsResponse = await fetch(twilioUrl, {
          method: 'POST',
          headers: {
            Authorization: `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData,
        });

        const smsResult = await smsResponse.json();
        results.sms = {
          success: smsResponse.ok,
          sid: smsResult.sid,
          error: smsResult.message,
        };

        console.log(`SMS sent to ${to}: ${smsResult.sid || smsResult.message}`);
      } else {
        results.sms = { success: false, error: 'Twilio not configured' };
      }
    }

    // Send Push Notification
    if (type === 'push' || type === 'both') {
      if (ONESIGNAL_APP_ID && ONESIGNAL_API_KEY) {
        const pushResponse = await fetch('https://onesignal.com/api/v1/notifications', {
          method: 'POST',
          headers: {
            Authorization: `Basic ${ONESIGNAL_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            app_id: ONESIGNAL_APP_ID,
            include_external_user_ids: [to],
            headings: { en: title || 'Hauly' },
            contents: { en: message },
            data: data || {},
            ios_sound: 'default',
            android_sound: 'default',
          }),
        });

        const pushResult = await pushResponse.json();
        results.push = {
          success: pushResponse.ok,
          id: pushResult.id,
          recipients: pushResult.recipients,
          error: pushResult.errors,
        };

        console.log(`Push sent to ${to}: ${pushResult.id || JSON.stringify(pushResult.errors)}`);
      } else {
        results.push = { success: false, error: 'OneSignal not configured' };
      }
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Notification error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
});
