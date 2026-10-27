ALTER TABLE public.templates ADD COLUMN IF NOT EXISTS zip_path text;
CREATE POLICY "Admins manage template files" ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'template-files' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'template-files' AND public.has_role(auth.uid(), 'admin'));