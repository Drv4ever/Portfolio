import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
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

  it("renders personal branding, headline, and bio in Amaan style", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/hi, im dhruv/i);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Dhruv Jain");
    expect(screen.getByText(/backend-heavy full-stack apps/i)).toBeInTheDocument();
    expect(screen.getByText(/open to opportunities/i)).toBeInTheDocument();
  });

  it("renders core domain theme pills", () => {
    render(<Hero />);
    expect(screen.getByText("backends")).toBeInTheDocument();
    expect(screen.getByText("typescript")).toBeInTheDocument();
    expect(screen.getByText("ai agents")).toBeInTheDocument();
    expect(screen.getByText("nextjs")).toBeInTheDocument();
    expect(screen.getByText("distributed systems")).toBeInTheDocument();
    expect(screen.getByText("aws")).toBeInTheDocument();
    expect(screen.getByText("mcp")).toBeInTheDocument();
    expect(screen.getByText("python")).toBeInTheDocument();
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
    const resumeLinks = screen.getAllByRole("link", { name: /resume/i });
    expect(resumeLinks.length).toBeGreaterThanOrEqual(1);

    const githubLink = screen.getByRole("link", { name: /github profile/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/Drv4ever");

    const linkedinLink = screen.getByRole("link", { name: /linkedin profile/i });
    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/in/dhruv-jain-4284a8263/");

    const xLink = screen.getByRole("link", { name: /x \(twitter\) profile/i });
    expect(xLink).toHaveAttribute("href", "https://x.com/Drv4ever632");
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

    const origObserver = window.IntersectionObserver;
    window.IntersectionObserver = TestIntersectionObserver as unknown as typeof IntersectionObserver;

    let frameCount = 0;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      frameCount++;
      if (frameCount === 1) {
        cb(performance.now() + 500);
      } else {
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

    window.IntersectionObserver = origObserver;
  });
});
