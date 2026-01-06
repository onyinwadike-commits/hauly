import { supabase } from '../client';
import type { OrderPhoto, PhotoType } from '@hauly/types';

export async function uploadOrderPhoto(
  orderId: string,
  photoType: PhotoType,
  file: File | Blob,
  location?: { latitude: number; longitude: number }
): Promise<OrderPhoto> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Generate unique filename
  const timestamp = Date.now();
  const ext = file instanceof File ? file.name.split('.').pop() : 'jpg';
  const storagePath = `${orderId}/${photoType}/${timestamp}.${ext}`;

  // Upload to storage
  const { error: uploadError } = await supabase.storage
    .from('order-photos')
    .upload(storagePath, file, {
      contentType: file.type || 'image/jpeg',
      upsert: false
    });

  if (uploadError) throw uploadError;

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('order-photos')
    .getPublicUrl(storagePath);

  // Create database record
  const { data, error } = await supabase
    .from('order_photos')
    .insert({
      order_id: orderId,
      photo_type: photoType,
      storage_path: storagePath,
      public_url: urlData.publicUrl,
      location: location ? `POINT(${location.longitude} ${location.latitude})` : null,
      captured_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return data as OrderPhoto;
}

export async function getOrderPhotos(orderId: string): Promise<OrderPhoto[]> {
  const { data, error } = await supabase
    .from('order_photos')
    .select('*')
    .eq('order_id', orderId)
    .order('captured_at', { ascending: true });

  if (error) throw error;
  return data as OrderPhoto[];
}

export async function getPhotosByType(
  orderId: string,
  photoType: PhotoType
): Promise<OrderPhoto[]> {
  const { data, error } = await supabase
    .from('order_photos')
    .select('*')
    .eq('order_id', orderId)
    .eq('photo_type', photoType)
    .order('captured_at', { ascending: true });

  if (error) throw error;
  return data as OrderPhoto[];
}

export async function deletePhoto(photoId: string): Promise<void> {
  // Get photo record first
  const { data: photo, error: fetchError } = await supabase
    .from('order_photos')
    .select('storage_path')
    .eq('id', photoId)
    .single();

  if (fetchError) throw fetchError;

  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from('order-photos')
    .remove([photo.storage_path]);

  if (storageError) throw storageError;

  // Delete database record
  const { error } = await supabase
    .from('order_photos')
    .delete()
    .eq('id', photoId);

  if (error) throw error;
}
