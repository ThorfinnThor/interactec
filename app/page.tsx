import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* Top nav */}
      <header className="flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          YourStartup
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          <Link href="#technology" className="hover:text-foreground">
            Technology
          </Link>
          <Link href="#use-cases" className="hover:text-foreground">
            Use cases
          </Link>
          <Link href="/reports" className="hover:text-foreground">
            Reports
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <Badge className="rounded-xl">PDF data reports · free download</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            A confident one-liner about your technology.
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            1–2 sentences: what you do, who it’s for, and the outcome. Keep it concrete and
            readable.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-2xl">
              <Link href="/reports">Download reports</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-2xl">
              <Link href="#use-cases">See use cases</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span>✓ Modern UI</span>
            <span>✓ No login</span>
            <span>✓ Email capture</span>
            <span>✓ Fast hosting</span>
          </div>
        </div>

        <Card className="rounded-3xl">
          <CardContent className="p-8">
            <div className="text-sm font-medium">What you’ll get</div>
            <Separator className="my-4" />
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>• Key metrics + trends</li>
              <li>• Methodology summary</li>
              <li>• Practical implications</li>
              <li>• Charts & insights (PDF)</li>
            </ul>
            <Separator className="my-4" />
            <div className="text-xs text-muted-foreground">
              We’ll replace this placeholder copy once you send me your real content.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Technology */}
      <section id="technology" className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">Technology</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Explain the “how” in plain language. What’s your unique approach, and why does it
          work?
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { title: "Core capability", desc: "One sentence about the core technical advantage." },
            { title: "Quality", desc: "How you ensure accuracy, repeatability, or robustness." },
            { title: "Workflow fit", desc: "How it integrates into real teams and tools." },
          ].map((x) => (
            <Card key={x.title} className="rounded-3xl">
              <CardContent className="p-6">
                <div className="font-medium">{x.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{x.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section id="use-cases" className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">Use cases</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Show outcomes. For each: who uses it, what problem, what result.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            { title: "Use case #1", desc: "Who uses it + what changes after using it." },
            { title: "Use case #2", desc: "Another customer type with a different value." },
            { title: "Use case #3", desc: "Operational / analytics / compliance angle." },
            { title: "Use case #4", desc: "Your most memorable outcome statement." },
          ].map((x) => (
            <Card key={x.title} className="rounded-3xl">
              <CardContent className="p-6">
                <div className="font-medium">{x.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{x.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex gap-3">
          <Button asChild className="rounded-2xl">
            <Link href="/reports">Get the reports</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-2xl">
            <Link href="/privacy">Privacy</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 border-t pt-8 text-sm text-muted-foreground">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} YourStartup</div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/reports" className="hover:text-foreground">
              Reports
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
