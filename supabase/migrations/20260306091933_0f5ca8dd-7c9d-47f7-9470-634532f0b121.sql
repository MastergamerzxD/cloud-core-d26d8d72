
-- Blocked IPs table
CREATE TABLE public.blocked_ips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  reason TEXT,
  is_permanent BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.blocked_ips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage blocked IPs" ON public.blocked_ips
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can read blocked IPs" ON public.blocked_ips
  FOR SELECT TO anon
  USING (true);

-- Security logs table
CREATE TABLE public.security_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  ip_address TEXT,
  country TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  page TEXT,
  session_id TEXT,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view security logs" ON public.security_logs
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can insert security logs" ON public.security_logs
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Visitor logs (historical)
CREATE TABLE public.visitor_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  ip_address TEXT,
  country TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  pages_visited TEXT[] DEFAULT '{}',
  session_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  session_end TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.visitor_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view visitor logs" ON public.visitor_logs
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can insert visitor logs" ON public.visitor_logs
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update visitor logs" ON public.visitor_logs
  FOR UPDATE TO anon, authenticated
  USING (true);

-- Rate limit config in site_settings (will insert defaults via edge function)
-- Index for faster IP lookups
CREATE INDEX idx_blocked_ips_ip ON public.blocked_ips(ip_address);
CREATE INDEX idx_blocked_ips_expires ON public.blocked_ips(expires_at) WHERE expires_at IS NOT NULL;
CREATE INDEX idx_security_logs_created ON public.security_logs(created_at);
CREATE INDEX idx_visitor_logs_session ON public.visitor_logs(session_id);
