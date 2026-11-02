"use client";

import * as React from "react";
import { useInView } from "motion/react";
import { Github, Flame } from "lucide-react";
import type { ContributionCalendar, ContributionWeek } from "./GithubHeatmap";
import { parseJogruberContributions } from "./GithubHeatmap";

interface GithubHeatmapClientProps {
  calendar: ContributionCalendar;
}

export function GithubHeatmapClient({ calendar }: GithubHeatmapClientProps) {
  const [data, setData] = React.useState<ContributionCalendar>(calendar);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isVisible = useInView(containerRef, { once: true, amount: 0.1 });

  React.useEffect(() => {
    let isMounted = true;
    fetch("https://github-contributions-api.jogruber.de/v4/Drv4ever?y=last")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json && isMounted) {
          setData(parseJogruberContributions(json));
        }
      })
      .catch(() => {
        // preserve server data on network failure
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Use the last 35 weeks for clean responsive fit matching Amaan's layout
  const recentWeeks = data.weeks.slice(-35);

  const getMonthLabel = (week: ContributionWeek, index: number) => {
    if (index === 0) return "";
    const firstDay = week.contributionDays[0];
    const prevWeek = recentWeeks[index - 1];
    const prevFirstDay = prevWeek?.contributionDays[0];
    if (!firstDay?.date || !prevFirstDay?.date) return "";

    const currentMonth = new Date(firstDay.date).getUTCMonth();
    const prevMonth = new Date(prevFirstDay.date).getUTCMonth();

    if (currentMonth !== prevMonth) {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return monthNames[currentMonth];
    }
    return "";
  };

  const getLevelClass = (count: number) => {
    if (count === 0) return "bg-border/40 dark:bg-zinc-800/60";
    if (count < 3) return "bg-emerald-800/50 dark:bg-[#0e4429]";
    if (count < 6) return "bg-emerald-600/70 dark:bg-[#006d32]";
    if (count < 8) return "bg-emerald-500 dark:bg-[#26a641]";
    return "bg-emerald-400 dark:bg-[#39d353]";
  };

  return (
    <section
      ref={containerRef}
      id="github-activity"
      aria-label="GitHub Activity Heatmap"
      className="space-y-3 pt-2"
    >
      <div className="flex flex-wrap items-center justify-between text-xs font-mono pb-1 border-b border-border/40 gap-2">
        <div className="flex items-center gap-2">
          <Github className="h-4 w-4 text-foreground" />
          <h2 className="font-bold text-foreground">GitHub Activity Stream</h2>
          <span className="text-muted-foreground text-[11px]">• @Drv4ever</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-bold">
          {data.longestStreak ? (
            <span className="text-amber-500 dark:text-amber-400 flex items-center gap-1">
              <Flame className="h-3.5 w-3.5" />
              <span>{data.longestStreak}d best streak</span>
            </span>
          ) : null}
          <span className="text-emerald-500 font-bold">
            {data.totalContributions} Contributions This Year
          </span>
        </div>
      </div>

      {/* Heatmap Grid in Amaan's Style */}
      <div className="rounded-xl border border-border/60 bg-card/60 p-3 sm:p-4 space-y-2 overflow-x-auto">
        {/* Months Row */}
        <div className="flex pl-7 text-[10px] font-mono text-muted-foreground select-none">
          {recentWeeks.map((week, idx) => {
            const label = getMonthLabel(week, idx);
            return (
              <div key={idx} className="w-3 shrink-0 text-left">
                {label && <span className="absolute -translate-y-0.5">{label}</span>}
              </div>
            );
          })}
        </div>

        {/* Days Column + Matrix */}
        <div className="flex gap-1.5 items-center">
          <div className="flex flex-col justify-between h-[84px] text-[9px] font-mono text-muted-foreground w-6 pr-1 select-none">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          <div className="flex gap-1 overflow-x-auto pb-1 flex-1">
            {recentWeeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1 shrink-0">
                {week.contributionDays.map((day, dIdx) => (
                  <div
                    key={day.date || dIdx}
                    title={`${day.date || "Unknown date"}: ${day.contributionCount} contributions`}
                    className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-[2px] transition-all duration-300 ${getLevelClass(
                      day.contributionCount
                    )}`}
                    style={{
                      opacity: isVisible ? 1 : 0.4,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Legend Bar */}
        <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-1 border-t border-border/40">
          <a
            href="https://github.com/Drv4ever"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors underline decoration-1 decoration-border underline-offset-4 hover:decoration-foreground"
          >
            @Drv4ever on GitHub ↗
          </a>

          <div className="flex items-center gap-1.5 text-[10px]">
            <span>Less</span>
            <div className="flex items-center gap-1">
              <div className="h-2.5 w-2.5 rounded-[2px] bg-border/40 dark:bg-zinc-800/60" />
              <div className="h-2.5 w-2.5 rounded-[2px] bg-emerald-800/50 dark:bg-[#0e4429]" />
              <div className="h-2.5 w-2.5 rounded-[2px] bg-emerald-600/70 dark:bg-[#006d32]" />
              <div className="h-2.5 w-2.5 rounded-[2px] bg-emerald-500 dark:bg-[#26a641]" />
              <div className="h-2.5 w-2.5 rounded-[2px] bg-emerald-400 dark:bg-[#39d353]" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
