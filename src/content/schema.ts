import { z } from "zod";

export const SocialLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  icon: z.string().min(1),
});

export const ProfileSchema = z.object({
  name: z.string().min(1),
  nickname: z.string().min(1),
  role: z.string().min(1),
  headline: z.string().min(1),
  bio: z.string().min(1),
  location: z.string().min(1),
  avatar: z.string().min(1),
  email: z.string().email(),
  socials: z.array(SocialLinkSchema),
});

export const EducationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  period: z.string().min(1),
  location: z.string().min(1),
  score: z.string().optional(),
});

export const SkillCategoryNameSchema = z.enum([
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

export const SkillCategorySchema = z.object({
  category: SkillCategoryNameSchema,
  skills: z.array(z.string().min(1)),
});

export const ProjectArchitectureStepSchema = z.object({
  step: z.number().int().positive(),
  title: z.string().min(1),
  detail: z.string().min(1),
});

export const ProjectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  shortTitle: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  bullets: z.array(z.string().min(1)),
  techStack: z.array(z.string().min(1)),
  category: z.enum(["spotlight", "featured", "learning"]),
  status: z.string().optional(),
  active: z.boolean().default(false),
  github: z.string().url().optional(),
  live: z.string().url().optional(),
  architectureSteps: z.array(ProjectArchitectureStepSchema).optional(),
  testStats: z
    .object({
      total: z.number().int().positive(),
      backendJest: z.number().int().positive(),
      frontendVitest: z.number().int().positive(),
    })
    .optional(),
  slideThemesCount: z.number().int().positive().optional(),
});

export const AchievementSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  tag: z.string().optional(),
  metric: z.string().optional(),
});

export const CertificationSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  issuer: z.string().min(1),
  description: z.string().min(1),
});

export const StatItemSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  value: z.number(),
  suffix: z.string().default(""),
  description: z.string().min(1),
  decimals: z.number().int().nonnegative().default(0),
});

export const PortfolioContentSchema = z.object({
  profile: ProfileSchema,
  education: z.array(EducationSchema),
  skills: z.array(SkillCategorySchema),
  projects: z.array(ProjectSchema),
  achievements: z.array(AchievementSchema),
  certifications: z.array(CertificationSchema),
  stats: z.array(StatItemSchema),
});

export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type SkillCategoryName = z.infer<typeof SkillCategoryNameSchema>;
export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type ProjectArchitectureStep = z.infer<typeof ProjectArchitectureStepSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Achievement = z.infer<typeof AchievementSchema>;
export type Certification = z.infer<typeof CertificationSchema>;
export type StatItem = z.infer<typeof StatItemSchema>;
export type PortfolioContent = z.infer<typeof PortfolioContentSchema>;
