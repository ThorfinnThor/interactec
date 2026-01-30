import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const COMPANY = "InterAcTec";
const CONTACT_EMAIL = "hello@interactec.bio"; // change

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Privacy Policy</h1>
        <Button asChild variant="outline" className="rounded-2xl">
          <Link href="/">← Back</Link>
        </Button>
      </div>

      <Card className="mt-6 rounded-3xl border-slate-200">
        <CardContent className="p-8 space-y-5 text-slate-700">
          <p>
            This website is operated by <strong>{COMPANY}</strong>.
          </p>

          <h2 className="text-lg font-semibold text-slate-950">What we collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Email address (when you request a report via our form)</li>
            <li>Basic form metadata (time of submission) provided by the form provider</li>
          </ul>

          <h2 className="text-lg font-semibold text-slate-950">Why we collect it</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To deliver the requested report</li>
            <li>To send occasional updates (only if you consent)</li>
          </ul>

          <h2 className="text-lg font-semibold text-slate-950">How we store and share</h2>
          <p>
            Form submissions are processed by our form provider (e.g., Tally). We do not sell your data.
          </p>

          <h2 className="text-lg font-semibold text-slate-950">Your rights</h2>
          <p>
            You can request access, correction, or deletion of your data at any time by emailing{" "}
            <a className="underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>

          <h2 className="text-lg font-semibold text-slate-950">Contact</h2>
          <p>
            For privacy requests, email{" "}
            <a className="underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>

          <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
        </CardContent>
      </Card>
    </main>
  );
}
