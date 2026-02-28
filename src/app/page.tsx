import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Projects from "@/components/Projects";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { FadeIn } from "@/components/Motion";
import { education } from "@/data/content";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-8 pt-16 md:px-8">
      <ThemeToggle />
      <Header />

      <div className="grid gap-8 lg:grid-cols-[1.7fr_0.9fr]">
        <div>
          <Hero />
        </div>
        <div className="pt-10 lg:pt-10">
          <Sidebar />
        </div>
      </div>

      <div>
        <Projects />
      </div>

      <FadeIn>
        <Section title="Education">
          <div className="grid gap-4 md:grid-cols-2">
            {education.map((item) => (
              <article key={item.school} className="rounded-md border border-border-light p-4 dark:border-border-dark">
                <h3 className="font-serif text-2xl">{item.school}</h3>
                <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </Section>
      </FadeIn>

      <Footer />
    </div>
  );
}
