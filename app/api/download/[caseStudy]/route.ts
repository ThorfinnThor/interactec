import { caseStudyBySlug } from "@/lib/case-studies";
import { getEnv, verifyDownload } from "@/lib/server/store";

/**
 * Case-study PDFs are served from R2 only with a valid signed link, which is issued after the
 * request form on /case-studies has been submitted (links expire after 24 h).
 * Local Node development (no Cloudflare env) falls back to private/reports without a check.
 */
export async function GET(request: Request, ctx: { params: Promise<{ caseStudy: string }> }) {
  const { caseStudy } = await ctx.params;
  const meta = caseStudyBySlug(caseStudy);
  if (!meta) return new Response("Not found", { status: 404 });

  const env = await getEnv();
  if (!env) return serveFromNodeFileSystem(meta.file, meta.downloadName);

  const token = new URL(request.url).searchParams.get("t");
  if (!(await verifyDownload(env, meta.slug, token))) {
    return new Response(null, { status: 303, headers: { Location: `/case-studies?expired=${meta.slug}` } });
  }

  const object = await env.REPORTS.get(meta.objectKey);
  if (!object) return new Response("Not found", { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("Content-Type", "application/pdf");
  headers.set("Content-Disposition", `attachment; filename="${meta.downloadName}"`);
  headers.set("Content-Length", object.size.toString());
  headers.set("Cache-Control", "private, no-store");
  headers.set("X-Robots-Tag", "noindex");
  return new Response(object.body, { headers });
}

async function serveFromNodeFileSystem(file: string, downloadName: string): Promise<Response> {
  const [{ existsSync, createReadStream }, path, { Readable }] = await Promise.all([
    import("node:fs"),
    import("node:path"),
    import("node:stream"),
  ]);
  const filePath = path.join(process.cwd(), "private", "reports", file);
  if (!existsSync(filePath)) return new Response("Not found", { status: 404 });
  const webStream = Readable.toWeb(createReadStream(filePath)) as unknown as ReadableStream;
  return new Response(webStream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${downloadName}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
