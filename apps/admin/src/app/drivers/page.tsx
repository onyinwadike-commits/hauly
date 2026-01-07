'use client';

import { Sidebar } from '@/components/Sidebar';

const drivers = [
  {
    id: 'DRV-001',
    name: 'Carlos Rodriguez',
    email: 'carlos@email.com',
    phone: '(702) 555-1111',
    vehicle: '2021 Ford F-150',
    vehicleType: 'Pickup Truck',
    tier: 'platinum',
    rating: 4.9,
    totalJobs: 342,
    earnings: 48750,
    isOnline: true,
    stripeStatus: 'active',
  },
  {
    id: 'DRV-002',
    name: 'James Wilson',
    email: 'james@email.com',
    phone: '(702) 555-2222',
    vehicle: '2020 RAM 1500',
    vehicleType: 'Pickup Truck',
    tier: 'gold',
    rating: 4.8,
    totalJobs: 215,
    earnings: 32100,
    isOnline: true,
    stripeStatus: 'active',
  },
  {
    id: 'DRV-003',
    name: 'Miguel Santos',
    email: 'miguel@email.com',
    phone: '(702) 555-3333',
    vehicle: '2022 Ford Transit',
    vehicleType: 'Cargo Van',
    tier: 'gold',
    rating: 4.7,
    totalJobs: 178,
    earnings: 28400,
    isOnline: false,
    stripeStatus: 'active',
  },
  {
    id: 'DRV-004',
    name: 'David Kim',
    email: 'david@email.com',
    phone: '(702) 555-4444',
    vehicle: '2019 Chevrolet Express',
    vehicleType: 'Cargo Van',
    tier: 'silver',
    rating: 4.6,
    totalJobs: 89,
    earnings: 14200,
    isOnline: true,
    stripeStatus: 'active',
  },
  {
    id: 'DRV-005',
    name: 'Marcus Johnson',
    email: 'marcus@email.com',
    phone: '(702) 555-5555',
    vehicle: '2021 Isuzu NPR',
    vehicleType: 'Box Truck',
    tier: 'platinum',
    rating: 4.9,
    totalJobs: 412,
    earnings: 72800,
    isOnline: false,
    stripeStatus: 'active',
  },
  {
    id: 'DRV-006',
    name: 'Anthony Brown',
    email: 'anthony@email.com',
    phone: '(702) 555-6666',
    vehicle: '2020 Toyota Tacoma',
    vehicleType: 'Pickup Truck',
    tier: 'bronze',
    rating: 4.4,
    totalJobs: 23,
    earnings: 3450,
    isOnline: false,
    stripeStatus: 'pending',
  },
];

const tierColors: Record<string, string> = {
  bronze: 'bg-orange-100 text-orange-800',
  silver: 'bg-gray-200 text-gray-800',
  gold: 'bg-yellow-100 text-yellow-800',
  platinum: 'bg-purple-100 text-purple-800',
};

export default function DriversPage() {
  const stats = {
    total: drivers.length,
    online: drivers.filter((d) => d.isOnline).length,
    pending: 5,
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1E3A5F]">Drivers</h1>
            <p className="text-gray-500">Manage your driver network</p>
          </div>
          <button className="bg-[#B87333] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#9A5F28] transition">
            View Applications ({stats.pending})
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-[#1E3A5F]">{stats.total}</div>
            <div className="text-gray-500">Total Drivers</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-green-600">{stats.online}</div>
            <div className="text-gray-500">Online Now</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-[#B87333]">{stats.pending}</div>
            <div className="text-gray-500">Pending Applications</div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm border-b border-gray-100 bg-gray-50">
                  <th className="p-4 font-medium">Driver</th>
                  <th className="p-4 font-medium">Vehicle</th>
                  <th className="p-4 font-medium">Tier</th>
                  <th className="p-4 font-medium">Rating</th>
                  <th className="p-4 font-medium">Jobs</th>
                  <th className="p-4 font-medium">Earnings</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Stripe</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr
                    key={driver.id}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <div className="font-medium text-[#1E3A5F]">{driver.name}</div>
                      <div className="text-gray-400 text-xs">{driver.phone}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-700">{driver.vehicle}</div>
                      <div className="text-gray-400 text-xs">{driver.vehicleType}</div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          tierColors[driver.tier]
                        }`}
                      >
                        {driver.tier}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-yellow-500 mr-1">★</span>
                      {driver.rating.toFixed(1)}
                    </td>
                    <td className="p-4 text-gray-700">{driver.totalJobs}</td>
                    <td className="p-4 font-medium text-[#1E3A5F]">
                      ${driver.earnings.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          driver.isOnline
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            driver.isOnline ? 'bg-green-500' : 'bg-gray-400'
                          }`}
                        />
                        {driver.isOnline ? 'Online' : 'Offline'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-xs font-medium ${
                          driver.stripeStatus === 'active'
                            ? 'text-green-600'
                            : 'text-yellow-600'
                        }`}
                      >
                        {driver.stripeStatus}
                      </span>
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
