import * as THREE from "three";
import { CELL_FRAG, CELL_VERT, DOT_FRAG, DOT_VERT } from "./shaders";

export const PALETTE = {
  teal: new THREE.Color("#68E4D4"),
  violet: new THREE.Color("#A49BE8"),
  effDeep: new THREE.Color("#12403d"),
  tgtDeep: new THREE.Color("#262058"),
  paper: new THREE.Color("#F4F7F4"),
};

export type CellKind = "effector" | "target";

export function createCellMaterial(kind: CellKind, seed: number) {
  const eff = kind === "effector";
  return new THREE.ShaderMaterial({
    vertexShader: CELL_VERT,
    fragmentShader: CELL_FRAG,
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uAmp: { value: eff ? 0.05 : 0.035 },
      uFreq: { value: eff ? 1.6 : 1.3 },
      uSeed: { value: seed },
      uColor: { value: (eff ? PALETTE.teal : PALETTE.violet).clone() },
      uDeep: { value: (eff ? PALETTE.effDeep : PALETTE.tgtDeep).clone() },
      uPaper: { value: PALETTE.paper.clone() },
      uKind: { value: eff ? 0 : 1 },
      uPartner: { value: new THREE.Vector3(999, 999, 999) },
      uPartnerR: { value: 1 },
      uContact: { value: 0 },
      uOpacity: { value: 1 },
    },
  });
}

export function createDotMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader: DOT_VERT,
    fragmentShader: DOT_FRAG,
    transparent: true,
    depthWrite: true,
    uniforms: {
      uEff: { value: PALETTE.teal.clone() },
      uTgt: { value: PALETTE.violet.clone() },
      uEffDeep: { value: PALETTE.effDeep.clone() },
      uTgtDeep: { value: PALETTE.tgtDeep.clone() },
      uFlat: { value: 0 },
      uOpacity: { value: 1 },
    },
  });
}

/** Shared geometries (created lazily, reused by every scene). */
let cellGeo: Record<string, THREE.BufferGeometry> = {};
export function cellGeometry(detail: number) {
  const key = String(detail);
  if (!cellGeo[key]) cellGeo[key] = new THREE.IcosahedronGeometry(1, detail);
  return cellGeo[key];
}
export function disposeSharedGeometries() {
  Object.values(cellGeo).forEach((g) => g.dispose());
  cellGeo = {};
}

/* ---------- math helpers ---------- */

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const smooth = (x: number) => {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
};
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function gauss(rand: () => number) {
  const u = Math.max(rand(), 1e-9);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
}
