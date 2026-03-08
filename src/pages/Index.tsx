import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CompanySection from "@/components/home/CompanySection";
import TechStackSection from "@/components/home/TechStackSection";
import UseCasesSection from "@/components/home/UseCasesSection";
import ComparisonPreview from "@/components/home/ComparisonPreview";
import TrustSection from "@/components/home/TrustSection";
import PricingPreview from "@/components/home/PricingPreview";
import CTASection from "@/components/home/CTASection";

export default function Index() {
  const homeJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://cloudonfire.com/#webpage",
      name: "Cloud on Fire – Best VPS Hosting Company in India",
      url: "https://cloudonfire.com/",
      description: "India's #1 high-performance VPS hosting provider. Gaming VPS from ₹299/month, enterprise DDoS protection up to 1Tbps, NVMe Gen4 storage, Yotta Tier-3+ data centers in Delhi & Mumbai, and 99.9% guaranteed uptime.",
      isPartOf: { "@id": "https://cloudonfire.com/#website" },
      about: { "@id": "https://cloudonfire.com/#organization" },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://cloudonfire.com/favicon.ico",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Cloud on Fire VPS Hosting",
      description: "Best VPS hosting in India with enterprise DDoS protection. VPS Plans, Gaming VPS, and High Performance RDP for websites, game servers, and cloud desktops.",
      brand: { "@type": "Brand", name: "Cloud on Fire" },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: "199",
        highPrice: "1899",
        offerCount: "6",
        availability: "https://schema.org/PreOrder",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        ratingCount: "150",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://cloudonfire.com/" },
      ],
    },
  ];

  return (
    <>
      <SEOHead
        seoPrefix="home"
        title="Cloud on Fire – Best VPS Hosting Company in India | Gaming VPS from ₹299/mo"
        description="India's #1 high-performance VPS hosting provider. Gaming VPS from ₹299/month with enterprise DDoS protection up to 1Tbps, NVMe Gen4 storage, Yotta data centers, and 99.9% uptime. Best hosting company in India for Minecraft, FiveM, CS2, and web hosting."
        keywords="best VPS hosting company in India, best hosting company in India, best game hosting company in India, gaming VPS India, cheap VPS India, DDoS protected VPS, cloud server India, game server hosting, Minecraft server hosting India, FiveM server hosting, CS2 server India, budget VPS, Delhi VPS hosting, Mumbai VPS, NVMe VPS India, Cloud on Fire, best VPS provider India, Indian VPS hosting"
        canonical="/"
        jsonLd={homeJsonLd}
      />
      <Layout>
        <HeroSection />
        <CompanySection />
        <FeaturesSection />
        <TechStackSection />
        <UseCasesSection />
        <ComparisonPreview />
        <TrustSection />
        <PricingPreview />
        <CTASection />
      </Layout>
    </>
  );
}
