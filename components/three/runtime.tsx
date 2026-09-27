"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

/** Motion clock that freezes while paused (idle motion only; scroll state is separate). */
export function useMotionTime(paused: boolean) {
  const t = useRef(0);
  useFrame((_, dt) => {
    if (!paused) t.current += Math.min(dt, 0.05);
  });
  return t;
}

/**
 * Lifecycle guard: reports the first rendered frame, reports context loss, and lowers the
 * pixel ratio step by step when the average frame time stays above ~33 ms (below 30 fps).
 */
export function Runtime({
  onReady,
  onFail,
  maxDpr,
}: {
  onReady: () => void;
  onFail: () => void;
  maxDpr: number;
}) {
  const gl = useThree((s) => s.gl);
  const setDpr = useThree((s) => s.setDpr);
  const readyRef = useRef(false);
  const dprRef = useRef(maxDpr);
  const acc = useRef({ sum: 0, n: 0, slow: 0 });

  useEffect(() => {
    const el = gl.domElement;
    const lost = (e: Event) => {
      e.preventDefault();
      onFail();
    };
    el.addEventListener("webglcontextlost", lost);
    return () => el.removeEventListener("webglcontextlost", lost);
  }, [gl, onFail]);

  useFrame((_, dt) => {
    if (!readyRef.current) {
      readyRef.current = true;
      // let the frame reach the screen before revealing the canvas
      requestAnimationFrame(() => onReady());
      return;
    }
    if (document.hidden || dt > 0.25) return; // ignore tab switches / demand-mode gaps
    const a = acc.current;
    a.sum += dt;
    a.n += 1;
    if (a.n >= 90) {
      const avg = a.sum / a.n;
      a.slow = avg > 0.033 ? a.slow + 1 : 0;
      a.sum = 0;
      a.n = 0;
      if (a.slow >= 2 && dprRef.current > 1) {
        dprRef.current = Math.max(1, dprRef.current - 0.5);
        setDpr(dprRef.current);
        a.slow = 0;
      }
    }
  });
  return null;
}

function placeLabel(el: HTMLElement, x: number, y: number, opacity: number) {
  el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  el.style.opacity = opacity.toFixed(3);
}

/** Write screen positions of 3D anchors into absolutely positioned HTML labels (no React state). */
export function useProjectedLabels(
  anchors: MutableRefObject<{ el: HTMLElement | null; pos: THREE.Vector3; opacity: number }[]>,
) {
  const v = useRef(new THREE.Vector3());
  useFrame(({ camera, size }) => {
    for (const a of anchors.current) {
      if (!a.el) continue;
      v.current.copy(a.pos).project(camera);
      const x = (v.current.x * 0.5 + 0.5) * size.width;
      const y = (-v.current.y * 0.5 + 0.5) * size.height;
      placeLabel(a.el, x, y, a.opacity);
    }
  });
}

export function dprCap(mobile: boolean) {
  if (typeof window === "undefined") return 1;
  return Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.75);
}
