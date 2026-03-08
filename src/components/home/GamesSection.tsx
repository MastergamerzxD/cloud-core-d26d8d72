import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import gameMinecraft from "@/assets/game-minecraft.jpg";
import gameFivem from "@/assets/game-fivem.jpg";
import gameHytale from "@/assets/game-hytale.jpg";
import gameRust from "@/assets/game-rust.jpg";

const games = [
  {
    name: "Minecraft",
    image: gameMinecraft,
    alt: "Minecraft server hosting on Cloud on Fire gaming VPS India with Intel Xeon Platinum processors",
    description: "Host SMP worlds, modpacks, and large communities with powerful performance and low latency.",
    color: "from-green-500/30 to-green-700/10",
    border: "hover:border-green-500/40",
    glow: "group-hover:shadow-[0_0_30px_hsl(142_76%_36%/0.2)]",
  },
  {
    name: "FiveM",
    image: gameFivem,
    alt: "FiveM GTA RP server hosting on Cloud on Fire gaming VPS with DDoS protection India",
    description: "Run high-performance FiveM servers with heavy scripts, custom maps, and roleplay communities.",
    color: "from-orange-500/30 to-red-600/10",
    border: "hover:border-primary/40",
    glow: "group-hover:shadow-[0_0_30px_hsl(24_95%_53%/0.2)]",
  },
  {
    name: "Hytale",
    image: gameHytale,
    alt: "Hytale game server hosting on Cloud on Fire gaming VPS with NVMe SSD storage India",
    description: "Prepare for next-gen sandbox multiplayer with infrastructure optimized for Hytale worlds.",
    color: "from-cyan-400/30 to-blue-600/10",
    border: "hover:border-neon-cyan/40",
    glow: "group-hover:shadow-[0_0_30px_hsl(187_92%_55%/0.2)]",
  },
  {
    name: "Rust",
    image: gameRust,
    alt: "Rust survival game server hosting on Cloud on Fire gaming VPS with advanced DDoS protection India",
    description: "Dedicated Rust servers with anti-DDoS protection and optimized performance for large maps and intense PvP.",
    color: "from-red-500/30 to-orange-700/10",
    border: "hover:border-fire-red/40",
    glow: "group-hover:shadow-[0_0_30px_hsl(4_90%_58%/0.2)]",
  },
  {
    name: "Terraria",
    image: null,
    alt: "Terraria multiplayer server hosting India",
    description: "Host Terraria servers for your friends with smooth multiplayer and modding support.",
    color: "from-purple-500/30 to-indigo-600/10",
    border: "hover:border-neon-purple/40",
    glow: "group-hover:shadow-[0_0_30px_hsl(270_76%_60%/0.2)]",
    emoji: "⛏️",
  },
];

export default function GamesSection() {
  return (
    <section className="section-padding bg-card/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="container-wide relative">
        <SectionHeader
          badge="Game Servers"
          title="Optimized for Your Favorite Games"
          description="Deploy game servers in minutes with enterprise hardware, low latency networking, and always-on DDoS protection."
        />

        {/* Top 4 big cards with images */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-4 sm:mb-6">
          {games.slice(0, 4).map((game, index) => (
            <motion.div
              key={game.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`glow-card !rounded-2xl overflow-hidden group ${game.border} ${game.glow} transition-all duration-500`}
            >
              <div className="relative h-36 sm:h-44 overflow-hidden">
                <img
                  src={game.image!}
                  alt={game.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${game.color} to-transparent`} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-1.5">{game.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{game.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom smaller card + CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 max-w-3xl mx-auto">
          {games.slice(4).map((game, index) => (
            <motion.div
              key={game.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index + 4) * 0.08 }}
              className={`glow-card !rounded-2xl p-5 sm:p-6 group ${game.border} ${game.glow} transition-all duration-500 flex-1 w-full`}
            >
              <div className="text-3xl mb-3">{game.emoji}</div>
              <h3 className="text-lg font-bold text-foreground mb-2">{game.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{game.description}</p>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex-1 w-full text-center sm:text-left"
          >
            <p className="text-sm text-muted-foreground mb-3">
              Host <strong className="text-foreground">Minecraft, FiveM, Rust, Hytale</strong> and more on gaming-optimized VPS.
            </p>
            <Link to="/gaming-vps">
              <Button variant="outline" className="group text-sm">
                Explore Gaming VPS Plans
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
