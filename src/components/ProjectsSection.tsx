"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { featuredProjects, content } from "@/content";
import { Project } from "@/content/schema";
import { SlideOSSpotlight } from "./SlideOSSpotlight";
import { ProjectCard } from "./ProjectCard";
import { LearningProjects } from "./LearningProjects";
import { ProjectSquarePopup } from "./ProjectSquarePopup";

const ProjectDetailDialog = dynamic(
  () => import("./ProjectDetailDialog").then((m) => m.ProjectDetailDialog),
  { ssr: false }
);

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = React.useState<Project | null>(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleOpenDialog = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  return (
    <section
      id="projects"
      aria-label="Featured Engineering Projects"
      onMouseMove={handleMouseMove}
      className="space-y-6"
    >
      {/* Amaan-style Section Header */}
      <div className="space-y-1 border-b border-border/40 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground">
            PROJECTS ({content.projects.length})
          </h2>
          <span className="font-mono text-[11px] text-emerald-500 font-semibold">
            live & open-source
          </span>
        </div>
        <p className="text-sm sm:text-base font-bold text-foreground">
          coolest stuff i&apos;ve built (yet)
        </p>
      </div>

      {/* Flagship: SlideOS */}
      <SlideOSSpotlight onHover={setHoveredProject} />

      {/* Featured Works Grid */}
      <div className="space-y-4 pt-1">
        <div className="grid grid-cols-1 gap-4">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={handleOpenDialog}
              onHover={setHoveredProject}
            />
          ))}
        </div>
      </div>

      {/* Learning Projects */}
      <LearningProjects onHover={setHoveredProject} />

      {/* Floating Square Landing Page Popup on Hover */}
      <ProjectSquarePopup project={hoveredProject} mousePos={mousePos} />

      {/* Detail Modal */}
      {dialogOpen && (
        <ProjectDetailDialog
          project={selectedProject}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </section>
  );
}
