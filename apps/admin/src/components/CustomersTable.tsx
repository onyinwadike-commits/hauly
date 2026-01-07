'use client';

import { useState } from 'react';

interface Customer {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
  total_orders: number;
  total_spent_cents: number;
  last_order_date?: string;
}

export function CustomersTable({ customers }: { customers: Customer[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm)
  );

  return (
    <div>
      {/* Search */}
      <div className="p-4 border-b border-border-gray">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md border border-border-gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-copper"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm border-b border-border-gray bg-light-gray">
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
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  {searchTerm ? 'No customers found matching your search.' : 'No customers yet.'}
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-border-gray hover:bg-light-gray"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white font-semibold">
                        {customer.full_name?.charAt(0) || '?'}
                      </div>
                      <div className="font-medium text-navy">
                        {customer.full_name || 'Unknown'}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-charcoal">{customer.email}</div>
                    <div className="text-gray-400 text-xs">{customer.phone}</div>
                  </td>
                  <td className="p-4 text-charcoal">{customer.total_orders}</td>
                  <td className="p-4 font-medium text-navy">
                    ${(customer.total_spent_cents / 100).toLocaleString()}
                  </td>
                  <td className="p-4 text-charcoal text-sm">
                    {customer.last_order_date
                      ? new Date(customer.last_order_date).toLocaleDateString()
                      : 'Never'}
                  </td>
                  <td className="p-4 text-charcoal text-sm">
                    {new Date(customer.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="text-copper hover:underline text-sm">
                        View
                      </button>
                      <button className="text-gray-500 hover:underline text-sm">
                        Orders
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
