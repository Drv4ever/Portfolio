import Section from "@/components/Section";
import { experiences } from "@/data/content";

export default function Experience() {
  return (
    <Section title="Professional Experience">
      <div className="space-y-6">
        {experiences.map((job, index) => (
          <article key={job.company} className={index === experiences.length - 1 ? "" : "border-b border-border-light pb-6 dark:border-border-dark"}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-serif text-2xl">{job.company}</h3>
              <p className="text-xs uppercase tracking-editorial text-neutral-600 dark:text-neutral-400">{job.duration}</p>
            </div>
            <p className="mt-1 text-sm uppercase tracking-editorial">{job.role}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-700 dark:text-neutral-300">
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
