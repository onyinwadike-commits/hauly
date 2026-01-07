import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { LoadSize } from '@hauly/types';

interface PricingTier {
  loadSize: LoadSize;
  label: string;
  pricePerHour: number;
  vehicle: string;
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    loadSize: 'light',
    label: 'Light Load',
    pricePerHour: 89,
    vehicle: 'Pickup Truck',
  },
  {
    loadSize: 'medium',
    label: 'Medium Load',
    pricePerHour: 149,
    vehicle: 'Cargo Van',
    popular: true,
  },
  {
    loadSize: 'heavy',
    label: 'Heavy Load',
    pricePerHour: 249,
    vehicle: 'Box Truck',
  },
];

export default function QuoteScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [selectedTier, setSelectedTier] = useState<LoadSize>('medium');
  const [estimatedHours, setEstimatedHours] = useState(2);
  const [isCalculating, setIsCalculating] = useState(false);

  const currentTier = pricingTiers.find((t) => t.loadSize === selectedTier)!;
  const basePrice = currentTier.pricePerHour * estimatedHours;
  const total = basePrice; // All-inclusive pricing

  function handleConfirm() {
    router.push({
      pathname: '/(customer)/booking/payment',
      params: {
        ...params,
        loadSize: selectedTier,
        estimatedHours: estimatedHours.toString(),
        basePriceCents: (basePrice * 100).toString(),
        totalCents: (total * 100).toString(),
      },
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 py-4 border-b border-border-gray flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-navy text-lg">← Back</Text>
        </TouchableOpacity>
        <Text className="text-navy font-bold text-lg ml-4">Your Quote</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        {/* Load Size Selection */}
        <Text className="text-navy text-lg font-bold mb-4">Select Load Size</Text>

        <View className="space-y-3 mb-6">
          {pricingTiers.map((tier) => (
            <TouchableOpacity
              key={tier.loadSize}
              className={`p-4 rounded-xl border-2 ${
                selectedTier === tier.loadSize
                  ? 'border-copper bg-orange-50'
                  : 'border-border-gray'
              }`}
              onPress={() => setSelectedTier(tier.loadSize)}
            >
              {tier.popular && (
                <View className="absolute -top-2 right-4 bg-copper px-2 py-0.5 rounded">
                  <Text className="text-white text-xs font-bold">POPULAR</Text>
                </View>
              )}
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-navy font-semibold text-lg">
                    {tier.label}
                  </Text>
                  <Text className="text-gray-500 text-sm">{tier.vehicle}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-navy text-2xl font-bold">
                    ${tier.pricePerHour}
                  </Text>
                  <Text className="text-gray-500 text-sm">/hour</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Hours Selection */}
        <Text className="text-navy text-lg font-bold mb-4">Estimated Hours</Text>
        <View className="flex-row items-center justify-center mb-6">
          <TouchableOpacity
            className="w-12 h-12 bg-light-gray rounded-lg items-center justify-center"
            onPress={() => setEstimatedHours(Math.max(2, estimatedHours - 0.5))}
          >
            <Text className="text-navy text-2xl font-bold">−</Text>
          </TouchableOpacity>
          <View className="px-8">
            <Text className="text-navy text-3xl font-bold">{estimatedHours}</Text>
            <Text className="text-gray-500 text-center">hours</Text>
          </View>
          <TouchableOpacity
            className="w-12 h-12 bg-light-gray rounded-lg items-center justify-center"
            onPress={() => setEstimatedHours(estimatedHours + 0.5)}
          >
            <Text className="text-navy text-2xl font-bold">+</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-gray-400 text-xs text-center mb-6">
          2 hour minimum • Billed in 30-minute increments
        </Text>

        {/* Price Summary */}
        <View className="bg-orange-50 border-2 border-copper rounded-xl p-6 mb-6">
          <View className="items-center mb-4">
            <Text className="text-gray-600 text-sm uppercase tracking-wide">
              {currentTier.label}
            </Text>
            <Text className="text-navy text-4xl font-bold">${total}</Text>
            <Text className="text-gray-500">estimated total</Text>
          </View>

          <View className="border-t border-copper/30 pt-4 space-y-2">
            {[
              `${currentTier.vehicle} or larger`,
              '1 professional Hauler',
              'Photo documentation',
              'All insurance & fees included',
            ].map((item, i) => (
              <View key={i} className="flex-row items-center">
                <Text className="text-copper mr-2">✓</Text>
                <Text className="text-charcoal text-sm">{item}</Text>
              </View>
            ))}
          </View>

          <View className="flex-row items-center justify-center mt-4">
            <Text className="text-copper mr-1">🔒</Text>
            <Text className="text-gray-500 text-xs">
              Price locked for 2 hours
            </Text>
          </View>
        </View>

        {/* Trust Badges */}
        <View className="bg-light-gray rounded-lg p-4 mb-6">
          {[
            { icon: '🛡️', text: '$1M/$2M Insurance Coverage' },
            { icon: '✓', text: 'Background Checked Haulers' },
            { icon: '📸', text: 'Photo Proof Included' },
          ].map((badge, i) => (
            <View key={i} className="flex-row items-center mb-2 last:mb-0">
              <Text className="mr-2">{badge.icon}</Text>
              <Text className="text-charcoal text-sm">{badge.text}</Text>
            </View>
          ))}
        </View>

        {/* Spacer */}
        <View className="h-20" />
      </ScrollView>

      {/* Confirm Button */}
      <View className="px-6 py-4 border-t border-border-gray">
        <TouchableOpacity
          className="bg-copper py-4 rounded-lg items-center"
          onPress={handleConfirm}
        >
          <Text className="text-white text-base font-semibold">
            Confirm Booking • ${total}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
