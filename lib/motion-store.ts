"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny shared store for motion preferences and scroll progress.
 * - `paused`: user-controlled pause for continuous decorative motion (React-subscribed).
 * - `story`: continuous story progress 0..4, written on scroll, read inside the render
 *   loop only (never triggers React renders).
 */

type Listener = () => void;
const listeners = new Set<Listener>();

let paused = false;
try {
  paused = typeof window !== "undefined" && window.localStorage.getItem("ia-motion-paused") === "1";
} catch {
  /* storage unavailable */
}

export const story = { target: 0, invalidate: null as null | (() => void) };

export function setPaused(v: boolean) {
  paused = v;
  try {
    window.localStorage.setItem("ia-motion-paused", v ? "1" : "0");
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

export function getPaused() {
  return paused;
}

function subscribe(l: Listener) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function usePaused() {
  return useSyncExternalStore(subscribe, getPaused, () => false);
}

/* ---------- environment ---------- */

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useReducedMotion() {
  return useSyncExternalStore(
    (l) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", l);
      return () => mq.removeEventListener("change", l);
    },
    prefersReducedMotion,
    () => true, // server: assume reduced → render poster first
  );
}

let webglCache: boolean | null = null;
export function hasWebGL() {
  if (webglCache !== null) return webglCache;
  try {
    const c = document.createElement("canvas");
    webglCache = !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    webglCache = false;
  }
  return webglCache;
}
