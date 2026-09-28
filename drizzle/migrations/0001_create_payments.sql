CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE,
  customer_name text NOT NULL DEFAULT '',
  customer_email text NOT NULL,
  plan_slug text NOT NULL DEFAULT '',
  plan_name text NOT NULL DEFAULT '',
  amount numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'NGN',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.payments TO authenticated;
GRANT INSERT ON public.payments TO anon;
GRANT ALL ON public.payments TO service_role;

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can record a payment" ON public.payments
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(reference) BETWEEN 1 AND 200
    AND char_length(customer_email) BETWEEN 3 AND 254
    AND customer_email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(customer_name) <= 120
    AND amount >= 0
  );

CREATE POLICY "admins read payments" ON public.payments
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX payments_created_at_idx ON public.payments (created_at DESC);
