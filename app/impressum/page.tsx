import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubpageShell from "@/components/site/SubpageShell";
import { LEGAL, isLegalComplete } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Impressum",
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  if (!isLegalComplete()) notFound();
  const rows: [string, string][] = (
    [
      ["Company", [LEGAL.companyName, LEGAL.legalForm && !LEGAL.companyName.includes(LEGAL.legalForm) ? LEGAL.legalForm : ""].filter(Boolean).join(" ")],
      ["Address", [LEGAL.street, LEGAL.postalCodeCity, LEGAL.country].filter(Boolean).join(", ")],
      ["Represented by", LEGAL.representedBy],
      ["Email", LEGAL.email],
      ["Phone", LEGAL.phone],
      ["Register", [LEGAL.registerCourt, LEGAL.registerNumber].filter(Boolean).join(", ")],
      ["VAT ID", LEGAL.vatId],
      ["Responsible for content", LEGAL.contentResponsible],
    ] as [string, string][]
  ).filter(([, v]) => v);
  return (
    <SubpageShell kicker="Legal" title="Impressum">
      <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <dl className="max-w-3xl divide-y divide-ink/10 border-y border-ink/10">
          {rows.map(([k, v]) => (
            <div key={k} className="grid gap-1 py-5 sm:grid-cols-3">
              <dt className="font-mono text-[12px] uppercase tracking-[0.12em] text-ink/60">{k}</dt>
              <dd className="text-[16px] text-ink sm:col-span-2">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </SubpageShell>
  );
}
