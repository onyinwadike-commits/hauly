import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ServiceType } from '@hauly/types';

interface ServiceOption {
  type: ServiceType;
  icon: string;
  title: string;
  description: string;
}

const services: ServiceOption[] = [
  {
    type: 'apartment_turn',
    icon: '🏢',
    title: 'Apartment Turn',
    description: 'Remove old furniture, dispose of trash',
  },
  {
    type: 'furniture_delivery',
    icon: '🚚',
    title: 'Furniture Delivery',
    description: 'Pick up from store, deliver to address',
  },
  {
    type: 'junk_removal',
    icon: '🗑️',
    title: 'Junk Removal',
    description: 'Haul away unwanted items',
  },
  {
    type: 'other',
    icon: '📦',
    title: 'Other / Custom',
    description: 'Custom hauling request',
  },
];

export default function CustomerHomeScreen() {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const router = useRouter();

  function handleContinue() {
    if (selectedService) {
      router.push({
        pathname: '/(customer)/booking/details',
        params: { serviceType: selectedService },
      });
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 pt-4 pb-6 border-b border-border-gray">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-8 h-7 bg-copper rounded mr-1" />
            <View className="w-8 h-7 bg-copper rounded" />
            <Text className="text-navy text-xl font-bold ml-3">HAULY</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        {/* Title */}
        <Text className="text-navy text-2xl font-bold mb-2">
          What do you need hauled?
        </Text>
        <View className="w-12 h-1 bg-copper mb-6" />

        {/* Service Options */}
        <View className="space-y-3">
          {services.map((service) => (
            <TouchableOpacity
              key={service.type}
              className={`p-4 rounded-lg border-2 flex-row items-center ${
                selectedService === service.type
                  ? 'border-copper bg-orange-50'
                  : 'border-border-gray'
              }`}
              onPress={() => setSelectedService(service.type)}
            >
              <View
                className={`w-12 h-12 rounded-lg items-center justify-center ${
                  selectedService === service.type ? 'bg-copper' : 'bg-light-gray'
                }`}
              >
                <Text className="text-2xl">{service.icon}</Text>
              </View>
              <View className="flex-1 ml-4">
                <Text
                  className={`font-semibold text-base ${
                    selectedService === service.type ? 'text-copper' : 'text-navy'
                  }`}
                >
                  {service.title}
                </Text>
                <Text className="text-gray-500 text-sm">{service.description}</Text>
              </View>
              {selectedService === service.type && (
                <View className="w-6 h-6 bg-copper rounded-full items-center justify-center">
                  <Text className="text-white text-sm">✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View className="px-6 py-4 border-t border-border-gray">
        <TouchableOpacity
          className={`py-4 rounded-lg items-center ${
            selectedService ? 'bg-copper' : 'bg-gray-200'
          }`}
          onPress={handleContinue}
          disabled={!selectedService}
        >
          <Text
            className={`text-base font-semibold ${
              selectedService ? 'text-white' : 'text-gray-400'
            }`}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
