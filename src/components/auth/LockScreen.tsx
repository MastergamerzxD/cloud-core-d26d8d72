import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Flame, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LockScreenProps {
  onUnlock: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const RELEASE_DATE = new Date("2026-03-07T00:00:00");

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = RELEASE_DATE.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "0703") {
      onUnlock();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setError(false);
      }, 600);
      setPassword("");
    }
  };

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative"
      >
        <div className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg sm:rounded-xl bg-gradient-to-br from-fire-orange/20 to-fire-red/20 border border-fire-orange/30 backdrop-blur-sm flex items-center justify-center">
          <span className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-fire-gradient">
            {value.toString().padStart(2, "0")}
          </span>
        </div>
        <div className="absolute -inset-1 bg-gradient-to-br from-fire-orange/20 to-fire-red/10 rounded-xl blur-lg -z-10" />
      </motion.div>
      <span className="mt-1.5 sm:mt-2 text-[10px] xs:text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-fire-orange/5" />
      
      {/* Glow effects - hidden on mobile for performance */}
      <div className="hidden sm:block absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-fire-orange/10 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-fire-red/10 rounded-full blur-3xl" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center w-full max-w-md mx-auto"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="mb-4 sm:mb-8"
        >
          <div className="relative">
            <Flame className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-fire-orange" />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-fire-orange/30 rounded-full blur-xl"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-1 sm:mb-2"
        >
          <span className="text-fire-gradient">Cloud on Fire</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-center mb-6 sm:mb-8 text-xs sm:text-sm md:text-base"
        >
          Something powerful is coming...
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6 sm:mb-8 w-full"
        >
          <p className="text-center text-[10px] xs:text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 uppercase tracking-widest">
            Launching March 7th, 2026
          </p>
          <div className="flex justify-center gap-2 xs:gap-3 sm:gap-4 md:gap-6">
            <TimeBlock value={timeLeft.days} label="Days" />
            <TimeBlock value={timeLeft.hours} label="Hours" />
            <TimeBlock value={timeLeft.minutes} label="Min" />
            <TimeBlock value={timeLeft.seconds} label="Sec" />
          </div>
        </motion.div>

        {/* Password Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full"
        >
          <div className="glass-card p-4 sm:p-6 rounded-xl sm:rounded-2xl">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-fire-orange mr-2" />
              <span className="text-xs sm:text-sm text-muted-foreground">Early Access</span>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <motion.div
                animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`text-center text-base sm:text-lg tracking-widest bg-background/50 border-2 transition-colors h-11 sm:h-12 ${
                    error ? "border-destructive" : "border-border focus:border-fire-orange"
                  }`}
                  autoFocus
                />
              </motion.div>
              
              <Button
                type="submit"
                className="w-full h-10 sm:h-11 bg-gradient-to-r from-fire-orange to-fire-red hover:from-fire-orange/90 hover:to-fire-red/90 text-white font-semibold text-sm sm:text-base"
              >
                <Unlock className="w-4 h-4 mr-2" />
                Unlock Preview
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 sm:mt-8 text-[10px] sm:text-xs text-muted-foreground/60 text-center"
        >
          High-Performance VPS Hosting • Coming Soon
        </motion.p>
      </motion.div>
    </div>
  );
}
