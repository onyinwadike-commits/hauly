import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { supabase } from '../../../lib/supabase';

export default function PhotoCaptureScreen() {
  const { orderId, type } = useLocalSearchParams<{
    orderId: string;
    type: 'before' | 'after';
  }>();
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const [photos, setPhotos] = useState<string[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const isBefore = type === 'before';
  const minPhotos = 2;

  React.useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
    })();
  }, []);

  async function capturePhoto() {
    if (!cameraRef.current) return;

    setIsCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });

      setPhotos([...photos, photo.uri]);
    } catch (error) {
      console.error('Error capturing photo:', error);
    } finally {
      setIsCapturing(false);
    }
  }

  async function uploadPhotos() {
    if (photos.length < minPhotos) {
      Alert.alert('More Photos Needed', `Please take at least ${minPhotos} photos`);
      return;
    }

    setIsUploading(true);
    try {
      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Upload each photo
      for (const photoUri of photos) {
        const fileName = `${orderId}/${type}/${Date.now()}.jpg`;

        // Fetch the photo as blob
        const response = await fetch(photoUri);
        const blob = await response.blob();

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('order-photos')
          .upload(fileName, blob, {
            contentType: 'image/jpeg',
          });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('order-photos')
          .getPublicUrl(fileName);

        // Create database record
        await supabase.from('order_photos').insert({
          order_id: orderId,
          photo_type: type,
          storage_path: fileName,
          public_url: urlData.publicUrl,
          location: `POINT(${longitude} ${latitude})`,
          captured_at: new Date().toISOString(),
        });
      }

      // Update order status if after photos
      if (type === 'after') {
        await supabase
          .from('orders')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
          })
          .eq('id', orderId);

        router.replace({
          pathname: '/(driver)/job/complete',
          params: { orderId },
        });
      } else {
        // Before photos done, go back to active job
        Alert.alert('Photos Uploaded', 'Before photos saved. Continue with the job.', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      }
    } catch (error: any) {
      Alert.alert('Upload Error', error.message);
    } finally {
      setIsUploading(false);
    }
  }

  if (!permission) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator color="#FFFFFF" />
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <Text className="text-xl mb-4">📷</Text>
        <Text className="text-navy font-bold text-lg mb-2">
          Camera Access Required
        </Text>
        <Text className="text-gray-500 text-center mb-4">
          Please enable camera access to take job photos.
        </Text>
        <TouchableOpacity
          className="bg-copper px-6 py-3 rounded-lg"
          onPress={requestPermission}
        >
          <Text className="text-white font-semibold">Grant Permission</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-white text-lg">← Back</Text>
        </TouchableOpacity>
        <Text className="text-white font-bold">
          {isBefore ? 'Before' : 'After'} Photos
        </Text>
        <View className="w-12" />
      </View>

      {/* Instructions */}
      <View className="px-6 py-2">
        <Text className="text-white text-center">
          {isBefore
            ? 'Take photos of items to be hauled'
            : 'Document completed job - show empty space'}
        </Text>
      </View>

      {/* Camera View */}
      <View className="flex-1 mx-4 my-2 rounded-xl overflow-hidden">
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing="back"
        >
          {/* Frame guides */}
          <View className="flex-1 border-2 border-dashed border-white/50 m-4 rounded-lg" />
        </CameraView>
      </View>

      {/* Photo Thumbnails */}
      <View className="px-6 py-4">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-white">
            Photos taken: {photos.length}/{minPhotos} minimum
          </Text>
          <View className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
            <View
              className="h-full bg-copper"
              style={{ width: `${Math.min(100, (photos.length / minPhotos) * 100)}%` }}
            />
          </View>
        </View>
        <View className="flex-row space-x-2">
          {photos.map((uri, i) => (
            <View key={i} className="relative">
              <Image
                source={{ uri }}
                className="w-16 h-16 rounded-lg"
              />
              <TouchableOpacity
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center"
                onPress={() => setPhotos(photos.filter((_, idx) => idx !== i))}
              >
                <Text className="text-white text-xs">×</Text>
              </TouchableOpacity>
            </View>
          ))}
          {[...Array(Math.max(0, 3 - photos.length))].map((_, i) => (
            <View
              key={`empty-${i}`}
              className="w-16 h-16 border-2 border-dashed border-gray-600 rounded-lg"
            />
          ))}
        </View>
      </View>

      {/* Capture Button */}
      <View className="px-6 py-4">
        <TouchableOpacity
          className={`py-4 rounded-lg items-center flex-row justify-center ${
            isCapturing ? 'bg-gray-600' : 'bg-copper'
          }`}
          onPress={capturePhoto}
          disabled={isCapturing}
        >
          {isCapturing ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text className="text-white mr-2">📸</Text>
              <Text className="text-white font-semibold">Capture Photo</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <View className="px-6 pb-4">
        <TouchableOpacity
          className={`py-4 rounded-lg items-center ${
            photos.length >= minPhotos && !isUploading
              ? 'bg-success-green'
              : 'bg-gray-600'
          }`}
          onPress={uploadPhotos}
          disabled={photos.length < minPhotos || isUploading}
        >
          {isUploading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-white font-semibold">
              {photos.length >= minPhotos
                ? type === 'after'
                  ? 'Complete Job'
                  : 'Continue'
                : `Take ${minPhotos - photos.length} more photo(s)`}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
