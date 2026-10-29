import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SkillsSection } from "../SkillsSection";
import { EducationTimeline } from "../EducationTimeline";
import { AchievementsSection } from "../AchievementsSection";
import { GithubHeatmap, getGithubContributions } from "../GithubHeatmap";
import { GithubHeatmapClient } from "../GithubHeatmapClient";
import { Footer } from "../Footer";
import Providers from "../Providers";

let mockIsInView = false;
vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    useInView: () => mockIsInView,
  };
});

describe("SkillsSection Component", () => {
  it("renders all categories and allows filtering", async () => {
    const user = userEvent.setup();
    render(<SkillsSection />);

    expect(screen.getByText("Technical Skills & Tooling")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "AI Agents" })).toBeInTheDocument();

    // Filter to AI Agents
    await user.click(screen.getByRole("tab", { name: "AI Agents" }));
    expect(screen.getByText("Model Context Protocol (MCP)")).toBeInTheDocument();
    expect(screen.getByText("LangGraph")).toBeInTheDocument();
  });
});

describe("EducationTimeline Component", () => {
  it("renders educational background accurately", () => {
    render(<EducationTimeline />);
    expect(screen.getByText("Vellore Institute of Technology")).toBeInTheDocument();
    expect(screen.getByText("B.Tech in Information Technology")).toBeInTheDocument();
    expect(screen.getByText("CGPA: 9.08")).toBeInTheDocument();
    expect(screen.getByText("Delhi Public School")).toBeInTheDocument();
    expect(screen.getByText("Percentage: 89.2%")).toBeInTheDocument();
  });
});

describe("AchievementsSection Component", () => {
  it("renders LeetCode problem solving milestone", () => {
    render(<AchievementsSection />);
    expect(screen.getByText("Problem Solving")).toBeInTheDocument();
    expect(screen.getByText("220+")).toBeInTheDocument();
  });

  it("renders published patent contribution with exact required text", () => {
    render(<AchievementsSection />);
    expect(screen.getByText("Patent Contribution")).toBeInTheDocument();
    expect(screen.getByText("Patent [Published]")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Contributed as a frontend developer in a 3-member team on an AI-driven system for detecting risk in distributed file propagation. [published]"
      )
    ).toBeInTheDocument();
  });

  it("renders IBM DevOps Certification", () => {
    render(<AchievementsSection />);
    expect(screen.getByText("IBM DevOps Certification")).toBeInTheDocument();
    expect(screen.getByText("Issuer: IBM")).toBeInTheDocument();
  });
});

describe("GithubHeatmap Component", () => {
  it("returns null when GITHUB_TOKEN is not defined", async () => {
    delete process.env.GITHUB_TOKEN;
    const result = await getGithubContributions();
    expect(result).toBeNull();

    const Component = await GithubHeatmap();
    expect(Component).toBeNull();
  });

  it("fetches contributions and renders component when token is provided", async () => {
    process.env.GITHUB_TOKEN = "test-token";
    const mockCalendar = {
      totalContributions: 342,
      weeks: [
        {
          contributionDays: [
            { date: "2026-01-01", contributionCount: 0, color: "#eee" },
            { date: "2026-01-02", contributionCount: 2, color: "#10b981" },
            { date: "2026-01-03", contributionCount: 4, color: "#10b981" },
            { date: "2026-01-04", contributionCount: 8, color: "#10b981" },
          ],
        },
      ],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          user: {
            contributionsCollection: {
              contributionCalendar: mockCalendar,
            },
          },
        },
      }),
    });

    const result = await getGithubContributions();
    expect(result).toEqual(mockCalendar);

    const HeatmapComponent = await GithubHeatmap();
    expect(HeatmapComponent).not.toBeNull();
    render(HeatmapComponent!);

    expect(screen.getByText("342 Contributions This Year")).toBeInTheDocument();

    // Empty data test (returns null)
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { user: {} } }),
    });
    const emptyResult = await getGithubContributions();
    expect(emptyResult).toBeNull();

    // Failed fetch test
    global.fetch = vi.fn().mockResolvedValue({ ok: false });
    const failedResult = await getGithubContributions();
    expect(failedResult).toBeNull();

    // Exception test
    global.fetch = vi.fn().mockRejectedValue(new Error("Network failed"));
    const errorResult = await getGithubContributions();
    expect(errorResult).toBeNull();

    delete process.env.GITHUB_TOKEN;
  });

  it("GithubHeatmapClient renders contribution grid in both out-of-view and in-view states", () => {
    const calendar = {
      totalContributions: 240,
      weeks: [
        {
          contributionDays: [
            { date: "2026-01-01", contributionCount: 0, color: "#eee" },
            { date: "2026-01-02", contributionCount: 2, color: "#10b981" },
            { date: "2026-01-03", contributionCount: 4, color: "#10b981" },
            { date: "", contributionCount: 7, color: "#10b981" },
          ],
        },
      ],
    };

    mockIsInView = false;
    const { rerender } = render(<GithubHeatmapClient calendar={calendar} />);
    expect(screen.getByText("GitHub Activity Stream")).toBeInTheDocument();
    expect(screen.getByText("240 Contributions This Year")).toBeInTheDocument();

    mockIsInView = true;
    rerender(<GithubHeatmapClient calendar={calendar} />);
    expect(screen.getByText("GitHub Activity Stream")).toBeInTheDocument();
  });
});

describe("Footer Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  it("renders contact info, copy email, and scroll to top", async () => {
    const writeSpy = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<Footer />);

    expect(screen.getByText("Let's build intelligent systems together.")).toBeInTheDocument();

    const copyBtn = screen.getByRole("button", { name: /copy address/i });
    await user.click(copyBtn);
    expect(writeSpy).toHaveBeenCalledWith("dhruvjain632@gmail.com");

    const topBtn = screen.getByRole("button", { name: /back to top/i });
    await user.click(topBtn);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});

describe("Providers Component", () => {
  it("renders children wrapped inside ThemeProvider", () => {
    render(
      <Providers>
        <div data-testid="child">Child Content</div>
      </Providers>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});
