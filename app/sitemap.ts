import type { MetadataRoute } from "next";
import { insightArticles } from "../lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const base: MetadataRoute.Sitemap = [
    {
      url: "https://www.theclarapath.org",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: "https://www.theclarapath.org/local-authorities",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: "https://www.theclarapath.org/care-terms",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: "https://www.theclarapath.org/free-care-assessment-guide",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: "https://www.theclarapath.org/services",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: "https://www.theclarapath.org/insights",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9
    }
  ];

  const insights: MetadataRoute.Sitemap = insightArticles.map((article) => ({
    url: `https://www.theclarapath.org/insights/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8
  }));

  return [...base, ...insights];
}
