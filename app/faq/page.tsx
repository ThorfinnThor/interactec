import type { Metadata } from "next";
import Link from "next/link";
import SubpageShell from "@/components/site/SubpageShell";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Answers about InterAcTec flow-cytometry interaction analysis, compatible data, immunotherapy applications and pilot deliverables.",
  alternates: { canonical: "/faq" },
  openGraph: { url: "/faq", title: "Frequently asked questions | InterAcTec" },
};

const QUESTIONS = [
  {
    question: "What does InterAcTec measure?",
    answer:
      "InterAcTec measures physically interacting cell pairs in compatible multicolour flow-cytometry data. It assigns those events to immune-lineage pairs and compares their frequencies and phenotypes across defined experimental conditions.",
  },
  {
    question: "Which immunotherapy modalities can be compared?",
    answer:
      "The current focus is on T-cell engagers, bispecific antibodies, CAR-T therapies and other cell-bridging modalities. Candidates, formats, doses, donors, time points and controls can be compared within a suitable study design.",
  },
  {
    question: "What data are required?",
    answer:
      "A study can use newly acquired data or compatible existing FCS files. Suitability depends on sample type, scatter information, lineage markers, controls and acquisition settings, so each dataset or planned experiment is assessed before a pilot is scoped.",
  },
  {
    question: "Can existing flow-cytometry datasets be re-analysed?",
    answer:
      "Yes, when the original panel and acquisition preserved the relevant interacting-cell events. A feasibility review determines whether the available FCS files can support the intended interaction question before analysis begins.",
  },
  {
    question: "What resolution can the panel provide?",
    answer:
      "A 40-plex design can profile more than 200 cell phenotypes and functional states and resolve more than 25 lineage-level interaction types. Exact resolution and event yield depend on the panel, sample, controls and acquisition design.",
  },
  {
    question: "What does a pilot deliver?",
    answer:
      "A pilot delivers an interaction map, a side-by-side comparison of the agreed conditions and an interpreted decision report with clear plots, limitations and implications for the next experiment.",
  },
];

export default function FaqPage() {
  return (
    <SubpageShell
      kicker="FAQ"
      title="The essentials before a pilot."
      intro={<>Concise answers about the readout, compatible data and what your team receives.</>}
    >
      <section aria-label="Frequently asked questions" className="mx-auto max-w-[980px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="divide-y divide-ink/12 border-y border-ink/12">
          {QUESTIONS.map((item, index) => (
            <article key={item.question} className="grid gap-3 py-8 sm:grid-cols-12 sm:gap-6">
              <p className="font-mono text-xs text-teal-deep sm:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div className="sm:col-span-10">
                <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">{item.question}</h2>
                <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-ink/70">{item.answer}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-ink p-7 text-paper sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-medium tracking-tight">Is your study compatible?</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-mist">
              Share the modality, sample system and available data for a focused feasibility assessment.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-teal px-6 text-base font-medium text-ink transition-colors hover:bg-paper"
          >
            Check project feasibility
          </Link>
        </div>
      </section>
    </SubpageShell>
  );
}
