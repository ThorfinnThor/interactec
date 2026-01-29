import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const reports = [
  {
    title: "Report #1",
    date: "2026-01-29",
    summary: "One sentence describing what the reader gets.",
    pdfPath: "/reports/YOUR_FILE.pdf",
    tallyUrl: "https://tally.so/r/XXXXXXXX",
  },
];

export default function ReportsPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Reports</h1>
        <p className="mt-2 text-muted-foreground">
          Enter your email to download. No login.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {reports.map((r) => {
          const redirectTo = `${siteUrl}/thanks?report=${encodeURIComponent(
            r.pdfPath
          )}`;
          const href = `${r.tallyUrl}?redirect=${encodeURIComponent(redirectTo)}`;

          return (
            <Card key={r.title} className="rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl">{r.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{r.date}</p>
              </CardHeader>
              <CardContent>
                <p className="mb-5 text-sm text-muted-foreground">{r.summary}</p>
                <Button asChild className="w-full rounded-2xl">
                  <a href={href}>Download PDF</a>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
