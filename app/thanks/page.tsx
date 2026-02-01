import type { Metadata } from "next";
import ThanksClient from "./ThanksClient";

export const metadata: Metadata = {
  title: "Thanks",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thanks" },
  openGraph: { url: "/thanks", title: "Thanks | InterAcTec" },
};

export const dynamic = "force-dynamic";

export default function ThanksPage() {
  return <ThanksClient />;
}
