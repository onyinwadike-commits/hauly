'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Verify admin role
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profile?.role !== 'admin') {
          await supabase.auth.signOut();
          throw new Error('Access denied. Admin privileges required.');
        }
      }

      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex">
            <div className="w-8 h-7 bg-copper rounded-sm mr-1" />
            <div className="w-8 h-7 bg-copper rounded-sm" />
          </div>
          <span className="text-navy font-bold text-2xl ml-3">HAULY</span>
        </div>

        <h1 className="text-2xl font-bold text-navy text-center mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Sign in with your admin credentials
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-charcoal text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
              placeholder="admin@hauly.app"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-charcoal text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              isLoading ? 'bg-gray-400' : 'bg-copper hover:bg-copper/90'
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-8">
          Hauly Admin Portal v1.0
        </p>
      </div>
    </div>
  );
}
