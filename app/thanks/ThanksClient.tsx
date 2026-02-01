"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CASE_STUDY_SLUGS = new Set(["ibd", "arthritis"]);

// Backwards compatibility: old public paths -> slug
const LEGACY_PATH_TO_SLUG: Record<string, string> = {
  "/reports/InterAcTec_Report1_IBD.pdf": "ibd",
  "/reports/InterAcTec_Report2_Arthritis.pdf": "arthritis",
  "/case-studies/InterAcTec_Report1_IBD.pdf": "ibd",
  "/case-studies/InterAcTec_Report2_Arthritis.pdf": "arthritis",
};

function normalizeToSlug(raw: string) {
  let decoded = raw || "";

  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    // ignore
  }

  // If already a slug
  if (CASE_STUDY_SLUGS.has(decoded)) return decoded;

  // Normalize path-ish variants
  if (decoded.startsWith("reports/")) decoded = "/" + decoded;
  if (decoded.startsWith("case-studies/")) decoded = "/" + decoded;

  if (LEGACY_PATH_TO_SLUG[decoded]) return LEGACY_PATH_TO_SLUG[decoded];

  return "";
}

export default function ThanksClient() {
  const [rawValue, setRawValue] = useState("");

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      // Support both query params:
      // - legacy: ?report=...
      // - preferred: ?caseStudy=...
      setRawValue(url.searchParams.get("caseStudy") ?? url.searchParams.get("report") ?? "");
    } catch {
      setRawValue("");
    }
  }, []);

  const slug = useMemo(() => normalizeToSlug(rawValue), [rawValue]);
  const isAllowed = CASE_STUDY_SLUGS.has(slug);

  const downloadUrl = useMemo(() => {
    if (!isAllowed) return "";
    return `/api/download/${slug}`;
  }, [isAllowed, slug]);

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
              <a href={isAllowed ? downloadUrl : "/case-studies"} download>
                Download again
              </a>
            </Button>

            <Button asChild variant="outline" className="rounded-2xl">
              <Link href="/case-studies">Back to case studies</Link>
            </Button>
          </div>

          {!isAllowed && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              This link is missing or invalid. Please start from the case studies page.
              <div className="mt-2 text-xs text-slate-500">
                Received: <span className="font-mono">{rawValue || "(empty)"}</span>
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Normalized slug: <span className="font-mono">{slug || "(empty)"}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
