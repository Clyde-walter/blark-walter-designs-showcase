CREATE TABLE public.site_page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  visitor_id text NOT NULL,
  viewed_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.site_page_views TO anon, authenticated;
GRANT SELECT ON public.site_page_views TO authenticated;
GRANT ALL ON public.site_page_views TO service_role;
ALTER TABLE public.site_page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can record page views"
  ON public.site_page_views
  FOR INSERT TO anon, authenticated
  WITH CHECK (char_length(path) BETWEEN 1 AND 500 AND char_length(visitor_id) BETWEEN 1 AND 120);

CREATE POLICY "admins can read page views"
  ON public.site_page_views
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX site_page_views_viewed_at_idx ON public.site_page_views(viewed_at DESC);