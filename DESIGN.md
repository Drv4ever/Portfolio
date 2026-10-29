# Design System & Motion Specification: "Technical Editorial"

**Project:** Dhruv Jain Portfolio Redesign  
**Live Target:** https://drv-dev.vercel.app/  
**Framework:** Next.js (App Router, React 19) + Tailwind CSS v4 + Motion (`motion/react`) + shadcn/ui

---

## 1. Design Direction: Technical Editorial

The visual language bridges two worlds:
1. **Fine-Print High-Craft Editorial:** Serifs with character, precise hairline grid borders, high contrast monochrome typography, and rhythmic whitespace inspired by architectural monographs.
2. **Modern Developer Precision:** Obsidian glass cards, subtle cursor-follow spotlight illumination, dynamic interactive SVG pipeline schematics, live code badges, and keyboard-first accessibility (`⌘K` command palette).

### Color Tokens
- **Dark Mode (Default)**
  - Canvas: `hsl(0, 0%, 5%)` (`#0d0d0d`)
  - Surface: `hsl(0, 0%, 8%)` (`#141414`)
  - Elevated / Popover: `hsl(0, 0%, 11%)` (`#1c1c1c`)
  - Foreground: `hsl(0, 0%, 98%)` (`#fafafa`)
  - Muted Foreground: `hsl(0, 0%, 65%)` (`#a6a6a6`)
  - Border Hairline: `hsl(0, 0%, 18%)` (`#2e2e2e`)
  - Accent / Glow: `hsl(158, 64%, 52%)` (Terminal Emerald) & `hsl(217, 91%, 60%)` (Cobalt)
- **Light Mode**
  - Canvas: `hsl(40, 20%, 97%)` (`#f8f6f1`)
  - Surface: `hsl(40, 20%, 100%)` (`#ffffff`)
  - Elevated: `hsl(40, 15%, 94%)` (`#f0ece4`)
  - Foreground: `hsl(0, 0%, 9%)` (`#171717`)
  - Muted Foreground: `hsl(0, 0%, 40%)` (`#666666`)
  - Border Hairline: `hsl(40, 10%, 82%)` (`#d4cfc5`)

---

## 2. Typographic Scale

- **Display Serif:** `Playfair Display` (Headings, Section Leads, Project Titles).
- **Functional Sans:** `Inter` (Body, UI labels, Dialog text, Navigation).
- **Technical Monospace:** `JetBrains Mono` / `Geist Mono` (Stats, badges, architecture node labels, terminal prompts).

| Style | Element / Role | Size | Line Height | Tracking | Weight |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | Name & Main Statement | `clamp(2.5rem, 6vw, 4.25rem)` | 1.1 | `-0.02em` | Medium (500) |
| **H2 Section** | Section Titles | `clamp(1.75rem, 4vw, 2.5rem)` | 1.2 | `-0.01em` | Medium (500) |
| **H3 Card** | Project / Entity Titles | `1.375rem` (`22px`) | 1.3 | `0em` | Semi-bold (600) |
| **Body Primary**| Narrative text | `0.9375rem` (`15px`) | 1.65 | `0em` | Regular (400) |
| **Technical Label** | Category chips, tags | `0.75rem` (`12px`) | 1.4 | `0.08em` | Medium (500), Uppercase |
| **Stat Big Number** | Count-up metrics | `clamp(2rem, 3.5vw, 3rem)` | 1.0 | `-0.03em` | Bold (700), Monospace |

---

## 3. Spacing & Grid System

- **Base Unit:** 4px baseline, 8px core rhythm.
- **Max Width Containers:**
  - Site shell: `max-w-5xl` (1024px) for optimal readability and balanced gutters.
  - Section spacing: `py-16 md:py-24` on desktop, `py-12` on mobile.
  - Card padding: `p-6 md:p-8`.
  - Gap system: `gap-4` (tight chips), `gap-6` (cards), `gap-8` (asymmetric grid columns).

---

## 4. Motion Language & Tokens

All transitions strictly leverage CSS transforms, opacity, and SVG stroke properties. No layout-triggering properties (`width`, `height`, `top`, `margin`) are ever animated.

### Duration Tokens
- `duration-instant`: `0ms` (Fallback for `prefers-reduced-motion`)
- `duration-micro`: `120ms` (Button clicks, hover feedbacks, tab indicator snaps)
- `duration-fast`: `200ms` (Tooltip reveals, dropdown exits, command palette search results)
- `duration-normal`: `350ms` (Dialog / Drawer modals, mobile sheet drawer, card expansions)
- `duration-deliberate`: `550ms` (Architecture diagram SVG line draw, count-up numbers)
- `duration-cinematic`: `750ms` (Hero name reveal mask, initial viewport entrances)

### Easing Tokens
- `ease-out-editorial`: `cubic-bezier(0.16, 1, 0.3, 1)` (snappy start, silky deceleration)
- `ease-spring-snappy`: `type: "spring", stiffness: 350, damping: 30`
- `ease-spring-gentle`: `type: "spring", stiffness: 180, damping: 24`

### Stagger Rules
- Header / Nav links: `staggerChildren: 0.04s`
- Stat numbers: `staggerChildren: 0.08s`
- Project cards: `staggerChildren: 0.06s`
- Skill badges: `staggerChildren: 0.02s`

### Accessibility & Reduced Motion
- `prefers-reduced-motion: reduce` unconditionally disables:
  - 3D perspective mouse tilt on project cards.
  - Interactive canvas/shader background particle simulation.
  - Translate/slide movements (replaced with instant opacity fades: `0 -> 1` in `80ms`).

---

## 5. Section-by-Section Storyboard

### 1. Navigation & Command Palette
- **Desktop:** Floating frosted pill (`backdrop-blur-md bg-background/80 border border-border/40`). Left: monogram `DJ` with live status dot. Center: interactive section anchors (`Projects`, `Skills`, `Education`, `Resume`). Right: `⌘K` trigger, theme toggle. Top: 1.5px scroll progress line.
- **Mobile:** Sticky header with hamburger icon triggering a full-featured shadcn `Sheet`.
- **Command Palette (`⌘K` / `Ctrl+K`):** Global shadcn `CommandDialog` allowing instant keyboard navigation to any section, direct launch of project demos/repos, copying email, or downloading the resume.

### 2. Hero Section
- **Visuals:**
  - Masked text reveal: "Dhruv Jain" rises through a subtle clip-path container with editorial serif dignity.
  - Self-hosted circular portrait with a subtle breathing pulse border.
  - Real-time role and location badge: "B.Tech IT @ VIT • Vellore, India".
  - Magnetic hover buttons for "View Resume" (`/resume`) and "Get in touch" (email mailto + clipboard copy).
  - Background signature visual: Lightweight HTML5 Canvas particle constellation that smoothly steers away from pointer location. Bypassed immediately on touch devices or under reduced motion.

### 3. Stat Strip
- 4-column responsive grid with animated count-up numbers:
  1. `209` — Automated Tests (78 Jest + 131 Vitest)
  2. `12` — SlideOS Themes Designed
  3. `220+` — LeetCode Problems Solved
  4. `9.08` — Academic CGPA @ VIT
- Features smooth ease-out count-ups triggering only once when scrolled into view.

### 4. Latest Project Spotlight: SlideOS
- Heroic full-width spotlight card featuring:
  - `"Active"` glowing badge.
  - Links: GitHub Repo + Live Demo (`https://slide-os.vercel.app/`).
  - **Animated Pipeline Diagram:**
    - Step 1: Prompt Input (Natural Language)
    - Step 2: LLM Groq JSON Mode
    - Step 3: Exact Slide Count Enforcer + Deterministic Fallback
    - Step 4: Visual DND Editor (Autosave, 12 Themes)
    - Step 5: Dual Export (PDF & PPTX Layout Engine)
  - **Test Breakdown Donut Chart:**
    - Clean shadcn Chart donut displaying 131 Vitest (Frontend) vs. 78 Jest (Backend) with interactive hover tooltips.

### 5. Featured Works & Interactive Architecture Modals
- High-contrast interactive cards with fine-pointer cursor spotlight and subtle 3D tilt.
- Clicking any card opens a shadcn `Dialog` (desktop) or `Drawer` (mobile) containing:
  - Full technical narrative.
  - Live links and GitHub source.
  - **SVG Architecture Flow:**
    - **MongoDB MCP Server:** AI Client → MCP Server (Zod validation, read-only guard) → MongoDB (Schema Inference, Collection Discovery).
    - **Digital Locker & Parcel Notification:** EC2 Warden Dashboard (Photo upload to S3, Barcode Scan) → Core Lambda → DynamoDB + AWS Event-Driven Bus (SNS Fanout, SQS DLQ alarms, EventBridge audit).
    - **TCRAS:** React Client → Node Transfer API → FastAPI Anomaly Engine → Isolation Forest Scoring → SQLite Risk Storage.
  - Animated line-draw effect triggering upon modal reveal.

### 6. Learning Projects
- Refined, lighter card variant for **Vaultify** (Password Manager) showcasing encrypted vault storage, JWT auth, and Dockerized deployment.

### 7. Skills Matrix
- Filterable tab navigation: `All`, `Languages`, `Backend`, `Frontend`, `Databases`, `Cloud & DevOps`, `AI & LLM`, `AI Agents`, `Testing & Tools`, `Core CS`.
- Semantic badge chips with self-hosted SVGs or clean monospace text tags.

### 8. GitHub Activity Heatmap
- Live contribution visual for `Drv4ever`.
- Server-side GitHub GraphQL / REST fetch with ISR / Next.js caching.
- Fills in smoothly with stagger as it enters the viewport.
- Graceful degradation: If GitHub token is omitted or network is unavailable, the section neatly hides without layout break.

### 9. Education, Achievements & Certifications
- **Education:** Minimal animated vertical timeline for VIT (2024–2028, CGPA 9.08) and DPS Gwalior (89.2%).
- **Achievements:**
  - Card 1: 220+ LeetCode problems (Array, Tree, Graph, DP) and Codeforces contests.
  - Card 2: Published Patent Contribution — Exact resume wording: "Contributed as a frontend developer in a 3-member team on an AI-driven system for detecting risk in distributed file propagation. [published]"
- **Certifications:** IBM DevOps Certification card with credential context.

### 10. Dedicated Resume Page (`/resume`)
- Clean navigation back to portfolio.
- Embedded inline PDF viewer serving `AI-Resume3.pdf` as `Dhruv-Jain-Resume.pdf`.
- Prominent Download button and mobile fallback link for environments lacking inline PDF rendering (iOS Safari).

### 11. Contact & Footer
- Quick-copy email with feedback toast (`Sonner`).
- Verified social links: GitHub, LinkedIn, Twitter/X.
- Back-to-top smooth scroll button.
- Clean copyright notice without stale date artifacts.
