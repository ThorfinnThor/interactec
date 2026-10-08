import type { Metadata } from "next";
import Link from "next/link";
import { ScienceDiagram } from "@/components/site/Diagrams";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import StoryScroll, { type StoryChapter } from "@/components/site/StoryScroll";

export const metadata: Metadata = {
  title: "Science and evidence",
  description:
    "The measurement principle, workflow and peer-reviewed evidence behind InterAcTec cell-cell interaction mapping.",
  alternates: { canonical: "/science" },
  openGraph: { url: "/science", title: "Science and evidence | InterAcTec" },
};

const PUBLICATION_URL = "https://www.nature.com/articles/s41592-025-02744-w";
const KICKER = "font-mono text-xs uppercase tracking-[0.16em]";

const CHAPTERS: StoryChapter[] = [
  {
    title: "Two populations. One question.",
    body: "Effector and target cells share the sample. The question is which of them actually engage — and how that changes under treatment.",
  },
  {
    title: "Physical engagement becomes the signal.",
    body: "The readout focuses on physically interacting pairs and on how their frequency shifts between defined conditions.",
  },
  {
    title: "Every engaged pair becomes an event.",
    body: "A conjugate passes the cytometer as one event carrying both marker sets. Scatter signature and marker co-expression make it countable and classifiable.",
  },
  {
    title: "Conditions become comparable.",
    body: "Interaction frequencies per cell-type pair line up across compounds, concentrations, donors or time points.",
  },
];

const WORKFLOW = [
  {
    title: "Prepare",
    text: "Use a compatible cell suspension such as a co-culture, PBMC sample or other liquid sample.",
  },
  {
    title: "Acquire",
    text: "Run multicolour flow cytometry with a suitable panel, controls and the framework’s acquisition guidelines.",
  },
  {
    title: "Map",
    text: "Identify interacting cells through scatter characteristics and mutually exclusive lineage-marker combinations.",
  },
  {
    title: "Compare",
    text: "Compare interaction frequencies per cell-type pair across the study’s defined conditions.",
  },
];

const DEMONSTRATIONS = [
  {
    title: "T-cell engager",
    text: "Blinatumomab-induced T cell–B cell engagement was measured over time in PBMCs and patient bone marrow.",
  },
  {
    title: "CAR-T cells",
    text: "Anti-CD19 CAR-T cell engagement with B-cell targets was resolved alongside other interacting pairs.",
  },
  {
    title: "Immune responses",
    text: "Antigen-specific T cell–APC engagement and signalling inside interacting T cells were demonstrated.",
  },
];

export default function SciencePage() {
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
        <header className="border-b border-line">
          <div className="mx-auto max-w-[1240px] px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
            <p className={`${KICKER} text-teal`}>Science and evidence</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
              Measure the cellular engagement behind the endpoint.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">
              Interact-omics maps physically interacting cells from multicolour flow-cytometry data. InterAcTec applies
              that measurement principle to defined therapeutic and translational questions.
            </p>
          </div>
        </header>

        <Measurement />
        <Method />
        <Workflow />
        <Evidence />
      </main>
      <SiteFooter />
    </div>
  );
}

function Measurement() {
  return (
    <section aria-labelledby="measurement-title" className="border-b border-line bg-ink-2">
      <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className={`${KICKER} text-teal`}>What is measured</p>
            <h2 id="measurement-title" className="mt-5 text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
              Cell pairs that pass the cytometer together.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-mist lg:col-span-6 lg:col-start-7 lg:pt-10">
            <p>
              Interacting cells can pass the laser as one event carrying the marker sets of both cell types. Conventional
              workflows often exclude these events as doublets.
            </p>
            <p>
              The framework combines scatter characteristics with co-expression of mutually exclusive lineage markers to
              identify and assign those events to a cell-type pair. Acquisition must follow suitable guidelines and
              controls; not every existing flow-cytometry dataset is compatible.
            </p>
          </div>
        </div>
        <div className="mt-14">
          <ScienceDiagram />
        </div>
      </div>
    </section>
  );
}

function Method() {
  return (
    <section aria-labelledby="method-title" className="border-b border-line">
      <div className="mx-auto max-w-[1240px] px-4 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <p className={`${KICKER} text-teal`}>Measurement principle</p>
        <h2 id="method-title" className="mt-5 max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
          From physical engagement to a comparative readout.
        </h2>
      </div>
      <div className="mx-auto max-w-[1240px] px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24">
        <StoryScroll chapters={CHAPTERS} />
      </div>
    </section>
  );
}

function Workflow() {
  return (
    <section aria-labelledby="workflow-title" className="on-paper bg-paper text-ink">
      <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className={`${KICKER} text-teal-deep lg:col-span-3`}>Workflow</p>
          <h2 id="workflow-title" className="text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl lg:col-span-8">
            A new readout on familiar infrastructure.
          </h2>
        </div>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW.map((step, index) => (
            <li key={step.title} className="bg-white/70 p-7">
              <p className="font-mono text-xs text-teal-deep">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-6 text-2xl font-medium">{step.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Evidence() {
  return (
    <section aria-labelledby="science-evidence-title" className="border-t border-line bg-ink-2">
      <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className={`${KICKER} text-violet lg:col-span-3`}>Published evidence</p>
          <div className="lg:col-span-8">
            <h2 id="science-evidence-title" className="text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
              Demonstrated across therapeutic and immune settings.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">
              Vonficht D, et al. Ultra-high-scale cytometry-based cellular interaction mapping. Nature Methods 22,
              1887–1899 (2025).
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {DEMONSTRATIONS.map((item) => (
            <article key={item.title} className="bg-ink p-7">
              <h3 className="text-2xl font-medium">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-mist">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={PUBLICATION_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full bg-teal px-6 text-base font-medium text-ink transition-colors hover:bg-paper"
          >
            Read the publication<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link
            href="/case-studies"
            className="inline-flex h-12 items-center justify-center rounded-full border border-paper/30 px-6 text-base text-paper transition-colors hover:border-paper"
          >
            View translational case studies
          </Link>
        </div>
      </div>
    </section>
  );
}
