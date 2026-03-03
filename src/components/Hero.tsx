"use client";

import { FadeIn } from "@/components/Motion";
import HeroActions from "@/components/HeroActions";
import { profile } from "@/data/content";

export default function Hero() {
  const socialIcon: Record<string, JSX.Element> = {
    Email: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
    LinkedIn: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M6.94 8.5a1.56 1.56 0 1 1 0-3.12 1.56 1.56 0 0 1 0 3.12ZM5.6 9.75h2.68V18H5.6V9.75Zm4.35 0h2.57v1.13h.04c.36-.68 1.23-1.4 2.54-1.4 2.72 0 3.22 1.78 3.22 4.09V18h-2.67v-3.88c0-.92-.02-2.1-1.28-2.1-1.28 0-1.48 1-1.48 2.03V18H9.95V9.75Z" />
      </svg>
    ),
    Twitter: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M18.9 2H22l-6.77 7.73L23.2 22h-6.26l-4.9-6.42L6.42 22H3.3l7.24-8.27L.8 2h6.42l4.43 5.86L18.9 2Zm-1.1 18h1.73L6.3 3.9H4.44L17.8 20Z" />
      </svg>
    ),
    GitHub: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M12 .7a11.3 11.3 0 0 0-3.57 22.02c.57.1.78-.25.78-.55v-2.14c-3.17.69-3.84-1.34-3.84-1.34-.52-1.31-1.27-1.66-1.27-1.66-1.03-.7.08-.7.08-.7 1.14.08 1.74 1.16 1.74 1.16 1 .72 2.6.52 3.24.4.1-.73.4-1.23.72-1.52-2.53-.29-5.19-1.25-5.19-5.55 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.12-2.97 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.66 0c2.14-1.46 3.08-1.16 3.08-1.16.63 1.54.24 2.69.12 2.97.72.79 1.16 1.8 1.16 3.03 0 4.31-2.67 5.26-5.2 5.54.4.35.78 1.03.78 2.08v3.1c0 .3.2.66.79.55A11.3 11.3 0 0 0 12 .7Z" />
      </svg>
    )
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
                <span className="inline-flex h-5 w-5 items-center justify-center text-neutral-500 dark:text-neutral-400">
                  {socialIcon[item.label] ?? <span className="text-xs">•</span>}
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
