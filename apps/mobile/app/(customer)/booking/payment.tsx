import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../../lib/supabase';

export default function PaymentScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const totalCents = parseInt(params.totalCents as string);
  const total = totalCents / 100;

  async function handlePayment() {
    setIsProcessing(true);

    try {
      // Create order in database
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Parse scheduled date/time
      const scheduledDate = new Date(params.scheduledDate as string);
      const scheduledTime = new Date(params.scheduledTime as string);

      const basePriceCents = parseInt(params.basePriceCents as string);
      const platformFeeCents = Math.round(basePriceCents * 0.25);
      const driverPayoutCents = basePriceCents - platformFeeCents;

      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          customer_id: user.id,
          service_type: params.serviceType,
          load_size: params.loadSize,
          pickup_address_text: params.pickupAddress,
          pickup_location: `POINT(-114.98 36.04)`, // Default Henderson coords
          pickup_instructions: params.accessInstructions || null,
          pickup_gate_code: params.gateCode || null,
          dropoff_address_text: params.dropoffAddress || null,
          dropoff_location: params.dropoffAddress ? `POINT(-114.98 36.04)` : null,
          scheduled_date: scheduledDate.toISOString().split('T')[0],
          scheduled_time_start: scheduledTime.toTimeString().slice(0, 5),
          scheduled_time_end: new Date(
            scheduledTime.getTime() + 2 * 60 * 60 * 1000
          )
            .toTimeString()
            .slice(0, 5),
          estimated_hours: parseFloat(params.estimatedHours as string),
          customer_notes: params.itemDescription || null,
          item_description: params.itemDescription || null,
          base_price_cents: basePriceCents,
          platform_fee_cents: platformFeeCents,
          driver_payout_cents: driverPayoutCents,
          total_cents: totalCents,
        })
        .select()
        .single();

      if (error) throw error;

      // Navigate to confirmation
      router.replace({
        pathname: '/(customer)/booking/confirmation',
        params: { orderId: order.id, jobNumber: order.job_number },
      });
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 py-4 border-b border-border-gray flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-navy text-lg">← Back</Text>
        </TouchableOpacity>
        <Text className="text-navy font-bold text-lg ml-4">Payment</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        {/* Order Summary */}
        <View className="bg-light-gray rounded-lg p-4 mb-6">
          <Text className="text-navy font-bold mb-3">Order Summary</Text>

          <View className="space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-charcoal">Service</Text>
              <Text className="text-charcoal font-medium">
                {(params.serviceType as string).replace('_', ' ')}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-charcoal">Load Size</Text>
              <Text className="text-charcoal font-medium capitalize">
                {params.loadSize}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-charcoal">Estimated Time</Text>
              <Text className="text-charcoal font-medium">
                {params.estimatedHours} hours
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-charcoal">Pickup</Text>
              <Text className="text-charcoal font-medium text-right flex-1 ml-4" numberOfLines={1}>
                {params.pickupAddress}
              </Text>
            </View>
          </View>

          <View className="border-t border-border-gray mt-4 pt-4 flex-row justify-between">
            <Text className="text-navy font-bold text-lg">Total</Text>
            <Text className="text-navy font-bold text-lg">${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Payment Method */}
        <Text className="text-navy font-bold mb-4">Payment Method</Text>

        {/* Placeholder for Stripe CardField */}
        <View className="border border-border-gray rounded-lg p-4 mb-6">
          <Text className="text-gray-400 text-center">
            💳 Card payment integration
          </Text>
          <Text className="text-gray-400 text-center text-sm mt-2">
            (Stripe CardField component goes here)
          </Text>
        </View>

        {/* Security Note */}
        <View className="flex-row items-center justify-center mb-6">
          <Text className="text-success-green mr-2">🔒</Text>
          <Text className="text-gray-500 text-sm">
            Secured by Stripe • Card not charged until job starts
          </Text>
        </View>

        {/* Spacer */}
        <View className="h-20" />
      </ScrollView>

      {/* Complete Booking Button */}
      <View className="px-6 py-4 border-t border-border-gray">
        <TouchableOpacity
          className={`py-4 rounded-lg items-center ${
            isProcessing ? 'bg-gray-300' : 'bg-copper'
          }`}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-white text-base font-semibold">
              Complete Booking
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
