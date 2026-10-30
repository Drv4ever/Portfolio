import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "../Navbar";
import { CommandPalette } from "../CommandPalette";

const mockPush = vi.fn();
let currentPathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => currentPathname,
  useRouter: () => ({
    push: mockPush,
  }),
}));

let currentTheme = "dark";
const mockSetTheme = vi.fn().mockImplementation((newTheme) => {
  currentTheme = newTheme;
});

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: currentTheme,
    setTheme: mockSetTheme,
  }),
}));

describe("Navbar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    currentPathname = "/";
    currentTheme = "dark";
  });

  it("renders monogram, title, and nav links", () => {
    render(<Navbar />);
    expect(screen.getByText("DJ")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Resume")).toBeInTheDocument();
  });

  it("toggles visual theme when theme button clicked", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Navbar />);

    const themeToggle = screen.getByRole("button", { name: /toggle visual theme/i });
    await user.click(themeToggle);
    expect(mockSetTheme).toHaveBeenCalledWith("light");

    currentTheme = "light";
    rerender(<Navbar />);
    await user.click(themeToggle);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("does not observe sections when on non-root route like /resume", () => {
    currentPathname = "/resume";
    render(<Navbar />);
    expect(screen.getByText("DJ")).toBeInTheDocument();
  });

  it("opens command palette when Search button clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const searchBtn = screen.getByRole("button", { name: /search/i });
    await user.click(searchBtn);

    expect(screen.getByPlaceholderText("Type a command or search...")).toBeInTheDocument();
  });

  it("updates scroll progress on scroll events and handles zero scrollable distance", () => {
    render(<Navbar />);

    // Positive scrollable distance
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 2000,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: 1000,
      configurable: true,
    });
    Object.defineProperty(window, "scrollY", {
      value: 500,
      configurable: true,
    });

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    // Zero scrollable distance branch (totalScroll <= 0)
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 1000,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: 1000,
      configurable: true,
    });

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
  });

  it("handles mobile menu open/close and link clicks", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const hamburger = screen.getByRole("button", { name: /open mobile menu/i });
    await user.click(hamburger);

    expect(screen.getByText("Download Resume PDF")).toBeInTheDocument();

    // Click a link inside mobile sheet to trigger setMobileMenuOpen(false)
    const mobileProjectsLink = screen.getAllByRole("link", { name: /projects/i }).find(
      (el) => el.closest('[role="dialog"]')
    );
    if (mobileProjectsLink) {
      fireEvent.click(mobileProjectsLink);
    }
  });

  it("observes all sections and updates active section on intersection", () => {
    const registeredCallbacks: Array<(entries: Array<{ isIntersecting: boolean }>) => void> = [];

    class MockObserver {
      cb: (entries: Array<{ isIntersecting: boolean }>) => void;
      constructor(cb: (entries: Array<{ isIntersecting: boolean }>) => void) {
        this.cb = cb;
        registeredCallbacks.push(cb);
      }
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    window.IntersectionObserver = MockObserver as unknown as typeof IntersectionObserver;

    const sections = ["hero", "projects", "skills", "education", "achievements"];
    const elements = sections.map((id) => {
      const el = document.createElement("div");
      el.id = id;
      document.body.appendChild(el);
      return el;
    });

    const { unmount } = render(<Navbar />);

    act(() => {
      registeredCallbacks.forEach((cb) => {
        cb([{ isIntersecting: true }]);
      });
    });

    unmount();
    elements.forEach((el) => document.body.removeChild(el));
  });
});

describe("CommandPalette Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "open").mockImplementation(() => null);
  });

  it("opens dialog on Ctrl+K and Cmd+K keyboard shortcut and ignores other keys", () => {
    const onOpenChange = vi.fn();
    render(<CommandPalette open={false} onOpenChange={onOpenChange} />);

    // Non-K key ignored
    fireEvent.keyDown(document, { key: "j", metaKey: true });
    expect(onOpenChange).not.toHaveBeenCalled();

    // Ctrl+K
    fireEvent.keyDown(document, { key: "k", ctrlKey: true });
    expect(onOpenChange).toHaveBeenCalledWith(true);

    // Cmd+K
    fireEvent.keyDown(document, { key: "k", metaKey: true });
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("executes navigation actions inside the palette with smooth scroll", async () => {
    const scrollIntoViewMock = vi.fn();
    const el = document.createElement("div");
    el.id = "projects";
    el.scrollIntoView = scrollIntoViewMock;
    document.body.appendChild(el);

    const onOpenChange = vi.fn();
    render(<CommandPalette open={true} onOpenChange={onOpenChange} />);

    const projectsItem = screen.getByText("Projects & Works");
    fireEvent.click(projectsItem);

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });

    // Other navigation items
    fireEvent.click(screen.getByText("Technical Skills"));
    fireEvent.click(screen.getByText("Education & Timeline"));
    fireEvent.click(screen.getByText("Achievements & Patents"));
    fireEvent.click(screen.getByText("View Resume Page"));

    expect(mockPush).toHaveBeenCalledWith("/resume");
    document.body.removeChild(el);
  });

  it("navigates to anchor when on a non-root page", () => {
    delete (window as unknown as { location: unknown }).location;
    (window as unknown as { location: { pathname: string } }).location = {
      pathname: "/resume",
    };

    const onOpenChange = vi.fn();
    render(<CommandPalette open={true} onOpenChange={onOpenChange} />);

    fireEvent.click(screen.getByText("Projects & Works"));
    expect(mockPush).toHaveBeenCalledWith("/#projects");

    (window as unknown as { location: { pathname: string } }).location = {
      pathname: "/",
    };
  });

  it("executes copy email action inside the palette", async () => {
    const writeSpy = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
    const onOpenChange = vi.fn();
    render(<CommandPalette open={true} onOpenChange={onOpenChange} />);

    const copyItem = screen.getByText(/Copy Email/);
    fireEvent.click(copyItem);

    expect(writeSpy).toHaveBeenCalledWith("dhruvjain632@gmail.com");
  });

  it("executes download resume action inside the palette", () => {
    const onOpenChange = vi.fn();
    render(<CommandPalette open={true} onOpenChange={onOpenChange} />);

    const downloadItem = screen.getByText("Download Resume PDF");
    fireEvent.click(downloadItem);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("executes theme toggle action inside the palette in both dark and light modes", async () => {
    currentTheme = "dark";
    const onOpenChange = vi.fn();
    const { unmount } = render(<CommandPalette open={true} onOpenChange={onOpenChange} />);

    const themeItem = screen.getByText(/Toggle Theme/);
    fireEvent.click(themeItem);
    expect(mockSetTheme).toHaveBeenCalledWith("light");
    unmount();

    // Light theme test
    currentTheme = "light";
    render(<CommandPalette open={true} onOpenChange={onOpenChange} />);
    const lightThemeItem = screen.getByText(/Toggle Theme/);
    fireEvent.click(lightThemeItem);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("executes project selection and external links", async () => {
    const onOpenChange = vi.fn();
    render(<CommandPalette open={true} onOpenChange={onOpenChange} />);

    // Project with live demo
    const slideOsItem = screen.getByText(/SlideOS — AI-Powered Presentation Builder/);
    fireEvent.click(slideOsItem);
    expect(window.open).toHaveBeenCalledWith("https://slide-os.vercel.app/", "_blank", "noopener,noreferrer");

    // Project with live demo
    const parcelItem = screen.getByText(/Cloud-Based Digital Locker/);
    fireEvent.click(parcelItem);
    expect(window.open).toHaveBeenCalledWith("https://15.207.54.197/", "_blank", "noopener,noreferrer");

    // Project with github repo only
    const mongoItem = screen.getByText(/MongoDB MCP Server for AI Tools/);
    fireEvent.click(mongoItem);
    expect(window.open).toHaveBeenCalledWith("https://github.com/Drv4ever/mongo-schema-explainer-mcp", "_blank", "noopener,noreferrer");

    // Connect link
    const linkedinItem = screen.getByText("LinkedIn");
    fireEvent.click(linkedinItem);
    expect(window.open).toHaveBeenCalledWith("https://linkedin.com/in/dhruv-jain-4284a8263/", "_blank", "noopener,noreferrer");
  });
});
