import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl().origin;

  return [
    {
      url: `${siteUrl}/`,
      lastModified: "2026-10-15",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/science`,
      lastModified: "2026-10-15",
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/team`,
      lastModified: "2026-10-15",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/case-studies`,
      lastModified: "2026-10-15",
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: "2026-10-15",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: "2026-09-27",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
