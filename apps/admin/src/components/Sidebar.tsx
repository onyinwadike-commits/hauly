'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '📊' },
  { href: '/orders', label: 'Orders', icon: '📋' },
  { href: '/drivers', label: 'Drivers', icon: '🚚' },
  { href: '/customers', label: 'Customers', icon: '👥' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1E3A5F] text-white flex flex-col min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center">
          <div className="flex">
            <div className="w-6 h-5 bg-[#B87333] rounded-sm mr-0.5" />
            <div className="w-6 h-5 bg-[#B87333] rounded-sm" />
          </div>
          <span className="font-bold text-xl ml-2">HAULY</span>
        </div>
        <p className="text-white/50 text-xs mt-1">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-[#B87333] text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-white/10">
        <Link
          href="/login"
          className="flex items-center px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white w-full transition"
        >
          <span className="mr-3">🚪</span>
          Sign Out
        </Link>
      </div>
    </aside>
  );
}
