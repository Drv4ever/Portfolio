"use client";

import * as React from "react";
import { Project } from "@/content/schema";
import { motion, AnimatePresence } from "motion/react";
import { SlideOSStage } from "./stageshow/SlideOSStage";
import { CloudConsoleStage } from "./stageshow/CloudConsoleStage";
import { AgentStreamStage } from "./stageshow/AgentStreamStage";

interface ProjectSquarePopupProps {
  project: Project | null;
  mousePos: { x: number; y: number };
}

export function ProjectSquarePopup({ project, mousePos }: ProjectSquarePopupProps) {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!project) return;

    const POPUP_WIDTH = 340;
    const POPUP_HEIGHT = 280;
    const PADDING = 16;

    let targetX = mousePos.x + 20;
    if (typeof window !== "undefined") {
      if (targetX + POPUP_WIDTH > window.innerWidth - PADDING) {
        targetX = mousePos.x - POPUP_WIDTH - 20;
      }
      targetX = Math.max(PADDING, targetX);

      let targetY = mousePos.y + 20;
      if (targetY + POPUP_HEIGHT > window.innerHeight - PADDING) {
        targetY = mousePos.y - POPUP_HEIGHT - 20;
      }
      targetY = Math.max(PADDING, targetY);

      setCoords({ x: targetX, y: targetY });
    }
  }, [mousePos, project]);

  if (!project) return null;

  const getDomain = () => {
    if (project.live) {
      try {
        const url = new URL(project.live);
        return url.hostname;
      } catch {
        return project.live;
      }
    }
    if (project.github) {
      try {
        const url = new URL(project.github);
        return url.pathname.replace(/^\//, "");
      } catch {
        return project.github;
      }
    }
    return "project.internal";
  };

  const domain = getDomain();

  return (
    <AnimatePresence>
      <motion.div
        key={project.id}
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          left: `${coords.x}px`,
          top: `${coords.y}px`,
          pointerEvents: "none",
          zIndex: 9999,
        }}
        className="w-[310px] sm:w-[340px] rounded-2xl border border-emerald-500/30 bg-background/95 backdrop-blur-2xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col"
        aria-hidden="true"
      >
        {/* Subtle Domain Header Badge for Accessibility & Verification */}
        <div className="sr-only" data-testid="popup-domain">
          {domain}
        </div>

        {project.id === "slide-os" && <SlideOSStage />}
        {project.id === "parcel-locker" && <CloudConsoleStage />}
        {project.id === "mongo-mcp" && <AgentStreamStage type="mcp" />}
        {project.id === "tcras" && <AgentStreamStage type="tcras" />}
        {project.id === "vaultify" && <AgentStreamStage type="vaultify" />}
        {project.id !== "slide-os" &&
          project.id !== "parcel-locker" &&
          project.id !== "mongo-mcp" &&
          project.id !== "tcras" &&
          project.id !== "vaultify" && <SlideOSStage />}
      </motion.div>
    </AnimatePresence>
  );
}
