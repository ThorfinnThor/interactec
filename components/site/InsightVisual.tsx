import type { Insight } from "@/lib/insights";

export default function InsightVisual({ variant }: { variant: Insight["visual"] }) {
  return (
    <div
      className="relative min-h-[260px] overflow-hidden rounded-2xl border border-paper/12 bg-ink-2 sm:min-h-[320px]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(104,228,212,0.08),transparent_58%)]" />
      {variant === "doublets" && <Doublets />}
      {variant === "engagement" && <Engagement />}
      {variant === "fcs" && <Fcs />}
      {variant === "panel" && <Panel />}
    </div>
  );
}

function Cell({
  className,
  label,
}: {
  className: string;
  label?: string;
}) {
  return (
    <div className={`absolute rounded-full border ${className}`}>
      <div className="absolute inset-[18%] rounded-full border border-white/10" />
      {label && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/80">
          {label}
        </span>
      )}
    </div>
  );
}

function Doublets() {
  return (
    <>
      <Cell className="left-[12%] top-[27%] h-28 w-28 border-teal/60 bg-teal/15 sm:h-36 sm:w-36" label="CD3" />
      <Cell className="left-[34%] top-[36%] h-32 w-32 border-violet/60 bg-violet/15 sm:h-40 sm:w-40" label="CD19" />
      <div className="absolute right-[8%] top-[18%] h-[64%] w-px bg-paper/12" />
      <div className="absolute right-[10%] top-1/2 grid -translate-y-1/2 gap-4 font-mono text-[10px] uppercase tracking-[0.12em] text-mist sm:right-[14%]">
        <span>scatter</span>
        <span className="text-teal">lineage</span>
        <span className="text-violet">condition</span>
      </div>
    </>
  );
}

function Engagement() {
  const rows = [78, 42, 66, 24, 52];
  return (
    <div className="absolute inset-0 grid grid-cols-[42%_1fr] items-center gap-6 p-7 sm:p-10">
      <div className="relative h-full">
        <Cell className="left-[4%] top-[26%] h-24 w-24 border-teal/60 bg-teal/15 sm:h-32 sm:w-32" label="T" />
        <Cell className="left-[38%] top-[39%] h-28 w-28 border-violet/60 bg-violet/15 sm:h-36 sm:w-36" label="B" />
        <div className="absolute left-[33%] top-[50%] h-px w-[17%] bg-paper/55" />
      </div>
      <div className="space-y-5">
        {rows.map((width, index) => (
          <div key={width} className="grid grid-cols-[32px_1fr] items-center gap-3">
            <span className="font-mono text-[10px] text-mist">{String(index + 1).padStart(2, "0")}</span>
            <span className="h-2 rounded-full bg-paper/8">
              <span
                className={`block h-full rounded-full ${index === 0 || index === 2 ? "bg-teal" : "bg-violet"}`}
                style={{ width: `${width}%` }}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Fcs() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8">
      <div className="relative w-full max-w-md rounded-xl border border-paper/20 bg-ink p-6 shadow-2xl sm:p-8">
        <div className="flex items-center justify-between border-b border-paper/12 pb-4">
          <span className="font-mono text-xs tracking-[0.12em] text-teal">SAMPLE_01.FCS</span>
          <span className="h-2 w-2 rounded-full bg-teal" />
        </div>
        <div className="mt-6 grid grid-cols-5 gap-2">
          {[18, 72, 45, 88, 35, 63, 28, 94, 56, 78].map((height, index) => (
            <div key={`${height}-${index}`} className="flex h-14 items-end rounded-sm bg-paper/5">
              <span
                className={`w-full rounded-sm ${index % 3 === 0 ? "bg-violet/75" : "bg-teal/70"}`}
                style={{ height: `${height}%` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-5 flex gap-4 font-mono text-[10px] uppercase tracking-[0.1em] text-mist">
          <span>FSC-A</span><span>FSC-H</span><span>Lineage</span><span>Controls</span>
        </div>
      </div>
    </div>
  );
}

function Panel() {
  const colors = ["bg-teal", "bg-violet", "bg-paper/60", "bg-teal/45", "bg-violet/55"];
  return (
    <div className="absolute inset-0 grid grid-cols-[1fr_auto] items-center gap-8 p-8 sm:p-12">
      <div className="grid grid-cols-8 gap-2 sm:grid-cols-10">
        {Array.from({ length: 40 }, (_, index) => (
          <span
            key={index}
            className={`aspect-square rounded-full ${colors[index % colors.length]}`}
            style={{ opacity: 0.5 + ((index * 7) % 5) / 10 }}
          />
        ))}
      </div>
      <div className="hidden border-l border-paper/12 pl-7 text-right sm:block">
        <p className="text-5xl font-medium tracking-tight text-paper">40</p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-teal">parameters</p>
        <p className="mt-8 text-3xl font-medium tracking-tight text-paper">&gt;25</p>
        <p className="mt-2 max-w-28 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-violet">
          lineage-level interaction types
        </p>
      </div>
    </div>
  );
}
