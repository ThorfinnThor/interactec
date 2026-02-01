import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Case studies",
  description: "Download InterAcTec case studies (email required).",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    url: "/case-studies",
    title: "Case studies | InterAcTec",
    description: "Download InterAcTec case studies (email required).",
  },
};

type CaseStudy = {
  title: string;
  subtitle: string;
  date: string;
  formUrl: string; // Tally form URL (redirect configured in Tally)
  previewImage: string; // PNG teaser
  tags: string[];
  summary: string;
};

const caseStudies: CaseStudy[] = [
  {
    title: "IBD Case Study",
    subtitle: "Inflammatory Bowel Disease",
    date: "2026",
    formUrl: "https://tally.so/r/NpoXBO",
    previewImage: "/report-previews/ibd.png",
    tags: ["IBD", "Inflammation", "Immune interactions"],
    summary: "Key interaction signatures and translational implications for inflammatory bowel disease programs.",
  },
  {
    title: "Arthritis Case Study",
    subtitle: "Autoimmune / Inflammatory Arthritis",
    date: "2026",
    formUrl: "https://tally.so/r/J9zlGd",
    previewImage: "/report-previews/arthritis.png",
    tags: ["Autoimmune", "Arthritis", "Biomarkers"],
    summary: "A structured overview of interaction dynamics and candidate stratification signals for arthritis.",
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Case studies
          </div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
            Download case studies
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Enter your email to download. No login required.
          </p>
        </div>

        <Button asChild variant="outline" className="rounded-2xl">
          <Link href="/">← Back to home</Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {caseStudies.map((cs) => (
          <Card key={cs.title} className="overflow-hidden rounded-3xl border-slate-200">
            <div className="relative aspect-[16/10] w-full bg-slate-50">
              <Image
                src={cs.previewImage}
                alt={`${cs.title} preview`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/0 to-white/0" />
              <div className="absolute bottom-3 left-3 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs text-slate-700">
                Preview (image only)
              </div>
            </div>

            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">{cs.title}</CardTitle>
                  <p className="mt-1 text-sm text-slate-600">{cs.subtitle}</p>
                </div>
                <Badge variant="outline" className="rounded-xl">
                  {cs.date}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">{cs.summary}</p>

              <div className="flex flex-wrap gap-2">
                {cs.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="rounded-2xl">
                  <a href={cs.formUrl} target="_blank" rel="noreferrer">
                    Download (email required)
                  </a>
                </Button>
              </div>

              <div className="text-xs text-slate-500">
                Full PDF is delivered after form submission.
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
