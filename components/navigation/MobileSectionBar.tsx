"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MOBILE_SECTIONS } from "./mobileSections";

/**
 * Adjust this if your sticky header height changes.
 * It's the combined height of:
 * - the main sticky header row
 * - the mobile section bar itself
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

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the most visible section that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        threshold: [0.15, 0.25, 0.4],
        // Tweaked for sticky header: this makes "active" switch a bit earlier
        rootMargin: "-20% 0px -65% 0px",
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds]);

  return (
    <div className="md:hidden border-t border-slate-200/70 bg-white/90 backdrop-blur">
      <div
        className="mx-auto max-w-6xl px-3 py-2 overflow-x-auto"
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
                  // Make it visually consistent immediately on tap
                  setActiveId(s.id);
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

