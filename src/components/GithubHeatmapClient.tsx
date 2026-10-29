"use client";

import * as React from "react";
import { useInView } from "motion/react";
import { Github, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
      <div className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm shadow-sm md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/40">
          <div className="flex items-center gap-2.5">
            <Github className="h-5 w-5 text-foreground" />
            <div>
              <h3 className="font-serif text-xl font-medium text-foreground">
                GitHub Activity Stream
              </h3>
              <p className="text-xs text-muted-foreground font-mono">
                @Drv4ever • Verified Public Commits
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-mono text-xs gap-1">
              <Flame className="h-3.5 w-3.5 text-emerald-500" />
              <span>{calendar.totalContributions} Contributions This Year</span>
            </Badge>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pt-6 pb-2">
          <div className="inline-flex gap-1">
            {recentWeeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1">
                {week.contributionDays.map((day, dIdx) => {
                  const level =
                    day.contributionCount === 0
                      ? "bg-secondary/40"
                      : day.contributionCount < 3
                      ? "bg-emerald-500/30"
                      : day.contributionCount < 6
                      ? "bg-emerald-500/60"
                      : "bg-emerald-500";

                  return (
                    <div
                      key={day.date || dIdx}
                      title={`${day.date}: ${day.contributionCount} contributions`}
                      className={`h-2.5 w-2.5 rounded-[2px] transition-all duration-500 ${level} ${
                        isVisible
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-50"
                      }`}
                      style={{
                        transitionDelay: `${(wIdx * 7 + dIdx) * 2}ms`,
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 text-[11px] font-mono text-muted-foreground">
          <span>Less</span>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-[2px] bg-secondary/40" />
            <span className="h-2 w-2 rounded-[2px] bg-emerald-500/30" />
            <span className="h-2 w-2 rounded-[2px] bg-emerald-500/60" />
            <span className="h-2 w-2 rounded-[2px] bg-emerald-500" />
          </div>
          <span>More</span>
        </div>
      </div>
    </section>
  );
}
