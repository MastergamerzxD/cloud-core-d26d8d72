import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <PasswordProtection>
          <BrowserRouter>
            <Routes>
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PasswordProtection>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
