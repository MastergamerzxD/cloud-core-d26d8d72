import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;

export function useAIGenerate() {
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  const generatePage = async (prompt: string): Promise<string | null> => {
    setGenerating(true);
    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ mode: "generate_page", prompt }),
      });

      if (!resp.ok) throw new Error("Failed to generate");
      const { parsed } = await resp.json();
      if (!parsed) throw new Error("AI returned invalid format");

      const { data, error } = await supabase.from("pages").insert({
        title: parsed.title,
        slug: parsed.slug,
        content: parsed.content,
        seo_title: parsed.seo_title,
        seo_description: parsed.seo_description,
        status: "draft",
      }).select("id").single();

      if (error) throw error;
      toast({ title: "Page generated!", description: `"${parsed.title}" saved as draft.` });
      return data.id;
    } catch (e: any) {
      toast({ title: "Generation failed", description: e.message, variant: "destructive" });
      return null;
    } finally {
      setGenerating(false);
    }
  };

  const generateBlog = async (prompt: string): Promise<string | null> => {
    setGenerating(true);
    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ mode: "generate_blog", prompt }),
      });

      if (!resp.ok) throw new Error("Failed to generate");
      const { parsed } = await resp.json();
      if (!parsed) throw new Error("AI returned invalid format");

      const { data, error } = await supabase.from("blog_posts").insert({
        title: parsed.title,
        slug: parsed.slug,
        content: parsed.content,
        meta_description: parsed.meta_description,
        tags: parsed.tags || [],
        excerpt: parsed.excerpt || "",
        status: "draft",
      }).select("id").single();

      if (error) throw error;
      toast({ title: "Blog post generated!", description: `"${parsed.title}" saved as draft.` });
      return data.id;
    } catch (e: any) {
      toast({ title: "Generation failed", description: e.message, variant: "destructive" });
      return null;
    } finally {
      setGenerating(false);
    }
  };

  return { generating, generatePage, generateBlog };
}
