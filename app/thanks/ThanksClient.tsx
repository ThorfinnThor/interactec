"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const REPORT_SLUGS = new Set(["ibd", "arthritis"]);

// Backwards compatibility: old public paths -> slug
const LEGACY_PATH_TO_SLUG: Record<string, string> = {
  "/reports/InterAcTec_Report1_IBD.pdf": "ibd",
  "/reports/InterAcTec_Report2_Arthritis.pdf": "arthritis",
};

function normalizeToSlug(raw: string) {
  let decoded = raw || "";

  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    // ignore
  }

  // If the value is already a slug
  if (REPORT_SLUGS.has(decoded)) return decoded;

  // Normalize legacy path variants
  if (decoded.startsWith("reports/")) decoded = "/" + decoded;

  if (LEGACY_PATH_TO_SLUG[decoded]) return LEGACY_PATH_TO_SLUG[decoded];

  return "";
}

export default function ThanksClient() {
  const [rawReport, setRawReport] = useState("");

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      setRawReport(url.searchParams.get("report") ?? "");
    } catch {
      setRawReport("");
    }
  }, []);

  const reportSlug = useMemo(() => normalizeToSlug(rawReport), [rawReport]);
  const isAllowed = REPORT_SLUGS.has(reportSlug);

  const downloadUrl = useMemo(() => {
    if (!isAllowed) return "";
    return `/api/download/${reportSlug}`;
  }, [isAllowed, reportSlug]);

  useEffect(() => {
    if (!isAllowed) return;
    window.location.assign(downloadUrl);
  }, [isAllowed, downloadUrl]);

  return (
    <main className="mx-auto max-w-2xl px-6 py-14">
      <Card className="rounded-3xl border-slate-200">
        <CardContent className="p-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            Thanks — your download is starting
          </h1>
          <p className="mt-2 text-slate-600">
            If your PDF does not download automatically, use the button below.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-2xl" disabled={!isAllowed}>
              <a href={isAllowed ? downloadUrl : "/reports"} download>
                Download again
              </a>
            </Button>

            <Button asChild variant="outline" className="rounded-2xl">
              <Link href="/reports">Back to reports</Link>
            </Button>
          </div>

          {!isAllowed && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              This link is missing or invalid. Please start from the reports page.
              <div className="mt-2 text-xs text-slate-500">
                Received: <span className="font-mono">{rawReport || "(empty)"}</span>
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Normalized slug: <span className="font-mono">{reportSlug || "(empty)"}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
