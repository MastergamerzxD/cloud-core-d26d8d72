import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Copy, Check, Search, Target, FileText, Image, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useAISEO } from "@/hooks/useAISEO";
import { useToast } from "@/hooks/use-toast";

// ── AI SEO Generator ──
export function AISEOGenerator({ onApply }: { onApply?: (data: any) => void }) {
  const { loading, run } = useAISEO();
  const [keyword, setKeyword] = useState("");
  const [secondaryKeywords, setSecondaryKeywords] = useState("");
  const [audience, setAudience] = useState("");
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState("");

  const generate = async () => {
    const prompt = `Primary keyword: ${keyword}\nSecondary keywords: ${secondaryKeywords}\nTarget audience: ${audience}\nPage topic: ${topic}`;
    const data = await run<any>("generate_seo", prompt);
    if (data) setResult(data);
  };

  const copyField = (field: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(field);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" />AI SEO Generator</CardTitle>
        <CardDescription>Generate optimized SEO metadata using AI. Enter your target keyword and topic to get started.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Primary Keyword *</Label>
            <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g. best VPS hosting India" />
          </div>
          <div className="space-y-2">
            <Label>Secondary Keywords</Label>
            <Input value={secondaryKeywords} onChange={(e) => setSecondaryKeywords(e.target.value)} placeholder="e.g. game hosting, cloud server" />
          </div>
          <div className="space-y-2">
            <Label>Target Audience</Label>
            <Input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g. Indian developers and gamers" />
          </div>
          <div className="space-y-2">
            <Label>Page Topic / Description</Label>
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Pro VPS hosting with DDoS protection" />
          </div>
        </div>
        <Button onClick={generate} disabled={loading || !keyword} className="w-full md:w-auto">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}Generate SEO
        </Button>

        {result && (
          <div className="mt-4 space-y-3 p-4 border border-border rounded-lg bg-muted/30">
            <h4 className="font-semibold text-foreground">Generated SEO Metadata</h4>
            {[
              { label: "Meta Title", key: "meta_title", charLimit: "60" },
              { label: "Meta Description", key: "meta_description", charLimit: "160" },
              { label: "OG Title", key: "og_title", charLimit: "60" },
              { label: "OG Description", key: "og_description", charLimit: "160" },
              { label: "Twitter Description", key: "twitter_description", charLimit: "160" },
            ].map(({ label, key, charLimit }) => (
              <div key={key} className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">{label} <span className="text-muted-foreground">({result[key]?.length || 0}/{charLimit} chars)</span></Label>
                  <Button variant="ghost" size="sm" className="h-6 px-2" onClick={() => copyField(key, result[key] || "")}>
                    {copied === key ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
                <Input value={result[key] || ""} onChange={(e) => setResult({ ...result, [key]: e.target.value })} className="text-sm" />
              </div>
            ))}
            {result.slug_suggestions?.length > 0 && (
              <div className="space-y-1">
                <Label className="text-xs">Slug Suggestions</Label>
                <div className="flex flex-wrap gap-2">
                  {result.slug_suggestions.map((s: string) => (
                    <Badge key={s} variant="secondary" className="cursor-pointer" onClick={() => copyField("slug", s)}>
                      /{s} {copied === "slug" ? <Check className="ml-1 h-3 w-3" /> : <Copy className="ml-1 h-3 w-3" />}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {result.keywords?.length > 0 && (
              <div className="space-y-1">
                <Label className="text-xs">Suggested Keywords</Label>
                <div className="flex flex-wrap gap-1.5">
                  {result.keywords.map((k: string) => <Badge key={k} variant="outline">{k}</Badge>)}
                </div>
              </div>
            )}
            {onApply && <Button variant="secondary" size="sm" onClick={() => onApply(result)}>Apply to Settings</Button>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── AI Keyword Suggestions ──
export function AIKeywordSuggestions() {
  const { loading, run } = useAISEO();
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<any>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const { toast } = useToast();

  const generate = async () => {
    const data = await run<any>("suggest_keywords", `Seed keyword: ${keyword}`);
    if (data) { setResult(data); setSelected([]); }
  };

  const toggle = (kw: string) => {
    setSelected(prev => prev.includes(kw) ? prev.filter(k => k !== kw) : [...prev, kw]);
  };

  const copySelected = () => {
    navigator.clipboard.writeText(selected.join(", "));
    toast({ title: "Copied!", description: `${selected.length} keywords copied to clipboard` });
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Search className="h-5 w-5 text-primary" />AI Keyword Suggestions</CardTitle>
        <CardDescription>Enter a seed keyword to discover related long-tail, high-intent, and question-based keywords.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Enter a seed keyword..." className="flex-1" onKeyDown={(e) => e.key === "Enter" && generate()} />
          <Button onClick={generate} disabled={loading || !keyword}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}Suggest
          </Button>
        </div>

        {result && (
          <div className="space-y-4">
            {[
              { label: "Long-Tail Keywords", key: "long_tail", icon: Target },
              { label: "High-Intent Keywords", key: "high_intent", icon: Target },
              { label: "Related Phrases", key: "related", icon: Search },
              { label: "Question Keywords", key: "questions", icon: Search },
            ].map(({ label, key, icon: Icon }) => result[key]?.length > 0 && (
              <div key={key} className="space-y-2">
                <Label className="text-xs flex items-center gap-1"><Icon className="h-3 w-3" />{label}</Label>
                <div className="flex flex-wrap gap-1.5">
                  {result[key].map((kw: string) => (
                    <Badge
                      key={kw}
                      variant={selected.includes(kw) ? "default" : "outline"}
                      className="cursor-pointer transition-colors"
                      onClick={() => toggle(kw)}
                    >{kw}</Badge>
                  ))}
                </div>
              </div>
            ))}
            {selected.length > 0 && (
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <span className="text-sm text-muted-foreground">{selected.length} selected</span>
                <Button variant="secondary" size="sm" onClick={copySelected}><Copy className="mr-1 h-3 w-3" />Copy Selected</Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── AI SEO Score / Analyzer ──
export function AISEOScore({ pageTitle, metaTitle, metaDescription, content, keywords }: { pageTitle?: string; metaTitle?: string; metaDescription?: string; content?: string; keywords?: string }) {
  const { loading, run } = useAISEO();
  const [result, setResult] = useState<any>(null);

  const analyze = async () => {
    const prompt = `Page: ${pageTitle || "Unknown"}\nMeta Title: ${metaTitle || "Not set"}\nMeta Description: ${metaDescription || "Not set"}\nKeywords: ${keywords || "Not set"}\nContent length: ${content?.length || 0} characters\nContent preview: ${(content || "").slice(0, 500)}`;
    const data = await run<any>("analyze_seo", prompt);
    if (data) setResult(data);
  };

  const statusIcon = (status: string) => {
    if (status === "pass") return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === "warn") return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" />AI SEO Score</CardTitle>
        <CardDescription>Analyze your page's SEO health and get actionable improvement suggestions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={analyze} disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}Analyze SEO
        </Button>

        {result && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`text-4xl font-bold ${result.score >= 80 ? "text-green-500" : result.score >= 50 ? "text-yellow-500" : "text-red-500"}`}>
                {result.score}
              </div>
              <div className="text-sm text-muted-foreground">/ {result.max_score || 100} points</div>
            </div>

            <div className="space-y-2">
              {result.checks?.map((check: any, i: number) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded bg-muted/30">
                  {statusIcon(check.status)}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{check.name}</div>
                    <div className="text-xs text-muted-foreground">{check.detail}</div>
                    {check.suggestion && <div className="text-xs text-primary mt-1">💡 {check.suggestion}</div>}
                  </div>
                </div>
              ))}
            </div>

            {result.recommendations?.length > 0 && (
              <div className="space-y-1 p-3 bg-primary/5 rounded-lg border border-primary/20">
                <Label className="text-xs font-semibold">Recommendations</Label>
                {result.recommendations.map((r: string, i: number) => (
                  <p key={i} className="text-sm text-muted-foreground">• {r}</p>
                ))}
              </div>
            )}

            {result.optimized_title && (
              <div className="space-y-2 p-3 border border-border rounded-lg">
                <Label className="text-xs">Suggested Title</Label>
                <p className="text-sm text-foreground">{result.optimized_title}</p>
                <Label className="text-xs">Suggested Description</Label>
                <p className="text-sm text-foreground">{result.optimized_description}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── AI Schema Generator ──
export function AISchemaGenerator() {
  const { loading, run } = useAISEO();
  const [pageType, setPageType] = useState("");
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(-1);
  const { toast } = useToast();

  const generate = async () => {
    const data = await run<any>("generate_schema", `Page type: ${pageType}. Generate appropriate JSON-LD schemas.`);
    if (data) setResult(data);
  };

  const copySchema = (index: number, schema: any) => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
    setCopied(index);
    setTimeout(() => setCopied(-1), 2000);
    toast({ title: "Schema copied!" });
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" />AI Schema Generator</CardTitle>
        <CardDescription>Generate structured data (JSON-LD) schema markup for your pages.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input value={pageType} onChange={(e) => setPageType(e.target.value)} placeholder="e.g. Homepage, Product Page, FAQ, Blog Post..." className="flex-1" />
          <Button onClick={generate} disabled={loading || !pageType}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}Generate
          </Button>
        </div>

        {result?.schemas?.map((schema: any, i: number) => (
          <div key={i} className="p-3 border border-border rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{schema.type}</Badge>
              <Button variant="ghost" size="sm" onClick={() => copySchema(i, schema.json_ld)}>
                {copied === i ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </Button>
            </div>
            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto max-h-48 text-foreground">
              {JSON.stringify(schema.json_ld, null, 2)}
            </pre>
          </div>
        ))}

        {result?.recommendations?.length > 0 && (
          <div className="p-3 bg-primary/5 rounded-lg border border-primary/20 space-y-1">
            <Label className="text-xs font-semibold">Recommendations</Label>
            {result.recommendations.map((r: string, i: number) => (
              <p key={i} className="text-sm text-muted-foreground">• {r}</p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── AI OG Image Suggestions ──
export function AIOGImageSuggestions() {
  const { loading, run } = useAISEO();
  const [pageName, setPageName] = useState("");
  const [result, setResult] = useState<any>(null);

  const generate = async () => {
    const data = await run<any>("og_image_suggestions", `Generate OG image text suggestions for page: ${pageName}`);
    if (data) setResult(data);
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Image className="h-5 w-5 text-primary" />AI OG Image Suggestions</CardTitle>
        <CardDescription>Generate text suggestions for Open Graph social sharing images.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input value={pageName} onChange={(e) => setPageName(e.target.value)} placeholder="Enter page name or topic..." className="flex-1" />
          <Button onClick={generate} disabled={loading || !pageName}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}Suggest
          </Button>
        </div>

        {result?.suggestions?.map((s: any, i: number) => (
          <div key={i} className="p-3 border border-border rounded-lg space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground text-sm">{s.headline}</h4>
              <Badge variant="outline" className="text-xs">{s.style}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{s.subtext}</p>
          </div>
        ))}

        {result?.tips?.length > 0 && (
          <div className="p-3 bg-primary/5 rounded-lg border border-primary/20 space-y-1">
            <Label className="text-xs font-semibold">OG Image Tips</Label>
            {result.tips.map((t: string, i: number) => (
              <p key={i} className="text-sm text-muted-foreground">• {t}</p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── AI Site-wide SEO Audit ──
export function AISEOAudit() {
  const { loading, run } = useAISEO();
  const [result, setResult] = useState<any>(null);

  const audit = async () => {
    const data = await run<any>("seo_audit", "Perform a complete SEO audit of the entire website. Check all pages for missing meta tags, duplicate titles, short descriptions, and other issues.");
    if (data) setResult(data);
  };

  const severityColor = (s: string) => {
    if (s === "critical") return "destructive";
    if (s === "warning") return "secondary";
    return "outline";
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-primary" />AI SEO Audit</CardTitle>
        <CardDescription>Run a comprehensive AI-powered SEO audit across all your pages to find issues and get fix suggestions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={audit} disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}Run Full Audit
        </Button>

        {result && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`text-4xl font-bold ${(result.overall_score || 0) >= 80 ? "text-green-500" : (result.overall_score || 0) >= 50 ? "text-yellow-500" : "text-red-500"}`}>
                {result.overall_score || 0}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Overall SEO Health</div>
                <div className="text-xs text-muted-foreground">{result.summary}</div>
              </div>
            </div>

            <div className="space-y-2">
              {result.issues?.map((issue: any, i: number) => (
                <div key={i} className="p-3 border border-border rounded-lg space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={severityColor(issue.severity) as any}>{issue.severity}</Badge>
                    <span className="text-sm font-medium text-foreground">{issue.page}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{issue.issue}</p>
                  <p className="text-xs text-primary">💡 {issue.fix}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Per-Page AI SEO Button ──
export function AIPageSEOButton({ pageName, metaTitle, metaDescription, keywords, onApply }: {
  pageName: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  onApply: (data: { title: string; description: string; keywords: string }) => void;
}) {
  const { loading, run } = useAISEO();

  const generate = async () => {
    const prompt = `Page: ${pageName}\nCurrent title: ${metaTitle || "Not set"}\nCurrent description: ${metaDescription || "Not set"}\nCurrent keywords: ${keywords || "Not set"}`;
    const data = await run<any>("page_seo_optimize", prompt);
    if (data) {
      onApply({
        title: data.meta_title || "",
        description: data.meta_description || "",
        keywords: data.keywords || "",
      });
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={generate} disabled={loading} className="gap-1.5">
      {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
      Generate SEO with AI
    </Button>
  );
}
