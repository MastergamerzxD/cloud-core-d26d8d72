
-- Gift Cards Table
CREATE TABLE public.gift_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  initial_balance NUMERIC NOT NULL,
  current_balance NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'redeemed', 'expired', 'disabled')),
  created_by UUID REFERENCES auth.users(id),
  redeemed_by UUID REFERENCES auth.users(id),
  redeemed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Coupons/Promo Codes Table
CREATE TABLE public.coupons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value NUMERIC NOT NULL,
  min_order_amount NUMERIC DEFAULT 0,
  max_discount_amount NUMERIC,
  usage_limit INTEGER,
  used_count INTEGER NOT NULL DEFAULT 0,
  per_user_limit INTEGER DEFAULT 1,
  applicable_products UUID[] DEFAULT '{}',
  applicable_product_types TEXT[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  starts_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Coupon Usage Tracking
CREATE TABLE public.coupon_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  coupon_id UUID NOT NULL REFERENCES public.coupons(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  discount_applied NUMERIC NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User Access Logs (Device, IP, ISP tracking)
CREATE TABLE public.user_access_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  ip_address TEXT,
  country TEXT,
  city TEXT,
  region TEXT,
  isp TEXT,
  user_agent TEXT,
  browser TEXT,
  browser_version TEXT,
  os TEXT,
  os_version TEXT,
  device_type TEXT,
  is_mobile BOOLEAN DEFAULT false,
  referrer TEXT,
  page_url TEXT,
  action_type TEXT NOT NULL DEFAULT 'page_view',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Admin Settings (for storing API keys and configuration)
CREATE TABLE public.admin_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT,
  setting_type TEXT NOT NULL DEFAULT 'text' CHECK (setting_type IN ('text', 'secret', 'boolean', 'number', 'json')),
  category TEXT NOT NULL DEFAULT 'general',
  description TEXT,
  is_encrypted BOOLEAN NOT NULL DEFAULT false,
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Announcement/Notices Table
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'error')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  show_to TEXT NOT NULL DEFAULT 'all' CHECK (show_to IN ('all', 'authenticated', 'guests')),
  starts_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activity Log for Admin Actions
CREATE TABLE public.admin_activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID NOT NULL REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.gift_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_access_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Gift Cards Policies
CREATE POLICY "Admins can manage gift cards" ON public.gift_cards
FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their redeemed gift cards" ON public.gift_cards
FOR SELECT USING (auth.uid() = redeemed_by);

-- Coupons Policies
CREATE POLICY "Admins can manage coupons" ON public.coupons
FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view active coupons" ON public.coupons
FOR SELECT USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

-- Coupon Usage Policies
CREATE POLICY "Admins can view all coupon usage" ON public.coupon_usage
FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own coupon usage" ON public.coupon_usage
FOR SELECT USING (auth.uid() = user_id);

-- User Access Logs Policies (Admin only)
CREATE POLICY "Admins can manage access logs" ON public.user_access_logs
FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Admin Settings Policies (Admin only)
CREATE POLICY "Admins can manage settings" ON public.admin_settings
FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Announcements Policies
CREATE POLICY "Admins can manage announcements" ON public.announcements
FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view active announcements" ON public.announcements
FOR SELECT USING (
  is_active = true 
  AND (starts_at IS NULL OR starts_at <= now()) 
  AND (expires_at IS NULL OR expires_at > now())
);

-- Admin Activity Logs Policies
CREATE POLICY "Admins can view activity logs" ON public.admin_activity_logs
FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Add triggers for updated_at
CREATE TRIGGER update_gift_cards_updated_at
BEFORE UPDATE ON public.gift_cards
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_coupons_updated_at
BEFORE UPDATE ON public.coupons
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_settings_updated_at
BEFORE UPDATE ON public.admin_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at
BEFORE UPDATE ON public.announcements
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_user_access_logs_user_id ON public.user_access_logs(user_id);
CREATE INDEX idx_user_access_logs_created_at ON public.user_access_logs(created_at DESC);
CREATE INDEX idx_user_access_logs_ip_address ON public.user_access_logs(ip_address);
CREATE INDEX idx_gift_cards_code ON public.gift_cards(code);
CREATE INDEX idx_coupons_code ON public.coupons(code);
CREATE INDEX idx_admin_settings_category ON public.admin_settings(category);

-- Function to generate gift card codes
CREATE OR REPLACE FUNCTION public.generate_gift_card_code()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  new_code TEXT;
  code_exists BOOLEAN;
BEGIN
  LOOP
    new_code := 'GC-' || upper(substring(md5(random()::text) from 1 for 4)) || '-' || 
                upper(substring(md5(random()::text) from 1 for 4)) || '-' ||
                upper(substring(md5(random()::text) from 1 for 4));
    SELECT EXISTS(SELECT 1 FROM public.gift_cards WHERE code = new_code) INTO code_exists;
    EXIT WHEN NOT code_exists;
  END LOOP;
  RETURN new_code;
END;
$$;

-- Function to generate coupon codes
CREATE OR REPLACE FUNCTION public.generate_coupon_code()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  new_code TEXT;
  code_exists BOOLEAN;
BEGIN
  LOOP
    new_code := upper(substring(md5(random()::text) from 1 for 8));
    SELECT EXISTS(SELECT 1 FROM public.coupons WHERE code = new_code) INTO code_exists;
    EXIT WHEN NOT code_exists;
  END LOOP;
  RETURN new_code;
END;
$$;
