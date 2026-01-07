'use client';

import { useState } from 'react';
import { OrderDetailModal } from './OrderDetailModal';

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

const statusColors: Record<string, string> = {
  requested: 'bg-yellow-100 text-yellow-800',
  matched: 'bg-blue-100 text-blue-800',
  accepted: 'bg-blue-100 text-blue-800',
  en_route: 'bg-orange-100 text-orange-800',
  arrived: 'bg-orange-100 text-orange-800',
  in_progress: 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
  paid: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export function OrdersTable({ orders }: { orders: Order[] }) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm border-b border-border-gray bg-light-gray">
              <th className="p-4 font-medium">Job #</th>
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Service</th>
              <th className="p-4 font-medium">Location</th>
              <th className="p-4 font-medium">Schedule</th>
              <th className="p-4 font-medium">Driver</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Total</th>
              <th className="p-4 font-medium text-right">Platform Fee</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-border-gray hover:bg-light-gray"
              >
                <td className="p-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="font-medium text-navy hover:text-copper"
                  >
                    {order.job_number}
                  </button>
                </td>
                <td className="p-4">
                  <div className="text-charcoal">{order.customer?.full_name}</div>
                  <div className="text-gray-400 text-xs">{order.customer?.phone}</div>
                </td>
                <td className="p-4">
                  <div className="text-charcoal capitalize">
                    {order.service_type.replace('_', ' ')}
                  </div>
                  <div className="text-gray-400 text-xs capitalize">
                    {order.load_size} load
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-charcoal text-sm max-w-[200px] truncate">
                    {order.pickup_address_text}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-charcoal text-sm">
                    {new Date(order.scheduled_date).toLocaleDateString()}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {order.scheduled_time_start}
                  </div>
                </td>
                <td className="p-4 text-charcoal">
                  {order.driver?.full_name || (
                    <span className="text-gray-400">Unassigned</span>
                  )}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[order.status] || 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {order.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4 text-right font-medium text-navy">
                  ${(order.total_cents / 100).toFixed(2)}
                </td>
                <td className="p-4 text-right font-medium text-copper">
                  ${(order.platform_fee_cents / 100).toFixed(2)}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-copper hover:underline text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
}
