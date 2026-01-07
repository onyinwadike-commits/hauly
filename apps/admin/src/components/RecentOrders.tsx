'use client';

import { formatDistanceToNow } from 'date-fns';

interface Order {
  id: string;
  job_number: string;
  status: string;
  service_type: string;
  total_cents: number;
  created_at: string;
  customer?: { full_name: string; email: string };
  driver?: { full_name: string };
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

export function RecentOrders({ orders }: { orders: Order[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500 text-sm border-b border-border-gray">
            <th className="pb-3 font-medium">Job #</th>
            <th className="pb-3 font-medium">Customer</th>
            <th className="pb-3 font-medium">Service</th>
            <th className="pb-3 font-medium">Driver</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium text-right">Amount</th>
            <th className="pb-3 font-medium text-right">Time</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-border-gray hover:bg-light-gray cursor-pointer"
            >
              <td className="py-4 font-medium text-navy">{order.job_number}</td>
              <td className="py-4">
                <div className="text-charcoal">{order.customer?.full_name}</div>
                <div className="text-gray-400 text-xs">{order.customer?.email}</div>
              </td>
              <td className="py-4 text-charcoal capitalize">
                {order.service_type.replace('_', ' ')}
              </td>
              <td className="py-4 text-charcoal">
                {order.driver?.full_name || '—'}
              </td>
              <td className="py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[order.status] || 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {order.status.replace('_', ' ')}
                </span>
              </td>
              <td className="py-4 text-right font-medium text-navy">
                ${(order.total_cents / 100).toFixed(2)}
              </td>
              <td className="py-4 text-right text-gray-500 text-sm">
                {formatDistanceToNow(new Date(order.created_at), {
                  addSuffix: true,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
