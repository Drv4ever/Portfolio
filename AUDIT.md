# Portfolio Audit: drv-dev.vercel.app vs. AI-Resume3.pdf

**Date:** 2026-10-29  
**Target URL:** https://drv-dev.vercel.app/  
**Source Resume:** `AI-Resume3.pdf`  
**Author:** Dhruv Jain (`Drv4ever`)

---

## 1. What Currently Exists

- **Framework & Runtime:** Next.js 16.1.6 (App Router), React 19, React-DOM 19.
- **Styling:** Tailwind CSS 3.4.17 with custom paper/ink/border tokens and `next-themes` dark mode toggle.
- **Animation:** `framer-motion` 12.5.0 with basic `FadeIn` and `Stagger` utility wrappers.
- **Routes:**
  - `/` (Home page with Header, Hero, Sidebar, Projects, Education, and Footer).
  - `/resume` (Staging placeholder asking user to drop `public/resume.pdf`).
- **Data Architecture:** Static objects in `src/data/content.ts` (unvalidated plain JavaScript/TypeScript exports).
- **Public Assets:** Minimal SVG icon (`icon.svg`), basic OpenGraph image (`og-image.svg`).

---

## 2. What Is Weak / Technical & Design Debt

1. **No Data Validation:** `src/data/content.ts` has no runtime schema validation (Zod). Modifications can introduce runtime crashes.
2. **Missing UI Primitives (shadcn/ui):** UI elements (buttons, badges, headers) are hand-rolled without accessible primitives, keyboard navigation traps, or ARIA parity.
3. **Template Placeholders & Hallucinated Content:**
   - Fake professional experiences listed: `"Northline Studio"` (Senior Frontend Engineer) and `"Papergrid Labs"` (Frontend Developer) are fictional template artifacts.
   - Fake location: `"New York, NY"` (Resume specifies Vellore, India for VIT and Gwalior, India for high school).
4. **Third-Party CDN Logo Fragility:**
   - Tech chips pull SVG icons directly from `https://cdn.jsdelivr.net` at runtime, creating network waterfalls, potential layout shifts, and failure points when offline or rate-limited.
   - Avatar image is hotlinked to GitHub (`https://avatars.githubusercontent.com/u/192817774?v=4`).
5. **No Visual Architecture Diagrams:**
   - Complex full-stack and systems projects (SlideOS, MongoDB MCP Server, Cloud-Based Parcel Locker, TCRAS) have only 2-sentence textual blurbs with no architectural insights or visual flows.
6. **No Command Palette:**
   - Power navigation (`⌘K` / `Ctrl+K`) is absent.
7. **Missing Test Suite & CI Enforcement:**
   - Zero unit tests, zero integration tests, zero Playwright end-to-end tests, zero coverage enforcement.
8. **Motion System Inconsistencies:**
   - No centralized motion tokens (durations, easings, spring physics).
   - No `prefers-reduced-motion` compliance or intersection-based pausing.

---

## 3. Investigation of Known Issues

### Issue 1: OpenGraph & Twitter Metadata Placeholder Domain
- **Inspection Finding:** In `src/app/layout.tsx`:
  - `metadataBase: new URL("https://your-portfolio-domain.vercel.app")`
  - `openGraph.url: "https://your-portfolio-domain.vercel.app"`
  - `openGraph.images: ["/og-image.svg"]` resolving to `https://your-portfolio-domain.vercel.app/og-image.svg`
  - Verified on live site HTML: `<meta property="og:url" content="https://your-portfolio-domain.vercel.app"/>`
- **Resolution:** Set `metadataBase: new URL("https://drv-dev.vercel.app")`, point canonical URLs, OpenGraph, and Twitter tags to `https://drv-dev.vercel.app`. Generate dynamic OG/Twitter cards.

### Issue 2: Stale Build-Time Date in Header
- **Inspection Finding:** In `src/components/Header.tsx`, initial state runs `new Intl.DateTimeFormat(...).format(new Date())` during static site generation on Vercel.
  - Live HTML output contained `<span class="mr-2">Fri, Jun 26, 2026</span>`, baked in statically at deploy time.
- **Resolution:** Remove the fake/stale date headline completely from the editorial header. Replace with real-time status indicators ("Available for Summer 2026 internships" or clean minimal navigation status).

### Issue 3: Mismatched Tech Stack Logos
- **Inspection Finding:** In `src/data/content.ts`:
  - `"TCP Socket (net)"` points to `https://cdn.jsdelivr.net/.../nodejs/nodejs-original.svg` (Node.js logo).
  - `"Isolation Forest"` points to `https://cdn.jsdelivr.net/.../python/python-original.svg` (Python logo).
- **Resolution:** Self-host clean SVGs for recognized technologies and use honest, semantic text badges for algorithmic/sub-library items (e.g., Isolation Forest, TCP Socket).

### Issue 4: Project & Content Discrepancies
- **Inspection Finding:**
  - **Missing Projects:** `Cloud-Based Digital Locker & Parcel Notification System` is present in `AI-Resume3.pdf` but absent from the site.
  - **Missing Achievements:** Problem Solving (220+ LeetCode problems), Published Patent Contribution (frontend developer on 3-member team for AI-driven distributed file propagation risk detection), and IBM DevOps Certification are absent.
  - **Missing SlideOS Demo:** SlideOS on the site lacks the live demo link (`https://slide-os.vercel.app/`).
  - **Preserved Existing Projects:** TCRAS (Transfer Chain Risk Amplification System) and Vaultify (password manager) are present on the live site but absent from the resume. Per instructions, both remain on the site, with Vaultify under "Learning Projects".
- **Resolution:** Update content schema and components to include all resume projects and achievements, provide live links, and keep TCRAS and Vaultify.

---

## 4. Content Diff: Live Site vs. AI-Resume3.pdf

| Field / Section | Live Site (`drv-dev.vercel.app`) | Resume (`AI-Resume3.pdf`) | Resolution / Action Required |
| :--- | :--- | :--- | :--- |
| **Name** | Dhruv Jain | Dhruv Jain | Retain |
| **Phone** | None | `+91 9406586767` | **DO NOT PUBLISH** (Strict rule) |
| **Email** | `mailto:dhruvjain632@gmail.com` | `dhruvjain632@gmail.com` | Mailto link + Copy-to-clipboard button |
| **Location** | `"New York, NY"` | Vellore, India & Gwalior, India | Replace with Vellore / India |
| **Social Links** | GitHub, LinkedIn, Twitter/X, Email | GitHub, LinkedIn, Email | Include verified GitHub, LinkedIn, X, and Email |
| **Education** | Vellore Institute of Technology (B.Tech IT) | VIT: B.Tech in IT, 2024–2028, CGPA 9.08; DPS Gwalior: Class XII, 89.2%, 2023–2024 | Add full education details with CGPA 9.08 |
| **Skills Grouping** | Flat `techStack` array (6 items) | 9 structured categories: Languages, Backend, Frontend, Databases, Cloud & DevOps, AI & LLM, AI Agents, Testing & Tools, Core CS | Group exactly as resume, filterable chips |
| **SlideOS** | Missing live link, 2 lines text | Live Demo (`https://slide-os.vercel.app/`), 209 tests (78 Jest, 131 Vitest), 12 themes, Groq JSON mode, fallback | Spotlight section with interactive pipeline diagram and test chart |
| **MongoDB MCP Server** | Brief description | MCP SDK, Zod validation, read-only model, schema inference | Featured work with SVG architecture flow |
| **Digital Locker** | Missing | AWS EC2, S3, DynamoDB, Lambda, SNS, SQS, EventBridge, DLQ | Add as Featured Work with SVG architecture flow |
| **TCRAS** | Present in featured works | Not in resume | Keep in Featured Works with SVG flow |
| **Vaultify** | Present in learning projects | Not in resume | Keep in Learning Projects |
| **Achievements** | Not present | 220+ LeetCode problems; Published patent contribution | Add interactive cards + exact patent text |
| **Certifications** | Not present | IBM DevOps Certification | Add certification badge/card |
| **Experience** | Fake Northline Studio & Papergrid Labs | None listed (Student / Academic projects) | **Remove fake companies** |
| **Resume Route** | Placeholder text | `AI-Resume3.pdf` | Serve `Dhruv-Jain-Resume.pdf` with inline viewer & download |

---

## 5. Hyperlink Verification

All links extracted from annotations and existing codebase were tested with automated HTTP probes:

| Target | URL | Status Code | Destination Validated |
| :--- | :--- | :--- | :--- |
| **Portfolio Home** | `https://drv-dev.vercel.app/` | 200 OK | Canonical portfolio |
| **LinkedIn** | `https://linkedin.com/in/dhruv-jain-4284a8263/` | 200 OK | Profile confirmed |
| **GitHub Profile** | `https://github.com/Drv4ever` | 200 OK | Profile confirmed |
| **SlideOS Repo** | `https://github.com/Drv4ever/SlideOS` | 200 OK | Repository confirmed |
| **SlideOS Live** | `https://slide-os.vercel.app/` | 200 OK | Live app confirmed |
| **MongoDB MCP** | `https://github.com/Drv4ever/mongo-schema-explainer-mcp` | 200 OK | Repository confirmed |
| **TCRAS Live** | `https://tcras.vercel.app/` | 200 OK | Live app confirmed |
| **TCRAS Repo** | `https://github.com/Drv4ever/TCRAS` | 200 OK | Repository confirmed |
| **Vaultify Live** | `https://vaultify-gilt.vercel.app` | 200 OK | Live app confirmed |
| **Vaultify Repo** | `https://github.com/Drv4ever/Vaultify` | 200 OK | Repository confirmed |
| **Twitter / X** | `https://x.com/Drv4ever632` | 200 OK | Profile confirmed |

*All 11 external destination endpoints return HTTP 200 OK.*
