import Link from 'next/link';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  trendUp?: boolean;
  highlight?: boolean;
  href?: string;
}

export function MetricCard({
  title,
  value,
  icon,
  trend,
  trendUp,
  highlight,
  href,
}: MetricCardProps) {
  const content = (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm ${
        highlight ? 'ring-2 ring-copper' : ''
      } ${href ? 'hover:shadow-md transition cursor-pointer' : ''}`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-2xl">{icon}</span>
        {trend && (
          <span
            className={`text-xs font-medium px-2 py-1 rounded ${
              trendUp
                ? 'bg-green-100 text-success-green'
                : 'bg-red-100 text-error-red'
            }`}
          >
            {trend}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-navy mb-1">{value}</div>
      <div className="text-gray-500 text-sm">{title}</div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
