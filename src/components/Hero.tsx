"use client";

import { FadeIn } from "@/components/Motion";
import HeroActions from "@/components/HeroActions";
import { profile } from "@/data/content";

export default function Hero() {
  const socialIcon: Record<string, string> = {
    Email: "✉",
    LinkedIn: "in",
    Twitter: "𝕏",
    GitHub: "◉"
  };

  return (
    <section className="border-b border-border-light py-10 dark:border-border-dark">
      <FadeIn>
        <p className="max-w-[52ch] text-sm leading-7 text-neutral-700 dark:text-neutral-300">{profile.intro}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.techStack.map((tech) => (
            <span
              key={tech.name}
              className="inline-flex items-center gap-1.5 rounded-md border border-border-light px-2 py-1 text-[10px] uppercase tracking-editorial dark:border-border-dark"
            >
              <img src={tech.logo} alt={`${tech.name} logo`} className="h-3.5 w-3.5" loading="lazy" />
              {tech.name}
            </span>
          ))}
        </div>

        <HeroActions />

        <ul className="mt-8 space-y-2.5 text-base">
          {profile.socials.map((item) => (
            <li key={item.label}>
              <a
                className="inline-flex items-center gap-2 border-b border-transparent pb-0.5 transition hover:border-ink-light dark:hover:border-ink-dark"
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <span className="inline-flex h-5 w-5 items-center justify-center text-sm text-neutral-500 dark:text-neutral-400">
                  {socialIcon[item.label] ?? "•"}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
