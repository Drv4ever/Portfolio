"use client";

import * as React from "react";
import { StageshowChrome } from "./StageshowChrome";
import { Server, Activity, ShieldCheck, Database } from "lucide-react";

export function CloudConsoleStage({ className = "" }: { className?: string }) {
  const [selectedTab, setSelectedTab] = React.useState<"services" | "logs">("services");

  return (
    <StageshowChrome
      url="15.207.54.197:443/health"
      statusBadge="AWS Multi-AZ"
      className={className}
    >
      <div className="bg-background/95 text-foreground flex flex-col font-mono text-xs select-none">
        {/* Cloud Navigation Bar */}
        <div className="flex items-center justify-between border-b border-border/40 bg-secondary/30 px-3 py-1.5 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 font-bold text-emerald-500">
              <Server className="h-3 w-3" />
              <span>EC2 ap-south-1a</span>
            </span>
            <span className="text-muted-foreground text-[10px] hidden sm:inline">• Multi-AZ Active</span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px]">
            <button
              type="button"
              onClick={() => setSelectedTab("services")}
              className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                selectedTab === "services"
                  ? "bg-emerald-500/15 text-emerald-500 font-bold border border-emerald-500/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => setSelectedTab("logs")}
              className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                selectedTab === "logs"
                  ? "bg-emerald-500/15 text-emerald-500 font-bold border border-emerald-500/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Telemetry
            </button>
          </div>
        </div>

        {/* Content Pane */}
        <div className="p-3 sm:p-4 min-h-[170px] flex flex-col justify-between space-y-2.5">
          {selectedTab === "services" ? (
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="rounded border border-border/60 bg-secondary/20 p-2 space-y-1">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Reverse Proxy</span>
                  <Activity className="h-3 w-3 text-emerald-500" />
                </div>
                <div className="text-foreground font-bold">Nginx + SSL</div>
                <div className="text-emerald-500 font-bold text-[9px]">200 OK • 38ms latency</div>
              </div>

              <div className="rounded border border-border/60 bg-secondary/20 p-2 space-y-1">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Storage Layer</span>
                  <Database className="h-3 w-3 text-emerald-500" />
                </div>
                <div className="text-foreground font-bold">AWS S3 + SSE</div>
                <div className="text-muted-foreground text-[9px]">Zero-byte leak policy</div>
              </div>

              <div className="rounded border border-border/60 bg-secondary/20 p-2 space-y-1">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Locker Pods</span>
                  <ShieldCheck className="h-3 w-3 text-emerald-500" />
                </div>
                <div className="text-foreground font-bold">Hardware Bridge</div>
                <div className="text-emerald-500 font-bold text-[9px]">OTP Token Auth Sync</div>
              </div>

              <div className="rounded border border-border/60 bg-secondary/20 p-2 space-y-1">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Events Bus</span>
                  <Server className="h-3 w-3 text-emerald-500" />
                </div>
                <div className="text-foreground font-bold">Amazon SQS / SNS</div>
                <div className="text-emerald-500 font-bold text-[9px]">0 Queue Backlog</div>
              </div>
            </div>
          ) : (
            <div className="rounded border border-border/60 bg-black/40 p-2.5 space-y-1 text-[10px] text-zinc-300">
              <div className="text-emerald-400">GET /api/v1/health HTTP/1.1 ➔ 200 OK (38.2ms)</div>
              <div className="text-zinc-400">[nginx] SSL handshake completed: TLSv1.3 AES-256-GCM</div>
              <div className="text-zinc-400">[locker-service] Photo payload dispatched to S3 bucket</div>
              <div className="text-emerald-400">[telemetry] Container healthy: 0 restarts across 72h</div>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-border/30 pt-1.5 text-[9px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Target: https://15.207.54.197/</span>
            </span>
            <span className="text-emerald-500 font-bold">Terraform Provisioned</span>
          </div>
        </div>
      </div>
    </StageshowChrome>
  );
}
