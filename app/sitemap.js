import { siteUrl } from "@/content/site";
import { caseStudies } from "@/content/case-studies";

export default function sitemap() {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((c) => ({
      url: `${siteUrl}/projects/${c.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
