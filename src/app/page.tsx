import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatStrip } from "@/components/StatStrip";
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

      <main className="flex-1 mx-auto max-w-5xl w-full px-4 sm:px-6">
        <Hero />
        <StatStrip />
        <ProjectsSection />
        <SkillsSection />
        <GithubHeatmap />
        <EducationTimeline />
        <AchievementsSection />
      </main>

      <Footer />
    </div>
  );
}
