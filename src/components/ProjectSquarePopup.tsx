"use client";

import * as React from "react";
import Image from "next/image";
import { Project } from "@/content/schema";
import { motion, AnimatePresence } from "motion/react";
import { StageshowChrome } from "./stageshow/StageshowChrome";
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
        initial={{ opacity: 0, scale: 0.82, y: 14, rotate: -1.5 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 10, rotate: 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
        style={{
          position: "fixed",
          left: `${coords.x}px`,
          top: `${coords.y}px`,
          pointerEvents: "none",
          zIndex: 9999,
        }}
        className="w-[310px] sm:w-[350px] rounded-2xl border border-orange-500/40 bg-background/95 backdrop-blur-2xl shadow-2xl shadow-orange-500/10 overflow-hidden flex flex-col"
        aria-hidden="true"
      >
        {/* Subtle Domain Header Badge for Accessibility & Verification */}
        <div className="sr-only" data-testid="popup-domain">
          {domain}
        </div>

        {/* Real Live Landing Page for SlideOS */}
        {project.id === "slide-os" && (
          <StageshowChrome url="slide-os.vercel.app" statusBadge="LIVE APP">
            <div className="relative w-full h-[200px] overflow-hidden bg-muted">
              <Image
                src="/preview-slide-os.png"
                alt="SlideOS Live Landing Page"
                fill
                className="object-cover object-top"
                sizes="350px"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-3 py-1.5 flex items-center justify-between text-[10px] font-mono text-zinc-300">
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span>Real Landing Page</span>
                </span>
                <span className="text-orange-400 font-semibold">slide-os.vercel.app ↗</span>
              </div>
            </div>
          </StageshowChrome>
        )}

        {/* Real Live Warden Dashboard for Parcel Locker */}
        {project.id === "parcel-locker" && (
          <StageshowChrome url="15.207.54.197" statusBadge="AWS EC2">
            <div className="relative w-full h-[200px] overflow-hidden bg-muted">
              <Image
                src="/preview-parcel-locker.png"
                alt="Parcel Locker Live Warden Dashboard"
                fill
                className="object-cover object-top"
                sizes="350px"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-3 py-1.5 flex items-center justify-between text-[10px] font-mono text-zinc-300">
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span>Real Warden Portal</span>
                </span>
                <span className="text-orange-400 font-semibold">15.207.54.197 ↗</span>
              </div>
            </div>
          </StageshowChrome>
        )}

        {/* Interactive Protocol Terminals for Backend / Machine Learning Systems */}
        {project.id === "mongo-mcp" && <AgentStreamStage type="mcp" />}
        {project.id === "tcras" && <AgentStreamStage type="tcras" />}
        {project.id === "vaultify" && <AgentStreamStage type="vaultify" />}

        {/* Fallback for other projects */}
        {project.id !== "slide-os" &&
          project.id !== "parcel-locker" &&
          project.id !== "mongo-mcp" &&
          project.id !== "tcras" &&
          project.id !== "vaultify" && (
            <StageshowChrome url={domain} statusBadge="ACTIVE">
              <div className="p-4 space-y-2 text-xs font-mono text-muted-foreground bg-card/60 min-h-[160px] flex flex-col justify-center items-center text-center">
                <span className="text-foreground font-bold">{project.title}</span>
                <span className="text-[10px] text-orange-500 font-semibold">{project.shortTitle}</span>
                <p className="text-[10px] line-clamp-2 max-w-[260px]">{project.description}</p>
              </div>
            </StageshowChrome>
          )}
      </motion.div>
    </AnimatePresence>
  );
}
