-- Migration: 003_update_services_table.sql
-- Description: Ensures services table has image, category columns and full admin RLS policies.

ALTER TABLE public.services ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS category TEXT;

-- RLS policies for services
CREATE POLICY "Allow public insert to services"
    ON public.services
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow public update to services"
    ON public.services
    FOR UPDATE
    TO anon, authenticated
    USING (true);

CREATE POLICY "Allow public delete to services"
    ON public.services
    FOR DELETE
    TO anon, authenticated
    USING (true);
