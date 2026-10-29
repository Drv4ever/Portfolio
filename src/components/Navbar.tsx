"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { CommandPalette } from "./CommandPalette";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Command,
  Moon,
  Sun,
  Menu,
  FileText,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { content } from "@/content";

const NAV_LINKS = [
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Education", href: "/#education", id: "education" },
  { label: "Achievements", href: "/#achievements", id: "achievements" },
  { label: "Resume", href: "/resume", id: "resume" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("");
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["hero", "projects", "skills", "education", "achievements"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Scroll progress indicator */}
        <div
          className="h-[2px] bg-emerald-500/80 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-3xl px-4 pt-3 pb-2 sm:px-6">
          <nav
            aria-label="Main Navigation"
            className="flex items-center justify-between rounded-full border border-border/60 bg-background/80 px-4 py-2 backdrop-blur-md shadow-sm"
          >
            {/* Logo / Monogram */}
            <Link
              href="/"
              className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight transition-colors hover:text-emerald-500"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background font-mono text-xs font-bold transition-transform group-hover:scale-105">
                DJ
              </span>
              <span className="hidden font-serif tracking-normal sm:inline-block">
                {content.profile.name}
              </span>
              <span
                className="hidden h-2 w-2 rounded-full bg-emerald-500 animate-pulse sm:inline-block"
                title="Available for Summer 2026 roles"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 text-sm font-medium">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (pathname === "/" && activeSection === link.id);

                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    className={`rounded-full px-3.5 py-1.5 transition-colors ${
                      isActive
                        ? "bg-accent text-accent-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2">
              {/* Command Palette Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCommandOpen(true)}
                className="h-8 gap-1.5 rounded-full px-2.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <Command className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only sm:not-sr-only">Search</span>
                <kbd
                  aria-hidden="true"
                  className="pointer-events-none hidden h-4 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex"
                >
                  ⌘K
                </kbd>
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-8 w-8 rounded-full"
                aria-label="Toggle visual theme"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="h-4 w-4 text-neutral-200" />
                ) : (
                  <Moon className="h-4 w-4 text-neutral-800" />
                )}
              </Button>

              {/* Mobile Menu Hamburger (Sheet) */}
              <div className="md:hidden">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      aria-label="Open mobile menu"
                    >
                      <Menu className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-72">
                    <SheetHeader className="text-left pb-4 border-b border-border/40">
                      <SheetTitle className="font-serif text-lg">
                        {content.profile.name}
                      </SheetTitle>
                      <p className="text-xs text-muted-foreground">
                        {content.profile.role}
                      </p>
                    </SheetHeader>

                    <div className="flex flex-col gap-2 pt-6">
                      {NAV_LINKS.map((link) => (
                        <Link
                          key={link.id}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      ))}

                      <div className="my-4 h-px bg-border/60" />

                      <Link
                        href={`mailto:${content.profile.email}`}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-emerald-500 hover:bg-accent"
                      >
                        <Mail className="h-4 w-4" />
                        <span>Get in Touch</span>
                      </Link>

                      <a
                        href="/Dhruv-Jain-Resume.pdf"
                        download="Dhruv-Jain-Resume.pdf"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
                      >
                        <FileText className="h-4 w-4" />
                        <span>Download Resume PDF</span>
                      </a>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Global Command Palette Dialog */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
