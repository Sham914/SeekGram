-- Add missing duration and fees columns to keam_rank_data
ALTER TABLE public.keam_rank_data
  ADD COLUMN IF NOT EXISTS fees integer,
  ADD COLUMN IF NOT EXISTS duration text;

-- Restore write access for authenticated users.
-- The "Admins can manage KEAM rank data" policy was dropped in fix_admin_rls.sql
-- and never replaced, leaving no INSERT/UPDATE/DELETE policy (admin guard is app-layer).
DROP POLICY IF EXISTS "Authenticated users can manage KEAM rank data" ON public.keam_rank_data;

CREATE POLICY "Authenticated users can manage KEAM rank data"
  ON public.keam_rank_data
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
