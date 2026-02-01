import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Uses env when provided; falls back to your Vercel domain.
// Ensures https:// prefix so metadataBase is valid.
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "interactec.vercel.app";
const siteUrl = rawSiteUrl.startsWith("http") ? rawSiteUrl : `https://${rawSiteUrl}`;

const title = "InterAcTec";
const description =
  "Cellular interaction mapping and immune profiling for clinical-ready cytometry analytics. Flow cytometry combined with bioinformatics and AI-assisted analysis.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  applicationName: title,

  // IMPORTANT: do NOT set a global canonical here.
  // Canonicals should be per-page so /case-studies doesn't canonicalize to /.

  openGraph: {
    type: "website",
    url: "/",
    siteName: title,
    title,
    description,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "InterAcTec",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}