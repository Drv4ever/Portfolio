"use client";

import * as React from "react";
import { StageshowChrome } from "./StageshowChrome";
import { Sparkles, Download, Layers, Layout } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    title: "Autonomous Agent Orchestration",
    subtitle: "End-to-end multi-model tool calls & JSON schema enforcement",
    badge: "Architecture",
    bullets: [
      "Groq Llama-3.3-70B ultra-low latency inference",
      "Strict JSON outlines validated by Zod schema",
      "Dynamic token streaming with zero hydration mismatch",
    ],
    metric: "840 t/s",
    metricLabel: "Inference Speed",
  },
  {
    id: 2,
    title: "Dynamic Presentation Engine",
    subtitle: "Canvas layout compilation with 12 theme presets",
    badge: "Renderer",
    bullets: [
      "12 handcrafted visual design styles & palettes",
      "Automated aspect ratio clamping (16:9 & 4:3)",
      "Instant dual export to native PDF & editable PPTX",
    ],
    metric: "< 250ms",
    metricLabel: "Compile Time",
  },
  {
    id: 3,
    title: "Fault-Tolerant State & Sync",
    subtitle: "Realtime client undo/redo with local snapshot persistence",
    badge: "State Tree",
    bullets: [
      "Optimistic canvas updates with microtask queuing",
      "IndexedDB offline fallback session buffer",
      "Full keyboard navigation & screen-reader aria tree",
    ],
    metric: "100%",
    metricLabel: "WCAG Compliant",
  },
];

export function SlideOSStage({ className = "" }: { className?: string }) {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const slide = SLIDES[activeSlide];

  return (
    <StageshowChrome
      url="slide-os.vercel.app/editor"
      statusBadge="v2.4 Ready"
      className={className}
    >
      <div className="bg-background/95 text-foreground flex flex-col font-sans select-none">
        {/* Editor Toolbar */}
        <div className="flex items-center justify-between border-b border-border/40 bg-secondary/30 px-3 py-1.5 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-emerald-500 font-bold text-[10px]">
              <Sparkles className="h-3 w-3" />
              <span>AI Engine</span>
            </span>
            <span className="hidden sm:flex items-center gap-1 text-[10px] text-muted-foreground border border-border/50 rounded px-1.5 py-0.5">
              <Layers className="h-2.5 w-2.5" />
              <span>12 Themes</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="text-muted-foreground hidden sm:inline">Export:</span>
            <span className="flex items-center gap-1 rounded bg-secondary px-2 py-0.5 font-bold text-foreground">
              <Download className="h-2.5 w-2.5" />
              <span>PDF • PPTX</span>
            </span>
          </div>
        </div>

        {/* Main Workspace: Left Thumbnail Rail + Active Slide Canvas */}
        <div className="grid grid-cols-12 min-h-[190px] sm:min-h-[220px]">
          {/* Slide Thumbnail Rail */}
          <div className="col-span-4 sm:col-span-3 border-r border-border/40 bg-secondary/15 p-2 space-y-1.5">
            <div className="text-[9px] font-mono text-muted-foreground px-1 uppercase tracking-wider">
              Slides ({SLIDES.length})
            </div>
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveSlide(idx)}
                className={`w-full rounded-md border text-left p-1.5 transition-all cursor-pointer ${
                  activeSlide === idx
                    ? "border-emerald-500/60 bg-emerald-500/10 shadow-xs"
                    : "border-border/40 hover:border-border hover:bg-secondary/40"
                }`}
              >
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className={activeSlide === idx ? "text-emerald-500 font-bold" : "text-muted-foreground"}>
                    0{s.id}
                  </span>
                  <span className="text-[8px] text-muted-foreground hidden sm:inline">{s.badge}</span>
                </div>
                <div className="text-[10px] font-medium text-foreground truncate pt-0.5">
                  {s.title}
                </div>
              </button>
            ))}
          </div>

          {/* Active Slide Canvas Viewport */}
          <div className="col-span-8 sm:col-span-9 p-3 sm:p-4 flex flex-col justify-between bg-card/40">
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-border/30 pb-1.5">
                <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-500 font-bold flex items-center gap-1">
                  <Layout className="h-3 w-3" />
                  <span>{slide.badge} Slide • 16:9 HD</span>
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  Slide {activeSlide + 1} of {SLIDES.length}
                </span>
              </div>

              <div>
                <div className="text-xs sm:text-sm font-extrabold text-foreground tracking-tight">
                  {slide.title}
                </div>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground pt-0.5">
                  {slide.subtitle}
                </p>
              </div>

              <ul className="space-y-1 pt-1 text-[10px] text-muted-foreground">
                {slide.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">›</span>
                    <span className="leading-tight">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Slide Footer Stat */}
            <div className="flex items-center justify-between pt-2 border-t border-border/30 font-mono text-[9px] text-muted-foreground">
              <span>Status: Built with Next.js & TypeScript</span>
              <span className="text-emerald-500 font-bold">
                {slide.metricLabel}: {slide.metric}
              </span>
            </div>
          </div>
        </div>
      </div>
    </StageshowChrome>
  );
}
