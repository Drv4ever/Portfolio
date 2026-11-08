"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Github, Linkedin, Mail, FileText, Sparkles } from "lucide-react";
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

  const playChime = (freq = 523.25) => {
    try {
      if (typeof window !== "undefined" && window.AudioContext) {
        const ctx = new window.AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch {
      // Audio optional
    }
  };

  const handleAvatarClick = () => {
    playChime(659.25);
    toast("👋 Hey there! Welcome to Dhruv's portfolio.", {
      description: "Feel free to explore the interactive demos and live systems below!",
      icon: <Sparkles className="h-4 w-4 text-orange-500" />,
    });
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

  const handleThemeClick = (theme: string, idx: number) => {
    const scale = [392, 440, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99];
    playChime(scale[idx % scale.length]);
    toast.info(`Specialization: ${theme}`, {
      description: `Highlighting core systems and engineering stack around ${theme}.`,
    });
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="pt-20 pb-2 sm:pt-24 space-y-5"
    >
      {/* Top Header Row: Profile Avatar, Name & Social Icons in Amaan/Aysh style */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 sm:gap-4">
          <motion.div
            className="relative group shrink-0 cursor-pointer"
            onClick={handleAvatarClick}
            whileHover={{ scale: 1.08, rotate: [0, -3, 3, -1, 1, 0] }}
            whileTap={{ scale: 0.94, rotate: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            title="Click for a friendly greeting!"
          >
            <div className="relative h-14 w-14 sm:h-16 sm:w-16 overflow-hidden rounded-full border-2 border-border/80 bg-muted shadow-md transition-all duration-300 group-hover:scale-105 group-hover:border-orange-500/60 group-hover:shadow-[0_0_16px_rgba(249,115,22,0.3)]">
              <Image
                src="/avatar.png"
                alt="Dhruv Jain"
                width={64}
                height={64}
                priority
                className="h-full w-full object-cover transition-all duration-300 group-hover:contrast-105"
              />
            </div>
            {/* Live active dot indicator pinned to avatar with warm yellowish-red flame pulse */}
            <span
              className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 ring-2 ring-background flex items-center justify-center shadow-xs"
              title="Open to opportunities"
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
            </span>
          </motion.div>

          <div>
            <h1 className="retro-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-1.5">
              hi, im Dhruv <span className="sr-only">Dhruv Jain</span>
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              full-stack & ai systems builder
            </p>
          </div>
        </div>

        {/* Social Icons row & Active status badge */}
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

          {/* Warm Yellowish-Red Status Indicator */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-500 dark:text-amber-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
            </span>
            <span className="font-semibold text-muted-foreground text-[10px]">
              {copied ? "copied email!" : "open to opportunities"}
            </span>
          </div>
        </div>
      </div>

      {/* Playful Interactive Theme Pills (Amaan style with bouncy micro-interactions) */}
      <div
        className="flex flex-wrap items-center gap-2 pt-0.5"
        aria-label="Core Themes & Stack"
      >
        {domainThemes.map((theme, idx) => (
          <motion.button
            key={theme}
            type="button"
            onClick={() => handleThemeClick(theme, idx)}
            whileHover={{ y: -3, scale: 1.06, rotate: idx % 2 === 0 ? 1.5 : -1.5 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 450, damping: 18 }}
            className="rounded-full border border-orange-500/20 bg-secondary/80 px-3.5 py-1 text-xs font-semibold text-foreground/90 transition-colors hover:border-orange-500/60 hover:bg-orange-500/10 hover:text-orange-400 cursor-pointer shadow-xs"
          >
            {theme}
          </motion.button>
        ))}
      </div>

      {/* Authentic Circled Bio in Amaan style */}
      <div className="text-sm sm:text-[15px] leading-relaxed text-muted-foreground space-y-2 pt-1 font-sans">
        <p>
          i work on whatever is fun to{" "}
          <a
            href="#projects"
            className="font-bold text-foreground underline decoration-1 decoration-border underline-offset-4 hover:text-orange-400 hover:decoration-orange-400 transition-colors"
          >
            build
          </a>{" "}
          — backend-heavy full-stack apps, autonomous ai agents, event-driven cloud systems, and developer tooling. i love to own products end to end.
        </p>
        <p>
          currently exploring mcp protocols, distributed architectures, and aws cloud infrastructure. i obsess over clean architecture, latency, and documenting the systems underneath on my{" "}
          <Link
            href="/resume"
            className="font-bold text-foreground underline decoration-1 decoration-orange-500/60 underline-offset-4 hover:text-orange-400 hover:decoration-orange-400 transition-colors"
          >
            resume
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
