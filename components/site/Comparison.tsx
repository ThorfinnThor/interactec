/*
 * Quantified comparisons. Every number is taken from a cited source (see SOURCES and
 * docs/relaunch/CLAIMS.md). Bars are drawn to a linear scale so the ratios are honest.
 */

export const SOURCES = {
  nm25: {
    label: "Vonficht et al., Nature Methods 2025",
    href: "https://www.nature.com/articles/s41592-025-02744-w",
  },
  picseq: {
    label: "Giladi et al., Nature Biotechnology 2020 (PIC-seq)",
    href: "https://www.nature.com/articles/s41587-020-0442-2",
  },
  aurora: {
    label: "Cytek Aurora specification (35,000 events/s)",
    href: "https://www.imperial.ac.uk/natural-sciences/departments/life-sciences/research/flow-cytometry-facility/equipment/aurora/",
  },
  imagestream: {
    label: "Cytek Amnis ImageStreamX Mk II specification",
    href: "https://cytekbio.com/pages/imagestream",
  },
} as const;

type Bar = { label: string; value: number; display: string; ours?: boolean };

export function BarCompare({ title, unit, bars }: { title: string; unit: string; bars: Bar[] }) {
  const max = Math.max(...bars.map((b) => b.value));
  return (
    <figure className="w-full">
      <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">
        {title} <span className="normal-case tracking-normal text-ink/50">({unit}, linear scale)</span>
      </figcaption>
      <ul className="mt-4 space-y-4">
        {bars.map((b) => {
          const pct = (b.value / max) * 100;
          return (
            <li key={b.label}>
              <div className="flex items-baseline justify-between gap-4 text-[15px]">
                <span className={b.ours ? "font-medium text-ink" : "text-ink/75"}>{b.label}</span>
                <span className={`font-mono tabular-nums ${b.ours ? "text-ink" : "text-ink/70"}`}>{b.display}</span>
              </div>
              <div className="mt-1.5 h-3 w-full rounded-full bg-ink/[0.06]" aria-hidden="true">
                <div
                  className={`h-3 rounded-r-full ${b.ours ? "bg-teal-deep" : "bg-ink/35"}`}
                  style={{ width: `max(${pct}%, 4px)` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}

export function BigStat({ value, label, tone = "ink" }: { value: string; label: string; tone?: "ink" | "paper" }) {
  return (
    <p className="flex flex-col">
      <span
        className={`text-[3.6rem] font-medium leading-none tracking-[-0.04em] tabular-nums sm:text-[5rem] ${
          tone === "ink" ? "text-teal-deep" : "text-teal"
        }`}
      >
        {value}
      </span>
      <span className={`mt-3 max-w-xs text-[15px] leading-snug ${tone === "ink" ? "text-ink/70" : "text-mist"}`}>{label}</span>
    </p>
  );
}

export function SourceNote({ keys, note }: { keys: (keyof typeof SOURCES)[]; note?: string }) {
  return (
    <p className="mt-5 text-[13px] leading-relaxed text-ink/55">
      {note && <>{note} </>}
      Sources:{" "}
      {keys.map((k, i) => (
        <span key={k}>
          <a href={SOURCES[k].href} target="_blank" rel="noreferrer" className="underline decoration-ink/25 underline-offset-2 hover:decoration-ink">
            {SOURCES[k].label}
          </a>
          {i < keys.length - 1 ? "; " : "."}
        </span>
      ))}
    </p>
  );
}

/* ---------------- dark summary band: the value proposition at a glance ---------------- */

const AT_A_GLANCE = [
  { value: "7×", label: "faster cell acquisition than imaging flow cytometry", sub: "35,000 vs 5,000 cells per second" },
  { value: "~170×", label: "more interacting cells in one experiment than a published PIC-seq experiment", sub: "414,564 vs 2,389 reported" },
  { value: "52", label: "cell-type pairs resolved in one experiment", sub: "vs one value per well in an endpoint kill assay" },
  { value: "0", label: "genetic engineering or special instruments needed", sub: "runs on standard multicolour flow cytometers" },
];

export function AtAGlance() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {AT_A_GLANCE.map((s) => (
        <li key={s.label} className="flex flex-col bg-ink-2 p-6 sm:p-7">
          <span className="text-5xl font-medium leading-none tracking-[-0.04em] text-teal tabular-nums">{s.value}</span>
          <span className="mt-4 text-[16px] leading-snug text-paper">{s.label}</span>
          <span className="mt-auto pt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-mist">{s.sub}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------------- method comparison matrix ---------------- */

type Mark = "yes" | "partial" | "no";
const METHODS: { name: string; ours?: boolean; cells: [Mark, string][] }[] = [
  {
    name: "InterAcTec (Interact-omics)",
    ours: true,
    cells: [
      ["yes", "Millions of cells per sample"],
      ["yes", "All immune cell types"],
      ["yes", "Any flow-compatible suspension"],
      ["yes", "Standard flow cytometers"],
      ["yes", "Existing datasets"],
    ],
  },
  {
    name: "Imaging / imaging flow cytometry",
    cells: [
      ["partial", "Up to 5,000 cells/s"],
      ["partial", "Limited by channels"],
      ["yes", "Suspensions or tissue"],
      ["no", "Dedicated imager"],
      ["no", "No"],
    ],
  },
  {
    name: "Sequencing of interacting cells (PIC-seq)",
    cells: [
      ["no", "Thousands of pairs"],
      ["yes", "Transcriptome-wide"],
      ["yes", "Sorted suspensions"],
      ["no", "Sorter + sequencing"],
      ["no", "No"],
    ],
  },
  {
    name: "Reporter-based labelling (LIPSTIC)",
    cells: [
      ["partial", "Flow readout"],
      ["no", "Pre-defined pairs"],
      ["no", "Engineered mice only"],
      ["partial", "Flow + mouse lines"],
      ["no", "No"],
    ],
  },
  {
    name: "Endpoint cytotoxicity assay",
    cells: [
      ["yes", "Plate-based, fast"],
      ["no", "One outcome per well"],
      ["yes", "Co-cultures"],
      ["yes", "Plate reader"],
      ["no", "No"],
    ],
  },
];
const COLS = ["Scale", "Cell types resolved", "Sample types", "Instruments", "Mines existing flow data"];

function MarkIcon({ m }: { m: Mark }) {
  const label = m === "yes" ? "Strength" : m === "partial" ? "Partial" : "Limitation";
  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center" role="img" aria-label={label}>
      {m === "yes" && (
        <svg viewBox="0 0 20 20" className="h-5 w-5">
          <circle cx="10" cy="10" r="9" className="fill-teal-deep" />
          <path d="M6 10.5l2.6 2.5L14 7.5" fill="none" stroke="#F4F7F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {m === "partial" && (
        <svg viewBox="0 0 20 20" className="h-5 w-5">
          <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
          <path d="M10 1.75a8.25 8.25 0 010 16.5z" fill="currentColor" fillOpacity="0.5" />
        </svg>
      )}
      {m === "no" && (
        <svg viewBox="0 0 20 20" className="h-5 w-5">
          <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" />
          <path d="M7 10h6" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}

export function MethodMatrix() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-ink/12 bg-white/70">
      <table className="w-full min-w-[860px] border-collapse text-left text-[14px]">
        <caption className="sr-only">
          Qualitative comparison of cell-interaction methods. Summarised from the cited publications and instrument
          specifications.
        </caption>
        <thead>
          <tr className="border-b border-ink/12">
            <th scope="col" className="sticky left-0 z-10 bg-[#fbfcfb] px-5 py-4 font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-ink/60">
              Method
            </th>
            {COLS.map((c) => (
              <th key={c} scope="col" className="px-4 py-4 font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-ink/60">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {METHODS.map((m) => (
            <tr key={m.name} className={`border-b border-ink/8 last:border-0 ${m.ours ? "bg-[#e3efec]" : ""}`}>
              <th
                scope="row"
                className={`sticky left-0 z-10 w-44 px-5 py-4 align-top ${m.ours ? "bg-[#e3efec] font-medium text-ink" : "bg-[#fbfcfb] font-normal text-ink/80"}`}
              >
                {m.name}
              </th>
              {m.cells.map(([mark, text], i) => (
                <td key={i} className="px-4 py-4 align-top text-ink/75">
                  <span className="flex items-start gap-2.5">
                    <MarkIcon m={mark} />
                    <span>{text}</span>
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
