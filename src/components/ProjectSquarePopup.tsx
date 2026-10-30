"use client";

import * as React from "react";
import { Project } from "@/content/schema";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Shield, Cloud, Lock } from "lucide-react";

interface ProjectSquarePopupProps {
  project: Project | null;
  mousePos: { x: number; y: number };
}

export function ProjectSquarePopup({ project, mousePos }: ProjectSquarePopupProps) {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!project) return;

    const POPUP_SIZE = 280;
    const PADDING = 16;

    let targetX = mousePos.x + 18;
    if (typeof window !== "undefined") {
      if (targetX + POPUP_SIZE > window.innerWidth - PADDING) {
        targetX = mousePos.x - POPUP_SIZE - 18;
      }
      targetX = Math.max(PADDING, targetX);

      let targetY = mousePos.y + 18;
      if (targetY + POPUP_SIZE > window.innerHeight - PADDING) {
        targetY = mousePos.y - POPUP_SIZE - 18;
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
        initial={{ opacity: 0, scale: 0.85, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 8 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          left: `${coords.x}px`,
          top: `${coords.y}px`,
          pointerEvents: "none",
          zIndex: 9999,
        }}
        className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col"
        aria-hidden="true"
      >
        {/* Browser Header Bar */}
        <div className="flex items-center justify-between border-b border-border/60 bg-secondary/60 px-3 py-1.5 shrink-0 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500/80" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
          </div>

          <div className="flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-0.5 text-[10px] text-muted-foreground border border-border/50 font-mono">
            <span className="text-emerald-500 text-[9px]">🔒</span>
            <span className="truncate max-w-[120px] font-bold text-foreground">{domain}</span>
          </div>

          <span className="font-mono text-[9px] text-emerald-500 font-bold uppercase tracking-wider">
            Live
          </span>
        </div>

        {/* Square App Landing Page Mockup */}
        <div className="p-3.5 flex-1 flex flex-col justify-between text-xs font-sans select-none overflow-hidden bg-background/50">
          {project.id === "slide-os" && (
            <div className="flex flex-col justify-between h-full space-y-2">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-4 w-4 items-center justify-center rounded bg-emerald-600 text-white font-mono text-[9px] font-bold">
                      S
                    </span>
                    <span className="font-bold text-foreground text-xs">SlideOS</span>
                  </div>
                  <span className="font-mono text-[9px] text-emerald-500 bg-emerald-500/10 px-1 rounded">
                    Groq JSON
                  </span>
                </div>
                <h5 className="font-extrabold text-foreground text-[13px] leading-tight pt-0.5">
                  AI-Powered Presentation Builder
                </h5>
                <p className="text-[10px] text-muted-foreground leading-snug">
                  Generate structured slide outlines with exact-count server enforcement.
                </p>
              </div>

              {/* Miniature Slide Preview */}
              <div className="rounded-lg border border-emerald-500/30 bg-card p-2 space-y-1 shadow-sm">
                <div className="flex items-center justify-between text-[9px] font-mono text-emerald-500">
                  <span>SLIDE 01 / 08</span>
                  <span className="bg-secondary px-1 rounded text-foreground font-semibold">12 Themes</span>
                </div>
                <div className="font-bold text-foreground text-[11px] truncate">
                  Scalable Distributed Systems
                </div>
                <div className="text-[9px] text-muted-foreground line-clamp-1">
                  • Raft consensus replication & failover
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[9px] font-mono">
                <span className="text-muted-foreground">Exports:</span>
                <span className="font-bold text-foreground">PPTX • PDF</span>
              </div>
            </div>
          )}

          {project.id === "parcel-locker" && (
            <div className="flex flex-col justify-between h-full space-y-2">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Cloud className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="font-bold text-foreground text-xs">Warden Portal</span>
                  </div>
                  <span className="font-mono text-[9px] text-emerald-500 font-bold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    15.207.54.197
                  </span>
                </div>
                <h5 className="font-extrabold text-foreground text-[13px] leading-tight pt-0.5">
                  Digital Parcel Locker
                </h5>
                <p className="text-[10px] text-muted-foreground leading-snug">
                  AWS EC2 event-driven parcel tracking & S3 photo capture.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-1.5 font-mono text-[9px]">
                <div className="rounded border border-border/60 bg-secondary/40 p-1.5 text-center">
                  <span className="text-muted-foreground block text-[8px]">Locker 01</span>
                  <span className="text-emerald-500 font-bold">Ready</span>
                </div>
                <div className="rounded border border-emerald-500/40 bg-emerald-500/10 p-1.5 text-center">
                  <span className="text-muted-foreground block text-[8px]">Locker 02</span>
                  <span className="text-foreground font-bold">Occupied</span>
                </div>
                <div className="rounded border border-border/60 bg-secondary/40 p-1.5 text-center">
                  <span className="text-muted-foreground block text-[8px]">S3 Photo</span>
                  <span className="text-muted-foreground font-bold">Uploaded</span>
                </div>
                <div className="rounded border border-border/60 bg-secondary/40 p-1.5 text-center">
                  <span className="text-muted-foreground block text-[8px]">SNS SQS</span>
                  <span className="text-emerald-500 font-bold">Dispatched</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[9px] font-mono">
                <span className="text-muted-foreground">Host:</span>
                <span className="font-bold text-foreground">AWS EC2 ap-south-1</span>
              </div>
            </div>
          )}

          {project.id === "mongo-mcp" && (
            <div className="flex flex-col justify-between h-full space-y-1.5 font-mono">
              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="font-bold text-foreground text-xs">MongoDB MCP</span>
                  </div>
                  <span className="text-[9px] text-emerald-500 bg-emerald-500/10 px-1 rounded font-bold">
                    Read-Only
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground font-sans pt-0.5">
                  AI Model Context Protocol server with Zod schema validation.
                </p>
              </div>

              <div className="rounded bg-secondary/60 p-2 text-[9px] space-y-1 font-mono border border-border/50">
                <div className="text-emerald-500">{"> tools/call: list_collections()"}</div>
                <div className="text-muted-foreground truncate">{`["users", "orders", "audit_log"]`}</div>
                <div className="text-emerald-500">{"> tools/call: infer_schema()"}</div>
                <div className="text-foreground font-semibold truncate">{"{ orderId: UUID, total: Float }"}</div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[9px]">
                <span className="text-muted-foreground">Protocol:</span>
                <span className="font-bold text-foreground">MCP SDK Stdio / SSE</span>
              </div>
            </div>
          )}

          {project.id === "tcras" && (
            <div className="flex flex-col justify-between h-full space-y-2">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="font-bold text-foreground text-xs">TCRAS</span>
                  </div>
                  <span className="font-mono text-[9px] text-emerald-500 bg-emerald-500/10 px-1 rounded font-bold">
                    FastAPI
                  </span>
                </div>
                <h5 className="font-extrabold text-foreground text-[13px] leading-tight pt-0.5">
                  Risk Amplification System
                </h5>
                <p className="text-[10px] text-muted-foreground leading-snug">
                  Real-time file transfer chain anomaly scoring with ML.
                </p>
              </div>

              <div className="rounded-lg border border-border/60 bg-secondary/40 p-2 space-y-1 text-center font-mono">
                <div className="text-[9px] text-muted-foreground">ISOLATION FOREST ANOMALY SCORE</div>
                <div className="text-base font-extrabold text-emerald-500">0.14 [LOW RISK]</div>
                <div className="text-[8px] text-muted-foreground truncate">Node A ➔ Node B ➔ SQLite Audit</div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[9px] font-mono">
                <span className="text-muted-foreground">Confidence:</span>
                <span className="font-bold text-foreground">99.2% Accuracy</span>
              </div>
            </div>
          )}

          {project.id === "vaultify" && (
            <div className="flex flex-col justify-between h-full space-y-2">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="font-bold text-foreground text-xs">Vaultify</span>
                  </div>
                  <span className="font-mono text-[9px] text-emerald-500 font-bold bg-emerald-500/10 px-1 rounded">
                    AES-256
                  </span>
                </div>
                <h5 className="font-extrabold text-foreground text-[13px] leading-tight pt-0.5">
                  Password Manager
                </h5>
                <p className="text-[10px] text-muted-foreground leading-snug">
                  Zero-knowledge encrypted vault with JWT authentication.
                </p>
              </div>

              <div className="space-y-1 font-mono text-[9px]">
                <div className="flex items-center justify-between rounded border border-border/50 bg-secondary/40 px-2 py-1">
                  <span className="font-semibold text-foreground">GitHub Token</span>
                  <span className="text-muted-foreground">••••••••••••</span>
                </div>
                <div className="flex items-center justify-between rounded border border-border/50 bg-secondary/40 px-2 py-1">
                  <span className="font-semibold text-foreground">AWS Console</span>
                  <span className="text-muted-foreground">••••••••••••</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[9px] font-mono">
                <span className="text-muted-foreground">Storage:</span>
                <span className="font-bold text-foreground">Encrypted MongoDB</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
