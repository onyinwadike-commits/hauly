import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

interface MatchRequest {
  order_id: string;
  max_distance_km?: number;
  notify_driver?: boolean;
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
    const { order_id, max_distance_km = 25, notify_driver = true }: MatchRequest = await req.json();

    if (!order_id) {
      return new Response(
        JSON.stringify({ error: 'order_id is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Matching driver for order: ${order_id}`);

    // Get order details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*, customer:users!orders_customer_id_fkey(full_name, phone)')
      .eq('id', order_id)
      .single();

    if (orderError || !order) {
      console.error('Order not found:', orderError);
      return new Response(
        JSON.stringify({ error: 'Order not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if order is already matched
    if (order.driver_id) {
      return new Response(
        JSON.stringify({ matched: true, message: 'Order already has a driver assigned' }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Determine vehicle requirement based on load size
    let requiredVehicle = null;
    if (order.load_size === 'heavy') {
      requiredVehicle = 'box_truck';
    } else if (order.load_size === 'medium') {
      requiredVehicle = 'cargo_van'; // cargo_van or box_truck
    }

    // Find nearby available drivers using PostGIS function
    const { data: drivers, error: driversError } = await supabase.rpc('find_nearby_drivers', {
      pickup_point: order.pickup_location,
      max_distance_km: max_distance_km,
      required_vehicle: requiredVehicle,
    });

    if (driversError) {
      console.error('Error finding drivers:', driversError);
      throw driversError;
    }

    if (!drivers || drivers.length === 0) {
      console.log('No drivers available for order:', order_id);
      return new Response(
        JSON.stringify({
          matched: false,
          message: 'No drivers available in your area',
          searched_radius_km: max_distance_km,
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Select best driver (already sorted by distance and rating)
    const bestDriver = drivers[0];

    console.log(`Best driver found: ${bestDriver.full_name} (${bestDriver.distance_km.toFixed(2)} km away)`);

    // Assign driver to order
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        driver_id: bestDriver.user_id,
        status: 'matched',
        matched_at: new Date().toISOString(),
      })
      .eq('id', order_id)
      .eq('driver_id', null); // Ensure no race condition

    if (updateError) {
      console.error('Error assigning driver:', updateError);
      throw updateError;
    }

    // Notify driver if enabled
    if (notify_driver) {
      try {
        const notificationUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/send-notification`;

        // Get driver phone
        const { data: driverUser } = await supabase
          .from('users')
          .select('phone')
          .eq('id', bestDriver.user_id)
          .single();

        // Send SMS to driver
        if (driverUser?.phone) {
          await fetch(notificationUrl, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'sms',
              to: driverUser.phone,
              message: `HAULY: You've been assigned job ${order.job_number}. Pickup: ${order.pickup_address}. Open the app for details.`,
            }),
          });
        }

        // Send push notification
        await fetch(notificationUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'push',
            to: bestDriver.user_id,
            title: 'New Job Assigned! 🚚',
            message: `You've been assigned job ${order.job_number}. Tap to view details.`,
            data: { screen: 'ActiveJob', orderId: order_id, jobNumber: order.job_number },
          }),
        });

        console.log(`Notifications sent to driver ${bestDriver.user_id}`);
      } catch (notifyError) {
        console.error('Error sending notifications:', notifyError);
        // Don't fail the match if notifications fail
      }
    }

    return new Response(
      JSON.stringify({
        matched: true,
        driver: {
          id: bestDriver.user_id,
          name: bestDriver.full_name,
          rating: bestDriver.rating,
          vehicle_type: bestDriver.vehicle_type,
          distance_km: bestDriver.distance_km,
          eta_minutes: Math.ceil(bestDriver.distance_km * 2), // Rough estimate
        },
        order_id: order_id,
        job_number: order.job_number,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Match driver error:', error);
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
