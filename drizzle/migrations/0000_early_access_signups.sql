CREATE TABLE public.early_access_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  email text NOT NULL,
  age_range text NOT NULL,
  country text NOT NULL,
  interest text NOT NULL CHECK (interest IN ('stationery','pen_pal','both')),
  stationery_products text[] NOT NULL DEFAULT '{}',
  pen_pal_motivation text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.early_access_signups TO service_role;
ALTER TABLE public.early_access_signups ENABLE ROW LEVEL SECURITY;