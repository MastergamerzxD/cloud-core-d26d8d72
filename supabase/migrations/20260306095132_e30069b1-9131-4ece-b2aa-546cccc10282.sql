INSERT INTO public.site_settings (key, value)
VALUES ('security_password', '0703')
ON CONFLICT (key) DO NOTHING;