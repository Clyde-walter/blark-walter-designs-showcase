
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS hero_image text DEFAULT '',
  ADD COLUMN IF NOT EXISTS gallery_images text[] NOT NULL DEFAULT '{}';

ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS hero_image text DEFAULT '',
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'published' CHECK (status IN ('draft','published'));

-- Keep status in sync when admins toggle is_published (and vice-versa)
UPDATE public.blog_posts SET status = CASE WHEN is_published THEN 'published' ELSE 'draft' END;

CREATE OR REPLACE FUNCTION public.sync_blog_status()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    NEW.is_published := (NEW.status = 'published');
  ELSIF NEW.is_published IS DISTINCT FROM OLD.is_published THEN
    NEW.status := CASE WHEN NEW.is_published THEN 'published' ELSE 'draft' END;
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS blog_posts_sync_status ON public.blog_posts;
CREATE TRIGGER blog_posts_sync_status BEFORE INSERT OR UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.sync_blog_status();
