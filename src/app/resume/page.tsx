import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { content } from "@/content";

export const metadata: Metadata = {
  title: `Resume | ${content.profile.name}`,
  description: `Official Curriculum Vitae of ${content.profile.name} — B.Tech Information Technology, VIT Vellore.`,
  alternates: {
    canonical: "/resume",
  },
};

export default function ResumePage() {
  const resumeUrl = "/Dhruv-Jain-Resume.pdf";

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 mx-auto max-w-5xl w-full px-4 pt-28 pb-16 sm:px-6">
        {/* Navigation & Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border/60">
          <div className="space-y-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors pb-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Portfolio</span>
            </Link>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight">
              Curriculum Vitae
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-mono">
              {content.profile.name} • VIT Vellore (CGPA 9.08)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild size="lg" className="rounded-full gap-2 shadow-sm bg-emerald-600 hover:bg-emerald-500 text-white">
              <a href={resumeUrl} download="Dhruv-Jain-Resume.pdf">
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full gap-2">
              <a href={resumeUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4" />
                <span>Open in Tab</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Fallback notification for mobile/unsupported viewers */}
        <div className="mt-4 rounded-xl border border-border/50 bg-secondary/30 p-4 text-xs text-muted-foreground flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>
              If the inline PDF viewer does not load on your mobile device, you can view or download it directly.
            </span>
          </div>
          <a
            href={resumeUrl}
            download="Dhruv-Jain-Resume.pdf"
            className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
          >
            Direct Download →
          </a>
        </div>

        {/* Inline PDF Viewer Frame */}
        <div className="mt-6 rounded-2xl border border-border/80 bg-card overflow-hidden shadow-lg h-[800px] w-full">
          <iframe
            src={`${resumeUrl}#toolbar=0&navpanes=0`}
            title={`${content.profile.name} Resume PDF`}
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
