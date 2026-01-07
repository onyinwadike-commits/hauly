import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'Hauly <invoices@hauly.app>';

interface InvoiceRequest {
  order_id: string;
  send_email?: boolean;
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
    const { order_id, send_email = true }: InvoiceRequest = await req.json();

    if (!order_id) {
      return new Response(
        JSON.stringify({ error: 'order_id is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get order with related data
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        customer:users!orders_customer_id_fkey(id, full_name, email, phone),
        driver:users!orders_driver_id_fkey(id, full_name),
        payment:payments(*)
      `)
      .eq('id', order_id)
      .single();

    if (orderError || !order) {
      return new Response(
        JSON.stringify({ error: 'Order not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Calculate invoice details
    const subtotalCents = order.base_price_cents || 0;
    const laborCents = (order.estimated_hours || 0) * (order.hourly_rate_cents || 0);
    const tipCents = order.tip_cents || 0;
    const taxCents = Math.round((subtotalCents + laborCents) * 0.0825); // 8.25% Nevada tax
    const totalCents = subtotalCents + laborCents + taxCents + tipCents;

    const formatCurrency = (cents: number) => `$${(cents / 100).toFixed(2)}`;
    const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Generate invoice HTML
    const invoiceHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; margin: 0; padding: 20px; }
    .invoice { max-width: 800px; margin: 0 auto; border: 1px solid #e5e5e5; }
    .header { background: #1E3A5F; color: white; padding: 30px; }
    .logo { font-size: 32px; font-weight: bold; color: #C27D4B; }
    .invoice-title { font-size: 24px; margin-top: 10px; }
    .content { padding: 30px; }
    .row { display: flex; justify-content: space-between; margin-bottom: 20px; }
    .section { margin-bottom: 30px; }
    .section-title { font-size: 14px; color: #888; text-transform: uppercase; margin-bottom: 10px; }
    .line-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
    .total-section { background: #f8f8f8; padding: 20px; margin-top: 20px; }
    .total-row { display: flex; justify-content: space-between; padding: 5px 0; }
    .grand-total { font-size: 24px; font-weight: bold; color: #1E3A5F; border-top: 2px solid #1E3A5F; padding-top: 10px; margin-top: 10px; }
    .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; border-top: 1px solid #eee; }
    .status { display: inline-block; padding: 5px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; }
    .status-paid { background: #DEF7EC; color: #03543F; }
    .status-pending { background: #FEF3C7; color: #92400E; }
  </style>
</head>
<body>
  <div class="invoice">
    <div class="header">
      <div class="logo">HAULY</div>
      <div class="invoice-title">Invoice</div>
    </div>

    <div class="content">
      <div class="row">
        <div>
          <div class="section-title">Invoice Details</div>
          <div><strong>Invoice #:</strong> INV-${order.job_number}</div>
          <div><strong>Job #:</strong> ${order.job_number}</div>
          <div><strong>Date:</strong> ${formatDate(order.completed_at || order.created_at)}</div>
          <div><strong>Status:</strong>
            <span class="status ${order.payment_status === 'paid' ? 'status-paid' : 'status-pending'}">
              ${order.payment_status === 'paid' ? 'PAID' : 'PENDING'}
            </span>
          </div>
        </div>
        <div style="text-align: right;">
          <div class="section-title">Bill To</div>
          <div><strong>${order.customer?.full_name}</strong></div>
          <div>${order.customer?.email}</div>
          <div>${order.customer?.phone}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Service Details</div>
        <div class="line-item">
          <span><strong>Service Type:</strong></span>
          <span>${order.service_type?.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}</span>
        </div>
        <div class="line-item">
          <span><strong>Pickup:</strong></span>
          <span>${order.pickup_address}</span>
        </div>
        ${order.dropoff_address ? `
        <div class="line-item">
          <span><strong>Dropoff:</strong></span>
          <span>${order.dropoff_address}</span>
        </div>
        ` : ''}
        <div class="line-item">
          <span><strong>Date of Service:</strong></span>
          <span>${formatDate(order.scheduled_date)} ${order.scheduled_time_start}</span>
        </div>
        ${order.driver ? `
        <div class="line-item">
          <span><strong>Hauler:</strong></span>
          <span>${order.driver.full_name}</span>
        </div>
        ` : ''}
      </div>

      <div class="section">
        <div class="section-title">Charges</div>
        <div class="line-item">
          <span>Base Service Fee</span>
          <span>${formatCurrency(subtotalCents)}</span>
        </div>
        ${laborCents > 0 ? `
        <div class="line-item">
          <span>Labor (${order.estimated_hours} hrs @ ${formatCurrency(order.hourly_rate_cents || 0)}/hr)</span>
          <span>${formatCurrency(laborCents)}</span>
        </div>
        ` : ''}
      </div>

      <div class="total-section">
        <div class="total-row">
          <span>Subtotal</span>
          <span>${formatCurrency(subtotalCents + laborCents)}</span>
        </div>
        <div class="total-row">
          <span>Tax (8.25%)</span>
          <span>${formatCurrency(taxCents)}</span>
        </div>
        ${tipCents > 0 ? `
        <div class="total-row">
          <span>Tip</span>
          <span>${formatCurrency(tipCents)}</span>
        </div>
        ` : ''}
        <div class="total-row grand-total">
          <span>Total</span>
          <span>${formatCurrency(totalCents)}</span>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>Thank you for choosing Hauly!</p>
      <p>Hauly Technologies Inc. • Henderson, NV • support@hauly.app</p>
      <p>Questions about this invoice? Contact us at billing@hauly.app</p>
    </div>
  </div>
</body>
</html>
    `;

    // Send email if requested
    let emailResult = null;
    if (send_email && order.customer?.email && RESEND_API_KEY) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [order.customer.email],
          subject: `Hauly Invoice - ${order.job_number}`,
          html: invoiceHtml,
        }),
      });

      emailResult = await emailResponse.json();
      console.log(`Invoice email sent to ${order.customer.email}: ${emailResult.id || emailResult.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        invoice: {
          number: `INV-${order.job_number}`,
          job_number: order.job_number,
          customer_name: order.customer?.full_name,
          subtotal: formatCurrency(subtotalCents + laborCents),
          tax: formatCurrency(taxCents),
          tip: formatCurrency(tipCents),
          total: formatCurrency(totalCents),
          status: order.payment_status,
        },
        email_sent: !!emailResult?.id,
        html: invoiceHtml,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Generate invoice error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
});
