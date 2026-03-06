
-- Allow admins to delete visitor sessions (for terminate session feature)
CREATE POLICY "Admins can delete visitor sessions" ON public.visitor_sessions
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete blocked IPs (for unblock feature)
CREATE POLICY "Admins can delete blocked IPs" ON public.blocked_ips
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete security logs
CREATE POLICY "Admins can delete security logs" ON public.security_logs
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
