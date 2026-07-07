
DROP POLICY IF EXISTS "anyone submit contact" ON public.contact_submissions;
CREATE POLICY "anyone submit contact" ON public.contact_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 254
    AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(message) BETWEEN 1 AND 4000
  );

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.bootstrap_first_admin() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
