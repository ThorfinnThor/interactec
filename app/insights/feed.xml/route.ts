import { INSIGHTS } from "@/lib/insights";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const origin = getSiteUrl().origin;
  const items = INSIGHTS.map((insight) => {
    const url = `${origin}/insights/${insight.slug}`;
    return `
      <item>
        <title>${escapeXml(insight.title)}</title>
        <link>${url}</link>
        <guid isPermaLink="true">${url}</guid>
        <description>${escapeXml(insight.description)}</description>
        <pubDate>${new Date(`${insight.published}T12:00:00Z`).toUTCString()}</pubDate>
        <author>hello@interactec.bio (${escapeXml(insight.author)})</author>
      </item>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>InterAcTec Insights</title>
    <link>${origin}/insights</link>
    <description>Evidence-based guidance on cellular interaction mapping and immunotherapy study design.</description>
    <language>en</language>
    <lastBuildDate>${new Date("2026-10-18T12:00:00Z").toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
