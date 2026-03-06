import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LaunchPopupProvider } from "@/hooks/useLaunchPopup";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";

import AdminProtectedRoute from "@/components/admin/AdminProtectedRoute";
import LoadingScreen from "@/components/LoadingScreen";
import Index from "./pages/Index";
import ProVPS from "./pages/ProVPS";
import BudgetVPS from "./pages/BudgetVPS";
import Compare from "./pages/Compare";
import DDoSProtection from "./pages/DDoSProtection";
import Infrastructure from "./pages/Infrastructure";
import About from "./pages/About";
import WhyUs from "./pages/WhyUs";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Status from "./pages/Status";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import MediaGallery from "./pages/MediaGallery";
import DynamicPage from "./pages/DynamicPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlogList from "./pages/admin/AdminBlogList";
import AdminBlogEditor from "./pages/admin/AdminBlogEditor";
import AdminPages from "./pages/admin/AdminPages";
import AdminPageEditor from "./pages/admin/AdminPageEditor";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import AdminSEO from "./pages/admin/AdminSEO";
import AdminRedirects from "./pages/admin/AdminRedirects";
import AdminNewsletter from "./pages/admin/AdminNewsletter";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminAI from "./pages/admin/AdminAI";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSecurity from "./pages/admin/AdminSecurity";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LoadingScreen />
          <BrowserRouter>
            <AdminAuthProvider>
              <LaunchPopupProvider>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/pro-vps" element={<ProVPS />} />
                  <Route path="/budget-vps" element={<BudgetVPS />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="/ddos-protection" element={<DDoSProtection />} />
                  <Route path="/infrastructure" element={<Infrastructure />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/why-us" element={<WhyUs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/status" element={<Status />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/media" element={<MediaGallery />} />
                  <Route path="/page/:slug" element={<DynamicPage />} />

                  {/* Admin routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
                  <Route path="/admin/blogs" element={<AdminProtectedRoute><AdminBlogList /></AdminProtectedRoute>} />
                  <Route path="/admin/blogs/:id" element={<AdminProtectedRoute><AdminBlogEditor /></AdminProtectedRoute>} />
                  <Route path="/admin/pages" element={<AdminProtectedRoute><AdminPages /></AdminProtectedRoute>} />
                  <Route path="/admin/pages/:id" element={<AdminProtectedRoute><AdminPageEditor /></AdminProtectedRoute>} />
                  <Route path="/admin/media" element={<AdminProtectedRoute><AdminMedia /></AdminProtectedRoute>} />
                  <Route path="/admin/announcements" element={<AdminProtectedRoute><AdminAnnouncements /></AdminProtectedRoute>} />
                  <Route path="/admin/seo" element={<AdminProtectedRoute><AdminSEO /></AdminProtectedRoute>} />
                  <Route path="/admin/redirects" element={<AdminProtectedRoute><AdminRedirects /></AdminProtectedRoute>} />
                  <Route path="/admin/newsletter" element={<AdminProtectedRoute><AdminNewsletter /></AdminProtectedRoute>} />
                  <Route path="/admin/settings" element={<AdminProtectedRoute><AdminSettings /></AdminProtectedRoute>} />
                  <Route path="/admin/ai" element={<AdminProtectedRoute><AdminAI /></AdminProtectedRoute>} />
                  <Route path="/admin/analytics" element={<AdminProtectedRoute><AdminAnalytics /></AdminProtectedRoute>} />
                  <Route path="/admin/security" element={<AdminProtectedRoute><AdminSecurity /></AdminProtectedRoute>} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </LaunchPopupProvider>
            </AdminAuthProvider>
          </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
