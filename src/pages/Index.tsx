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
        <title>Cloud on Fire - Best VPS Hosting India | Gaming VPS from ₹299/mo</title>
        <meta 
          name="description" 
          content="India's #1 high-performance VPS hosting. Gaming VPS from ₹299/month with enterprise DDoS protection, NVMe storage, and 99.9% uptime. Never suspended under attacks." 
        />
        <meta name="keywords" content="VPS hosting India, gaming VPS, cheap VPS India, DDoS protected VPS, cloud server India, game server hosting, Minecraft server hosting India, FiveM server, budget VPS" />
        <link rel="canonical" href="https://cloudonfire.in/" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cloudonfire.in/" />
        <meta property="og:title" content="Cloud on Fire - Best VPS Hosting India | Gaming VPS from ₹299/mo" />
        <meta property="og:description" content="India's #1 high-performance VPS hosting. Gaming VPS from ₹299/month with enterprise DDoS protection." />
        <meta property="og:site_name" content="Cloud on Fire" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cloud on Fire - Best VPS Hosting India" />
        <meta name="twitter:description" content="Gaming VPS from ₹299/month with enterprise DDoS protection. Never suspended under attacks." />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Cloud on Fire",
            "url": "https://cloudonfire.in",
            "description": "High-performance VPS hosting in India with enterprise DDoS protection",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN"
            },
            "sameAs": [],
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "INR",
              "lowPrice": "299",
              "highPrice": "1199",
              "offerCount": "6"
            }
          })}
        </script>
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
