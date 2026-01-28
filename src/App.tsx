import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import PasswordProtection from "@/components/auth/PasswordProtection";
import Index from "./pages/Index";
import ProVPS from "./pages/ProVPS";
import BudgetVPS from "./pages/BudgetVPS";
import Compare from "./pages/Compare";
import DDoSProtection from "./pages/DDoSProtection";
import Infrastructure from "./pages/Infrastructure";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import WhyUs from "./pages/WhyUs";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";

// Client Pages
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientVPS from "./pages/client/ClientVPS";
import ClientOrders from "./pages/client/ClientOrders";
import ClientInvoices from "./pages/client/ClientInvoices";
import ClientTickets from "./pages/client/ClientTickets";
import ClientProfile from "./pages/client/ClientProfile";
import ClientWallet from "./pages/client/ClientWallet";
import ClientRedeem from "./pages/client/ClientRedeem";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminVPS from "./pages/admin/AdminVPS";
import AdminInvoices from "./pages/admin/AdminInvoices";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AdminGiftCards from "./pages/admin/AdminGiftCards";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminTickets from "./pages/admin/AdminTickets";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import AdminAccessLogs from "./pages/admin/AdminAccessLogs";
import AdminActivityLogs from "./pages/admin/AdminActivityLogs";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <PasswordProtection>
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/pro-vps" element={<ProVPS />} />
                <Route path="/budget-vps" element={<BudgetVPS />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/ddos-protection" element={<DDoSProtection />} />
                <Route path="/infrastructure" element={<Infrastructure />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/about" element={<About />} />
                <Route path="/why-us" element={<WhyUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                
                {/* Client Dashboard Routes */}
                <Route path="/dashboard" element={<ClientDashboard />} />
                <Route path="/dashboard/vps" element={<ClientVPS />} />
                <Route path="/dashboard/orders" element={<ClientOrders />} />
                <Route path="/dashboard/invoices" element={<ClientInvoices />} />
                <Route path="/dashboard/tickets" element={<ClientTickets />} />
                <Route path="/dashboard/profile" element={<ClientProfile />} />
                <Route path="/dashboard/wallet" element={<ClientWallet />} />
                <Route path="/dashboard/redeem" element={<ClientRedeem />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/vps" element={<AdminVPS />} />
                <Route path="/admin/invoices" element={<AdminInvoices />} />
                <Route path="/admin/transactions" element={<AdminTransactions />} />
                <Route path="/admin/gift-cards" element={<AdminGiftCards />} />
                <Route path="/admin/coupons" element={<AdminCoupons />} />
                <Route path="/admin/tickets" element={<AdminTickets />} />
                <Route path="/admin/announcements" element={<AdminAnnouncements />} />
                <Route path="/admin/access-logs" element={<AdminAccessLogs />} />
                <Route path="/admin/activity-logs" element={<AdminActivityLogs />} />
                <Route path="/admin/reports" element={<AdminReports />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </PasswordProtection>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
