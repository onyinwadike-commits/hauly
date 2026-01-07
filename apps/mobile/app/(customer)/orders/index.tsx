import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../../lib/supabase';
import type { Order, OrderStatus } from '@hauly/types';

const statusColors: Record<OrderStatus, { bg: string; text: string }> = {
  requested: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  matched: { bg: 'bg-blue-100', text: 'text-blue-800' },
  accepted: { bg: 'bg-blue-100', text: 'text-blue-800' },
  en_route: { bg: 'bg-orange-100', text: 'text-orange-800' },
  arrived: { bg: 'bg-orange-100', text: 'text-orange-800' },
  in_progress: { bg: 'bg-purple-100', text: 'text-purple-800' },
  completed: { bg: 'bg-green-100', text: 'text-green-800' },
  paid: { bg: 'bg-green-100', text: 'text-green-800' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-800' },
};

const statusLabels: Record<OrderStatus, string> = {
  requested: 'Finding Hauler',
  matched: 'Matched',
  accepted: 'Confirmed',
  en_route: 'En Route',
  arrived: 'Arrived',
  in_progress: 'In Progress',
  completed: 'Completed',
  paid: 'Paid',
  cancelled: 'Cancelled',
};

export default function OrdersListScreen() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'active' | 'past' | 'all'>('active');

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  async function fetchOrders() {
    setIsLoading(true);
    try {
      let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter === 'active') {
        query = query.not('status', 'in', '("completed","paid","cancelled")');
      } else if (filter === 'past') {
        query = query.in('status', ['completed', 'paid', 'cancelled']);
      }

      const { data, error } = await query;
      if (error) throw error;
      setOrders(data as Order[]);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function renderOrder({ item }: { item: Order }) {
    const status = item.status as OrderStatus;
    const colors = statusColors[status];

    return (
      <TouchableOpacity
        className="bg-white border border-border-gray rounded-lg p-4 mb-3"
        onPress={() =>
          router.push({
            pathname: '/(customer)/orders/[id]',
            params: { id: item.id },
          })
        }
      >
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-navy font-semibold">{item.job_number}</Text>
          <View className={`px-3 py-1 rounded-full ${colors.bg}`}>
            <Text className={`text-xs font-semibold ${colors.text}`}>
              {statusLabels[status]}
            </Text>
          </View>
        </View>

        <Text className="text-charcoal mb-2 capitalize">
          {item.service_type.replace('_', ' ')}
        </Text>

        <View className="flex-row items-center mb-2">
          <Text className="mr-2">📍</Text>
          <Text className="text-gray-500 text-sm flex-1" numberOfLines={1}>
            {item.pickup_address_text}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Text className="mr-2">📅</Text>
            <Text className="text-gray-500 text-sm">
              {new Date(item.scheduled_date).toLocaleDateString()}
            </Text>
          </View>
          <Text className="text-navy font-bold">
            ${(item.total_cents / 100).toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-light-gray">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-border-gray">
        <Text className="text-navy text-2xl font-bold">My Orders</Text>
      </View>

      {/* Filter Tabs */}
      <View className="flex-row px-6 py-3 bg-white border-b border-border-gray">
        {(['active', 'past', 'all'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            className={`px-4 py-2 rounded-full mr-2 ${
              filter === f ? 'bg-copper' : 'bg-light-gray'
            }`}
            onPress={() => setFilter(f)}
          >
            <Text
              className={`font-medium capitalize ${
                filter === f ? 'text-white' : 'text-charcoal'
              }`}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders List */}
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-6 py-4"
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchOrders} />
        }
        ListEmptyComponent={
          <View className="items-center py-12">
            <Text className="text-gray-400 text-lg mb-2">No orders yet</Text>
            <TouchableOpacity
              className="bg-copper px-6 py-3 rounded-lg mt-4"
              onPress={() => router.push('/(customer)/')}
            >
              <Text className="text-white font-semibold">Book Your First Haul</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}
