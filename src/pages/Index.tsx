import { lazy, Suspense } from "react";
import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import ServicesGrid from "@/components/home/ServicesGrid";

// Lazy load below-fold sections for better Core Web Vitals
const GamesSection = lazy(() => import("@/components/home/GamesSection"));
const FeaturesSection = lazy(() => import("@/components/home/FeaturesSection"));
const PricingPreview = lazy(() => import("@/components/home/PricingPreview"));
const InfrastructureSection = lazy(() => import("@/components/home/InfrastructureSection"));
const TrustBadgesSection = lazy(() => import("@/components/home/TrustBadgesSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

const Divider = ({ variant = "neon" }: { variant?: "neon" | "fire" }) => (
  <div className={`${variant === "fire" ? "gradient-divider-fire" : "gradient-divider"} mx-auto max-w-4xl`} />
);

const SectionFallback = () => <div className="min-h-[200px]" />;

export default function Index() {
  const homeJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://cloudonfire.com/#webpage",
      name: "Cloud on Fire — Affordable VPS & Minecraft Hosting in India",
      url: "https://cloudonfire.com/",
      description: "Cloud on Fire is a VPS and Minecraft hosting provider based in India. Deploy powerful VPS servers with NVMe SSD storage, Intel Xeon Platinum processors, and advanced DDoS protection. Gaming VPS from ₹299/month.",
      isPartOf: { "@id": "https://cloudonfire.com/#website" },
      about: { "@id": "https://cloudonfire.com/#organization" },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://cloudonfire.com/images/logo-schema.png",
        width: 512,
        height: 512,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Cloud on Fire VPS Hosting",
      description: "Cloud on Fire provides high-performance VPS hosting in India with enterprise DDoS protection. VPS Plans starting ₹199/mo, Gaming VPS from ₹299/mo. Powered by Intel Xeon Platinum processors and NVMe SSD storage.",
      brand: { "@type": "Brand", name: "Cloud on Fire" },
      category: "Cloud VPS Hosting",
      image: "https://cloudonfire.com/images/logo-schema.png",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: "199",
        highPrice: "1599",
        offerCount: "8",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "Cloud on Fire" },
        priceValidUntil: "2027-12-31",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        worstRating: "1",
        ratingCount: "150",
        reviewCount: "85",
      },
      review: [
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Arjun M." },
          datePublished: "2025-11-10",
          reviewBody: "Excellent VPS performance for our Minecraft server. Zero lag even with 40+ players. Cloud on Fire is the best gaming VPS in India.",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Priya S." },
          datePublished: "2025-12-05",
          reviewBody: "Best VPS hosting I've used in India. The DDoS protection is solid and support is very responsive.",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        },
      ],
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 1,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://cloudonfire.com/" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Cloud on Fire?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Cloud on Fire is a VPS and Minecraft hosting provider based in India. We offer high-performance cloud VPS hosting, gaming VPS for Minecraft and FiveM, and enterprise DDoS protection — powered by Intel Xeon Platinum processors and NVMe SSD storage. Plans start at ₹199/month.",
          },
        },
        {
          "@type": "Question",
          name: "What services does Cloud on Fire provide?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Cloud on Fire provides Standard VPS hosting (from ₹199/mo), Gaming VPS for Minecraft, FiveM, and multiplayer game servers (from ₹299/mo), Cloud RDP for remote desktops, and enterprise-grade DDoS protection included on all plans.",
          },
        },
        {
          "@type": "Question",
          name: "Is Cloud on Fire reliable?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Cloud on Fire uses enterprise-grade Intel Xeon Platinum series processors (8168 / 8173M), NVMe SSD storage, and Tier-3+ data centers in India. All plans include DDoS protection and 24/7 customer support.",
          },
        },
        {
          "@type": "Question",
          name: "What is VPS hosting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "VPS (Virtual Private Server) hosting provides dedicated resources on a virtual server, offering more power and control than shared hosting. Cloud on Fire VPS plans include Intel Xeon Platinum processors, NVMe SSD storage, and DDoS protection starting at ₹199/month.",
          },
        },
        {
          "@type": "Question",
          name: "Can I host a Minecraft server on Cloud on Fire?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Cloud on Fire Gaming VPS is optimized for Minecraft server hosting. Our Intel Xeon Platinum processors deliver stable 20 TPS performance even with modpacks and large player counts. Gaming VPS plans start at ₹299/month with DDoS protection included.",
          },
        },
      ],
    },
  ];

  return (
    <>
      <SEOHead
        title="Cloud on Fire – Affordable VPS & Minecraft Hosting in India"
        description="Cloud on Fire is a VPS and Minecraft hosting provider based in India. High-performance cloud servers starting at ₹199. Fast, secure, and DDoS-protected hosting."
        keywords="Cloud on Fire, VPS hosting India, gaming VPS India, Minecraft server hosting India, cloud VPS India, high performance VPS, DDoS protected VPS, Cloud on Fire hosting, best VPS hosting company in India"
        canonical="/"
        ogImage="https://cloudonfire.com/images/og-logo.png"
        jsonLd={homeJsonLd}
      />
      <Layout>
        <HeroSection />
        <Divider variant="fire" />
        <ServicesGrid />
        <Divider />
        <ReviewsSection />
        <Divider variant="fire" />
        <Suspense fallback={<SectionFallback />}>
          <GamesSection />
        </Suspense>
        <Divider />
        <Suspense fallback={<SectionFallback />}>
          <FeaturesSection />
        </Suspense>
        <Divider />
        <Suspense fallback={<SectionFallback />}>
          <InfrastructureSection />
        </Suspense>
        <Divider variant="fire" />
        <Suspense fallback={<SectionFallback />}>
          <TrustBadgesSection />
        </Suspense>
        <Divider />
        <Suspense fallback={<SectionFallback />}>
          <CTASection />
        </Suspense>
      </Layout>
    </>
  );
}
