type ReportMeta = {
  file: string;
  objectKey: string;
  downloadName: string;
};

const ALLOWLIST: Record<string, ReportMeta> = {
  ibd: {
    file: "InterAcTec_Report1_IBD.pdf",
    objectKey: "reports/InterAcTec_Report1_IBD.pdf",
    downloadName: "InterAcTec_CaseStudy_IBD.pdf",
  },
  arthritis: {
    file: "InterAcTec_Report2_Arthritis.pdf",
    objectKey: "reports/InterAcTec_Report2_Arthritis.pdf",
    downloadName: "InterAcTec_CaseStudy_Arthritis.pdf",
  },
};

async function getCloudflareEnv(): Promise<CloudflareEnv | null> {
  try {
    return (await import("cloudflare:workers")).env as CloudflareEnv;
  } catch {
    return null;
  }
}

async function serveFromR2(env: CloudflareEnv, meta: ReportMeta): Promise<Response> {
  const object = await env.REPORTS.get(meta.objectKey);
  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("Content-Type", "application/pdf");
  headers.set("Content-Disposition", `attachment; filename="${meta.downloadName}"`);
  headers.set("Content-Length", object.size.toString());
  headers.set("Cache-Control", "private, no-store");
  headers.set("ETag", object.httpEtag);

  return new Response(object.body, { headers });
}

async function serveFromNodeFileSystem(meta: ReportMeta): Promise<Response> {
  const [{ existsSync, createReadStream }, path, { Readable }] = await Promise.all([
    import("node:fs"),
    import("node:path"),
    import("node:stream"),
  ]);
  const filePath = path.join(process.cwd(), "private", "reports", meta.file);

  if (!existsSync(filePath)) {
    return new Response("Not found", { status: 404 });
  }

  const nodeStream = createReadStream(filePath);
  const webStream = Readable.toWeb(nodeStream) as unknown as ReadableStream;

  return new Response(webStream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${meta.downloadName}"`,
      "Cache-Control": "private, no-store",
    },
  });
}

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ caseStudy: string }> }
) {
  const { caseStudy } = await ctx.params;

  const meta = ALLOWLIST[caseStudy];
  if (!meta) {
    return new Response("Not found", { status: 404 });
  }

  const cloudflareEnv = await getCloudflareEnv();
  return cloudflareEnv
    ? serveFromR2(cloudflareEnv, meta)
    : serveFromNodeFileSystem(meta);
}
