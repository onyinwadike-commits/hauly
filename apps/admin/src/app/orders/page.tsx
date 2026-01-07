'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';

const orders = [
  {
    id: 'HAU-2024-001247',
    customer: 'Sarah Johnson',
    phone: '(702) 555-1234',
    service: 'Apartment Turn',
    loadSize: 'Medium',
    pickup: '123 Main St, Henderson, NV',
    status: 'in_progress',
    driver: 'Carlos Rodriguez',
    amount: 298,
    platformFee: 74.50,
    date: '2024-01-07',
    time: '2:00 PM - 4:00 PM',
  },
  {
    id: 'HAU-2024-001246',
    customer: 'Mike Thompson',
    phone: '(702) 555-2345',
    service: 'Junk Removal',
    loadSize: 'Light',
    pickup: '456 Oak Ave, Las Vegas, NV',
    status: 'completed',
    driver: 'James Wilson',
    amount: 189,
    platformFee: 47.25,
    date: '2024-01-07',
    time: '11:00 AM - 1:00 PM',
  },
  {
    id: 'HAU-2024-001245',
    customer: 'Vista Property Group',
    phone: '(702) 555-3456',
    service: 'Apartment Turn',
    loadSize: 'Heavy',
    pickup: '789 Desert Blvd, Henderson, NV',
    status: 'completed',
    driver: 'Miguel Santos',
    amount: 447,
    platformFee: 111.75,
    date: '2024-01-07',
    time: '9:00 AM - 11:00 AM',
  },
  {
    id: 'HAU-2024-001244',
    customer: 'Jennifer Lee',
    phone: '(702) 555-4567',
    service: 'Furniture Delivery',
    loadSize: 'Medium',
    pickup: '321 Sunset Rd, Las Vegas, NV',
    status: 'pending',
    driver: null,
    amount: 178,
    platformFee: 44.50,
    date: '2024-01-08',
    time: '10:00 AM - 12:00 PM',
  },
  {
    id: 'HAU-2024-001243',
    customer: 'Desert Springs Apartments',
    phone: '(702) 555-5678',
    service: 'Apartment Turn',
    loadSize: 'Heavy',
    pickup: '555 Palm Way, Henderson, NV',
    status: 'completed',
    driver: 'Carlos Rodriguez',
    amount: 596,
    platformFee: 149.00,
    date: '2024-01-06',
    time: '2:00 PM - 5:00 PM',
  },
  {
    id: 'HAU-2024-001242',
    customer: 'Robert Chen',
    phone: '(702) 555-6789',
    service: 'Small Move',
    loadSize: 'Light',
    pickup: '888 Valley View, Las Vegas, NV',
    status: 'cancelled',
    driver: null,
    amount: 178,
    platformFee: 44.50,
    date: '2024-01-06',
    time: '3:00 PM - 5:00 PM',
  },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function OrdersPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.pickup.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1E3A5F]">Orders</h1>
            <p className="text-gray-500">{orders.length} total orders</p>
          </div>
          <button className="bg-[#B87333] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#9A5F28] transition">
            + Create Order
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <input
              type="text"
              placeholder="Search by ID, customer, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[250px] border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B87333]"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B87333]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm border-b border-gray-100 bg-gray-50">
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Service</th>
                  <th className="p-4 font-medium">Location</th>
                  <th className="p-4 font-medium">Driver</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Amount</th>
                  <th className="p-4 font-medium text-right">Platform Fee</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <span className="font-medium text-[#1E3A5F]">{order.id}</span>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-700">{order.customer}</div>
                      <div className="text-gray-400 text-xs">{order.phone}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-700">{order.service}</div>
                      <div className="text-gray-400 text-xs">{order.loadSize} Load</div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-700 text-sm max-w-[200px] truncate">
                        {order.pickup}
                      </div>
                    </td>
                    <td className="p-4 text-gray-700">
                      {order.driver || <span className="text-gray-400">Unassigned</span>}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          statusColors[order.status]
                        }`}
                      >
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-right font-medium text-[#1E3A5F]">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="p-4 text-right font-medium text-[#B87333]">
                      ${order.platformFee.toFixed(2)}
                    </td>
                    <td className="p-4">
                      <button className="text-[#B87333] hover:underline text-sm">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
