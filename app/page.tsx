import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import { getSiteUrl } from "@/lib/site-url";
import HeroVisual from "@/components/site/HeroVisual";
import StoryScroll, { type StoryChapter } from "@/components/site/StoryScroll";
import { IntegrationDiagram, MechanismDiagram, ScienceDiagram } from "@/components/site/Diagrams";
import { AtAGlance, BarCompare, BigStat, MethodMatrix, SourceNote } from "@/components/site/Comparison";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

const PUBLICATION_URL = "https://www.nature.com/articles/s41592-025-02744-w";
const CONTACT_EMAIL = "hello@interactec.bio";
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Application discussion - InterAcTec")}`;
const CITATION = "Vonficht D, et al. Ultra-high-scale cytometry-based cellular interaction mapping. Nature Methods 22, 1887–1899 (2025).";

const CLAIMS = [
  "Faster than imaging.",
  "More mechanistic than endpoint cytotoxicity.",
  "Scalable on existing flow-cytometry infrastructure.",
];

const CHAPTERS: StoryChapter[] = [
  {
    title: "Two populations. One question.",
    body: "Effector and target cells share the sample. What matters for a candidate is which of them actually engage — and how that changes under treatment.",
  },
  {
    title: "Proximity is not engagement.",
    body: "Cells can sit side by side by chance. The readout focuses on physically interacting pairs and on how their frequency shifts between conditions.",
  },
  {
    title: "Every engaged pair becomes an event.",
    body: "A conjugate passes the cytometer as one event carrying both marker sets. Scatter signature and marker co-expression turn it into a countable, classifiable data point.",
  },
  {
    title: "Conditions become comparable.",
    body: "Interaction frequencies per cell-type pair line up across compounds, concentrations, donors or time points — a readout you can rank and decide on.",
  },
];

const CTA_PRIMARY =
  "inline-flex h-12 items-center justify-center rounded-full bg-teal px-6 text-base font-medium text-ink transition-colors hover:bg-paper";
const CTA_SECONDARY_DARK =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-paper/30 px-6 text-base text-paper transition-colors hover:border-paper";
const KICKER = "font-mono text-xs uppercase tracking-[0.16em]";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "InterAcTec",
  email: CONTACT_EMAIL,
  url: getSiteUrl().origin,
};

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
        <Science />
        <Platform />
        <Advantages />
        <Workflow />
        <Applications />
        <Translational />
        <Evidence />
        <Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}

/* ---------------------------------- A. Hero ---------------------------------- */

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-12 lg:gap-6 lg:px-8 lg:pb-20 lg:pt-8">
        <div className="lg:col-span-7">
          <h1
            id="hero-title"
            className="text-[2.35rem] font-medium leading-[1.06] tracking-[-0.03em] text-paper sm:text-6xl lg:text-[clamp(3rem,8vh,3.9rem)] xl:text-[clamp(3rem,8.5vh,4.35rem)]"
          >
            We turn <span className="text-teal">functional <span className="whitespace-nowrap">cell-cell</span> engagement</span>{" "}
            into a{" "}
            <span className="underline decoration-teal decoration-2 underline-offset-[0.16em]">
              scalable <span className="whitespace-nowrap">drug-discovery</span> readout
            </span>
            .
          </h1>

          <ul className="mt-9 max-w-xl border-t border-line" aria-label="Why InterAcTec">
            {CLAIMS.map((c, i) => (
              <li key={c} className="flex items-baseline gap-5 border-b border-line py-3.5">
                <span className="font-mono text-xs text-teal">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg text-paper sm:text-xl">{c}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={MAILTO} className={CTA_PRIMARY}>
              Discuss your application
            </a>
            <a href="#platform" className={CTA_SECONDARY_DARK}>
              Explore the platform
            </a>
          </div>

          <p className="mt-8 text-[15px] text-mist">
            Built on Interact-omics, peer-reviewed in{" "}
            <a href={PUBLICATION_URL} target="_blank" rel="noreferrer" className="text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-paper">
              Nature Methods (2025)
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
        </div>

        <div className="lg:col-span-5 lg:-mr-10 xl:-mr-20">
          <HeroVisual />
        </div>
      </div>

      <a
        href="#science"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-mist hover:text-paper lg:flex"
      >
        <span className="h-8 w-px bg-mist/50" aria-hidden="true" />
        Scroll to see how it works
      </a>
    </section>
  );
}

/* ------------------------------ B. The question ------------------------------ */

function Science() {
  return (
    <section id="science" aria-labelledby="science-title" className="border-t border-line bg-ink-2">
      <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className={`${KICKER} text-teal`}>The question</p>
            <h2 id="science-title" className="mt-5 text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
              Bring functional <span className="whitespace-nowrap">cell-cell</span> engagement into focus.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-mist lg:col-span-6 lg:col-start-7 lg:pt-12">
            <p>
              Many modern therapies work by bringing cells together: T-cell engagers bridge T cells and target cells, CAR T
              cells bind their targets, antigen-presenting cells instruct T cells. For a candidate, the decisive question is
              easy to ask and hard to measure at scale —{" "}
              <span className="text-paper">which cells actually engage, how often, and how does that change under treatment?</span>
            </p>
            <p>
              Imaging shows contacts in fine detail, usually for fewer conditions. Endpoint assays report the outcome, not
              the interaction that produced it. InterAcTec reads out the interaction itself — from a signal that standard
              flow cytometry normally throws away.
            </p>
          </div>
        </div>
        <div className="mt-16">
          <ScienceDiagram />
        </div>
      </div>
    </section>
  );
}

/* --------------------------- C. Story (the platform) --------------------------- */

function Platform() {
  return (
    <section id="platform" aria-labelledby="platform-title" className="relative border-t border-line">
      <div className="mx-auto max-w-[1240px] px-4 pt-24 sm:px-6 lg:px-8 lg:pt-32">
        <p className={`${KICKER} text-teal`}>The platform</p>
        <h2 id="platform-title" className="mt-5 max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
          From cell-cell engagement to a discovery readout.
        </h2>
      </div>
      <div className="mx-auto max-w-[1240px] px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24">
        <StoryScroll chapters={CHAPTERS} />
      </div>
    </section>
  );
}

/* ------------------------ D. The three differentiators ------------------------ */

function Advantages() {
  return (
    <>
      {/* value proposition at a glance */}
      <section id="advantages" aria-labelledby="advantages-title" className="border-t border-line bg-ink-2">
        <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-12">
            <p className={`${KICKER} text-teal lg:col-span-3`}>Why InterAcTec</p>
            <div className="lg:col-span-8">
              <h2 id="advantages-title" className="text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
                More interactions, more cell types, less effort.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">
                How the readout compares with imaging, sequencing-based interaction mapping and endpoint assays — in numbers
                from the published record.
              </p>
            </div>
          </div>
          <div className="mt-14">
            <AtAGlance />
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-mist">
            Figures compare published instrument specifications and reported experiment sizes; they are not a head-to-head
            benchmark. Details and sources below.
          </p>
        </div>
      </section>

      <div className="on-paper bg-paper text-ink">
        {/* 01 */}
        <article className="mx-auto grid max-w-[1240px] gap-12 px-4 py-24 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-32">
          <div className="lg:col-span-5">
            <p className={`${KICKER} text-teal-deep`}>01</p>
            <h3 className="mt-4 text-4xl font-medium leading-[1.05] tracking-tight sm:text-[3.4rem]">Faster than imaging.</h3>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">
              Imaging captures, segments and classifies every contact. The interaction readout reads engaged pairs as events
              in a standard flow run — no image processing, and far more cells per second.
            </p>
            <div className="mt-10">
              <BigStat value="7–17×" label="higher maximum acquisition rate than imaging flow cytometry" />
            </div>
          </div>
          <div className="self-center lg:col-span-6 lg:col-start-7">
            <BarCompare
              title="Maximum acquisition rate"
              unit="cells per second"
              bars={[
                { label: "Full-spectrum flow cytometer (InterAcTec readout)", value: 35000, display: "35,000", ours: true },
                { label: "Imaging flow cytometer, 20× objective", value: 5000, display: "5,000" },
                { label: "Imaging flow cytometer, 40× objective", value: 2000, display: "2,000" },
              ]}
            />
            <SourceNote
              keys={["aurora", "imagestream"]}
              note="Manufacturer maximum rates; practical rates depend on sample and panel. Microscopy-based contact analysis is slower still."
            />
          </div>
        </article>

        {/* 02 */}
        <article className="border-t border-ink/10 bg-paper-2">
          <div className="mx-auto grid max-w-[1240px] gap-12 px-4 py-24 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-32">
            <div className="order-2 self-center lg:order-1 lg:col-span-7">
              <MechanismDiagram />
            </div>
            <div className="order-1 lg:order-2 lg:col-span-4 lg:col-start-9">
              <p className={`${KICKER} text-teal-deep`}>02</p>
              <h3 className="mt-4 text-4xl font-medium leading-[1.05] tracking-tight sm:text-[3.4rem]">
                More mechanistic than endpoint cytotoxicity.
              </h3>
              <p className="mt-6 text-lg leading-relaxed text-ink/75">
                A kill assay tells you whether target cells died. The interaction readout shows who engaged whom, how often
                and when — including T-cell receptor signalling (phospho-CD247) inside the engaged cells.
              </p>
              <div className="mt-10">
                <BigStat value="52 vs 1" label="cell-type pairs resolved in one experiment, versus one outcome per well" />
              </div>
              <SourceNote keys={["nm25"]} note="52 pairs: LCMV infection experiment." />
            </div>
          </div>
        </article>

        {/* 03 */}
        <article className="border-t border-ink/10">
          <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className={`${KICKER} text-teal-deep`}>03</p>
                <h3 className="mt-4 text-4xl font-medium leading-[1.05] tracking-tight sm:text-[3.4rem]">
                  Scalable on existing flow-cytometry infrastructure.
                </h3>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">
                  No sorter, no sequencing, no reporter mice. The readout runs on multicolour fluorescence flow cytometers —
                  at costs the authors put orders of magnitude below single-cell genomics.
                </p>
                <div className="mt-10">
                  <BigStat value="~170×" label="more interacting cells in one experiment than in a published PIC-seq experiment" />
                </div>
              </div>
              <div className="self-center lg:col-span-6 lg:col-start-7">
                <BarCompare
                  title="Interacting cells analysed in one experiment"
                  unit="cells"
                  bars={[
                    { label: "Interact-omics, LCMV infection time course", value: 414564, display: "414,564", ours: true },
                    { label: "PIC-seq, T cell–dendritic cell co-culture", value: 2389, display: "2,389" },
                  ]}
                />
                <SourceNote keys={["nm25", "picseq"]} note="Experiment sizes as reported in each publication." />
              </div>
            </div>
            <div className="mt-16">
              <IntegrationDiagram />
            </div>
          </div>
        </article>

        {/* method matrix */}
        <article className="border-t border-ink/10">
          <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
            <div className="grid gap-6 lg:grid-cols-12">
              <p className={`${KICKER} text-teal-deep lg:col-span-3`}>Side by side</p>
              <div className="lg:col-span-8">
                <h3 className="text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">
                  Where each method stands.
                </h3>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/75">
                  Every approach has its place. InterAcTec is built for the questions that need scale, breadth and existing
                  infrastructure at once.
                </p>
              </div>
            </div>
            <div className="mt-12">
              <MethodMatrix />
            </div>
            <SourceNote keys={["nm25", "picseq", "imagestream"]} note="Summary based on the cited publications and specifications." />
          </div>
        </article>
      </div>
    </>
  );
}

/* ------------------------------- E. Workflow ------------------------------- */

const STEPS = [
  {
    t: "Prepare",
    d: "Any cell suspension compatible with flow cytometry — co-cultures, PBMCs, bone marrow or other liquid samples.",
  },
  {
    t: "Acquire",
    d: "Multicolour acquisition on a fluorescence flow cytometer, following the framework’s acquisition guidelines.",
  },
  {
    t: "Map",
    d: "Interacting cells are identified by scatter ratio and co-expression of mutually exclusive markers, and assigned to a cell-type pair.",
  },
  {
    t: "Compare",
    d: "Interaction frequencies per cell-type pair are compared across conditions, donors or time points.",
  },
];

function Workflow() {
  return (
    <section id="workflow" aria-labelledby="workflow-title" className="on-paper border-t border-ink/10 bg-paper text-ink">
      <div className="mx-auto max-w-[1240px] px-4 pb-24 pt-4 sm:px-6 lg:px-8 lg:pb-32">
        <div className="grid gap-6 border-t border-ink/15 pt-16 lg:grid-cols-12">
          <p className={`${KICKER} text-teal-deep lg:col-span-3`}>How it fits</p>
          <h2 id="workflow-title" className="text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl lg:col-span-8">
            A new readout. A familiar workflow.
          </h2>
        </div>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.t} className="bg-paper p-7">
              <p className="font-mono text-xs text-teal-deep">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-6 text-2xl font-medium">{s.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-[15px] text-ink/65">
          Panel design, controls and analysis scope are defined together for each application.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ F. Applications ------------------------------ */

const APPLICATIONS = [
  {
    t: "T-cell engagers & bispecific antibodies",
    q: "Does the molecule bridge T cells and target cells — and how efficiently over time?",
    r: "Frequency of T cell–target cell interacting pairs versus control, per time point.",
    v: "Compare candidates, formats or concentrations on engagement itself.",
    demo: "Blinatumomab (CD3×CD19) in PBMCs and patient bone marrow",
  },
  {
    t: "CAR T cells",
    q: "Do CAR T cells engage their intended targets, and which other cells do they contact?",
    r: "CAR T–target pairs alongside all other interacting cell-type pairs in the sample.",
    v: "Compare constructs or donors on engagement before downstream functional assays.",
    demo: "Anti-CD19 CAR T cells with B-cell targets",
  },
  {
    t: "Antigen-specific T-cell responses",
    q: "Are T cells engaging antigen-presenting cells in response to a stimulus?",
    r: "T cell–APC interaction frequencies across stimulated and control conditions.",
    v: "Read out immune activation at the level of the cellular contact.",
    demo: "OT-II T cells with splenocytes; CytoStim-stimulated PBMCs",
  },
];

function Applications() {
  return (
    <section id="applications" aria-labelledby="applications-title" className="border-t border-line">
      <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className={`${KICKER} text-teal lg:col-span-3`}>Applications</p>
          <div className="lg:col-span-8">
            <h2 id="applications-title" className="text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
              Where engagement is the mechanism.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">
              Each application below was demonstrated in the peer-reviewed study. We scope new applications together with
              you.
            </p>
          </div>
        </div>

        <div className="mt-16 divide-y divide-line border-y border-line">
          {APPLICATIONS.map((a, i) => (
            <article key={a.t} className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-4">
                <p className="font-mono text-xs text-teal">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-2xl font-medium leading-tight">{a.t}</h3>
              </div>
              <dl className="grid gap-6 sm:grid-cols-3 lg:col-span-8">
                {[
                  ["Research question", a.q],
                  ["Readout", a.r],
                  ["Decision value", a.v],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-mist">{k}</dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-paper">{v}</dd>
                  </div>
                ))}
                <p className="text-[13px] text-mist sm:col-span-3">
                  <span className="font-mono uppercase tracking-[0.12em]">Demonstrated · </span>
                  {a.demo} (Nature Methods, 2025)
                </p>
              </dl>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <p className="text-lg text-paper">Working on a different modality?</p>
          <a href={MAILTO} className="text-lg text-teal underline decoration-teal/40 underline-offset-4 hover:decoration-teal">
            Discuss your application
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------- G1. Translational (secondary section) ------------------- */

function Translational() {
  const items = [
    {
      k: "B-ALL · 42 patients",
      t: "Engagement tracked treatment response",
      d: "In bone-marrow samples from paediatric patients treated with blinatumomab, drug-induced T cell–B cell interactions were stronger in good responders, and high T cell–myeloid interactions at baseline were associated with therapy failure.",
      src: "Nature Methods, 2025",
    },
    {
      k: "IBD · 31 donors",
      t: "Interaction landscape in blood",
      d: "PBMCs from healthy controls (n=11), ulcerative colitis (n=9) and Crohn’s disease (n=11): 29.9 million cells analysed, 362,102 interacting cells, with disease-specific differences in selected interaction pairs.",
      src: "InterAcTec case study",
      href: "/case-studies",
    },
    {
      k: "JIA · re-analysis",
      t: "Insights from an existing dataset",
      d: "Publicly available spectral cytometry data from juvenile idiopathic arthritis re-analysed for interactions: 7.8 million cells, comparing healthy donors, inactive and active disease, blood and synovial fluid.",
      src: "InterAcTec case study",
      href: "/case-studies",
    },
  ];
  return (
    <section id="translational" aria-labelledby="translational-title" className="border-t border-line bg-ink-2">
      <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className={`${KICKER} text-violet lg:col-span-3`}>Beyond discovery</p>
          <div className="lg:col-span-8">
            <h2 id="translational-title" className="text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">
              The same readout in patient samples.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">
              Interaction signatures can be measured in clinical material and mined from existing cytometry data — for
              translational research and biomarker exploration. These are research findings, not a validated diagnostic.
            </p>
          </div>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {items.map((it) => (
            <article key={it.k} className="flex flex-col bg-ink-2 p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-violet">{it.k}</p>
              <h3 className="mt-4 text-xl font-medium leading-snug">{it.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-mist">{it.d}</p>
              <p className="mt-auto pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-mist">
                {it.href ? (
                  <Link href={it.href} className="text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-paper">
                    {it.src} — download
                  </Link>
                ) : (
                  <>Source · {it.src}</>
                )}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ G2. Evidence ------------------------------ */

const FIELDS = [
  {
    field: "Oncology",
    stat: "42",
    statLabel: "patients with B-ALL",
    points: [
      "T-cell engager (blinatumomab) and anti-CD19 CAR T engagement of B cells",
      "Drug-induced T–B interactions were stronger in good responders",
    ],
    source: "Nature Methods, 2025",
  },
  {
    field: "Immunology",
    stat: "All",
    statLabel: "immune cell types in one panel",
    points: [
      "Antigen-specific T cell–APC engagement",
      "TCR signalling (phospho-CD247) measured inside interacting T cells",
    ],
    source: "Nature Methods, 2025",
  },
  {
    field: "Autoimmunity",
    stat: "37.8 M",
    statLabel: "cells across two case studies",
    points: [
      "Juvenile idiopathic arthritis: blood vs synovial fluid, active vs inactive disease",
      "Inflammatory bowel disease: ulcerative colitis and Crohn’s disease vs controls",
    ],
    source: "InterAcTec case studies",
    href: "/case-studies",
  },
  {
    field: "Infectious disease",
    stat: "~415,000",
    statLabel: "interactions, 52 cell-type pairs",
    points: [
      "Viral infection (LCMV) time course across lymph node, spleen and bone marrow",
      "34.4 million cells in 36 samples",
    ],
    source: "Nature Methods, 2025",
  },
];

function Evidence() {
  return (
    <section id="evidence" aria-labelledby="evidence-title" className="on-paper bg-paper text-ink">
      <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className={`${KICKER} text-teal-deep`}>Evidence</p>
            <h2 id="evidence-title" className="mt-5 text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
              A peer-reviewed foundation.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/75">
              Interact-omics maps cellular landscapes and interactions across immune cell types from cytometry data. The
              framework and its analysis toolkit, PICtR, are described and validated — including against imaging flow
              cytometry — in Nature Methods.
            </p>
            <blockquote className="mt-8 border-l-2 border-teal-deep pl-5 text-[15px] leading-relaxed text-ink/80">
              {CITATION}
            </blockquote>
            <a
              href={PUBLICATION_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex h-12 items-center rounded-full bg-ink px-6 text-base text-paper transition-colors hover:bg-ink-3"
            >
              Read the publication<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <div className="min-w-0 lg:col-span-7 lg:col-start-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">Demonstrated across four fields</p>
            <ul className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-ink/12 bg-ink/12 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <li key={f.field} className="flex flex-col bg-white/70 p-6 sm:p-7">
                  <h3 className="text-2xl font-medium tracking-tight">{f.field}</h3>
                  <p className="mt-4 flex flex-col">
                    <span className="whitespace-nowrap text-4xl font-medium tracking-tight text-teal-deep tabular-nums">{f.stat}</span>
                    <span className="mt-1 text-[14px] text-ink/65">{f.statLabel}</span>
                  </p>
                  <ul className="mt-4 space-y-2 text-[15px] leading-snug text-ink/80">
                    {f.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5">
                        <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-teal-deep" aria-hidden="true" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55">
                    {f.href ? (
                      <Link href={f.href} className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
                        {f.source} — download
                      </Link>
                    ) : (
                      <>Source · {f.source}</>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- H. Contact ------------------------------- */

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden">
      <div className="relative mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
        <p className={`${KICKER} text-teal`}>Contact</p>
        <h2 id="contact-title" className="mt-5 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
          Let’s discuss your discovery workflow.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
          Tell us about your modality, your cells and the decision you need to make. We’ll assess together whether an
          interaction readout fits.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href={MAILTO} className={CTA_PRIMARY}>
            Discuss your application
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="px-2 text-lg text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-paper">
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-mist">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-4 py-8 text-[14px] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} InterAcTec</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/case-studies" className="hover:text-paper">
            Case studies
          </Link>
          <Link href="/privacy" className="hover:text-paper">
            Privacy
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-paper">
            {CONTACT_EMAIL}
          </a>
        </nav>
      </div>
    </footer>
  );
}
