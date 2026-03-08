import { Helmet } from "react-helmet-async";

/**
 * Static global structured data (Organization + WebSite + SearchAction).
 * All values are hardcoded — no admin panel dependency.
 */
export default function GlobalSEO() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://cloudonfire.com/#organization",
    name: "Cloud on Fire",
    legalName: "Cloud on Fire",
    url: "https://cloudonfire.com",
    logo: "https://cloudonfire.com/images/og-logo.jpg",
    image: "https://cloudonfire.com/images/og-logo.jpg",
    description:
      "India's leading high-performance VPS hosting provider offering gaming VPS, cloud RDP, and enterprise-grade DDoS protection with Intel Xeon Platinum processors, NVMe SSD storage, and Yotta Tier-3+ data centers in Delhi & Mumbai.",
    foundingDate: "2024",
    sameAs: [
      "https://discord.gg/cloudonfire",
      "https://twitter.com/cloudonfire_",
      "https://instagram.com/cloudonfire_",
      "https://youtube.com/@cloudonfire",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "hello@cloudonfire.com",
        telephone: "+918766215705",
        availableLanguage: ["English", "Hindi"],
        areaServed: "IN",
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "hello@cloudonfire.com",
        telephone: "+918766215705",
        availableLanguage: ["English", "Hindi"],
        areaServed: "IN",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressRegion: "Delhi",
      addressCountry: "IN",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://cloudonfire.com/#website",
    name: "Cloud on Fire",
    url: "https://cloudonfire.com",
    description:
      "Best VPS Hosting in India — Gaming VPS, Cloud RDP, Enterprise DDoS Protection",
    publisher: { "@id": "https://cloudonfire.com/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://cloudonfire.com/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: [
      "VPS Plans",
      "Gaming VPS",
      "Cloud RDP",
      "DDoS Protection",
      "Infrastructure",
      "Blog",
      "About Us",
      "Why Us",
      "FAQ",
      "Contact",
      "Status",
    ],
    url: [
      "https://cloudonfire.com/vps-plans",
      "https://cloudonfire.com/gaming-vps",
      "https://cloudonfire.com/rdp",
      "https://cloudonfire.com/ddos-protection",
      "https://cloudonfire.com/infrastructure",
      "https://cloudonfire.com/blog",
      "https://cloudonfire.com/about",
      "https://cloudonfire.com/why-us",
      "https://cloudonfire.com/faq",
      "https://cloudonfire.com/contact",
      "https://cloudonfire.com/status",
    ],
  };

  return (
    <Helmet>
      <meta property="og:locale" content="en_IN" />
      <script type="application/ld+json">
        {JSON.stringify([organizationSchema, websiteSchema, siteNavigationSchema])}
      </script>
    </Helmet>
  );
}