import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SlideOSSpotlight } from "../SlideOSSpotlight";
import { TestSplitDonut, TestSplitTooltip } from "../TestSplitDonut";
import { ProjectArchitectureDiagram } from "../ProjectArchitectureDiagram";
import { ProjectDetailDialog } from "../ProjectDetailDialog";
import { ProjectCard } from "../ProjectCard";
import { LearningProjects } from "../LearningProjects";
import { ProjectsSection } from "../ProjectsSection";
import { content } from "@/content";

vi.mock("recharts", async () => {
  const original = await vi.importActual<Record<string, unknown>>("recharts");
  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container" style={{ width: 400, height: 200 }}>
        {children}
      </div>
    ),
  };
});

describe("SlideOSSpotlight & Tooltip", () => {
  it("returns null when project is null", () => {
    const { container } = render(<SlideOSSpotlight project={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders status badge, project title, and live links", () => {
    render(<SlideOSSpotlight />);
    expect(screen.getByText("Active Project")).toBeInTheDocument();
    expect(screen.getByText("12 Themes Engineered")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("SlideOS — AI-Powered Presentation Builder");

    const liveBtn = screen.getByRole("link", { name: /slideos live demo application/i });
    expect(liveBtn).toHaveAttribute("href", "https://slide-os.vercel.app/");

    const githubBtn = screen.getByRole("link", { name: /slideos github repository/i });
    expect(githubBtn).toHaveAttribute("href", "https://github.com/Drv4ever/SlideOS");
  });

  it("renders pipeline architecture steps", () => {
    render(<SlideOSSpotlight />);
    expect(screen.getByText("Prompt Input")).toBeInTheDocument();
    expect(screen.getByText("Groq LLM (JSON Mode)")).toBeInTheDocument();
    expect(screen.getByText("Server Enforcement & Fallback")).toBeInTheDocument();
    expect(screen.getByText("Interactive Canvas Editor")).toBeInTheDocument();
    expect(screen.getByText("Shared Layout Engine")).toBeInTheDocument();
  });

  it("renders test donut split breakdown", () => {
    render(<SlideOSSpotlight />);
    expect(screen.getByText("131 tests")).toBeInTheDocument();
    expect(screen.getByText("78 tests")).toBeInTheDocument();
    expect(screen.getByText("209 Total Verified Tests")).toBeInTheDocument();
  });

  it("TestSplitTooltip renders when active with payload and returns null when inactive", () => {
    const { container: inactiveContainer } = render(<TestSplitTooltip active={false} />);
    expect(inactiveContainer.firstChild).toBeNull();

    render(
      <TestSplitTooltip
        active={true}
        payload={[{ name: "Vitest (Frontend)", value: 131 }]}
      />
    );
    expect(screen.getByText("Vitest (Frontend): 131 tests")).toBeInTheDocument();
  });

  it("TestSplitDonut renders donut chart container", () => {
    const { container } = render(<TestSplitDonut />);
    expect(container.firstChild).toBeInTheDocument();
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
});
