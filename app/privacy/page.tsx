import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy</h1>

      <p className="mt-4 text-muted-foreground">
        We collect your email address when you request a report. We use it to send you the report
        and occasional updates. You can unsubscribe anytime.
      </p>

      <h2 className="mt-10 text-xl font-semibold">What we collect</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
        <li>Your email address</li>
        <li>Which report you downloaded (optional)</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold">Why we collect it</h2>
      <p className="mt-3 text-muted-foreground">
        To deliver the report and share occasional relevant updates about our research and product.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Contact</h2>
      <p className="mt-3 text-muted-foreground">
        Email: <span className="font-medium">you@yourdomain.com</span>
      </p>

      <div className="mt-10 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
