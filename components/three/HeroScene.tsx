"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import CellMesh, { cellUniforms } from "./CellMesh";
import { createDotMaterial, mulberry32, PALETTE } from "./materials";
import { dprCap, Runtime, useMotionTime, useProjectedLabels } from "./runtime";
import type { SceneProps } from "./WebGLSlot";

const TGT = { pos: new THREE.Vector3(0.45, -0.35, 0), r: 1.35 };
const DIR = new THREE.Vector3(-0.78, 0.58, 0.22).normalize();
const EFF = { pos: TGT.pos.clone().add(DIR.clone().multiplyScalar(1.35 + 0.85 - 0.2)), r: 0.85 };

type Anchor = { el: HTMLElement | null; pos: THREE.Vector3; opacity: number };

function Pair({ paused, anchors }: { paused: boolean; anchors: React.MutableRefObject<Anchor[]> }) {
  const group = useRef<THREE.Group>(null);
  const eff = useRef<THREE.Mesh>(null);
  const tgt = useRef<THREE.Mesh>(null);
  const time = useMotionTime(paused);
  const pointer = useRef({ x: 0, y: 0 });
  const wp = useMemo(() => ({ e: new THREE.Vector3(), t: new THREE.Vector3(), c: new THREE.Vector3() }), []);

  // minimal pointer parallax on fine pointers only
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, dt) => {
    const t = time.current;
    const g = group.current;
    if (!g || !eff.current || !tgt.current) return;
    const k = 1 - Math.exp(-dt * 2.5);
    const rx = paused ? 0 : pointer.current.y * 0.08;
    const ry = paused ? 0 : pointer.current.x * 0.12;
    g.rotation.x += (rx - g.rotation.x) * k;
    g.rotation.y += (ry - 0.18 - g.rotation.y) * k;

    const breathe = Math.sin(t * 0.6) * 0.015;
    eff.current.position.copy(EFF.pos).addScaledVector(DIR, -breathe);
    eff.current.scale.setScalar(EFF.r);
    eff.current.rotation.set(t * 0.05, t * 0.08, 0);
    tgt.current.position.copy(TGT.pos);
    tgt.current.scale.setScalar(TGT.r);
    tgt.current.rotation.set(0, -t * 0.04, t * 0.02);

    eff.current.getWorldPosition(wp.e);
    tgt.current.getWorldPosition(wp.t);
    const ue = cellUniforms(eff.current)!;
    const ut = cellUniforms(tgt.current)!;
    ue.uTime.value = t;
    ut.uTime.value = t;
    ue.uPartner.value.copy(wp.t);
    ue.uPartnerR.value = TGT.r;
    ue.uContact.value = 1;
    ut.uPartner.value.copy(wp.e);
    ut.uPartnerR.value = EFF.r;
    ut.uContact.value = 1;

    // label anchors in world space
    const a = anchors.current;
    wp.c.copy(wp.t).addScaledVector(wp.e.clone().sub(wp.t).normalize(), TGT.r - 0.05);
    a[0].pos.copy(wp.e).add(new THREE.Vector3(-0.2, EFF.r + 0.25, 0));
    a[1].pos.copy(wp.t).add(new THREE.Vector3(0.95, -TGT.r - 0.05, 0));
    a[2].pos.copy(wp.c);
  });

  return (
    <group ref={group}>
      <CellMesh ref={tgt} kind="target" seed={3.1} detail={40} />
      <CellMesh ref={eff} kind="effector" seed={7.4} detail={36} renderOrder={1} />
    </group>
  );
}

function DepthField({ paused }: { paused: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const time = useMotionTime(paused);
  const count = 10;
  const { geo, mat, seeds } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 3);
    const rand = mulberry32(12);
    const kinds = new Float32Array(count);
    const alphas = new Float32Array(count);
    const seeds = Array.from({ length: count }, (_, i) => {
      kinds[i] = i % 3 === 0 ? 1 : 0;
      alphas[i] = 0.22;
      const ang = rand() * Math.PI * 2;
      const rad = 3.2 + rand() * 1.6;
      return {
        x: Math.cos(ang) * rad,
        y: Math.sin(ang) * rad * 0.8,
        z: -3 - rand() * 3,
        s: kinds[i] ? 0.26 : 0.18,
        ph: rand() * 6,
      };
    });
    geo.setAttribute("aKind", new THREE.InstancedBufferAttribute(kinds, 1));
    geo.setAttribute("aAlpha", new THREE.InstancedBufferAttribute(alphas, 1));
    const mat = createDotMaterial();
    return { geo, mat, seeds };
  }, []);
  useEffect(
    () => () => {
      geo.dispose();
      mat.dispose();
    },
    [geo, mat],
  );
  const m = useMemo(() => new THREE.Matrix4(), []);
  useFrame(() => {
    const t = time.current;
    if (!mesh.current) return;
    seeds.forEach((s, i) => {
      m.makeScale(s.s, s.s, s.s).setPosition(s.x + Math.sin(t * 0.2 + s.ph) * 0.08, s.y + Math.cos(t * 0.17 + s.ph) * 0.08, s.z);
      mesh.current!.setMatrixAt(i, m);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return <instancedMesh ref={mesh} args={[geo, mat, count]} frustumCulled={false} />;
}

function LabelProjector({
  anchors,
  els,
}: {
  anchors: React.MutableRefObject<Anchor[]>;
  els: React.MutableRefObject<(HTMLSpanElement | null)[]>;
}) {
  useFrame(() => {
    anchors.current.forEach((a, i) => (a.el = els.current[i]));
  });
  useProjectedLabels(anchors);
  return null;
}

function Reticle() {
  const { geo, mat } = useMemo(
    () => ({
      geo: new THREE.RingGeometry(1.98, 1.99, 128),
      mat: new THREE.MeshBasicMaterial({ color: PALETTE.paper, transparent: true, opacity: 0.08 }),
    }),
    [],
  );
  useEffect(
    () => () => {
      geo.dispose();
      mat.dispose();
    },
    [geo, mat],
  );
  return <mesh geometry={geo} material={mat} position={[0, 0, -0.8]} />;
}

export default function HeroScene({ active, paused, onReady, onFail }: SceneProps) {
  const labelEls = useRef<(HTMLSpanElement | null)[]>([]);
  const anchors = useRef<Anchor[]>(
    [0, 1, 2].map(() => ({ el: null, pos: new THREE.Vector3(), opacity: 1 })),
  );
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  const maxDpr = dprCap(mobile);

  return (
    <div className="absolute inset-0">
      <Canvas
        frameloop={active ? "always" : "demand"}
        dpr={[1, maxDpr]}
        camera={{ position: [0.15, 0, 8.9], fov: 30, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        flat
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Runtime onReady={onReady} onFail={onFail} maxDpr={maxDpr} />
        <Reticle />
        <DepthField paused={paused} />
        <Pair paused={paused} anchors={anchors} />
        <LabelProjector anchors={anchors} els={labelEls} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 font-mono text-[11px] uppercase tracking-[0.14em]">
        <span ref={(el) => void (labelEls.current[0] = el)} className="absolute left-0 top-0" style={{ opacity: 0 }}>
          <span className="absolute -translate-x-1/2 -translate-y-full whitespace-nowrap text-teal">Effector</span>
        </span>
        <span ref={(el) => void (labelEls.current[1] = el)} className="absolute left-0 top-0" style={{ opacity: 0 }}>
          <span className="absolute whitespace-nowrap text-violet">Target</span>
        </span>
        <span ref={(el) => void (labelEls.current[2] = el)} className="absolute left-0 top-0" style={{ opacity: 0 }}>
          <span className="absolute -left-[5px] -top-[5px] h-2.5 w-2.5 rounded-full border border-paper" />
          <span className="absolute left-1 top-[-1px] h-px w-12 origin-left -rotate-[40deg] bg-paper/60" />
          <span className="absolute left-10 top-[-44px] whitespace-nowrap text-paper">Contact zone</span>
        </span>
      </div>
    </div>
  );
}
