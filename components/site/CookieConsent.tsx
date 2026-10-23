"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  OPEN_CONSENT_EVENT,
  type ConsentChoice,
  disableGoogleAnalytics,
  isAnalyticsExcluded,
  loadGoogleAnalytics,
  readConsent,
  storeConsent,
} from "@/lib/consent";

/** Opt-in banner for Google Analytics. Nothing is loaded until the visitor presses "Accept". */
export default function CookieConsent() {
  const pathname = usePathname();
  const excluded = isAnalyticsExcluded(pathname);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (excluded) return;
    const choice = readConsent();
    if (choice === "granted") loadGoogleAnalytics();
    // Defer the state update so it does not cascade synchronously out of the effect.
    else if (choice === null) queueMicrotask(() => setOpen(true));
  }, [excluded]);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, show);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, show);
  }, []);

  if (excluded || !open) return null;

  const choose = (choice: ConsentChoice) => {
    storeConsent(choice);
    if (choice === "granted") loadGoogleAnalytics();
    else disableGoogleAnalytics();
    setOpen(false);
  };

  const buttonClass =
    "inline-flex h-11 flex-1 items-center justify-center rounded-full border border-line bg-paper px-6 text-[15px] font-medium text-ink transition-colors hover:bg-paper-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal sm:flex-none";

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-text"
      className="fixed inset-x-0 bottom-0 z-[70] p-4 sm:p-6"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-5 rounded-2xl border border-line bg-ink-2 p-5 text-paper shadow-2xl shadow-black/40 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <p id="cookie-consent-title" className="font-mono text-xs uppercase tracking-[0.16em] text-teal">
            Cookies
          </p>
          <p id="cookie-consent-text" className="mt-2 text-[15px] leading-relaxed text-mist">
            With your consent we use Google Analytics to measure how this website is used. It sets cookies and
            transfers data to Google, including to the USA. You can change your choice at any time via “Cookie
            settings” in the footer. Details in our{" "}
            <Link href="/privacy" className="text-paper underline underline-offset-4 hover:text-teal">
              privacy policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button type="button" className={buttonClass} onClick={() => choose("denied")}>
            Decline
          </button>
          <button type="button" className={buttonClass} onClick={() => choose("granted")}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
