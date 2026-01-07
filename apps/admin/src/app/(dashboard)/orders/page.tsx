import { createServerSupabaseClient } from '@/lib/supabase-server';
import { OrdersTable } from '@/components/OrdersTable';
import { OrderFilters } from '@/components/OrderFilters';

interface SearchParams {
  status?: string;
  date?: string;
  search?: string;
  page?: string;
}

async function getOrders(searchParams: SearchParams) {
  const supabase = await createServerSupabaseClient();
  const page = parseInt(searchParams.page || '1');
  const limit = 20;
  const offset = (page - 1) * limit;

  let query = supabase
    .from('orders')
    .select(`
      *,
      customer:users!orders_customer_id_fkey(id, full_name, email, phone),
      driver:users!orders_driver_id_fkey(id, full_name, phone)
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  // Apply filters
  if (searchParams.status && searchParams.status !== 'all') {
    query = query.eq('status', searchParams.status);
  }

  if (searchParams.date) {
    query = query.gte('scheduled_date', searchParams.date);
  }

  if (searchParams.search) {
    query = query.or(
      `job_number.ilike.%${searchParams.search}%,pickup_address_text.ilike.%${searchParams.search}%`
    );
  }

  const { data, count } = await query;

  return {
    orders: data || [],
    total: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { orders, total, page, totalPages } = await getOrders(params);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy">Orders</h1>
          <p className="text-gray-500">{total} total orders</p>
        </div>
        <button className="bg-copper text-white px-4 py-2 rounded-lg font-medium hover:bg-copper/90 transition">
          + Create Order
        </button>
      </div>

      {/* Filters */}
      <OrderFilters />

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm mt-6">
        <OrdersTable orders={orders} />
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-gray-500 text-sm">
          Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of {total}
        </p>
        <div className="flex gap-2">
          {page > 1 && (
            <a
              href={`/orders?page=${page - 1}`}
              className="px-4 py-2 border border-border-gray rounded-lg hover:bg-light-gray"
            >
              Previous
            </a>
          )}
          {page < totalPages && (
            <a
              href={`/orders?page=${page + 1}`}
              className="px-4 py-2 border border-border-gray rounded-lg hover:bg-light-gray"
            >
              Next
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
