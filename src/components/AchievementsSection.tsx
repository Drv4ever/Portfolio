"use client";

import * as React from "react";
import { achievements, certifications } from "@/content";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Award, Code2, ShieldAlert } from "lucide-react";

export function AchievementsSection() {
  return (
    <section id="achievements" aria-label="Achievements and Certifications" className="py-12 md:py-16">
      <div className="space-y-3 pb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Recognitions & Milestones
        </span>
        <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
          Achievements & Certifications
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Validated competitive problem solving, published intellectual property, and industry certifications.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Achievement 1: LeetCode */}
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className="flex flex-col justify-between rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm shadow-sm transition-all hover:border-emerald-500/40"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                  {ach.id === "leetcode" ? (
                    <Code2 className="h-4 w-4" />
                  ) : (
                    <ShieldAlert className="h-4 w-4" />
                  )}
                </span>
                {ach.tag && (
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {ach.tag}
                  </Badge>
                )}
              </div>

              <h3 className="font-serif text-xl font-medium text-foreground">
                {ach.title}
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {ach.description}
              </p>
            </div>

            {ach.metric && (
              <div className="pt-4 border-t border-border/40 font-mono text-2xl font-bold text-emerald-500">
                {ach.metric}
              </div>
            )}
          </div>
        ))}

        {/* Certification Card: IBM DevOps */}
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="flex flex-col justify-between rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm shadow-sm transition-all hover:border-indigo-500/40"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                  <Award className="h-4 w-4" />
                </span>
                <Badge variant="outline" className="font-mono text-[10px] text-indigo-700 dark:text-indigo-300 border-indigo-500/40 font-medium">
                  Verified Credential
                </Badge>
              </div>

              <h3 className="font-serif text-xl font-medium text-foreground">
                {cert.title}
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {cert.description}
              </p>
            </div>

            <div className="pt-4 border-t border-border/40 flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">
                Issuer: {cert.issuer}
              </span>
              <span className="font-mono text-[11px] text-indigo-700 dark:text-indigo-300 font-semibold">
                CI/CD & Containers
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
