import { motion } from "framer-motion";
import { MapPin, Wifi } from "lucide-react";

export default function WorldMap() {
  return (
    <div className="relative">
      <div className="glass-card p-6 sm:p-10 rounded-2xl overflow-hidden">
        {/* SVG World Map - India focused */}
        <div className="relative w-full aspect-[2/1] sm:aspect-[3/1.2] min-h-[300px]">
          {/* Background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:30px_30px] rounded-xl" />
          
          {/* Simplified India outline */}
          <svg
            viewBox="0 0 800 400"
            className="absolute inset-0 w-full h-full"
            fill="none"
          >
            {/* World continents - very simplified outlines */}
            {/* Europe */}
            <path d="M340 80 L360 70 L380 80 L390 100 L380 130 L360 140 L340 130 L335 110 Z" fill="hsl(222 47% 12%)" stroke="hsl(222 47% 20%)" strokeWidth="0.5" opacity="0.4" />
            {/* Africa */}
            <path d="M350 150 L380 145 L400 160 L405 200 L395 250 L370 270 L350 260 L340 220 L345 180 Z" fill="hsl(222 47% 12%)" stroke="hsl(222 47% 20%)" strokeWidth="0.5" opacity="0.4" />
            {/* Asia / Russia */}
            <path d="M390 50 L500 40 L600 50 L650 80 L640 100 L580 110 L500 100 L420 90 L400 80 Z" fill="hsl(222 47% 12%)" stroke="hsl(222 47% 20%)" strokeWidth="0.5" opacity="0.4" />
            {/* Middle East */}
            <path d="M410 120 L440 115 L460 130 L455 150 L435 155 L415 145 Z" fill="hsl(222 47% 12%)" stroke="hsl(222 47% 20%)" strokeWidth="0.5" opacity="0.4" />
            {/* SE Asia */}
            <path d="M580 130 L620 120 L650 140 L640 170 L610 180 L585 165 Z" fill="hsl(222 47% 12%)" stroke="hsl(222 47% 20%)" strokeWidth="0.5" opacity="0.4" />
            {/* Americas */}
            <path d="M100 60 L170 50 L200 80 L190 120 L160 130 L130 115 L100 90 Z" fill="hsl(222 47% 12%)" stroke="hsl(222 47% 20%)" strokeWidth="0.5" opacity="0.4" />
            <path d="M140 140 L170 150 L180 190 L175 240 L160 280 L140 300 L120 280 L115 240 L125 190 Z" fill="hsl(222 47% 12%)" stroke="hsl(222 47% 20%)" strokeWidth="0.5" opacity="0.4" />
            {/* Australia */}
            <path d="M620 260 L680 250 L720 270 L710 300 L670 310 L630 295 Z" fill="hsl(222 47% 12%)" stroke="hsl(222 47% 20%)" strokeWidth="0.5" opacity="0.4" />

            {/* India - highlighted */}
            <path d="M470 130 L500 120 L530 130 L540 155 L535 185 L520 220 L500 240 L480 230 L470 200 L465 170 L460 150 Z" 
              fill="hsl(24 95% 53% / 0.15)" 
              stroke="hsl(24 95% 53%)" 
              strokeWidth="1.5" 
            />

            {/* Connection line between Delhi and Mumbai */}
            <motion.line
              x1="495" y1="155"
              x2="485" y2="195"
              stroke="hsl(24 95% 53%)"
              strokeWidth="2"
              strokeDasharray="6 4"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {/* Pulse rings - Delhi */}
            <motion.circle
              cx="495" cy="155"
              r="8"
              fill="none"
              stroke="hsl(24 95% 53%)"
              strokeWidth="1"
              animate={{ r: [8, 25], opacity: [0.8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.circle
              cx="495" cy="155"
              r="8"
              fill="none"
              stroke="hsl(24 95% 53%)"
              strokeWidth="1"
              animate={{ r: [8, 25], opacity: [0.8, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />

            {/* Pulse rings - Mumbai */}
            <motion.circle
              cx="485" cy="195"
              r="8"
              fill="none"
              stroke="hsl(24 95% 53%)"
              strokeWidth="1"
              animate={{ r: [8, 25], opacity: [0.8, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.circle
              cx="485" cy="195"
              r="8"
              fill="none"
              stroke="hsl(24 95% 53%)"
              strokeWidth="1"
              animate={{ r: [8, 25], opacity: [0.8, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            />

            {/* Location dots */}
            <circle cx="495" cy="155" r="5" fill="hsl(24 95% 53%)" />
            <circle cx="495" cy="155" r="3" fill="hsl(38 92% 50%)" />
            
            <circle cx="485" cy="195" r="5" fill="hsl(24 95% 53%)" />
            <circle cx="485" cy="195" r="3" fill="hsl(38 92% 50%)" />

            {/* Labels */}
            <text x="510" y="155" fill="hsl(210 40% 98%)" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif">Delhi</text>
            <text x="510" y="167" fill="hsl(215 20% 65%)" fontSize="9" fontFamily="Inter, sans-serif">Primary DC</text>
            
            <text x="500" y="198" fill="hsl(210 40% 98%)" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif">Mumbai</text>
            <text x="500" y="210" fill="hsl(215 20% 65%)" fontSize="9" fontFamily="Inter, sans-serif">Secondary DC</text>

            {/* Global connection lines from India */}
            {/* To Europe */}
            <motion.path
              d="M470 150 Q400 120 370 100"
              fill="none"
              stroke="hsl(24 95% 53% / 0.2)"
              strokeWidth="1"
              strokeDasharray="4 4"
              animate={{ strokeDashoffset: [0, -16] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            {/* To SE Asia */}
            <motion.path
              d="M535 170 Q570 155 600 150"
              fill="none"
              stroke="hsl(24 95% 53% / 0.2)"
              strokeWidth="1"
              strokeDasharray="4 4"
              animate={{ strokeDashoffset: [0, -16] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </svg>

          {/* Floating info cards */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="absolute top-4 left-4 glass-card px-3 py-2 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Wifi className="w-3 h-3 text-green-500" />
              <span className="text-[10px] sm:text-xs text-foreground font-medium">All locations connected</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-4 right-4 glass-card px-3 py-2 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-primary" />
              <span className="text-[10px] sm:text-xs text-foreground font-medium">Yotta Data Centers</span>
            </div>
          </motion.div>
        </div>

        {/* Location details */}
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <div className="glass-card p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm font-semibold text-foreground">Delhi (Primary)</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Yotta NM1 Data Center • Tier-3+ Certified • N+1 Power Redundancy • 
              Enterprise DDoS Mitigation • &lt;1ms local latency
            </p>
          </div>
          <div className="glass-card p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm font-semibold text-foreground">Mumbai (Secondary)</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Yotta D1 Data Center • Tier-3+ Certified • Redundant Connectivity • 
              Low-latency peering • Pan-India coverage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
