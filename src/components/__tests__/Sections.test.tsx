import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SkillsSection } from "../SkillsSection";
import {
  GithubHeatmap,
  getGithubContributions,
  parseJogruberContributions,
} from "../GithubHeatmap";
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

describe("GithubHeatmap Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.GITHUB_TOKEN;
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        total: { lastYear: 293 },
        contributions: [
          { date: "2026-10-31", count: 0, level: 0 },
          { date: "2026-11-01", count: 2, level: 1 },
          { date: "2026-11-02", count: 5, level: 2 },
        ],
      }),
    });
  });

  it("parseJogruberContributions parses contributions, streaks, and levels correctly", () => {
    const empty = parseJogruberContributions({});
    expect(empty.totalContributions).toBe(0);
    expect(empty.weeks).toHaveLength(0);

    const parsed = parseJogruberContributions({
      total: { lastYear: 15 },
      contributions: [
        { date: "2026-10-25", count: 0, level: 0 },
        { date: "2026-10-26", count: 1, level: 1 },
        { date: "2026-10-27", count: 4, level: 2 },
        { date: "2026-10-28", count: 7, level: 3 },
        { date: "2026-10-29", count: 10, level: 4 },
        { date: "2026-10-30", count: 0, level: 0 },
        { date: "2026-10-31", count: 3, level: 1 },
        { date: "2026-11-01", count: 0, level: 0 },
        { date: "2026-11-02", count: 2, level: 1 },
      ],
    });

    expect(parsed.totalContributions).toBe(15);
    expect(parsed.weeks).toHaveLength(2);
    expect(parsed.longestStreak).toBe(4);
    expect(parsed.currentStreak).toBe(1);

    // Test trailing zero day streak continuation
    const parsedWithTrailingZero = parseJogruberContributions({
      contributions: [
        { date: "2026-11-01", count: 2, level: 1 },
        { date: "2026-11-02", count: 0, level: 0 },
      ],
    });
    expect(parsedWithTrailingZero.currentStreak).toBe(1);
    expect(parsedWithTrailingZero.totalContributions).toBe(2);
  });

  it("fetches from public API when GITHUB_TOKEN is not defined and renders component", async () => {
    delete process.env.GITHUB_TOKEN;
    const result = await getGithubContributions();
    expect(result).not.toBeNull();
    expect(result?.totalContributions).toBe(293);

    const Component = await GithubHeatmap();
    expect(Component).not.toBeNull();
    await act(async () => {
      render(Component!);
    });
    expect(screen.getByText("GitHub Activity Stream")).toBeInTheDocument();
    expect(screen.getByText(/Contributions This Year/i)).toBeInTheDocument();
  });

  it("falls back to fallback calendar when public fetch fails", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });
    const result = await getGithubContributions();
    expect(result).toBeNull();

    global.fetch = vi.fn().mockRejectedValue(new Error("Network failed"));
    const errorResult = await getGithubContributions();
    expect(errorResult).toBeNull();

    const Component = await GithubHeatmap();
    expect(Component).not.toBeNull();
    await act(async () => {
      render(Component!);
    });
    expect(screen.getByText("GitHub Activity Stream")).toBeInTheDocument();
  });

  it("fetches contributions via GraphQL when token is provided and handles streaks", async () => {
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
            { date: "2026-01-05", contributionCount: 0, color: "#eee" },
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
    expect(result?.totalContributions).toBe(342);
    expect(result?.longestStreak).toBe(3);

    // Empty data test (falls back to public API)
    global.fetch = vi.fn().mockImplementation(async (url: string) => {
      if (typeof url === "string" && url.includes("graphql")) {
        return { ok: true, json: async () => ({ data: { user: {} } }) };
      }
      return {
        ok: true,
        json: async () => ({
          total: { lastYear: 293 },
          contributions: [{ date: "2026-11-02", count: 3, level: 1 }],
        }),
      };
    });
    const fallbackResult = await getGithubContributions();
    expect(fallbackResult?.totalContributions).toBe(293);

    // GraphQL error test (falls through to public API)
    global.fetch = vi.fn().mockImplementation(async (url: string) => {
      if (typeof url === "string" && url.includes("graphql")) {
        throw new Error("GraphQL rate limited");
      }
      return {
        ok: true,
        json: async () => ({
          total: { lastYear: 293 },
          contributions: [{ date: "2026-11-02", count: 3, level: 1 }],
        }),
      };
    });
    const fallbackFromError = await getGithubContributions();
    expect(fallbackFromError?.totalContributions).toBe(293);

    delete process.env.GITHUB_TOKEN;
  });

  it("GithubHeatmapClient renders contribution grid in both out-of-view and in-view states, shows streak badge, and renders month labels", async () => {
    const calendar = {
      totalContributions: 240,
      longestStreak: 15,
      currentStreak: 2,
      weeks: [
        {
          contributionDays: [
            { date: "2026-01-01", contributionCount: 0, color: "#eee" },
            { date: "2026-01-02", contributionCount: 2, color: "#10b981" },
            { date: "2026-01-03", contributionCount: 4, color: "#10b981" },
            { date: "", contributionCount: 7, color: "#10b981" },
          ],
        },
        {
          contributionDays: [
            { date: "2026-02-01", contributionCount: 1, color: "#10b981" },
          ],
        },
        {
          contributionDays: [{ date: "", contributionCount: 0, color: "#eee" }],
        },
      ],
    };

    mockIsInView = false;
    let rerenderFn: (ui: React.ReactElement) => void = () => {};
    let unmountFn: () => void = () => {};
    await act(async () => {
      const utils = render(<GithubHeatmapClient calendar={calendar} />);
      rerenderFn = utils.rerender;
      unmountFn = utils.unmount;
    });
    expect(screen.getByText("GitHub Activity Stream")).toBeInTheDocument();
    expect(screen.getByText(/2d best streak/i)).toBeInTheDocument();
    expect(screen.getByText(/293 Contributions This Year/i)).toBeInTheDocument();

    mockIsInView = true;
    await act(async () => {
      rerenderFn(<GithubHeatmapClient calendar={calendar} />);
    });
    expect(screen.getByText("GitHub Activity Stream")).toBeInTheDocument();

    cleanup();

    // Test with no streak (longestStreak is undefined/0) and failed client fetch
    global.fetch = vi.fn().mockRejectedValue(new Error("client fetch failed"));
    const calendarWithoutStreak = {
      totalContributions: 50,
      weeks: [],
    };
    await act(async () => {
      render(<GithubHeatmapClient calendar={calendarWithoutStreak} />);
    });
    expect(screen.queryByText(/best streak/i)).not.toBeInTheDocument();

    cleanup();

    // Test client fetch with res.ok false
    global.fetch = vi.fn().mockResolvedValue({ ok: false });
    await act(async () => {
      render(<GithubHeatmapClient calendar={calendarWithoutStreak} />);
    });
    expect(screen.queryByText(/best streak/i)).not.toBeInTheDocument();
  });
});

describe("Footer Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  it("renders contact info, copy email, and scroll to top", async () => {
    const writeSpy = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<Footer />);

    expect(
      screen.getByText("Let's build intelligent systems together.")
    ).toBeInTheDocument();

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
