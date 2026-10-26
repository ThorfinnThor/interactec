"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import CellMesh, { cellUniforms } from "./CellMesh";
import { dprCap, Runtime, useMotionTime } from "./runtime";
import type { SceneProps } from "./WebGLSlot";

type Vec3 = [number, number, number];

function RoundedPart({ size, position, color, radius = 0.08, roughness = 0.4, metalness = 0.3 }: {
  size: Vec3; position: Vec3; color: string; radius?: number; roughness?: number; metalness?: number;
}) {
  const [w, h, d] = size;
  const geometry = useMemo(() => new RoundedBoxGeometry(w, h, d, 4, radius), [w, h, d, radius]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh position={position} geometry={geometry} castShadow receiveShadow>
      <meshPhysicalMaterial color={color} roughness={roughness} metalness={metalness} clearcoat={0.3} clearcoatRoughness={0.35} />
    </mesh>
  );
}

function Curve({ points, color, radius = 0.012, opacity = 1 }: { points: Vec3[]; color: string; radius?: number; opacity?: number }) {
  const geometry = useMemo(() => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))), 48, radius, 6, false), [points, radius]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <mesh geometry={geometry}><meshBasicMaterial color={color} transparent={opacity < 1} opacity={opacity} /></mesh>;
}

const SPECTRA = [0, 1].map((kind) => Array.from({ length: 32 }, (_, index): Vec3 => {
  const x = index / 31;
  const peak = Math.exp(-((x - (kind ? 0.63 : 0.35)) ** 2) / 0.025);
  return [-0.94 + x * 1.87, 0.61 + peak * 0.34, 0.854];
}));

function Instrument() {
  return (
    <group position={[-1.65, -0.05, 0]} rotation={[0.07, -0.36, 0]}>
      <RoundedPart size={[2.85, 3.05, 1.7]} position={[0, 0, 0]} color="#20323f" radius={0.18} roughness={0.38} />
      <RoundedPart size={[2.9, 0.2, 1.75]} position={[0, 1.48, 0]} color="#29414b" radius={0.09} />
      <RoundedPart size={[2.75, 0.18, 1.6]} position={[0, -1.52, 0]} color="#101b28" radius={0.08} />
      <RoundedPart size={[2.47, 0.95, 0.09]} position={[0, 0.72, 0.86]} color="#080d15" radius={0.08} roughness={0.15} />
      <mesh position={[0, 0.72, 0.916]}>
        <planeGeometry args={[2.26, 0.73]} />
        <meshPhysicalMaterial color="#061319" roughness={0.15} metalness={0.2} clearcoat={1} />
      </mesh>
      {SPECTRA.map((points, index) => <group key={index} position={[0, 0, 0.07]}><Curve points={points} color={index ? "#a49be8" : "#68e4d4"} radius={0.009} /></group>)}
      <RoundedPart size={[1.25, 1.25, 0.08]} position={[-0.57, -0.63, 0.87]} color="#071018" radius={0.08} roughness={0.6} />
      <RoundedPart size={[1.12, 0.13, 0.5]} position={[-0.57, -1.2, 1]} color="#223c43" radius={0.05} />
      <group position={[-0.57, -0.69, 1.04]}>
        <mesh>
          <cylinderGeometry args={[0.13, 0.13, 0.68, 24, 1, true]} />
          <meshPhysicalMaterial color="#a9ece2" transparent opacity={0.22} roughness={0.14} metalness={0.12} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
        <mesh position={[0, -0.14, 0]}><cylinderGeometry args={[0.11, 0.11, 0.33, 24]} /><meshStandardMaterial color="#175b55" transparent opacity={0.7} roughness={0.3} /></mesh>
        <mesh position={[0, 0.36, 0]} castShadow><cylinderGeometry args={[0.16, 0.16, 0.14, 24]} /><meshStandardMaterial color="#4da897" roughness={0.5} metalness={0.3} /></mesh>
        <mesh position={[0, -0.35, 0]}><sphereGeometry args={[0.13, 16, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} /><meshPhysicalMaterial color="#a9ece2" transparent opacity={0.2} side={THREE.DoubleSide} /></mesh>
      </group>
      <mesh position={[0.88, -0.35, 0.9]}><sphereGeometry args={[0.035, 16, 12]} /><meshBasicMaterial color="#68e4d4" /></mesh>
      <mesh position={[0.67, -0.35, 0.9]}><sphereGeometry args={[0.025, 12, 8]} /><meshStandardMaterial color="#404d60" /></mesh>
      {Array.from({ length: 6 }, (_, i) => <RoundedPart key={i} size={[0.66, 0.025, 0.025]} position={[0.7, -0.67 - i * 0.09, 0.862]} color="#080f1a" radius={0.01} />)}
      {[-0.98, 0.98].map(x => <mesh key={x} position={[x, -1.67, 0]} castShadow><cylinderGeometry args={[0.16, 0.18, 0.18, 20]} /><meshStandardMaterial color="#101722" roughness={0.8} /></mesh>)}
    </group>
  );
}

const BEAM_IN: Vec3[] = [[0.7, 0.15, 0], [1.2, 0.15, 0], [2.33, 0.15, 0]];
const BEAM_OUT: Vec3[][] = [-0.65, 0, 0.65].map((dy) => [[2.4, 0.15, 0], [3.05, 0.15 + dy * 0.5, 0.12], [3.66, 0.15 + dy, 0.18]]);
const CONNECTORS: Vec3[][] = [0.6, -0.65].map(y => [[-0.2, y, -0.3], [0.5, y * 1.1, -0.5], [1.4, y * 1.6, -0.5]]);

function FlowCells({ paused }: { paused: boolean }) {
  const cells = useRef<(THREE.Mesh | null)[]>([]);
  const time = useMotionTime(paused);
  const positions = useMemo(() => [
    new THREE.Vector3(2.34, 1.16, 0),
    new THREE.Vector3(2.34, 0.39, 0),
    new THREE.Vector3(2.34, 0.03, 0),
    new THREE.Vector3(2.34, -1.03, 0),
  ], []);
  const radii = [0.14, 0.17, 0.23, 0.18];
  useFrame(() => {
    cells.current.forEach((cell, i) => {
      if (!cell) return;
      const t = time.current;
      cell.position.copy(positions[i]);
      // Gentle drift keeps the same two cells paired at the interrogation point.
      cell.position.y += Math.sin(t * 0.55) * 0.035;
      cell.scale.setScalar(radii[i]);
      cell.rotation.set(t * 0.04, t * (i % 2 ? -0.06 : 0.05), 0);
      const uniforms = cellUniforms(cell)!;
      uniforms.uTime.value = t;
      if (i === 1 || i === 2) {
        uniforms.uPartner.value.copy(positions[i === 1 ? 2 : 1]);
        uniforms.uPartner.value.y += Math.sin(t * 0.55) * 0.035;
        uniforms.uPartnerR.value = radii[i === 1 ? 2 : 1];
        uniforms.uContact.value = 1;
      }
    });
  });
  return <>{positions.map((_, i) => <CellMesh key={i} ref={el => void (cells.current[i] = el)} kind={i === 0 || i === 1 ? "effector" : "target"} seed={5 + i * 2.1} detail={14} />)}</>;
}

function OpticalReadout({ paused }: { paused: boolean }) {
  return (
    <group>
      <mesh position={[2.34, 0, 0]}>
        <cylinderGeometry args={[0.37, 0.37, 3.28, 40, 1, true]} />
        <meshPhysicalMaterial color="#80c2c0" roughness={0.17} metalness={0.08} transparent opacity={0.13} clearcoat={1} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {[-1.64, 1.64].map(y => <mesh key={y} position={[2.34, y, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.36, 0.025, 8, 48]} /><meshStandardMaterial color="#69918f" roughness={0.32} metalness={0.55} /></mesh>)}
      <mesh position={[0.84, 0.15, 0]} rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.18, 0.22, 0.4, 24]} /><meshStandardMaterial color="#344756" metalness={0.6} roughness={0.3} /></mesh>
      <mesh position={[1.05, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.13, 0.13, 0.05, 24]} /><meshBasicMaterial color="#68e4d4" /></mesh>
      <Curve points={BEAM_IN} color="#68e4d4" radius={0.014} opacity={0.75} />
      <Curve points={BEAM_IN} color="#68e4d4" radius={0.065} opacity={0.06} />
      {BEAM_OUT.map((points, i) => <Curve key={i} points={points} color={i === 1 ? "#68e4d4" : "#a49be8"} radius={0.009} opacity={0.6} />)}
      {CONNECTORS.map((points, i) => <Curve key={i} points={points} color="#b5c0ca" radius={0.005} opacity={0.15} />)}
      <FlowCells paused={paused} />
      <pointLight position={[2.1, 0.15, 0.6]} color="#68e4d4" intensity={0.45} distance={2} />
    </group>
  );
}

function CytometerWorld({ paused }: { paused: boolean }) {
  return (
    <>
      <ambientLight intensity={0.65} color="#b5c0ca" />
      <directionalLight position={[-3, 5, 5]} intensity={3.8} color="#c7ddd9" castShadow shadow-mapSize={[512, 512]} shadow-radius={5} shadow-camera-left={-5} shadow-camera-right={5} shadow-camera-top={5} shadow-camera-bottom={-5} shadow-normalBias={0.025} />
      <directionalLight position={[4, 1, 2]} intensity={2.2} color="#a49be8" />
      <pointLight position={[-3, 1.5, -1]} intensity={9} distance={9} color="#68e4d4" />
      <Instrument />
      <OpticalReadout paused={paused} />
      <mesh position={[-1, -1.84, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[12, 10]} /><shadowMaterial transparent opacity={0.4} /></mesh>
    </>
  );
}

export default function CytometerScene({ active, paused, onReady, onFail }: SceneProps) {
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  const maxDpr = dprCap(mobile);
  return (
    <div className="absolute inset-0">
      <Canvas frameloop={active ? "always" : "demand"} dpr={[1, maxDpr]} shadows={{ type: THREE.PCFShadowMap }} camera={{ position: [0, 0.35, 10.6], fov: 29, near: 0.1, far: 40 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} flat onCreated={({ gl }) => gl.setClearColor(0, 0)}>
        <Runtime onReady={onReady} onFail={onFail} maxDpr={maxDpr} />
        <CytometerWorld paused={paused} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 font-mono text-[clamp(8px,1.75cqw,16px)] uppercase tracking-[0.12em] text-mist">
        <span className="absolute left-[9%] top-[5%]">Flow cytometer</span>
        <span className="absolute left-[17%] bottom-[6%] text-teal">Sample</span>
        <span className="absolute right-[8%] top-[5%] text-violet">Magnified readout</span>
        <span className="absolute right-[7%] bottom-[6%]">Single cells + cell pairs</span>
      </div>
    </div>
  );
}
