import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const COMPANY = "InterAcTec";
const CONTACT_EMAIL = "hello@interactec.bio"; // change
const PAPER_URL = "https://www.nature.com/articles/s41592-025-02744-w";

const ACCENT = {
  name: "Blue",
  hex: "#1D4ED8",
};

const proofChips = ["Low cost", "Highly scalable", "High precision", "Clinical-workflow ready"];

const enableCards = [
  {
    title: "Mechanism-of-action, quantified",
    desc: "See which immune populations physically interact—and how therapies reshape interaction networks.",
  },
  {
    title: "Biomarker-based patient stratification",
    desc: "Derive interaction signatures that predict responders before treatment to improve trial design and endpoints.",
  },
  {
    title: "Safety / off-target insight",
    desc: "Detect misdirected cellular engagement early to de-risk dose, target, and therapeutic design.",
  },
];

const howItWorksSteps = [
  {
    title: "Collect",
    desc: "Blood / PBMC / clinically relevant cell suspensions—compatible with clinical sampling workflows.",
  },
  {
    title: "Measure",
    desc: "Classical or full spectrum flow cytometry—high-dimensional readouts at throughput and scale.",
  },
  {
    title: "Analyze",
    desc: "AI-assisted interaction mapping with interpretable outputs for decision-making across R&D and trials.",
  },
];

const useCases = [
  {
    title: "Bispecific antibodies / CAR-T / TCR-T",
    desc: "Quantify induced interactions, kinetics, and MoA to validate mechanism and optimize design.",
  },
  {
    title: "Biomarkers & Companion Diagnostics (CDx)",
    desc: "Identify predictive signatures to tighten inclusion criteria and reduce non-responders.",
  },
  {
    title: "Clinical immunomonitoring",
    desc: "Track dose–response, durability, and safety signals with high interpretability.",
  },
  {
    title: "OOS CAR-T triage",
    desc: "Identify “still effective” out-of-spec batches to reduce losses and improve patient access.",
  },
];

const diseaseAreas = [
  { title: "Cancer", desc: "Response prediction, MoA, safety & toxicity" },
  { title: "Autoimmune disease", desc: "Interaction dynamics, target validation" },
  { title: "Inflammatory diseases", desc: "Immune ecosystem resolution" },
  { title: "Infectious diseases", desc: "System-level interaction shifts" },
];

const builtFor = [
  {
    title: "Low operational friction",
    desc: "Fits into standard cytometry-based environments and existing translational workflows.",
  },
  {
    title: "Rapid turnaround",
    desc: "Designed for decision-making timelines in R&D and clinical trials.",
  },
  {
    title: "Trial-ready deliverables",
    desc: "Structured outputs, reproducible analytics, exportable packages (PDF + data).",
  },
  {
    title: "Partner-ready",
    desc: "Works for Pharma/Biotech, CROs, and diagnostics partners.",
  },
];

function LogoMark() {
  // Clinical, minimal: one color + interaction motif.
  return (
    <div className="flex items-center gap-2">
      <svg width="34" height="34" viewBox="0 0 64 64" aria-hidden="true">
        <rect x="6" y="6" width="52" height="52" rx="16" fill="#FFFFFF" />
        <rect x="6.5" y="6.5" width="51" height="51" rx="15.5" stroke="#E2E8F0" />
        <path
          d="M20 38 C 26 28, 36 26, 44 22"
          stroke={ACCENT.hex}
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M22 20 C 30 26, 34 34, 42 42"
          stroke="#0F172A"
          strokeOpacity="0.18"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="20" cy="38" r="3.2" fill={ACCENT.hex} />
        <circle cx="34" cy="30" r="3.2" fill={ACCENT.hex} />
        <circle cx="44" cy="22" r="3.2" fill={ACCENT.hex} />
        <circle cx="42" cy="42" r="3.2" fill={ACCENT.hex} />
      </svg>
      <span className="font-semibold tracking-tight">{COMPANY}</span>
    </div>
  );
}

function SectionHeader(props: { eyebrow?: string; title: string; desc?: string }) {
  return (
    <div className="flex flex-col gap-2">
      {props.eyebrow ? (
        <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{props.eyebrow}</div>
      ) : null}
      <div className="flex items-center gap-3">
        <span
          className="h-5 w-1.5 rounded-full"
          style={{ backgroundColor: ACCENT.hex }}
          aria-hidden="true"
        />
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{props.title}</h2>
      </div>
      {props.desc ? <p className="max-w-3xl text-slate-600">{props.desc}</p> : null}
    </div>
  );
}

function AccentTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-2 h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT.hex }} aria-hidden="true" />
      <span className="text-base font-semibold text-slate-950">{children}</span>
    </div>
  );
}

function NetworkHero() {
  // One motif (interaction network) = intentional, not decorative.
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white">
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.10) 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50" />

      <div className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-950">Sample → Cytometry → Interaction Map</div>
          <Badge
            variant="outline"
            className="rounded-xl border-slate-200 bg-white text-slate-700"
          >
            Decision-ready outputs
          </Badge>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <svg className="h-44 w-full" viewBox="0 0 760 220" fill="none" aria-hidden="true">
            {/* edges */}
            <path d="M120 80 C 220 25, 320 35, 390 85" stroke="rgba(15,23,42,0.18)" strokeWidth="2.8" />
            <path d="M390 85 C 470 130, 570 130, 650 90" stroke="rgba(15,23,42,0.16)" strokeWidth="2.8" />
            <path d="M220 170 C 300 120, 420 125, 510 175" stroke="rgba(15,23,42,0.12)" strokeWidth="2.8" />
            <path d="M510 175 C 590 220, 700 185, 720 150" stroke="rgba(15,23,42,0.10)" strokeWidth="2.8" />

            {/* nodes */}
            <circle cx="120" cy="80" r="8" fill={ACCENT.hex} />
            <circle cx="390" cy="85" r="8" fill={ACCENT.hex} />
            <circle cx="650" cy="90" r="8" fill={ACCENT.hex} />
            <circle cx="220" cy="170" r="8" fill={ACCENT.hex} opacity="0.9" />
            <circle cx="510" cy="175" r="8" fill={ACCENT.hex} opacity="0.9" />
            <circle cx="720" cy="150" r="8" fill={ACCENT.hex} opacity="0.85" />

            {/* annotation */}
            <rect x="22" y="18" width="210" height="52" rx="14" fill="#F8FAFC" stroke="#E2E8F0" />
            <circle cx="44" cy="44" r="4" fill={ACCENT.hex} />
            <path d="M58 38H206" stroke="rgba(15,23,42,0.20)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M58 50H178" stroke="rgba(15,23,42,0.14)" strokeWidth="2.2" strokeLinecap="round" />
          </svg>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { k: "Interaction features", v: "Ranked, interpretable signals" },
              { k: "QC summaries", v: "Study-ready, reproducible outputs" },
              { k: "Exports", v: "PDF + data packages for teams" },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <div className="text-sm font-medium text-slate-950">{x.k}</div>
                <div className="mt-1 text-xs text-slate-600">{x.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 text-sm text-slate-600">
          Built for Pharma and Biotech: quantify cell–cell interactions, support stratification, and de-risk safety.
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="bg-white text-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2">
            <LogoMark />
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <Link href="#technology" className="hover:text-slate-950">
              Technology
            </Link>
            <Link href="#use-cases" className="hover:text-slate-950">
              Use cases
            </Link>
            <Link href="#disease-areas" className="hover:text-slate-950">
              Disease areas
            </Link>
            <Link href="#evidence" className="hover:text-slate-950">
              Evidence
            </Link>
            <Link href="/reports" className="hover:text-slate-950">
              Reports
            </Link>
            <Link href="#contact" className="hover:text-slate-950">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="hidden rounded-2xl md:inline-flex">
              <a href={PAPER_URL} target="_blank" rel="noreferrer">
                Publication
              </a>
            </Button>
            <Button
              asChild
              className="rounded-2xl text-white"
              style={{ backgroundColor: ACCENT.hex }}
            >
              <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${COMPANY} — Pilot request`)}`}>
                Request a pilot
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-12 md:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge
                className="rounded-xl text-white"
                style={{ backgroundColor: ACCENT.hex }}
              >
                Cell–cell interaction analytics
              </Badge>
              <Badge variant="outline" className="rounded-xl">
                Pharma · Biotech · Clinical translation
              </Badge>
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              Turn cell–cell interactions into actionable trial decisions.
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              {COMPANY} combines flow cytometry with bioinformatics and AI-assisted analysis to quantify cell–cell
              interactions rapidly, precisely, and cost-effectively—designed for scalable studies and clinical
              workflows. Our algorithms can also infer interaction signatures from retrospective datasets, enabling
              re-analysis of existing cohorts.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {proofChips.map((t) => (
                <span
                  key={t}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="rounded-2xl text-white"
                style={{ backgroundColor: ACCENT.hex }}
              >
                <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${COMPANY} — Pilot request`)}`}>
                  Request a pilot
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-2xl">
                <Link href="/reports">Download reports</Link>
              </Button>
              <Button asChild variant="ghost" className="rounded-2xl">
                <a href={PAPER_URL} target="_blank" rel="noreferrer">
                  Nature Methods publication →
                </a>
              </Button>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Applications: safer and more effective therapies across cancer, autoimmune, inflammatory, and infectious
              diseases.
            </p>
          </div>

          <NetworkHero />
        </div>
      </section>

      {/* Problem panel */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <SectionHeader
            eyebrow="Why this matters"
            title="The missing mechanistic layer in many programs"
            desc="Cell–cell interactions are often not captured robustly—yet they can determine efficacy and safety in modern cell and immunotherapies."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              "Low response rates and uncertain mechanism-of-action derail drug programs",
              "Toxicity and off-target effects emerge late and cost millions",
              "Trials fail endpoints without actionable stratification biomarkers",
            ].map((x) => (
              <div key={x} className="rounded-3xl border border-slate-200 bg-white p-5">
                <div className="text-sm text-slate-700">{x}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section id="technology" className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Platform"
            title="Technology"
            desc="A scalable platform that quantifies cell–cell interactions from flow cytometry and translates them into decision-ready analytics for preclinical and clinical development."
          />
          <Button asChild variant="outline" className="hidden rounded-2xl md:inline-flex">
            <a href={PAPER_URL} target="_blank" rel="noreferrer">
              Read publication
            </a>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {enableCards.map((c) => (
            <Card key={c.title} className="rounded-3xl border-slate-200">
              <CardHeader>
                <AccentTitle>{c.title}</AccentTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">{c.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works panel */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <SectionHeader
            eyebrow="Workflow"
            title="How it works"
            desc="Simple, deployable workflow—built to fit clinical translation and high-throughput programs."
          />

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {howItWorksSteps.map((s, idx) => (
              <Card key={s.title} className="rounded-3xl border-slate-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-2xl text-sm font-semibold text-white"
                      style={{ backgroundColor: ACCENT.hex }}
                    >
                      {idx + 1}
                    </div>
                    <CardTitle className="text-base">{s.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">{s.desc}</CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Interaction maps (network + cell-pair summaries)",
              "Ranked interaction features / signatures",
              "Study-ready QC + summary tables",
              "Report-ready exports (PDF + data packages)",
            ].map((x) => (
              <div key={x} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                {x}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section id="use-cases" className="mx-auto max-w-6xl px-6 py-12">
        <SectionHeader
          eyebrow="Applications"
          title="Use cases"
          desc="Built for Pharma and Biotech developing modern cell and immunotherapies—especially CAR-T, TCR-T, and bispecific antibodies."
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {useCases.map((u) => (
            <Card key={u.title} className="rounded-3xl border-slate-200">
              <CardHeader>
                <AccentTitle>{u.title}</AccentTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">{u.desc}</CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="rounded-2xl text-white"
            style={{ backgroundColor: ACCENT.hex }}
          >
            <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${COMPANY} — Pilot request`)}`}>
              Request a pilot
            </a>
          </Button>
          <Button asChild variant="outline" className="rounded-2xl">
            <Link href="/reports">Download reports</Link>
          </Button>
        </div>
      </section>

      {/* Disease areas panel */}
      <section id="disease-areas" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <SectionHeader
            eyebrow="Therapeutic areas"
            title="Disease areas"
            desc="Apply interaction analytics across therapeutic areas where immune dynamics drive efficacy and safety."
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {diseaseAreas.map((d) => (
              <Card key={d.title} className="rounded-3xl border-slate-200">
                <CardHeader>
                  <AccentTitle>{d.title}</AccentTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">{d.desc}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence */}
      <section id="evidence" className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          <div className="md:col-span-2">
            <SectionHeader
              eyebrow="Evidence"
              title="Published, peer-reviewed foundation"
              desc="Our approach is grounded in published methodology for extracting and analyzing cell–cell interaction information from flow cytometry—supporting scalable studies and clinically relevant decision-making."
            />
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="outline" className="rounded-xl">
                Published in Nature Methods
              </Badge>
              <Badge variant="outline" className="rounded-xl">
                Built for reproducibility
              </Badge>
              <Badge variant="outline" className="rounded-xl">
                Exportable deliverables
              </Badge>
            </div>
          </div>

          <Card className="rounded-3xl border-slate-200">
            <CardContent className="p-6">
              <div className="text-sm font-semibold text-slate-950">Next steps</div>
              <div className="mt-2 text-sm text-slate-600">
                Evaluate fit for your program—mechanistic insight, stratification strategy, and safety risk reduction.
              </div>
              <Separator className="my-5" />
              <div className="flex flex-col gap-3">
                <Button
                  asChild
                  className="rounded-2xl text-white"
                  style={{ backgroundColor: ACCENT.hex }}
                >
                  <a href={PAPER_URL} target="_blank" rel="noreferrer">
                    Read the paper
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-2xl">
                  <Link href="/reports">Download reports</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-2xl">
                  <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${COMPANY} — Pilot request`)}`}>
                    Request a pilot
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {builtFor.map((b) => (
            <Card key={b.title} className="rounded-3xl border-slate-200">
              <CardHeader>
                <AccentTitle>{b.title}</AccentTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">{b.desc}</CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Social proof (optional): “In discussion with leading pharma and biotech partners.”
        </p>
      </section>

      {/* Final CTA */}
      <section id="contact" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <SectionHeader
                eyebrow="Contact"
                title="Ready to de-risk your next immunotherapy program?"
                desc={`Pilot ${COMPANY} to quantify cell–cell interactions, enable patient stratification, and reduce clinical failures.`}
              />
              <div className="mt-4 text-sm text-slate-600">
                Email:{" "}
                <a className="font-medium text-slate-950 underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                asChild
                className="rounded-2xl text-white"
                style={{ backgroundColor: ACCENT.hex }}
              >
                <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${COMPANY} — Pilot request`)}`}>
                  Request a pilot
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-2xl">
                <Link href="/reports">Download reports</Link>
              </Button>
              <Button asChild variant="ghost" className="rounded-2xl">
                <Link href="/privacy">Privacy</Link>
              </Button>
            </div>
          </div>

          <footer className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center">
            <div>© {new Date().getFullYear()} {COMPANY}</div>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-slate-950">
                Privacy
              </Link>
              <Link href="/reports" className="hover:text-slate-950">
                Reports
              </Link>
              <a href={PAPER_URL} className="hover:text-slate-950" target="_blank" rel="noreferrer">
                Publication
              </a>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
