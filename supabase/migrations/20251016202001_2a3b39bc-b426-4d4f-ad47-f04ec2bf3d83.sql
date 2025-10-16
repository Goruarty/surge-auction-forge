-- Storage policies for auction-images bucket
CREATE POLICY "Public can view auction images"
ON storage.objects FOR SELECT
USING (bucket_id = 'auction-images');

CREATE POLICY "Authenticated users can upload auction images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'auction-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own auction images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'auction-images' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own auction images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'auction-images' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);