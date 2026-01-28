import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Server,
  CreditCard,
  Check,
  ChevronRight,
  Loader2,
  Cpu,
  HardDrive,
  MemoryStick,
  Globe,
  Shield,
  Zap,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  product_type: string;
  price_monthly: number;
  price_quarterly: number | null;
  price_yearly: number | null;
  cpu_cores: number;
  ram_gb: number;
  storage_gb: number;
  bandwidth_tb: number;
}

const billingCycles = [
  { value: "monthly", label: "Monthly", discount: 0 },
  { value: "quarterly", label: "Quarterly", discount: 5 },
  { value: "yearly", label: "Yearly", discount: 15 },
];

const osTemplates = [
  { value: "ubuntu-22.04", label: "Ubuntu 22.04 LTS" },
  { value: "ubuntu-20.04", label: "Ubuntu 20.04 LTS" },
  { value: "debian-12", label: "Debian 12" },
  { value: "debian-11", label: "Debian 11" },
  { value: "centos-9", label: "CentOS Stream 9" },
  { value: "almalinux-9", label: "AlmaLinux 9" },
  { value: "rocky-9", label: "Rocky Linux 9" },
  { value: "windows-2022", label: "Windows Server 2022" },
];

export default function Order() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isLoading: authLoading } = useAuth();
  
  const [step, setStep] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [hostname, setHostname] = useState("");
  const [osTemplate, setOsTemplate] = useState("ubuntu-22.04");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const productSlug = searchParams.get("product");
    if (productSlug && products.length > 0) {
      const product = products.find(p => p.slug === productSlug);
      if (product) {
        setSelectedProduct(product.id);
      }
    }
  }, [searchParams, products]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("price_monthly", { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  const getPrice = (product: Product, cycle: string) => {
    switch (cycle) {
      case "quarterly":
        return product.price_quarterly || product.price_monthly * 3 * 0.95;
      case "yearly":
        return product.price_yearly || product.price_monthly * 12 * 0.85;
      default:
        return product.price_monthly;
    }
  };

  const getCycleMultiplier = (cycle: string) => {
    switch (cycle) {
      case "quarterly": return 3;
      case "yearly": return 12;
      default: return 1;
    }
  };

  const selectedProductData = products.find(p => p.id === selectedProduct);
  const basePrice = selectedProductData ? getPrice(selectedProductData, billingCycle) : 0;
  const discountAmount = appliedCoupon 
    ? (appliedCoupon.discount_type === "percentage" 
        ? basePrice * (appliedCoupon.discount_value / 100)
        : appliedCoupon.discount_value)
    : 0;
  const finalPrice = Math.max(0, basePrice - discountAmount);

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;

    try {
      const { data, error } = await supabase
        .from("coupons")
        .select("*")
        .eq("code", couponCode.toUpperCase())
        .eq("is_active", true)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        toast.error("Invalid coupon code");
        return;
      }

      // Check if expired
      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        toast.error("This coupon has expired");
        return;
      }

      // Check usage limit
      if (data.usage_limit && data.used_count >= data.usage_limit) {
        toast.error("This coupon has reached its usage limit");
        return;
      }

      setAppliedCoupon(data);
      toast.success("Coupon applied successfully!");
    } catch (error) {
      console.error("Error applying coupon:", error);
      toast.error("Failed to apply coupon");
    }
  };

  const parseSupabaseError = (error: any): string => {
    if (!error) return "An unexpected error occurred";
    
    const message = error.message || error.details || String(error);
    
    // Common Supabase/PostgreSQL error patterns
    if (message.includes("null value in column")) {
      return "Failed to generate order. Please try again.";
    }
    if (message.includes("violates not-null constraint")) {
      return "Required information is missing. Please check your details.";
    }
    if (message.includes("violates unique constraint")) {
      return "This order already exists. Please refresh and try again.";
    }
    if (message.includes("violates foreign key constraint")) {
      return "Invalid product selected. Please choose a valid plan.";
    }
    if (message.includes("violates check constraint")) {
      return "Invalid data provided. Please check your inputs.";
    }
    if (message.includes("permission denied") || message.includes("RLS")) {
      return "You don't have permission to perform this action.";
    }
    if (message.includes("JWT expired")) {
      return "Your session has expired. Please log in again.";
    }
    
    // Return a generic user-friendly message
    return "Failed to place order. Please try again or contact support.";
  };

  const handleSubmitOrder = async () => {
    if (!user) {
      toast.error("Please log in to place an order");
      navigate("/login?redirect=/order");
      return;
    }

    if (!selectedProduct || !hostname.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate order number
      const { data: orderNumber, error: orderNumError } = await supabase.rpc("generate_order_number");
      
      if (orderNumError || !orderNumber) {
        console.error("Error generating order number:", orderNumError);
        throw new Error("Failed to generate order number");
      }

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          product_id: selectedProduct,
          order_number: orderNumber,
          amount: finalPrice,
          billing_cycle: billingCycle,
          hostname: hostname.trim(),
          os_template: osTemplate,
          status: "pending",
        })
        .select()
        .single();

      if (orderError) {
        console.error("Order creation error:", orderError);
        throw orderError;
      }

      // Generate invoice number
      const { data: invoiceNumber, error: invoiceNumError } = await supabase.rpc("generate_invoice_number");
      
      if (invoiceNumError || !invoiceNumber) {
        console.error("Error generating invoice number:", invoiceNumError);
        throw new Error("Failed to generate invoice number");
      }

      // Create invoice
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7);

      const { error: invoiceError } = await supabase.from("invoices").insert({
        user_id: user.id,
        order_id: order.id,
        invoice_number: invoiceNumber,
        amount: finalPrice,
        tax_amount: finalPrice * 0.18, // 18% GST
        total_amount: finalPrice * 1.18,
        due_date: dueDate.toISOString().split("T")[0],
        status: "pending",
      });

      if (invoiceError) {
        console.error("Invoice creation error:", invoiceError);
        throw invoiceError;
      }

      // Record coupon usage if applied
      if (appliedCoupon) {
        await supabase.from("coupon_usage").insert({
          coupon_id: appliedCoupon.id,
          user_id: user.id,
          order_id: order.id,
          discount_applied: discountAmount,
        });

        // Increment coupon used_count
        await supabase
          .from("coupons")
          .update({ used_count: appliedCoupon.used_count + 1 })
          .eq("id", appliedCoupon.id);
      }

      toast.success("Order placed successfully!");
      navigate("/dashboard/orders");
    } catch (error: any) {
      console.error("Error creating order:", error);
      toast.error(parseSupabaseError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Redirect to login if not authenticated and trying to proceed past step 1
  const handleNextStep = () => {
    if (step === 1 && !selectedProduct) {
      toast.error("Please select a plan");
      return;
    }

    if (step === 2 && !user) {
      navigate("/register?redirect=/order");
      return;
    }

    if (step === 2 && (!hostname.trim() || !osTemplate)) {
      toast.error("Please fill in all configuration options");
      return;
    }

    setStep(step + 1);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Order VPS - Cloud on Fire</title>
        <meta name="description" content="Order your high-performance VPS hosting with DDoS protection. Simple checkout process." />
      </Helmet>
      <Layout>
        <section className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Order Your <span className="text-fire-gradient">VPS</span>
                </h1>
                <p className="text-muted-foreground">
                  Complete your order in just a few steps
                </p>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-4 mb-8">
                {[
                  { num: 1, label: "Select Plan" },
                  { num: 2, label: "Configure" },
                  { num: 3, label: "Checkout" },
                ].map((s, i) => (
                  <div key={s.num} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors ${
                        step >= s.num
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                    </div>
                    <span className={`ml-2 text-sm hidden sm:block ${step >= s.num ? "text-foreground" : "text-muted-foreground"}`}>
                      {s.label}
                    </span>
                    {i < 2 && <ChevronRight className="w-5 h-5 mx-2 text-muted-foreground" />}
                  </div>
                ))}
              </div>

              {/* Step 1: Select Plan */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Select Billing Cycle</CardTitle>
                      <CardDescription>Choose how often you'd like to be billed</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup value={billingCycle} onValueChange={setBillingCycle} className="grid grid-cols-3 gap-4">
                        {billingCycles.map((cycle) => (
                          <div key={cycle.value}>
                            <RadioGroupItem value={cycle.value} id={cycle.value} className="peer sr-only" />
                            <Label
                              htmlFor={cycle.value}
                              className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-colors"
                            >
                              <span className="font-semibold">{cycle.label}</span>
                              {cycle.discount > 0 && (
                                <Badge variant="secondary" className="mt-1 text-xs">
                                  Save {cycle.discount}%
                                </Badge>
                              )}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Select Your Plan</CardTitle>
                      <CardDescription>Choose the VPS that fits your needs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup value={selectedProduct} onValueChange={setSelectedProduct} className="space-y-4">
                        {products.map((product) => {
                          const price = getPrice(product, billingCycle);
                          const monthlyEquivalent = price / getCycleMultiplier(billingCycle);
                          
                          return (
                            <div key={product.id}>
                              <RadioGroupItem value={product.id} id={product.id} className="peer sr-only" />
                              <Label
                                htmlFor={product.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border-2 border-muted bg-card p-4 sm:p-6 hover:bg-accent/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Server className="w-5 h-5 text-primary" />
                                    <span className="font-semibold text-lg">{product.name}</span>
                                    <Badge variant={product.product_type === "pro_vps" ? "default" : "secondary"}>
                                      {product.product_type === "pro_vps" ? "Pro VPS" : "Budget VPS"}
                                    </Badge>
                                  </div>
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1.5">
                                      <Cpu className="w-4 h-4" />
                                      <span>{product.cpu_cores} vCPU</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <MemoryStick className="w-4 h-4" />
                                      <span>{product.ram_gb} GB RAM</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <HardDrive className="w-4 h-4" />
                                      <span>{product.storage_gb} GB NVMe</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <Globe className="w-4 h-4" />
                                      <span>{product.bandwidth_tb} TB BW</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right mt-4 sm:mt-0">
                                  <div className="text-2xl font-bold text-foreground">
                                    {formatCurrency(price)}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {billingCycle !== "monthly" && (
                                      <span>({formatCurrency(monthlyEquivalent)}/mo)</span>
                                    )}
                                    <span className="block">{billingCycle === "monthly" ? "/month" : `/${billingCycle}`}</span>
                                  </div>
                                </div>
                              </Label>
                            </div>
                          );
                        })}
                      </RadioGroup>

                      {products.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No products available at the moment
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="flex justify-end mt-6">
                    <Button onClick={handleNextStep} disabled={!selectedProduct} className="btn-fire">
                      <span className="relative z-10 flex items-center gap-2">
                        Continue <ChevronRight className="w-4 h-4" />
                      </span>
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Configure */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {!user && !authLoading && (
                    <Card className="mb-6 border-primary/50">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-lg">Create an Account</h3>
                            <p className="text-sm text-muted-foreground">
                              You need to register or login to continue with your order
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" onClick={() => navigate("/login?redirect=/order")}>
                              Login
                            </Button>
                            <Button onClick={() => navigate("/register?redirect=/order")}>
                              Register Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Server Configuration</CardTitle>
                      <CardDescription>Configure your VPS settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="hostname">Hostname *</Label>
                        <Input
                          id="hostname"
                          placeholder="e.g., my-server-1"
                          value={hostname}
                          onChange={(e) => setHostname(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          This will be your server's hostname (alphanumeric and hyphens only)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Operating System *</Label>
                        <Select value={osTemplate} onValueChange={setOsTemplate}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select OS" />
                          </SelectTrigger>
                          <SelectContent>
                            {osTemplates.map((os) => (
                              <SelectItem key={os.value} value={os.value}>
                                {os.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Have a Coupon?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          disabled={!!appliedCoupon}
                        />
                        {appliedCoupon ? (
                          <Button variant="outline" onClick={() => { setAppliedCoupon(null); setCouponCode(""); }}>
                            Remove
                          </Button>
                        ) : (
                          <Button variant="outline" onClick={applyCoupon}>
                            Apply
                          </Button>
                        )}
                      </div>
                      {appliedCoupon && (
                        <div className="mt-2 text-sm text-green-500 flex items-center gap-1">
                          <Check className="w-4 h-4" />
                          Coupon "{appliedCoupon.code}" applied - 
                          {appliedCoupon.discount_type === "percentage"
                            ? ` ${appliedCoupon.discount_value}% off`
                            : ` ${formatCurrency(appliedCoupon.discount_value)} off`}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button onClick={handleNextStep} disabled={!user || !hostname.trim()} className="btn-fire">
                      <span className="relative z-10 flex items-center gap-2">
                        Continue <ChevronRight className="w-4 h-4" />
                      </span>
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Checkout */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                      <CardDescription>Review your order before payment</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {selectedProductData && (
                        <div className="glass-card p-4 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Server className="w-5 h-5 text-primary" />
                                <span className="font-semibold">{selectedProductData.name}</span>
                              </div>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <p>• {selectedProductData.cpu_cores} vCPU Cores</p>
                                <p>• {selectedProductData.ram_gb} GB RAM</p>
                                <p>• {selectedProductData.storage_gb} GB NVMe Storage</p>
                                <p>• {selectedProductData.bandwidth_tb} TB Bandwidth</p>
                                <p>• Hostname: {hostname}</p>
                                <p>• OS: {osTemplates.find(o => o.value === osTemplate)?.label}</p>
                              </div>
                            </div>
                            <Badge variant={selectedProductData.product_type === "pro" ? "default" : "secondary"}>
                              {selectedProductData.product_type === "pro" ? "Pro VPS" : "Budget VPS"}
                            </Badge>
                          </div>
                        </div>
                      )}

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {billingCycles.find(b => b.value === billingCycle)?.label} Price
                          </span>
                          <span>{formatCurrency(basePrice)}</span>
                        </div>
                        
                        {appliedCoupon && (
                          <div className="flex justify-between text-sm text-green-500">
                            <span>Coupon Discount ({appliedCoupon.code})</span>
                            <span>-{formatCurrency(discountAmount)}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">GST (18%)</span>
                          <span>{formatCurrency(finalPrice * 0.18)}</span>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span className="text-primary">{formatCurrency(finalPrice * 1.18)}</span>
                        </div>
                      </div>

                      <div className="glass-card p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">DDoS Protection Included</p>
                            <p className="text-xs text-muted-foreground">
                              Your VPS comes with enterprise-grade DDoS protection at no extra cost
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button onClick={handleSubmitOrder} disabled={isSubmitting} className="btn-fire">
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <CreditCard className="mr-2 h-4 w-4" />
                      )}
                      <span className="relative z-10">Place Order</span>
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
}