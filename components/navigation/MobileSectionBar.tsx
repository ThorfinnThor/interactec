"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MOBILE_SECTIONS } from "./mobileSections";

/**
 * Adjust if your sticky header height changes.
 * (main sticky header row + this bar)
 */
const SCROLL_OFFSET_PX = 120;

function scrollToIdWithOffset(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const y = window.scrollY + el.getBoundingClientRect().top - SCROLL_OFFSET_PX;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function MobileSectionBar() {
  const [activeId, setActiveId] = useState<string>("");

  const sectionIds = useMemo(() => MOBILE_SECTIONS.map((s) => s.id), []);
  const activeLabel = useMemo(() => {
    return MOBILE_SECTIONS.find((s) => s.id === activeId)?.label ?? "";
  }, [activeId]);

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        threshold: [0.15, 0.25, 0.4],
        rootMargin: "-20% 0px -65% 0px",
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds]);

  return (
    <div className="md:hidden border-t border-slate-200/70 bg-white/90 backdrop-blur">
      {/* Current section indicator */}
      <div className="mx-auto max-w-6xl px-3 pt-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Current:</span>
          <span className={activeLabel ? "font-medium text-slate-950" : "text-slate-500"}>
            {activeLabel || "—"}
          </span>
        </div>
      </div>

      {/* Scrollable chips */}
      <div
        className="mx-auto max-w-6xl px-3 pb-2 overflow-x-auto"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex items-center gap-2">
          {MOBILE_SECTIONS.map((s) => {
            const isActive = activeId === s.id;

            return (
              <Button
                key={s.id}
                variant={isActive ? "default" : "outline"}
                className="h-9 whitespace-nowrap rounded-full px-4"
                onClick={() => {
                  setActiveId(s.id); // immediate visual feedback
                  scrollToIdWithOffset(s.id);
                }}
              >
                {s.label}
              </Button>
            );
          })}

          <Button asChild variant="outline" className="h-9 whitespace-nowrap rounded-full px-4">
            <Link href="/case-studies">Case studies</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
