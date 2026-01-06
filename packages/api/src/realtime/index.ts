import { supabase } from '../client';
import type { Order } from '@hauly/types';
import type { RealtimeChannel } from '@supabase/supabase-js';

export function subscribeToOrder(
  orderId: string,
  onUpdate: (order: Order) => void
): RealtimeChannel {
  return supabase
    .channel(`order-${orderId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'orders',
        filter: `id=eq.${orderId}`
      },
      (payload) => {
        onUpdate(payload.new as Order);
      }
    )
    .subscribe();
}

export function subscribeToDriverLocation(
  driverId: string,
  onUpdate: (location: { latitude: number; longitude: number }) => void
): RealtimeChannel {
  return supabase
    .channel(`driver-location-${driverId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'driver_profiles',
        filter: `user_id=eq.${driverId}`
      },
      (payload) => {
        const location = payload.new.current_location;
        if (location) {
          // Parse PostGIS POINT format
          const match = location.match(/POINT\(([-\d.]+) ([-\d.]+)\)/);
          if (match) {
            onUpdate({
              longitude: parseFloat(match[1]),
              latitude: parseFloat(match[2])
            });
          }
        }
      }
    )
    .subscribe();
}

export function subscribeToAvailableJobs(
  onNewJob: (order: Order) => void,
  onJobTaken: (orderId: string) => void
): RealtimeChannel {
  return supabase
    .channel('available-jobs')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'orders',
        filter: 'status=eq.requested'
      },
      (payload) => {
        onNewJob(payload.new as Order);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'orders'
      },
      (payload) => {
        if (payload.old.status === 'requested' && payload.new.status !== 'requested') {
          onJobTaken(payload.new.id);
        }
      }
    )
    .subscribe();
}

export function unsubscribe(channel: RealtimeChannel) {
  supabase.removeChannel(channel);
}
