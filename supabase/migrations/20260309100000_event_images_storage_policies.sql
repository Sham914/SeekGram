-- Storage policies for the event-images bucket
-- Public bucket: anyone can read, only authenticated users can write

-- Allow public (unauthenticated) reads so image URLs work in the app
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- SELECT: anyone can view
CREATE POLICY "event-images: public read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'event-images');

-- INSERT: authenticated users (admins) can upload
CREATE POLICY "event-images: authenticated upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'event-images');

-- UPDATE: authenticated users can replace files
CREATE POLICY "event-images: authenticated update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'event-images');

-- DELETE: authenticated users can remove files
CREATE POLICY "event-images: authenticated delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'event-images');
