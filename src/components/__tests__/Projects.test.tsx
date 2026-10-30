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
import { ProjectLandingPreview } from "../ProjectLandingPreview";
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
    const project = content.projects.find((p) => p.id === "mongo-mcp")!;

    render(<ProjectCard project={project} onSelect={onSelect} />);
    expect(screen.getByText("MongoDB MCP Server for AI Tools")).toBeInTheDocument();

    const inspectBtn = screen.getByRole("button", { name: /inspect architecture/i });
    await user.click(inspectBtn);

    expect(onSelect).toHaveBeenCalledWith(project);

    // Toggle preview button
    const toggleBtn = screen.getByRole("button", { name: /landing page/i });
    await user.click(toggleBtn);
    expect(screen.getByText("MCP Inspector Client")).toBeInTheDocument();
  });

  it("handles mouse movements and tilt calculation on fine pointer devices", () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("pointer: fine"),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const project = content.projects.find((p) => p.id === "mongo-mcp")!;
    const { container } = render(<ProjectCard project={project} onSelect={vi.fn()} />);
    const card = container.firstChild as HTMLElement;

    fireEvent.mouseEnter(card);
    fireEvent.mouseMove(card, { clientX: 100, clientY: 100 });
    fireEvent.mouseLeave(card);

    window.matchMedia = originalMatchMedia;
  });

  it("ProjectDetailDialog displays architecture, live link button, and technical details", () => {
    // Project with live link (TCRAS)
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

    render(<LearningProjects />);
    expect(screen.getByRole("heading", { name: "Vaultify — Password Manager" })).toBeInTheDocument();
    expect(screen.getByText("Backend Cryptography Practice")).toBeInTheDocument();

    const vaultifyArticle = screen.getByRole("article");
    fireEvent.mouseEnter(vaultifyArticle);
    expect(screen.getByText("Vaultify Security Dashboard")).toBeInTheDocument();
    fireEvent.mouseLeave(vaultifyArticle);

    const toggleBtn = screen.getByRole("button", { name: /landing page/i });
    fireEvent.click(toggleBtn);
    expect(screen.getByText("Vaultify Security Dashboard")).toBeInTheDocument();
  });

  it("ProjectsSection integrates spotlight, cards, and opens modal on click", async () => {
    const user = userEvent.setup();
    render(<ProjectsSection />);

    expect(screen.getByText("Engineered Products & Architectures")).toBeInTheDocument();
    expect(screen.getByText("SlideOS — AI-Powered Presentation Builder")).toBeInTheDocument();

    const inspectButtons = screen.getAllByRole("button", { name: /inspect architecture/i });
    await user.click(inspectButtons[0]);

    // Modal opens
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("handles hover and click preview toggling on cards", async () => {
    const user = userEvent.setup();
    render(<SlideOSSpotlight />);

    const spotlightArticle = screen.getByRole("article", { name: "SlideOS Spotlight Project" });
    fireEvent.mouseEnter(spotlightArticle);
    expect(screen.getByText("Scalable Distributed Systems")).toBeInTheDocument();

    fireEvent.mouseLeave(spotlightArticle);

    // Toggle via button
    const toggleBtn = screen.getByRole("button", { name: /landing page/i });
    await user.click(toggleBtn);
    expect(screen.getByText("Scalable Distributed Systems")).toBeInTheDocument();
  });
});

describe("ProjectLandingPreview Component", () => {
  it("renders mockups for all project types correctly", () => {
    const slideOs = content.projects.find((p) => p.id === "slide-os")!;
    const parcel = content.projects.find((p) => p.id === "parcel-locker")!;
    const mongo = content.projects.find((p) => p.id === "mongo-mcp")!;
    const tcras = content.projects.find((p) => p.id === "tcras")!;
    const vaultify = content.projects.find((p) => p.id === "vaultify")!;

    const { rerender } = render(<ProjectLandingPreview project={slideOs} />);
    expect(screen.getByText("SlideOS AI")).toBeInTheDocument();
    expect(screen.getByText("Scalable Distributed Systems")).toBeInTheDocument();

    rerender(<ProjectLandingPreview project={parcel} />);
    expect(screen.getByText("AWS EC2 Warden Portal")).toBeInTheDocument();
    expect(screen.getByText("15.207.54.197:443")).toBeInTheDocument();

    rerender(<ProjectLandingPreview project={mongo} />);
    expect(screen.getByText("MCP Inspector Client")).toBeInTheDocument();
    expect(screen.getByText("Read-Only Safe")).toBeInTheDocument();

    rerender(<ProjectLandingPreview project={tcras} />);
    expect(screen.getByText("Risk Amplification Engine")).toBeInTheDocument();
    expect(screen.getByText(/Anomaly Score: 0.14/)).toBeInTheDocument();

    rerender(<ProjectLandingPreview project={vaultify} />);
    expect(screen.getByText("Vaultify Security Dashboard")).toBeInTheDocument();
    expect(screen.getByText("GitHub Auth Token")).toBeInTheDocument();
  });

  it("handles fallback domain when url parsing fails or when url is missing", () => {
    const mockProjectNoUrls = {
      ...content.projects[0],
      live: undefined,
      github: undefined,
    };
    const { rerender } = render(<ProjectLandingPreview project={mockProjectNoUrls} />);
    expect(screen.getByText("project.internal")).toBeInTheDocument();
    expect(screen.getByText("preview")).toBeInTheDocument();

    // Invalid url fallback branch
    const mockProjectInvalidLive = {
      ...content.projects[0],
      live: "not-a-valid-url",
      github: undefined,
    };
    rerender(<ProjectLandingPreview project={mockProjectInvalidLive} />);
    expect(screen.getByText("not-a-valid-url")).toBeInTheDocument();

    // Invalid github fallback branch
    const mockProjectInvalidGithub = {
      ...content.projects[0],
      live: undefined,
      github: "not-a-valid-github",
    };
    rerender(<ProjectLandingPreview project={mockProjectInvalidGithub} />);
    expect(screen.getByText("not-a-valid-github")).toBeInTheDocument();
  });
});
