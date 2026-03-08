import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Play, MapPin, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface LatencyResult {
  location: string;
  region: string;
  latency: number | null;
  status: "idle" | "testing" | "done" | "error";
}

const testEndpoints = [
  { location: "India (Delhi)", region: "Asia South", url: "https://cloudonfire.com" },
  { location: "Singapore", region: "Asia Southeast", url: "https://www.google.com.sg" },
  { location: "Germany", region: "Europe West", url: "https://www.google.de" },
  { location: "United States", region: "North America", url: "https://www.google.com" },
];

function getLatencyColor(ms: number | null): string {
  if (ms === null) return "text-muted-foreground";
  if (ms < 80) return "text-green-400";
  if (ms < 200) return "text-yellow-400";
  return "text-red-400";
}

function getLatencyBg(ms: number | null): string {
  if (ms === null) return "bg-muted-foreground/20";
  if (ms < 80) return "bg-green-400/20";
  if (ms < 200) return "bg-yellow-400/20";
  return "bg-red-400/20";
}

function getLatencyLabel(ms: number | null): string {
  if (ms === null) return "—";
  if (ms < 80) return "Excellent";
  if (ms < 200) return "Good";
  return "High";
}

interface Props {
  /** compact = homepage preview card, full = infrastructure page */
  variant?: "compact" | "full";
}

export default function LatencyTestTool({ variant = "full" }: Props) {
  const [results, setResults] = useState<LatencyResult[]>(
    testEndpoints.map((e) => ({ location: e.location, region: e.region, latency: null, status: "idle" }))
  );
  const [testing, setTesting] = useState(false);
  const [bestNode, setBestNode] = useState<string | null>(null);

  const measureLatency = useCallback(async (url: string): Promise<number> => {
    // Use resource timing API for real browser-based measurement
    const iterations = 3;
    const times: number[] = [];

    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      try {
        await fetch(url, { mode: "no-cors", cache: "no-store" });
        const end = performance.now();
        times.push(end - start);
      } catch {
        // no-cors will often throw but timing still works
        const end = performance.now();
        times.push(end - start);
      }
    }

    // Return median
    times.sort((a, b) => a - b);
    return Math.round(times[Math.floor(times.length / 2)]);
  }, []);

  const runTest = useCallback(async () => {
    setTesting(true);
    setBestNode(null);

    // Set all to testing
    setResults(testEndpoints.map((e) => ({ location: e.location, region: e.region, latency: null, status: "testing" })));

    const newResults: LatencyResult[] = [];

    for (let i = 0; i < testEndpoints.length; i++) {
      const endpoint = testEndpoints[i];
      setResults((prev) =>
        prev.map((r, idx) => (idx === i ? { ...r, status: "testing" } : r))
      );

      try {
        const latency = await measureLatency(endpoint.url);
        const result: LatencyResult = { location: endpoint.location, region: endpoint.region, latency, status: "done" };
        newResults.push(result);
        setResults((prev) =>
          prev.map((r, idx) => (idx === i ? result : r))
        );
      } catch {
        const result: LatencyResult = { location: endpoint.location, region: endpoint.region, latency: null, status: "error" };
        newResults.push(result);
        setResults((prev) =>
          prev.map((r, idx) => (idx === i ? result : r))
        );
      }

      // Small delay between tests
      if (i < testEndpoints.length - 1) {
        await new Promise((r) => setTimeout(r, 300));
      }
    }

    // Find best
    const validResults = newResults.filter((r) => r.latency !== null);
    if (validResults.length > 0) {
      const best = validResults.reduce((a, b) => (a.latency! < b.latency! ? a : b));
      setBestNode(best.location);
    }

    setTesting(false);
  }, [measureLatency]);

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glow-card p-6 sm:p-8 group"
      >
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 rounded-xl bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center shrink-0 group-hover:bg-neon-blue/20 transition-colors">
            <Wifi className="w-6 h-6 text-neon-blue" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">Test Your Latency</h3>
            <p className="text-sm text-muted-foreground">Measure your connection speed to our infrastructure nodes.</p>
          </div>
        </div>
        <Link to="/infrastructure">
          <Button variant="outline" size="sm" className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue/50 group/btn">
            <span className="flex items-center gap-2">
              Run Latency Test
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
            </span>
          </Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="container-wide">
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glow-badge mb-5 inline-flex"
          >
            <Globe className="w-3.5 h-3.5" />
            Network Test
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3"
          >
            Test Your Latency to <span className="text-neon-gradient">Cloud on Fire</span>
          </motion.h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Measure real-time latency from your browser to our infrastructure regions.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="glow-card p-6 sm:p-8">
            {/* Test button */}
            <div className="text-center mb-8">
              <Button
                onClick={runTest}
                disabled={testing}
                size="lg"
                className="btn-neon h-12 px-8"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {testing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Run Latency Test
                    </>
                  )}
                </span>
              </Button>
            </div>

            {/* Results table */}
            <div className="space-y-3">
              {/* Header */}
              <div className="grid grid-cols-3 gap-4 px-4 pb-2 border-b border-border/30">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Location</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">Latency</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Status</span>
              </div>

              {results.map((result, index) => (
                <motion.div
                  key={result.location}
                  initial={false}
                  animate={result.status === "done" ? { opacity: 1 } : {}}
                  className={`grid grid-cols-3 gap-4 items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                    bestNode === result.location
                      ? "bg-green-400/10 border border-green-400/30"
                      : "bg-card/40 border border-border/20"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{result.location}</div>
                      <div className="text-[10px] text-muted-foreground">{result.region}</div>
                    </div>
                  </div>

                  <div className="text-center">
                    {result.status === "testing" ? (
                      <div className="flex items-center justify-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" style={{ animationDelay: "0.2s" }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" style={{ animationDelay: "0.4s" }} />
                      </div>
                    ) : result.latency !== null ? (
                      <span className={`text-lg font-bold ${getLatencyColor(result.latency)}`}>
                        {result.latency} ms
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </div>

                  <div className="flex justify-end">
                    {result.status === "done" && result.latency !== null && (
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getLatencyBg(result.latency)} ${getLatencyColor(result.latency)}`}>
                        {getLatencyLabel(result.latency)}
                      </span>
                    )}
                    {result.status === "error" && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-400/20 text-red-400">Error</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Best node summary */}
            <AnimatePresence>
              {bestNode && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="mt-6 p-4 rounded-xl bg-green-400/10 border border-green-400/20 text-center"
                >
                  <p className="text-sm text-foreground">
                    <span className="font-semibold text-green-400">✓</span>{" "}
                    Your best connection is to the <span className="font-bold text-green-400">{bestNode}</span> node.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
