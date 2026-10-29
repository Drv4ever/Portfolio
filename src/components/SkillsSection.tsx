"use client";

import * as React from "react";
import { skills } from "@/content";
import { SkillCategoryName } from "@/content/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          Technical Skills & Tooling
        </h2>
        <p className="text-xs text-muted-foreground">
          Grouped as verified on resume. Honest categorization with zero arbitrary proficiency bars.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 pb-2" role="tablist" aria-label="Skill Categories">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <Button
              key={category}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full text-xs font-mono transition-all ${
                isSelected
                  ? "bg-foreground text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              role="tab"
              aria-selected={isSelected}
            >
              {category}
            </Button>
          );
        })}
      </div>

      {/* Grouped Skills Display */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {displayedSkills.map((cat) => (
          <div
            key={cat.category}
            className="flex flex-col justify-between rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm shadow-sm transition-colors hover:border-emerald-500/30"
          >
            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 pb-3">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="font-mono text-xs px-2.5 py-1 border border-border/50 bg-secondary/60 hover:bg-secondary"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="pt-4 text-right">
              <span className="font-mono text-[10px] text-muted-foreground">
                {cat.skills.length} competencies
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
