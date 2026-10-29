"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { toast } from "sonner";
import { HeroCanvas } from "./HeroCanvas";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { content } from "@/content";
import {
  FileText,
  Mail,
  Copy,
  Check,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Sparkles,
} from "lucide-react";

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
      className="relative pt-24 pb-12 md:pt-32 md:pb-16"
    >
      <HeroCanvas />

      <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center md:justify-between">
        {/* Left Column: Narrative & CTA */}
        <div className="flex-1 space-y-6">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono">{content.profile.nickname}</span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {content.profile.location}
            </span>
          </div>

          {/* Masked staggered name reveal */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl font-medium tracking-tight sm:text-6xl md:text-7xl"
            >
              {content.profile.name}
            </motion.h1>
          </div>

          {/* Subtitle / Role */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-lg font-medium text-emerald-600 dark:text-emerald-400 sm:text-xl"
          >
            {content.profile.role}
          </motion.p>

          {/* Bio statement */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {content.profile.bio}
          </motion.p>

          {/* Hero tech chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center gap-1.5"
            aria-label="Core Technologies"
          >
            {heroTechStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="font-mono text-xs px-2.5 py-0.5 border border-border/50 bg-secondary/50"
              >
                {tech}
              </Badge>
            ))}
          </motion.div>

          {/* Magnetic CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <Button asChild size="lg" className="rounded-full shadow-sm hover:scale-[1.02] transition-transform">
              <Link href="/resume" className="gap-2">
                <FileText className="h-4 w-4" />
                <span>View Resume</span>
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleCopyEmail}
              className="rounded-full gap-2 hover:scale-[1.02] transition-transform"
              aria-label="Copy email address"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span>{copied ? "Copied!" : "Copy Email"}</span>
            </Button>

            <Button asChild variant="ghost" size="icon" className="rounded-full">
              <a
                href="https://github.com/Drv4ever"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>

            <Button asChild variant="ghost" size="icon" className="rounded-full">
              <a
                href="https://linkedin.com/in/dhruv-jain-4284a8263/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>

            <Button asChild variant="ghost" size="icon" className="rounded-full">
              <a
                href="https://x.com/Drv4ever632"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter Profile"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Right Column: Self-Hosted Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto md:mx-0"
        >
          <div className="relative h-40 w-40 sm:h-48 sm:w-48 overflow-hidden rounded-full border-2 border-emerald-500/30 p-1.5 shadow-xl backdrop-blur-sm dark:border-emerald-500/20">
            <Image
              src="/avatar.png"
              alt={`${content.profile.name} portrait`}
              width={192}
              height={192}
              priority
              className="h-full w-full rounded-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-2 right-2 rounded-full border border-border/80 bg-background/90 px-2.5 py-0.5 text-[11px] font-mono font-medium text-emerald-600 shadow-sm dark:text-emerald-400">
            VIT &apos;28
          </div>
        </motion.div>
      </div>
    </section>
  );
}
