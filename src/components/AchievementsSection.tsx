"use client";

import * as React from "react";
import { achievements, certifications } from "@/content";

export function AchievementsSection() {
  return (
    <section id="achievements" aria-label="Achievements and Certifications" className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          Achievements & Certifications
        </h2>
        <p className="font-mono text-xs text-muted-foreground">
          Competitive problem solving, published intellectual property, and verified credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Achievements */}
        {achievements.map((ach) => (
          <article
            key={ach.id}
            className="rounded-lg border border-border bg-card p-6 space-y-2 transition-colors hover:border-emerald-500/40"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-medium text-foreground">
                {ach.title}
              </h3>
              {ach.tag && (
                <span className="font-mono text-xs text-emerald-500 border border-emerald-500/30 bg-emerald-500/10 rounded px-2 py-0.5">
                  {ach.tag}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {ach.description}
            </p>

            {ach.metric && (
              <div className="font-mono text-sm font-semibold text-emerald-500 dark:text-emerald-400 pt-1">
                {ach.metric}
              </div>
            )}
          </article>
        ))}

        {/* Certifications */}
        {certifications.map((cert) => (
          <article
            key={cert.id}
            className="rounded-lg border border-border bg-card p-6 space-y-2 transition-colors hover:border-emerald-500/40"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-medium text-foreground">
                {cert.title}
              </h3>
              <span className="font-mono text-xs text-muted-foreground border border-border rounded px-2 py-0.5">
                Verified Credential
              </span>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {cert.description}
            </p>

            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-1">
              <span>Issuer: {cert.issuer}</span>
              <span className="text-foreground/80 font-medium">
                CI/CD & Containers
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
