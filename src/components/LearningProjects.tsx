"use client";

import * as React from "react";
import { learningProjects as defaultProjects } from "@/content";
import { Project } from "@/content/schema";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, BookOpen } from "lucide-react";

interface LearningProjectsProps {
  projects?: Project[];
}

export function LearningProjects({ projects = defaultProjects }: LearningProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 pb-4">
        <BookOpen className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Foundational & Learning Projects
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col justify-between rounded-xl border border-border/40 bg-card/40 p-5 transition-colors hover:border-border/80"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground uppercase">
                  Backend Cryptography Practice
                </span>
                <div className="flex items-center gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1 font-mono transition-colors"
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
                      className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1 font-mono transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Demo</span>
                      <span className="sr-only"> for {project.title}</span>
                    </a>
                  )}
                </div>
              </div>

              <h4 className="font-serif text-lg font-medium text-foreground">
                {project.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-4">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="font-mono text-[10px] px-2 py-0 border-border/40 text-muted-foreground"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
