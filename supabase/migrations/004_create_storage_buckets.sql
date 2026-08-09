-- Migration: 004_create_storage_buckets.sql
-- Description: Creates storage buckets for service-images and portfolio-images with public access policies.

INSERT INTO storage.buckets (id, name, public)
VALUES ('service-images', 'service-images', true),
       ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for service-images bucket
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Public Select service-images'
    ) THEN
        CREATE POLICY "Public Select service-images"
        ON storage.objects FOR SELECT
        TO anon, authenticated
        USING (bucket_id = 'service-images');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Public Insert service-images'
    ) THEN
        CREATE POLICY "Public Insert service-images"
        ON storage.objects FOR INSERT
        TO anon, authenticated
        WITH CHECK (bucket_id = 'service-images');
    END IF;
END $$;
