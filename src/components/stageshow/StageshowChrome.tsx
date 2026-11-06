"use client";

import * as React from "react";

interface StageshowChromeProps {
  url?: string;
  statusBadge?: string;
  children: React.ReactNode;
  className?: string;
  showControls?: boolean;
}

export function StageshowChrome({
  url = "app.internal",
  statusBadge = "LIVE",
  children,
  className = "",
  showControls = true,
}: StageshowChromeProps) {
  return (
    <div
      className={`rounded-xl border border-border/70 bg-card/90 shadow-md backdrop-blur-md overflow-hidden flex flex-col ${className}`}
    >
      {/* Authentic macOS / Clean Browser Chrome Bar */}
      <div className="flex items-center justify-between border-b border-border/50 bg-secondary/50 px-3.5 py-2 shrink-0 text-xs font-mono select-none">
        {showControls ? (
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/90 border border-[#e0443e]/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/90 border border-[#dea123]/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/90 border border-[#1aab29]/40" />
          </div>
        ) : (
          <div className="w-10" />
        )}

        {/* Center URL Pill */}
        <div className="flex items-center gap-1.5 rounded-full border border-border/50 bg-background/80 px-2.5 py-0.5 text-[11px] text-muted-foreground shadow-2xs font-mono">
          <span className="text-emerald-500 text-[10px]">🔒</span>
          <span className="truncate max-w-[160px] sm:max-w-[220px] font-semibold text-foreground">
            {url}
          </span>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-500 font-bold">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden sm:inline uppercase tracking-wider">{statusBadge}</span>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
