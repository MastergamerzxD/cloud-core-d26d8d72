import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setTimeout(() => setIsLoading(false), 200);
    };

    video.addEventListener("ended", handleEnded);

    // Fallback: hide after 4s even if video doesn't fire ended
    const fallback = setTimeout(() => setIsLoading(false), 4000);

    return () => {
      video.removeEventListener("ended", handleEnded);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
        >
          <video
            ref={videoRef}
            src="/videos/logo-animation.mp4"
            autoPlay
            muted
            playsInline
            className="h-full w-auto max-w-none object-contain sm:h-auto sm:w-full sm:max-h-screen"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
