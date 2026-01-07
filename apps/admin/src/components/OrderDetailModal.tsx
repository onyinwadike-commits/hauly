'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';

interface Order {
  id: string;
  job_number: string;
  status: string;
  service_type: string;
  load_size: string;
  pickup_address_text: string;
  pickup_instructions?: string;
  dropoff_address_text?: string;
  scheduled_date: string;
  scheduled_time_start: string;
  scheduled_time_end: string;
  estimated_hours: number;
  total_cents: number;
  driver_payout_cents: number;
  platform_fee_cents: number;
  tip_cents: number;
  customer_notes?: string;
  item_description?: string;
  created_at: string;
  accepted_at?: string;
  started_at?: string;
  completed_at?: string;
  customer?: { id: string; full_name: string; email: string; phone: string };
  driver?: { id: string; full_name: string; phone: string };
}

export function OrderDetailModal({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const supabase = createClient();

  async function updateStatus(newStatus: string) {
    setIsUpdating(true);
    try {
      await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', order.id);

      window.location.reload();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-navy text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{order.job_number}</h2>
              <p className="text-white/70 capitalize">
                {order.service_type.replace('_', ' ')} - {order.load_size} load
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white text-2xl"
            >
              x
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status & Actions */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-500 text-sm">Current Status</span>
              <div className="text-xl font-bold text-navy capitalize">
                {order.status.replace('_', ' ')}
              </div>
            </div>
            <div className="flex gap-2">
              {order.status === 'requested' && (
                <button
                  onClick={() => updateStatus('cancelled')}
                  disabled={isUpdating}
                  className="px-4 py-2 border border-error-red text-error-red rounded-lg hover:bg-red-50"
                >
                  Cancel
                </button>
              )}
              {order.status === 'completed' && (
                <button
                  onClick={() => updateStatus('paid')}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-success-green text-white rounded-lg hover:bg-success-green/90"
                >
                  Mark Paid
                </button>
              )}
            </div>
          </div>

          {/* Customer Info */}
          <div className="border border-border-gray rounded-lg p-4">
            <h3 className="font-semibold text-navy mb-3">Customer</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-500 text-sm">Name</span>
                <div className="font-medium">{order.customer?.full_name}</div>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Phone</span>
                <div className="font-medium">{order.customer?.phone}</div>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500 text-sm">Email</span>
                <div className="font-medium">{order.customer?.email}</div>
              </div>
            </div>
          </div>

          {/* Driver Info */}
          <div className="border border-border-gray rounded-lg p-4">
            <h3 className="font-semibold text-navy mb-3">Driver</h3>
            {order.driver ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500 text-sm">Name</span>
                  <div className="font-medium">{order.driver.full_name}</div>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Phone</span>
                  <div className="font-medium">{order.driver.phone}</div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">
                No driver assigned
                <button className="ml-4 text-copper hover:underline">
                  Assign Driver
                </button>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="border border-border-gray rounded-lg p-4">
            <h3 className="font-semibold text-navy mb-3">Location</h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-500 text-sm">Pickup</span>
                <div className="font-medium">{order.pickup_address_text}</div>
                {order.pickup_instructions && (
                  <div className="text-gray-500 text-sm mt-1">
                    {order.pickup_instructions}
                  </div>
                )}
              </div>
              {order.dropoff_address_text && (
                <div>
                  <span className="text-gray-500 text-sm">Dropoff</span>
                  <div className="font-medium">{order.dropoff_address_text}</div>
                </div>
              )}
            </div>
          </div>

          {/* Schedule */}
          <div className="border border-border-gray rounded-lg p-4">
            <h3 className="font-semibold text-navy mb-3">Schedule</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="text-gray-500 text-sm">Date</span>
                <div className="font-medium">
                  {new Date(order.scheduled_date).toLocaleDateString()}
                </div>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Time</span>
                <div className="font-medium">
                  {order.scheduled_time_start} - {order.scheduled_time_end}
                </div>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Est. Hours</span>
                <div className="font-medium">{order.estimated_hours}</div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="border border-border-gray rounded-lg p-4">
            <h3 className="font-semibold text-navy mb-3">Pricing</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Total</span>
                <span className="font-bold text-navy">
                  ${(order.total_cents / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Driver Payout (75%)</span>
                <span className="font-medium">
                  ${(order.driver_payout_cents / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Platform Fee (25%)</span>
                <span className="font-medium text-copper">
                  ${(order.platform_fee_cents / 100).toFixed(2)}
                </span>
              </div>
              {order.tip_cents > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Tip</span>
                  <span className="font-medium text-success-green">
                    ${(order.tip_cents / 100).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {(order.customer_notes || order.item_description) && (
            <div className="border border-border-gray rounded-lg p-4">
              <h3 className="font-semibold text-navy mb-3">Notes</h3>
              {order.item_description && (
                <div className="mb-2">
                  <span className="text-gray-500 text-sm">Items</span>
                  <div>{order.item_description}</div>
                </div>
              )}
              {order.customer_notes && (
                <div>
                  <span className="text-gray-500 text-sm">Customer Notes</span>
                  <div>{order.customer_notes}</div>
                </div>
              )}
            </div>
          )}

          {/* Timeline */}
          <div className="border border-border-gray rounded-lg p-4">
            <h3 className="font-semibold text-navy mb-3">Timeline</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Created</span>
                <span>{new Date(order.created_at).toLocaleString()}</span>
              </div>
              {order.accepted_at && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Accepted</span>
                  <span>{new Date(order.accepted_at).toLocaleString()}</span>
                </div>
              )}
              {order.started_at && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Started</span>
                  <span>{new Date(order.started_at).toLocaleString()}</span>
                </div>
              )}
              {order.completed_at && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Completed</span>
                  <span>{new Date(order.completed_at).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border-gray p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-border-gray rounded-lg hover:bg-light-gray"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
