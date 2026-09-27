import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import SubpageShell from "@/components/site/SubpageShell";
import { CONTACT_EMAIL, isLegalComplete } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy policy",
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy", title: "Privacy policy | InterAcTec" },
};

const UPDATED = "27 September 2026";

function Section({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-ink/10 py-10 lg:grid-cols-12">
      <p className="font-mono text-xs text-teal-deep lg:col-span-1">{n}</p>
      <h2 className="text-2xl font-medium tracking-tight lg:col-span-3">{title}</h2>
      <div className="space-y-4 text-[16px] leading-relaxed text-ink/80 lg:col-span-7 lg:col-start-6">{children}</div>
    </section>
  );
}

const Mail = () => (
  <a className="text-teal-deep underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
    {CONTACT_EMAIL}
  </a>
);

export default function PrivacyPage() {
  return (
    <SubpageShell
      kicker="Privacy"
      title="Privacy policy"
      intro={<>What we collect on this website, why, and what you can ask us to do with it. Last updated {UPDATED}.</>}
    >
      <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Section n="01" title="Who is responsible">
          <p>
            InterAcTec is responsible for the processing of personal data on this website.{" "}
            {isLegalComplete() ? (
              <>
                Full company details are in our{" "}
                <Link href="/impressum" className="text-teal-deep underline underline-offset-4">
                  Impressum
                </Link>
                .
              </>
            ) : null}{" "}
            For all privacy questions, contact <Mail />.
          </p>
        </Section>

        <Section n="02" title="Hosting and server logs">
          <p>
            This website runs on Cloudflare Workers (Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA).
            To deliver pages and protect the site against attacks, Cloudflare processes technical request data such as
            IP address, date and time, requested page, browser type and referrer. Legal basis: Art. 6(1)(f) GDPR —
            our legitimate interest in a secure and reliable website. Cloudflare participates in the EU–U.S. Data
            Privacy Framework, and Cloudflare’s data processing addendum applies to our account.
          </p>
        </Section>

        <Section n="03" title="Contact form">
          <p>
            When you send the contact form we store your name, work email, company, and — if you provide them — your
            role, modality and message, together with the time of submission, your country (derived from the request)
            and your browser type for spam protection. We use this data only to answer your request. Legal basis: Art.
            6(1)(b) GDPR (pre-contractual enquiries) and Art. 6(1)(a) GDPR (your consent).
          </p>
          <p>
            Submissions are stored in our Cloudflare R2 storage and deleted once your request has been fully handled,
            unless it leads to an ongoing business relationship or statutory retention applies.
          </p>
        </Section>

        <Section n="04" title="Case-study requests">
          <p>
            To download a case study we ask for your name, work email and company and store them in the same way. You
            receive a personal download link that expires after 24 hours. If you tick the optional box, we may inform
            you about new case studies; you can withdraw this consent at any time by emailing <Mail />. Legal basis:
            Art. 6(1)(a) GDPR.
          </p>
        </Section>

        <Section n="05" title="Web analytics">
          <p>
            We use Cloudflare Web Analytics to understand how the website is used, for example which pages are visited
            and how fast they load. It sets no cookies, does not use local storage and does not create user profiles;
            results are only available to us in aggregated form. Legal basis: Art. 6(1)(f) GDPR — our legitimate
            interest in improving the website.
          </p>
        </Section>

        <Section n="06" title="Cookies and local storage">
          <p>
            We do not use cookies. If you press “Pause motion”, your browser remembers this preference in its local
            storage; it never leaves your device. Fonts are hosted on our own server — no requests go to external font
            services.
          </p>
        </Section>

        <Section n="07" title="Your rights">
          <p>
            You have the right to access, rectify and erase your data, to restrict or object to its processing, to data
            portability, and to withdraw consent at any time with effect for the future. You can also lodge a complaint
            with a data-protection supervisory authority. To exercise your rights, email <Mail />.
          </p>
        </Section>
      </div>
    </SubpageShell>
  );
}
