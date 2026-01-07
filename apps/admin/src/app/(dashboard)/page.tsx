import { createServerSupabaseClient } from '@/lib/supabase-server';
import { MetricCard } from '@/components/MetricCard';
import { RecentOrders } from '@/components/RecentOrders';
import { RevenueChart } from '@/components/RevenueChart';

async function getMetrics() {
  const supabase = await createServerSupabaseClient();
  const today = new Date().toISOString().split('T')[0];
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  // Today's orders
  const { count: todayOrders } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', today);

  // Today's revenue
  const { data: todayRevenueData } = await supabase
    .from('orders')
    .select('total_cents')
    .gte('created_at', today)
    .in('status', ['completed', 'paid']);

  const todayRevenue = (todayRevenueData || []).reduce(
    (sum, o) => sum + o.total_cents,
    0
  ) / 100;

  // Active jobs
  const { count: activeJobs } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .in('status', ['accepted', 'en_route', 'arrived', 'in_progress']);

  // Online drivers
  const { count: onlineDrivers } = await supabase
    .from('driver_profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_online', true)
    .eq('is_approved', true);

  // Week's revenue for chart
  const { data: weekRevenue } = await supabase
    .from('orders')
    .select('total_cents, created_at')
    .gte('created_at', weekAgo)
    .in('status', ['completed', 'paid']);

  // Pending applications
  const { count: pendingApps } = await supabase
    .from('driver_profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_approved', false)
    .eq('background_check_status', 'pending');

  return {
    todayOrders: todayOrders || 0,
    todayRevenue,
    activeJobs: activeJobs || 0,
    onlineDrivers: onlineDrivers || 0,
    pendingApps: pendingApps || 0,
    weekRevenue: weekRevenue || [],
  };
}

async function getRecentOrders() {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from('orders')
    .select(`
      *,
      customer:users!orders_customer_id_fkey(full_name, email),
      driver:users!orders_driver_id_fkey(full_name)
    `)
    .order('created_at', { ascending: false })
    .limit(10);

  return data || [];
}

export default async function DashboardPage() {
  const metrics = await getMetrics();
  const recentOrders = await getRecentOrders();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy">Dashboard</h1>
        <p className="text-gray-500">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <MetricCard
          title="Today's Orders"
          value={metrics.todayOrders}
          icon="📋"
          trend="+12%"
          trendUp={true}
        />
        <MetricCard
          title="Today's Revenue"
          value={`$${metrics.todayRevenue.toLocaleString()}`}
          icon="💰"
          trend="+8%"
          trendUp={true}
        />
        <MetricCard
          title="Active Jobs"
          value={metrics.activeJobs}
          icon="🚚"
          highlight={metrics.activeJobs > 0}
        />
        <MetricCard
          title="Online Drivers"
          value={metrics.onlineDrivers}
          icon="👤"
        />
        <MetricCard
          title="Pending Apps"
          value={metrics.pendingApps}
          icon="📝"
          highlight={metrics.pendingApps > 0}
          href="/applications"
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-navy mb-4">
            Revenue (Last 7 Days)
          </h2>
          <RevenueChart data={metrics.weekRevenue} />
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-navy mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-border-gray">
              <span className="text-charcoal">Avg. Job Value</span>
              <span className="font-semibold text-navy">$247</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border-gray">
              <span className="text-charcoal">Completion Rate</span>
              <span className="font-semibold text-success-green">98.2%</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border-gray">
              <span className="text-charcoal">Avg. Rating</span>
              <span className="font-semibold text-navy">4.9</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-charcoal">Platform Fee MTD</span>
              <span className="font-semibold text-copper">$12,450</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-navy">Recent Orders</h2>
          <a href="/orders" className="text-copper hover:underline text-sm">
            View All
          </a>
        </div>
        <RecentOrders orders={recentOrders} />
      </div>
    </div>
  );
}
