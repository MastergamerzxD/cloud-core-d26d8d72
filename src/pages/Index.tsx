import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ComparisonPreview from "@/components/home/ComparisonPreview";
import TrustSection from "@/components/home/TrustSection";
import PricingPreview from "@/components/home/PricingPreview";
import CTASection from "@/components/home/CTASection";

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Cloud on Fire - High-Performance VPS Hosting India | Gaming & Budget VPS</title>
        <meta 
          name="description" 
          content="Enterprise-grade VPS hosting in India starting from ₹299/month. Premium DDoS protection, high-performance gaming VPS, and budget-friendly options. Never suspended under attacks." 
        />
        <meta property="og:title" content="Cloud on Fire - High-Performance VPS Hosting India" />
        <meta property="og:description" content="Enterprise-grade VPS hosting with premium DDoS protection. Gaming VPS from ₹299/month." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Layout>
        <HeroSection />
        <FeaturesSection />
        <ComparisonPreview />
        <TrustSection />
        <PricingPreview />
        <CTASection />
      </Layout>
    </>
  );
}
