// Using Resend for transactional emails
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'Hauly <noreply@hauly.app>';
const BASE_URL = 'https://api.resend.com';

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export async function sendEmail(params: SendEmailParams): Promise<string | null> {
  if (!RESEND_API_KEY) {
    console.warn('Resend API key not configured, email not sent');
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}/emails`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: Array.isArray(params.to) ? params.to : [params.to],
        subject: params.subject,
        html: params.html,
        text: params.text,
        reply_to: params.replyTo,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Email send failed:', result);
      throw new Error(result.message || 'Email send failed');
    }

    console.log(`Email sent: ${result.id}`);
    return result.id;
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
}

// Email Templates
export const EmailTemplates = {
  // Customer: Order Confirmation
  orderConfirmation: (data: {
    customerName: string;
    jobNumber: string;
    serviceType: string;
    pickupAddress: string;
    scheduledDate: string;
    scheduledTime: string;
    total: string;
  }) => ({
    subject: `Hauly Booking Confirmed - ${data.jobNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #3D3D3D; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1E3A5F; padding: 30px; text-align: center; }
            .logo { color: #C27D4B; font-size: 28px; font-weight: bold; }
            .content { padding: 30px; background: #FFFFFF; }
            .highlight { background: #F8F8F8; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #E5E5E5; }
            .total { font-size: 24px; font-weight: bold; color: #1E3A5F; }
            .button { display: inline-block; background: #C27D4B; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; }
            .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">HAULY</div>
              <p style="color: white; margin: 10px 0 0 0;">Consider it handled.</p>
            </div>
            <div class="content">
              <h2 style="color: #1E3A5F;">Booking Confirmed! ✓</h2>
              <p>Hi ${data.customerName},</p>
              <p>Your hauling job has been confirmed. We're matching you with a professional Hauler now.</p>

              <div class="highlight">
                <div style="font-size: 18px; font-weight: bold; color: #1E3A5F; margin-bottom: 15px;">
                  Job #${data.jobNumber}
                </div>
                <div class="detail-row">
                  <span>Service</span>
                  <strong>${data.serviceType}</strong>
                </div>
                <div class="detail-row">
                  <span>Pickup</span>
                  <strong>${data.pickupAddress}</strong>
                </div>
                <div class="detail-row">
                  <span>Date</span>
                  <strong>${data.scheduledDate}</strong>
                </div>
                <div class="detail-row">
                  <span>Time</span>
                  <strong>${data.scheduledTime}</strong>
                </div>
                <div style="margin-top: 20px; text-align: center;">
                  <span class="total">${data.total}</span>
                </div>
              </div>

              <p style="text-align: center;">
                <a href="https://hauly.app/orders/${data.jobNumber}" class="button">
                  Track Your Order
                </a>
              </p>

              <p style="margin-top: 30px; color: #888; font-size: 14px;">
                <strong>What's next?</strong><br>
                • We'll notify you when a Hauler is assigned<br>
                • You'll get a text when they're on their way<br>
                • Before & after photos will be sent automatically
              </p>
            </div>
            <div class="footer">
              <p>Questions? Reply to this email or contact support@hauly.app</p>
              <p>© ${new Date().getFullYear()} Hauly Technologies Inc. Henderson, NV</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // Customer: Job Completed with Photos
  jobCompleted: (data: {
    customerName: string;
    jobNumber: string;
    driverName: string;
    beforePhotos: string[];
    afterPhotos: string[];
    total: string;
    ratingLink: string;
  }) => ({
    subject: `Job Complete - ${data.jobNumber} Photos Inside`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #3D3D3D; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1E3A5F; padding: 30px; text-align: center; }
            .logo { color: #C27D4B; font-size: 28px; font-weight: bold; }
            .content { padding: 30px; background: #FFFFFF; }
            .photos { display: flex; gap: 10px; flex-wrap: wrap; margin: 15px 0; }
            .photo { width: 120px; height: 120px; object-fit: cover; border-radius: 8px; }
            .button { display: inline-block; background: #C27D4B; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; }
            .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">HAULY</div>
            </div>
            <div class="content">
              <h2 style="color: #16A34A;">✓ Job Complete!</h2>
              <p>Hi ${data.customerName},</p>
              <p>Great news! ${data.driverName} has completed your hauling job <strong>${data.jobNumber}</strong>.</p>

              <h3 style="color: #1E3A5F;">Before Photos</h3>
              <div class="photos">
                ${data.beforePhotos.map((url) => `<img src="${url}" class="photo" alt="Before">`).join('')}
              </div>

              <h3 style="color: #1E3A5F;">After Photos</h3>
              <div class="photos">
                ${data.afterPhotos.map((url) => `<img src="${url}" class="photo" alt="After">`).join('')}
              </div>

              <div style="background: #F8F8F8; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                <span style="font-size: 14px; color: #888;">Total Charged</span>
                <div style="font-size: 28px; font-weight: bold; color: #1E3A5F;">${data.total}</div>
              </div>

              <p style="text-align: center;">
                <a href="${data.ratingLink}" class="button">
                  Rate ${data.driverName} ⭐
                </a>
              </p>

              <p style="margin-top: 20px; color: #888; font-size: 14px; text-align: center;">
                Your feedback helps us maintain quality service.
              </p>
            </div>
            <div class="footer">
              <p>Thank you for using Hauly!</p>
              <p>© ${new Date().getFullYear()} Hauly Technologies Inc.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // Driver: Weekly Earnings Summary
  weeklyEarnings: (data: {
    driverName: string;
    weekEnding: string;
    totalEarnings: string;
    jobCount: number;
    tips: string;
    payoutDate: string;
    jobs: Array<{ jobNumber: string; date: string; earnings: string }>;
  }) => ({
    subject: `Your Weekly Earnings Summary - ${data.weekEnding}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #3D3D3D; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1E3A5F; padding: 30px; text-align: center; }
            .logo { color: #C27D4B; font-size: 28px; font-weight: bold; }
            .content { padding: 30px; background: #FFFFFF; }
            .earnings-box { background: #16A34A; color: white; padding: 30px; border-radius: 12px; text-align: center; margin: 20px 0; }
            .earnings-amount { font-size: 48px; font-weight: bold; }
            .job-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #E5E5E5; }
            .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">HAULY</div>
              <p style="color: white;">Driver Earnings</p>
            </div>
            <div class="content">
              <p>Hi ${data.driverName},</p>
              <p>Here's your earnings summary for the week ending ${data.weekEnding}:</p>

              <div class="earnings-box">
                <div style="font-size: 14px; opacity: 0.9;">Total Earnings</div>
                <div class="earnings-amount">${data.totalEarnings}</div>
                <div style="margin-top: 10px; font-size: 14px;">
                  ${data.jobCount} jobs completed • ${data.tips} in tips
                </div>
              </div>

              <h3 style="color: #1E3A5F;">Jobs This Week</h3>
              ${data.jobs.map((job) => `
                <div class="job-row">
                  <div>
                    <strong>${job.jobNumber}</strong>
                    <div style="color: #888; font-size: 12px;">${job.date}</div>
                  </div>
                  <strong style="color: #16A34A;">${job.earnings}</strong>
                </div>
              `).join('')}

              <div style="background: #F8F8F8; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <strong>💰 Payout scheduled for ${data.payoutDate}</strong>
                <p style="margin: 5px 0 0 0; font-size: 14px; color: #888;">
                  Funds will be deposited to your linked bank account.
                </p>
              </div>
            </div>
            <div class="footer">
              <p>Keep up the great work! 🚚</p>
              <p>© ${new Date().getFullYear()} Hauly Technologies Inc.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),
};

// Send templated email
export async function sendTemplatedEmail(
  to: string,
  template: keyof typeof EmailTemplates,
  data: any
): Promise<string | null> {
  const templateFn = EmailTemplates[template] as (data: any) => { subject: string; html: string };
  const { subject, html } = templateFn(data);
  return sendEmail({ to, subject, html });
}
