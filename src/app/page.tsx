import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { GithubHeatmap } from "@/components/GithubHeatmap";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { Footer } from "@/components/Footer";

export default async function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-emerald-500/20 selection:text-emerald-500">
      <Navbar />

      <main className="flex-1 mx-auto max-w-2xl w-full px-5 sm:px-6 space-y-12 pb-16">
        <Hero />
        <GithubHeatmap />
        <ProjectsSection />
        <SkillsSection />
      </main>

      <Footer />
    </div>
  );
}
