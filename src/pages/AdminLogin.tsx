import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Loader2, Flame, ArrowLeft, Shield, Users, BarChart3, Settings } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && isAdmin && !authLoading) {
      navigate("/admin");
    }
  }, [user, isAdmin, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Check if user is admin
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", authData.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (roleError) throw roleError;

      if (!roleData) {
        // Not an admin, sign out
        await supabase.auth.signOut();
        toast.error("Access denied. This login is for administrators only.");
        return;
      }

      toast.success("Welcome back, Admin!");
      navigate("/admin");
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 via-background to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-destructive/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col justify-center p-12">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <Flame className="w-10 h-10 text-primary" />
            <span className="text-2xl font-bold text-foreground">
              Cloud on <span className="text-fire-gradient">Fire</span>
            </span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-destructive/20 text-destructive rounded-full text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              Restricted Access
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Administrator
              <br />
              <span className="text-fire-gradient">Control Panel</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Complete control over your hosting platform. Manage users,
              orders, and system configuration.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {[
              { icon: Users, text: "Manage all users & permissions" },
              { icon: BarChart3, text: "View reports & analytics" },
              { icon: Settings, text: "Configure payment & integrations" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-foreground" />
                </div>
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Shield className="w-8 h-8 text-destructive" />
            <span className="text-xl font-bold text-foreground">
              Admin <span className="text-fire-gradient">Portal</span>
            </span>
          </div>

          <Card className="border-border/50 shadow-2xl">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">Admin Sign In</CardTitle>
                  <CardDescription className="text-xs">
                    Authorized personnel only
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Admin Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@cloudonfire.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full h-11" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Access Admin Panel
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Not an admin?{" "}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    User Login
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>

          <div className="mt-6 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-destructive mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Security Notice</p>
                <p className="text-xs text-muted-foreground">
                  This area is monitored. All login attempts are logged for security purposes.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}