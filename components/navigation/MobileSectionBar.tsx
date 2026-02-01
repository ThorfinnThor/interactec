"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MOBILE_SECTIONS } from "./mobileSections";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
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
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        root: null,
        threshold: [0.1, 0.2, 0.35],
        rootMargin: "-35% 0px -55% 0px",
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
                onClick={() => scrollToId(s.id)}
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
