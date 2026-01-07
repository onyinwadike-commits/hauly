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
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

// Hauly Logo Component
function HaulyLogo() {
  return (
    <View className="items-center mb-8">
      <View className="flex-row">
        {/* Simplified logo representation */}
        <View className="w-12 h-10 bg-copper rounded-lg mr-1" />
        <View className="w-12 h-10 bg-copper rounded-lg" />
      </View>
      <Text className="text-navy text-3xl font-bold mt-4">HAULY</Text>
      <Text className="text-charcoal text-base mt-1">Consider it handled.</Text>
    </View>
  );
}

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  async function handleSignIn() {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
      // Navigation is handled by the auth state listener in _layout
    } catch (error: any) {
      Alert.alert('Sign In Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <View className="flex-1 justify-center px-6">
        <HaulyLogo />

        {/* Email Input */}
        <View className="mb-4">
          <Text className="text-charcoal text-sm font-medium mb-2">Email</Text>
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

        {/* Password Input */}
        <View className="mb-6">
          <Text className="text-charcoal text-sm font-medium mb-2">Password</Text>
          <TextInput
            className="border border-border-gray rounded-lg px-4 py-4 text-base"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
          />
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          className={`bg-copper rounded-lg py-4 items-center mb-4 ${
            isLoading ? 'opacity-70' : ''
          }`}
          onPress={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-white text-base font-semibold">Sign In</Text>
          )}
        </TouchableOpacity>

        {/* Phone Sign In Option */}
        <TouchableOpacity
          className="border-2 border-navy rounded-lg py-4 items-center mb-6"
          onPress={() => router.push('/(auth)/verify-otp')}
        >
          <Text className="text-navy text-base font-semibold">
            Sign In with Phone
          </Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View className="flex-row justify-center">
          <Text className="text-charcoal">Don't have an account? </Text>
          <Link href="/(auth)/sign-up" asChild>
            <TouchableOpacity>
              <Text className="text-copper font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Trust Badges */}
        <View className="flex-row justify-center mt-8 space-x-4">
          <View className="items-center px-3">
            <Text className="text-success-green text-lg">✓</Text>
            <Text className="text-xs text-gray-500">Insured</Text>
          </View>
          <View className="items-center px-3">
            <Text className="text-success-green text-lg">✓</Text>
            <Text className="text-xs text-gray-500">Background Checked</Text>
          </View>
          <View className="items-center px-3">
            <Text className="text-success-green text-lg">✓</Text>
            <Text className="text-xs text-gray-500">Photo Proof</Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
