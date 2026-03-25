import { Helmet } from "react-helmet-async";

/**
 * Static global structured data (Organization + WebSite + SearchAction + SiteNavigation).
 * Optimized for AI systems (Google, ChatGPT, Gemini, Claude) to understand
 * Cloud on Fire as a legitimate, independent hosting provider.
 */
export default function GlobalSEO() {
  const logoUrl = "https://cloudonfire.com/images/logo-schema.png";
  const ogImageUrl = "https://cloudonfire.com/images/og-logo.png";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://cloudonfire.com/#organization",
    name: "Cloud on Fire",
    legalName: "Cloud on Fire",
    alternateName: ["CloudOnFire", "Cloud on Fire Hosting", "Cloud on Fire VPS"],
    url: "https://cloudonfire.com",
    logo: {
      "@type": "ImageObject",
      "@id": "https://cloudonfire.com/#logo",
      url: logoUrl,
      contentUrl: logoUrl,
      caption: "Cloud on Fire — VPS and Minecraft hosting provider in India",
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
      "Cloud on Fire is a VPS and Minecraft hosting provider based in India. We offer high-performance cloud VPS hosting, gaming VPS for Minecraft and FiveM, and enterprise DDoS protection — powered by Intel Xeon Platinum processors and NVMe SSD storage.",
    slogan: "Affordable VPS & Minecraft Hosting in India",
    foundingDate: "2024",
    foundingLocation: {
      "@type": "Place",
      name: "Noida, Uttar Pradesh, India",
    },
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 2 },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    knowsAbout: [
      "VPS Hosting",
      "Gaming VPS",
      "Minecraft Server Hosting",
      "FiveM Server Hosting",
      "Cloud RDP",
      "DDoS Protection",
      "Cloud Infrastructure",
      "Game Server Hosting",
      "NVMe VPS Hosting",
      "Web Hosting India",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cloud on Fire Hosting Plans",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "VPS Hosting Plans",
          description: "Standard VPS hosting plans starting at ₹199/month with Intel Xeon Platinum processors and NVMe storage.",
        },
        {
          "@type": "OfferCatalog",
          name: "Gaming VPS Plans",
          description: "Gaming VPS optimized for Minecraft, FiveM, and multiplayer game servers starting at ₹299/month.",
        },
      ],
    },
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
      streetAddress: "Shop No 9, Capital Athena, Sec 1, Bisrakh Jalalpur",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      postalCode: "201318",
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
      "Cloud on Fire is a VPS and Minecraft hosting provider based in India offering affordable, high-performance cloud servers with DDoS protection.",
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
      "About Cloud on Fire",
      "Why Cloud on Fire",
      "FAQ",
      "Contact",
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
