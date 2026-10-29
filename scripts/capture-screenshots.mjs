import { chromium } from "@playwright/test";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function capture() {
  const docsDir = path.resolve(process.cwd(), "docs");
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const browser = await chromium.launch();

  console.log("Capturing BEFORE screenshots from live site (https://drv-dev.vercel.app/)...");
  // Before Desktop
  const beforeDesktopContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const beforeDesktopPage = await beforeDesktopContext.newPage();
  try {
    await beforeDesktopPage.goto("https://drv-dev.vercel.app/", { waitUntil: "networkidle", timeout: 30000 });
    await beforeDesktopPage.screenshot({ path: path.join(docsDir, "before-desktop.png"), fullPage: false });
    console.log("Saved docs/before-desktop.png");
  } catch (err) {
    console.warn("Could not fetch live before desktop, falling back:", err.message);
  }
  await beforeDesktopContext.close();

  // Before Mobile
  const beforeMobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const beforeMobilePage = await beforeMobileContext.newPage();
  try {
    await beforeMobilePage.goto("https://drv-dev.vercel.app/", { waitUntil: "networkidle", timeout: 30000 });
    await beforeMobilePage.screenshot({ path: path.join(docsDir, "before-mobile.png"), fullPage: false });
    console.log("Saved docs/before-mobile.png");
  } catch (err) {
    console.warn("Could not fetch live before mobile, falling back:", err.message);
  }
  await beforeMobileContext.close();

  console.log("Starting local production server for AFTER screenshots...");
  const server = spawn("npm.cmd", ["run", "start", "--", "-p", "3005"], {
    stdio: "inherit",
    shell: true,
  });

  // Wait for server to be ready
  await wait(4000);

  // After Desktop
  console.log("Capturing AFTER Desktop screenshot from http://localhost:3005/...");
  const afterDesktopContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const afterDesktopPage = await afterDesktopContext.newPage();
  await afterDesktopPage.goto("http://localhost:3005/", { waitUntil: "networkidle" });
  await wait(1000); // Allow entrance animations to settle
  await afterDesktopPage.screenshot({ path: path.join(docsDir, "after-desktop.png"), fullPage: false });
  console.log("Saved docs/after-desktop.png");
  await afterDesktopContext.close();

  // After Mobile
  console.log("Capturing AFTER Mobile screenshot from http://localhost:3005/...");
  const afterMobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const afterMobilePage = await afterMobileContext.newPage();
  await afterMobilePage.goto("http://localhost:3005/", { waitUntil: "networkidle" });
  await wait(1000);
  await afterMobilePage.screenshot({ path: path.join(docsDir, "after-mobile.png"), fullPage: false });
  console.log("Saved docs/after-mobile.png");
  await afterMobileContext.close();

  await browser.close();

  server.kill("SIGTERM");
  process.exit(0);
}

capture().catch((err) => {
  console.error("Screenshot capture error:", err);
  process.exit(1);
});
