import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { GithubHeatmap } from "@/components/GithubHeatmap";
import { EducationTimeline } from "@/components/EducationTimeline";
import { AchievementsSection } from "@/components/AchievementsSection";
import { Footer } from "@/components/Footer";

export default async function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-emerald-500/20 selection:text-emerald-500">
      <Navbar />

      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 space-y-16 pb-16">
        <Hero />
        <ProjectsSection />
        <GithubHeatmap />
        <SkillsSection />
        <EducationTimeline />
        <AchievementsSection />
      </main>

      <Footer />
    </div>
  );
}
