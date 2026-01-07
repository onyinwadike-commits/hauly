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
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

// Hauly brand colors
const COLORS = {
  navy: '#1E3A5F',
  copper: '#B87333',
  white: '#FFFFFF',
  charcoal: '#3D3D3D',
  lightGray: '#F8F8F8',
  borderGray: '#E5E5E5',
  mediumGray: '#6B7280',
  successGreen: '#16A34A',
};

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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Navy Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoRow}>
                <View style={styles.logoBox} />
                <View style={styles.logoBox} />
              </View>
              <Text style={styles.logoText}>HAULY</Text>
              <Text style={styles.tagline}>Consider it handled.</Text>
            </View>
          </View>

          {/* White Form Card */}
          <View style={styles.formCard}>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.subtitleText}>Sign in to continue</Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.textInput}
                placeholder="you@example.com"
                placeholderTextColor={COLORS.mediumGray}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.mediumGray}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
              />
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              style={[styles.signInButton, isLoading && styles.buttonDisabled]}
              onPress={handleSignIn}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={styles.signInButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            {/* Phone Sign In Option */}
            <TouchableOpacity
              style={styles.phoneSignInButton}
              onPress={() => router.push('/(auth)/verify-otp')}
              activeOpacity={0.8}
            >
              <Text style={styles.phoneSignInText}>Sign In with Phone</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <Link href="/(auth)/sign-up" asChild>
                <TouchableOpacity>
                  <Text style={styles.signUpLink}>Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>

            {/* Trust Badges */}
            <View style={styles.trustBadgesContainer}>
              <View style={styles.trustBadge}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.badgeText}>Insured</Text>
              </View>
              <View style={styles.trustBadge}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.badgeText}>Background Checked</Text>
              </View>
              <View style={styles.trustBadge}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.badgeText}>Photo Proof</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.navy,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: COLORS.navy,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  logoBox: {
    width: 48,
    height: 40,
    backgroundColor: COLORS.copper,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 4,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.9,
    marginTop: 8,
  },
  formCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    marginTop: -20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.charcoal,
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: COLORS.mediumGray,
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.charcoal,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: COLORS.charcoal,
  },
  signInButton: {
    backgroundColor: COLORS.copper,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    shadowColor: COLORS.copper,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  signInButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  phoneSignInButton: {
    borderWidth: 2,
    borderColor: COLORS.navy,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  phoneSignInText: {
    color: COLORS.navy,
    fontSize: 16,
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  signUpText: {
    fontSize: 14,
    color: COLORS.mediumGray,
  },
  signUpLink: {
    fontSize: 14,
    color: COLORS.copper,
    fontWeight: '600',
  },
  trustBadgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderGray,
  },
  trustBadge: {
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 20,
    color: COLORS.successGreen,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 12,
    color: COLORS.mediumGray,
    textAlign: 'center',
  },
});
