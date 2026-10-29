"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { spotlightProject } from "@/content";
import { ExternalLink, Github, ShieldCheck, ArrowRight } from "lucide-react";

const TestSplitDonut = dynamic(
  () => import("./TestSplitDonut").then((m) => m.TestSplitDonut),
  {
    ssr: false,
    loading: () => (
      <div className="h-32 w-full flex items-center justify-center font-mono text-xs text-muted-foreground">
        Loading test breakdown...
      </div>
    ),
  }
);

export function SlideOSSpotlight({
  project = spotlightProject,
}: {
  project?: typeof spotlightProject | null;
} = {}) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!project) return null;

  return (
    <article
      id="slideos-spotlight"
      aria-label="SlideOS Spotlight Project"
      className="rounded-lg border border-border bg-card p-6 space-y-5"
    >
      {/* Header Row: Title, Badges, Links */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border/50 pb-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
            <a
              href="https://slide-os.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-500 transition-colors"
            >
              {project.title}
            </a>
          </h2>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-500 border border-emerald-500/30 bg-emerald-500/10 rounded px-2 py-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active Project
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            12 Themes Engineered
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label="SlideOS GitHub Repository"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub ↗</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              aria-label="SlideOS Live Demo Application"
              className="text-emerald-500 hover:underline flex items-center gap-1 font-medium"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Live Demo ↗</span>
            </a>
          )}
        </div>
      </div>

      {/* Tagline */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {project.tagline}
      </p>

      {/* Tech Stack Chips (Maanas Tyagi monospace pill style) */}
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="font-mono rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Crisp En-Dash Bullets */}
      <ul className="flex flex-col gap-2 pt-1">
        {project.bullets.map((bullet, idx) => (
          <li key={idx} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
            <span className="text-emerald-500 shrink-0">–</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Deterministic Pipeline Flow (Minimal Monospace Flow) */}
      <div className="rounded border border-border/60 bg-background/50 p-4 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span className="text-foreground font-medium uppercase tracking-wider text-[11px]">
            Deterministic Generation & Layout Pipeline
          </span>
          <span>End-to-End Flow</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs font-mono">
          {project.architectureSteps?.map((step, idx) => (
            <div
              key={step.step}
              className="rounded border border-border/40 bg-card p-2.5 space-y-1"
            >
              <div className="flex items-center justify-between text-[10px] text-emerald-500">
                <span>0{step.step}</span>
                {idx < 4 && <ArrowRight className="hidden sm:inline h-3 w-3 text-muted-foreground/50" />}
              </div>
              <p className="font-semibold text-foreground text-[11px]">{step.title}</p>
              <p className="text-[10px] text-muted-foreground leading-snug">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Security & Test Breakdown Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-1">
        {/* Security Details */}
        <div className="sm:col-span-7 rounded border border-border/50 bg-background/30 p-3.5 space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 font-medium text-foreground">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Authentication & Access Security</span>
          </div>
          <p className="text-muted-foreground leading-relaxed text-[11px]">
            Engineered with <strong>JWT</strong> and <strong>bcrypt</strong> password hashing alongside <strong>Google OAuth 2.0</strong>. Decks enforce owner-only write permissions while generating tamper-resistant, public read-only share links that completely shield user database IDs.
          </p>
        </div>

        {/* Test Verification Split */}
        <div className="sm:col-span-5 rounded border border-border/50 bg-background/30 p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-medium text-foreground">Automated Test Split</span>
            <span className="text-emerald-500 text-[11px]">209 Total Verified Tests</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
            <div className="rounded border border-border/40 bg-card p-1.5">
              <span className="text-[10px] text-muted-foreground block">Vitest (Frontend)</span>
              <span className="font-semibold text-foreground text-xs">131 tests</span>
            </div>
            <div className="rounded border border-border/40 bg-card p-1.5">
              <span className="text-[10px] text-muted-foreground block">Jest (Backend)</span>
              <span className="font-semibold text-foreground text-xs">78 tests</span>
            </div>
          </div>
          <div className="opacity-0 h-0 overflow-hidden" aria-hidden="true">
            {mounted && <TestSplitDonut />}
          </div>
        </div>
      </div>
    </article>
  );
}
