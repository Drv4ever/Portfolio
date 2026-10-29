"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { featuredProjects } from "@/content";
import { Project } from "@/content/schema";
import { SlideOSSpotlight } from "./SlideOSSpotlight";
import { ProjectCard } from "./ProjectCard";
import { LearningProjects } from "./LearningProjects";

const ProjectDetailDialog = dynamic(
  () => import("./ProjectDetailDialog").then((m) => m.ProjectDetailDialog),
  { ssr: false }
);

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleOpenDialog = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  return (
    <section id="projects" aria-label="Featured Engineering Projects" className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          Engineered Products & Architectures
        </h2>
        <p className="text-xs text-muted-foreground">
          Full-stack web applications, Model Context Protocol servers, and cloud-native event-driven pipelines.
        </p>
      </div>

      {/* Spotlight: SlideOS */}
      <SlideOSSpotlight />

      {/* Featured Works Grid */}
      <div className="mt-12 space-y-4">
        <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Distributed Systems & Protocols
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={handleOpenDialog}
            />
          ))}
        </div>
      </div>

      {/* Learning Projects */}
      <LearningProjects />

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
