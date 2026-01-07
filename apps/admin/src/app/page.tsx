'use client';

import { Sidebar } from '@/components/Sidebar';

// Mock data for demo
const stats = [
  { label: 'Total Orders', value: '1,247', change: '+12%', up: true, icon: '📋' },
  { label: 'Active Drivers', value: '48', change: '+3', up: true, icon: '🚚' },
  { label: 'Revenue Today', value: '$8,429', change: '+18%', up: true, icon: '💰' },
  { label: 'Pending Jobs', value: '12', change: '-2', up: false, icon: '⏳' },
];

const recentOrders = [
  {
    id: 'HAU-2024-001247',
    customer: 'Sarah Johnson',
    service: 'Apartment Turn',
    status: 'in_progress',
    amount: '$298',
    date: 'Today, 2:30 PM',
  },
  {
    id: 'HAU-2024-001246',
    customer: 'Mike Thompson',
    service: 'Junk Removal',
    status: 'completed',
    amount: '$189',
    date: 'Today, 11:15 AM',
  },
  {
    id: 'HAU-2024-001245',
    customer: 'Vista Property Group',
    service: 'Apartment Turn',
    status: 'completed',
    amount: '$447',
    date: 'Today, 9:00 AM',
  },
  {
    id: 'HAU-2024-001244',
    customer: 'Jennifer Lee',
    service: 'Furniture Delivery',
    status: 'pending',
    amount: '$178',
    date: 'Yesterday, 4:45 PM',
  },
  {
    id: 'HAU-2024-001243',
    customer: 'Desert Springs Apts',
    service: 'Apartment Turn',
    status: 'completed',
    amount: '$596',
    date: 'Yesterday, 2:00 PM',
  },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1E3A5F]">Dashboard</h1>
          <p className="text-gray-500">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">{stat.icon}</span>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    stat.up
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-[#1E3A5F] mb-1">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#1E3A5F]">Recent Orders</h2>
              <a
                href="/orders"
                className="text-[#B87333] hover:underline text-sm font-medium"
              >
                View All →
              </a>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm border-b border-gray-100 bg-gray-50">
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Service</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <span className="font-medium text-[#1E3A5F]">{order.id}</span>
                    </td>
                    <td className="p-4 text-gray-700">{order.customer}</td>
                    <td className="p-4 text-gray-700">{order.service}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          statusColors[order.status]
                        }`}
                      >
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-[#1E3A5F]">{order.amount}</td>
                    <td className="p-4 text-gray-500 text-sm">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-[#1E3A5F] mb-4">Platform Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Job Value</span>
                <span className="font-semibold text-[#1E3A5F]">$247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completion Rate</span>
                <span className="font-semibold text-green-600">98.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Rating</span>
                <span className="font-semibold text-[#1E3A5F]">4.9 ⭐</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-[#1E3A5F] mb-4">Driver Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Online Now</span>
                <span className="font-semibold text-green-600">32</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">On Active Jobs</span>
                <span className="font-semibold text-[#B87333]">18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending Applications</span>
                <span className="font-semibold text-[#1E3A5F]">5</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-[#1E3A5F] mb-4">Revenue Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Today</span>
                <span className="font-semibold text-[#1E3A5F]">$8,429</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">This Week</span>
                <span className="font-semibold text-[#1E3A5F]">$47,832</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform Fees MTD</span>
                <span className="font-semibold text-[#B87333]">$12,450</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
