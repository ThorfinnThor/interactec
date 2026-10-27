import Image from "next/image";
import CytometerStage from "./CytometerStage";
import MotionToggle from "./MotionToggle";

const TEAL = "#68e4d4";
const VIOLET = "#a49be8";
const MIST = "#b5c0ca";
const LINEAGES = ["CD4 T", "CD8 T", "B", "NK", "cMono", "ncMono", "cDC", "pDC"];
const LINEAGE_COLORS = [TEAL, "#2f9f97", VIOLET, "#7769b3", "#a3cfc5", "#57877f", "#c2bbe8", "#736e91"];

export function CytometryHero() {
  return (
    <figure className="mx-auto w-full max-w-[620px] overflow-hidden rounded-2xl border border-line bg-ink-2">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-mist sm:text-[11px]">
          Full-spectrum flow cytometry
        </span>
        <span className="shrink-0 rounded-full border border-teal/30 bg-teal/10 px-3 py-1 font-mono text-xs text-teal">
          40-plex
        </span>
      </div>
      <CytometerStage poster={
        <Image
          src="/visuals/cytometer-3d-poster.webp"
          alt="3D schematic of a spectral flow cytometer with a sample tube and a magnified glass flow cell, showing single cells and an interacting cell pair passing the laser."
          width={1200}
          height={700}
          sizes="(max-width: 1023px) 90vw, 560px"
          className="block h-auto w-full"
        />
      } />
      <div className="border-t border-line px-5 pb-5 pt-4">
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <p className="text-sm text-paper">40 markers. One high-dimensional readout.</p>
        </div>
        <div className="grid grid-cols-[repeat(40,minmax(0,1fr))] gap-[3px]" aria-hidden="true">
          {Array.from({ length: 40 }, (_, index) => (
            <span
              key={index}
              className="h-6 rounded-[2px]"
              style={{ backgroundColor: index < 20 ? TEAL : VIOLET, opacity: 0.3 + (index % 10) * 0.07 }}
            />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-[13px]">
          <p className="flex items-center gap-2 text-mist"><span className="h-1.5 w-1.5 rounded-full bg-teal" />Cell identities & states</p>
          <p className="flex items-center gap-2 text-mist"><span className="h-1.5 w-1.5 rounded-full bg-violet" />Physical interactions</p>
        </div>
      </div>
      <figcaption className="border-t border-line bg-ink px-5 py-3 text-[11px] leading-relaxed text-mist">
        <div className="mb-1 flex flex-wrap items-center justify-between gap-x-4"><span>Schematic 3D visualization</span><MotionToggle /></div>
        Compatible flow cytometry, study-specific panels and acquisition controls.
      </figcaption>
    </figure>
  );
}

export function CellProfilePlot() {
  return (
    <svg viewBox="0 0 340 230" className="h-auto w-full" role="img" aria-labelledby="cell-profile-umap-title cell-profile-umap-desc">
      <title id="cell-profile-umap-title">UMAP of live cells from the InterAcTec IBD case study</title>
      <desc id="cell-profile-umap-desc">The original UMAP from panel B of the IBD report, showing 71,662 sketched cells from 29.9 million recorded cells. Cell positions and annotations are preserved; colours are adapted to the website palette.</desc>
      <defs>
        <filter id="cell-profile-palette" colorInterpolationFilters="sRGB">
          {/* Keep coloured marks and dark annotations, not the report's pale grey panel connector. */}
          <feColorMatrix in="SourceGraphic" values="1 -1 0 0 .5 0 1 -1 0 .5 -1 0 1 0 .5 0 0 0 1 0" result="chroma-deltas" />
          <feComposite in="chroma-deltas" in2="chroma-deltas" operator="arithmetic" k1="1" result="chroma-squared" />
          <feColorMatrix in="chroma-squared" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 400 400 400 0 -301.2" result="colour-mask" />
          <feColorMatrix in="SourceGraphic" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -7 -7 -7 0 18" result="annotation-mask" />
          <feComposite in="colour-mask" in2="annotation-mask" operator="arithmetic" k2="1" k3="1" result="foreground-mask" />
          <feColorMatrix in="SourceGraphic" type="matrix" values="-0.9 -0.18 -0.27 0 1.397 -0.18 -1.08 -0.27 0 1.605 -0.72 -0.72 -0.09 0 1.648 0 0 0 1 0" result="palette" />
          <feComposite in="palette" in2="foreground-mask" operator="in" />
        </filter>
      </defs>
      {/* Display panel B of the existing report image without altering its embedding or point geometry. */}
      <svg x="40" y="0" width="260" height="208" viewBox="428 59 480 384" preserveAspectRatio="xMidYMid meet" overflow="hidden">
        <image href="/case-study-previews/ibd.png" width="1359" height="820" filter="url(#cell-profile-palette)" />
      </svg>
      <text x="170" y="226" fill={MIST} fontSize="9" textAnchor="middle">IBD case study · 71,662 cells displayed</text>
    </svg>
  );
}

export function InteractionNetwork() {
  const nodes = LINEAGES.map((label, i) => {
    const a = ((i * 45 - 90) * Math.PI) / 180;
    return { label, x: 170 + Math.cos(a) * 80, y: 114 + Math.sin(a) * 80 };
  });
  const edges = [[0, 2], [0, 4], [0, 6], [0, 7], [1, 2], [1, 4], [1, 6], [1, 7], [2, 3], [3, 4], [3, 5], [4, 5], [4, 6]];
  return (
    <svg viewBox="0 0 340 230" className="h-auto w-full" role="img" aria-label="Illustrative interaction network linking CD4 T, CD8 T, B, NK, classical and nonclassical monocytes, cDC and pDC; not experimental data.">
      <circle cx="170" cy="114" r="80" fill="none" stroke={MIST} strokeOpacity=".12" />
      {edges.map(([a, b], index) => (
        <path key={`${a}-${b}`} d={`M${nodes[a].x} ${nodes[a].y} Q170 114 ${nodes[b].x} ${nodes[b].y}`} fill="none" stroke={index < 5 ? TEAL : VIOLET} strokeOpacity={index < 5 ? ".4" : ".22"} strokeWidth={index % 3 + 1} />
      ))}
      {nodes.map((node, i) => {
        const dx = node.x - 170;
        const dy = node.y - 114;
        return (
          <g key={node.label}>
            <circle cx={node.x} cy={node.y} r="7" fill={LINEAGE_COLORS[i]} />
            <text x={node.x + dx * 0.3} y={node.y + dy * 0.23 + 3} textAnchor={dx < -10 ? "end" : dx > 10 ? "start" : "middle"} fill={MIST} fontSize="10">{node.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function ComparisonPlot() {
  const rows = [
    { label: "Control", a: 0.16, b: 0.13 },
    { label: "Candidate A", a: 0.39, b: 0.19 },
    { label: "Candidate B", a: 0.76, b: 0.24 },
  ];
  return (
    <svg viewBox="0 0 340 230" className="h-auto w-full" role="img" aria-label="Illustrative side-by-side comparison of two cell-pair interaction frequencies across a control and two candidates; not experimental results.">
      {[0, 1, 2, 3, 4].map((i) => <line key={i} x1={108 + i * 45} y1="40" x2={108 + i * 45} y2="174" stroke={MIST} strokeOpacity=".12" />)}
      {rows.map((row, index) => (
        <g key={row.label}>
          <text x="92" y={68 + index * 44} textAnchor="end" fill={MIST} fontSize="10">{row.label}</text>
          <line x1={108 + row.b * 200} y1={65 + index * 44} x2={108 + row.a * 200} y2={65 + index * 44} stroke={MIST} strokeOpacity=".4" />
          <circle cx={108 + row.a * 200} cy={65 + index * 44} r="5" fill={TEAL} />
          <path d={`M${108 + row.b * 200} ${60 + index * 44}l5 5-5 5-5-5Z`} fill={VIOLET} />
        </g>
      ))}
      <path d="M108 174h188" stroke={MIST} strokeOpacity=".35" />
      <text x="202" y="195" textAnchor="middle" fill={MIST} fontSize="9">Interaction frequency →</text>
      <circle cx="82" cy="218" r="3" fill={TEAL} /><text x="91" y="221" fontSize="9" fill={MIST}>Cell pair 1</text>
      <path d="M191 214l4 4-4 4-4-4Z" fill={VIOLET} /><text x="202" y="221" fontSize="9" fill={MIST}>Cell pair 2</text>
    </svg>
  );
}

export function AcquisitionStrip() {
  return (
    <div className="grid gap-4 rounded-2xl border border-ink/12 bg-white/50 p-5 sm:grid-cols-3 sm:gap-6 sm:p-6">
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 42 50" className="h-12 w-10 shrink-0" aria-hidden="true">
          <path d="M12 8v28a9 9 0 0 0 18 0V8" fill="#0b6e63" fillOpacity=".06" stroke="#0b6e63" strokeWidth="1.5" />
          <rect x="10" y="3" width="22" height="6" rx="2" fill="#0b6e63" />
          {[0, 1, 2, 3, 4].map(i => <circle key={i} cx={18 + (i % 2) * 6} cy={24 + i * 3} r="2" fill={i % 2 ? "#5446c0" : "#0b6e63"} />)}
        </svg>
        <div><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-teal-deep">01 / Label</p><p className="mt-1 text-sm text-ink">A panel designed for your biology</p></div>
      </div>
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 48 50" className="h-12 w-10 shrink-0" aria-hidden="true">
          <rect x="19" y="3" width="12" height="44" rx="6" fill="#0b6e63" fillOpacity=".06" stroke="#0b6e63" strokeOpacity=".3" />
          <path d="M0 15l25 10M0 34l25-9M25 25h23" stroke="#5446c0" strokeWidth="1.5" />
          <circle cx="25" cy="22" r="4" fill="#0b6e63" /><circle cx="25" cy="29" r="4" fill="#a49be8" />
        </svg>
        <div><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-teal-deep">02 / Acquire</p><p className="mt-1 text-sm text-ink">High-plex flow-cytometry data</p></div>
      </div>
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 48 50" className="h-12 w-10 shrink-0" aria-hidden="true">
          <path d="M5 39V9h38M5 39h38" stroke="#0b6e63" strokeOpacity=".35" fill="none" />
          {Array.from({ length: 20 }, (_, i) => <rect key={i} x={10 + i % 5 * 6} y={13 + Math.floor(i / 5) * 6} width="4" height="4" rx=".6" fill={i % 3 ? "#0b6e63" : "#5446c0"} opacity={0.15 + (i % 5) * 0.16} />)}
        </svg>
        <div><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-teal-deep">03 / Resolve</p><p className="mt-1 text-sm text-ink">Cell profiles and interaction maps</p></div>
      </div>
    </div>
  );
}

export function HighPlexReadout({ id = "highplex" }: { id?: string }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-ink/12 bg-white/70">
      <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-5 py-5 sm:px-7">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-teal-deep">High-dimensional protein readout</p>
          <p className="mt-1 text-xl font-medium tracking-tight text-ink">40 markers, measured together.</p>
        </div>
        <p className="shrink-0 whitespace-nowrap text-3xl font-medium tracking-tight text-teal-deep sm:text-4xl">40<span className="text-lg">-plex</span></p>
      </div>
      <div className="px-4 py-5 sm:px-6">
        <svg viewBox="0 0 560 272" className="h-auto w-full" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
          <title id={`${id}-title`}>Illustrative 40-marker expression matrix</title>
          <desc id={`${id}-desc`}>Forty columns represent a marker panel, with eight example immune lineages as rows. Colours indicate illustrative low-to-high signal, not experimental data or a fixed panel.</desc>
          <defs>
            <linearGradient id={`${id}-signal`}><stop stopColor="#e8ede9" /><stop offset=".5" stopColor="#68e4d4" /><stop offset="1" stopColor="#5446c0" /></linearGradient>
          </defs>
          <text x="85" y="13" fill="#0b6e63" fontSize="10" fontFamily="monospace">Each column = one marker</text>
          <path d="M85 30v-5h430v5" stroke="#0b6e63" strokeOpacity=".4" fill="none" />
          {LINEAGES.map((lineage, row) => (
            <g key={lineage}>
              <text x="73" y={55 + row * 21} textAnchor="end" fill="#36444d" fontSize="11">{lineage}</text>
              {Array.from({ length: 40 }, (_, column) => {
                // Stylised block structure, intentionally not a named marker panel.
                const primary = Math.floor(column / 5) === row;
                const value = primary ? 0.62 + (column % 5) * 0.07 : ((row * 13 + column * 7) % 19) / 65;
                const color = value > 0.75 ? "#5446c0" : value > 0.5 ? "#a49be8" : value > 0.22 ? "#68e4d4" : "#c2dbd3";
                return <rect key={column} x={85 + column * 10.8} y={42 + row * 21} width="8.6" height="17" rx="1" fill={color} opacity={primary ? 1 : 0.4 + value} />;
              })}
            </g>
          ))}
          <text x="85" y="229" fill="#53615d" fontSize="10">01</text>
          <text x="515" y="229" fill="#53615d" fontSize="10" textAnchor="end">40</text>
          <rect x="369" y="250" width="100" height="6" rx="3" fill={`url(#${id}-signal)`} />
          <text x="357" y="257" fill="#53615d" fontSize="9" textAnchor="end">Low</text>
          <text x="480" y="257" fill="#53615d" fontSize="9">High</text>
          <text x="85" y="257" fill="#53615d" fontSize="9">Marker signal · illustrative</text>
        </svg>
      </div>
      <dl className="grid grid-cols-2 border-t border-ink/10 bg-paper-2/50">
        <div className="border-r border-ink/10 px-5 py-5 sm:px-7">
          <dt className="text-3xl font-medium tracking-tight text-teal-deep">200+</dt>
          <dd className="mt-1 text-[13px] leading-relaxed text-ink/65">Cell phenotypes & functional states by panel design</dd>
        </div>
        <div className="px-5 py-5 sm:px-7">
          <dt className="text-3xl font-medium tracking-tight text-teal-deep">&gt;25</dt>
          <dd className="mt-1 text-[13px] leading-relaxed text-ink/65">Lineage-resolved cell-interaction types by panel design</dd>
        </div>
      </dl>
      <figcaption className="border-t border-ink/10 px-5 py-3 text-[11px] leading-relaxed text-ink/55 sm:px-7">
        Illustrative data layout, not experimental results. Marker selection, phenotyping depth and interaction resolution depend on the study panel.
      </figcaption>
    </figure>
  );
}
