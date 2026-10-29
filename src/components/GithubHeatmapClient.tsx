"use client";

import * as React from "react";
import { useInView } from "motion/react";
import { Github, Flame } from "lucide-react";

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

interface GithubHeatmapClientProps {
  calendar: ContributionCalendar;
}

export function GithubHeatmapClient({ calendar }: GithubHeatmapClientProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isVisible = useInView(containerRef, { once: true, amount: 0.1 });

  // Display the last 32 weeks for a clean responsive layout
  const recentWeeks = calendar.weeks.slice(-32);

  return (
    <section
      ref={containerRef}
      id="github-activity"
      aria-label="GitHub Activity Heatmap"
      className="space-y-4"
    >
      <article className="rounded-lg border border-border bg-card p-6 space-y-5 transition-colors hover:border-border/80">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/40">
          <div className="flex items-center gap-2.5">
            <Github className="h-5 w-5 text-foreground" />
            <div>
              <h3 className="text-lg font-medium text-foreground">
                GitHub Activity Stream
              </h3>
              <p className="text-xs text-muted-foreground font-mono">
                @Drv4ever • Verified Public Commits
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-emerald-500 border border-emerald-500/30 bg-emerald-500/10 rounded px-2.5 py-1 flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5" />
              <span>{calendar.totalContributions} Contributions This Year</span>
            </span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-1.5 min-w-[500px]">
            {recentWeeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1.5 flex-1">
                {week.contributionDays.map((day, dIdx) => {
                  const level =
                    day.contributionCount === 0
                      ? "bg-border/40"
                      : day.contributionCount < 3
                      ? "bg-emerald-500/30"
                      : day.contributionCount < 6
                      ? "bg-emerald-500/60"
                      : "bg-emerald-500";

                  return (
                    <div
                      key={day.date || dIdx}
                      title={`${day.date}: ${day.contributionCount} contributions`}
                      className={`h-3 w-full rounded-sm transition-all duration-300 ${level}`}
                      style={{
                        opacity: isVisible ? 1 : 0.4,
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-1">
          <span>Less</span>
          <div className="flex items-center gap-1">
            <div className="h-2.5 w-2.5 rounded-sm bg-border/40" />
            <div className="h-2.5 w-2.5 rounded-sm bg-emerald-500/30" />
            <div className="h-2.5 w-2.5 rounded-sm bg-emerald-500/60" />
            <div className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
          </div>
          <span>More</span>
        </div>
      </article>
    </section>
  );
}
