'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format, parseISO } from 'date-fns';

interface RevenueData {
  total_cents: number;
  created_at: string;
}

export function RevenueChart({ data }: { data: RevenueData[] }) {
  // Group by day
  const dailyRevenue = data.reduce((acc, item) => {
    const day = format(parseISO(item.created_at), 'yyyy-MM-dd');
    acc[day] = (acc[day] || 0) + item.total_cents / 100;
    return acc;
  }, {} as Record<string, number>);

  // Create chart data for last 7 days
  const chartData = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const day = format(date, 'yyyy-MM-dd');
    chartData.push({
      date: format(date, 'EEE'),
      revenue: dailyRevenue[day] || 0,
    });
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
          <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
          <YAxis
            stroke="#6B7280"
            fontSize={12}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Revenue']}
            contentStyle={{
              backgroundColor: '#1E3A5F',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#C27D4B"
            fill="#C27D4B"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
