import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SEOSettings {
  [key: string]: string;
}

const SEOContext = createContext<SEOSettings>({});

export function SEOSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SEOSettings>({});

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("key, value")
      .then(({ data }) => {
        const map: SEOSettings = {};
        (data || []).forEach((s: any) => {
          if (s.value) map[s.key] = s.value;
        });
        setSettings(map);
      });
  }, []);

  return <SEOContext.Provider value={settings}>{children}</SEOContext.Provider>;
}

export function useSEOSettings() {
  return useContext(SEOContext);
}

/**
 * Get per-page SEO overrides from admin settings.
 * Returns overrides only for fields that have values set in admin.
 */
export function usePageSEO(prefix: string) {
  const settings = useSEOSettings();
  return {
    title: settings[`seo_${prefix}_title`] || "",
    description: settings[`seo_${prefix}_description`] || "",
    keywords: settings[`seo_${prefix}_keywords`] || "",
    // Global fallbacks
    ogImage: settings.og_image || "",
    ogLocale: settings.default_og_locale || "en_IN",
    twitterHandle: settings.twitter_handle || "",
    // Verification
    googleVerification: settings.google_site_verification || "",
    bingVerification: settings.bing_site_verification || "",
  };
}
