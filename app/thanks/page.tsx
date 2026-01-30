"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ALLOWED_REPORTS = new Set([
  "/reports/InterAcTec_Report1_IBD.pdf",
  "/reports/InterAcTec_Report2_Arthritis.pdf",
]);

export default function ThanksClient({ reportParam }: { reportParam: string }) {
  const report = useMemo(() => {
    const raw = reportParam ?? "";

    let decoded = raw;
    try {
      decoded = decodeURIComponent(raw);
    } catch {
      decoded = raw;
    }

    // normalize missing leading slash
    if (decoded && !decoded.startsWith("/reports/")) {
      if (decoded.startsWith("reports/")) decoded = "/" + decoded;
    }

    return decoded;
  }, [reportParam]);

  const isAllowed = ALLOWED_REPORTS.has(report);

  useEffect(() => {
    if (!isAllowed) return;
    window.location.assign(report);
  }, [isAllowed, report]);

  return (
    <main className="mx-auto max-w-2xl px-6 py-14">
      <Card className="rounded-3xl border-slate-200">
        <CardContent className="p-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            Thanks — your download is starting
          </h1>
          <p className="mt-2 text-slate-600">
            If your PDF does not open automatically, use the button below.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-2xl" disabled={!isAllowed}>
              <a href={isAllowed ? report : "/reports"} download>
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
                Received: <span className="font-mono">{reportParam || "(empty)"}</span>
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Normalized: <span className="font-mono">{report || "(empty)"}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
