import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

export default function DriverProfileScreen() {
  const { user, profile, signOut } = useAuth();
  const router = useRouter();
  const [driverProfile, setDriverProfile] = useState<any>(null);

  useEffect(() => {
    fetchDriverProfile();
  }, []);

  async function fetchDriverProfile() {
    const { data } = await supabase
      .from('driver_profiles')
      .select('*')
      .eq('user_id', user?.id)
      .single();
    setDriverProfile(data);
  }

  async function handleSignOut() {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await signOut();
        },
      },
    ]);
  }

  const initials = profile?.full_name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || '?';

  const tierColors = {
    bronze: 'bg-orange-200 text-orange-800',
    silver: 'bg-gray-200 text-gray-800',
    gold: 'bg-yellow-200 text-yellow-800',
    platinum: 'bg-purple-200 text-purple-800',
  };

  return (
    <SafeAreaView className="flex-1 bg-light-gray">
      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="bg-white px-6 py-8 items-center border-b border-border-gray">
          <View className="w-24 h-24 bg-navy rounded-full items-center justify-center mb-4">
            <Text className="text-white text-3xl font-bold">{initials}</Text>
          </View>
          <Text className="text-navy text-xl font-bold">
            {profile?.full_name || 'Driver'}
          </Text>

          {/* Rating & Tier */}
          <View className="flex-row items-center mt-2">
            <Text className="text-yellow-500 mr-1">⭐</Text>
            <Text className="text-charcoal font-semibold">
              {driverProfile?.rating || '5.0'}
            </Text>
            <Text className="text-gray-400 mx-2">•</Text>
            <Text className="text-gray-500">
              {driverProfile?.total_jobs || 0} jobs
            </Text>
          </View>

          {/* Tier Badge */}
          {driverProfile?.tier && (
            <View
              className={`mt-3 px-4 py-1 rounded-full ${
                tierColors[driverProfile.tier as keyof typeof tierColors]
              }`}
            >
              <Text className="font-semibold capitalize">
                {driverProfile.tier} Hauler
              </Text>
            </View>
          )}
        </View>

        {/* Vehicle Info */}
        {driverProfile && (
          <View className="bg-white mt-4 px-6 py-4">
            <Text className="text-navy font-bold mb-3">Vehicle</Text>
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">🚚</Text>
              <View>
                <Text className="text-charcoal font-semibold">
                  {driverProfile.vehicle_year} {driverProfile.vehicle_make}{' '}
                  {driverProfile.vehicle_model}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {driverProfile.vehicle_color} • {driverProfile.license_plate}
                </Text>
              </View>
            </View>
            <TouchableOpacity className="mt-3">
              <Text className="text-copper font-medium">Update Vehicle →</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Documents */}
        <View className="bg-white mt-4 px-6 py-4">
          <Text className="text-navy font-bold mb-3">Documents</Text>
          {[
            {
              label: "Driver's License",
              status: 'Verified',
              icon: '✅',
            },
            {
              label: 'Insurance',
              status: 'Verified',
              icon: '✅',
            },
            {
              label: 'Background Check',
              status: 'Passed',
              icon: '✅',
            },
          ].map((doc, i) => (
            <View
              key={i}
              className="flex-row justify-between items-center py-3 border-b border-border-gray last:border-0"
            >
              <Text className="text-charcoal">{doc.label}</Text>
              <View className="flex-row items-center">
                <Text className="mr-1">{doc.icon}</Text>
                <Text className="text-gray-500 text-sm">{doc.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Account */}
        <View className="bg-white mt-4">
          {[
            { icon: '💳', label: 'Bank Account & Payouts' },
            { icon: '🔔', label: 'Notification Settings' },
            { icon: '❓', label: 'Help Center' },
            { icon: '📧', label: 'Contact Support' },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              className="flex-row items-center px-6 py-4 border-b border-border-gray"
            >
              <Text className="text-xl mr-4">{item.icon}</Text>
              <Text className="text-charcoal flex-1">{item.label}</Text>
              <Text className="text-gray-400">›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Legal */}
        <View className="bg-white mt-4">
          <TouchableOpacity className="px-6 py-4 border-b border-border-gray">
            <Text className="text-charcoal">Driver Agreement</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-6 py-4 border-b border-border-gray">
            <Text className="text-charcoal">Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-6 py-4">
            <Text className="text-charcoal">Privacy Policy</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Out */}
        <TouchableOpacity
          className="mx-6 mt-6 mb-12 border border-error-red rounded-lg py-4 items-center"
          onPress={handleSignOut}
        >
          <Text className="text-error-red font-semibold">Sign Out</Text>
        </TouchableOpacity>

        {/* Version */}
        <Text className="text-center text-gray-400 text-sm mb-8">
          Hauly Driver v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
