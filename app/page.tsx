import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Sparkles,
  Network,
  Users,
  ShieldCheck,
  TestTube2,
  Microscope,
  Cpu,
  Pill,
  Target,
  LineChart,
  Shield,
  Ribbon,
  HeartPulse,
  Flame,
  Bug,
  ArrowRight,
} from "lucide-react";

const PUBLICATION_URL = "https://www.nature.com/articles/s41592-025-02744-w";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="text-sm font-semibold tracking-tight">InterAcTec</div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
            <a href="#technology" className="hover:text-slate-950">
              Technology
            </a>
            <a href="#use-cases" className="hover:text-slate-950">
              Use cases
            </a>
            <a href="#disease-areas" className="hover:text-slate-950">
              Disease areas
            </a>
            <a href="#evidence" className="hover:text-slate-950">
              Evidence
            </a>
            <Link href="/reports" className="hover:text-slate-950">
              Reports
            </Link>
            <a href="#contact" className="hover:text-slate-950">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="hidden rounded-2xl md:inline-flex">
              <a href={PUBLICATION_URL} target="_blank" rel="noreferrer">
                Publication
              </a>
            </Button>
            <Button asChild className="rounded-2xl">
              <a href="#contact">Request a pilot</a>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0">
          {/* subtle clinical background */}
          <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-sky-200/45 blur-3xl" />
          <div className="absolute top-28 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-indigo-200/35 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="rounded-full border-slate-200 bg-white/70 px-3 py-1 text-slate-700"
            >
              Clinical-ready cell interaction analytics
            </Badge>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Turn cell–cell interactions into actionable trial decisions.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-700 sm:text-xl">
              InterAcTec combines flow cytometry with bioinformatics and AI-assisted analysis to quantify cell–cell
              interactions rapidly, precisely, and cost-effectively—built for scalable studies and clinical workflows.
              Our algorithms can also infer interaction signatures from retrospective datasets to re-analyze existing
              cohorts.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {["Low cost", "Highly scalable", "High precision", "Clinical-workflow ready"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="h-11 rounded-2xl px-6 text-base">
                <a href="#contact">Request a pilot</a>
              </Button>

              <Button asChild variant="outline" className="h-11 rounded-2xl px-6 text-base">
                <Link href="/reports">Download reports</Link>
              </Button>

              <a
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-950"
                href={PUBLICATION_URL}
                target="_blank"
                rel="noreferrer"
              >
                Nature Methods publication <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE / ENABLES */}
      <section id="technology" className="mx-auto max-w-6xl px-6 py-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            What InterAcTec enables
          </h2>
          <p className="mt-3 text-base text-slate-700 sm:text-lg">
            Decision-grade interaction signatures for modern cell and immunotherapy programs.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="p-7 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white">
                <Network className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">Mechanism-of-action, quantified</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                See which immune populations physically interact—and how therapies reshape interaction networks.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="p-7 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">Patient stratification signals</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                Derive interaction signatures that predict responders before treatment to improve trial design and endpoints.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="p-7 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">Safety / off-target insight</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                Identify misdirected cellular engagement earlier to de-risk dose, design, and development decisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
          <p className="mt-3 text-base text-slate-700 sm:text-lg">
            A simple workflow—built to integrate into real R&amp;D and clinical trial operations.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="p-7 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-sky-50 text-slate-950 ring-1 ring-slate-200">
                <TestTube2 className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">Collect</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                Blood, PBMCs, or clinically relevant cell suspensions—compatible with standard sample workflows.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="p-7 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-sky-50 text-slate-950 ring-1 ring-slate-200">
                <Microscope className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">Measure</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                Classical or full-spectrum flow cytometry—designed for scale and reproducibility.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="p-7 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-sky-50 text-slate-950 ring-1 ring-slate-200">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">Analyze</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                AI-assisted interaction mapping with interpretable outputs that support decision making.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* USE CASES */}
      <section id="use-cases" className="mx-auto max-w-6xl px-6 py-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Use cases</h2>
          <p className="mt-3 text-base text-slate-700 sm:text-lg">
            Built for pharma and biotech teams developing modern cell and immunotherapies.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Pill,
              title: "CAR-T / TCR-T / bispecifics",
              text: "Quantify induced interactions, kinetics, and MoA to validate mechanism and optimize design.",
            },
            {
              icon: Target,
              title: "Biomarkers & CDx",
              text: "Identify predictive signatures to tighten inclusion criteria and reduce non-responders.",
            },
            {
              icon: LineChart,
              title: "Clinical immunomonitoring",
              text: "Support dose–response, durability, and safety assessment with interpretable interaction readouts.",
            },
            {
              icon: Shield,
              title: "De-risk safety early",
              text: "Surface off-target interaction patterns to inform mitigation strategies and development decisions.",
            },
          ].map((item) => (
            <Card key={item.title} className="rounded-3xl border-slate-200 shadow-sm">
              <CardContent className="p-7 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold sm:text-xl">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-700">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* DISEASE AREAS */}
      <section id="disease-areas" className="mx-auto max-w-6xl px-6 py-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Disease areas</h2>
          <p className="mt-3 text-base text-slate-700 sm:text-lg">
            Interaction-driven insights across immune-mediated disease and oncology.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Ribbon, title: "Cancer", text: "Response prediction, MoA validation, and toxicity insight." },
            { icon: HeartPulse, title: "Autoimmune disease", text: "Stratification signals and interaction dynamics." },
            { icon: Flame, title: "Inflammatory diseases", text: "Immune ecosystem resolution and target validation." },
            { icon: Bug, title: "Infectious diseases", text: "System-level interaction shifts and immune state mapping." },
          ].map((item) => (
            <Card key={item.title} className="rounded-3xl border-slate-200 shadow-sm">
              <CardContent className="p-7 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-sky-50 text-slate-950 ring-1 ring-slate-200">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold sm:text-xl">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-700">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* EVIDENCE */}
      <section id="evidence" className="mx-auto max-w-6xl px-6 py-10">
        <Card className="rounded-3xl border-slate-200 bg-slate-50 shadow-sm">
          <CardContent className="p-8 text-center">
            <Badge variant="outline" className="rounded-full bg-white">
              Published evidence
            </Badge>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Published in Nature Methods
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
              Peer-reviewed methodology supporting high-resolution measurement of cellular interactions for scalable,
              decision-oriented analysis.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="rounded-2xl">
                <a href={PUBLICATION_URL} target="_blank" rel="noreferrer">
                  Read the publication
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-2xl">
                <Link href="/reports">Download reports</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="mx-auto max-w-6xl px-6 pt-10 pb-14">
        <div className="rounded-3xl border border-slate-200 bg-slate-950 px-6 py-12 text-center text-white sm:px-10">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Ready to de-risk your next immunotherapy program?
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-200 sm:text-xl">
            Pilot InterAcTec to quantify cell–cell interactions, enable patient stratification, and reduce clinical failures.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="h-11 rounded-2xl bg-white px-6 text-base text-slate-950 hover:bg-slate-100">
              <a href="mailto:hello@interactec.bio?subject=Pilot%20request%20-%20InterAcTec">Request a pilot</a>
            </Button>

            <Button asChild variant="outline" className="h-11 rounded-2xl border-white/30 px-6 text-base text-white">
              <Link href="/reports">Download reports</Link>
            </Button>
          </div>

          <div className="mt-8 text-sm text-slate-300">
            <Link className="underline underline-offset-4" href="/privacy">
              Privacy
            </Link>
            <span className="mx-3 opacity-50">•</span>
            <a className="underline underline-offset-4" href="mailto:hello@interactec.bio">
              hello@interactec.bio
            </a>
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-slate-600">
          © {new Date().getFullYear()} InterAcTec
        </div>
      </footer>
    </div>
  );
}
