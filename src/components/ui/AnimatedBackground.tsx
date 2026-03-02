import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.3 + 0.05;
        const colors = ["255, 140, 50", "255, 100, 50", "255, 180, 80"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 25000));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.08;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 140, 50, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      connectParticles();
      animationId = requestAnimationFrame(animate);
    };

    resize();
    init();
    animate();

    const handleResize = () => { resize(); init(); };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Data center background image - subtle */}
      <div 
        className="fixed inset-0 -z-20 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: "url('/images/datacenter-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "saturate(0.3) brightness(0.6)",
        }}
      />

      {/* Multi-layer dark overlays for depth — heavier at top & bottom, lighter in middle */}
      <div 
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, 
              hsl(222 47% 6% / 0.97) 0%, 
              hsl(222 47% 6% / 0.88) 15%, 
              hsl(222 47% 6% / 0.82) 35%, 
              hsl(222 47% 8% / 0.78) 50%, 
              hsl(222 47% 6% / 0.85) 70%, 
              hsl(222 47% 6% / 0.95) 100%
            )
          `,
        }}
      />

      {/* Subtle blue-ish tint that blends with the datacenter blues */}
      <div 
        className="fixed inset-0 -z-20 pointer-events-none opacity-[0.04]"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, 
              hsl(220 60% 40%) 0%, 
              transparent 70%
            )
          `,
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 pointer-events-none"
      />

      {/* Very faint grid */}
      <div 
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </>
  );
}
