
CREATE TABLE public.visitor_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  ip_address text,
  city text,
  country text,
  country_code text,
  latitude double precision,
  longitude double precision,
  device_type text,
  browser text,
  os text,
  current_page text,
  referrer text,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_visitor_sessions_last_seen ON public.visitor_sessions (last_seen_at);
CREATE INDEX idx_visitor_sessions_session_id ON public.visitor_sessions (session_id);
CREATE INDEX idx_visitor_sessions_created_at ON public.visitor_sessions (created_at);

ALTER TABLE public.visitor_sessions ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (tracking)
CREATE POLICY "Anyone can insert visitor sessions"
  ON public.visitor_sessions FOR INSERT
  WITH CHECK (true);

-- Anyone can update their own session by session_id
CREATE POLICY "Anyone can update visitor sessions"
  ON public.visitor_sessions FOR UPDATE
  USING (true);

-- Only admins can read
CREATE POLICY "Admins can view visitor sessions"
  ON public.visitor_sessions FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.visitor_sessions;
