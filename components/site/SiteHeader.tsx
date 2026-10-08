"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { href: "/#deliverables", label: "What you get" },
  { href: "/#pilot", label: "How it works" },
  { href: "/#applications", label: "Applications" },
  { href: "/science", label: "Science" },
  { href: "/case-studies", label: "Case studies" },
];

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
        <circle cx="12" cy="13" r="8.5" fill="none" stroke="#68E4D4" strokeWidth="1.8" />
        <circle cx="20.5" cy="19.5" r="9" fill="none" stroke="#A49BE8" strokeWidth="1.8" strokeDasharray="2.6 2.2" />
        <clipPath id="logo-lens">
          <circle cx="12" cy="13" r="8.5" />
        </clipPath>
        <circle cx="20.5" cy="19.5" r="9" fill="#F4F7F4" opacity="0.9" clipPath="url(#logo-lens)" />
      </svg>
      <span className="text-[17px] font-semibold tracking-tight text-paper">InterAcTec</span>
    </span>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="rounded-sm" aria-label="InterAcTec — home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] text-mist lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-sm transition-colors hover:text-paper">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className="hidden h-10 items-center rounded-full bg-teal px-5 text-[15px] font-medium text-ink transition-colors hover:bg-paper sm:inline-flex"
          >
            Check project feasibility
          </Link>
          <button
            ref={btnRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-line bg-ink px-4 pb-6 pt-2 sm:px-6 lg:hidden"
      >
        <ul className="flex flex-col">
          {NAV.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                onClick={() => setOpen(false)}
                className="flex h-12 items-center border-b border-line text-lg text-paper"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#contact"
          onClick={() => setOpen(false)}
          className="mt-5 flex h-12 items-center justify-center rounded-full bg-teal text-base font-medium text-ink"
        >
          Check project feasibility
        </Link>
      </nav>
    </header>
  );
}
