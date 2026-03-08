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
      name: "Cloud on Fire — High Performance VPS Hosting in India",
      url: "https://cloudonfire.com/",
      description: "Deploy powerful VPS servers in India with NVMe SSD storage, Intel Xeon Platinum processors, and advanced DDoS protection. Gaming VPS from ₹299/month. Perfect for developers, gaming servers, and scalable cloud workloads.",
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
      description: "High performance VPS hosting in India with enterprise DDoS protection. VPS Plans starting ₹199/mo, Gaming VPS from ₹299/mo, and Cloud RDP for remote desktops.",
      brand: { "@type": "Brand", name: "Cloud on Fire" },
      category: "Cloud VPS Hosting",
      image: "https://cloudonfire.com/images/logo-schema.png",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: "199",
        highPrice: "1999",
        offerCount: "12",
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
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
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
          name: "What is gaming VPS hosting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Gaming VPS hosting is a virtual server optimized for running multiplayer game servers like Minecraft, FiveM, and Hytale. Cloud on Fire Gaming VPS includes advanced DDoS protection, low latency networking, and unmetered bandwidth starting at ₹299/month.",
          },
        },
        {
          "@type": "Question",
          name: "Can I host a Minecraft server on a VPS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Cloud on Fire Gaming VPS is optimized for Minecraft server hosting. Our Intel Xeon Platinum processors deliver stable 20 TPS performance even with modpacks and large player counts. Plans start at ₹299/month with DDoS protection included.",
          },
        },
        {
          "@type": "Question",
          name: "What is NVMe VPS hosting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "NVMe VPS hosting uses NVMe SSD storage instead of traditional SATA SSDs, providing up to 7x faster read/write speeds. All Cloud on Fire VPS plans include NVMe Gen4 storage for maximum disk performance.",
          },
        },
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
