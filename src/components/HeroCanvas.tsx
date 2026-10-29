"use client";

import * as React from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
}

export function createPoints(width: number, height: number, count: number): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < count; i++) {
    points.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      baseAlpha: Math.random() * 0.4 + 0.15,
    });
  }
  return points;
}

export function HeroCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isSupported, setIsSupported] = React.useState(false);

  React.useEffect(() => {
    // Check for reduced motion or touch devices
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isReduced || isTouch) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    let mouseX = -1000;
    let mouseY = -1000;
    let animationFrameId: number;

    const points = createPoints(width, height, 45);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const onResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 600;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connections
      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];

        // Update position
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce walls
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Mouse reactive displacement
        const dx = mouseX - p1.x;
        const dy = mouseY - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          p1.x -= (dx / dist) * force * 1.5;
          p1.y -= (dy / dist) * force * 1.5;
        }

        // Draw point
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${p1.baseAlpha})`;
        ctx.fill();

        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const cdx = p1.x - p2.x;
          const cdy = p1.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < 90) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.12 * (1 - cdist / 90)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden -z-10"
      aria-hidden="true"
    >
      {/* Ambient static backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.04] via-transparent to-transparent dark:from-emerald-500/[0.03]" />

      {/* Reactive canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full transition-opacity duration-700 ${
          isSupported ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
