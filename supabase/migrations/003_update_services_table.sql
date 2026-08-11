-- Migration: 003_update_services_table.sql
-- Description: Adds image, category, excerpt columns to services table.
-- NOTE: The insecure anon write policies originally in this file have been
-- removed. Correct authenticated-only policies are in 005_fix_admin_rls_policies.sql

ALTER TABLE public.services ADD COLUMN IF NOT EXISTS image TEXT NOT NULL DEFAULT '';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT '';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS excerpt TEXT NOT NULL DEFAULT '';
