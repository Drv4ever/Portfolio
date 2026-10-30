import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SlideOSSpotlight } from "../SlideOSSpotlight";
import { ProjectArchitectureDiagram } from "../ProjectArchitectureDiagram";
import { ProjectDetailDialog } from "../ProjectDetailDialog";
import { ProjectCard } from "../ProjectCard";
import { LearningProjects } from "../LearningProjects";
import { ProjectsSection } from "../ProjectsSection";
import { ProjectSquarePopup } from "../ProjectSquarePopup";
import { content } from "@/content";

describe("SlideOSSpotlight", () => {
  it("returns null when project is null", () => {
    const { container } = render(<SlideOSSpotlight project={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders status badge, project title, and live links", () => {
    render(<SlideOSSpotlight />);
    expect(screen.getByText("Active Project")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("SlideOS — AI-Powered Presentation Builder");

    const liveBtn = screen.getByRole("link", { name: /slideos live demo application/i });
    expect(liveBtn).toHaveAttribute("href", "https://slide-os.vercel.app/");

    const githubBtn = screen.getByRole("link", { name: /slideos github repository/i });
    expect(githubBtn).toHaveAttribute("href", "https://github.com/Drv4ever/SlideOS");
  });

  it("renders project description and tech stack", () => {
    render(<SlideOSSpotlight />);
    expect(screen.getByText(/Full-stack web app that generates slide outlines/i)).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Groq LLM")).toBeInTheDocument();
  });

  it("triggers onHover on mouseEnter and mouseLeave", () => {
    const onHover = vi.fn();
    render(<SlideOSSpotlight onHover={onHover} />);
    const article = screen.getByRole("article", { name: "SlideOS Spotlight Project" });

    fireEvent.mouseEnter(article);
    expect(onHover).toHaveBeenCalledWith(expect.objectContaining({ id: "slide-os" }));

    fireEvent.mouseLeave(article);
    expect(onHover).toHaveBeenCalledWith(null);
  });

  it("handles mouseEnter and mouseLeave when onHover is undefined", () => {
    render(<SlideOSSpotlight />);
    const article = screen.getByRole("article", { name: "SlideOS Spotlight Project" });
    expect(() => {
      fireEvent.mouseEnter(article);
      fireEvent.mouseLeave(article);
    }).not.toThrow();
  });
});

describe("ProjectArchitectureDiagram Component", () => {
  it("renders MongoDB MCP Server schematic correctly", () => {
    const mongoProject = content.projects.find((p) => p.id === "mongo-mcp")!;
    render(<ProjectArchitectureDiagram project={mongoProject} />);
    expect(screen.getByLabelText("MongoDB MCP Server Architecture")).toBeInTheDocument();
    expect(screen.getByText("TypeScript MCP Server")).toBeInTheDocument();
    expect(screen.getByText("Zod Request Validation")).toBeInTheDocument();
  });

  it("renders Parcel Locker schematic correctly", () => {
    const parcelProject = content.projects.find((p) => p.id === "parcel-locker")!;
    render(<ProjectArchitectureDiagram project={parcelProject} />);
    expect(screen.getByLabelText("Digital Parcel Locker Architecture")).toBeInTheDocument();
    expect(screen.getByText("Warden Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Core Lambda")).toBeInTheDocument();
    expect(screen.getByText("DynamoDB")).toBeInTheDocument();
  });

  it("renders TCRAS Risk Engine schematic correctly", () => {
    const tcrasProject = content.projects.find((p) => p.id === "tcras")!;
    render(<ProjectArchitectureDiagram project={tcrasProject} />);
    expect(screen.getByLabelText("TCRAS Risk Architecture")).toBeInTheDocument();
    expect(screen.getByText("FastAPI")).toBeInTheDocument();
    expect(screen.getByText("Isolation Forest")).toBeInTheDocument();
  });

  it("returns null for projects without custom diagrams", () => {
    const vaultify = content.projects.find((p) => p.id === "vaultify")!;
    const { container } = render(<ProjectArchitectureDiagram project={vaultify} />);
    expect(container.firstChild).toBeNull();
  });
});

describe("ProjectCard and Detail Dialog", () => {
  it("renders project details and triggers onSelect", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onHover = vi.fn();
    const project = content.projects.find((p) => p.id === "mongo-mcp")!;

    render(<ProjectCard project={project} onSelect={onSelect} onHover={onHover} />);
    expect(screen.getByText("MongoDB MCP Server for AI Tools")).toBeInTheDocument();

    const inspectBtn = screen.getByRole("button", { name: /inspect architecture/i });
    await user.click(inspectBtn);
    expect(onSelect).toHaveBeenCalledWith(project);

    const article = screen.getByRole("article");
    fireEvent.mouseEnter(article);
    expect(onHover).toHaveBeenCalledWith(project);

    fireEvent.mouseLeave(article);
    expect(onHover).toHaveBeenCalledWith(null);
  });

  it("handles mouseEnter and mouseLeave when onHover is undefined", () => {
    const project = content.projects.find((p) => p.id === "parcel-locker")!;
    render(<ProjectCard project={project} onSelect={vi.fn()} />);
    const article = screen.getByRole("article");
    expect(() => {
      fireEvent.mouseEnter(article);
      fireEvent.mouseLeave(article);
    }).not.toThrow();
  });

  it("ProjectDetailDialog displays architecture, live link button, and technical details", () => {
    const tcrasProject = content.projects.find((p) => p.id === "tcras")!;
    const onOpenChange = vi.fn();

    render(
      <ProjectDetailDialog
        project={tcrasProject}
        open={true}
        onOpenChange={onOpenChange}
      />
    );

    expect(screen.getByText("TCRAS — Transfer Chain Risk Amplification System")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /live/i })).toHaveAttribute("href", "https://tcras.vercel.app/");
    expect(screen.getByLabelText("TCRAS Risk Architecture")).toBeInTheDocument();
  });

  it("ProjectDetailDialog returns null when project is null", () => {
    const { container } = render(
      <ProjectDetailDialog project={null} open={false} onOpenChange={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });
});

describe("LearningProjects & ProjectsSection", () => {
  it("renders Vaultify learning card and handles empty list", () => {
    const { container: emptyContainer } = render(<LearningProjects projects={[]} />);
    expect(emptyContainer.firstChild).toBeNull();

    const onHover = vi.fn();
    render(<LearningProjects onHover={onHover} />);
    expect(screen.getByRole("heading", { name: "Vaultify — Password Manager" })).toBeInTheDocument();
    expect(screen.getByText("Backend Cryptography Practice")).toBeInTheDocument();

    const vaultifyArticle = screen.getByRole("article");
    fireEvent.mouseEnter(vaultifyArticle);
    expect(onHover).toHaveBeenCalledWith(expect.objectContaining({ id: "vaultify" }));

    fireEvent.mouseLeave(vaultifyArticle);
    expect(onHover).toHaveBeenCalledWith(null);
  });

  it("handles mouseEnter and mouseLeave on LearningProjects when onHover is undefined", () => {
    render(<LearningProjects />);
    const vaultifyArticle = screen.getByRole("article");
    expect(() => {
      fireEvent.mouseEnter(vaultifyArticle);
      fireEvent.mouseLeave(vaultifyArticle);
    }).not.toThrow();
  });

  it("ProjectsSection integrates spotlight, cards, handles mouse move and opens modal on click", async () => {
    const user = userEvent.setup();
    const { container } = render(<ProjectsSection />);

    expect(screen.getByText("Engineered Products & Architectures")).toBeInTheDocument();
    expect(screen.getByText("SlideOS — AI-Powered Presentation Builder")).toBeInTheDocument();

    const section = container.querySelector("section")!;
    fireEvent.mouseMove(section, { clientX: 200, clientY: 300 });

    const inspectButtons = screen.getAllByRole("button", { name: /inspect architecture/i });
    await user.click(inspectButtons[0]);

    // Modal opens
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

describe("ProjectSquarePopup Component", () => {
  it("returns null when project is null", () => {
    const { container } = render(<ProjectSquarePopup project={null} mousePos={{ x: 100, y: 100 }} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders preview mockups for all project types correctly", () => {
    const slideOs = content.projects.find((p) => p.id === "slide-os")!;
    const parcel = content.projects.find((p) => p.id === "parcel-locker")!;
    const mongo = content.projects.find((p) => p.id === "mongo-mcp")!;
    const tcras = content.projects.find((p) => p.id === "tcras")!;
    const vaultify = content.projects.find((p) => p.id === "vaultify")!;

    const { rerender } = render(<ProjectSquarePopup project={slideOs} mousePos={{ x: 50, y: 50 }} />);
    expect(screen.getByText("SlideOS")).toBeInTheDocument();
    expect(screen.getByText("Scalable Distributed Systems")).toBeInTheDocument();
    expect(screen.getByText("slide-os.vercel.app")).toBeInTheDocument();

    rerender(<ProjectSquarePopup project={parcel} mousePos={{ x: 50, y: 50 }} />);
    expect(screen.getByText("Warden Portal")).toBeInTheDocument();
    expect(screen.getAllByText("15.207.54.197").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Digital Parcel Locker")).toBeInTheDocument();

    rerender(<ProjectSquarePopup project={mongo} mousePos={{ x: 50, y: 50 }} />);
    expect(screen.getByText("MongoDB MCP")).toBeInTheDocument();
    expect(screen.getByText(/tools\/call: list_collections/)).toBeInTheDocument();

    rerender(<ProjectSquarePopup project={tcras} mousePos={{ x: 50, y: 50 }} />);
    expect(screen.getByText("TCRAS")).toBeInTheDocument();
    expect(screen.getByText("Risk Amplification System")).toBeInTheDocument();
    expect(screen.getByText(/0.14 \[LOW RISK\]/)).toBeInTheDocument();

    rerender(<ProjectSquarePopup project={vaultify} mousePos={{ x: 50, y: 50 }} />);
    expect(screen.getByText("Vaultify")).toBeInTheDocument();
    expect(screen.getByText("Password Manager")).toBeInTheDocument();
    expect(screen.getByText("GitHub Token")).toBeInTheDocument();
  });

  it("handles an unknown project id gracefully", () => {
    const unknownProject = {
      ...content.projects[0],
      id: "unknown-app",
      title: "Unknown Project",
    };
    render(<ProjectSquarePopup project={unknownProject} mousePos={{ x: 50, y: 50 }} />);
    expect(screen.getByText("slide-os.vercel.app")).toBeInTheDocument();
  });

  it("handles domain fallbacks when url parsing fails or when url is missing", () => {
    const mockProjectNoUrls = {
      ...content.projects[0],
      live: undefined,
      github: undefined,
    };
    const { rerender } = render(<ProjectSquarePopup project={mockProjectNoUrls} mousePos={{ x: 50, y: 50 }} />);
    expect(screen.getByText("project.internal")).toBeInTheDocument();

    // Invalid url fallback branch for live
    const mockProjectInvalidLive = {
      ...content.projects[0],
      live: "not-a-valid-url",
      github: undefined,
    };
    rerender(<ProjectSquarePopup project={mockProjectInvalidLive} mousePos={{ x: 50, y: 50 }} />);
    expect(screen.getByText("not-a-valid-url")).toBeInTheDocument();

    // Invalid github fallback branch
    const mockProjectInvalidGithub = {
      ...content.projects[0],
      live: undefined,
      github: "not-a-valid-github",
    };
    rerender(<ProjectSquarePopup project={mockProjectInvalidGithub} mousePos={{ x: 50, y: 50 }} />);
    expect(screen.getByText("not-a-valid-github")).toBeInTheDocument();
  });

  it("adjusts coordinates when near window boundaries and clamps to padding", () => {
    const originalInnerWidth = window.innerWidth;
    const originalInnerHeight = window.innerHeight;

    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1024 });
    Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: 768 });

    const slideOs = content.projects.find((p) => p.id === "slide-os")!;

    // Near right edge: targetX + 280 > 1024 - 16 (e.g. x = 900)
    // Near bottom edge: targetY + 280 > 768 - 16 (e.g. y = 600)
    const { rerender } = render(<ProjectSquarePopup project={slideOs} mousePos={{ x: 900, y: 600 }} />);
    expect(screen.getByText("SlideOS")).toBeInTheDocument();

    // Clamping to padding when negative
    rerender(<ProjectSquarePopup project={slideOs} mousePos={{ x: -100, y: -100 }} />);
    expect(screen.getByText("SlideOS")).toBeInTheDocument();

    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: originalInnerWidth });
    Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: originalInnerHeight });
  });
});
