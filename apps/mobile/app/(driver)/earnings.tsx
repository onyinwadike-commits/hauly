import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import type { Order } from '@hauly/types';

type Period = 'today' | 'week' | 'month' | 'all';

export default function EarningsScreen() {
  const [period, setPeriod] = useState<Period>('week');
  const [earnings, setEarnings] = useState({
    total: 0,
    jobs: 0,
    average: 0,
    rating: 0,
  });
  const [completedJobs, setCompletedJobs] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEarnings();
  }, [period]);

  async function fetchEarnings() {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let query = supabase
        .from('orders')
        .select('*')
        .eq('driver_id', user.id)
        .in('status', ['completed', 'paid'])
        .order('completed_at', { ascending: false });

      // Add date filter based on period
      const now = new Date();
      if (period === 'today') {
        query = query.gte('completed_at', now.toISOString().split('T')[0]);
      } else if (period === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        query = query.gte('completed_at', weekAgo.toISOString());
      } else if (period === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        query = query.gte('completed_at', monthAgo.toISOString());
      }

      const { data, error } = await query;
      if (error) throw error;

      const jobs = data as Order[];
      const total = jobs.reduce(
        (sum, job) => sum + job.driver_payout_cents + job.tip_cents,
        0
      );

      setCompletedJobs(jobs);
      setEarnings({
        total: total / 100,
        jobs: jobs.length,
        average: jobs.length > 0 ? total / 100 / jobs.length : 0,
        rating: 4.9,
      });
    } catch (error) {
      console.error('Error fetching earnings:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-light-gray">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-border-gray">
        <Text className="text-navy text-2xl font-bold">Earnings</Text>
      </View>

      {/* Period Selector */}
      <View className="flex-row px-6 py-3 bg-white border-b border-border-gray">
        {(['today', 'week', 'month', 'all'] as Period[]).map((p) => (
          <TouchableOpacity
            key={p}
            className={`px-4 py-2 rounded-full mr-2 ${
              period === p ? 'bg-copper' : 'bg-light-gray'
            }`}
            onPress={() => setPeriod(p)}
          >
            <Text
              className={`font-medium capitalize ${
                period === p ? 'text-white' : 'text-charcoal'
              }`}
            >
              {p === 'all' ? 'All Time' : p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1">
        {/* Earnings Summary */}
        <View className="bg-white mx-6 mt-6 rounded-xl p-6">
          <View className="items-center mb-6">
            <Text className="text-gray-500">Total Earnings</Text>
            <Text className="text-navy text-4xl font-bold">
              ${earnings.total.toFixed(2)}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-navy">
                {earnings.jobs}
              </Text>
              <Text className="text-gray-500 text-sm">Jobs</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-navy">
                ${earnings.average.toFixed(0)}
              </Text>
              <Text className="text-gray-500 text-sm">Avg/Job</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-navy">
                ⭐ {earnings.rating}
              </Text>
              <Text className="text-gray-500 text-sm">Rating</Text>
            </View>
          </View>
        </View>

        {/* Payout Info */}
        <View className="bg-white mx-6 mt-4 rounded-xl p-4">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-gray-500 text-sm">Available Balance</Text>
              <Text className="text-navy text-xl font-bold">
                ${earnings.total.toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity className="bg-copper px-4 py-2 rounded-lg">
              <Text className="text-white font-semibold">View Payouts</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-gray-400 text-xs mt-2">
            Next payout: Monday, Jan 13
          </Text>
        </View>

        {/* Job History */}
        <View className="px-6 mt-6 mb-4">
          <Text className="text-navy font-bold text-lg">Job History</Text>
        </View>

        {completedJobs.map((job) => (
          <View
            key={job.id}
            className="bg-white mx-6 mb-2 rounded-lg p-4 flex-row justify-between items-center"
          >
            <View>
              <Text className="text-navy font-semibold">{job.job_number}</Text>
              <Text className="text-gray-500 text-sm capitalize">
                {job.service_type.replace('_', ' ')}
              </Text>
              <Text className="text-gray-400 text-xs">
                {new Date(job.completed_at!).toLocaleDateString()}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-success-green font-bold">
                ${((job.driver_payout_cents + job.tip_cents) / 100).toFixed(2)}
              </Text>
              {job.tip_cents > 0 && (
                <Text className="text-gray-400 text-xs">
                  incl. ${(job.tip_cents / 100).toFixed(0)} tip
                </Text>
              )}
            </View>
          </View>
        ))}

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
