import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import GamesSection from "@/components/home/GamesSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import PricingPreview from "@/components/home/PricingPreview";
import InfrastructureSection from "@/components/home/InfrastructureSection";
import CTASection from "@/components/home/CTASection";

const Divider = ({ variant = "neon" }: { variant?: "neon" | "fire" }) => (
  <div className={`${variant === "fire" ? "gradient-divider-fire" : "gradient-divider"} mx-auto max-w-4xl`} />
);

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
        title="Cloud on Fire — High Performance VPS Hosting in India | Gaming VPS & Cloud RDP"
        description="Deploy powerful VPS servers in India with NVMe SSD storage, Intel Xeon Platinum processors, and advanced DDoS protection. Gaming VPS from ₹299/mo. Perfect for developers, gaming servers, and scalable cloud workloads."
        keywords="VPS hosting India, gaming VPS India, Minecraft server hosting India, cloud VPS India, high performance VPS, DDoS protected VPS, cloud server India, game server hosting, best VPS hosting company in India, Cloud on Fire"
        canonical="/"
        ogImage="https://cloudonfire.com/images/og-logo.jpg"
        jsonLd={homeJsonLd}
      />
      <Layout>
        <HeroSection />
        <Divider variant="fire" />
        <ReviewsSection />
        <Divider />
        <ServicesGrid />
        <Divider variant="fire" />
        <GamesSection />
        <Divider />
        <FeaturesSection />
        <Divider variant="fire" />
        <PricingPreview />
        <Divider />
        <InfrastructureSection />
        <Divider variant="fire" />
        <CTASection />
      </Layout>
    </>
  );
}
