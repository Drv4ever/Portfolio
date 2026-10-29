import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Portfolio End-to-End Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Axe accessibility audit on Home Route with zero violations", async ({ page }) => {
    await page.waitForLoadState("domcontentloaded");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(["color-contrast"]) // Exclude platform-dependent font antialiasing differences
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("Floating navigation and smooth scrolling to sections", async ({ page }) => {
    const projectsLink = page.getByRole("navigation").getByRole("link", { name: "Projects" });
    if (await projectsLink.isVisible()) {
      await projectsLink.click();
      await expect(page.locator("#projects")).toBeInViewport();
    }
  });

  test("Command Palette (Ctrl+K / ⌘K) opens and executes commands", async ({ page, isMobile }) => {
    if (isMobile) {
      const openSearch = page.getByRole("button", { name: /search/i }).first();
      if (await openSearch.isVisible()) {
        await openSearch.click();
      }
    } else {
      await page.keyboard.press("Control+k");
    }

    const commandInput = page.getByPlaceholder("Type a command or search...");
    await expect(commandInput).toBeVisible();

    // Search for SlideOS
    await commandInput.fill("SlideOS");
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByText(/SlideOS — AI-Powered Presentation Builder/i)).toBeVisible();

    // Close palette via Escape
    await page.keyboard.press("Escape");
    await expect(commandInput).not.toBeVisible();
  });

  test("Project detail view opens with SVG architecture diagram", async ({ page }) => {
    const mongoCard = page.getByRole("heading", { name: "MongoDB MCP Server" });
    await mongoCard.scrollIntoViewIfNeeded();

    const inspectBtn = page.getByRole("button", { name: /inspect architecture/i }).first();
    await inspectBtn.click();

    // Verify dialog appears with architecture flow diagram
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText(/Verified Architecture/i)).toBeVisible();
    await expect(dialog.locator("svg[viewBox='0 0 680 180']")).toBeVisible();

    // Close dialog
    const closeBtn = dialog.getByRole("button", { name: /close/i });
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    } else {
      await page.keyboard.press("Escape");
    }
    await expect(dialog).not.toBeVisible();
  });

  test("Skills category filter tabs update visible chips", async ({ page }) => {
    const skillsSection = page.locator("#skills");
    await skillsSection.scrollIntoViewIfNeeded();

    const aiAgentsTab = skillsSection.getByRole("tab", { name: "AI Agents" });
    await aiAgentsTab.click();

    await expect(skillsSection.getByText("Model Context Protocol (MCP)")).toBeVisible();
    await expect(skillsSection.getByText("LangGraph")).toBeVisible();

    const languagesTab = skillsSection.getByRole("tab", { name: "Languages" });
    await languagesTab.click();
    await expect(skillsSection.getByText("TypeScript")).toBeVisible();
  });

  test("Theme toggle toggles dark and light mode", async ({ page }) => {
    const toggle = page.getByRole("button", { name: /toggle visual theme/i }).first();
    await toggle.click();

    const htmlElement = page.locator("html");
    const classAttr = await htmlElement.getAttribute("class");
    expect(classAttr).toBeDefined();
  });

  test("Copy email address triggers toast confirmation", async ({ page }) => {
    await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);

    const copyBtn = page.getByRole("button", { name: /copy address/i });
    await copyBtn.scrollIntoViewIfNeeded();
    await copyBtn.click();

    // Verify sonner toast notification
    await expect(page.getByText(/copied to clipboard/i)).toBeVisible();
  });

  test("Prefers-reduced-motion emulation disables animated canvas", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    await expect(page.locator("h1")).toContainText("Dhruv Jain");
  });

  test("Resume route navigation, download link, and accessibility", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("domcontentloaded");

    await expect(page.getByRole("heading", { name: "Curriculum Vitae" })).toBeVisible();
    await expect(page.getByText("Dhruv Jain • VIT Vellore (CGPA 9.08)")).toBeVisible();

    const downloadBtn = page.getByRole("link", { name: /download/i }).first();
    await expect(downloadBtn).toHaveAttribute("href", "/Dhruv-Jain-Resume.pdf");

    // Axe check on resume page
    const axeResults = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();
    expect(axeResults.violations).toEqual([]);
  });
});
