import type { MetadataRoute } from "next";
import { getCaseStudySlugs } from "@/data/caseStudies";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects", "/certifications"];
  const caseStudyRoutes = getCaseStudySlugs().map((slug) => `/projects/${slug}`);

  return [...routes, ...caseStudyRoutes].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/projects/") ? 0.9 : 0.8,
  }));
}
