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
  phenocyclerSpec: {
    label: "Akoya PhenoCycler-Fusion specification sheet",
    href: "https://akoyabio.boldfocus.com/wp-content/uploads/2022/01/PhenoCycler-Fusion-Specification-Sheet.pdf",
  },
  phenocycler: {
    label: "PhenoCycler-Fusion protocol, STAR Protocols 2024",
    href: "https://www.sciencedirect.com/science/article/pii/S2666166724003915",
  },
  comet: {
    label: "Rivest et al., Scientific Reports 2023 (COMET seqIF)",
    href: "https://www.nature.com/articles/s41598-023-43435-w",
  },
  xenium: {
    label: "10x Genomics Xenium Analyzer specification",
    href: "https://www.10xgenomics.com/instruments/xenium-analyzer",
  },
  timing: {
    label: "Lu et al., Bioinformatics 2019 (TIMING 2.0)",
    href: "https://academic.oup.com/bioinformatics/article/35/4/706/5063407",
  },
  timingCar: {
    label: "Romain et al., J Clin Invest 2022 (CAR-T products in nanowells)",
    href: "https://www.jci.org/articles/view/159402",
  },
  beacon: {
    label: "Bruker Beacon optofluidic system specification",
    href: "https://brukercellularanalysis.com/products/instruments/the-beacon-optofluidic-system/",
  },
  droplet: {
    label: "NK-cell killing in droplets, Scientific Reports 2021",
    href: "https://www.nature.com/articles/s41598-021-96609-9",
  },
  nanovials: {
    label: "de Rutte et al., ACS Nano 2022 (nanovials)",
    href: "https://doi.org/10.1021/acsnano.1c11420",
  },
  armingol: {
    label: "Armingol et al., Nature Reviews Genetics 2021",
    href: "https://www.nature.com/articles/s41576-020-00292-x",
  },
} as const;

type Bar = { label: string; value: number; display: string; ours?: boolean; note?: string };

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
                <span className={`shrink-0 font-mono tabular-nums ${b.ours ? "text-ink" : "text-ink/70"}`}>{b.display}</span>
              </div>
              {b.note && <p className="text-[13px] leading-snug text-ink/55">{b.note}</p>}
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

/* Time comparison. `min`–`max` draws a solid bar to `min` and a lighter extension to `max`. */
type Span = { label: string; note: string; min: number; max?: number; display: string; ours?: boolean };

export function TimeCompare({ title, spans, maxHours }: { title: string; spans: Span[]; maxHours: number }) {
  const ticks = [0, 24, 48, 72, 96, 120, 144].filter((t) => t <= maxHours);
  const pct = (h: number) => `${(h / maxHours) * 100}%`;
  return (
    <figure className="w-full">
      <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">
        {title} <span className="normal-case tracking-normal text-ink/50">(hours, linear scale)</span>
      </figcaption>
      <ul className="mt-4 space-y-4">
        {spans.map((s) => (
          <li key={s.label}>
            <div className="flex items-baseline justify-between gap-4 text-[15px]">
              <span className={s.ours ? "font-medium text-ink" : "text-ink/75"}>{s.label}</span>
              <span className={`shrink-0 font-mono tabular-nums ${s.ours ? "text-ink" : "text-ink/70"}`}>{s.display}</span>
            </div>
            <p className="text-[13px] leading-snug text-ink/55">{s.note}</p>
            <div className="relative mt-1.5 h-3 w-full rounded-full bg-ink/[0.06]" aria-hidden="true">
              <div
                className={`absolute inset-y-0 left-0 rounded-r-full ${s.ours ? "bg-teal-deep" : "bg-ink/35"}`}
                style={{ width: `max(${pct(s.min)}, 4px)` }}
              />
              {s.max !== undefined && (
                <div
                  className={`absolute inset-y-0 rounded-r-full ${s.ours ? "bg-teal-deep/40" : "bg-ink/15"}`}
                  style={{ left: pct(s.min), width: `max(calc(${pct(s.max)} - ${pct(s.min)}), 3px)` }}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="relative mt-3 h-4 font-mono text-[10px] text-ink/45" aria-hidden="true">
        {ticks.map((t, i) => (
          <span
            key={t}
            className={`absolute whitespace-nowrap ${i === 0 ? "" : t === maxHours ? "-translate-x-full" : "-translate-x-1/2"}`}
            style={{ left: pct(t) }}
          >
            {t === 0 ? "0" : `${t / 24} d`}
          </span>
        ))}
      </div>
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
  {
    value: "~170×",
    label: "more cell-cell interactions analysed in one experiment than in a published PIC-seq experiment",
    sub: "414,564 vs 2,389 (droplet pairing: ~2,000)",
  },
  {
    value: "3 h",
    label: "of live co-culture before the flow readout — spatial transcriptomics needs up to ~6 days of prep and run",
    sub: "0.5–3 h vs 2–3 d prep + < 3 d run (Xenium)",
  },
  { value: "52", label: "cell-type pairs resolved in one experiment, on a standard flow cytometer", sub: "vs one value per well in an endpoint kill assay" },
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

/* ---------------- what each family of methods actually measures (schematic) ---------------- */

function GlyphContact() {
  return (
    <svg viewBox="0 0 120 72" className="h-16 w-auto" aria-hidden="true">
      <circle cx="44" cy="36" r="22" className="fill-teal-deep/15 stroke-teal-deep" strokeWidth="2" />
      <circle cx="80" cy="36" r="17" className="fill-ink/5 stroke-ink/60" strokeWidth="2" />
      <path d="M63 24c2.4 8 2.4 16 0 24" className="stroke-teal-deep" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function GlyphProximity() {
  const pts = [
    [18, 18], [42, 14], [70, 20], [98, 14], [14, 44], [38, 40], [62, 46], [88, 42], [108, 50], [30, 64], [56, 66], [82, 64],
  ];
  return (
    <svg viewBox="0 0 120 80" className="h-16 w-auto" aria-hidden="true">
      <circle cx="62" cy="46" r="26" fill="none" className="stroke-ink/40" strokeWidth="1.5" strokeDasharray="3 3" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" className={i === 6 ? "fill-teal-deep/30 stroke-teal-deep" : "fill-ink/5 stroke-ink/45"} strokeWidth="1.5" />
      ))}
    </svg>
  );
}

function GlyphOutcome() {
  return (
    <svg viewBox="0 0 120 72" className="h-16 w-auto" aria-hidden="true">
      <circle cx="40" cy="36" r="26" className="fill-ink/5 stroke-ink/50" strokeWidth="2" />
      <text x="40" y="42" textAnchor="middle" className="fill-ink/70 font-mono" fontSize="16">
        %
      </text>
      <path d="M76 36h30" className="stroke-ink/40" strokeWidth="2" strokeLinecap="round" />
      <path d="M100 30l6 6-6 6" className="stroke-ink/40" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const READOUTS = [
  {
    glyph: <GlyphContact />,
    title: "Physical engagement",
    body: "Cells that are bound to each other are detected as a unit — the event a cell-bridging drug is meant to change. Measured in live samples, so it can be followed under treatment.",
    methods: "InterAcTec · imaging flow cytometry · nanowell microscopy · PIC-seq",
    ours: true,
  },
  {
    glyph: <GlyphProximity />,
    title: "Proximity in fixed tissue",
    body: "High-plex imaging and spatial transcriptomics show which cells sit next to each other in a fixed section. Interactions are inferred from distance or ligand–receptor co-expression, not observed as binding.",
    methods: "PhenoCycler · IMC · MIBI · COMET · Xenium · CosMx · MERSCOPE",
  },
  {
    glyph: <GlyphOutcome />,
    title: "Outcome only",
    body: "One value per well — whether target cells died or a cytokine was released — without showing which cells engaged to produce it.",
    methods: "Endpoint cytotoxicity · plate-based release assays",
  },
];

export function ReadoutKinds() {
  return (
    <div>
      <ul className="grid gap-4 md:grid-cols-3">
        {READOUTS.map((r) => (
          <li
            key={r.title}
            className={`flex flex-col rounded-2xl border p-6 ${r.ours ? "border-teal-deep/40 bg-[#e3efec]" : "border-ink/12 bg-white/70"}`}
          >
            {r.glyph}
            <h4 className="mt-5 text-xl font-medium tracking-tight text-ink">{r.title}</h4>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{r.body}</p>
            <p className="mt-auto pt-5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-ink/55">{r.methods}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/45">Schematic</p>
    </div>
  );
}

/* ---------------- method comparison matrix ---------------- */

type Mark = "yes" | "partial" | "no" | "na";
type Method = { name: string; examples?: string; ours?: boolean; cells: [Mark, string][] };
const COLS = ["What is measured", "Sample", "Scale, as reported", "Time to data", "Instrument"];

const GROUPS: { label?: string; methods: Method[] }[] = [
  {
    methods: [
      {
        name: "InterAcTec",
        examples: "Interact-omics",
        ours: true,
        cells: [
          ["yes", "Physically engaged cells, across all cell-type pairs"],
          ["yes", "Live suspensions: co-cultures, blood, bone marrow"],
          ["yes", ">34 M cells and ~415,000 interactions in one experiment"],
          ["yes", "0.5–3 h co-culture, then a flow run"],
          ["yes", "Standard flow cytometer"],
        ],
      },
    ],
  },
  {
    label: "Imaging",
    methods: [
      {
        name: "Imaging flow cytometry",
        examples: "e.g. ImageStreamX",
        cells: [
          ["yes", "Contacts seen in images"],
          ["yes", "Suspensions"],
          ["partial", "Up to 5,000 cells/s (20×), 2,000 (40×)"],
          ["partial", "Same-day run, plus image analysis"],
          ["no", "Dedicated imaging cytometer"],
        ],
      },
      {
        name: "Live-cell & nanowell microscopy",
        examples: "e.g. TIMING, Beacon",
        cells: [
          ["yes", "Contact and killing kinetics of single pairs"],
          ["partial", "Fluorescently labelled cells in wells or nanowells"],
          ["no", "1,589 CAR-T cells in a clinical study; 500–60,000 cells per Beacon run"],
          ["partial", "6 h of imaging, 1–2 TB of video per experiment"],
          ["no", "Automated microscope or optofluidic system"],
        ],
      },
      {
        name: "Droplet & nanovial assays",
        examples: "e.g. droplet pairing, nanovials",
        cells: [
          ["partial", "Killing or secretion of single cells in droplets or on antigen-coated particles"],
          ["partial", "Cells encapsulated or loaded into particles"],
          ["partial", "~2,000 cell pairs per droplet experiment; nanovials: >1 M events sorted in <1 h"],
          ["partial", "10 h of droplet imaging; nanovials read out by sorting"],
          ["partial", "Microfluidics or sorter, plus consumables"],
        ],
      },
      {
        name: "High-plex tissue imaging",
        examples: "e.g. PhenoCycler, IMC, MIBI, COMET",
        cells: [
          ["partial", "Spatial neighbourhoods — proximity, not binding"],
          ["no", "Fixed tissue sections (e.g. FFPE)"],
          ["yes", "Up to 100+ markers; ~380,000 cells in a published dataset"],
          ["no", "6–26 h per run; 40-plex in <24 h"],
          ["no", "Dedicated imaging platform"],
        ],
      },
      {
        name: "Spatial transcriptomics",
        examples: "e.g. Xenium, CosMx, MERSCOPE",
        cells: [
          ["partial", "Proximity and ligand–receptor co-expression (inferred)"],
          ["no", "Fixed tissue sections"],
          ["yes", "480–5,000 genes per panel"],
          ["no", "2–3 days prep, then <3 to <6 days per run"],
          ["no", "Dedicated platform"],
        ],
      },
    ],
  },
  {
    label: "Sequencing & reporters",
    methods: [
      {
        name: "Sequencing of interacting cells",
        examples: "PIC-seq",
        cells: [
          ["yes", "Transcriptomes of sorted interacting pairs"],
          ["yes", "Sorted suspensions"],
          ["no", "2,389 interacting cells reported"],
          ["na", "Sorting, library prep and sequencing"],
          ["no", "Sorter + sequencer"],
        ],
      },
      {
        name: "Reporter-based labelling",
        examples: "LIPSTIC",
        cells: [
          ["partial", "Labelled contacts for a pre-defined receptor pair"],
          ["no", "Engineered mice only"],
          ["partial", "Flow readout"],
          ["na", "Requires breeding reporter lines"],
          ["partial", "Flow + reporter mouse lines"],
        ],
      },
    ],
  },
  {
    label: "Outcome assays",
    methods: [
      {
        name: "Endpoint cytotoxicity",
        examples: "e.g. release or kill assays",
        cells: [
          ["no", "Target-cell death only — one value per well"],
          ["yes", "Co-cultures"],
          ["yes", "Plate-based, many wells"],
          ["na", "Depends on assay"],
          ["yes", "Plate reader"],
        ],
      },
    ],
  },
];

function MarkIcon({ m }: { m: Mark }) {
  const label = m === "yes" ? "Strength" : m === "partial" ? "Partial" : m === "no" ? "Limitation" : "Not compared";
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
      {m === "na" && (
        <svg viewBox="0 0 20 20" className="h-5 w-5">
          <circle cx="10" cy="10" r="2" fill="currentColor" fillOpacity="0.3" />
        </svg>
      )}
    </span>
  );
}

function MatrixLegend() {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-ink/65">
      {(
        [
          ["yes", "Strength"],
          ["partial", "Partial"],
          ["no", "Limitation"],
        ] as const
      ).map(([m, l]) => (
        <li key={m} className="flex items-center gap-2">
          <MarkIcon m={m} />
          {l}
        </li>
      ))}
    </ul>
  );
}

export function MethodMatrix() {
  return (
    <div>
      <MatrixLegend />

      {/* desktop / tablet: table */}
      <div className="mt-5 hidden overflow-x-auto rounded-2xl border border-ink/12 bg-white/70 md:block">
        <table className="w-full min-w-[1000px] border-collapse text-left text-[14px]">
          <caption className="sr-only">
            Comparison of methods for studying cell-cell interactions, summarised from the cited publications and
            instrument specifications.
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
          {GROUPS.map((g, gi) => (
            <tbody key={gi}>
              {g.label && (
                <tr className="border-b border-ink/8 bg-ink/[0.03]">
                  <th
                    scope="colgroup"
                    colSpan={COLS.length + 1}
                    className="sticky left-0 px-5 pb-2 pt-5 font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-teal-deep"
                  >
                    {g.label}
                  </th>
                </tr>
              )}
              {g.methods.map((m) => (
                <tr key={m.name} className={`border-b border-ink/8 ${m.ours ? "bg-[#e3efec]" : ""}`}>
                  <th
                    scope="row"
                    className={`sticky left-0 z-10 w-52 px-5 py-4 align-top ${m.ours ? "bg-[#e3efec] font-medium text-ink" : "bg-[#fbfcfb] font-normal text-ink/85"}`}
                  >
                    {m.name}
                    {m.examples && <span className="mt-1 block text-[12px] font-normal text-ink/50">{m.examples}</span>}
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
          ))}
        </table>
      </div>

      {/* phone: one card per method */}
      <div className="mt-5 space-y-8 md:hidden">
        {GROUPS.map((g, gi) => (
          <section key={gi} aria-label={g.label ?? "InterAcTec"}>
            {g.label && <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-teal-deep">{g.label}</h4>}
            <ul className="mt-3 space-y-3">
              {g.methods.map((m) => (
                <li
                  key={m.name}
                  className={`rounded-2xl border p-5 ${m.ours ? "border-teal-deep/40 bg-[#e3efec]" : "border-ink/12 bg-white/70"}`}
                >
                  <p className={`text-[17px] ${m.ours ? "font-medium text-ink" : "text-ink"}`}>{m.name}</p>
                  {m.examples && <p className="text-[12px] text-ink/50">{m.examples}</p>}
                  <dl className="mt-4 space-y-3">
                    {m.cells.map(([mark, text], i) => (
                      <div key={i}>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">{COLS[i]}</dt>
                        <dd className="mt-1 flex items-start gap-2.5 text-[14px] text-ink/80">
                          <MarkIcon m={mark} />
                          <span>{text}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
