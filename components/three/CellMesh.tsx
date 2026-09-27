"use client";

import { forwardRef, useEffect, useMemo } from "react";
import type * as THREE from "three";
import { cellGeometry, createCellMaterial, type CellKind } from "./materials";

/** One detailed schematic cell. Position/scale/uniforms are driven by the parent scene. */
const CellMesh = forwardRef<THREE.Mesh, { kind: CellKind; seed: number; detail: number; renderOrder?: number }>(
  function CellMesh({ kind, seed, detail, renderOrder = 0 }, ref) {
    const material = useMemo(() => createCellMaterial(kind, seed), [kind, seed]);
    const geometry = useMemo(() => cellGeometry(detail), [detail]);
    useEffect(() => () => material.dispose(), [material]);
    return <mesh ref={ref} geometry={geometry} material={material} renderOrder={renderOrder} />;
  },
);

export default CellMesh;

export function cellUniforms(mesh: THREE.Mesh | null) {
  return mesh ? (mesh.material as THREE.ShaderMaterial).uniforms : null;
}
