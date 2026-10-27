import type { Metadata } from "next";
import Link from "next/link";
import HeroVisual from "@/components/site/HeroVisual";
import { AcquisitionStrip, CellProfilePlot, ComparisonPlot, CytometryHero, HighPlexReadout, InteractionNetwork } from "@/components/site/CytometryVisuals";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { ContactForm } from "@/components/site/forms";
import { CONTACT_EMAIL } from "@/lib/legal";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Cell-cell interaction maps for immunotherapy candidate selection",
  description:
    "See which immune and target cells physically engage across immunotherapy candidates, doses and conditions using flow-cytometry interaction maps.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Cell-cell interaction maps for immunotherapy candidate selection | InterAcTec",
    description:
      "See which immune and target cells physically engage across candidates, doses and conditions.",
  },
};

const PUBLICATION_URL = "https://www.nature.com/articles/s41592-025-02744-w";
const KICKER = "font-mono text-xs uppercase tracking-[0.16em]";
const CTA_PRIMARY =
  "inline-flex h-12 items-center justify-center rounded-full bg-teal px-6 text-base font-medium text-ink transition-colors hover:bg-paper";
const CTA_SECONDARY =
  "inline-flex h-12 items-center justify-center rounded-full border border-paper/30 px-6 text-base text-paper transition-colors hover:border-paper";

const DELIVERABLES = [
  {
    title: "High-plex cell profiles",
    text: "Resolve immune-cell identities and functional states with a study-specific marker panel.",
    detail: "Identity · phenotype · state",
    visual: CellProfilePlot,
  },
  {
    title: "Cell-interaction maps",
    text: "See which cell lineages physically engage and how interaction frequencies differ between groups.",
    detail: "Cell-type pairs · group comparison",
    visual: InteractionNetwork,
  },
  {
    title: "Comparative insights",
    text: "Compare response groups, candidates or conditions, with scientific interpretation in a concise report.",
    detail: "Group comparison · interpretation · next steps",
    visual: ComparisonPlot,
  },
];

const PILOT_STEPS = [
  {
    title: "Share the decision",
    text: "Tell us about your modality, effector and target cells, candidate conditions, controls and the decision you need to make.",
  },
  {
    title: "Scope the pilot",
    text: "Together we define the panel, controls and acquisition or re-analysis plan for new or existing flow-cytometry data.",
  },
  {
    title: "Compare engagement",
    text: "We map interacting cell pairs, compare conditions and review the resulting report with your team.",
  },
];

const APPLICATIONS = [
  {
    title: "T-cell engagers & bispecifics",
    question: "Which candidate or format produces the intended T cell–target cell engagement?",
    decision: "Prioritize candidates, concentrations and time points for follow-up experiments.",
  },
  {
    title: "CAR-T therapies",
    question: "Do CAR-T cells engage the intended targets, and which other cell types do they contact?",
    decision: "Compare constructs, donors or conditions at the level of cellular engagement.",
  },
  {
    title: "Existing cytometry datasets",
    question: "Does an existing dataset contain an interaction signal that was previously gated out?",
    decision: "Assess whether compatible FCS files can answer a new interaction-focused question.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${getSiteUrl().origin}/#organization`,
    name: "InterAcTec",
    alternateName: "InterAcTec project",
    description:
      "A pre-incorporation project developing flow-cytometry cell-cell interaction analysis for immunotherapy research.",
    email: CONTACT_EMAIL,
    url: getSiteUrl().origin,
    logo: {
      "@type": "ImageObject",
      url: `${getSiteUrl().origin}/icon.png`,
      width: 512,
      height: 512,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl().origin}/#website`,
    url: getSiteUrl().origin,
    name: "InterAcTec",
    alternateName: "InterAcTec cell-cell interaction analysis",
    publisher: { "@id": `${getSiteUrl().origin}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${getSiteUrl().origin}/#service`,
    name: "InterAcTec cell-cell engagement pilot",
    provider: { "@id": `${getSiteUrl().origin}/#organization` },
    serviceType: "Flow-cytometry cell-cell interaction analysis",
    description:
      "A scoped interaction study delivering an interaction map, candidate comparison and scientific decision report.",
  },
];

export default function HomePage() {
  return (
    <div className="bg-ink">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-teal px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="bg-ink text-paper">
        <Hero />
        <Deliverables />
        <Pilot />
        <Applications />
        <Evidence />
        <Contact />
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-20 lg:pt-14">
        <div className="lg:col-span-7">
          <p className={`${KICKER} text-teal`}>Flow-cytometry interaction analysis</p>
          <h1
            id="hero-title"
            className="mt-5 text-[2.55rem] font-medium leading-[1.03] tracking-[-0.035em] text-paper sm:text-6xl lg:text-[clamp(3.15rem,5vw,4.2rem)]"
          >
            Cell-cell interaction maps for <span className="text-teal">immunotherapy candidate selection.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl">
            High-plex flow cytometry combines deep immune-cell profiling with maps of physical cell-cell interactions.
            See what changes across candidates, doses and conditions.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className={CTA_PRIMARY}>
              Check project feasibility
            </a>
            <Link href="/case-studies" className={CTA_SECONDARY}>
              View case-study reports
            </Link>
          </div>

          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-5">
            {[["40-plex", "Marker panels"], ["200+", "Phenotypes & states"], [">25", "Interaction types"]].map(([value, label]) => (
              <div key={label}>
                <dt className="text-2xl font-medium tracking-tight text-teal">{value}</dt>
                <dd className="mt-1 text-xs text-mist">{label}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[11px] leading-relaxed text-mist">Panel-dependent resolution. Interaction partners assigned at immune-lineage level.</p>
        </div>

        <div className="lg:col-span-5 lg:-mr-10 xl:-mr-16">
          <HeroVisual />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1240px] flex-wrap gap-x-8 gap-y-3 px-4 py-5 font-mono text-[11px] uppercase tracking-[0.12em] text-mist sm:px-6 lg:px-8">
          <span>For T-cell engagers & CAR-T</span>
          <span aria-hidden="true" className="text-teal">•</span>
          <span>Standard multicolour flow cytometry</span>
          <span aria-hidden="true" className="text-teal">•</span>
          <a href={PUBLICATION_URL} target="_blank" rel="noreferrer" className="text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-paper">
            Peer-reviewed method · Nature Methods 2025
          </a>
        </div>
      </div>
    </section>
  );
}

function Deliverables() {
  return (
    <section id="deliverables" aria-labelledby="deliverables-title" className="on-paper bg-paper text-ink">
      <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className={`${KICKER} text-teal-deep`}>Cytometry in. Insight out.</p>
            <h2 id="deliverables-title" className="mt-5 text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
              From high-plex measurements to biological insight.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
              One cytometry study connects cell identity, cell state and physical engagement with the comparison your team needs.
            </p>
          </div>
          <CytometryHero />
        </div>

        <div className="mt-9"><AcquisitionStrip /></div>

        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {DELIVERABLES.map((item) => (
            <li key={item.title} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-ink/12 bg-white/70">
              <div className="bg-ink-2 px-3 py-4"><item.visual /></div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-2xl font-medium tracking-tight">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{item.text}</p>
                <p className="mt-auto pt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-[11px] leading-relaxed text-ink/55">
          UMAP: <Link href="/case-studies" className="underline underline-offset-2 hover:text-ink">IBD case study</Link>, 71,662 sketched cells; colours adapted for this page.
          {" "}The network and cohort comparison share illustrative values, not results from this UMAP. Your report is based on your study data and controls.
        </p>
      </div>
    </section>
  );
}

function Pilot() {
  return (
    <section id="pilot" aria-labelledby="pilot-title" className="border-t border-line bg-ink-2">
      <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className={`${KICKER} text-teal`}>The feasibility pilot</p>
            <h2 id="pilot-title" className="mt-5 text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
              Start with one decision-critical question.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-mist">
              We first establish whether the sample, controls and acquisition plan can support a useful interaction
              comparison. If the fit is right, we define a focused pilot with your team.
            </p>
            <a href="#contact" className={`${CTA_PRIMARY} mt-8`}>
              Check project feasibility
            </a>
          </div>

          <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
            {PILOT_STEPS.map((step, index) => (
              <li key={step.title} className="bg-ink p-6 sm:p-7">
                <p className="font-mono text-xs text-teal">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-6 text-xl font-medium">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-mist">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Applications() {
  return (
    <section id="applications" aria-labelledby="applications-title" className="border-t border-line bg-ink">
      <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className={`${KICKER} text-violet lg:col-span-3`}>Where it fits</p>
          <div className="lg:col-span-8">
            <h2 id="applications-title" className="text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
              Built for questions where engagement is the mechanism.
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-3">
          {APPLICATIONS.map((application) => (
            <article key={application.title} className="bg-ink-2 p-7">
              <h3 className="text-2xl font-medium tracking-tight">{application.title}</h3>
              <p className={`${KICKER} mt-7 text-mist`}>Question</p>
              <p className="mt-2 text-[15px] leading-relaxed text-paper">{application.question}</p>
              <p className={`${KICKER} mt-6 text-mist`}>Decision value</p>
              <p className="mt-2 text-[15px] leading-relaxed text-paper">{application.decision}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Evidence() {
  return (
    <section id="evidence" aria-labelledby="evidence-title" className="on-paper bg-paper text-ink">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-28">
        <div className="lg:col-span-5">
          <p className={`${KICKER} text-teal-deep`}>High-plex by design</p>
          <h2 id="evidence-title" className="mt-5 text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
            Many markers. Deep cell profiles. One connected picture.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            A 40-plex panel measures a broad set of protein markers in the same sample. Resolve immune-cell phenotypes
            and functional states, then map physical interactions between immune lineages.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Platform attributes">
            {["Highly scalable", "High throughput", "High precision"].map((attribute) => (
              <li
                key={attribute}
                className="rounded-full border border-ink/15 bg-white/60 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/70"
              >
                {attribute}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/science"
              className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-base text-paper transition-colors hover:bg-ink-3"
            >
              Explore the science
            </Link>
            <a
              href={PUBLICATION_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-ink/20 px-6 text-base text-ink transition-colors hover:border-ink"
            >
              Read the publication<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <HighPlexReadout id="home-highplex" />
          <div className="mt-4 rounded-2xl border border-ink bg-ink px-6 py-5 text-paper sm:flex sm:items-baseline sm:gap-5 sm:px-7">
            <p className="text-3xl font-medium tracking-tight text-teal tabular-nums">&gt;400k</p>
            <p className="mt-1 text-[14px] leading-relaxed text-mist sm:mt-0">
              interacting cells mapped in a single published experiment
            </p>
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-ink/50">
            High-dimensional panels profile cellular states; interacting partners are assigned at the validated immune-lineage
            level. 100M+ cell events are addressable across high-scale study designs; exact event yield depends on sample,
            controls and acquisition design.
          </p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line bg-ink">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-28">
        <div className="lg:col-span-5">
          <p className={`${KICKER} text-teal`}>Feasibility assessment</p>
          <h2 id="contact-title" className="mt-5 text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
            See whether InterAcTec fits your program.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-mist">
            Share the modality, cell system, available data and decision you are working toward. We will assess whether a
            focused interaction pilot is technically suitable.
          </p>
          <ul className="mt-9 space-y-4 border-t border-line pt-7 text-[15px] text-mist">
            {[
              "T-cell engagers, CAR-T therapies and other cell-bridging modalities",
              "New studies or compatible existing flow-cytometry datasets",
              "A focused first conversation — not a generic sales call",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm email={CONTACT_EMAIL} />
        </div>
      </div>
    </section>
  );
}
