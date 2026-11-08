"use client";

import * as React from "react";
import { Project } from "@/content/schema";
import { ExternalLink, Github, Workflow } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  onHover?: (project: Project | null) => void;
}

export function ProjectCard({ project, onSelect, onHover }: ProjectCardProps) {
  const handleMouseEnter = () => {
    onHover?.(project);
  };

  const handleMouseLeave = () => {
    onHover?.(null);
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group rounded-xl border border-border/70 bg-card p-5 sm:p-6 space-y-3 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-[0_8px_24px_rgba(249,115,22,0.1)] shadow-sm"
    >
      {/* Header Row: Title, Links, and Category */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/40 pb-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="retro-project-title text-xl sm:text-2xl font-bold text-foreground">
            <a
              href={project.live || project.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-400 transition-colors underline decoration-1 decoration-border underline-offset-4 hover:decoration-orange-400"
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
                className="retro-pixel text-[9px] text-orange-500 font-bold border border-orange-500/20 bg-orange-500/10 rounded-full px-2 py-0.5 hover:bg-orange-500/20 transition-colors flex items-center gap-1"
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

        <span className="retro-pixel text-[10px] font-semibold text-muted-foreground">
          {project.shortTitle}
        </span>
      </div>

      {/* Concise 3-4 Liner Description */}
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {project.description}
      </p>

      {/* Tech Stack Pills in Amaan style */}
      <div className="flex flex-wrap gap-1.5 pt-0.5">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="font-mono rounded-full border border-border/60 bg-secondary/70 px-2.5 py-0.5 text-[11px] font-medium text-foreground/80 transition-all hover:bg-secondary hover:border-orange-500/30"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Architecture Spec & Preview Footer */}
      <div className="pt-2 border-t border-border/40 flex items-center justify-between font-mono text-xs">
        <span className="text-[10px] text-muted-foreground hidden sm:inline flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span>hover for live preview</span>
        </span>

        <button
          type="button"
          onClick={() => onSelect(project)}
          aria-label={`Inspect Architecture & Spec for ${project.title}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-orange-400 transition-colors cursor-pointer"
        >
          <Workflow className="h-3.5 w-3.5" />
          <span>Inspect Architecture & Spec ↗</span>
        </button>
      </div>
    </article>
  );
}
