// app/api/download/[report]/route.ts
import { NextRequest } from "next/server";
import path from "node:path";
import { existsSync, createReadStream } from "node:fs";
import { Readable } from "node:stream";

export const runtime = "nodejs";

// Map short slugs to real filenames in private/reports
const ALLOWLIST: Record<string, { file: string; downloadName: string }> = {
  ibd: {
    file: "InterAcTec_Report1_IBD.pdf",
    downloadName: "InterAcTec_Report_IBD.pdf",
  },
  arthritis: {
    file: "InterAcTec_Report2_Arthritis.pdf",
    downloadName: "InterAcTec_Report_Arthritis.pdf",
  },
};

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ report: string }> }
) {
  const { report } = await ctx.params;

  const meta = ALLOWLIST[report];
  if (!meta) {
    return new Response("Not found", { status: 404 });
  }

  // NOTE: this path is NOT publicly reachable because it's outside /public
  const filePath = path.join(process.cwd(), "private", "reports", meta.file);

  if (!existsSync(filePath)) {
    return new Response("Not found", { status: 404 });
  }

  // Stream file from disk (Node stream -> Web ReadableStream)
  const nodeStream = createReadStream(filePath);
  const webStream = Readable.toWeb(nodeStream) as unknown as ReadableStream;

  return new Response(webStream, {
    headers: {
      "Content-Type": "application/pdf",
      // attachment = forces download
      "Content-Disposition": `attachment; filename="${meta.downloadName}"`,
      // reduce caching of private assets
      "Cache-Control": "private, no-store",
    },
  });
}
