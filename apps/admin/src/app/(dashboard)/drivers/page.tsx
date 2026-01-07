import { createServerSupabaseClient } from '@/lib/supabase-server';
import { DriversTable } from '@/components/DriversTable';

async function getDrivers() {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from('driver_profiles')
    .select(`
      *,
      user:users!driver_profiles_user_id_fkey(id, full_name, email, phone)
    `)
    .eq('is_approved', true)
    .order('created_at', { ascending: false });

  return data || [];
}

async function getStats() {
  const supabase = await createServerSupabaseClient();

  const { count: totalDrivers } = await supabase
    .from('driver_profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_approved', true);

  const { count: onlineDrivers } = await supabase
    .from('driver_profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_online', true)
    .eq('is_approved', true);

  const { count: pendingApps } = await supabase
    .from('driver_profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_approved', false);

  return {
    totalDrivers: totalDrivers || 0,
    onlineDrivers: onlineDrivers || 0,
    pendingApps: pendingApps || 0,
  };
}

export default async function DriversPage() {
  const drivers = await getDrivers();
  const stats = await getStats();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy">Drivers</h1>
          <p className="text-gray-500">Manage your driver network</p>
        </div>
        <a
          href="/applications"
          className="bg-copper text-white px-4 py-2 rounded-lg font-medium hover:bg-copper/90 transition"
        >
          View Applications ({stats.pendingApps})
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-3xl font-bold text-navy">{stats.totalDrivers}</div>
          <div className="text-gray-500">Total Drivers</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-3xl font-bold text-success-green">
            {stats.onlineDrivers}
          </div>
          <div className="text-gray-500">Online Now</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-3xl font-bold text-copper">{stats.pendingApps}</div>
          <div className="text-gray-500">Pending Applications</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <DriversTable drivers={drivers} />
      </div>
    </div>
  );
}
