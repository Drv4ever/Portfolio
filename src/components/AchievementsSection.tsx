"use client";

import * as React from "react";
import { achievements, certifications } from "@/content";
import { Badge } from "@/components/ui/badge";

export function AchievementsSection() {
  return (
    <section id="achievements" aria-label="Achievements and Certifications" className="space-y-4">
      <div className="space-y-1">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          Achievements & Certifications
        </h2>
        <p className="text-xs text-muted-foreground">
          Competitive problem solving, published intellectual property, and verified credentials.
        </p>
      </div>

      <div className="space-y-4 pt-2">
        {/* Achievements */}
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className="border-b border-border/40 pb-4 space-y-1.5 last:border-b-0"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-serif text-lg font-medium text-foreground">
                {ach.title}
              </h3>
              {ach.tag && (
                <Badge variant="outline" className="font-mono text-[10px]">
                  {ach.tag}
                </Badge>
              )}
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {ach.description}
            </p>

            {ach.metric && (
              <div className="font-mono text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                {ach.metric}
              </div>
            )}
          </div>
        ))}

        {/* Certifications */}
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="border-b border-border/40 pb-4 space-y-1.5 last:border-b-0"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-serif text-lg font-medium text-foreground">
                {cert.title}
              </h3>
              <Badge
                variant="outline"
                className="font-mono text-[10px] text-indigo-700 dark:text-indigo-300 border-indigo-500/40 font-medium"
              >
                Verified Credential
              </Badge>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {cert.description}
            </p>

            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-1">
              <span>Issuer: {cert.issuer}</span>
              <span className="text-indigo-700 dark:text-indigo-300 font-medium">
                CI/CD & Containers
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
