"use client";

import * as React from "react";
import { Project } from "@/content/schema";
import { Terminal } from "lucide-react";

interface ProjectLandingPreviewProps {
  project: Project;
}

export function ProjectLandingPreview({ project }: ProjectLandingPreviewProps) {
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
  const targetUrl = project.live || project.github;

  return (
    <div className="relative mt-2 rounded-lg border border-border/70 bg-background/95 overflow-hidden shadow-md transition-all">
      {/* Browser Window Chrome */}
      <div className="flex items-center justify-between border-b border-border/50 bg-secondary/40 px-3 py-1.5 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500/70" />
          <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-border/50 bg-background px-3 py-0.5 text-[11px] text-muted-foreground font-mono">
          <span className="text-emerald-500 text-[10px]">🔒</span>
          <span className="truncate max-w-[180px] sm:max-w-[260px]">{domain}</span>
        </div>

        {targetUrl ? (
          <a
            href={targetUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open landing page for ${project.title}`}
            className="text-[11px] font-mono font-bold text-emerald-500 hover:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Live ↗</span>
          </a>
        ) : (
          <span className="text-[11px] text-muted-foreground font-mono">preview</span>
        )}
      </div>

      {/* Dynamic Landing Page UI Mockup */}
      <div className="p-3.5 sm:p-4 text-xs font-sans select-none">
        {project.id === "slide-os" && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-600 text-white font-mono text-[10px] font-bold">
                  S
                </span>
                <span className="font-bold text-foreground text-xs">SlideOS AI</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                Groq 300 t/s JSON
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1 rounded border border-border/60 bg-secondary/30 p-2 space-y-1">
                <span className="font-mono text-[9px] text-muted-foreground block font-bold">OUTLINE</span>
                <div className="space-y-1 text-[10px] text-muted-foreground">
                  <div className="truncate text-foreground font-semibold">1. Cloud Scale</div>
                  <div className="truncate">2. Raft Consensus</div>
                  <div className="truncate">3. Event Mesh</div>
                </div>
              </div>

              <div className="col-span-2 rounded border border-emerald-500/30 bg-card p-2.5 space-y-1.5 shadow-sm">
                <span className="font-mono text-[9px] text-emerald-500 uppercase font-bold">ACTIVE SLIDE #1</span>
                <h5 className="font-bold text-foreground text-xs">Scalable Distributed Systems</h5>
                <p className="text-[10px] text-muted-foreground line-clamp-2">
                  Multi-region replication with automatic failover and sub-millisecond consensus.
                </p>
                <div className="flex gap-1 pt-1">
                  <span className="font-mono text-[9px] bg-secondary px-1.5 py-0.2 rounded font-semibold text-foreground">
                    .PPTX
                  </span>
                  <span className="font-mono text-[9px] bg-secondary px-1.5 py-0.2 rounded font-semibold text-foreground">
                    .PDF
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {project.id === "parcel-locker" && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-foreground text-xs">AWS EC2 Warden Portal</span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">15.207.54.197:443</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[10px]">
              <div className="rounded border border-border/60 bg-secondary/30 p-2 text-center">
                <span className="block text-muted-foreground text-[9px]">Locker 01</span>
                <span className="text-emerald-500 font-bold">Ready</span>
              </div>
              <div className="rounded border border-emerald-500/40 bg-emerald-500/10 p-2 text-center">
                <span className="block text-muted-foreground text-[9px]">Locker 02</span>
                <span className="text-foreground font-bold">Occupied</span>
              </div>
              <div className="rounded border border-border/60 bg-secondary/30 p-2 text-center">
                <span className="block text-muted-foreground text-[9px]">S3 Photo</span>
                <span className="text-muted-foreground font-bold">Synced</span>
              </div>
              <div className="rounded border border-border/60 bg-secondary/30 p-2 text-center">
                <span className="block text-muted-foreground text-[9px]">SNS / SQS</span>
                <span className="text-emerald-500 font-bold">Active</span>
              </div>
            </div>
          </div>
        )}

        {project.id === "mongo-mcp" && (
          <div className="space-y-2 font-mono text-[11px]">
            <div className="flex items-center justify-between border-b border-border/40 pb-1.5 text-xs">
              <span className="font-bold text-foreground flex items-center gap-1.5">
                <Terminal className="h-3 w-3 text-emerald-500" />
                <span>MCP Inspector Client</span>
              </span>
              <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-1.5 rounded">
                Read-Only Safe
              </span>
            </div>
            <div className="rounded bg-secondary/50 p-2 text-[10px] space-y-1 font-mono">
              <div className="text-emerald-500">{"> tools/call: list_collections()"}</div>
              <div className="text-muted-foreground">{`["users", "orders", "inventory", "audit_log"]`}</div>
              <div className="text-emerald-500">{`> tools/call: infer_schema(collection: "orders")`}</div>
              <div className="text-foreground font-semibold">{"{ orderId: UUID, total: Float, status: 'completed' }"}</div>
            </div>
          </div>
        )}

        {project.id === "tcras" && (
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-1.5">
              <span className="font-bold text-foreground">Risk Amplification Engine</span>
              <span className="font-mono text-[10px] text-emerald-500 font-semibold">
                Anomaly Score: 0.14 [Normal]
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center font-mono text-[10px] pt-1">
              <div className="rounded border border-border/60 bg-secondary/30 p-1.5">
                <span className="text-[9px] text-muted-foreground block">FastAPI</span>
                <span className="font-bold text-foreground">Active</span>
              </div>
              <div className="rounded border border-border/60 bg-secondary/30 p-1.5">
                <span className="text-[9px] text-muted-foreground block">Isolation Forest</span>
                <span className="font-bold text-emerald-500">99.2% Conf</span>
              </div>
              <div className="rounded border border-border/60 bg-secondary/30 p-1.5">
                <span className="text-[9px] text-muted-foreground block">Audit Store</span>
                <span className="font-bold text-foreground">SQLite</span>
              </div>
            </div>
          </div>
        )}

        {project.id === "vaultify" && (
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-1.5">
              <span className="font-bold text-foreground">Vaultify Security Dashboard</span>
              <span className="font-mono text-[10px] text-emerald-500 font-bold">AES-256 GCM</span>
            </div>
            <div className="space-y-1.5 font-mono text-[10px]">
              <div className="flex items-center justify-between rounded border border-border/50 bg-secondary/30 px-2 py-1">
                <span className="font-semibold text-foreground">GitHub Auth Token</span>
                <span className="text-muted-foreground">••••••••••••••</span>
              </div>
              <div className="flex items-center justify-between rounded border border-border/50 bg-secondary/30 px-2 py-1">
                <span className="font-semibold text-foreground">AWS Root Credentials</span>
                <span className="text-muted-foreground">••••••••••••••</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
