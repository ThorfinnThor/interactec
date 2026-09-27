"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ComponentType, type ReactNode } from "react";
import { hasWebGL, usePaused, useReducedMotion } from "@/lib/motion-store";

export type SceneProps = {
  active: boolean; // on screen and not paused → continuous rendering
  paused: boolean;
  onReady: () => void;
  onFail: () => void;
};

function useMinWidth(px: number) {
  return useSyncExternalStore(
    (l) => {
      const mq = window.matchMedia(`(min-width: ${px}px)`);
      mq.addEventListener("change", l);
      return () => mq.removeEventListener("change", l);
    },
    () => window.matchMedia(`(min-width: ${px}px)`).matches,
    () => false,
  );
}

/**
 * Progressive WebGL: the poster (SVG) is always rendered first and stays in the DOM.
 * The scene is loaded after the page is idle, only if WebGL exists, motion is allowed and
 * the viewport qualifies. It fades in after its first frame; on context loss or error the
 * poster simply stays visible.
 */
export default function WebGLSlot({
  poster,
  load,
  minWidth = 0,
  className = "",
}: {
  poster: ReactNode;
  load: () => Promise<{ default: ComponentType<SceneProps> }>;
  minWidth?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const paused = usePaused();
  const wide = useMinWidth(minWidth);
  const [Scene, setScene] = useState<ComponentType<SceneProps> | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(false);

  const eligible = !reduced && wide && !failed;

  // lazy-load the scene module once eligible and the browser is idle
  useEffect(() => {
    if (!eligible || Scene) return;
    if (!hasWebGL()) {
      queueMicrotask(() => setFailed(true));
      return;
    }
    let cancelled = false;
    const start = () =>
      load()
        .then((m) => !cancelled && setScene(() => m.default))
        .catch(() => !cancelled && setFailed(true));
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const id = w.requestIdleCallback ? w.requestIdleCallback(start, { timeout: 1500 }) : window.setTimeout(start, 300);
    return () => {
      cancelled = true;
      if (!w.requestIdleCallback) window.clearTimeout(id);
    };
  }, [eligible, Scene, load]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showScene = eligible && Scene;
  const sceneVisible = showScene && ready;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        className="transition-opacity duration-500 motion-reduce:transition-none"
        style={{ opacity: sceneVisible ? 0 : 1 }}
      >
        {poster}
      </div>
      {showScene && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: sceneVisible ? 1 : 0 }}
          aria-hidden="true"
        >
          <Scene
            active={visible && !paused}
            paused={paused}
            onReady={() => setReady(true)}
            onFail={() => {
              setFailed(true);
              setReady(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
