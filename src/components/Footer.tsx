"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { content } from "@/content";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Copy,
  Check,
  ArrowUp,
  Github,
  Linkedin,
  Twitter,
  Heart,
} from "lucide-react";

export function Footer() {
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(content.profile.email);
    setCopied(true);
    toast.success("Email copied to clipboard!", {
      description: content.profile.email,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      aria-label="Footer and Contact Information"
      className="mt-20 border-t border-border/60 bg-card/30 pt-16 pb-12 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-12">
        {/* Top Contact CTA Banner */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-3xl border border-border/60 bg-card/80 p-8 shadow-sm">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Get In Touch
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground">
              Let&apos;s build intelligent systems together.
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg">
              Open to Software Engineering and Full-Stack Internships for Summer 2026.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full shadow-sm bg-emerald-600 hover:bg-emerald-500 text-white">
              <a href={`mailto:${content.profile.email}`} className="gap-2">
                <Mail className="h-4 w-4" />
                <span>Send Email</span>
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleCopyEmail}
              className="rounded-full gap-2"
              aria-label="Copy Address to clipboard"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span>{copied ? "Copied" : "Copy Address"}</span>
            </Button>
          </div>
        </div>

        {/* Bottom Metadata & Social Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-border/40 pt-8 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-serif font-medium text-foreground">
              {content.profile.name}
            </span>
            <span>•</span>
            <span>VIT Vellore (2024–2028)</span>
            <span>•</span>
            <span>Vellore, India</span>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <a
                href="https://github.com/Drv4ever"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>

            <Button asChild variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <a
                href="https://linkedin.com/in/dhruv-jain-4284a8263/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>

            <Button asChild variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <a
                href="https://x.com/Drv4ever632"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter Profile"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </Button>

            <div className="h-4 w-px bg-border/60 mx-1" />

            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="h-8 gap-1.5 rounded-full px-3 text-xs"
              aria-label="Back to top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>Top</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
