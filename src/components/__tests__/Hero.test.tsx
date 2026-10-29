import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Hero } from "../Hero";
import { StatStrip } from "../StatStrip";
import { createPoints } from "../HeroCanvas";

describe("HeroCanvas Pure Logic", () => {
  it("createPoints generates the requested number of points within dimensions", () => {
    const points = createPoints(800, 600, 10);
    expect(points).toHaveLength(10);
    points.forEach((p) => {
      expect(p.x).toBeGreaterThanOrEqual(0);
      expect(p.x).toBeLessThanOrEqual(800);
      expect(p.y).toBeGreaterThanOrEqual(0);
      expect(p.y).toBeLessThanOrEqual(600);
      expect(p.radius).toBeGreaterThan(0);
      expect(p.baseAlpha).toBeGreaterThan(0);
    });
  });
});

describe("Hero Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders personal branding, headline, and bio accurately", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Dhruv Jain");
    expect(screen.getByText("Full-Stack Developer & AI Systems Builder")).toBeInTheDocument();
    expect(screen.getByText(/Information Technology undergraduate/)).toBeInTheDocument();
    expect(screen.getByText("Vellore, India")).toBeInTheDocument();
  });

  it("renders core tech stack badges", () => {
    render(<Hero />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("React.js")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("MongoDB")).toBeInTheDocument();
    expect(screen.getByText("AWS")).toBeInTheDocument();
    expect(screen.getByText("MCP")).toBeInTheDocument();
  });

  it("handles copy email action with clipboard interaction", async () => {
    const writeSpy = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
    render(<Hero />);

    const copyBtn = screen.getByRole("button", { name: /copy email address/i });
    fireEvent.click(copyBtn);

    expect(writeSpy).toHaveBeenCalledWith("dhruvjain632@gmail.com");
  });

  it("renders navigation buttons to resume and social profiles", () => {
    render(<Hero />);
    const resumeLink = screen.getByRole("link", { name: /view resume/i });
    expect(resumeLink).toHaveAttribute("href", "/resume");

    const githubLink = screen.getByRole("link", { name: /github profile/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/Drv4ever");
  });
});

describe("StatStrip Component", () => {
  it("renders all real stats from resume", () => {
    render(<StatStrip />);
    expect(screen.getByText("Automated Tests")).toBeInTheDocument();
    expect(screen.getByText("SlideOS Themes")).toBeInTheDocument();
    expect(screen.getByText("LeetCode Solved")).toBeInTheDocument();
  });

  it("respects reduced-motion preference by immediately displaying full numbers", () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<StatStrip />);
    expect(screen.getByText("209")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("220")).toBeInTheDocument();

    window.matchMedia = originalMatchMedia;
  });

  it("triggers count-up on intersection observer entry", () => {
    let observerCallback: (entries: Array<{ isIntersecting: boolean }>) => void = () => {};

    class TestIntersectionObserver {
      constructor(callback: (entries: Array<{ isIntersecting: boolean }>) => void) {
        observerCallback = callback;
      }
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    window.IntersectionObserver = TestIntersectionObserver as unknown as typeof IntersectionObserver;

    let frameCount = 0;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      frameCount++;
      if (frameCount === 1) {
        // Midway frame: tests line 49
        cb(performance.now() + 500);
      } else {
        // Completion frame
        cb(performance.now() + 2000);
      }
      return 1;
    });

    render(<StatStrip />);

    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });

    expect(screen.getByText("209")).toBeInTheDocument();
    expect(screen.getByText("220")).toBeInTheDocument();
  });
});
