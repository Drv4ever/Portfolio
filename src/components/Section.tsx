import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export default function Section({ title, children, className }: SectionProps) {
  return (
    <section className={cn("border-t border-border-light py-10 dark:border-border-dark", className)}>
      <p className="mb-4 text-xs uppercase tracking-editorial text-neutral-600 dark:text-neutral-400">{title}</p>
      {children}
    </section>
  );
}
