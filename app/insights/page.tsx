import type { Metadata } from "next";
import Link from "next/link";
import InsightCard from "@/components/site/InsightCard";
import SubpageShell from "@/components/site/SubpageShell";
import { INSIGHTS } from "@/lib/insights";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Insights on cell–cell interaction analysis",
  description:
    "Practical, evidence-based articles on flow-cytometry interaction mapping, immunotherapy candidate comparison, FCS re-analysis and high-parameter panel design.",
  alternates: { canonical: "/insights", types: { "application/rss+xml": "/insights/feed.xml" } },
  openGraph: {
    url: "/insights",
    title: "Insights on cell–cell interaction analysis | InterAcTec",
    description:
      "Practical guidance for turning physical cell interactions into a decision-ready flow-cytometry readout.",
  },
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "InterAcTec Insights",
  description:
    "Evidence-based articles on cellular interaction mapping, immunotherapy studies and flow-cytometry panel design.",
  url: `${getSiteUrl().origin}/insights`,
  hasPart: INSIGHTS.map((insight) => ({
    "@type": "Article",
    headline: insight.title,
    url: `${getSiteUrl().origin}/insights/${insight.slug}`,
  })),
};

export default function InsightsPage() {
  return (
    <SubpageShell
      kicker="Insights"
      title="Practical thinking for interaction-first immunotherapy studies."
      intro={
        <>
          Evidence-based guidance on what cellular interaction mapping can measure, how to design the experiment and
          how to turn the result into a research decision.
        </>
      }
    >
      <section aria-labelledby="latest-insights" className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-deep">Research library</p>
            <h2 id="latest-insights" className="mt-5 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              Start with the question behind your next experiment.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/12 bg-ink/12 md:grid-cols-2 lg:col-span-9">
            {INSIGHTS.map((insight, index) => (
              <InsightCard key={insight.slug} insight={insight} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-paper-2">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-20">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-violet-deep">From reading to study design</p>
            <h2 className="mt-5 text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
              Have a dataset or candidate question in mind?
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
              Share the modality, sample system and available flow-cytometry data. We will assess whether an interaction
              pilot can answer the decision you need to make.
            </p>
          </div>
          <div className="flex items-end lg:col-span-4 lg:col-start-9">
            <Link
              href="/#contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-base font-medium text-paper transition-colors hover:bg-teal hover:text-ink"
            >
              Check project feasibility
            </Link>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
    </SubpageShell>
  );
}
