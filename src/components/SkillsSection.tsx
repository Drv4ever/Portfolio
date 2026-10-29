"use client";

import * as React from "react";
import { skills } from "@/content";

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const categories = ["All", ...skills.map((s) => s.category)];

  const displayedSkills = React.useMemo(() => {
    if (selectedCategory === "All") {
      return skills;
    }
    return skills.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="skills" aria-label="Technical Skills Matrix" className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          Technical Skills & Tooling
        </h2>
        <p className="font-mono text-xs text-muted-foreground">
          Grouped as verified on resume. Honest categorization with zero arbitrary proficiency bars.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 pb-2" role="tablist" aria-label="Skill Categories">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-3 py-1 text-xs font-mono transition-all border ${
                isSelected
                  ? "bg-foreground text-background border-foreground font-medium"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
              role="tab"
              aria-selected={isSelected}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Grouped Skills Display in Maanas Tyagi Card Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {displayedSkills.map((cat) => (
          <article
            key={cat.category}
            className="rounded-lg border border-border bg-card p-5 space-y-3 transition-colors hover:border-emerald-500/40"
          >
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-emerald-500 dark:text-emerald-400">
                {cat.category}
              </h3>
              <span className="font-mono text-[10px] text-muted-foreground">
                {cat.skills.length} competencies
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
