import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
  twitterCard?: string;
  /** @deprecated kept for backwards compat, no longer used */
  seoPrefix?: string;
}

/**
 * Static SEO head — all metadata is defined directly in page code.
 */
export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogType = "website",
  ogImage,
  noindex = false,
  jsonLd,
  twitterCard = "summary_large_image",
}: SEOHeadProps) {
  const fullCanonical = canonical.startsWith("http") ? canonical : `https://cloudonfire.com${canonical}`;

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
      <meta property="og:site_name" content="Cloud on Fire" />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
