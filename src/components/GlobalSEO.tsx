import { Helmet } from "react-helmet-async";
import { useSEOSettings } from "@/hooks/useSEOSettings";

/**
 * Injects global structured data (Organization + WebSite + SearchAction)
 * and verification meta tags using dynamic settings from admin panel.
 */
export default function GlobalSEO() {
  const s = useSEOSettings();

  const orgName = s.org_name || "Cloud on Fire";
  const orgLegalName = s.org_legal_name || "Cloud on Fire";
  const orgDescription = s.org_description || "India's leading high-performance VPS hosting provider with enterprise-grade DDoS protection, NVMe storage, and Yotta data center infrastructure.";
  const orgEmail = s.org_email || "hello@cloudonfire.com";
  const orgPhone = s.org_phone || "+918766215705";
  const orgLogo = s.org_logo_url || "https://cloudonfire.in/favicon.ico";
  const orgFoundingYear = s.org_founding_year || "2024";

  const sameAs = [
    s.org_facebook, s.org_twitter, s.org_linkedin, s.org_instagram,
  ].filter(Boolean);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://cloudonfire.in/#organization",
    name: orgName,
    legalName: orgLegalName,
    url: "https://cloudonfire.in",
    logo: orgLogo,
    description: orgDescription,
    foundingDate: orgFoundingYear,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: orgEmail,
        telephone: orgPhone,
        availableLanguage: ["English", "Hindi"],
        areaServed: "IN",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: s.org_address_street || "",
      addressLocality: s.org_address_city || "Delhi",
      addressRegion: s.org_address_state || "Delhi",
      postalCode: s.org_address_zip || "",
      addressCountry: s.org_address_country || "IN",
    },
    sameAs,
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
    name: orgName,
    url: "https://cloudonfire.in",
    description: s.site_meta_description || "Best VPS Hosting in India - Gaming VPS, Budget VPS, Enterprise DDoS Protection",
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
      {/* Verification codes from admin panel */}
      {s.google_site_verification && (
        <meta name="google-site-verification" content={s.google_site_verification} />
      )}
      {s.bing_site_verification && (
        <meta name="msvalidate.01" content={s.bing_site_verification} />
      )}
      {/* Default OG locale */}
      <meta property="og:locale" content={s.default_og_locale || "en_IN"} />
      {/* Twitter handle */}
      {s.twitter_handle && <meta name="twitter:site" content={s.twitter_handle} />}
      {/* Structured data */}
      <script type="application/ld+json">
        {JSON.stringify([organizationSchema, websiteSchema, siteNavigationSchema])}
      </script>
    </Helmet>
  );
}
