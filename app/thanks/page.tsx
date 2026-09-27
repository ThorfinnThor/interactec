import type { Metadata } from "next";
import ThanksClient from "./ThanksClient";

export const metadata: Metadata = {
  title: "Thanks",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thanks" },
  openGraph: { url: "/thanks", title: "Thanks | InterAcTec" },
};

export const dynamic = "force-dynamic";

type ThanksPageProps = {
  searchParams: Promise<{
    caseStudy?: string | string[];
    report?: string | string[];
  }>;
};

function firstValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function ThanksPage({ searchParams }: ThanksPageProps) {
  const params = await searchParams;
  const rawValue = firstValue(params.caseStudy) || firstValue(params.report);

  return <ThanksClient rawValue={rawValue} />;
}
