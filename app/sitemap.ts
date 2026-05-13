import { MetadataRoute } from "next";
import { ALL_SEO_SLUGS } from "@/lib/seo/tools-data";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://chaptry.com";

const LAUNCH_DATE = "2025-01-01";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: LAUNCH_DATE,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const toolPages: MetadataRoute.Sitemap = ALL_SEO_SLUGS.tools.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: LAUNCH_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const comparisonPages: MetadataRoute.Sitemap = ALL_SEO_SLUGS.comparisons.map(
    (slug) => ({
      url: `${BASE_URL}/tools/${slug}`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  const nichePages: MetadataRoute.Sitemap = ALL_SEO_SLUGS.niches.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: LAUNCH_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const blogPages: MetadataRoute.Sitemap = ALL_SEO_SLUGS.blog.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: LAUNCH_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...toolPages,
    ...comparisonPages,
    ...nichePages,
    ...blogPages,
  ];
}
