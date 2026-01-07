'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Demo login - in production, this would use Supabase auth
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email === 'admin@hauly.app' && password === 'admin123') {
        router.push('/');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#1E3A5F] flex items-center justify-center px-4">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex">
            <div className="w-8 h-7 bg-[#B87333] rounded-sm mr-1" />
            <div className="w-8 h-7 bg-[#B87333] rounded-sm" />
          </div>
          <span className="text-[#1E3A5F] font-bold text-2xl ml-3">HAULY</span>
        </div>

        <h1 className="text-2xl font-bold text-[#1E3A5F] text-center mb-2">
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
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B87333]"
              placeholder="admin@hauly.app"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B87333]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              isLoading ? 'bg-gray-400' : 'bg-[#B87333] hover:bg-[#9A5F28]'
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            Demo credentials: admin@hauly.app / admin123
          </p>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Hauly Admin Portal v1.0
        </p>
      </div>
    </div>
  );
}
