import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your-supabase-url') {
    // Return a mock client for development without Supabase
    return {
      auth: {
        signInWithPassword: async () => ({ error: new Error('Supabase not configured') }),
        signOut: async () => ({}),
        getUser: async () => ({ data: { user: null }, error: null }),
      },
      from: () => ({
        select: () => ({ data: null, error: null, single: () => ({ data: null, error: null }) }),
        update: () => ({ eq: () => ({ data: null, error: null }) }),
      }),
    } as any;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
