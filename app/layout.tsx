import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted (SIL OFL 1.1) — see app/fonts/README.md
const instrumentSans = localFont({
  src: "./fonts/InstrumentSans-Variable.woff2",
  variable: "--font-instrument-sans",
  weight: "400 700",
  display: "swap",
});

const instrumentSerif = localFont({
  src: "./fonts/InstrumentSerif-Italic.woff2",
  variable: "--font-instrument-serif",
  weight: "400",
  style: "italic",
  display: "swap",
});

const plexMono = localFont({
  src: [
    { path: "./fonts/IBMPlexMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/IBMPlexMono-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

// Uses env when provided; falls back to the Vercel domain.
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "interactec.vercel.app";
const siteUrl = rawSiteUrl.startsWith("http") ? rawSiteUrl : `https://${rawSiteUrl}`;

const title = "InterAcTec";
const description =
  "We turn functional cell-cell engagement into a scalable drug-discovery readout — built on Interact-omics, a cytometry-based interaction mapping framework published in Nature Methods.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${title} — Cell-cell engagement as a drug-discovery readout`,
    template: `%s | ${title}`,
  },
  description,
  applicationName: title,
  // Canonicals are set per page.
  openGraph: {
    type: "website",
    url: "/",
    siteName: title,
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#080d15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${instrumentSerif.variable} ${plexMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
