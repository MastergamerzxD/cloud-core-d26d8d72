import { Helmet } from "react-helmet-async";

/**
 * Injects global structured data (Organization + WebSite + SearchAction)
 * for Google Sitelinks and Knowledge Panel.
 * Rendered once in Layout.
 */
export default function GlobalSEO() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://cloudonfire.in/#organization",
    name: "Cloud on Fire",
    legalName: "Cloud on Fire",
    url: "https://cloudonfire.in",
    logo: "https://cloudonfire.in/favicon.ico",
    description: "India's leading high-performance VPS hosting provider with enterprise-grade DDoS protection, NVMe storage, and Yotta data center infrastructure.",
    foundingDate: "2024",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "support@cloudonfire.in",
        availableLanguage: ["English", "Hindi"],
        areaServed: "IN",
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@cloudonfire.in",
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
    sameAs: [],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "299",
      highPrice: "1199",
      offerCount: "6",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://cloudonfire.in/#website",
    name: "Cloud on Fire",
    url: "https://cloudonfire.in",
    description: "Best VPS Hosting in India - Gaming VPS, Budget VPS, Enterprise DDoS Protection",
    publisher: { "@id": "https://cloudonfire.in/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://cloudonfire.in/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: [
      "Pro VPS", "Budget VPS", "Compare VPS", "DDoS Protection",
      "Infrastructure", "Blog", "About Us", "FAQ", "Contact", "Status"
    ],
    url: [
      "https://cloudonfire.in/pro-vps",
      "https://cloudonfire.in/budget-vps",
      "https://cloudonfire.in/compare",
      "https://cloudonfire.in/ddos-protection",
      "https://cloudonfire.in/infrastructure",
      "https://cloudonfire.in/blog",
      "https://cloudonfire.in/about",
      "https://cloudonfire.in/faq",
      "https://cloudonfire.in/contact",
      "https://cloudonfire.in/status",
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify([organizationSchema, websiteSchema, siteNavigationSchema])}
      </script>
    </Helmet>
  );
}
