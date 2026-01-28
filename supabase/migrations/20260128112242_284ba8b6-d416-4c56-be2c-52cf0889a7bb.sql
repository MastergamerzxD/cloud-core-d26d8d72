-- Create enum types
CREATE TYPE public.order_status AS ENUM ('pending', 'paid', 'provisioning', 'active', 'suspended', 'cancelled', 'expired');
CREATE TYPE public.invoice_status AS ENUM ('pending', 'paid', 'overdue', 'cancelled', 'refunded');
CREATE TYPE public.ticket_status AS ENUM ('open', 'in_progress', 'waiting_reply', 'resolved', 'closed');
CREATE TYPE public.ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE public.vps_status AS ENUM ('creating', 'running', 'stopped', 'suspended', 'terminated');
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  company_name TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  postal_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE (user_id, role)
);

-- Create products table for VPS plans
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  product_type TEXT NOT NULL CHECK (product_type IN ('pro_vps', 'budget_vps')),
  cpu_cores INTEGER NOT NULL,
  ram_gb INTEGER NOT NULL,
  storage_gb INTEGER NOT NULL,
  bandwidth_tb INTEGER NOT NULL,
  price_monthly DECIMAL(10,2) NOT NULL,
  price_quarterly DECIMAL(10,2),
  price_yearly DECIMAL(10,2),
  virtualizor_plan_id INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  billing_cycle TEXT NOT NULL CHECK (billing_cycle IN ('monthly', 'quarterly', 'yearly')),
  amount DECIMAL(10,2) NOT NULL,
  status order_status DEFAULT 'pending' NOT NULL,
  hostname TEXT,
  os_template TEXT,
  ccavenue_order_id TEXT,
  ccavenue_tracking_id TEXT,
  payment_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create invoices table
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  order_id UUID REFERENCES public.orders(id),
  amount DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  status invoice_status DEFAULT 'pending' NOT NULL,
  due_date DATE NOT NULL,
  paid_date TIMESTAMP WITH TIME ZONE,
  ccavenue_order_id TEXT,
  ccavenue_tracking_id TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create VPS instances table
CREATE TABLE public.vps_instances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  order_id UUID REFERENCES public.orders(id) NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  virtualizor_vps_id INTEGER,
  hostname TEXT NOT NULL,
  ip_address TEXT,
  os_template TEXT,
  panel_username TEXT,
  panel_password_hash TEXT,
  status vps_status DEFAULT 'creating' NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  last_renewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create support tickets table
CREATE TABLE public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  vps_instance_id UUID REFERENCES public.vps_instances(id),
  subject TEXT NOT NULL,
  priority ticket_priority DEFAULT 'medium' NOT NULL,
  status ticket_status DEFAULT 'open' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create ticket messages table
CREATE TABLE public.ticket_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID REFERENCES public.support_tickets(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  is_staff_reply BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create payment transactions log
CREATE TABLE public.payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  invoice_id UUID REFERENCES public.invoices(id),
  order_id UUID REFERENCES public.orders(id),
  ccavenue_order_id TEXT,
  ccavenue_tracking_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT NOT NULL,
  payment_mode TEXT,
  bank_ref_no TEXT,
  response_code TEXT,
  response_message TEXT,
  raw_response JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vps_instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for products (public read, admin write)
CREATE POLICY "Anyone can view active products"
  ON public.products FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage products"
  ON public.products FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for orders
CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders"
  ON public.orders FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all orders"
  ON public.orders FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for invoices
CREATE POLICY "Users can view their own invoices"
  ON public.invoices FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all invoices"
  ON public.invoices FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for VPS instances
CREATE POLICY "Users can view their own VPS instances"
  ON public.vps_instances FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all VPS instances"
  ON public.vps_instances FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for support tickets
CREATE POLICY "Users can view their own tickets"
  ON public.support_tickets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tickets"
  ON public.support_tickets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tickets"
  ON public.support_tickets FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all tickets"
  ON public.support_tickets FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for ticket messages
CREATE POLICY "Users can view messages of their tickets"
  ON public.ticket_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.support_tickets
      WHERE id = ticket_messages.ticket_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can add messages to their tickets"
  ON public.ticket_messages FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.support_tickets
      WHERE id = ticket_messages.ticket_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all ticket messages"
  ON public.ticket_messages FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for payment transactions
CREATE POLICY "Users can view their own transactions"
  ON public.payment_transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all transactions"
  ON public.payment_transactions FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON public.invoices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vps_instances_updated_at
  BEFORE UPDATE ON public.vps_instances
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_support_tickets_updated_at
  BEFORE UPDATE ON public.support_tickets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Generate order number function
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  new_number TEXT;
BEGIN
  SELECT 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(COALESCE(MAX(CAST(SUBSTRING(order_number FROM 14) AS INTEGER)), 0) + 1::INTEGER, 4, '0')
  INTO new_number
  FROM public.orders
  WHERE order_number LIKE 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-%';
  RETURN new_number;
END;
$$;

-- Generate invoice number function
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  new_number TEXT;
BEGIN
  SELECT 'INV-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 14) AS INTEGER)), 0) + 1::INTEGER, 4, '0')
  INTO new_number
  FROM public.invoices
  WHERE invoice_number LIKE 'INV-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-%';
  RETURN new_number;
END;
$$;

-- Generate ticket number function
CREATE OR REPLACE FUNCTION public.generate_ticket_number()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  new_number TEXT;
BEGIN
  SELECT 'TKT-' || LPAD(COALESCE(MAX(CAST(SUBSTRING(ticket_number FROM 5) AS INTEGER)), 0) + 1::INTEGER, 6, '0')
  INTO new_number
  FROM public.support_tickets;
  RETURN new_number;
END;
$$;