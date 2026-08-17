import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/members", "/sign-in", "/sign-up"]
    },
    sitemap: "https://www.theclarapath.org/sitemap.xml"
  };
}
