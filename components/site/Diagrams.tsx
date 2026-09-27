/* Custom explanatory graphics. Server components; labels live in HTML, not only inside SVG. */

function Channel({ kind }: { kind: "eff" | "tgt" | "pair" }) {
  return (
    <svg viewBox="0 0 120 180" className="h-40 w-auto" aria-hidden="true">
      <rect x="30" y="4" width="60" height="172" rx="30" fill="none" stroke="#F4F7F4" strokeOpacity="0.25" />
      <line x1="0" y1="96" x2="120" y2="96" stroke="#68E4D4" strokeOpacity="0.9" strokeDasharray="3 3" />
      {kind === "eff" && <circle cx="60" cy="96" r="15" fill="#0D2A2D" stroke="#68E4D4" strokeWidth="1.6" />}
      {kind === "tgt" && (
        <>
          <circle cx="60" cy="96" r="20" fill="#1A1838" stroke="#A49BE8" strokeWidth="1.6" />
          <circle cx="60" cy="96" r="24" fill="none" stroke="#A49BE8" strokeOpacity="0.5" strokeDasharray="2 4" />
        </>
      )}
      {kind === "pair" && (
        <>
          <circle cx="60" cy="112" r="20" fill="#1A1838" stroke="#A49BE8" strokeWidth="1.6" />
          <circle cx="60" cy="112" r="24" fill="none" stroke="#A49BE8" strokeOpacity="0.5" strokeDasharray="2 4" />
          <circle cx="60" cy="80" r="15" fill="#0D2A2D" stroke="#68E4D4" strokeWidth="1.6" />
        </>
      )}
    </svg>
  );
}

export function ScienceDiagram() {
  const cols = [
    {
      kind: "eff" as const,
      title: "Effector cell",
      detail: "One cell, one event. Effector markers only.",
      verdict: "Counted as a singlet",
    },
    {
      kind: "tgt" as const,
      title: "Target cell",
      detail: "One cell, one event. Target markers only.",
      verdict: "Counted as a singlet",
    },
    {
      kind: "pair" as const,
      title: "Engaged pair",
      detail: "Two cells pass the laser as one event: both marker sets, and a shifted forward-scatter ratio (FSC-A/FSC-H).",
      verdict: "Usually gated out as a “doublet”",
    },
  ];
  return (
    <figure>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
        {cols.map((c) => (
          <div key={c.title} className={`flex flex-col bg-ink-2 p-6 ${c.kind === "pair" ? "sm:bg-ink-3" : ""}`}>
            <div className="flex justify-center py-2">
              <Channel kind={c.kind} />
            </div>
            <h3 className="mt-4 text-lg font-medium text-paper">{c.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-mist">{c.detail}</p>
            <p className="mt-auto pt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-mist">
              {c.kind === "pair" ? <s className="decoration-mist/70">{c.verdict}</s> : c.verdict}
            </p>
            {c.kind === "pair" && (
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-teal">
                → Resolved as an interacting pair
              </p>
            )}
          </div>
        ))}
      </div>
      <figcaption className="mt-3 flex flex-wrap justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-mist">
        <span>Schematic visualization · dashed line = laser interrogation point</span>
        <span>Method: Vonficht et al., Nature Methods 2025</span>
      </figcaption>
    </figure>
  );
}

/* ---------- Differentiator 2: endpoint vs interaction readout ---------- */

const PAIRS = ["Effector · Target", "Effector · Bystander", "Bystander · Target"];
const TIMES = ["t1", "t2", "t3", "t4"];
// illustrative magnitudes 0–1
const MATRIX = [
  [0.2, 0.55, 0.9, 0.7],
  [0.15, 0.2, 0.3, 0.25],
  [0.1, 0.1, 0.15, 0.1],
];

export function MechanismDiagram() {
  return (
    <figure className="rounded-2xl border border-ink/12 bg-white/60 p-6 sm:p-8">
      <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">Endpoint cytotoxicity</p>
          <div className="mt-4 flex aspect-square max-w-[180px] items-center justify-center rounded-full border border-dashed border-ink/30 p-6 text-center text-[15px] leading-snug text-ink/80">
            One outcome per well: did target cells die?
          </div>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">Interaction readout</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-violet-deep">
            Illustrative data — not experimental results
          </p>
          <table className="mt-4 w-full border-collapse text-left text-[14px]">
            <caption className="sr-only">
              Illustrative matrix: interaction frequency for three cell-type pairs at four time points. Not experimental
              results.
            </caption>
            <thead>
              <tr>
                <th scope="col" className="pb-2 font-normal text-ink/60">
                  <span className="sr-only">Cell-type pair</span>
                </th>
                {TIMES.map((t) => (
                  <th key={t} scope="col" className="pb-2 text-center font-mono text-[11px] font-normal uppercase text-ink/60">
                    {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PAIRS.map((p, r) => (
                <tr key={p} className="border-t border-ink/10">
                  <th scope="row" className="py-2.5 pr-3 font-normal text-ink">
                    {p}
                  </th>
                  {MATRIX[r].map((v, c) => (
                    <td key={c} className="py-2.5 text-center">
                      <span
                        className="inline-block rounded-full bg-teal-deep align-middle"
                        style={{ width: 6 + v * 18, height: 6 + v * 18, opacity: 0.35 + v * 0.65 }}
                      />
                      <span className="sr-only">{v >= 0.6 ? "high" : v >= 0.3 ? "medium" : "low"}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-[14px] leading-snug text-ink/70">
            Which pairs engage, how often, and when — plus the signalling state of engaged cells.
          </p>
        </div>
      </div>
    </figure>
  );
}

/* ---------- Differentiator 3: integration ---------- */

export function IntegrationDiagram() {
  const nodes = [
    { t: "Your samples", s: "Co-cultures, PBMCs, bone marrow and other suspensions", own: true },
    { t: "Your flow cytometer", s: "Multicolour fluorescence instruments", own: true },
    { t: "Your data", s: "New runs — or existing datasets acquired to the guidelines", own: true },
    { t: "Interaction mapping", s: "PICtR analysis framework", own: false },
    { t: "Interaction readout", s: "Frequencies per cell-type pair and condition", own: false },
  ];
  return (
    <figure className="rounded-2xl border border-ink/12 bg-white/60 p-6 sm:p-8">
      <ol className="grid gap-3 md:grid-cols-5 md:gap-0">
        {nodes.map((n, i) => (
          <li key={n.t} className="relative flex md:flex-col">
            <div className="flex flex-col items-center md:w-full md:flex-row">
              <span
                className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border font-mono text-[11px] ${
                  n.own ? "border-ink/40 bg-paper text-ink" : "border-teal-deep bg-teal-deep text-paper"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {i < nodes.length - 1 && <span className="min-h-4 w-px flex-1 bg-ink/20 md:h-px md:min-h-0 md:w-auto" aria-hidden="true" />}
            </div>
            <div className="pb-2 pl-4 md:pl-0 md:pr-4 md:pt-4">
              <p className="text-[15px] font-medium text-ink">{n.t}</p>
              <p className="mt-1 text-[14px] leading-snug text-ink/70">{n.s}</p>
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/10 pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full border border-ink/40 bg-paper" /> Existing infrastructure
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-teal-deep" /> Added by InterAcTec
        </span>
      </figcaption>
    </figure>
  );
}
