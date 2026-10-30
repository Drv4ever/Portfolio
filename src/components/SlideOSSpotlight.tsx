"use client";

import * as React from "react";
import { spotlightProject } from "@/content";
import { ExternalLink, Github, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ProjectLandingPreview } from "./ProjectLandingPreview";

export function SlideOSSpotlight({
  project = spotlightProject,
}: {
  project?: typeof spotlightProject | null;
} = {}) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);

  if (!project) return null;

  const isPreviewActive = isHovered || showPreview;

  return (
    <article
      id="slideos-spotlight"
      aria-label="SlideOS Spotlight Project"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group rounded-lg border border-border bg-card p-6 space-y-3.5 transition-all hover:border-emerald-500/40"
    >
      {/* Header Row: Title, Badges, Links */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border/40 pb-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            <a
              href="https://slide-os.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors underline decoration-1 decoration-border underline-offset-4 hover:decoration-foreground"
            >
              {project.title}
            </a>
          </h2>
          <span className="font-mono text-xs font-bold text-emerald-500 border border-emerald-500/20 bg-emerald-500/10 rounded px-2 py-0.5">
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
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-bold"
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
              className="text-emerald-500 hover:underline flex items-center gap-1 font-bold"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Live Demo ↗</span>
            </a>
          )}
        </div>
      </div>

      {/* Concise 3-4 Liner Description */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      {/* Tech Stack Chips */}
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
        <span className="text-emerald-500 font-bold">slide-os.vercel.app</span>
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
