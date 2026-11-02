"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { content } from "@/content";

function XIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Hero() {
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(content.profile.email);
    setCopied(true);
    toast.success("Email address copied to clipboard!", {
      description: content.profile.email,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const domainThemes = [
    "backends",
    "typescript",
    "ai agents",
    "nextjs",
    "distributed systems",
    "aws",
    "mcp",
    "python",
  ];

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="pt-20 pb-2 sm:pt-24 space-y-5"
    >
      {/* Top Header Row: Name & Social Icons in Amaan style */}
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground lowercase">
            hi, im dhruv <span className="sr-only">Dhruv Jain</span>
          </h1>
          <p className="sr-only">Full-Stack Developer & AI Systems Builder — Vellore, India</p>
        </div>

        {/* Social Icons row & Active status dot */}
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <a
              href="https://x.com/Drv4ever632"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter) Profile"
              className="hover:text-foreground transition-colors p-1"
            >
              <XIcon className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/Drv4ever"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="hover:text-foreground transition-colors p-1"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/dhruv-jain-4284a8263/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="hover:text-foreground transition-colors p-1"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="hover:text-foreground transition-colors p-1 cursor-pointer"
            >
              <Mail className="h-4 w-4" />
            </button>
            <Link
              href="/resume"
              aria-label="View Resume"
              className="hover:text-foreground transition-colors p-1"
            >
              <FileText className="h-4 w-4" />
            </Link>
          </div>

          {/* Green Status Indicator */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-semibold text-muted-foreground text-[10px]">
              {copied ? "copied email!" : "open to opportunities"}
            </span>
          </div>
        </div>
      </div>

      {/* Theme Pills (Amaan style) */}
      <div
        className="flex flex-wrap items-center gap-2 pt-0.5"
        aria-label="Core Themes & Stack"
      >
        {domainThemes.map((theme) => (
          <span
            key={theme}
            className="rounded-full border border-border/70 bg-secondary/80 px-3.5 py-1 text-xs font-semibold text-foreground/90 transition-all hover:bg-secondary hover:border-border cursor-default"
          >
            {theme}
          </span>
        ))}
      </div>

      {/* Authentic Circled Bio in Amaan style */}
      <div className="text-sm sm:text-[15px] leading-relaxed text-muted-foreground space-y-2 pt-1 font-sans">
        <p>
          i work on whatever is fun to{" "}
          <a
            href="#projects"
            className="font-bold text-foreground underline decoration-1 decoration-border underline-offset-4 hover:decoration-foreground transition-colors"
          >
            build
          </a>{" "}
          — backend-heavy full-stack apps, autonomous ai agents, event-driven cloud systems, and developer tooling. i love to own products end to end.
        </p>
        <p>
          currently exploring mcp protocols, distributed architectures, and aws cloud infrastructure. i obsess over clean architecture, latency, and documenting the systems underneath on my{" "}
          <Link
            href="/resume"
            className="font-bold text-foreground underline decoration-1 decoration-emerald-500/50 underline-offset-4 hover:text-emerald-400 hover:decoration-emerald-400 transition-colors"
          >
            resume
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
