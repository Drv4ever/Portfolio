"use client";

import * as React from "react";
import { spotlightProject } from "@/content";
import { ExternalLink, Github } from "lucide-react";

export function SlideOSSpotlight({
  project = spotlightProject,
}: {
  project?: typeof spotlightProject | null;
} = {}) {
  if (!project) return null;

  return (
    <article
      id="slideos-spotlight"
      aria-label="SlideOS Spotlight Project"
      className="rounded-lg border border-border bg-card p-6 space-y-3.5 transition-colors hover:border-border/80"
    >
      {/* Header Row: Title, Badges, Links */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border/40 pb-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <h2 className="text-lg sm:text-xl font-medium tracking-tight text-foreground">
            <a
              href="https://slide-os.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors underline decoration-1 decoration-border underline-offset-4 hover:decoration-foreground"
            >
              {project.title}
            </a>
          </h2>
          <span className="font-mono text-xs text-emerald-500 border border-emerald-500/20 bg-emerald-500/10 rounded px-2 py-0.5">
            Active Project
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

      {/* Simple Description (Clean & Focused) */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      {/* Tech Stack Chips (Clean Amaan style) */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="font-mono rounded border border-border bg-background px-2 py-0.5 text-[11px] text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Simple En-Dash Bullets */}
      <ul className="flex flex-col gap-1.5 pt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {project.bullets.map((bullet, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="text-muted-foreground shrink-0">–</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
