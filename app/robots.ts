import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl().origin;

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Thank-you pages are not useful in search results
      { userAgent: "*", disallow: ["/thanks"] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
