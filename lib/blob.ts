/**
 * Deterministic organic outlines for schematic cells.
 * Pure functions: safe to call in Server Components (no randomness at runtime).
 */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r2 = (n: number) => Math.round(n * 100) / 100;
const r1 = (n: number) => Math.round(n * 10) / 10;

export type BlobOptions = {
  seed?: number;
  /** relative radial wobble, 0.03–0.08 looks cellular */
  amp?: number;
  points?: number;
};

/** Radius function of the blob at angle theta. */
function radiusFn(r: number, { seed = 1, amp = 0.05 }: BlobOptions) {
  const rand = mulberry32(seed);
  const harmonics = [2, 3, 5].map((k) => ({
    k,
    phase: rand() * Math.PI * 2,
    weight: (0.4 + rand() * 0.6) / k ** 0.6,
  }));
  const total = harmonics.reduce((s, h) => s + h.weight, 0);
  return (theta: number) =>
    r * (1 + (amp / total) * harmonics.reduce((s, h) => s + h.weight * Math.sin(h.k * theta + h.phase), 0));
}

/** Closed, smooth SVG path (Catmull-Rom → cubic Bézier). */
export function blobPath(cx: number, cy: number, r: number, opts: BlobOptions = {}) {
  const n = opts.points ?? 28;
  const rf = radiusFn(r, opts);
  const pts = Array.from({ length: n }, (_, i) => {
    const t = (i / n) * Math.PI * 2;
    const rr = rf(t);
    return [cx + rr * Math.cos(t), cy + rr * Math.sin(t)] as const;
  });
  let d = `M${r1(pts[0][0])} ${r1(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${r1(c1x)} ${r1(c1y)} ${r1(c2x)} ${r1(c2y)} ${r1(p2[0])} ${r1(p2[1])}`;
  }
  return d + "Z";
}

/** Points just outside/inside the membrane, for surface texture (dots or ticks). */
export function membranePoints(
  cx: number,
  cy: number,
  r: number,
  count: number,
  offset: number,
  opts: BlobOptions = {},
) {
  const rf = radiusFn(r, opts);
  return Array.from({ length: count }, (_, i) => {
    const t = (i / count) * Math.PI * 2 + 0.07;
    const rr = rf(t) + offset;
    return { x: r2(cx + rr * Math.cos(t)), y: r2(cy + rr * Math.sin(t)), angle: t };
  });
}

/** Deterministic scatter of points (for field cells / data clouds). */
export function scatter(count: number, seed: number, fn: (rand: () => number, i: number) => [number, number]) {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => {
    const [x, y] = fn(rand, i);
    return { x: r2(x), y: r2(y) };
  });
}

/** Box–Muller normal sample from a uniform generator. */
export function normal(rand: () => number, mean = 0, sd = 1) {
  const u = Math.max(rand(), 1e-9);
  const v = rand();
  return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
