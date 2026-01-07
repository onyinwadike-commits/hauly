import { createServerSupabaseClient } from '@/lib/supabase-server';
import { CustomersTable } from '@/components/CustomersTable';

async function getCustomers() {
  const supabase = await createServerSupabaseClient();

  // Get customers with their order stats
  const { data: customers } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'customer')
    .order('created_at', { ascending: false });

  // Get order counts and totals for each customer
  const customersWithStats = await Promise.all(
    (customers || []).map(async (customer) => {
      const { count } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('customer_id', customer.id);

      const { data: orders } = await supabase
        .from('orders')
        .select('total_cents, created_at')
        .eq('customer_id', customer.id)
        .order('created_at', { ascending: false })
        .limit(1);

      const { data: totalData } = await supabase
        .from('orders')
        .select('total_cents')
        .eq('customer_id', customer.id)
        .in('status', ['completed', 'paid']);

      const totalSpent = (totalData || []).reduce((sum, o) => sum + o.total_cents, 0);

      return {
        ...customer,
        total_orders: count || 0,
        total_spent_cents: totalSpent,
        last_order_date: orders?.[0]?.created_at || null,
      };
    })
  );

  return customersWithStats;
}

async function getStats() {
  const supabase = await createServerSupabaseClient();
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const { count: totalCustomers } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'customer');

  const { count: newCustomers } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'customer')
    .gte('created_at', thirtyDaysAgo);

  const { count: activeCustomers } = await supabase
    .from('orders')
    .select('customer_id', { count: 'exact', head: true })
    .gte('created_at', thirtyDaysAgo);

  return {
    totalCustomers: totalCustomers || 0,
    newCustomers: newCustomers || 0,
    activeCustomers: activeCustomers || 0,
  };
}

export default async function CustomersPage() {
  const customers = await getCustomers();
  const stats = await getStats();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy">Customers</h1>
          <p className="text-gray-500">Manage your customer base</p>
        </div>
        <button className="bg-copper text-white px-4 py-2 rounded-lg font-medium hover:bg-copper/90 transition">
          + Add Customer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-3xl font-bold text-navy">{stats.totalCustomers}</div>
          <div className="text-gray-500">Total Customers</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-3xl font-bold text-success-green">
            +{stats.newCustomers}
          </div>
          <div className="text-gray-500">New This Month</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-3xl font-bold text-copper">{stats.activeCustomers}</div>
          <div className="text-gray-500">Active (30 days)</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <CustomersTable customers={customers} />
      </div>
    </div>
  );
}
