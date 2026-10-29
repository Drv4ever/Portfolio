"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { spotlightProject } from "@/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Github,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  ArrowRight,
} from "lucide-react";

const TestSplitDonut = dynamic(
  () => import("./TestSplitDonut").then((m) => m.TestSplitDonut),
  {
    ssr: false,
    loading: () => (
      <div className="h-44 w-full flex items-center justify-center font-mono text-xs text-muted-foreground">
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
      className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-card to-card/60 p-6 shadow-lg backdrop-blur-sm sm:p-8 md:p-10"
    >
      {/* Decorative accent glow */}
      <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Header Bar: Status & Links */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-6">
        <div className="flex items-center gap-3">
          <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/30 gap-1.5 px-3 py-1 font-mono text-xs dark:text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Active Project
          </Badge>
          <span className="font-mono text-xs text-muted-foreground">
            12 Themes Engineered
          </span>
        </div>

        <div className="flex items-center gap-2">
          {project.github && (
            <Button asChild variant="outline" size="sm" className="rounded-full gap-1.5 text-xs">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label="SlideOS GitHub Repository"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
            </Button>
          )}

          {project.live && (
            <Button asChild size="sm" className="rounded-full gap-1.5 text-xs bg-emerald-700 hover:bg-emerald-600 text-white shadow-sm">
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                aria-label="SlideOS Live Demo Application"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Live Demo</span>
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Title & Tagline */}
      <div className="pt-6 space-y-3">
        <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
          {project.title}
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          {project.tagline}
        </p>
      </div>

      {/* Pipeline Diagram */}
      <div className="mt-8 rounded-2xl border border-border/60 bg-background/50 p-5 backdrop-blur-sm sm:p-6">
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-emerald-500" />
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
              Deterministic Generation & Layout Pipeline
            </h3>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">
            End-to-End Flow
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
          {project.architectureSteps?.map((step, idx) => (
            <div
              key={step.step}
              className="relative flex flex-col justify-between rounded-xl border border-border/50 bg-card/80 p-3.5 text-left transition-all hover:border-emerald-500/40 hover:bg-accent/30"
            >
              <div>
                <div className="flex items-center justify-between pb-2">
                  <span className="font-mono text-[10px] font-bold text-emerald-500">
                    0{step.step}
                  </span>
                  {idx < 4 && (
                    <ArrowRight className="hidden sm:block h-3.5 w-3.5 text-muted-foreground/60" />
                  )}
                </div>
                <h4 className="text-xs font-semibold text-foreground">
                  {step.title}
                </h4>
                <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Section: Security & Test Donut Split */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left 7 cols: Technical Details & Security Highlights */}
        <div className="space-y-4 lg:col-span-7">
          <div className="rounded-2xl border border-border/50 bg-background/40 p-5 space-y-3">
            <div className="flex items-center gap-2 text-foreground font-medium text-sm">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Authentication & Access Security</span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Engineered with <strong>JWT</strong> and <strong>bcrypt</strong> password hashing alongside <strong>Google OAuth 2.0</strong>. Decks enforce owner-only write permissions while generating tamper-resistant, public read-only share links that completely shield user database IDs.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Resume Key Contributions
            </h4>
            <ul className="space-y-2 text-xs leading-relaxed text-muted-foreground">
              {project.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right 5 cols: Test Split Donut Chart */}
        <div className="flex flex-col justify-between rounded-2xl border border-border/50 bg-background/40 p-5 lg:col-span-5">
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <div>
              <h4 className="text-xs font-semibold text-foreground">
                Automated Test Split
              </h4>
              <p className="text-[11px] text-muted-foreground">
                209 Total Verified Tests
              </p>
            </div>
            <Badge variant="outline" className="font-mono text-[10px]">
              100% Pass Rate
            </Badge>
          </div>

          {mounted ? (
            <TestSplitDonut />
          ) : (
            <div className="h-44 w-full flex items-center justify-center font-mono text-xs text-muted-foreground">
              Loading test breakdown...
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 pt-2 text-center text-xs">
            <div className="rounded-lg border border-border/40 bg-card/60 p-2">
              <span className="flex items-center justify-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Vitest (Frontend)
              </span>
              <span className="font-mono text-sm font-bold text-foreground">
                131 tests
              </span>
            </div>
            <div className="rounded-lg border border-border/40 bg-card/60 p-2">
              <span className="flex items-center justify-center gap-1.5 font-medium text-indigo-500">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                Jest (Backend)
              </span>
              <span className="font-mono text-sm font-bold text-foreground">
                78 tests
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Footer Badges */}
      <div className="mt-6 flex flex-wrap items-center gap-1.5 border-t border-border/40 pt-4">
        {project.techStack.map((tech) => (
          <Badge
            key={tech}
            variant="secondary"
            className="font-mono text-[11px] px-2.5 py-0.5 border border-border/40"
          >
            {tech}
          </Badge>
        ))}
      </div>
    </article>
  );
}
