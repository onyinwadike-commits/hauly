import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import type { Order, OrderStatus } from '@hauly/types';

export default function ActiveJobScreen() {
  const router = useRouter();
  const [activeJob, setActiveJob] = useState<Order | null>(null);
  const [customer, setCustomer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchActiveJob();
  }, []);

  async function fetchActiveJob() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('driver_id', user.id)
        .in('status', ['accepted', 'en_route', 'arrived', 'in_progress'])
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setActiveJob(data as Order);
        // Fetch customer info
        const { data: customerData } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.customer_id)
          .single();
        setCustomer(customerData);
      }
    } catch (error) {
      console.error('Error fetching active job:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateStatus(newStatus: OrderStatus) {
    if (!activeJob) return;

    setIsUpdating(true);
    try {
      const updates: any = { status: newStatus };

      // Add timestamp based on status
      if (newStatus === 'en_route') updates.started_at = new Date().toISOString();
      if (newStatus === 'arrived') updates.arrived_at = new Date().toISOString();
      if (newStatus === 'completed') updates.completed_at = new Date().toISOString();

      const { error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', activeJob.id);

      if (error) throw error;

      setActiveJob({ ...activeJob, status: newStatus });

      // Navigate to photo capture when starting job
      if (newStatus === 'in_progress') {
        router.push({
          pathname: '/(driver)/job/photos',
          params: { orderId: activeJob.id, type: 'before' },
        });
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsUpdating(false);
    }
  }

  function openNavigation() {
    if (!activeJob) return;
    // Open in Google Maps
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      activeJob.pickup_address_text
    )}`;
    Linking.openURL(url);
  }

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#C27D4B" />
      </SafeAreaView>
    );
  }

  if (!activeJob) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <Text className="text-6xl mb-4">✅</Text>
        <Text className="text-navy text-xl font-bold mb-2">No Active Job</Text>
        <Text className="text-gray-500 text-center mb-8">
          Accept a job from the Jobs tab to get started
        </Text>
        <TouchableOpacity
          className="bg-copper px-8 py-4 rounded-lg"
          onPress={() => router.replace('/(driver)/')}
        >
          <Text className="text-white font-semibold">Find Jobs</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const status = activeJob.status as OrderStatus;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-navy px-6 py-4">
        <Text className="text-white font-bold text-center">HAULY</Text>
        <Text className="text-white/70 text-center text-sm">
          {activeJob.job_number} | Active
        </Text>
      </View>

      {/* Status-specific content */}
      {status === 'accepted' && (
        <>
          <View className="bg-blue-50 px-6 py-4">
            <Text className="text-blue-800 font-bold">Job Accepted</Text>
            <Text className="text-blue-600">
              Head to pickup location when ready
            </Text>
          </View>

          <ScrollView className="flex-1 px-6 pt-6">
            {/* Map placeholder */}
            <View className="bg-gray-100 rounded-lg h-48 mb-6 items-center justify-center">
              <Text className="text-gray-500">🗺️ Route Preview</Text>
            </View>

            {/* Pickup Info */}
            <View className="mb-6">
              <Text className="text-navy font-bold mb-2">Pickup Location</Text>
              <Text className="text-charcoal">{activeJob.pickup_address_text}</Text>
              {activeJob.pickup_instructions && (
                <Text className="text-gray-500 mt-1">
                  📝 {activeJob.pickup_instructions}
                </Text>
              )}
            </View>

            {/* Customer Info */}
            {customer && (
              <View className="border border-border-gray rounded-lg p-4 mb-6">
                <Text className="text-gray-500 text-sm mb-2">Customer</Text>
                <Text className="text-navy font-bold">{customer.full_name}</Text>
                <TouchableOpacity
                  className="flex-row items-center mt-2"
                  onPress={() => Linking.openURL(`tel:${customer.phone}`)}
                >
                  <Text className="text-copper">📞 Call Customer</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>

          <View className="px-6 py-4 space-y-3">
            <TouchableOpacity
              className="bg-blue-500 py-4 rounded-lg items-center flex-row justify-center"
              onPress={openNavigation}
            >
              <Text className="text-white font-semibold">
                🧭 Start Navigation
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`bg-copper py-4 rounded-lg items-center ${
                isUpdating ? 'opacity-70' : ''
              }`}
              onPress={() => updateStatus('en_route')}
              disabled={isUpdating}
            >
              <Text className="text-white font-semibold">
                I've Started Driving
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {status === 'en_route' && (
        <>
          <View className="flex-1">
            {/* Full map */}
            <View className="flex-1 bg-blue-50 items-center justify-center">
              <Text className="text-blue-500 text-6xl mb-4">🗺️</Text>
              <Text className="text-blue-800 font-bold text-lg">
                Navigating to Pickup
              </Text>
              <View className="bg-white px-4 py-2 rounded-lg mt-4">
                <Text className="text-navy font-bold">ETA: 5 min</Text>
              </View>
            </View>
          </View>

          <View className="px-6 py-4 space-y-3">
            <TouchableOpacity
              className="border border-gray-300 py-3 rounded-lg items-center flex-row justify-center"
              onPress={() => Linking.openURL(`tel:${customer?.phone}`)}
            >
              <Text className="text-charcoal">📞 Call Customer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`bg-copper py-4 rounded-lg items-center ${
                isUpdating ? 'opacity-70' : ''
              }`}
              onPress={() => updateStatus('arrived')}
              disabled={isUpdating}
            >
              <Text className="text-white font-semibold">I've Arrived</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {status === 'arrived' && (
        <>
          <View className="bg-green-50 px-6 py-4">
            <Text className="text-success-green font-bold text-lg">
              You've Arrived! ✓
            </Text>
            <Text className="text-green-700">
              Meet the customer and start the job
            </Text>
          </View>

          <ScrollView className="flex-1 px-6 pt-6">
            <View className="mb-6">
              <Text className="text-navy font-bold mb-2">Location</Text>
              <Text className="text-charcoal">{activeJob.pickup_address_text}</Text>
            </View>

            {activeJob.pickup_gate_code && (
              <View className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <Text className="text-yellow-800 font-bold">🔑 Gate Code</Text>
                <Text className="text-yellow-900 text-2xl font-mono mt-1">
                  {activeJob.pickup_gate_code}
                </Text>
              </View>
            )}

            {activeJob.pickup_instructions && (
              <View className="bg-light-gray rounded-lg p-4 mb-6">
                <Text className="text-navy font-bold mb-1">
                  Access Instructions
                </Text>
                <Text className="text-charcoal">
                  {activeJob.pickup_instructions}
                </Text>
              </View>
            )}

            {customer && (
              <TouchableOpacity
                className="border border-border-gray rounded-lg p-4 flex-row items-center"
                onPress={() => Linking.openURL(`tel:${customer.phone}`)}
              >
                <Text className="text-xl mr-3">📞</Text>
                <View className="flex-1">
                  <Text className="text-navy font-bold">{customer.full_name}</Text>
                  <Text className="text-gray-500">Tap to call</Text>
                </View>
              </TouchableOpacity>
            )}
          </ScrollView>

          <View className="px-6 py-4">
            <TouchableOpacity
              className={`bg-copper py-4 rounded-lg items-center ${
                isUpdating ? 'opacity-70' : ''
              }`}
              onPress={() => updateStatus('in_progress')}
              disabled={isUpdating}
            >
              <Text className="text-white font-semibold">Start Job</Text>
            </TouchableOpacity>
            <Text className="text-gray-400 text-xs text-center mt-2">
              You'll be prompted to take before photos
            </Text>
          </View>
        </>
      )}

      {status === 'in_progress' && (
        <>
          <View className="bg-purple-50 px-6 py-4">
            <Text className="text-purple-800 font-bold text-lg">
              Job In Progress
            </Text>
            <Text className="text-purple-600">
              Complete the haul and take after photos
            </Text>
          </View>

          <View className="flex-1 px-6 pt-6 items-center justify-center">
            <View className="bg-light-gray rounded-xl p-8 items-center w-full">
              <Text className="text-4xl mb-4">⏱️</Text>
              <Text className="text-navy text-3xl font-bold">1:45:32</Text>
              <Text className="text-gray-500">Time elapsed</Text>
            </View>
          </View>

          <View className="px-6 py-4">
            <TouchableOpacity
              className="bg-copper py-4 rounded-lg items-center"
              onPress={() =>
                router.push({
                  pathname: '/(driver)/job/photos',
                  params: { orderId: activeJob.id, type: 'after' },
                })
              }
            >
              <Text className="text-white font-semibold">
                Take After Photos & Complete
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
