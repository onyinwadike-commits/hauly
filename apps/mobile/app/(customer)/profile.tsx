import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';

export default function CustomerProfileScreen() {
  const { user, profile, signOut } = useAuth();
  const router = useRouter();

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

  return (
    <SafeAreaView className="flex-1 bg-light-gray">
      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="bg-white px-6 py-8 items-center border-b border-border-gray">
          <View className="w-20 h-20 bg-navy rounded-full items-center justify-center mb-4">
            <Text className="text-white text-2xl font-bold">{initials}</Text>
          </View>
          <Text className="text-navy text-xl font-bold">
            {profile?.full_name || 'User'}
          </Text>
          <Text className="text-gray-500">{user?.email}</Text>
        </View>

        {/* Menu Items */}
        <View className="bg-white mt-4">
          {[
            { icon: '👤', label: 'Edit Profile', action: () => {} },
            { icon: '📍', label: 'Saved Addresses', action: () => {} },
            { icon: '💳', label: 'Payment Methods', action: () => {} },
            { icon: '🔔', label: 'Notifications', action: () => {} },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              className="flex-row items-center px-6 py-4 border-b border-border-gray"
              onPress={item.action}
            >
              <Text className="text-xl mr-4">{item.icon}</Text>
              <Text className="text-charcoal flex-1">{item.label}</Text>
              <Text className="text-gray-400">›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Support */}
        <View className="bg-white mt-4">
          {[
            { icon: '❓', label: 'Help Center', action: () => {} },
            { icon: '📧', label: 'Contact Support', action: () => {} },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              className="flex-row items-center px-6 py-4 border-b border-border-gray"
              onPress={item.action}
            >
              <Text className="text-xl mr-4">{item.icon}</Text>
              <Text className="text-charcoal flex-1">{item.label}</Text>
              <Text className="text-gray-400">›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Legal */}
        <View className="bg-white mt-4">
          {[
            { label: 'Terms of Service' },
            { label: 'Privacy Policy' },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              className="flex-row items-center px-6 py-4 border-b border-border-gray"
            >
              <Text className="text-charcoal flex-1">{item.label}</Text>
              <Text className="text-gray-400">›</Text>
            </TouchableOpacity>
          ))}
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
          Hauly v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
