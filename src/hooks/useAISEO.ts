import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;

async function callAI(mode: string, prompt: string) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ mode, prompt }),
  });
  if (resp.status === 429) throw new Error("Rate limit exceeded. Please try again later.");
  if (resp.status === 402) throw new Error("AI credits exhausted. Please add credits.");
  if (!resp.ok) throw new Error("AI request failed");
  const { parsed } = await resp.json();
  if (!parsed) throw new Error("AI returned invalid format. Please try again.");
  return parsed;
}

export function useAISEO() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const run = async <T>(mode: string, prompt: string): Promise<T | null> => {
    setLoading(true);
    try {
      const result = await callAI(mode, prompt);
      return result as T;
    } catch (e: any) {
      toast({ title: "AI Error", description: e.message, variant: "destructive" });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, run };
}
