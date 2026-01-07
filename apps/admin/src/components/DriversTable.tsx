'use client';

interface Driver {
  id: string;
  user_id: string;
  vehicle_type: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number;
  tier: string;
  rating: number;
  total_jobs: number;
  total_earnings_cents: number;
  is_online: boolean;
  stripe_account_status: string;
  user?: { id: string; full_name: string; email: string; phone: string };
}

const tierColors: Record<string, string> = {
  bronze: 'bg-orange-100 text-orange-800',
  silver: 'bg-gray-200 text-gray-800',
  gold: 'bg-yellow-100 text-yellow-800',
  platinum: 'bg-purple-100 text-purple-800',
};

export function DriversTable({ drivers }: { drivers: Driver[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500 text-sm border-b border-border-gray bg-light-gray">
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
              className="border-b border-border-gray hover:bg-light-gray"
            >
              <td className="p-4">
                <div className="font-medium text-navy">
                  {driver.user?.full_name}
                </div>
                <div className="text-gray-400 text-xs">{driver.user?.phone}</div>
              </td>
              <td className="p-4">
                <div className="text-charcoal">
                  {driver.vehicle_year} {driver.vehicle_make} {driver.vehicle_model}
                </div>
                <div className="text-gray-400 text-xs capitalize">
                  {driver.vehicle_type.replace('_', ' ')}
                </div>
              </td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    tierColors[driver.tier] || 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {driver.tier}
                </span>
              </td>
              <td className="p-4">
                <span className="text-yellow-500 mr-1">*</span>
                {driver.rating.toFixed(1)}
              </td>
              <td className="p-4 text-charcoal">{driver.total_jobs}</td>
              <td className="p-4 font-medium text-navy">
                ${(driver.total_earnings_cents / 100).toLocaleString()}
              </td>
              <td className="p-4">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    driver.is_online
                      ? 'bg-green-100 text-success-green'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      driver.is_online ? 'bg-success-green' : 'bg-gray-400'
                    }`}
                  />
                  {driver.is_online ? 'Online' : 'Offline'}
                </span>
              </td>
              <td className="p-4">
                <span
                  className={`text-xs ${
                    driver.stripe_account_status === 'active'
                      ? 'text-success-green'
                      : 'text-warning-yellow'
                  }`}
                >
                  {driver.stripe_account_status}
                </span>
              </td>
              <td className="p-4">
                <button className="text-copper hover:underline text-sm">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
