-- Fix 406 errors by removing problematic RLS policies
-- The issue: Tables have policies that check admin_roles with EXISTS subqueries
-- This causes 406 (Not Acceptable) errors even when RLS is disabled on admin_roles

-- Drop all admin-checking policies that reference admin_roles
DROP POLICY IF EXISTS "Admins can read admin roles" ON public.admin_roles;
DROP POLICY IF EXISTS "Super admins can manage admin roles" ON public.admin_roles;

-- Drop admin-checking policies from keam_rank_data
DROP POLICY IF EXISTS "Admins can manage KEAM rank data" ON public.keam_rank_data;

-- Drop admin-checking policies from file_uploads
DROP POLICY IF EXISTS "Admins can manage file uploads" ON public.file_uploads;

-- Drop admin-checking policies from flagged_reviews
DROP POLICY IF EXISTS "Admins can read flagged reviews" ON public.flagged_reviews;
DROP POLICY IF EXISTS "Admins can manage flagged reviews" ON public.flagged_reviews;

-- Disable RLS on admin_roles to prevent any recursive checks
ALTER TABLE public.admin_roles DISABLE ROW LEVEL SECURITY;

-- Note: Admin operations will be restricted at the application layer instead of database layer
-- This prevents infinite policy lookups and 406 errors
