-- Migration: 005_fix_admin_rls_policies.sql
-- Description: Fixes two critical RLS gaps found in the admin panel audit:
--   1. `services` write policies (from 003) granted INSERT/UPDATE/DELETE to the
--      `anon` role, so anyone with the public anon key could bypass /admin auth
--      entirely and write to the table directly via the Supabase REST API.
--   2. `materials` had no write policy at all, so authenticated admin price
--      updates were silently discarded by RLS (0 rows affected, no error).
-- Also adds "admin can see inactive rows" SELECT policies for services and
-- materials, matching the pattern already used for portfolio/site_settings,
-- so toggling an item inactive doesn't make it disappear from the admin panel.

-- 1. SERVICES: replace public write policies with authenticated-only ones
DROP POLICY IF EXISTS "Allow public insert to services" ON public.services;
DROP POLICY IF EXISTS "Allow public update to services" ON public.services;
DROP POLICY IF EXISTS "Allow public delete to services" ON public.services;

CREATE POLICY "Allow authenticated admin insert to services"
    ON public.services
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated admin update to services"
    ON public.services
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated admin delete to services"
    ON public.services
    FOR DELETE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated admin full read access to services"
    ON public.services
    FOR SELECT
    TO authenticated
    USING (true);


-- 2. MATERIALS: add missing write policies + admin full read access
CREATE POLICY "Allow authenticated admin insert to materials"
    ON public.materials
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated admin update to materials"
    ON public.materials
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated admin delete to materials"
    ON public.materials
    FOR DELETE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated admin full read access to materials"
    ON public.materials
    FOR SELECT
    TO authenticated
    USING (true);
