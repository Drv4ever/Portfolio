import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "../page";
import ResumePage from "../resume/page";
import NotFound from "../not-found";
import ErrorPage from "../error";
import GlobalError from "../global-error";
import sitemap from "../sitemap";
import robots from "../robots";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock("@/components/GithubHeatmap", () => ({
  GithubHeatmap: () => <div data-testid="github-heatmap-mock" />,
}));

vi.mock("recharts", async () => {
  const original = await vi.importActual<Record<string, unknown>>("recharts");
  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div style={{ width: 400, height: 200 }}>{children}</div>
    ),
  };
});

describe("App Route Pages & Error Boundaries", () => {
  it("HomePage renders without crashing", async () => {
    const Component = await HomePage();
    render(Component);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Dhruv Jain");
    expect(screen.getByText("Engineered Products & Architectures")).toBeInTheDocument();
  });

  it("ResumePage renders CV details, download links, and iframe", () => {
    render(<ResumePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Curriculum Vitae");
    expect(screen.getByRole("link", { name: /download pdf/i })).toHaveAttribute(
      "href",
      "/Dhruv-Jain-Resume.pdf"
    );
    expect(screen.getByTitle("Dhruv Jain Resume PDF")).toBeInTheDocument();
  });

  it("NotFound page renders 404 message and return link", () => {
    render(<NotFound />);
    expect(screen.getByText(/404 — Page Not Found/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /return to portfolio/i })).toHaveAttribute("href", "/");
  });

  it("ErrorPage renders message and triggers reset", async () => {
    const user = userEvent.setup();
    const reset = vi.fn();
    const error = new Error("Sample test error");

    render(<ErrorPage error={error} reset={reset} />);
    expect(screen.getByText("Something unexpected occurred.")).toBeInTheDocument();

    const retryBtn = screen.getByRole("button", { name: /try again/i });
    await user.click(retryBtn);
    expect(reset).toHaveBeenCalled();
  });

  it("GlobalError renders root fallback and triggers reset", async () => {
    const user = userEvent.setup();
    const reset = vi.fn();
    const error = new Error("Fatal root error");

    render(<GlobalError error={error} reset={reset} />);
    expect(screen.getByText("Critical System Failure")).toBeInTheDocument();

    const reloadBtn = screen.getByRole("button", { name: /reload application/i });
    await user.click(reloadBtn);
    expect(reset).toHaveBeenCalled();
  });

  it("sitemap generator returns valid canonical routes", () => {
    const siteMapData = sitemap();
    expect(siteMapData).toHaveLength(2);
    expect(siteMapData[0].url).toBe("https://drv-dev.vercel.app");
    expect(siteMapData[1].url).toBe("https://drv-dev.vercel.app/resume");
  });

  it("robots generator returns valid rules and sitemap link", () => {
    const robotsData = robots();
    expect(robotsData.sitemap).toBe("https://drv-dev.vercel.app/sitemap.xml");
  });
});
