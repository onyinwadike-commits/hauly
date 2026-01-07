import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function BookingDetailsScreen() {
  const { serviceType } = useLocalSearchParams<{ serviceType: string }>();
  const router = useRouter();

  // Form state
  const [pickupAddress, setPickupAddress] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [accessInstructions, setAccessInstructions] = useState('');
  const [gateCode, setGateCode] = useState('');
  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [scheduledTime, setScheduledTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [itemDescription, setItemDescription] = useState('');

  // Dropoff (only for furniture delivery)
  const [dropoffAddress, setDropoffAddress] = useState('');
  const needsDropoff = serviceType === 'furniture_delivery';

  const serviceLabels: Record<string, string> = {
    apartment_turn: 'Apartment Turn',
    furniture_delivery: 'Furniture Delivery',
    junk_removal: 'Junk Removal',
    other: 'Custom Hauling',
  };

  function handleContinue() {
    if (!pickupAddress) {
      alert('Please enter a pickup address');
      return;
    }

    router.push({
      pathname: '/(customer)/booking/quote',
      params: {
        serviceType,
        pickupAddress,
        unitNumber,
        accessInstructions,
        gateCode,
        dropoffAddress: needsDropoff ? dropoffAddress : '',
        scheduledDate: scheduledDate.toISOString(),
        scheduledTime: scheduledTime.toISOString(),
        itemDescription,
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
        <Text className="text-navy font-bold text-lg ml-4">
          {serviceLabels[serviceType as string] || 'Booking'}
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        {/* Pickup Location */}
        <Text className="text-navy text-lg font-bold mb-4">Pickup Location</Text>

        <View className="mb-4">
          <Text className="text-charcoal text-sm font-medium mb-2">
            Street Address *
          </Text>
          <View className="flex-row items-center border border-border-gray rounded-lg px-4 py-3">
            <Text className="mr-2">📍</Text>
            <TextInput
              className="flex-1 text-base"
              placeholder="123 Desert View Dr"
              value={pickupAddress}
              onChangeText={setPickupAddress}
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-charcoal text-sm font-medium mb-2">
            Unit/Apt # (optional)
          </Text>
          <TextInput
            className="border border-border-gray rounded-lg px-4 py-3 text-base"
            placeholder="Unit 204"
            value={unitNumber}
            onChangeText={setUnitNumber}
          />
        </View>

        <View className="mb-4">
          <Text className="text-charcoal text-sm font-medium mb-2">
            Access Instructions
          </Text>
          <TextInput
            className="border border-border-gray rounded-lg px-4 py-3 text-base h-20"
            placeholder="Gate code, parking, elevator info..."
            value={accessInstructions}
            onChangeText={setAccessInstructions}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View className="mb-6">
          <Text className="text-charcoal text-sm font-medium mb-2">
            Gate Code (optional)
          </Text>
          <TextInput
            className="border border-border-gray rounded-lg px-4 py-3 text-base"
            placeholder="#1234"
            value={gateCode}
            onChangeText={setGateCode}
            secureTextEntry
          />
          <Text className="text-gray-400 text-xs mt-1">
            🔒 Only shared with your assigned Hauler
          </Text>
        </View>

        {/* Dropoff Location (for furniture delivery) */}
        {needsDropoff && (
          <>
            <Text className="text-navy text-lg font-bold mb-4">
              Dropoff Location
            </Text>
            <View className="mb-6">
              <Text className="text-charcoal text-sm font-medium mb-2">
                Delivery Address *
              </Text>
              <View className="flex-row items-center border border-border-gray rounded-lg px-4 py-3">
                <Text className="mr-2">🏠</Text>
                <TextInput
                  className="flex-1 text-base"
                  placeholder="456 New Home St"
                  value={dropoffAddress}
                  onChangeText={setDropoffAddress}
                />
              </View>
            </View>
          </>
        )}

        {/* Schedule */}
        <Text className="text-navy text-lg font-bold mb-4">Schedule</Text>

        <View className="flex-row space-x-3 mb-6">
          <TouchableOpacity
            className="flex-1 flex-row items-center border border-border-gray rounded-lg px-4 py-3"
            onPress={() => setShowDatePicker(true)}
          >
            <Text className="mr-2">📅</Text>
            <Text className="text-base">
              {scheduledDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 flex-row items-center border border-border-gray rounded-lg px-4 py-3"
            onPress={() => setShowTimePicker(true)}
          >
            <Text className="mr-2">🕐</Text>
            <Text className="text-base">
              {scheduledTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Date/Time Pickers */}
        {showDatePicker && (
          <DateTimePicker
            value={scheduledDate}
            mode="date"
            minimumDate={new Date()}
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setScheduledDate(date);
            }}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={scheduledTime}
            mode="time"
            onChange={(event, time) => {
              setShowTimePicker(false);
              if (time) setScheduledTime(time);
            }}
          />
        )}

        {/* Item Description */}
        <Text className="text-navy text-lg font-bold mb-4">What's being hauled?</Text>

        <View className="mb-6">
          <TextInput
            className="border border-border-gray rounded-lg px-4 py-3 text-base h-24"
            placeholder="Couch, mattress, 5 boxes, etc..."
            value={itemDescription}
            onChangeText={setItemDescription}
            multiline
            textAlignVertical="top"
          />
          <Text className="text-gray-400 text-xs mt-1">
            Photos help us send the right truck
          </Text>
        </View>

        {/* Spacer for button */}
        <View className="h-20" />
      </ScrollView>

      {/* Continue Button */}
      <View className="px-6 py-4 border-t border-border-gray">
        <TouchableOpacity
          className="bg-copper py-4 rounded-lg items-center"
          onPress={handleContinue}
        >
          <Text className="text-white text-base font-semibold">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
