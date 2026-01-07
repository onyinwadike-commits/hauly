import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your-supabase-url') {
    // Return a mock client for development without Supabase
    // Helper to create chainable query result
    const createChainable = (): any => ({
      data: [],
      count: 0,
      error: null,
      eq: () => createChainable(),
      neq: () => createChainable(),
      gt: () => createChainable(),
      gte: () => createChainable(),
      lt: () => createChainable(),
      lte: () => createChainable(),
      like: () => createChainable(),
      ilike: () => createChainable(),
      is: () => createChainable(),
      in: () => createChainable(),
      contains: () => createChainable(),
      containedBy: () => createChainable(),
      or: () => createChainable(),
      and: () => createChainable(),
      not: () => createChainable(),
      filter: () => createChainable(),
      match: () => createChainable(),
      single: () => ({ data: null, error: null }),
      maybeSingle: () => ({ data: null, error: null }),
      order: () => createChainable(),
      limit: () => createChainable(),
      range: () => createChainable(),
    });

    return {
      from: () => ({
        select: () => createChainable(),
        insert: () => createChainable(),
        update: () => createChainable(),
        upsert: () => createChainable(),
        delete: () => createChainable(),
      }),
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
      },
    } as any;
  }

  const cookieStore = await cookies();

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}
