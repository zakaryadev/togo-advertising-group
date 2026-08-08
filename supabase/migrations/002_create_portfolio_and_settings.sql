-- Migration: 002_create_portfolio_and_settings.sql
-- Description: Creates portfolio and site_settings tables + portfolio-images storage bucket.

-- 1. PORTFOLIO TABLE
CREATE TABLE IF NOT EXISTS public.portfolio (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    service_type TEXT NOT NULL,
    image_url TEXT NOT NULL,
    dimensions TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

-- Public can view active portfolio items
CREATE POLICY "Allow public read access to active portfolio"
    ON public.portfolio
    FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

-- Authenticated admins can manage portfolio items
CREATE POLICY "Allow authenticated admin full portfolio access"
    ON public.portfolio
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_portfolio_sort ON public.portfolio (sort_order ASC, created_at DESC);


-- 2. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read settings
CREATE POLICY "Allow public read access to site_settings"
    ON public.site_settings
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Authenticated admins can manage settings
CREATE POLICY "Allow authenticated admin full site_settings access"
    ON public.site_settings
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Seed initial site settings
INSERT INTO public.site_settings (key, value) VALUES
    ('contact_phone', '+998 77 300 45 00'),
    ('contact_phone_href', 'tel:+998773004500'),
    ('contact_email', 'info@togogrouppro.uz'),
    ('contact_address', 'Toshkent, Chilonzor tumani'),
    ('contact_hours', 'Dushanba — Shanba, 09:00 — 18:00'),
    ('social_instagram', 'https://www.instagram.com/reklama_togo_group/'),
    ('social_telegram', 'https://t.me/togo_group_pro'),
    ('social_youtube', 'https://www.youtube.com/@togogrouppro')
ON CONFLICT (key) DO NOTHING;


-- 3. STORAGE BUCKET FOR PORTFOLIO IMAGES
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS policies for portfolio-images bucket
CREATE POLICY "Public Read Access for portfolio-images"
    ON storage.objects FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'portfolio-images');

CREATE POLICY "Admin Upload Access for portfolio-images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'portfolio-images');

CREATE POLICY "Admin Delete Access for portfolio-images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'portfolio-images');
