// app/api/download/[caseStudy]/route.ts
import { NextRequest } from "next/server";
import path from "node:path";
import { existsSync, createReadStream } from "node:fs";
import { Readable } from "node:stream";

export const runtime = "nodejs";

// Map short slugs to real filenames stored on the server (non-public folder)
const ALLOWLIST: Record<string, { file: string; downloadName: string }> = {
  ibd: {
    file: "InterAcTec_Report1_IBD.pdf",
    downloadName: "InterAcTec_CaseStudy_IBD.pdf",
  },
  arthritis: {
    file: "InterAcTec_Report2_Arthritis.pdf",
    downloadName: "InterAcTec_CaseStudy_Arthritis.pdf",
  },
};

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ caseStudy: string }> }
) {
  const { caseStudy } = await ctx.params;

  const meta = ALLOWLIST[caseStudy];
  if (!meta) {
    return new Response("Not found", { status: 404 });
  }

  // NOTE: this path is NOT publicly reachable because it's outside /public
  // Keep your PDFs here:
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
      "Content-Disposition": `attachment; filename="${meta.downloadName}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
