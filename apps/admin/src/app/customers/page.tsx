'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';

const customers = [
  {
    id: 'CUS-001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(702) 555-1234',
    totalOrders: 12,
    totalSpent: 3580,
    lastOrder: '2024-01-07',
    memberSince: '2023-06-15',
  },
  {
    id: 'CUS-002',
    name: 'Vista Property Group',
    email: 'ops@vistapropertygroup.com',
    phone: '(702) 555-2345',
    totalOrders: 47,
    totalSpent: 18920,
    lastOrder: '2024-01-07',
    memberSince: '2023-03-10',
  },
  {
    id: 'CUS-003',
    name: 'Mike Thompson',
    email: 'mike.t@email.com',
    phone: '(702) 555-3456',
    totalOrders: 5,
    totalSpent: 890,
    lastOrder: '2024-01-07',
    memberSince: '2023-11-22',
  },
  {
    id: 'CUS-004',
    name: 'Desert Springs Apartments',
    email: 'maintenance@desertsprings.com',
    phone: '(702) 555-4567',
    totalOrders: 89,
    totalSpent: 42650,
    lastOrder: '2024-01-06',
    memberSince: '2023-01-05',
  },
  {
    id: 'CUS-005',
    name: 'Jennifer Lee',
    email: 'jlee@email.com',
    phone: '(702) 555-5678',
    totalOrders: 3,
    totalSpent: 534,
    lastOrder: '2024-01-05',
    memberSince: '2023-12-01',
  },
  {
    id: 'CUS-006',
    name: 'Robert Chen',
    email: 'robert.chen@email.com',
    phone: '(702) 555-6789',
    totalOrders: 8,
    totalSpent: 1420,
    lastOrder: '2024-01-04',
    memberSince: '2023-08-18',
  },
];

export default function CustomersPage() {
  const [search, setSearch] = useState('');

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search)
  );

  const stats = {
    total: customers.length,
    newThisMonth: 2,
    activeThisMonth: 4,
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1E3A5F]">Customers</h1>
            <p className="text-gray-500">Manage your customer base</p>
          </div>
          <button className="bg-[#B87333] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#9A5F28] transition">
            + Add Customer
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-[#1E3A5F]">{stats.total}</div>
            <div className="text-gray-500">Total Customers</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-green-600">+{stats.newThisMonth}</div>
            <div className="text-gray-500">New This Month</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-[#B87333]">{stats.activeThisMonth}</div>
            <div className="text-gray-500">Active (30 days)</div>
          </div>
        </div>

        {/* Search & Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-gray-100">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B87333]"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm border-b border-gray-100 bg-gray-50">
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Contact</th>
                  <th className="p-4 font-medium">Total Orders</th>
                  <th className="p-4 font-medium">Total Spent</th>
                  <th className="p-4 font-medium">Last Order</th>
                  <th className="p-4 font-medium">Member Since</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#1E3A5F] rounded-full flex items-center justify-center text-white font-semibold">
                          {customer.name.charAt(0)}
                        </div>
                        <div className="font-medium text-[#1E3A5F]">{customer.name}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-700">{customer.email}</div>
                      <div className="text-gray-400 text-xs">{customer.phone}</div>
                    </td>
                    <td className="p-4 text-gray-700">{customer.totalOrders}</td>
                    <td className="p-4 font-medium text-[#1E3A5F]">
                      ${customer.totalSpent.toLocaleString()}
                    </td>
                    <td className="p-4 text-gray-700 text-sm">
                      {new Date(customer.lastOrder).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-gray-700 text-sm">
                      {new Date(customer.memberSince).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="text-[#B87333] hover:underline text-sm">
                          View
                        </button>
                        <button className="text-gray-500 hover:underline text-sm">
                          Orders
                        </button>
                      </div>
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
