-- Migration: Storage Buckets Setup
-- Creates storage buckets for photos and documents

-- Create buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('order-photos', 'order-photos', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic']),
  ('driver-documents', 'driver-documents', false, 20971520, ARRAY['image/jpeg', 'image/png', 'application/pdf']),
  ('profile-avatars', 'profile-avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- ORDER PHOTOS POLICIES
-- ==========================================

-- Anyone can view order photos (they're public)
CREATE POLICY "Order photos are publicly viewable"
ON storage.objects FOR SELECT
USING (bucket_id = 'order-photos');

-- Authenticated users can upload order photos
CREATE POLICY "Authenticated users can upload order photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'order-photos'
  AND auth.role() = 'authenticated'
);

-- Users can update their own order photos
CREATE POLICY "Users can update their own order photos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'order-photos'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can delete their own order photos
CREATE POLICY "Users can delete their own order photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'order-photos'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- ==========================================
-- DRIVER DOCUMENTS POLICIES (Private)
-- ==========================================

-- Drivers can view their own documents
CREATE POLICY "Drivers can view their own documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'driver-documents'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Drivers can upload their own documents
CREATE POLICY "Drivers can upload their own documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'driver-documents'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Admins can view all driver documents
CREATE POLICY "Admins can view all driver documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'driver-documents'
  AND EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- ==========================================
-- PROFILE AVATARS POLICIES
-- ==========================================

-- Anyone can view profile avatars (they're public)
CREATE POLICY "Profile avatars are publicly viewable"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-avatars');

-- Users can upload their own avatar
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'profile-avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can update their own avatar
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'profile-avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can delete their own avatar
CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'profile-avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
