import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

export default function SignUpScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'driver'>('customer');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  async function handleSignUp() {
    if (!fullName || !email || !password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password, fullName, role);
      Alert.alert(
        'Success',
        'Account created! Please check your email to verify.',
        [{ text: 'OK', onPress: () => router.replace('/(auth)/sign-in') }]
      );
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView className="flex-1" contentContainerClassName="px-6 py-12">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-navy text-3xl font-bold">Create Account</Text>
          <Text className="text-charcoal text-base mt-2">
            Join Hauly to get things hauled or become a Hauler
          </Text>
        </View>

        {/* Role Selection */}
        <View className="mb-6">
          <Text className="text-charcoal text-sm font-medium mb-3">
            I want to...
          </Text>
          <View className="flex-row space-x-3">
            <TouchableOpacity
              className={`flex-1 py-4 rounded-lg border-2 items-center ${
                role === 'customer'
                  ? 'border-copper bg-orange-50'
                  : 'border-border-gray'
              }`}
              onPress={() => setRole('customer')}
            >
              <Text className="text-2xl mb-1">📦</Text>
              <Text
                className={`font-semibold ${
                  role === 'customer' ? 'text-copper' : 'text-charcoal'
                }`}
              >
                Get Hauling
              </Text>
              <Text className="text-xs text-gray-500">I need items moved</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 py-4 rounded-lg border-2 items-center ${
                role === 'driver'
                  ? 'border-copper bg-orange-50'
                  : 'border-border-gray'
              }`}
              onPress={() => setRole('driver')}
            >
              <Text className="text-2xl mb-1">🚚</Text>
              <Text
                className={`font-semibold ${
                  role === 'driver' ? 'text-copper' : 'text-charcoal'
                }`}
              >
                Become a Hauler
              </Text>
              <Text className="text-xs text-gray-500">I have a truck</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Driver Note */}
        {role === 'driver' && (
          <View className="bg-orange-50 border border-copper rounded-lg p-4 mb-6">
            <Text className="text-copper font-semibold mb-1">
              Driver Application
            </Text>
            <Text className="text-charcoal text-sm">
              After sign up, you'll need to complete additional verification
              including vehicle info, insurance, and background check.
            </Text>
          </View>
        )}

        {/* Full Name */}
        <View className="mb-4">
          <Text className="text-charcoal text-sm font-medium mb-2">
            Full Name *
          </Text>
          <TextInput
            className="border border-border-gray rounded-lg px-4 py-4 text-base"
            placeholder="John Smith"
            value={fullName}
            onChangeText={setFullName}
            autoComplete="name"
          />
        </View>

        {/* Email */}
        <View className="mb-4">
          <Text className="text-charcoal text-sm font-medium mb-2">Email *</Text>
          <TextInput
            className="border border-border-gray rounded-lg px-4 py-4 text-base"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />
        </View>

        {/* Phone */}
        <View className="mb-4">
          <Text className="text-charcoal text-sm font-medium mb-2">
            Phone Number
          </Text>
          <TextInput
            className="border border-border-gray rounded-lg px-4 py-4 text-base"
            placeholder="(702) 555-0123"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            autoComplete="tel"
          />
        </View>

        {/* Password */}
        <View className="mb-6">
          <Text className="text-charcoal text-sm font-medium mb-2">
            Password *
          </Text>
          <TextInput
            className="border border-border-gray rounded-lg px-4 py-4 text-base"
            placeholder="Minimum 8 characters"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="new-password"
          />
        </View>

        {/* Terms */}
        <Text className="text-gray-500 text-xs text-center mb-6">
          By signing up, you agree to our{' '}
          <Text className="text-copper">Terms of Service</Text> and{' '}
          <Text className="text-copper">Privacy Policy</Text>
        </Text>

        {/* Sign Up Button */}
        <TouchableOpacity
          className={`bg-copper rounded-lg py-4 items-center mb-4 ${
            isLoading ? 'opacity-70' : ''
          }`}
          onPress={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-white text-base font-semibold">
              Create Account
            </Text>
          )}
        </TouchableOpacity>

        {/* Sign In Link */}
        <View className="flex-row justify-center">
          <Text className="text-charcoal">Already have an account? </Text>
          <Link href="/(auth)/sign-in" asChild>
            <TouchableOpacity>
              <Text className="text-copper font-semibold">Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
