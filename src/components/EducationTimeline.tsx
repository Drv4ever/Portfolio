"use client";

import * as React from "react";
import { education } from "@/content";
import { GraduationCap, MapPin, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function EducationTimeline() {
  return (
    <section id="education" aria-label="Academic Education" className="py-12 md:py-16">
      <div className="space-y-3 pb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Academic Foundations
        </span>
        <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
          Education & Background
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Formal training in Information Technology, algorithms, and computational principles.
        </p>
      </div>

      <div className="relative border-l border-border/80 pl-6 ml-3 sm:ml-4 space-y-8">
        {education.map((item, idx) => (
          <div key={item.institution} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-emerald-500 bg-background transition-transform group-hover:scale-125">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm shadow-sm transition-all hover:border-emerald-500/40">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-emerald-500" />
                  <h3 className="font-serif text-xl font-medium text-foreground">
                    {item.institution}
                  </h3>
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {item.degree}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{item.location}</span>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2 pt-2 sm:pt-0">
                <Badge variant="outline" className="font-mono text-xs w-fit">
                  {item.period}
                </Badge>
                <span className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {item.score}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
