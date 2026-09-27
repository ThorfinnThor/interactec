import type { Metadata } from "next";
import Link from "next/link";
import SubpageShell from "@/components/site/SubpageShell";

export const metadata: Metadata = {
  title: "Case studies",
  robots: { index: false, follow: false },
  alternates: { canonical: "/case-studies" },
};

/** Kept for old links from the previous form provider; downloads now start on /case-studies. */
export default function ThanksPage() {
  return (
    <SubpageShell kicker="Case studies" title="Downloads have moved.">
      <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:px-8">
        <p className="max-w-xl text-lg leading-relaxed text-ink/75">
          Case-study PDFs are now requested directly on our case-study page and download immediately.
        </p>
        <Link
          href="/case-studies"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-ink px-6 text-base text-paper transition-colors hover:bg-ink-3"
        >
          Go to case studies
        </Link>
      </div>
    </SubpageShell>
  );
}
