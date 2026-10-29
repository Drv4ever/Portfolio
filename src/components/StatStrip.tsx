"use client";

import * as React from "react";
import { stats } from "@/content";

export function StatStrip() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const [displayValues, setDisplayValues] = React.useState<number[]>(() =>
    stats.map(() => 0)
  );

  React.useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      setDisplayValues(stats.map((s) => s.value));
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const duration = 1600; // ms
            const startTime = performance.now();

            const frame = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutQuart
              const eased = 1 - Math.pow(1 - progress, 4);

              setDisplayValues(
                stats.map((s) => {
                  const val = s.value * eased;
                  return s.decimals > 0
                    ? Number(val.toFixed(s.decimals))
                    : Math.round(val);
                })
              );

              if (progress < 1) {
                requestAnimationFrame(frame);
              } else {
                setDisplayValues(stats.map((s) => s.value));
              }
            };

            requestAnimationFrame(frame);
          }
        });
      },
      { threshold: 0.25 }
    );

    const el = containerRef.current;
    if (el) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={containerRef}
      aria-label="Key Performance Metrics"
      className="my-12 rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm shadow-sm md:p-8"
    >
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8 divide-y divide-border/30 md:divide-y-0 md:divide-x md:divide-border/40">
        {stats.map((item, index) => {
          const formatted =
            item.decimals > 0
              ? displayValues[index].toFixed(item.decimals)
              : Math.round(displayValues[index]).toString();

          return (
            <div
              key={item.id}
              className={`flex flex-col ${index > 0 ? "pt-4 md:pt-0 md:pl-6" : ""}`}
            >
              <div className="flex items-baseline gap-1 font-mono text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                <span>{formatted}</span>
                {item.suffix && (
                  <span className="text-emerald-500 font-sans text-2xl">
                    {item.suffix}
                  </span>
                )}
              </div>
              <span className="mt-1 text-sm font-medium text-foreground">
                {item.label}
              </span>
              <span className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
