"use client";

import * as React from "react";
import { toast } from "sonner";
import { content } from "@/content";
import {
  Mail,
  Copy,
  Check,
  ArrowUp,
  Github,
  Linkedin,
  Twitter,
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
      className="mt-16 border-t border-border bg-background pt-12 pb-12"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-8">
        {/* Contact Card (Maanas Tyagi card style) */}
        <article className="rounded-lg border border-border bg-card p-6 space-y-4">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-500">
              Get In Touch
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
              Let&apos;s build intelligent systems together.
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Open to Software Engineering and Full-Stack Internships for Summer 2026.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={`mailto:${content.profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 font-mono text-xs text-emerald-500 hover:bg-emerald-500/20 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Send Email</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy Address to clipboard"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              <span>{copied ? "Copied" : "Copy Address"}</span>
            </button>
          </div>
        </article>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/40 pt-6 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">
              {content.profile.name}
            </span>
            <span>•</span>
            <span>VIT Vellore (2024–2028)</span>
            <span>•</span>
            <span>Vellore, India</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Drv4ever"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/dhruv-jain-4284a8263/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="hover:text-foreground transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://x.com/Drv4ever632"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter Profile"
              className="hover:text-foreground transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top of page"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
