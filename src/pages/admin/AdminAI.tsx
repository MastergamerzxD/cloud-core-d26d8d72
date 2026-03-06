import { useState, useRef, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Send, Loader2, Sparkles, FileText, BookOpen, Search } from "lucide-react";
import { useAIGenerate } from "@/hooks/useAIGenerate";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;

const quickActions = [
  { label: "Generate a page", icon: FileText, prompt: "Generate a landing page for " },
  { label: "Generate a blog post", icon: BookOpen, prompt: "Write a blog post about " },
  { label: "Suggest SEO improvements", icon: Search, prompt: "Review my website and suggest SEO improvements for better ranking." },
  { label: "Content ideas", icon: Sparkles, prompt: "Suggest 5 blog post ideas for a VPS hosting company targeting Indian gamers and developers." },
];

export default function AdminAI() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Welcome to the AI Assistant! I can help you:\n\n• **Generate pages** — describe what you need and I'll create a full draft\n• **Generate blog posts** — give me a topic and I'll write it\n• **Suggest SEO improvements** — I'll analyze your site content\n• **Answer questions** — about your website content, settings, etc.\n\nWhat would you like to do?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { generating, generatePage, generateBlog } = useAIGenerate();

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const send = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    const userMsg: Message = { role: "user", content: msg };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setLoading(true);

    let assistantContent = "";
    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length === allMessages.length + 1) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantContent } : m));
        }
        return [...prev, { role: "assistant", content: assistantContent }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages.map((m) => ({ role: m.role, content: m.content })) }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error || "Failed");
      }

      const reader = resp.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") break;
          try {
            const parsed = JSON.parse(json);
            const c = parsed.choices?.[0]?.delta?.content;
            if (c) updateAssistant(c);
          } catch {}
        }
      }
    } catch (e: any) {
      updateAssistant(`Error: ${e.message}`);
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-4 h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex items-center gap-3">
          <Bot className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">AI Assistant</h1>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {quickActions.map((a) => (
            <Button
              key={a.label}
              variant="outline"
              className="h-auto py-3 flex flex-col items-center gap-1 text-xs"
              onClick={() => setInput(a.prompt)}
            >
              <a.icon className="h-4 w-4 text-primary" />
              {a.label}
            </Button>
          ))}
        </div>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col overflow-hidden bg-card border-border">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-3 text-sm whitespace-pre-wrap",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything or describe content to generate..."
                className="min-h-[44px] max-h-[120px] resize-none bg-background"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
              />
              <Button onClick={() => send()} disabled={loading || !input.trim()} size="icon" className="shrink-0 h-11 w-11">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
