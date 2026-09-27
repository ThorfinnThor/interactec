"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { story } from "@/lib/motion-store";
import CellMesh, { cellUniforms } from "./CellMesh";
import { clamp01, createDotMaterial, gauss, lerp, mulberry32, PALETTE, smooth } from "./materials";
import { dprCap, Runtime, useMotionTime, useProjectedLabels } from "./runtime";
import type { SceneProps } from "./WebGLSlot";

/*
 * One continuous scene driven by story progress p ∈ [0, 3]:
 *   0 Encounter → 1 Engage → 2 Read out → 3 Compare
 * Transitions happen between chapter centres; each state is fully resolved when its
 * chapter is centred in the viewport. The same objects travel through all states:
 * field cells and doublets become singlet / interaction events in a two-marker plot,
 * and the interaction events re-order into comparison columns.
 */

/* ------------------------------ layout ------------------------------ */

const T0 = new THREE.Vector3(0.3, -0.2, 0);
const R_T = 1.0;
const R_E = 0.62;
const DIR = new THREE.Vector3(-0.8, 0.56, 0.3).normalize();
const E_CONTACT = T0.clone().addScaledVector(DIR, R_T + R_E - 0.12);
const E_APART = T0.clone().addScaledVector(DIR, R_T + R_E + 1.1).add(new THREE.Vector3(-0.2, 0.25, 0.3));
const CONTACT_PT = T0.clone().addScaledVector(DIR, R_T - 0.04);

const Q = new THREE.Vector2(1.45, 1.35); // double-positive quadrant centre (plot plane)
const COL_X = [-2.1, -0.7, 0.7, 2.1];
const LEVELS = [0.18, 0.52, 0.86, 0.38]; // illustrative only
const BASE_Y = -2.3;
const SPAN_Y = 4.2;

const N_EFF = 30;
const N_TGT = 22;
const N_PAIR = 20;
const COUNT = N_EFF + N_TGT + N_PAIR * 2;

type Inst = {
  kind: 0 | 1;
  role: "eff" | "tgt" | "pairE" | "pairT";
  field: THREE.Vector3;
  fieldR: number;
  plot: THREE.Vector3;
  plotR: number;
  col: THREE.Vector3 | null;
  phase: number;
  order: number;
  proximity: boolean;
};

function buildInstances(): Inst[] {
  const rand = mulberry32(31);
  const out: Inst[] = [];
  const fieldPos = () => {
    // shell around the focal pair, biased behind it and to the sides
    for (;;) {
      const v = new THREE.Vector3((rand() * 2 - 1) * 9, (rand() * 2 - 1) * 6, -2 - rand() * 12);
      if (Math.abs(v.x) > 2.6 || Math.abs(v.y) > 2.4 || v.z < -5) return v;
    }
  };
  for (let i = 0; i < N_EFF; i++) {
    out.push({
      kind: 0,
      role: "eff",
      field: i === 0 ? new THREE.Vector3(1.15, 1.8, -0.3) : fieldPos(),
      fieldR: 0.26,
      plot: new THREE.Vector3(1.4 + gauss(rand) * 0.42, -2.0 + gauss(rand) * 0.26, 0),
      plotR: 0.065,
      col: null,
      phase: rand() * 6.28,
      order: rand(),
      proximity: i === 0,
    });
  }
  for (let i = 0; i < N_TGT; i++) {
    out.push({
      kind: 1,
      role: "tgt",
      field: i === 0 ? new THREE.Vector3(1.15 + 0.26 + 0.38 + 0.12, 1.65, -0.35) : fieldPos(),
      fieldR: 0.38,
      plot: new THREE.Vector3(-1.75 + gauss(rand) * 0.26, 1.3 + gauss(rand) * 0.45, 0),
      plotR: 0.08,
      col: null,
      phase: rand() * 6.28,
      order: rand(),
      proximity: i === 0,
    });
  }
  for (let i = 0; i < N_PAIR; i++) {
    const base = fieldPos();
    const d = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize();
    const q = new THREE.Vector3(Q.x + gauss(rand) * 0.34, Q.y + gauss(rand) * 0.3, 0);
    const c = i % 4;
    const rep = Math.floor(i / 4);
    const jitter = [0.035, -0.045, 0.012, -0.02, 0.05][rep];
    const colPos = new THREE.Vector3(COL_X[c] + (rep - 2) * 0.13, BASE_Y + (LEVELS[c] + jitter) * SPAN_Y, 0);
    const phase = rand() * 6.28;
    const order = rand();
    out.push({
      kind: 1,
      role: "pairT",
      field: base,
      fieldR: 0.36,
      plot: q.clone().add(new THREE.Vector3(0.05, -0.04, 0)),
      plotR: 0.08,
      col: colPos.clone().add(new THREE.Vector3(0.045, -0.035, 0)),
      phase,
      order,
      proximity: false,
    });
    out.push({
      kind: 0,
      role: "pairE",
      field: base.clone().addScaledVector(d, 0.36 + 0.24 - 0.04),
      fieldR: 0.24,
      plot: q.clone().add(new THREE.Vector3(-0.05, 0.04, 0)),
      plotR: 0.065,
      col: colPos.clone().add(new THREE.Vector3(-0.045, 0.035, 0)),
      phase,
      order,
      proximity: false,
    });
  }
  return out;
}

/* ------------------------------ camera ------------------------------ */

const CAM = {
  enc: { pos: new THREE.Vector3(1.2, 1.0, 12.5), look: new THREE.Vector3(-0.2, 0.2, -1.2) },
  eng: { pos: new THREE.Vector3(-1.4, 0.8, 7.4), look: new THREE.Vector3(0.1, 0.25, 0) },
  plot: { pos: new THREE.Vector3(0, 0, 11.6), look: new THREE.Vector3(0, 0, 0) },
};

/* ------------------------------ scene ------------------------------ */

type Anchor = { el: HTMLElement | null; pos: THREE.Vector3; opacity: number };

function Choreography({ paused, els }: { paused: boolean; els: MutableRefObject<(HTMLElement | null)[]> }) {
  const anchors = useRef<Anchor[]>(LABELS.map(() => ({ el: null, pos: new THREE.Vector3(), opacity: 0 })));
  const invalidate = useThree((s) => s.invalidate);
  const time = useMotionTime(paused);
  const p = useRef(story.target);
  const eff = useRef<THREE.Mesh>(null);
  const tgt = useRef<THREE.Mesh>(null);
  const dots = useRef<THREE.InstancedMesh>(null);
  const plotAxes = useRef<THREE.LineSegments>(null);
  const cmpAxes = useRef<THREE.LineSegments>(null);

  const inst = useMemo(() => buildInstances(), []);
  const { geo, mat } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 3);
    geo.setAttribute("aKind", new THREE.InstancedBufferAttribute(new Float32Array(inst.map((i) => i.kind)), 1));
    geo.setAttribute("aAlpha", new THREE.InstancedBufferAttribute(new Float32Array(COUNT).fill(1), 1));
    return { geo, mat: createDotMaterial() };
  }, [inst]);

  const { plotGeo, cmpGeo, lineMatA, lineMatB } = useMemo(() => {
    const seg = (pts: number[][]) =>
      new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(pts.flat(), 3));
    const dashes = (x0: number, y0: number, x1: number, y1: number, n: number) => {
      const out: number[][] = [];
      for (let i = 0; i < n; i++) {
        const a = i / n;
        const b = (i + 0.5) / n;
        out.push([lerp(x0, x1, a), lerp(y0, y1, a), 0], [lerp(x0, x1, b), lerp(y0, y1, b), 0]);
      }
      return out;
    };
    const plotGeo = seg([
      [-3, -3, 0], [3, -3, 0],
      [-3, -3, 0], [-3, 3, 0],
      ...dashes(-0.1, -3, -0.1, 3, 28),
      ...dashes(-3, -0.35, 3, -0.35, 28),
    ]);
    const cmp: number[][] = [
      [-2.95, BASE_Y - 0.3, 0], [2.95, BASE_Y - 0.3, 0],
      [-2.95, BASE_Y - 0.3, 0], [-2.95, BASE_Y + SPAN_Y + 0.2, 0],
    ];
    COL_X.forEach((x, i) => {
      const y = BASE_Y + LEVELS[i] * SPAN_Y;
      cmp.push([x - 0.42, y, 0], [x + 0.42, y, 0]);
    });
    const cmpGeo = seg(cmp);
    const mk = () => new THREE.LineBasicMaterial({ color: PALETTE.paper, transparent: true, opacity: 0 });
    return { plotGeo, cmpGeo, lineMatA: mk(), lineMatB: mk() };
  }, []);

  useEffect(() => {
    story.invalidate = invalidate;
    return () => {
      story.invalidate = null;
      [geo, mat, plotGeo, cmpGeo, lineMatA, lineMatB].forEach((o) => o.dispose());
    };
  }, [invalidate, geo, mat, plotGeo, cmpGeo, lineMatA, lineMatB]);

  const tmp = useMemo(
    () => ({
      m: new THREE.Matrix4(),
      q: new THREE.Quaternion(),
      s: new THREE.Vector3(),
      v: new THREE.Vector3(),
      w: new THREE.Vector3(),
      look: new THREE.Vector3(),
      pairOffset: new THREE.Vector3(),
      we: new THREE.Vector3(),
      wt: new THREE.Vector3(),
    }),
    [],
  );

  useFrame(({ camera }, dt) => {
    // damped progress (shared scroll progress drives everything below)
    const target = story.target;
    const k = 1 - Math.exp(-Math.min(dt, 0.1) * 5);
    p.current += (target - p.current) * k;
    if (Math.abs(target - p.current) > 0.0005) invalidate();
    const P = p.current;
    const t = time.current;

    const a = smooth(P); // encounter → engage
    const b = smooth(P - 1); // engage → read out
    const c = smooth(P - 2); // read out → compare
    const contact = smooth((P - 0.55) / 0.45) * (1 - b);

    /* camera */
    const cp = tmp.v.copy(CAM.enc.pos).lerp(CAM.eng.pos, a).lerp(CAM.plot.pos, b);
    const orbit = (1 - b) * a * 0.35 + (paused ? 0 : Math.sin(t * 0.15) * 0.08 * (1 - b));
    cp.applyAxisAngle(new THREE.Vector3(0, 1, 0), orbit * 0.4 * (1 - b));
    camera.position.copy(cp);
    tmp.look.copy(CAM.enc.look).lerp(CAM.eng.look, a).lerp(CAM.plot.look, b);
    camera.lookAt(tmp.look);

    /* focal pair: approaches, engages, then shrinks into the double-positive quadrant */
    const pairScale = lerp(1, 0.085, b);
    tmp.pairOffset.set(lerp(0, Q.x - T0.x * 0.085, b), lerp(0, Q.y - T0.y * 0.085, b), 0);
    const pairOpacity = 1 - smooth(c / 0.5);
    if (eff.current && tgt.current) {
      const ep = tmp.w.copy(E_APART).lerp(E_CONTACT, a);
      eff.current.position.copy(ep).multiplyScalar(pairScale).add(tmp.pairOffset);
      eff.current.scale.setScalar(R_E * pairScale);
      eff.current.rotation.set(t * 0.05, t * 0.07, 0);
      tgt.current.position.copy(T0).multiplyScalar(pairScale).add(tmp.pairOffset);
      tgt.current.scale.setScalar(R_T * pairScale);
      tgt.current.rotation.set(0, -t * 0.04, t * 0.02);
      eff.current.visible = tgt.current.visible = pairOpacity > 0.01;

      const ue = cellUniforms(eff.current)!;
      const ut = cellUniforms(tgt.current)!;
      eff.current.getWorldPosition(tmp.we);
      tgt.current.getWorldPosition(tmp.wt);
      ue.uTime.value = ut.uTime.value = t;
      ue.uPartner.value.copy(tmp.wt);
      ue.uPartnerR.value = R_T * pairScale;
      ut.uPartner.value.copy(tmp.we);
      ut.uPartnerR.value = R_E * pairScale;
      ue.uContact.value = ut.uContact.value = contact;
      ue.uOpacity.value = ut.uOpacity.value = pairOpacity;
    }

    /* field → plot → columns */
    const m = dots.current;
    if (m) {
      const alpha = m.geometry.getAttribute("aAlpha") as THREE.InstancedBufferAttribute;
      const drift = 1 - b;
      inst.forEach((it, i) => {
        const bi = smooth((P - 1 - it.order * 0.3) / 0.7);
        const ci = smooth((P - 2 - it.order * 0.3) / 0.7);
        const pos = tmp.v.copy(it.field);
        pos.x += Math.sin(t * 0.25 + it.phase) * 0.12 * drift;
        pos.y += Math.cos(t * 0.21 + it.phase) * 0.12 * drift;
        pos.lerp(it.plot, bi);
        let r = lerp(it.fieldR, it.plotR, bi);
        let al = 1;
        // Engage: dim the field except the "proximity only" pair
        const dim = a * (1 - b);
        const depthFade = clamp01(1 + (it.field.z + 1) / 13) * 0.75; // distant cells recede
        al = lerp(lerp(depthFade, 1, bi), it.proximity ? 1 : 0.14, dim);
        if (it.col) {
          pos.lerp(it.col, ci);
        } else {
          al *= 1 - ci;
          r *= 1 - ci * 0.6;
        }
        alpha.setX(i, al);
        tmp.m.compose(pos, tmp.q, tmp.s.setScalar(Math.max(r, 0.0001)));
        m.setMatrixAt(i, tmp.m);
      });
      m.instanceMatrix.needsUpdate = true;
      alpha.needsUpdate = true;
      (m.material as THREE.ShaderMaterial).uniforms.uFlat.value = b;
    }

    const oA = 0.5 * b * (1 - c);
    const oB = 0.6 * c;
    if (plotAxes.current) {
      (plotAxes.current.material as THREE.LineBasicMaterial).opacity = oA;
      plotAxes.current.visible = oA > 0.005;
    }
    if (cmpAxes.current) {
      (cmpAxes.current.material as THREE.LineBasicMaterial).opacity = oB;
      cmpAxes.current.visible = oB > 0.005;
    }

    /* labels (HTML, projected) */
    const L = anchors.current;
    L.forEach((l, i) => (l.el = els.current[i]));
    const bell = (x: number) => clamp01(1 - Math.abs(x));
    L[0].pos.set(1.6, 2.35, -0.3);
    L[0].opacity = bell(P - 1) * (1 - b);
    L[1].pos.copy(CONTACT_PT);
    L[1].opacity = smooth((P - 0.7) / 0.3) * (1 - smooth((P - 1) / 0.35));
    L[2].pos.set(3, -3.1, 0);
    L[3].pos.set(-3.35, 1.4, 0);
    L[4].pos.set(3, 2.5, 0);
    const plotLabel = smooth((P - 1.6) / 0.4) * (1 - c);
    L[2].opacity = L[3].opacity = L[4].opacity = plotLabel;
    L[5].pos.set(-2.95, BASE_Y + SPAN_Y + 0.75, 0);
    L[5].opacity = smooth((P - 2.5) / 0.5);
    COL_X.forEach((x, i) => {
      L[6 + i].pos.set(x, BASE_Y - 0.55, 0);
      L[6 + i].opacity = L[5].opacity;
    });
    L[10].pos.copy(E_APART).add(new THREE.Vector3(0, R_E + 0.5, 0));
    L[10].opacity = 1 - smooth(P / 0.6);
    L[11].pos.copy(T0).add(new THREE.Vector3(0.85, -R_T - 0.35, 0));
    L[11].opacity = 1 - smooth(P / 0.6);
  });

  useProjectedLabels(anchors);

  return (
    <>
      <instancedMesh ref={dots} args={[geo, mat, COUNT]} frustumCulled={false} />
      <CellMesh ref={tgt} kind="target" seed={3.1} detail={32} />
      <CellMesh ref={eff} kind="effector" seed={7.4} detail={28} renderOrder={1} />
      <lineSegments ref={plotAxes} geometry={plotGeo} material={lineMatA} />
      <lineSegments ref={cmpAxes} geometry={cmpGeo} material={lineMatB} />
    </>
  );
}

const LABELS: { text: string[]; cls: string; place: string }[] = [
  { text: ["Proximity only"], cls: "text-mist", place: "-translate-x-1/2" },
  { text: ["Engaged · contact zone"], cls: "text-paper", place: "-translate-x-full pr-4 pt-6" },
  { text: ["Effector marker →"], cls: "text-teal", place: "-translate-x-full pt-2" },
  { text: ["Target marker →"], cls: "text-violet", place: "origin-top-left -rotate-90" },
  { text: ["Both markers · one event"], cls: "text-paper", place: "-translate-x-full" },
  {
    text: ["Interaction frequency by condition", "Illustrative data — not experimental results"],
    cls: "text-paper",
    place: "-translate-y-full",
  },
  { text: ["Control"], cls: "text-paper", place: "-translate-x-1/2" },
  { text: ["Cand. A"], cls: "text-paper", place: "-translate-x-1/2" },
  { text: ["Cand. B"], cls: "text-paper", place: "-translate-x-1/2" },
  { text: ["Cand. C"], cls: "text-paper", place: "-translate-x-1/2" },
  { text: ["Effector"], cls: "text-teal", place: "-translate-x-1/2 -translate-y-full" },
  { text: ["Target"], cls: "text-violet", place: "" },
];

export default function StoryScene({ active, paused, onReady, onFail }: SceneProps) {
  const els = useRef<(HTMLElement | null)[]>([]);
  const maxDpr = dprCap(false);

  return (
    <div className="absolute inset-0">
      <Canvas
        frameloop={active ? "always" : "demand"}
        dpr={[1, maxDpr]}
        camera={{ position: [1.2, 1, 12.5], fov: 35, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        flat
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Runtime onReady={onReady} onFail={onFail} maxDpr={maxDpr} />
        <Choreography paused={paused} els={els} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 font-mono text-[11px] uppercase tracking-[0.12em]">
        {LABELS.map((l, i) => (
          <span
            key={l.text[0]}
            ref={(el) => void (els.current[i] = el)}
            className="absolute left-0 top-0"
            style={{ opacity: 0 }}
          >
            <span className={`absolute left-0 top-0 block whitespace-nowrap ${l.place} ${l.cls}`}>
              {l.text.map((t, j) => (
                <span key={t} className={`block ${j === 1 ? "mt-1 font-medium" : ""}`}>
                  {t}
                </span>
              ))}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
