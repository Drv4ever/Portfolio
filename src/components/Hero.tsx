"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { content } from "@/content";

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

  const heroTechStack = [
    "TypeScript",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "AWS",
    "MCP",
    "Groq LLM",
  ];

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="pt-20 pb-4 sm:pt-24 sm:pb-8 space-y-5"
    >
      {/* Top Status Indicator (Amaan style) */}
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground font-mono">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="font-semibold text-foreground">{content.profile.location}</span>
        <span className="text-border">•</span>
        <span className="font-medium text-muted-foreground">open for software & ai engineering</span>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-6">
        <div className="space-y-3.5 flex-1">
          {/* Name & Role */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {content.profile.name}
            </h1>
            <p className="text-sm sm:text-base font-bold text-muted-foreground">
              {content.profile.role}
            </p>
          </div>

          {/* Authentic Bio */}
          <p className="text-sm leading-relaxed text-muted-foreground max-w-xl">
            <strong className="font-bold text-foreground">Information Technology undergraduate</strong> at <strong className="font-bold text-foreground">Vellore Institute of Technology</strong>. I engineer <strong className="font-bold text-foreground">full-stack platforms</strong>, autonomous AI agent protocols (<strong className="font-semibold text-foreground">MCP, LangGraph</strong>), and event-driven <strong className="font-semibold text-foreground">AWS cloud architectures</strong>.
          </p>

          {/* Tech Stack Chips */}
          <div
            className="flex flex-wrap items-center gap-1.5 pt-1"
            aria-label="Core Technologies"
          >
            {heroTechStack.map((tech) => (
              <span
                key={tech}
                className="font-mono rounded border border-border bg-background px-2.5 py-0.5 text-[11px] font-semibold text-foreground/90"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono">
            <a
              href="https://github.com/Drv4ever"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="font-bold text-muted-foreground hover:text-foreground transition-colors underline decoration-1 decoration-border underline-offset-4 hover:decoration-foreground"
            >
              github ↗
            </a>
            <a
              href="https://linkedin.com/in/dhruv-jain-4284a8263/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="font-bold text-muted-foreground hover:text-foreground transition-colors underline decoration-1 decoration-border underline-offset-4 hover:decoration-foreground"
            >
              linkedin ↗
            </a>
            <a
              href="https://x.com/Drv4ever632"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter) Profile"
              className="font-bold text-muted-foreground hover:text-foreground transition-colors underline decoration-1 decoration-border underline-offset-4 hover:decoration-foreground"
            >
              x ↗
            </a>
            <button
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="font-bold text-muted-foreground hover:text-foreground transition-colors underline decoration-1 decoration-border underline-offset-4 hover:decoration-foreground"
            >
              {copied ? "copied email!" : "email"}
            </button>
            <Link
              href="/resume"
              aria-label="View Resume"
              className="text-emerald-500 hover:text-emerald-400 font-bold transition-colors underline decoration-1 decoration-emerald-500/40 underline-offset-4 hover:decoration-emerald-400"
            >
              resume ↗
            </Link>
          </div>
        </div>

        {/* Circular Avatar */}
        <div className="relative shrink-0 self-start">
          <div className="h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full border border-border bg-card p-1 shadow-sm">
            <Image
              src="/avatar.png"
              alt={`${content.profile.name} portrait`}
              width={96}
              height={96}
              priority
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
