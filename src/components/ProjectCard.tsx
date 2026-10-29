"use client";

import * as React from "react";
import { Project } from "@/content/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Workflow, ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [tilt, setTilt] = React.useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const [canTilt, setCanTilt] = React.useState(false);

  React.useEffect(() => {
    // Only enable 3D tilt on fine pointers and when reduced motion is not requested
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanTilt(hasFinePointer && !isReduced);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !canTilt) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setMousePos({ x, y });
    setTilt({ rotateX, rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const tiltStyle: React.CSSProperties =
    canTilt && isHovered
      ? {
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
          transition: "transform 0.1s ease-out",
        }
      : {};

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm shadow-sm transition-all duration-300 hover:border-emerald-500/40 hover:shadow-md"
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      {canTilt && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.08), transparent 60%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Card Content Top */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-medium text-emerald-600 uppercase tracking-wider dark:text-emerald-400">
            {project.shortTitle}
          </span>

          <div className="flex items-center gap-1.5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground p-1 transition-colors"
                aria-label={`${project.title} GitHub Repository`}
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground p-1 transition-colors"
                aria-label={`${project.title} Live Demo`}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <h3 className="font-serif text-xl font-medium tracking-tight group-hover:text-emerald-500 transition-colors">
          {project.title}
        </h3>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {project.tagline}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.techStack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="font-mono text-[10px] px-2 py-0.5 border border-border/40"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Card Footer: Detail Trigger Button */}
      <div className="relative z-10 pt-6 mt-4 border-t border-border/40 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelect(project)}
          className="w-full gap-2 text-xs rounded-xl group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-colors"
        >
          <Workflow className="h-3.5 w-3.5 text-emerald-500" />
          <span>Inspect Architecture & Spec</span>
          <ArrowUpRight className="h-3.5 w-3.5 ml-auto text-muted-foreground group-hover:text-foreground" />
        </Button>
      </div>
    </div>
  );
}
