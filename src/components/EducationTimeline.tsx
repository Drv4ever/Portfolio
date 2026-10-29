"use client";

import * as React from "react";
import { education } from "@/content";

export function EducationTimeline() {
  return (
    <section id="education" aria-label="Academic Education" className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          Education
        </h2>
        <p className="font-mono text-xs text-muted-foreground">
          Academic foundation in Information Technology and computational systems.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {education.map((item) => (
          <article
            key={item.institution}
            className="rounded-lg border border-border bg-card p-6 space-y-2 transition-colors hover:border-emerald-500/40"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-medium text-foreground">
                {item.institution}
              </h3>
              <span className="font-mono text-xs text-muted-foreground">
                {item.period}
              </span>
            </div>

            <p className="text-sm text-foreground/90 font-medium">
              {item.degree}
            </p>

            <p className="font-mono text-xs text-muted-foreground">
              {item.location}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
