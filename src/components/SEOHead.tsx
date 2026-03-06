import { Helmet } from "react-helmet-async";
import { useSEOSettings } from "@/hooks/useSEOSettings";

interface SEOHeadProps {
  /** Admin settings prefix for this page (e.g. "home", "pro_vps") */
  seoPrefix?: string;
  /** Hardcoded fallback title */
  title: string;
  /** Hardcoded fallback description */
  description: string;
  keywords?: string;
  canonical: string;
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
  twitterCard?: string;
}

/**
 * Smart SEO head that merges admin panel overrides with hardcoded defaults.
 * Admin settings always take priority when set.
 */
export default function SEOHead({
  seoPrefix,
  title: defaultTitle,
  description: defaultDescription,
  keywords: defaultKeywords,
  canonical,
  ogType = "website",
  ogImage: defaultOgImage,
  noindex = false,
  jsonLd,
  twitterCard = "summary_large_image",
}: SEOHeadProps) {
  const settings = useSEOSettings();

  // Admin overrides take priority over hardcoded defaults
  const adminTitle = seoPrefix ? settings[`seo_${seoPrefix}_title`] : "";
  const adminDescription = seoPrefix ? settings[`seo_${seoPrefix}_description`] : "";
  const adminKeywords = seoPrefix ? settings[`seo_${seoPrefix}_keywords`] : "";

  const title = adminTitle || defaultTitle;
  const description = adminDescription || defaultDescription;
  const keywords = adminKeywords || defaultKeywords;
  const ogImage = settings.og_image || defaultOgImage;
  const twitterHandle = settings.twitter_handle || "";

  const fullCanonical = canonical.startsWith("http") ? canonical : `https://cloudonfire.in${canonical}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonical} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={settings.org_name || "Cloud on Fire"} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
