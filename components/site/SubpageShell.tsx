import type { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

/** Shared frame for secondary pages: same header/footer as the homepage, light reading surface. */
export default function SubpageShell({
  kicker,
  title,
  intro,
  children,
}: {
  kicker: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="bg-ink">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-teal px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <header className="border-b border-line bg-ink text-paper">
          <div className="mx-auto max-w-[1240px] px-4 pb-14 pt-16 sm:px-6 lg:px-8 lg:pb-20 lg:pt-24">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal">{kicker}</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-medium leading-[1.06] tracking-tight sm:text-6xl">{title}</h1>
            {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{intro}</div>}
          </div>
        </header>
        <div className="on-paper bg-paper text-ink">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
