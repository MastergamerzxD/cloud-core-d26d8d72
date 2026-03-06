import { Helmet } from "react-helmet-async";
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
      "@id": "https://cloudonfire.in/#webpage",
      name: "Cloud on Fire – Best VPS Hosting Company in India",
      url: "https://cloudonfire.in/",
      description: "India's #1 high-performance VPS hosting provider. Gaming VPS from ₹299/month, enterprise DDoS protection up to 1Tbps, NVMe Gen4 storage, Yotta Tier-3+ data centers in Delhi & Mumbai, and 99.9% guaranteed uptime.",
      isPartOf: { "@id": "https://cloudonfire.in/#website" },
      about: { "@id": "https://cloudonfire.in/#organization" },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://cloudonfire.in/favicon.ico",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Cloud on Fire VPS Hosting",
      description: "Best VPS hosting in India with enterprise DDoS protection. Pro VPS for gaming servers (Minecraft, FiveM, CS2, GTA V) and Budget VPS for websites, apps, and development.",
      brand: { "@type": "Brand", name: "Cloud on Fire" },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: "299",
        highPrice: "1199",
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
        { "@type": "ListItem", position: 1, name: "Home", item: "https://cloudonfire.in/" },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Cloud on Fire – Best VPS Hosting Company in India | Gaming VPS from ₹299/mo</title>
        <meta
          name="description"
          content="India's #1 high-performance VPS hosting provider. Gaming VPS from ₹299/month with enterprise DDoS protection up to 1Tbps, NVMe Gen4 storage, Yotta data centers, and 99.9% uptime. Best hosting company in India for Minecraft, FiveM, CS2, and web hosting."
        />
        <meta name="keywords" content="best VPS hosting company in India, best hosting company in India, best game hosting company in India, gaming VPS India, cheap VPS India, DDoS protected VPS, cloud server India, game server hosting, Minecraft server hosting India, FiveM server hosting, CS2 server India, budget VPS, Delhi VPS hosting, Mumbai VPS, NVMe VPS India, Cloud on Fire, best VPS provider India, Indian VPS hosting" />
        <link rel="canonical" href="https://cloudonfire.in/" />

        {/* OG */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cloudonfire.in/" />
        <meta property="og:title" content="Cloud on Fire – Best VPS Hosting Company in India | Gaming VPS from ₹299/mo" />
        <meta property="og:description" content="India's #1 high-performance VPS hosting. Gaming VPS from ₹299/month with enterprise DDoS protection. Best hosting company in India." />
        <meta property="og:site_name" content="Cloud on Fire" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cloud on Fire – Best VPS Hosting Company in India" />
        <meta name="twitter:description" content="Gaming VPS from ₹299/month with enterprise DDoS protection. Never suspended under attacks. Best hosting company in India." />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(homeJsonLd)}</script>
      </Helmet>
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
