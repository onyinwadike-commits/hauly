import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import type { Order } from '@hauly/types';

export default function AvailableJobsScreen() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(false);
  const [jobs, setJobs] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [todayEarnings, setTodayEarnings] = useState(0);

  useEffect(() => {
    if (isOnline) {
      fetchJobs();
      subscribeToJobs();
    }
  }, [isOnline]);

  async function fetchJobs() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('status', 'requested')
        .order('scheduled_date', { ascending: true });

      if (error) throw error;
      setJobs(data as Order[]);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function subscribeToJobs() {
    const channel = supabase
      .channel('available-jobs')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: 'status=eq.requested',
        },
        () => {
          fetchJobs();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  async function toggleOnline(value: boolean) {
    setIsOnline(value);
    // Update driver profile
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('driver_profiles')
        .update({ is_online: value })
        .eq('user_id', user.id);
    }
  }

  function renderJob({ item }: { item: Order }) {
    const driverPayout = item.driver_payout_cents / 100;
    const scheduledDate = new Date(item.scheduled_date);
    const isToday = scheduledDate.toDateString() === new Date().toDateString();

    return (
      <TouchableOpacity
        className="bg-white border border-border-gray rounded-lg p-4 mb-3"
        onPress={() =>
          router.push({
            pathname: '/(driver)/job/[id]',
            params: { id: item.id },
          })
        }
      >
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-copper text-2xl font-bold">
            ${driverPayout.toFixed(0)}
          </Text>
          <Text className="text-gray-500 text-sm">
            {isToday
              ? `${item.scheduled_time_start} - ${item.scheduled_time_end}`
              : scheduledDate.toLocaleDateString()}
          </Text>
        </View>

        <Text className="text-navy font-semibold mb-2 capitalize">
          {item.service_type.replace('_', ' ')}
          {item.unit_number ? ` - Unit ${item.unit_number}` : ''}
        </Text>

        <View className="flex-row items-center mb-2">
          <Text className="mr-2">📍</Text>
          <Text className="text-gray-500 text-sm flex-1" numberOfLines={1}>
            {item.pickup_address_text}
          </Text>
        </View>

        <Text className="text-gray-400 text-xs mb-3 capitalize">
          {item.load_size} Load | {getVehicleType(item.load_size)}
        </Text>

        <TouchableOpacity
          className="bg-copper py-3 rounded-lg items-center"
          onPress={() =>
            router.push({
              pathname: '/(driver)/job/[id]',
              params: { id: item.id },
            })
          }
        >
          <Text className="text-white font-semibold">View Details</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  function getVehicleType(loadSize: string): string {
    switch (loadSize) {
      case 'light':
        return 'Pickup OK';
      case 'medium':
        return 'Cargo Van';
      case 'heavy':
        return 'Box Truck';
      default:
        return 'Any Vehicle';
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-light-gray">
      {/* Header */}
      <View className="bg-navy px-6 py-4 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View className="w-8 h-7 bg-copper rounded mr-1" />
          <View className="w-8 h-7 bg-copper rounded" />
          <Text className="text-white font-bold text-lg ml-3">HAULY</Text>
        </View>
        <View className="items-end">
          <Text className="text-copper text-xl font-bold">
            ${todayEarnings.toFixed(0)}
          </Text>
          <Text className="text-white/70 text-xs">today</Text>
        </View>
      </View>

      {/* Online Toggle */}
      <View className="bg-white px-6 py-4 flex-row justify-between items-center border-b border-border-gray">
        <View>
          <Text className="text-navy font-bold text-lg">
            {isOnline ? "You're Online" : "You're Offline"}
          </Text>
          <Text className="text-gray-500 text-sm">
            {isOnline ? 'Accepting new jobs' : 'Go online to see jobs'}
          </Text>
        </View>
        <Switch
          value={isOnline}
          onValueChange={toggleOnline}
          trackColor={{ false: '#E5E5E5', true: '#C27D4B' }}
          thumbColor="#FFFFFF"
        />
      </View>

      {isOnline ? (
        <>
          {/* Jobs Header */}
          <View className="px-6 pt-4">
            <Text className="text-navy font-bold text-lg">
              Available Jobs ({jobs.length})
            </Text>
            <View className="w-12 h-1 bg-copper mt-1" />
          </View>

          {/* Jobs List */}
          <FlatList
            data={jobs}
            renderItem={renderJob}
            keyExtractor={(item) => item.id}
            contentContainerClassName="px-6 py-4"
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={fetchJobs} />
            }
            ListEmptyComponent={
              <View className="items-center py-12">
                <Text className="text-6xl mb-4">📭</Text>
                <Text className="text-gray-400 text-lg mb-2">
                  No jobs available nearby
                </Text>
                <Text className="text-gray-400 text-sm text-center">
                  Jobs typically appear during business hours.{'\n'}
                  We'll notify you when new jobs come in!
                </Text>
              </View>
            }
          />
        </>
      ) : (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-6xl mb-4">🚚</Text>
          <Text className="text-navy text-xl font-bold mb-2">
            Ready to earn?
          </Text>
          <Text className="text-gray-500 text-center mb-8">
            Go online to see available hauling jobs in your area
          </Text>
          <TouchableOpacity
            className="bg-copper px-12 py-4 rounded-lg"
            onPress={() => toggleOnline(true)}
          >
            <Text className="text-white font-bold text-lg">Go Online</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
