"use client";

import * as React from "react";
import { learningProjects as defaultProjects } from "@/content";
import { Project } from "@/content/schema";
import { ExternalLink, Github, BookOpen, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ProjectLandingPreview } from "./ProjectLandingPreview";

interface LearningProjectsProps {
  projects?: Project[];
}

function LearningProjectItem({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);
  const isPreviewActive = isHovered || showPreview;

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

      {/* Hover preview trigger bar */}
      <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-muted-foreground/75">
        <button
          type="button"
          onClick={() => setShowPreview((prev) => !prev)}
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"
        >
          <Eye className="h-3 w-3 text-emerald-500" />
          <span>{isPreviewActive ? "Hide Landing Page" : "Hover or click to preview landing page"}</span>
        </button>
        {project.live && (
          <span className="text-emerald-500 font-bold truncate max-w-[150px]">
            {project.live.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
        )}
      </div>

      {/* Animated Landing Page Preview on Hover */}
      <AnimatePresence>
        {isPreviewActive && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.98 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <ProjectLandingPreview project={project} />
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export function LearningProjects({ projects = defaultProjects }: LearningProjectsProps) {
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
          <LearningProjectItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
