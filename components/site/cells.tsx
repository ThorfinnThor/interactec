import { blobPath, membranePoints } from "@/lib/blob";

/**
 * Schematic cell primitives (SVG). Two identities that never rely on colour alone:
 *  - Effector: teal, compact, solid membrane with surface dots.
 *  - Target:   violet, larger, dashed outer envelope with short surface ticks.
 */

export type CellSpec = { cx: number; cy: number; r: number; seed: number };

export function CellDefs({ id }: { id: string }) {
  return (
    <>
      <radialGradient id={`${id}-eff`} cx="38%" cy="34%" r="75%">
        <stop offset="0%" stopColor="#1C5A57" />
        <stop offset="55%" stopColor="#0D2A2D" />
        <stop offset="100%" stopColor="#0A1519" />
      </radialGradient>
      <radialGradient id={`${id}-tgt`} cx="62%" cy="40%" r="78%">
        <stop offset="0%" stopColor="#3B3470" />
        <stop offset="55%" stopColor="#1A1838" />
        <stop offset="100%" stopColor="#0D0F1F" />
      </radialGradient>
      <radialGradient id={`${id}-nuc`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F4F7F4" stopOpacity="0.14" />
        <stop offset="100%" stopColor="#F4F7F4" stopOpacity="0" />
      </radialGradient>
      <pattern id={`${id}-hatch`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
        <line x1="0" y1="0" x2="0" y2="6" stroke="#F4F7F4" strokeWidth="1.1" strokeOpacity="0.75" />
      </pattern>
      <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="10" />
      </filter>
    </>
  );
}

export function EffectorCell({ id, c, detail = true }: { id: string; c: CellSpec; detail?: boolean }) {
  const d = blobPath(c.cx, c.cy, c.r, { seed: c.seed, amp: 0.05, points: detail ? 28 : 14 });
  const dots = detail ? membranePoints(c.cx, c.cy, c.r, Math.round(c.r / 3.2), 5, { seed: c.seed, amp: 0.05 }) : [];
  return (
    <g>
      <path d={d} fill={`url(#${id}-eff)`} />
      <path
        d={blobPath(c.cx + c.r * 0.08, c.cy - c.r * 0.02, c.r * 0.42, { seed: c.seed + 7, amp: 0.08, points: 12 })}
        fill={`url(#${id}-nuc)`}
      />
      <path d={d} fill="none" stroke="#68E4D4" strokeWidth={Math.max(1, c.r / 70)} />
      {dots.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={Math.max(0.9, c.r / 95)} fill="#68E4D4" opacity={0.7} />
      ))}
    </g>
  );
}

export function TargetCell({ id, c, detail = true }: { id: string; c: CellSpec; detail?: boolean }) {
  const d = blobPath(c.cx, c.cy, c.r, { seed: c.seed, amp: 0.045, points: detail ? 28 : 14 });
  const ticks = detail ? membranePoints(c.cx, c.cy, c.r, Math.round(c.r / 3), 2, { seed: c.seed, amp: 0.045 }) : [];
  const len = Math.max(3, c.r / 28);
  return (
    <g>
      <path d={d} fill={`url(#${id}-tgt)`} />
      <path
        d={blobPath(c.cx - c.r * 0.06, c.cy + c.r * 0.04, c.r * 0.4, { seed: c.seed + 11, amp: 0.09, points: 12 })}
        fill={`url(#${id}-nuc)`}
      />
      <path d={d} fill="none" stroke="#A49BE8" strokeWidth={Math.max(1, c.r / 80)} />
      {detail && (
        <path
          d={blobPath(c.cx, c.cy, c.r + Math.max(6, c.r / 14), { seed: c.seed, amp: 0.045 })}
          fill="none"
          stroke="#A49BE8"
          strokeOpacity="0.45"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
      )}
      {ticks.map((p, i) => (
        <line
          key={i}
          x1={p.x}
          y1={p.y}
          x2={Math.round((p.x + Math.cos(p.angle) * len) * 100) / 100}
          y2={Math.round((p.y + Math.sin(p.angle) * len) * 100) / 100}
          stroke="#A49BE8"
          strokeOpacity="0.8"
          strokeWidth="1"
        />
      ))}
    </g>
  );
}

/** Lens-shaped intersection of both membranes, drawn with a hatch (not a colour-only cue). */
export function ContactZone({ id, eff, tgt }: { id: string; eff: CellSpec; tgt: CellSpec }) {
  const effD = blobPath(eff.cx, eff.cy, eff.r, { seed: eff.seed, amp: 0.05 });
  const tgtD = blobPath(tgt.cx, tgt.cy, tgt.r, { seed: tgt.seed, amp: 0.045 });
  return (
    <g>
      <clipPath id={`${id}-clip`}>
        <path d={effD} />
      </clipPath>
      <g clipPath={`url(#${id}-clip)`}>
        <path d={tgtD} fill="#68E4D4" opacity="0.35" filter={`url(#${id}-glow)`} />
        <path d={tgtD} fill={`url(#${id}-hatch)`} />
        <path d={tgtD} fill="none" stroke="#F4F7F4" strokeWidth="1.6" />
      </g>
    </g>
  );
}

/** Place the effector so that it overlaps the target by `overlap` along a direction (deg). */
export function touching(tgt: CellSpec, rEff: number, angleDeg: number, overlap: number, seed: number): CellSpec {
  const a = (angleDeg * Math.PI) / 180;
  const dist = tgt.r + rEff - overlap;
  return {
    cx: Math.round((tgt.cx + Math.cos(a) * dist) * 100) / 100,
    cy: Math.round((tgt.cy + Math.sin(a) * dist) * 100) / 100,
    r: rEff,
    seed,
  };
}
