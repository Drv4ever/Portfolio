"use client";

import { FadeIn } from "@/components/Motion";
import { nowBuilding } from "@/data/content";

export default function Sidebar() {
  return (
    <FadeIn className="h-fit rounded-md border border-border-light p-5 dark:border-border-dark">
      <p className="text-xs uppercase tracking-editorial text-neutral-600 dark:text-neutral-400">{nowBuilding.title}</p>
      <div className="mt-4 border-t border-border-light pt-4 dark:border-border-dark">
        <p className="flex items-center gap-2 text-xs uppercase tracking-editorial">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
          {nowBuilding.status}
        </p>
        <h3 className="mt-3 font-serif text-2xl">{nowBuilding.project}</h3>
        <p className="mt-3 text-sm leading-7 text-neutral-700 dark:text-neutral-300">{nowBuilding.description}</p>
      </div>
    </FadeIn>
  );
}
