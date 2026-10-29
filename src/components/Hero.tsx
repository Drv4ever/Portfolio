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
      className="pt-20 pb-8 sm:pt-24 sm:pb-12 space-y-6"
    >
      {/* Top Availability / Location Tag */}
      <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-border bg-card px-4 py-1.5 font-mono text-xs text-foreground">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="font-semibold">{content.profile.nickname}</span>
        <span className="text-muted-foreground">•</span>
        <span>{content.profile.location}</span>
        <span className="hidden sm:inline text-muted-foreground">•</span>
        <span className="hidden sm:inline text-muted-foreground">
          Open to Summer · Software & AI Engineering
        </span>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-6">
        <div className="space-y-4 flex-1">
          {/* Monospace Greeting */}
          <p className="font-mono text-sm text-emerald-500 dark:text-emerald-400">
            Hi, I&apos;m Dhruv
          </p>

          {/* Clean Name & Tagline */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              {content.profile.name}
            </h1>
            <p className="font-mono text-sm text-muted-foreground">
              {content.profile.role}
            </p>
          </div>

          {/* Narrative bio paragraphs (Maanas Tyagi style) */}
          <div className="space-y-2.5 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-2xl">
            <p>
              Information Technology undergraduate at Vellore Institute of Technology. I engineer full-stack platforms, autonomous AI agent protocols (MCP, LangGraph), and event-driven AWS cloud architectures.
            </p>
            <p>
              Built SlideOS—an AI presentation engineering workspace with a deterministic slide layout compiler, 209 automated unit and integration tests, and real-time SVG rendering.
            </p>
          </div>

          {/* Tech Stack Chips */}
          <div
            className="flex flex-wrap items-center gap-1.5 pt-1"
            aria-label="Core Technologies"
          >
            {heroTechStack.map((tech) => (
              <span
                key={tech}
                className="font-mono rounded-full border border-border bg-card px-2.5 py-0.5 text-[11px] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Monospace Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-3 font-mono text-sm">
            <a
              href="https://github.com/Drv4ever"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/dhruv-jain-4284a8263/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://x.com/Drv4ever632"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter Profile"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              X ↗
            </a>
            <button
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {copied ? "Copied!" : "Email"}
            </button>
            <Link
              href="/resume"
              aria-label="View Resume"
              className="text-emerald-500 hover:underline dark:text-emerald-400"
            >
              resume ↗
            </Link>
          </div>
        </div>

        {/* Avatar */}
        <div className="relative shrink-0 self-start">
          <div className="h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full border border-border bg-card p-1">
            <Image
              src="/avatar.png"
              alt={`${content.profile.name} portrait`}
              width={112}
              height={112}
              priority
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
