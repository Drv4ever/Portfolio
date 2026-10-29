import { content } from "./index";

export function getPersonJsonLd() {
  const allSkills = content.skills.flatMap((cat) => cat.skills);
  const socialUrls = content.profile.socials
    .filter((s) => s.href.startsWith("http"))
    .map((s) => s.href);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.profile.name,
    jobTitle: content.profile.role,
    description: content.profile.bio,
    url: "https://drv-dev.vercel.app",
    sameAs: socialUrls,
    email: `mailto:${content.profile.email}`,
    alumniOf: content.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.institution,
      location: edu.location,
    })),
    knowsAbout: allSkills,
  };
}
