"use client";

import * as React from "react";
import { learningProjects as defaultProjects } from "@/content";
import { Project } from "@/content/schema";
import { ExternalLink, Github, BookOpen } from "lucide-react";

interface LearningProjectsProps {
  projects?: Project[];
  onHover?: (project: Project | null) => void;
}

function LearningProjectItem({
  project,
  onHover,
}: {
  project: Project;
  onHover?: (project: Project | null) => void;
}) {
  return (
    <article
      onMouseEnter={() => onHover?.(project)}
      onMouseLeave={() => onHover?.(null)}
      className="group rounded-lg border border-border bg-card p-5 space-y-2.5 transition-all hover:border-emerald-500/40"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/40 pb-2.5">
        <h4 className="text-base sm:text-lg font-bold text-foreground">
          {project.title}
        </h4>
        <div className="flex items-center gap-2 font-mono text-xs">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1 font-mono font-bold transition-colors"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Code</span>
              <span className="sr-only"> repository for {project.title}</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1 font-mono font-bold transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Demo</span>
              <span className="sr-only"> for {project.title}</span>
            </a>
          )}
        </div>
      </div>

      <p className="font-mono text-[10px] font-bold text-muted-foreground uppercase">
        Backend Cryptography Practice
      </p>

      {/* Concise 3-4 Liner Description */}
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 pt-0.5">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="font-mono rounded border border-border bg-background px-2.5 py-0.5 text-[11px] font-semibold text-foreground/90"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}

export function LearningProjects({
  projects = defaultProjects,
  onHover,
}: LearningProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center gap-2">
        <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Foundational & Learning Projects
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {projects.map((project) => (
          <LearningProjectItem key={project.id} project={project} onHover={onHover} />
        ))}
      </div>
    </div>
  );
}
