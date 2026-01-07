import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../../lib/supabase';
import type { Order, OrderStatus } from '@hauly/types';

const statusSteps: OrderStatus[] = [
  'requested',
  'matched',
  'accepted',
  'en_route',
  'arrived',
  'in_progress',
  'completed',
];

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [driver, setDriver] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
    subscribeToUpdates();
  }, [id]);

  async function fetchOrder() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setOrder(data as Order);

      // Fetch driver if assigned
      if (data.driver_id) {
        const { data: driverData } = await supabase
          .from('users')
          .select('*, driver_profiles(*)')
          .eq('id', data.driver_id)
          .single();
        setDriver(driverData);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function subscribeToUpdates() {
    const channel = supabase
      .channel(`order-${id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${id}`,
        },
        (payload) => {
          setOrder(payload.new as Order);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  function getStatusIndex(status: OrderStatus): number {
    return statusSteps.indexOf(status);
  }

  if (isLoading || !order) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const currentStatusIndex = getStatusIndex(order.status as OrderStatus);
  const isActive = !['completed', 'paid', 'cancelled'].includes(order.status);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 py-4 border-b border-border-gray flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-navy text-lg">← Back</Text>
        </TouchableOpacity>
        <Text className="text-navy font-bold">{order.job_number}</Text>
        <View className="w-12" />
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        {/* Status Banner */}
        {order.status === 'en_route' && driver && (
          <View className="bg-orange-50 border border-copper rounded-lg p-4 mb-6">
            <Text className="text-copper font-bold text-lg mb-1">
              {driver.full_name} is on the way!
            </Text>
            <Text className="text-charcoal">Estimated arrival: 8 minutes</Text>
          </View>
        )}

        {/* Map Placeholder */}
        {isActive && order.status !== 'requested' && (
          <View className="bg-blue-50 rounded-lg h-48 mb-6 items-center justify-center">
            <Text className="text-blue-500 text-lg">🗺️ Live Map View</Text>
            <Text className="text-blue-400 text-sm">
              Real-time driver tracking
            </Text>
          </View>
        )}

        {/* Progress Timeline */}
        <View className="mb-6">
          <Text className="text-navy font-bold mb-4">Status</Text>
          <View className="ml-2">
            {statusSteps.slice(0, 6).map((status, index) => {
              const isPast = index < currentStatusIndex;
              const isCurrent = index === currentStatusIndex;
              const statusLabel: Record<string, string> = {
                requested: 'Booking made',
                matched: 'Hauler matched',
                accepted: 'Hauler accepted',
                en_route: 'En route',
                arrived: 'Arrived',
                in_progress: 'Job started',
              };

              return (
                <View key={status} className="flex-row items-start mb-4">
                  <View
                    className={`w-6 h-6 rounded-full items-center justify-center ${
                      isPast || isCurrent ? 'bg-success-green' : 'bg-gray-200'
                    }`}
                  >
                    {(isPast || isCurrent) && (
                      <Text className="text-white text-xs">✓</Text>
                    )}
                  </View>
                  <View className="ml-3 flex-1">
                    <Text
                      className={`font-medium ${
                        isCurrent ? 'text-navy' : 'text-gray-500'
                      }`}
                    >
                      {statusLabel[status]}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Driver Info */}
        {driver && (
          <View className="border border-border-gray rounded-lg p-4 mb-6">
            <Text className="text-gray-500 text-sm mb-2">Your Hauler</Text>
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-navy rounded-full items-center justify-center">
                <Text className="text-white font-bold">
                  {driver.full_name
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')}
                </Text>
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-navy font-bold">{driver.full_name}</Text>
                <View className="flex-row items-center">
                  <Text className="text-yellow-500">⭐</Text>
                  <Text className="text-gray-500 text-sm ml-1">
                    {driver.driver_profiles?.rating || '5.0'} (
                    {driver.driver_profiles?.total_jobs || 0} jobs)
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                className="w-10 h-10 bg-copper rounded-full items-center justify-center"
                onPress={() => Linking.openURL(`tel:${driver.phone}`)}
              >
                <Text>📞</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center mt-3">
              <Text className="mr-2">🚚</Text>
              <Text className="text-gray-500">
                {driver.driver_profiles?.vehicle_year}{' '}
                {driver.driver_profiles?.vehicle_make}{' '}
                {driver.driver_profiles?.vehicle_model}
              </Text>
            </View>
          </View>
        )}

        {/* Order Details */}
        <View className="border border-border-gray rounded-lg p-4 mb-6">
          <Text className="text-gray-500 text-sm mb-2">Details</Text>

          <View className="space-y-3">
            <View className="flex-row">
              <Text className="w-24 text-gray-500">Service</Text>
              <Text className="text-charcoal capitalize flex-1">
                {order.service_type.replace('_', ' ')}
              </Text>
            </View>
            <View className="flex-row">
              <Text className="w-24 text-gray-500">Pickup</Text>
              <Text className="text-charcoal flex-1">
                {order.pickup_address_text}
              </Text>
            </View>
            {order.dropoff_address_text && (
              <View className="flex-row">
                <Text className="w-24 text-gray-500">Dropoff</Text>
                <Text className="text-charcoal flex-1">
                  {order.dropoff_address_text}
                </Text>
              </View>
            )}
            <View className="flex-row">
              <Text className="w-24 text-gray-500">Scheduled</Text>
              <Text className="text-charcoal flex-1">
                {new Date(order.scheduled_date).toLocaleDateString()}{' '}
                {order.scheduled_time_start} - {order.scheduled_time_end}
              </Text>
            </View>
            <View className="flex-row">
              <Text className="w-24 text-gray-500">Total</Text>
              <Text className="text-navy font-bold">
                ${(order.total_cents / 100).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Cancel Button (only if not started) */}
        {['requested', 'matched', 'accepted'].includes(order.status) && (
          <TouchableOpacity className="border border-error-red rounded-lg py-3 items-center mb-6">
            <Text className="text-error-red font-semibold">Cancel Order</Text>
          </TouchableOpacity>
        )}

        {/* Spacer */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
