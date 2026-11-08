"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
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
  Volume2,
  VolumeX,
} from "lucide-react";
import { content } from "@/content";

const NAV_LINKS = [
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Skills", href: "/#skills", id: "skills" },
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
  const [soundMuted, setSoundMuted] = React.useState(true);

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

    const sectionIds = ["hero", "projects", "skills"];
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

  const toggleSound = () => {
    setSoundMuted((prev) => {
      const next = !prev;
      if (!next) {
        try {
          if (typeof window !== "undefined" && window.AudioContext) {
            const ctx = new window.AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(659.25, ctx.currentTime);
            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
          }
        } catch {
          // Audio optional
        }
        toast.success("Sound effects enabled");
      } else {
        toast.info("Sound effects muted");
      }
      return next;
    });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Scroll progress indicator */}
        <div
          className="h-[2px] bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-2xl px-4 pt-3 pb-2 sm:px-6">
          <nav
            aria-label="Main Navigation"
            className="flex items-center justify-between rounded-full border border-border/80 bg-background/85 px-4 py-1.5 backdrop-blur-md shadow-sm"
          >
            {/* Left Controls: Audio Icon & Logo */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSound}
                className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground"
                aria-label={soundMuted ? "Unmute audio effects" : "Mute audio effects"}
              >
                {soundMuted ? (
                  <VolumeX className="h-3.5 w-3.5" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5 text-orange-500" />
                )}
              </Button>

              <Link
                href="/"
                className="group flex items-center gap-2 text-sm font-medium tracking-tight transition-colors hover:text-orange-500"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background font-mono text-[11px] font-extrabold transition-transform group-hover:scale-110 group-hover:rotate-6">
                  DJ
                </span>
                <span className="font-mono text-sm font-bold tracking-tight text-foreground">
                  Dhruv<span className="text-orange-500">.</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links with Amaan-style Underline Indicator */}
            <div className="hidden md:flex items-center gap-1 text-xs font-mono">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (pathname === "/" && activeSection === link.id);

                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    className={`relative px-3 py-1 lowercase transition-colors ${
                      isActive
                        ? "text-foreground font-bold"
                        : "text-muted-foreground hover:text-foreground font-semibold"
                    }`}
                  >
                    <span>{link.label.toLowerCase()}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Command Palette Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCommandOpen(true)}
                className="h-7 gap-1.5 rounded-full px-2.5 text-xs text-muted-foreground hover:text-foreground font-semibold"
              >
                <Command className="h-3 w-3" aria-hidden="true" />
                <span className="sr-only sm:not-sr-only">Search</span>
                <kbd
                  aria-hidden="true"
                  className="pointer-events-none hidden h-4 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-bold text-muted-foreground sm:inline-flex"
                >
                  ⌘K
                </kbd>
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-7 w-7 rounded-full"
                aria-label="Toggle visual theme"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="h-3.5 w-3.5 text-neutral-200" />
                ) : (
                  <Moon className="h-3.5 w-3.5 text-neutral-800" />
                )}
              </Button>

              {/* Mobile Menu Hamburger (Sheet) */}
              <div className="md:hidden">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      aria-label="Open mobile menu"
                    >
                      <Menu className="h-3.5 w-3.5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-72">
                    <SheetHeader className="text-left pb-4 border-b border-border/40">
                      <SheetTitle className="text-base font-bold">
                        {content.profile.name}
                      </SheetTitle>
                      <p className="text-xs text-muted-foreground font-mono font-medium">
                        {content.profile.role}
                      </p>
                    </SheetHeader>

                    <div className="flex flex-col gap-2 pt-6">
                      {NAV_LINKS.map((link) => (
                        <Link
                          key={link.id}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-mono font-bold text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                        >
                          <span>{link.label.toLowerCase()}</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      ))}

                      <div className="pt-4 border-t border-border/40 space-y-2">
                        <Link
                          href="/resume"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-mono font-bold text-orange-500 hover:bg-orange-500/10 transition-colors"
                        >
                          <FileText className="h-4 w-4" />
                          <span>view resume</span>
                        </Link>
                        <a
                          href={`mailto:${content.profile.email}`}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-mono font-bold text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                          <span>contact via email</span>
                        </a>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Global Command Palette */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
