"use client";

import * as React from "react";
import { featuredProjects } from "@/content";
import { Project } from "@/content/schema";
import { SlideOSSpotlight } from "./SlideOSSpotlight";
import { ProjectCard } from "./ProjectCard";
import { ProjectDetailDialog } from "./ProjectDetailDialog";
import { LearningProjects } from "./LearningProjects";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleOpenDialog = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  return (
    <section id="projects" aria-label="Featured Engineering Projects" className="py-12 md:py-16">
      <div className="space-y-3 pb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Selected Works & Systems
        </span>
        <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
          Engineered Products & Architectures
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          High-performance full-stack web applications, Model Context Protocol servers, and cloud-native event-driven pipelines.
        </p>
      </div>

      {/* Spotlight: SlideOS */}
      <SlideOSSpotlight />

      {/* Featured Works Grid */}
      <div className="mt-12 space-y-4">
        <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Distributed Systems & Protocols
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
      <ProjectDetailDialog
        project={selectedProject}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  );
}
