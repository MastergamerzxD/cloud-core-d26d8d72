import { Helmet } from "react-helmet-async";

/**
 * Static global structured data (Organization + WebSite + SearchAction + ImageObject).
 * All values are hardcoded — no admin panel dependency.
 */
export default function GlobalSEO() {
  const logoUrl = "https://cloudonfire.com/images/logo-schema.png";
  const ogImageUrl = "https://cloudonfire.com/images/og-logo.jpg";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://cloudonfire.com/#organization",
    name: "Cloud on Fire",
    legalName: "Cloud on Fire",
    url: "https://cloudonfire.com",
    logo: {
      "@type": "ImageObject",
      "@id": "https://cloudonfire.com/#logo",
      url: logoUrl,
      contentUrl: logoUrl,
      caption: "Cloud on Fire logo",
      width: 512,
      height: 512,
    },
    image: {
      "@type": "ImageObject",
      url: ogImageUrl,
      width: 1200,
      height: 630,
    },
    description:
      "High-performance cloud infrastructure platform offering VPS hosting, gaming VPS, cloud RDP, and advanced DDoS protection. Powered by Intel Xeon Platinum processors, NVMe SSD storage, and Yotta Tier-3+ data centers in Delhi & Mumbai, India.",
    foundingDate: "2024",
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 2 },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    knowsAbout: [
      "VPS Hosting",
      "Gaming VPS",
      "Cloud RDP",
      "DDoS Protection",
      "Cloud Infrastructure",
      "Game Server Hosting",
      "Minecraft Server Hosting",
      "FiveM Server Hosting",
    ],
    sameAs: [
      "https://www.instagram.com/cloudonfire_",
      "https://wa.me/918766215705",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "hello@cloudonfire.com",
        telephone: "+918766215705",
        availableLanguage: ["English", "Hindi"],
        areaServed: "IN",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "hello@cloudonfire.com",
        telephone: "+918766215705",
        availableLanguage: ["English", "Hindi"],
        areaServed: "IN",
      },
      {
        "@type": "ContactPoint",
        contactType: "technical support",
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
    alternateName: "CloudOnFire",
    url: "https://cloudonfire.com",
    description:
      "Best VPS Hosting in India — Gaming VPS, Cloud RDP, Enterprise DDoS Protection",
    publisher: { "@id": "https://cloudonfire.com/#organization" },
    inLanguage: "en-IN",
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
