"use client";

import * as React from "react";
import { education } from "@/content";
import { MapPin } from "lucide-react";

export function EducationTimeline() {
  return (
    <section id="education" aria-label="Academic Education" className="space-y-4">
      <div className="space-y-1">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          Education
        </h2>
        <p className="text-xs text-muted-foreground">
          Academic foundation in Information Technology and computational principles.
        </p>
      </div>

      <div className="space-y-4 pt-2">
        {education.map((item) => (
          <div
            key={item.institution}
            className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 border-b border-border/40 pb-4 last:border-b-0"
          >
            <div className="space-y-0.5">
              <h3 className="font-serif text-lg font-medium text-foreground">
                {item.institution}
              </h3>
              <p className="text-sm text-muted-foreground">{item.degree}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground/80">
                <MapPin className="h-3 w-3" />
                <span>{item.location}</span>
              </div>
            </div>

            <div className="pt-1 sm:pt-0">
              <span className="font-mono text-xs text-muted-foreground">
                {item.period}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
