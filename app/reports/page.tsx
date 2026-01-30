import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Report = {
  title: string;
  subtitle: string;
  date: string;
  pdfPath: string;
  tags: string[];
  summary: string;
};

<<<<<<< HEAD
const TALLY_URL = "https://tally.so/r/NpoXBO";

=======
>>>>>>> e396f3ff4cc3c3e7bd2417e332d7fb16a0ea7a8b
const reports: Report[] = [
  {
    title: "IBD Report",
    subtitle: "Inflammatory Bowel Disease",
    date: "2026",
    pdfPath: "/reports/InterAcTec_Report1_IBD.pdf",
    tags: ["IBD", "Inflammation", "Immune interactions"],
    summary:
<<<<<<< HEAD
      "Key interaction signatures and translational implications for inflammatory bowel disease.",
=======
      "Key interaction signatures and translational implications for inflammatory bowel disease programs.",
>>>>>>> e396f3ff4cc3c3e7bd2417e332d7fb16a0ea7a8b
  },
  {
    title: "Arthritis Report",
    subtitle: "Autoimmune / Inflammatory Arthritis",
    date: "2026",
    pdfPath: "/reports/InterAcTec_Report2_Arthritis.pdf",
    tags: ["Autoimmune", "Arthritis", "Biomarkers"],
    summary:
<<<<<<< HEAD
      "A structured overview of interaction dynamics in juvenile idiopathic arthritis.",
=======
      "A structured overview of interaction dynamics and candidate stratification signals for arthritis.",
>>>>>>> e396f3ff4cc3c3e7bd2417e332d7fb16a0ea7a8b
  },
];

export default function ReportsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Reports</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
            Download data reports
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Short, decision-oriented PDFs. No login required. (We’ll add email capture next.)
          </p>
        </div>

        <Button asChild variant="outline" className="rounded-2xl">
          <Link href="/">← Back to home</Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {reports.map((r) => (
          <Card key={r.pdfPath} className="rounded-3xl border-slate-200">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">{r.title}</CardTitle>
                  <p className="mt-1 text-sm text-slate-600">{r.subtitle}</p>
                </div>
                <Badge variant="outline" className="rounded-xl">
                  {r.date}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">{r.summary}</p>

              <div className="flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {/* “download” attribute suggests download; browser may still open PDF depending on settings */}
                <Button asChild className="rounded-2xl">
                  <a href={r.pdfPath} download>
                    Download PDF
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-2xl">
                  <a href={r.pdfPath} target="_blank" rel="noreferrer">
                    Open in new tab
                  </a>
                </Button>
              </div>

              <div className="text-xs text-slate-500">
                File: <span className="font-mono">{r.pdfPath}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-lg font-semibold text-slate-950">Next: Email capture</h2>
        <p className="mt-1 text-sm text-slate-600">
          We’ll add a simple Tally form that captures email + consent and then redirects to an auto-download “Thanks”
          page. No login required.
        </p>
      </div>
    </main>
  );
}
