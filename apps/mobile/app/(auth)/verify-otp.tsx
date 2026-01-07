import React, { useState, useRef } from 'react';
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
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

export default function VerifyOTPScreen() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { signInWithOTP, verifyOTP } = useAuth();
  const router = useRouter();
  const inputRefs = useRef<TextInput[]>([]);

  async function handleSendCode() {
    if (phone.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    try {
      // Format phone number
      const formattedPhone = '+1' + phone.replace(/\D/g, '');
      await signInWithOTP(formattedPhone);
      setStep('code');
      startCountdown();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerifyCode() {
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      Alert.alert('Error', 'Please enter the 6-digit code');
      return;
    }

    setIsLoading(true);
    try {
      const formattedPhone = '+1' + phone.replace(/\D/g, '');
      await verifyOTP(formattedPhone, fullCode);
      // Navigation handled by auth state listener
    } catch (error: any) {
      Alert.alert('Verification Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function startCountdown() {
    setCountdown(60);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function handleCodeChange(text: string, index: number) {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyPress(key: string, index: number) {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <View className="flex-1 justify-center px-6">
        {/* Back Button */}
        <TouchableOpacity
          className="absolute top-12 left-6"
          onPress={() => {
            if (step === 'code') {
              setStep('phone');
              setCode(['', '', '', '', '', '']);
            } else {
              router.back();
            }
          }}
        >
          <Text className="text-navy text-lg">← Back</Text>
        </TouchableOpacity>

        {step === 'phone' ? (
          <>
            {/* Phone Entry */}
            <Text className="text-navy text-2xl font-bold mb-2">
              Enter your phone number
            </Text>
            <Text className="text-charcoal mb-6">
              We'll send you a verification code
            </Text>

            <View className="flex-row items-center border border-border-gray rounded-lg px-4 py-4 mb-6">
              <Text className="text-charcoal text-base mr-2">+1</Text>
              <TextInput
                className="flex-1 text-base"
                placeholder="(702) 555-0123"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={14}
              />
            </View>

            <TouchableOpacity
              className={`bg-copper rounded-lg py-4 items-center ${
                isLoading ? 'opacity-70' : ''
              }`}
              onPress={handleSendCode}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-white text-base font-semibold">
                  Send Code
                </Text>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Code Entry */}
            <Text className="text-navy text-2xl font-bold mb-2">
              Enter verification code
            </Text>
            <Text className="text-charcoal mb-6">
              Sent to +1 {phone}
            </Text>

            {/* 6-digit code input */}
            <View className="flex-row justify-between mb-6">
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    if (ref) inputRefs.current[index] = ref;
                  }}
                  className="w-12 h-14 border-2 border-border-gray rounded-lg text-center text-2xl font-bold"
                  value={digit}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(nativeEvent.key, index)
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                />
              ))}
            </View>

            <TouchableOpacity
              className={`bg-copper rounded-lg py-4 items-center mb-4 ${
                isLoading ? 'opacity-70' : ''
              }`}
              onPress={handleVerifyCode}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-white text-base font-semibold">
                  Verify
                </Text>
              )}
            </TouchableOpacity>

            {/* Resend */}
            <TouchableOpacity
              disabled={countdown > 0}
              onPress={() => {
                handleSendCode();
              }}
            >
              <Text className="text-center text-charcoal">
                {countdown > 0 ? (
                  `Resend code in ${countdown}s`
                ) : (
                  <Text className="text-copper font-semibold">Resend code</Text>
                )}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
