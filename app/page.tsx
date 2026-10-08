import type { Metadata } from "next";
import Link from "next/link";
import HeroVisual from "@/components/site/HeroVisual";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { ContactForm } from "@/components/site/forms";
import { CONTACT_EMAIL } from "@/lib/legal";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Cell-cell engagement analysis for drug discovery",
  description:
    "Compare T-cell engager and CAR-T candidates with a scoped flow-cytometry interaction study and a decision-ready report.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Cell-cell engagement analysis for drug discovery | InterAcTec",
    description:
      "Interaction maps, candidate comparisons and decision-ready reports from new or existing flow-cytometry data.",
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
    title: "Interaction map",
    text: "See which cell-type pairs engage and how frequently those interactions occur in each condition.",
    detail: "Cell-type pairs · interaction frequencies",
  },
  {
    title: "Candidate comparison",
    text: "Compare candidates, formats, concentrations, controls or time points in one consistent readout.",
    detail: "Conditions · controls · time points",
  },
  {
    title: "Decision-ready report",
    text: "Receive clear plots, scientific interpretation, limitations and implications for the next experiment.",
    detail: "Visuals · interpretation · next steps",
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
    name: "InterAcTec",
    email: CONTACT_EMAIL,
    url: getSiteUrl().origin,
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "InterAcTec cell-cell engagement pilot",
    provider: { "@type": "Organization", name: "InterAcTec" },
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
          <p className={`${KICKER} text-teal`}>Cell-cell engagement pilot</p>
          <h1
            id="hero-title"
            className="mt-5 text-[2.55rem] font-medium leading-[1.03] tracking-[-0.035em] text-paper sm:text-6xl lg:text-[clamp(3.15rem,5vw,4.2rem)]"
          >
            Compare candidates by the <span className="text-teal">cell interactions</span> they create.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl">
            We scope a flow-cytometry interaction study and deliver an interaction map, a side-by-side candidate
            comparison and a concise decision report.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className={CTA_PRIMARY}>
              Check project feasibility
            </a>
            <Link href="/case-studies" className={CTA_SECONDARY}>
              View case-study reports
            </Link>
          </div>

          <p className="mt-5 max-w-2xl border-l-2 border-teal pl-4 text-[15px] leading-relaxed text-paper">
            See which cells engage, how often and how that changes by candidate or condition before prioritizing follow-up
            experiments.
          </p>

          <dl className="mt-9 grid max-w-2xl gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            <div className="bg-ink-2 p-5">
              <dt className={`${KICKER} text-teal`}>You bring</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-mist">
                The question, candidate conditions, cells and controls — or compatible existing FCS data.
              </dd>
            </div>
            <div className="bg-ink-2 p-5">
              <dt className={`${KICKER} text-violet`}>You receive</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-mist">
                An interaction map, comparative analysis and an interpreted decision report.
              </dd>
            </div>
          </dl>
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
        <div className="grid gap-6 lg:grid-cols-12">
          <p className={`${KICKER} text-teal-deep lg:col-span-3`}>What you get</p>
          <div className="lg:col-span-8">
            <h2 id="deliverables-title" className="text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
              A concrete output for a concrete decision.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
              The pilot is designed around the comparison your team needs to make — not around producing another generic
              assay endpoint.
            </p>
          </div>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/12 bg-ink/12 md:grid-cols-3">
          {DELIVERABLES.map((item, index) => (
            <li key={item.title} className="flex flex-col bg-white/70 p-7 sm:p-8">
              <p className="font-mono text-xs text-teal-deep">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-6 text-2xl font-medium tracking-tight">{item.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink/70">{item.text}</p>
              <p className="mt-auto pt-8 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/50">{item.detail}</p>
            </li>
          ))}
        </ol>
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
          <p className={`${KICKER} text-teal-deep`}>Immunotherapy-scale resolution</p>
          <h2 id="evidence-title" className="mt-5 text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
            Deep immune phenotyping with lineage-resolved interaction maps.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Designed for high-dimensional studies of T-cell engagers and cell therapies across candidates, doses, donors
            and time points — with the cellular depth to resolve both intended engagement and broader immune context.
          </p>
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
          <dl className="grid gap-px overflow-hidden rounded-t-2xl border border-b-0 border-ink/12 bg-ink/12 sm:grid-cols-2">
            {[
              ["40-plex", "full-spectrum panels for deep immune phenotyping"],
              ["200+", "cell phenotypes and functional states profiled by panel design"],
              [
                "Lineage-level",
                "interaction assignment across CD4 T, CD8 T, B, NK, classical and nonclassical monocytes, cDC and pDC",
              ],
              ["100M+", "cell events addressable across high-scale study designs"],
            ].map(([value, label]) => (
              <div key={label} className="min-h-44 bg-white/70 p-6 sm:p-7">
                <dt className="text-4xl font-medium tracking-tight text-teal-deep tabular-nums">{value}</dt>
                <dd className="mt-3 text-[14px] leading-relaxed text-ink/65">{label}</dd>
              </div>
            ))}
          </dl>
          <div className="rounded-b-2xl border border-ink bg-ink px-6 py-5 text-paper sm:flex sm:items-baseline sm:gap-5 sm:px-7">
            <p className="text-3xl font-medium tracking-tight text-teal tabular-nums">414,564</p>
            <p className="mt-1 text-[14px] leading-relaxed text-mist sm:mt-0">
              interacting cells mapped in a single published experiment
            </p>
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-ink/50">
            High-dimensional panels profile cellular states; interacting partners are assigned at the validated immune-lineage
            level. Exact resolution and event yield depend on panel, sample, controls and acquisition design.
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
