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

const UPDATED = "23 October 2026";

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
          <p>
            To alert our team to a new request, Cloudflare Email Service sends a notification to our contact mailbox.
            Your work email is used as the reply-to address so that we can respond directly.
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

        <Section n="06" title="Google Analytics">
          <p>
            Only if you click “Accept” in the cookie banner, we use Google Analytics 4, a web analytics service provided
            by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland (“Google”). Without your consent
            the Google Analytics script is not loaded and no data is sent to Google. We use it for audience measurement:
            to understand how many people visit the website, which pages they view and how they found us, so that we can
            improve our content. Our internal admin area never loads Google Analytics.
          </p>
          <p>
            Google Analytics stores cookies on your device and processes usage data such as pages visited, time and
            duration of the visit, referring website, approximate location (derived from a shortened IP address), device
            and browser information. IP addresses are not logged or stored by Google Analytics 4. Google signals and
            advertising features are switched off, and the advertising-related consent signals (ad_storage, ad_user_data,
            ad_personalization) always remain “denied”.
          </p>
          <p>Cookies set by Google Analytics:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <code className="font-mono text-[14px]">_ga</code> — distinguishes visitors; lifetime 2 years.
            </li>
            <li>
              <code className="font-mono text-[14px]">_ga_KVYTEEZMF7</code> — keeps the session state; lifetime 2 years.
            </li>
          </ul>
          <p>
            Data linked to cookies and user identifiers is automatically deleted after 14 months. Legal basis: your
            consent, Art. 6(1)(a) GDPR and § 25(1) TTDSG (now TDDDG). Your choice is saved in your browser’s local
            storage (key <code className="font-mono text-[14px]">ia-analytics-consent-v1</code>) so that the banner is
            not shown again.
          </p>
          <p>
            Google may transfer data to Google LLC in the USA. Google LLC is certified under the EU–U.S. Data Privacy
            Framework, for which the European Commission has adopted an adequacy decision (Art. 45 GDPR).
            Google’s data processing terms apply to our Google Analytics account.
          </p>
          <p>
            You can withdraw your consent at any time with effect for the future via “Cookie settings” in the footer of
            every page by choosing “Decline”. The Google Analytics cookies are then deleted and no further data is
            collected. More information:{" "}
            <a
              className="text-teal-deep underline underline-offset-4"
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google privacy policy
            </a>
            .
          </p>
        </Section>

        <Section n="07" title="Cookies and local storage">
          <p>
            Cookies are only set if you consent to Google Analytics (see section 06). Your cookie choice and, if you
            press “Pause motion”, your motion preference are remembered in your browser’s local storage; they never
            leave your device. Fonts are hosted on our own server — no requests go to external font services.
          </p>
        </Section>

        <Section n="08" title="Your rights">
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
