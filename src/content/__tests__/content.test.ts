import { describe, it, expect } from "vitest";
import {
  content,
  rawContent,
  profile,
  education,
  skills,
  projects,
  achievements,
  certifications,
  stats,
  spotlightProject,
  featuredProjects,
  learningProjects,
} from "../index";
import {
  PortfolioContentSchema,
  ProjectSchema,
  ProfileSchema,
  SkillCategoryNameSchema,
} from "../schema";
import { getPersonJsonLd } from "../seo";

describe("Content Module & Schema Validation", () => {
  it("successfully parses rawContent through Zod schema without errors", () => {
    const parsed = PortfolioContentSchema.parse(rawContent);
    expect(parsed.profile.name).toBe("Dhruv Jain");
    expect(parsed.education).toHaveLength(2);
    expect(parsed.skills).toHaveLength(9);
    expect(parsed.projects).toHaveLength(5);
    expect(parsed.achievements).toHaveLength(2);
    expect(parsed.certifications).toHaveLength(1);
    expect(parsed.stats).toHaveLength(3);
  });

  it("STRICT PRIVACY: phone number must never appear in any content output", () => {
    const serialized = JSON.stringify(content);
    expect(serialized).not.toContain("9406586767");
    expect(serialized).not.toContain("+91");
  });

  it("verifies profile metadata and verified contact points", () => {
    expect(profile.name).toBe("Dhruv Jain");
    expect(profile.email).toBe("dhruvjain632@gmail.com");
    expect(profile.location).toBe("Vellore, India");
    expect(profile.avatar).toBe("/avatar.png");
    expect(profile.socials.some((s) => s.label === "Email" && s.href.startsWith("mailto:"))).toBe(true);
    expect(profile.socials.some((s) => s.label === "LinkedIn")).toBe(true);
    expect(profile.socials.some((s) => s.label === "GitHub")).toBe(true);
  });

  it("verifies education matches resume exactly and does not expose grades or CGPA", () => {
    const vit = education.find((e) => e.institution.includes("Vellore"));
    expect(vit).toBeDefined();
    expect(vit?.degree).toBe("B.Tech in Information Technology");
    expect(vit?.period).toBe("2024 – 2028");

    const dps = education.find((e) => e.institution.includes("Delhi Public School"));
    expect(dps).toBeDefined();

    expect(JSON.stringify(education)).not.toContain("CGPA");
    expect(JSON.stringify(education)).not.toContain("9.08");
  });

  it("verifies skill categories match resume exactly", () => {
    const categoryNames = skills.map((s) => s.category);
    expect(categoryNames).toEqual([
      "Languages",
      "Backend",
      "Frontend",
      "Databases",
      "Cloud & DevOps",
      "AI & LLM",
      "AI Agents",
      "Testing & Tools",
      "Core CS",
    ]);

    const aiAgentSkills = skills.find((s) => s.category === "AI Agents")?.skills;
    expect(aiAgentSkills).toContain("Model Context Protocol (MCP)");
    expect(aiAgentSkills).toContain("LangGraph");
  });

  it("verifies project categorization and required live demo links", () => {
    expect(spotlightProject).toBeDefined();
    expect(spotlightProject?.id).toBe("slide-os");
    expect(spotlightProject?.live).toBe("https://slide-os.vercel.app/");
    expect(spotlightProject?.testStats?.total).toBe(209);
    expect(spotlightProject?.testStats?.backendJest).toBe(78);
    expect(spotlightProject?.testStats?.frontendVitest).toBe(131);

    expect(featuredProjects.map((p) => p.id)).toEqual([
      "mongo-mcp",
      "parcel-locker",
      "tcras",
    ]);

    expect(learningProjects.map((p) => p.id)).toEqual(["vaultify"]);
  });

  it("verifies exact wording for published patent contribution", () => {
    const patent = achievements.find((a) => a.id === "patent");
    expect(patent).toBeDefined();
    expect(patent?.description).toBe(
      "Contributed as a frontend developer in a 3-member team on an AI-driven system for detecting risk in distributed file propagation. [published]"
    );
  });

  it("verifies real stat numbers without academic grades or CGPA", () => {
    const statIds = stats.map((s) => s.id);
    expect(statIds).toEqual(["tests", "themes", "leetcode"]);
    expect(stats.find((s) => s.id === "tests")?.value).toBe(209);
    expect(stats.find((s) => s.id === "themes")?.value).toBe(12);
    expect(stats.find((s) => s.id === "leetcode")?.value).toBe(220);
    expect(stats.find((s) => s.id === "cgpa")).toBeUndefined();
  });

  it("schema validation errors on invalid inputs", () => {
    expect(() =>
      ProfileSchema.parse({
        name: "Test",
        role: "Dev",
        headline: "Hi",
        bio: "Bio",
        location: "Vellore",
        avatar: "/avatar.png",
        email: "not-an-email",
        socials: [],
      })
    ).toThrow();

    expect(() =>
      SkillCategoryNameSchema.parse("InvalidCategory")
    ).toThrow();

    expect(() =>
      ProjectSchema.parse({
        id: "test",
        title: "Test",
        shortTitle: "T",
        tagline: "Tag",
        description: "Desc",
        bullets: [],
        techStack: [],
        category: "invalid-category",
      })
    ).toThrow();
  });

  it("generates valid Person JSON-LD with alumniOf and knowsAbout", () => {
    const jsonLd = getPersonJsonLd();
    expect(jsonLd["@type"]).toBe("Person");
    expect(jsonLd.name).toBe("Dhruv Jain");
    expect(jsonLd.url).toBe("https://drv-dev.vercel.app");
    expect(jsonLd.alumniOf).toHaveLength(2);
    expect(jsonLd.knowsAbout.length).toBeGreaterThan(15);
    expect(jsonLd.sameAs).toContain("https://github.com/Drv4ever");
  });
});
