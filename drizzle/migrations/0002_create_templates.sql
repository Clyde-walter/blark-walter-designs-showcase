CREATE TABLE public.templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  tagline text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Website',
  price_usd numeric NOT NULL DEFAULT 0,
  tech_stack text[] NOT NULL DEFAULT '{}',
  features text[] NOT NULL DEFAULT '{}',
  hero_image text DEFAULT '',
  gallery_images text[] NOT NULL DEFAULT '{}',
  live_demo_url text DEFAULT '',
  badge text DEFAULT '',
  sort integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.templates TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.templates TO authenticated;
GRANT ALL ON public.templates TO service_role;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published templates" ON public.templates FOR SELECT USING (is_published);
CREATE POLICY "admins manage templates" ON public.templates FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER templates_updated BEFORE UPDATE ON public.templates FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();