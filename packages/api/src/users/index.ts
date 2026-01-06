import { supabase } from '../client';
import type { User, UpdateUserInput } from '@hauly/types';

export async function getUserProfile(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data as User | null;
}

export async function updateUserProfile(input: UpdateUserInput): Promise<User> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await (supabase
    .from('users') as any)
    .update(input)
    .eq('id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data as User;
}
