import type { Metadata } from "next";
import Image from "next/image";
import SubpageShell from "@/components/site/SubpageShell";
import { CaseStudyForm } from "@/components/site/forms";
import { CASE_STUDIES } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case studies",
  description: "Download InterAcTec case studies on interaction signatures in inflammatory bowel disease and juvenile idiopathic arthritis.",
  alternates: { canonical: "/case-studies" },
  openGraph: { url: "/case-studies", title: "Case studies | InterAcTec" },
};

export default async function CaseStudiesPage({
  searchParams,
}: {
  searchParams: Promise<{ expired?: string }>;
}) {
  const { expired } = await searchParams;
  return (
    <SubpageShell
      kicker="Case studies"
      title="Interaction signatures in patient samples."
      intro={
        <>
          Two short reports from our translational work. Enter your details once per report and the PDF downloads
          straight away.
        </>
      }
    >
      <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {expired && (
          <p role="status" className="mb-10 rounded-xl border border-ink/15 bg-white/70 px-5 py-4 text-[15px] text-ink/80">
            That download link has expired or is invalid. Please request the report again below.
          </p>
        )}
        <div className="grid gap-10 lg:grid-cols-2">
          {CASE_STUDIES.map((cs) => (
            <article
              key={cs.slug}
              id={cs.slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-ink/12 bg-white/70"
            >
              <div className="relative aspect-[16/9] w-full bg-paper-2">
                <Image src={cs.previewImage} alt="" fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 50vw" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/70">
                  Preview
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-teal-deep">{cs.field}</p>
                <h2 className="mt-3 text-3xl font-medium tracking-tight">{cs.title}</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-ink/75">{cs.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {cs.facts.map((f) => (
                    <li key={f} className="rounded-full border border-ink/15 px-3 py-1 text-[13px] text-ink/75">
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-ink/10 pt-6">
                  <CaseStudyForm slug={cs.slug} title={cs.title} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SubpageShell>
  );
}
