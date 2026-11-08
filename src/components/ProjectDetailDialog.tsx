"use client";

import * as React from "react";
import { Project } from "@/content/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, CheckCircle2 } from "lucide-react";
import { ProjectArchitectureDiagram } from "./ProjectArchitectureDiagram";

interface ProjectDetailDialogProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDetailDialog({
  project,
  open,
  onOpenChange,
}: ProjectDetailDialogProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto sm:rounded-2xl">
        <DialogHeader className="space-y-2 text-left">
          <div className="flex flex-wrap items-center justify-between gap-2 pr-6">
            <span className="retro-pixel text-[10px] uppercase text-orange-500 font-bold tracking-wider">
              {project.category} Project
            </span>

            <div className="flex items-center gap-2">
              {project.github && (
                <Button asChild variant="outline" size="sm" className="h-7 gap-1 text-xs rounded-full font-bold">
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <Github className="h-3.5 w-3.5" />
                    <span>Repo</span>
                  </a>
                </Button>
              )}
              {project.live && (
                <Button asChild size="sm" className="h-7 gap-1 text-xs rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold">
                  <a href={project.live} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Live</span>
                  </a>
                </Button>
              )}
            </div>
          </div>

          <DialogTitle className="retro-heading text-2xl font-bold sm:text-3xl">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        {/* Dynamic SVG Architecture Diagram */}
        <div className="my-3">
          <ProjectArchitectureDiagram project={project} />
        </div>

        {/* Resume Key Contributions */}
        <div className="space-y-3 pt-2">
          <h4 className="retro-pixel text-[11px] uppercase tracking-wider text-foreground/90 font-bold">
            Key Engineering Highlights
          </h4>
          <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            {project.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-orange-500 mt-0.5 shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Chips */}
        <div className="pt-3 border-t border-border/40">
          <h4 className="retro-pixel text-[11px] uppercase tracking-wider text-foreground/90 font-bold pb-2">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="font-mono text-[11px] font-semibold px-2.5 py-0.5 border border-border/40 text-foreground/90"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
