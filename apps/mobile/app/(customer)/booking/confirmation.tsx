import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConfirmationScreen() {
  const { orderId, jobNumber } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        {/* Success Icon */}
        <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-6">
          <Text className="text-4xl">✓</Text>
        </View>

        {/* Confirmation Message */}
        <Text className="text-navy text-2xl font-bold mb-2">
          Booking Confirmed!
        </Text>
        <Text className="text-gray-500 text-base mb-8">
          Job #{jobNumber}
        </Text>

        {/* What's Next */}
        <View className="bg-light-gray rounded-lg p-6 w-full mb-8">
          <Text className="text-navy font-bold mb-4">What happens next:</Text>
          <View className="space-y-3">
            {[
              'We're matching you with a nearby Hauler',
              'You'll get a notification when matched',
              'Your Hauler will arrive at scheduled time',
              'Before & after photos will be sent to you',
            ].map((step, i) => (
              <View key={i} className="flex-row items-start">
                <View className="w-6 h-6 bg-copper rounded-full items-center justify-center mr-3">
                  <Text className="text-white text-xs font-bold">{i + 1}</Text>
                </View>
                <Text className="text-charcoal flex-1">{step}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Actions */}
        <TouchableOpacity
          className="bg-copper py-4 px-8 rounded-lg mb-4 w-full items-center"
          onPress={() =>
            router.replace({
              pathname: '/(customer)/orders/[id]',
              params: { id: orderId as string },
            })
          }
        >
          <Text className="text-white font-semibold">Track Job</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border border-navy py-4 px-8 rounded-lg w-full items-center"
          onPress={() => router.replace('/(customer)/')}
        >
          <Text className="text-navy font-semibold">Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
