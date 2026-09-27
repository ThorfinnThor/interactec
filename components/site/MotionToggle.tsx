"use client";

import { setPaused, usePaused, useReducedMotion } from "@/lib/motion-store";

/** Pause / resume continuous decorative motion in all 3D scenes. Hidden when the OS asks for reduced motion. */
export default function MotionToggle({ className = "" }: { className?: string }) {
  const paused = usePaused();
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <button
      type="button"
      aria-pressed={paused}
      onClick={() => setPaused(!paused)}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full font-mono text-[11px] uppercase tracking-[0.14em] text-mist transition-colors hover:text-paper ${className}`}
    >
      <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true" fill="currentColor">
        {paused ? <path d="M3 1.5v9l7-4.5z" /> : <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" />}
      </svg>
      {paused ? "Resume motion" : "Pause motion"}
    </button>
  );
}
