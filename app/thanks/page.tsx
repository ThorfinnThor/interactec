"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ThanksPage({
  searchParams,
}: {
  searchParams: { report?: string };
}) {
  const report = searchParams.report ?? "/reports/YOUR_FILE.pdf";

  useEffect(() => {
    window.location.href = report;
  }, [report]);

  return (
    <main className="mx-auto max-w-xl px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Thanks!</h1>
      <p className="mt-3 text-muted-foreground">
        Your download should start automatically. If it doesn’t, click below.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <Button asChild className="rounded-2xl">
          <a href={report}>Download again</a>
        </Button>
        <Button asChild variant="outline" className="rounded-2xl">
          <Link href="/reports">Back to reports</Link>
        </Button>
      </div>
    </main>
  );
}
