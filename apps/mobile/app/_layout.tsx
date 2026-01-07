import '../global.css';

import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Sentry from '@sentry/react-native';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Initialize Sentry
Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  environment: __DEV__ ? 'development' : 'production',
  tracesSampleRate: 0.1,
  enableAutoSessionTracking: true,
  attachScreenshot: true,
  enabled: !__DEV__, // Only enable in production
});

function RootLayoutNav() {
  const { session, profile, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      // Redirect to sign-in if not authenticated
      router.replace('/(auth)/sign-in');
    } else if (session && inAuthGroup) {
      // Redirect based on role
      if (profile?.role === 'driver') {
        router.replace('/(driver)/');
      } else {
        router.replace('/(customer)/');
      }
    }
  }, [session, profile, isLoading, segments]);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(customer)" />
        <Stack.Screen name="(driver)" />
      </Stack>
    </>
  );
}

function RootLayout() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default Sentry.wrap(RootLayout);
