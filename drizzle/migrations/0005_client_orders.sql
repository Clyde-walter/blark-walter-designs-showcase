CREATE TABLE public.client_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE DEFAULT ('BW-' || upper(substr(md5(random()::text), 1, 8))),
  client_name text NOT NULL DEFAULT '',
  client_email text NOT NULL,
  item_type text NOT NULL DEFAULT 'project',
  item_title text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'received',
  notes text NOT NULL DEFAULT '',
  delivery_url text NOT NULL DEFAULT '',
  payment_reference text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.client_orders TO authenticated;
GRANT ALL ON public.client_orders TO service_role;
ALTER TABLE public.client_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage orders" ON public.client_orders FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER client_orders_updated BEFORE UPDATE ON public.client_orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();