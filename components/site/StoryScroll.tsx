"use client";

import { useEffect, useRef, useState } from "react";
import { story } from "@/lib/motion-store";
import WebGLSlot from "@/components/three/WebGLSlot";
import MotionToggle from "./MotionToggle";
import StoryVisual, { STORY_STEPS } from "./StoryVisual";

const loadStory = () => import("@/components/three/scenes").then((m) => ({ default: m.StoryScene }));

export type StoryChapter = { title: string; body: string };

/**
 * Desktop (lg+, motion allowed): text chapters scroll past one sticky scene. A single
 * continuous scroll progress (0 = first chapter centred … 3 = last chapter centred) drives
 * camera, cell state, the organic→data transition and the active text. It is written to a
 * shared store and read inside the WebGL render loop — no per-frame React updates.
 * The discrete active chapter (for text emphasis and the SVG poster) derives from the same
 * geometry. Without WebGL the SVG scene is shown for the active chapter.
 *
 * Mobile or prefers-reduced-motion: each chapter carries its own static visual, so all
 * four states are visible without pinning or scroll-bound animation.
 */
export default function StoryScroll({ chapters }: { chapters: StoryChapter[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLElement[];
    if (!("IntersectionObserver" in window) || els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.index);
            setActive((prev) => (prev === i ? prev : i));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));

    // continuous progress between chapter centres
    let raf = 0;
    const measure = () => {
      raf = 0;
      const vc = window.innerHeight / 2;
      const centres = els.map((el) => {
        const r = el.getBoundingClientRect();
        return r.top + r.height / 2;
      });
      let p = 0;
      if (vc <= centres[0]) p = 0;
      else if (vc >= centres[centres.length - 1]) p = centres.length - 1;
      else {
        for (let i = 0; i < centres.length - 1; i++) {
          if (vc >= centres[i] && vc < centres[i + 1]) {
            p = i + (vc - centres[i]) / (centres[i + 1] - centres[i]);
            break;
          }
        }
      }
      story.target = p;
      story.invalidate?.();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="grid gap-x-16 lg:grid-cols-12">
      <ol className="lg:col-span-5 lg:motion-reduce:col-span-12">
        {chapters.map((ch, i) => (
          <li
            key={ch.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            className="flex flex-col justify-center border-t border-line py-12 first:border-t-0 lg:motion-safe:min-h-[78vh] lg:motion-safe:py-0 lg:motion-reduce:grid lg:motion-reduce:grid-cols-2 lg:motion-reduce:items-center lg:motion-reduce:gap-16"
          >
            <div
              className={`transition-opacity duration-300 motion-reduce:opacity-100 ${
                active === i ? "lg:opacity-100" : "lg:motion-safe:opacity-40"
              }`}
            >
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal">
                {String(i + 1).padStart(2, "0")} · {STORY_STEPS[i]}
              </p>
              <h3 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-paper sm:text-4xl">
                {ch.title}
              </h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-mist">{ch.body}</p>
            </div>

            {/* per-chapter static visual: mobile, tablet and reduced motion */}
            <figure className="story-mobile mt-8 block max-w-md lg:motion-safe:hidden lg:motion-reduce:mt-0">
              <StoryVisual step={i} idPrefix={`story-m${i}`} />
              <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-mist">
                {i === 3 ? "Illustrative data — not experimental results" : "Schematic visualization"}
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>

      {/* sticky shared scene: desktop with motion allowed */}
      <div className="hidden lg:col-span-7 lg:motion-safe:block">
        <div className="sticky top-[12vh] flex h-[76vh] flex-col justify-center">
          <div aria-hidden="true" className="mb-6 flex gap-6 font-mono text-[11px] uppercase tracking-[0.16em]">
            {STORY_STEPS.map((s, i) => (
              <span key={s} className={`flex items-center gap-2 ${active === i ? "text-paper" : "text-mist/60"}`}>
                <span className={`h-px transition-all duration-300 ${active === i ? "w-8 bg-teal" : "w-4 bg-mist/40"}`} />
                {s}
              </span>
            ))}
          </div>
          <figure className="relative mx-auto aspect-square h-[62vh] max-h-[640px]">
            <WebGLSlot
              poster={<StoryVisual step={active} idPrefix="story-d" />}
              load={loadStory}
              minWidth={1024}
              className="story-canvas h-full w-full"
            />
            <figcaption className="absolute -bottom-9 left-0 right-0 flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-mist">
              <MotionToggle />
              <span>
                {active === 3 ? "Illustrative data — not experimental results" : "Schematic visualization · visual metaphor"}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}
