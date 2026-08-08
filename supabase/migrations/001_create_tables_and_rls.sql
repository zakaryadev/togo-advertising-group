-- Migration: 001_create_tables_and_rls.sql
-- Description: Creates leads, materials, and services tables with security RLS policies.

-- 1. LEADS TABLE (Form submissions)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors to submit contact forms
CREATE POLICY "Allow public form submissions"
    ON public.leads
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Allow authenticated users (admins) to view leads
CREATE POLICY "Allow authenticated admin read access"
    ON public.leads
    FOR SELECT
    TO authenticated
    USING (true);

-- Index for ordering leads by newest first
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);


-- 2. MATERIALS TABLE (Calculator materials and pricing)
CREATE TABLE IF NOT EXISTS public.materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    name_uz TEXT NOT NULL,
    name_ru TEXT NOT NULL,
    name_en TEXT NOT NULL,
    price_per_sqm NUMERIC NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active material prices
CREATE POLICY "Allow public read access to materials"
    ON public.materials
    FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

-- Seed initial material pricing data
INSERT INTO public.materials (key, name_uz, name_ru, name_en, price_per_sqm) VALUES
    ('m1', 'Vinil banner (Standart 440g)', 'Виниловый баннер (Стандарт 440г)', 'Vinyl Banner (Standard 440g)', 45000),
    ('m2', 'Vinil banner (Laminatsiyalangan 510g)', 'Виниловый баннер (Ламинированный 510г)', 'Vinyl Banner (Laminated 510g)', 55000),
    ('m3', 'Samokleyka plyonka (Orajet/Rita)', 'Самоклеящаяся пленка (Orajet/Rita)', 'Self-adhesive Film (Orajet/Rita)', 65000),
    ('m4', 'Setka banner (Mesh)', 'Сетка баннер (Mesh)', 'Mesh Banner', 70000),
    ('m5', 'Backlit plyonka (Lightbox uchun)', 'Пленка Backlit (Для лайтбоксов)', 'Backlit Film (For Lightboxes)', 95000)
ON CONFLICT (key) DO NOTHING;


-- 3. SERVICES TABLE (Services catalog)
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title_uz TEXT NOT NULL,
    title_ru TEXT NOT NULL,
    title_en TEXT NOT NULL,
    description_uz TEXT NOT NULL,
    description_ru TEXT NOT NULL,
    description_en TEXT NOT NULL,
    from_price TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to services"
    ON public.services
    FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

CREATE INDEX IF NOT EXISTS idx_services_sort_order ON public.services (sort_order ASC);
