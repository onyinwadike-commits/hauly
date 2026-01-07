'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const statuses = [
  { value: 'all', label: 'All Status' },
  { value: 'requested', label: 'Requested' },
  { value: 'matched', label: 'Matched' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'en_route', label: 'En Route' },
  { value: 'arrived', label: 'Arrived' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'paid', label: 'Paid' },
  { value: 'cancelled', label: 'Cancelled' },
];

export function OrderFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page');
    router.push(`/orders?${params.toString()}`);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateFilter('search', search);
  }

  return (
    <div className="flex flex-wrap gap-4">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex-1 min-w-[200px]">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by job # or address..."
            className="w-full border border-border-gray rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-copper"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </form>

      {/* Status Filter */}
      <select
        value={searchParams.get('status') || 'all'}
        onChange={(e) => updateFilter('status', e.target.value)}
        className="border border-border-gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-copper"
      >
        {statuses.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>

      {/* Date Filter */}
      <input
        type="date"
        value={searchParams.get('date') || ''}
        onChange={(e) => updateFilter('date', e.target.value)}
        className="border border-border-gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-copper"
      />

      {/* Clear Filters */}
      {(searchParams.get('status') ||
        searchParams.get('date') ||
        searchParams.get('search')) && (
        <button
          onClick={() => router.push('/orders')}
          className="text-copper hover:underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
