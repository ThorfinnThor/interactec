"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MOBILE_SECTIONS } from "./mobileSections";

/**
 * Sticky header row + this bar.
 * If the scroll landing is slightly off, tweak this number (usually 96–140).
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

  const sections = useMemo(() => MOBILE_SECTIONS, []);
  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections]);

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (els.length === 0) return;

    // Initialize activeId to the first section if nothing yet
    if (!activeId) setActiveId(els[0].id);

    const obs = new IntersectionObserver(
      (entries) => {
        // Choose the most visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        // These settings are tuned for sticky headers and long sections.
        threshold: [0.1, 0.2, 0.35, 0.5],
        // Makes a section become "active" when it enters the upper-middle of viewport.
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds]);

  return (
    <div className="md:hidden border-t border-slate-200/70 bg-white/90 backdrop-blur">
      <div
        className="mx-auto max-w-6xl px-3 py-2 overflow-x-auto"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex items-center gap-2">
          {sections.map((s) => {
            const isActive = activeId === s.id;

            return (
              <Button
                key={s.id}
                variant={isActive ? "default" : "outline"}
                className="h-9 whitespace-nowrap rounded-full px-4"
                onClick={() => {
                  // Immediate feedback + smooth jump
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
