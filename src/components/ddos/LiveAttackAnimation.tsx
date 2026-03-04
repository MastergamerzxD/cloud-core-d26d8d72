import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle, Zap } from "lucide-react";

interface AttackPacket {
  id: number;
  type: string;
  x: number;
  blocked: boolean;
  speed: number;
}

const attackTypes = ["UDP Flood", "SYN Flood", "HTTP Flood", "DNS Amp", "ICMP Flood", "NTP Amp"];

export default function LiveAttackAnimation() {
  const [packets, setPackets] = useState<AttackPacket[]>([]);
  const [stats, setStats] = useState({
    totalAttacks: 0,
    blocked: 0,
    mitigated: 0,
    activeThreats: 0,
  });
  const [currentAttack, setCurrentAttack] = useState("UDP Flood");
  const [trafficLevel, setTrafficLevel] = useState(0);
  const idRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate new packets
      const newPackets: AttackPacket[] = [];
      const count = Math.floor(Math.random() * 4) + 2;
      for (let i = 0; i < count; i++) {
        idRef.current++;
        newPackets.push({
          id: idRef.current,
          type: attackTypes[Math.floor(Math.random() * attackTypes.length)],
          x: Math.random() * 100,
          blocked: Math.random() > 0.05, // 95% blocked
          speed: Math.random() * 2 + 1,
        });
      }

      setPackets(prev => [...prev.slice(-30), ...newPackets]);
      setStats(prev => ({
        totalAttacks: prev.totalAttacks + count,
        blocked: prev.blocked + newPackets.filter(p => p.blocked).length,
        mitigated: Math.min(99.9, 95 + Math.random() * 5),
        activeThreats: Math.floor(Math.random() * 8) + 1,
      }));
      setTrafficLevel(Math.random() * 60 + 40);
      setCurrentAttack(attackTypes[Math.floor(Math.random() * attackTypes.length)]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Clean up old packets
  useEffect(() => {
    const cleanup = setInterval(() => {
      setPackets(prev => prev.slice(-20));
    }, 3000);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="relative">
      {/* Main visualization */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Live DDoS Mitigation</div>
              <div className="text-xs text-muted-foreground">Real-time attack simulation</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-green-500 font-medium">Protection Active</span>
          </div>
        </div>

        {/* Attack visualization area */}
        <div className="relative h-48 sm:h-64 mb-6 rounded-xl bg-secondary/30 border border-border/30 overflow-hidden">
          {/* Grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
          
          {/* Left: Attacker zone */}
          <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-destructive/20 border-2 border-destructive/50 flex items-center justify-center"
            >
              <AlertTriangle className="w-5 h-5 sm:w-7 sm:h-7 text-destructive" />
            </motion.div>
            <div className="text-[10px] sm:text-xs text-destructive font-medium text-center mt-2">Attacker</div>
          </div>

          {/* Center: Shield / Firewall */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 20px hsl(24 95% 53% / 0.3)",
                  "0 0 40px hsl(24 95% 53% / 0.5)",
                  "0 0 20px hsl(24 95% 53% / 0.3)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/20 border-2 border-primary flex items-center justify-center"
            >
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </motion.div>
            <div className="text-[10px] sm:text-xs text-primary font-semibold text-center mt-2">Cloud on Fire Shield</div>
          </div>

          {/* Right: Protected server */}
          <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 sm:w-7 sm:h-7 text-green-500" />
            </div>
            <div className="text-[10px] sm:text-xs text-green-500 font-medium text-center mt-2">Your Server</div>
          </div>

          {/* Animated attack packets */}
          <AnimatePresence mode="popLayout">
            {packets.slice(-12).map((packet) => (
              <motion.div
                key={packet.id}
                initial={{ x: "5%", y: `${20 + packet.x * 0.6}%`, opacity: 1, scale: 1 }}
                animate={packet.blocked ? {
                  x: "48%",
                  opacity: [1, 1, 0],
                  scale: [1, 1, 0.3],
                  y: `${20 + packet.x * 0.6}%`,
                } : {
                  x: "85%",
                  opacity: [1, 0.8, 0.3],
                  y: `${20 + packet.x * 0.6}%`,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: packet.speed, ease: "linear" }}
                className={`absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                  packet.blocked ? "bg-destructive shadow-[0_0_8px_hsl(0_84%_60%/0.6)]" : "bg-yellow-500"
                }`}
              />
            ))}
          </AnimatePresence>

          {/* Blocked indicator flashes */}
          <motion.div
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.8 }}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-primary/40 blur-sm"
          />
        </div>


        {/* Traffic bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Incoming Malicious Traffic</span>
            <span className="text-destructive font-medium">{trafficLevel.toFixed(0)} Gbps</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${trafficLevel}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-destructive via-primary to-green-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
