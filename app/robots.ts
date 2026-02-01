import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "interactec.vercel.app";
  const siteUrl = rawSiteUrl.startsWith("http") ? rawSiteUrl : `https://${rawSiteUrl}`;

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Thank-you pages are not useful in search results
      { userAgent: "*", disallow: ["/thanks"] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
