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
    // Interactive pointer feedback
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
      className="rounded-lg border border-border bg-card p-6 space-y-3 transition-colors hover:border-border/80"
    >
      {/* Header Row: Title, Links, and Category */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/40 pb-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="text-base sm:text-lg font-bold text-foreground">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors underline decoration-1 decoration-border underline-offset-4 hover:decoration-foreground"
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
                className="text-emerald-500 font-bold border border-emerald-500/20 bg-emerald-500/10 rounded px-1.5 py-0.5 hover:bg-emerald-500/20 transition-colors flex items-center gap-1"
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
                className="text-muted-foreground hover:text-foreground font-bold transition-colors flex items-center gap-1"
              >
                <span>GitHub</span>
                <Github className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        <span className="font-mono text-xs font-semibold text-muted-foreground">
          {project.shortTitle}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {project.description}
      </p>

      {/* Tech Stack Chips */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="font-mono rounded border border-border bg-background px-2.5 py-0.5 text-[11px] font-semibold text-foreground/90"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* En-Dash Bullets */}
      <ul className="flex flex-col gap-1.5 pt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">
        {project.bullets.map((bullet, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="text-muted-foreground shrink-0 font-bold">–</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Architecture Spec Trigger */}
      <div className="pt-2 border-t border-border/40 flex items-center justify-end">
        <button
          type="button"
          onClick={() => onSelect(project)}
          aria-label={`Inspect Architecture & Spec for ${project.title}`}
          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <Workflow className="h-3.5 w-3.5" />
          <span>Inspect Architecture & Spec ↗</span>
        </button>
      </div>
    </article>
  );
}
