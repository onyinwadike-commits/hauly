import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../../lib/supabase';
import type { Order } from '@hauly/types';

export default function JobCompleteScreen() {
  const { orderId } = useLocalSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  async function fetchOrder() {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();
    setOrder(data as Order);
  }

  if (!order) return null;

  const earnings = order.driver_payout_cents / 100;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-navy px-6 py-4">
        <Text className="text-white font-bold text-center">HAULY</Text>
      </View>

      <View className="flex-1 px-6 pt-8 items-center">
        {/* Success Icon */}
        <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-6">
          <Text className="text-4xl">✓</Text>
        </View>

        <Text className="text-navy text-2xl font-bold mb-2">Job Complete!</Text>
        <Text className="text-gray-500 mb-8">{order.job_number}</Text>

        {/* Earnings Card */}
        <View className="bg-green-50 rounded-xl p-8 w-full items-center mb-8">
          <Text className="text-gray-600">You Earned</Text>
          <Text className="text-success-green text-5xl font-bold">
            ${earnings.toFixed(2)}
          </Text>
        </View>

        {/* Job Summary */}
        <View className="w-full space-y-2 mb-8">
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Time:</Text>
            <Text className="text-charcoal">
              {order.scheduled_time_start} - {order.scheduled_time_end}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Duration:</Text>
            <Text className="text-charcoal">
              {order.estimated_hours} hours
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Payment:</Text>
            <Text className="text-charcoal">Direct deposit</Text>
          </View>
        </View>

        {/* Rating Received */}
        <View className="border-t border-border-gray pt-6 w-full items-center mb-8">
          <Text className="text-gray-500 mb-2">Customer Rating</Text>
          <View className="flex-row">
            {[1, 2, 3, 4, 5].map((star) => (
              <Text key={star} className="text-2xl text-yellow-400">
                ⭐
              </Text>
            ))}
          </View>
          <Text className="text-gray-500 italic mt-2">
            "Great job, very professional"
          </Text>
        </View>

        {/* Today's Stats */}
        <View className="bg-light-gray rounded-lg p-4 w-full">
          <View className="flex-row justify-between mb-2">
            <Text className="text-charcoal">Today's Earnings:</Text>
            <Text className="text-navy font-bold">$396</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-charcoal">This Week:</Text>
            <Text className="text-navy font-bold">$1,247</Text>
          </View>
        </View>
      </View>

      {/* Bottom Actions */}
      <View className="px-6 py-4 flex-row space-x-3">
        <TouchableOpacity
          className="flex-1 border border-gray-300 py-4 rounded-lg items-center"
          onPress={() => router.push('/(driver)/earnings')}
        >
          <Text className="text-charcoal font-semibold">View Receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-copper py-4 rounded-lg items-center"
          onPress={() => router.replace('/(driver)/')}
        >
          <Text className="text-white font-semibold">Find Next Job</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
