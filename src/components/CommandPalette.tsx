"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { content } from "@/content";
import {
  FileText,
  Mail,
  Moon,
  Sun,
  Laptop,
  FolderGit2,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Layers,
  ArrowUpRight,
} from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const runCommand = React.useCallback(
    (command: () => void) => {
      onOpenChange(false);
      command();
    },
    [onOpenChange]
  );

  const copyEmail = () => {
    navigator.clipboard.writeText(content.profile.email);
    toast.success("Email copied to clipboard!", {
      description: content.profile.email,
    });
  };

  const scrollToSection = (id: string) => {
    if (window.location.pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                scrollToSection("projects");
              })
            }
          >
            <FolderGit2 className="mr-2 h-4 w-4" />
            <span>Projects & Works</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                scrollToSection("skills");
              })
            }
          >
            <Layers className="mr-2 h-4 w-4" />
            <span>Technical Skills</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                scrollToSection("education");
              })
            }
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            <span>Education & Timeline</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                scrollToSection("achievements");
              })
            }
          >
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Achievements & Patents</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                router.push("/resume");
              })
            }
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>View Resume Page</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          {content.projects.map((project) => (
            <CommandItem
              key={project.id}
              onSelect={() =>
                runCommand(() => {
                  const targetUrl = project.live ?? project.github;
                  if (targetUrl) {
                    window.open(targetUrl, "_blank", "noopener,noreferrer");
                  }
                })
              }
            >
              <ArrowUpRight className="mr-2 h-4 w-4" />
              <span>{project.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(copyEmail)}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Copy Email ({content.profile.email})</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                const a = document.createElement("a");
                a.href = "/Dhruv-Jain-Resume.pdf";
                a.download = "Dhruv-Jain-Resume.pdf";
                a.click();
                toast.success("Resume download initiated");
              })
            }
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>Download Resume PDF</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                setTheme(theme === "dark" ? "light" : "dark");
              })
            }
          >
            {theme === "dark" ? (
              <Sun className="mr-2 h-4 w-4" />
            ) : (
              <Moon className="mr-2 h-4 w-4" />
            )}
            <span>Toggle Theme (currently {theme})</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Connect">
          {content.profile.socials
            .filter((s) => s.href.startsWith("http"))
            .map((s) => (
              <CommandItem
                key={s.label}
                onSelect={() =>
                  runCommand(() => {
                    window.open(s.href, "_blank", "noopener,noreferrer");
                  })
                }
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                <span>{s.label}</span>
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
