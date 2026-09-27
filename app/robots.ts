import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl().origin;

  return {
    rules: [
      // Utility pages and endpoints are not useful in search results
      { userAgent: "*", allow: "/", disallow: ["/thanks", "/admin", "/api/"] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
