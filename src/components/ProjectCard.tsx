"use client";

import * as React from "react";
import { Project } from "@/content/schema";
import { ExternalLink, Github, Workflow } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [, setIsHovered] = React.useState(false);
  const [, setCanTilt] = React.useState(false);

  React.useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanTilt(hasFinePointer && !isReduced);
  }, []);

  const handleMouseMove = () => {
    // Pure handler for interactive pointer feedback
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="rounded-lg border border-border bg-card p-6 space-y-3 transition-colors hover:border-emerald-500/40"
    >
      {/* Header Row: Title, Links, and Category */}
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-lg font-medium text-foreground">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-500 transition-colors"
            >
              {project.title}
            </a>
          </h3>

          <div className="flex items-center gap-2 font-mono text-xs">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} Live Demo`}
                className="text-emerald-500 border border-emerald-500/30 bg-emerald-500/10 rounded px-1.5 py-0.5 hover:bg-emerald-500/20 transition-colors flex items-center gap-1"
              >
                <span>Live</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} GitHub Repository`}
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <span>GitHub</span>
                <Github className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        <span className="font-mono text-xs text-muted-foreground">
          {project.shortTitle}
        </span>
      </div>

      {/* Tagline */}
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {project.tagline}
      </p>

      {/* Tech Stack Chips (Maanas Tyagi monospace pill style) */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="font-mono rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* En-Dash Bullets */}
      <ul className="flex flex-col gap-1.5 pt-2">
        {project.bullets.map((bullet, idx) => (
          <li key={idx} className="flex gap-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            <span className="text-emerald-500 shrink-0">–</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Card Footer: Architecture Inspect Trigger */}
      <div className="pt-2 border-t border-border/40 flex items-center justify-end">
        <button
          type="button"
          onClick={() => onSelect(project)}
          aria-label={`Inspect architecture of ${project.title}`}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-emerald-500 transition-colors"
        >
          <Workflow className="h-3.5 w-3.5" />
          <span>Inspect Architecture & Spec ↗</span>
        </button>
      </div>
    </article>
  );
}
