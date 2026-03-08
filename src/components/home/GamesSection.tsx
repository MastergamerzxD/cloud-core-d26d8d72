import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import gameMinecraft from "@/assets/game-minecraft.jpg";
import gameFivem from "@/assets/game-fivem.jpg";
import gameHytale from "@/assets/game-hytale.jpg";

const games = [
  {
    name: "Minecraft",
    image: gameMinecraft,
    description: "Host SMP worlds, modpacks, and large communities with powerful performance and low latency.",
    color: "from-green-500/30 to-green-700/10",
    border: "hover:border-green-500/40",
    glow: "group-hover:shadow-[0_0_30px_hsl(142_76%_36%/0.2)]",
  },
  {
    name: "FiveM",
    image: gameFivem,
    description: "Run high-performance FiveM servers with heavy scripts, custom maps, and roleplay communities.",
    color: "from-orange-500/30 to-red-600/10",
    border: "hover:border-primary/40",
    glow: "group-hover:shadow-[0_0_30px_hsl(24_95%_53%/0.2)]",
  },
  {
    name: "Hytale",
    image: gameHytale,
    description: "Prepare for next-gen sandbox multiplayer with infrastructure optimized for Hytale worlds.",
    color: "from-cyan-400/30 to-blue-600/10",
    border: "hover:border-neon-cyan/40",
    glow: "group-hover:shadow-[0_0_30px_hsl(187_92%_55%/0.2)]",
  },
  {
    name: "Rust",
    image: null,
    description: "Dedicated Rust servers with anti-DDoS protection and optimized performance for large maps.",
    color: "from-red-500/30 to-orange-700/10",
    border: "hover:border-fire-red/40",
    glow: "group-hover:shadow-[0_0_30px_hsl(4_90%_58%/0.2)]",
    emoji: "🔫",
  },
  {
    name: "Terraria",
    image: null,
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

        {/* Top 3 big cards with images */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {games.slice(0, 3).map((game, index) => (
            <motion.div
              key={game.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glow-card !rounded-2xl overflow-hidden group ${game.border} ${game.glow} transition-all duration-500`}
            >
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={game.image!}
                  alt={`${game.name} Server Hosting`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${game.color} to-transparent`} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">{game.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{game.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom 2 smaller cards */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {games.slice(3).map((game, index) => (
            <motion.div
              key={game.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
              className={`glow-card !rounded-2xl p-5 sm:p-6 group ${game.border} ${game.glow} transition-all duration-500`}
            >
              <div className="text-3xl mb-3">{game.emoji}</div>
              <h3 className="text-lg font-bold text-foreground mb-2">{game.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{game.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
