
-- Blocked countries table
CREATE TABLE public.blocked_countries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  country_code TEXT NOT NULL UNIQUE,
  country_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blocked_countries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage blocked countries" ON public.blocked_countries
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can read blocked countries" ON public.blocked_countries
  FOR SELECT TO anon
  USING (true);

CREATE INDEX idx_blocked_countries_code ON public.blocked_countries(country_code);
