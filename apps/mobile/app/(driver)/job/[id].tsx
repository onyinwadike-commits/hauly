import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../../lib/supabase';
import type { Order } from '@hauly/types';

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [job, setJob] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAccepting, setIsAccepting] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  async function fetchJob() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setJob(data as Order);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAcceptJob() {
    if (!job) return;

    setIsAccepting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('orders')
        .update({
          driver_id: user.id,
          status: 'accepted',
          accepted_at: new Date().toISOString(),
        })
        .eq('id', job.id)
        .eq('status', 'requested') // Only if still available
        .select()
        .single();

      if (error) throw error;

      if (data) {
        Alert.alert('Job Accepted!', 'Navigate to the pickup location.', [
          {
            text: 'OK',
            onPress: () => router.replace('/(driver)/active'),
          },
        ]);
      } else {
        Alert.alert('Job Unavailable', 'This job was taken by another driver.');
        router.back();
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsAccepting(false);
    }
  }

  if (isLoading || !job) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#C27D4B" />
      </SafeAreaView>
    );
  }

  const driverPayout = job.driver_payout_cents / 100;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 py-4 border-b border-border-gray flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-navy text-lg">← Back</Text>
        </TouchableOpacity>
        <Text className="text-navy font-bold text-lg ml-4">{job.job_number}</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        {/* Earnings Card */}
        <View className="flex-row justify-between mb-6">
          <View className="flex-1 bg-green-50 p-4 rounded-lg items-center mr-2">
            <Text className="text-success-green text-2xl font-bold">
              ${driverPayout.toFixed(0)}
            </Text>
            <Text className="text-gray-500 text-xs">You'll Earn</Text>
          </View>
          <View className="flex-1 bg-blue-50 p-4 rounded-lg items-center mx-2">
            <Text className="text-blue-600 text-xl font-bold">
              {job.estimated_hours} hrs
            </Text>
            <Text className="text-gray-500 text-xs">
              {job.scheduled_time_start}-{job.scheduled_time_end}
            </Text>
          </View>
          <View className="flex-1 bg-orange-50 p-4 rounded-lg items-center ml-2">
            <Text className="text-copper text-xl font-bold">1.2 mi</Text>
            <Text className="text-gray-500 text-xs">5 min</Text>
          </View>
        </View>

        {/* Map Preview */}
        <View className="bg-gray-100 rounded-lg h-32 mb-6 items-center justify-center">
          <Text className="text-gray-500">📍 Map Preview</Text>
        </View>

        {/* Job Details */}
        <View className="mb-6">
          <Text className="text-navy font-bold mb-3">Pickup Details</Text>
          <Text className="text-charcoal mb-1">{job.pickup_address_text}</Text>
          {job.pickup_instructions && (
            <Text className="text-gray-500 text-sm">
              📝 {job.pickup_instructions}
            </Text>
          )}
        </View>

        {/* Customer Note */}
        {job.item_description && (
          <View className="bg-yellow-50 rounded-lg p-4 mb-6">
            <Text className="text-navy font-medium mb-1">Customer Note</Text>
            <Text className="text-charcoal italic">"{job.item_description}"</Text>
          </View>
        )}

        {/* Requirements */}
        <View className="bg-orange-50 rounded-lg p-4 mb-6">
          <Text className="text-copper font-bold mb-2">⚠️ Requirements</Text>
          <View className="space-y-2">
            {[
              'Take before photos',
              'Photo documentation required',
              'Customer signature required',
            ].map((req, i) => (
              <View key={i} className="flex-row items-center">
                <Text className="text-copper mr-2">✓</Text>
                <Text className="text-charcoal">{req}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Spacer */}
        <View className="h-24" />
      </ScrollView>

      {/* Bottom Actions */}
      <View className="px-6 py-4 border-t border-border-gray flex-row space-x-3">
        <TouchableOpacity
          className="flex-1 border border-gray-300 py-4 rounded-lg items-center"
          onPress={() => router.back()}
        >
          <Text className="text-charcoal font-semibold">Pass</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-4 rounded-lg items-center ${
            isAccepting ? 'bg-gray-300' : 'bg-copper'
          }`}
          onPress={handleAcceptJob}
          disabled={isAccepting}
        >
          {isAccepting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-white font-semibold">Accept Job</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
