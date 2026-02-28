"use client";

import { Stagger, staggerItem } from "@/components/Motion";
import Section from "@/components/Section";
import { featuredWorks } from "@/data/content";
import { motion } from "framer-motion";

export default function Projects() {
  return (
    <Section title="Featured Works">
      <Stagger>
        {featuredWorks.map((work, index) => (
          <motion.article
            key={work.title}
            variants={staggerItem}
            className={index === featuredWorks.length - 1 ? "pb-2" : "border-b border-border-light pb-6 dark:border-border-dark"}
          >
            <h3 className="font-serif text-2xl">{work.title}</h3>
            <p className="mt-2 text-sm leading-7 text-neutral-700 dark:text-neutral-300">{work.description}</p>
            <div className="mt-4 flex gap-4 text-xs uppercase tracking-editorial">
              {work.live ? (
                <a className="underline-offset-4 hover:underline" href={work.live} target="_blank" rel="noreferrer">
                  Live
                </a>
              ) : null}
              <a className="underline-offset-4 hover:underline" href={work.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {work.techStack.map((tech) => (
                <span
                  key={`${work.title}-${tech.name}`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border-light px-2 py-1 text-[10px] uppercase tracking-editorial dark:border-border-dark"
                >
                  <img src={tech.logo} alt={`${tech.name} logo`} className="h-3.5 w-3.5" loading="lazy" />
                  {tech.name}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </Stagger>
    </Section>
  );
}
