import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Server, Cpu, HardDrive, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useLaunchPopup } from "@/hooks/useLaunchPopup";

const useCaseOptions = [
  { value: "minecraft", label: "Minecraft Server" },
  { value: "fivem", label: "FiveM Server" },
  { value: "webhosting", label: "Web Hosting" },
  { value: "api", label: "Application / API Hosting" },
  { value: "rdp", label: "Remote Desktop" },
];

const modOptions = [
  { value: "light", label: "Light" },
  { value: "moderate", label: "Moderate" },
  { value: "heavy", label: "Heavy" },
];

const storageOptions = [
  { value: "small", label: "10–20 GB" },
  { value: "medium", label: "20–50 GB" },
  { value: "large", label: "50 GB+" },
];

interface RecommendedPlan {
  name: string;
  ram: string;
  storage: string;
  useCase: string;
}

function getRecommendation(
  useCase: string,
  players: number,
  mods: string,
  storage: string,
  isGaming: boolean
): RecommendedPlan {
  // Score system based on inputs
  let score = 0;

  // Players/users contribution
  if (players <= 10) score += 1;
  else if (players <= 30) score += 2;
  else if (players <= 60) score += 3;
  else if (players <= 100) score += 4;
  else if (players <= 150) score += 5;
  else score += 6;

  // Mods contribution
  if (mods === "light") score += 0;
  else if (mods === "moderate") score += 1;
  else score += 2;

  // Storage contribution
  if (storage === "small") score += 0;
  else if (storage === "medium") score += 1;
  else score += 2;

  // Use case weight
  if (useCase === "fivem") score += 2;
  if (useCase === "rdp") score += 1;

  // Map score to plan tier
  if (isGaming) {
    if (score <= 2) return { name: "Gamer Start", ram: "4 GB", storage: "30 GB NVMe SSD", useCase: "Small multiplayer servers or lightweight game hosting" };
    if (score <= 4) return { name: "Gamer Plus", ram: "6 GB", storage: "60 GB NVMe SSD", useCase: "Medium multiplayer servers or modded game environments" };
    if (score <= 6) return { name: "Gamer Pro", ram: "12 GB", storage: "100 GB NVMe SSD", useCase: "Large modded servers or multiple game instances" };
    if (score <= 8) return { name: "Gamer Elite", ram: "20 GB", storage: "150 GB NVMe SSD", useCase: "High player count servers with heavy mod usage" };
    if (score <= 9) return { name: "Gamer Ultimate", ram: "32 GB", storage: "150 GB NVMe SSD", useCase: "Community gaming networks or multiple large servers" };
    return { name: "Gamer Enterprise", ram: "64 GB", storage: "200 GB NVMe SSD", useCase: "Maximum gaming infrastructure for large communities" };
  } else {
    if (score <= 2) return { name: "Starter VPS", ram: "4 GB", storage: "30 GB NVMe SSD", useCase: "Lightweight web apps, blogs, or small APIs" };
    if (score <= 4) return { name: "Plus VPS", ram: "6 GB", storage: "60 GB NVMe SSD", useCase: "Growing web applications or medium workloads" };
    if (score <= 6) return { name: "Pro VPS", ram: "12 GB", storage: "100 GB NVMe SSD", useCase: "Production applications, databases, or multiple services" };
    if (score <= 8) return { name: "Elite VPS", ram: "20 GB", storage: "150 GB NVMe SSD", useCase: "High-traffic applications or resource-intensive workloads" };
    if (score <= 9) return { name: "Ultra VPS", ram: "32 GB", storage: "150 GB NVMe SSD", useCase: "Large-scale deployments or enterprise applications" };
    return { name: "Enterprise VPS", ram: "64 GB", storage: "200 GB NVMe SSD", useCase: "Maximum cloud power for demanding infrastructure" };
  }
}

interface Props {
  variant?: "gaming" | "vps";
}

export default function ServerPlanCalculator({ variant = "vps" }: Props) {
  const isGaming = variant === "gaming";
  const { openPopup } = useLaunchPopup();

  const [useCase, setUseCase] = useState(isGaming ? "minecraft" : "webhosting");
  const [players, setPlayers] = useState([20]);
  const [mods, setMods] = useState("light");
  const [storage, setStorage] = useState("small");
  const [showResult, setShowResult] = useState(false);

  const recommendation = useMemo(
    () => getRecommendation(useCase, players[0], mods, storage, isGaming),
    [useCase, players, mods, storage, isGaming]
  );

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="container-wide">
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`${isGaming ? "glow-badge-fire" : "glow-badge"} mb-5 inline-flex`}
          >
            <Calculator className="w-3.5 h-3.5" />
            Plan Calculator
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3"
          >
            Find Your <span className={isGaming ? "text-fire-gradient" : "text-neon-gradient"}>Ideal Server Plan</span>
          </motion.h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Answer a few questions and we'll recommend the best plan for your workload.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="glow-card p-6 sm:p-8 lg:p-10 space-y-8">
            {/* Use Case */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Use Case</label>
              <div className="flex flex-wrap gap-2">
                {useCaseOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setUseCase(opt.value); setShowResult(false); }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
                      useCase === opt.value
                        ? isGaming
                          ? "bg-primary/20 border-primary/50 text-primary shadow-[0_0_15px_hsl(24_95%_53%_/_0.2)]"
                          : "bg-neon-blue/20 border-neon-blue/50 text-neon-blue shadow-[0_0_15px_hsl(217_91%_60%_/_0.2)]"
                        : "bg-secondary/50 border-border/30 text-muted-foreground hover:border-border/60 hover:text-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Players slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-foreground">Expected Players / Users</label>
                <span className={`text-sm font-bold ${isGaming ? "text-primary" : "text-neon-blue"}`}>{players[0]}</span>
              </div>
              <Slider
                value={players}
                onValueChange={(v) => { setPlayers(v); setShowResult(false); }}
                min={1}
                max={200}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                <span>1</span>
                <span>200</span>
              </div>
            </div>

            {/* Mods/Plugins Level */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Plugins / Mods Level</label>
              <div className="flex flex-wrap gap-2">
                {modOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setMods(opt.value); setShowResult(false); }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
                      mods === opt.value
                        ? isGaming
                          ? "bg-primary/20 border-primary/50 text-primary shadow-[0_0_15px_hsl(24_95%_53%_/_0.2)]"
                          : "bg-neon-blue/20 border-neon-blue/50 text-neon-blue shadow-[0_0_15px_hsl(217_91%_60%_/_0.2)]"
                        : "bg-secondary/50 border-border/30 text-muted-foreground hover:border-border/60 hover:text-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Storage Requirement</label>
              <div className="flex flex-wrap gap-2">
                {storageOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setStorage(opt.value); setShowResult(false); }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
                      storage === opt.value
                        ? isGaming
                          ? "bg-primary/20 border-primary/50 text-primary shadow-[0_0_15px_hsl(24_95%_53%_/_0.2)]"
                          : "bg-neon-blue/20 border-neon-blue/50 text-neon-blue shadow-[0_0_15px_hsl(217_91%_60%_/_0.2)]"
                        : "bg-secondary/50 border-border/30 text-muted-foreground hover:border-border/60 hover:text-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculate button */}
            <Button
              onClick={() => setShowResult(true)}
              className={`w-full h-12 text-base font-semibold ${isGaming ? "btn-fire" : "btn-neon"}`}
              size="lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Get Recommendation
              </span>
            </Button>

            {/* Result card */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`rounded-2xl border p-6 sm:p-8 ${
                    isGaming
                      ? "border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card shadow-[0_0_40px_hsl(24_95%_53%_/_0.15)]"
                      : "border-neon-blue/30 bg-gradient-to-br from-neon-blue/10 via-card to-card shadow-[0_0_40px_hsl(217_91%_60%_/_0.15)]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className={`w-5 h-5 ${isGaming ? "text-primary" : "text-neon-blue"}`} />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recommended Plan</span>
                  </div>

                  <h3 className={`text-2xl sm:text-3xl font-extrabold mb-5 ${isGaming ? "text-fire-gradient" : "text-neon-gradient"}`}>
                    {recommendation.name}
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-card/60 border border-border/20">
                      <Cpu className={`w-5 h-5 ${isGaming ? "text-primary" : "text-neon-blue"} shrink-0`} />
                      <div>
                        <div className="text-xs text-muted-foreground">Processor</div>
                        <div className="text-sm font-semibold text-foreground">Intel Xeon Platinum 8168</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-card/60 border border-border/20">
                      <Server className={`w-5 h-5 ${isGaming ? "text-primary" : "text-neon-blue"} shrink-0`} />
                      <div>
                        <div className="text-xs text-muted-foreground">RAM</div>
                        <div className="text-sm font-semibold text-foreground">{recommendation.ram}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-card/60 border border-border/20">
                      <HardDrive className={`w-5 h-5 ${isGaming ? "text-primary" : "text-neon-blue"} shrink-0`} />
                      <div>
                        <div className="text-xs text-muted-foreground">Storage</div>
                        <div className="text-sm font-semibold text-foreground">{recommendation.storage}</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    <span className="font-medium text-foreground">Best for:</span> {recommendation.useCase}
                  </p>

                  <Button
                    onClick={openPopup}
                    size="lg"
                    className={`w-full sm:w-auto h-11 px-8 ${isGaming ? "btn-fire" : "btn-neon"}`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Deploy This Server
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
