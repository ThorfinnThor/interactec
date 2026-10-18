import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import InsightCard from "@/components/site/InsightCard";
import InsightVisual from "@/components/site/InsightVisual";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { formatInsightDate, getInsight, INSIGHTS } from "@/lib/insights";
import { getSiteUrl } from "@/lib/site-url";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return INSIGHTS.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};

  const path = `/insights/${insight.slug}`;
  return {
    title: insight.title,
    description: insight.description,
    authors: [{ name: insight.author, url: "/team" }],
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: insight.title,
      description: insight.description,
      publishedTime: insight.published,
      modifiedTime: insight.updated,
      authors: [insight.author],
      tags: [insight.category, "cell-cell interactions", "flow cytometry", "immunotherapy"],
    },
    twitter: {
      card: "summary_large_image",
      title: insight.title,
      description: insight.description,
    },
  };
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const origin = getSiteUrl().origin;
  const articleUrl = `${origin}/insights/${insight.slug}`;
  const related = insight.relatedSlugs
    .map((relatedSlug) => getInsight(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.description,
    datePublished: insight.published,
    dateModified: insight.updated,
    mainEntityOfPage: articleUrl,
    url: articleUrl,
    author: {
      "@type": "Person",
      name: insight.author,
      jobTitle: insight.authorRole,
      url: `${origin}/team`,
    },
    publisher: {
      "@type": "Organization",
      name: "InterAcTec",
      url: origin,
      logo: { "@type": "ImageObject", url: `${origin}/icon.png`, width: 512, height: 512 },
    },
    citation: insight.sources.map((source) => source.url),
    keywords: [insight.category, "cell-cell interactions", "flow cytometry", "immunotherapy"],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: origin },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${origin}/insights` },
      { "@type": "ListItem", position: 3, name: insight.shortTitle, item: articleUrl },
    ],
  };

  return (
    <div className="bg-ink">
      <a
        href="#article"
        className="sr-only z-[60] rounded-full bg-teal px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to article
      </a>
      <SiteHeader />
      <main id="article">
        <header className="border-b border-line bg-ink text-paper">
          <div className="mx-auto max-w-[1240px] px-4 pb-14 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-14">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-mist">
              <Link href="/insights" className="rounded-sm transition-colors hover:text-paper">Insights</Link>
              <span aria-hidden="true">/</span>
              <span className="text-paper/75">{insight.category}</span>
            </nav>
            <div className="mt-10 grid items-end gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal">{insight.category}</p>
                <h1 className="mt-5 text-4xl font-medium leading-[1.04] tracking-tight sm:text-6xl">
                  {insight.title}
                </h1>
                <p className="mt-7 max-w-3xl text-xl leading-relaxed text-mist">{insight.answer}</p>
                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-mist">
                  <Link href="/team" className="font-medium text-paper hover:text-teal">{insight.author}</Link>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-mist" />
                  <time dateTime={insight.published}>{formatInsightDate(insight.published)}</time>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-mist" />
                  <span>{insight.readTime}</span>
                </div>
              </div>
              <div className="lg:col-span-5">
                <InsightVisual variant={insight.visual} />
              </div>
            </div>
          </div>
        </header>

        <article className="on-paper bg-paper text-ink">
          <div className="mx-auto grid max-w-[1240px] gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-24">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-teal-deep">In this article</p>
                <ol className="mt-5 space-y-3 border-l border-ink/12 pl-4 text-sm leading-snug text-ink/60">
                  {insight.sections.map((section, index) => (
                    <li key={section.heading}>
                      <a href={`#section-${index + 1}`} className="rounded-sm transition-colors hover:text-ink">
                        {section.heading}
                      </a>
                    </li>
                  ))}
                  <li><a href="#sources" className="rounded-sm transition-colors hover:text-ink">Sources</a></li>
                </ol>
              </div>
            </aside>

            <div className="lg:col-span-8 lg:col-start-5">
              <section aria-labelledby="key-points" className="rounded-2xl bg-ink p-7 text-paper sm:p-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-teal">Key points</p>
                <h2 id="key-points" className="sr-only">Key points</h2>
                <ul className="mt-6 space-y-4">
                  {insight.highlights.map((highlight) => (
                    <li key={highlight} className="grid grid-cols-[18px_1fr] gap-3 text-lg leading-relaxed text-paper/90">
                      <span aria-hidden="true" className="mt-[0.65em] h-1.5 w-1.5 rounded-full bg-violet" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="mt-14 space-y-16">
                {insight.sections.map((section, index) => (
                  <section key={section.heading} id={`section-${index + 1}`} aria-labelledby={`heading-${index + 1}`}>
                    <p className="font-mono text-[11px] text-teal-deep">{String(index + 1).padStart(2, "0")}</p>
                    <h2 id={`heading-${index + 1}`} className="mt-4 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                      {section.heading}
                    </h2>
                    <div className="mt-6 space-y-5 text-[17px] leading-[1.75] text-ink/75">
                      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                    {section.bullets && (
                      <ul className="mt-7 space-y-3 rounded-2xl border border-ink/12 bg-white/55 p-6 sm:p-7">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="grid grid-cols-[18px_1fr] gap-3 text-[16px] leading-relaxed text-ink/75">
                            <span aria-hidden="true" className="mt-[0.7em] h-px w-3 bg-teal-deep" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.note && (
                      <aside className="mt-8 border-l-2 border-violet bg-violet/7 px-6 py-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-violet-deep">{section.note.label}</p>
                        <h3 className="mt-3 text-xl font-medium tracking-tight">{section.note.title}</h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-ink/68">{section.note.text}</p>
                      </aside>
                    )}
                  </section>
                ))}
              </div>

              <section id="sources" aria-labelledby="sources-title" className="mt-16 border-t border-ink/12 pt-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-teal-deep">Evidence</p>
                <h2 id="sources-title" className="mt-4 text-3xl font-medium tracking-tight">Sources</h2>
                <ol className="mt-6 space-y-5">
                  {insight.sources.map((source) => (
                    <li key={source.url} className="grid grid-cols-[30px_1fr] gap-3 text-[15px] leading-relaxed text-ink/68">
                      <span className="font-mono text-xs text-teal-deep">{source.label}</span>
                      <p>
                        <a href={source.url} target="_blank" rel="noreferrer" className="font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                          {source.title}
                        </a>{" "}
                        <span>{source.publication}.</span>
                      </p>
                    </li>
                  ))}
                </ol>
                <p className="mt-7 text-sm leading-relaxed text-ink/55">
                  This article is scientific information for research planning. It does not describe a validated clinical
                  test or provide medical advice.
                </p>
              </section>

              <section aria-labelledby="author-title" className="mt-12 rounded-2xl bg-paper-2 p-7 sm:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-violet-deep">About the author</p>
                <h2 id="author-title" className="mt-3 text-2xl font-medium tracking-tight">{insight.author}</h2>
                <p className="mt-1 text-sm text-ink/55">{insight.authorRole}</p>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/70">
                  Schayan leads InterAcTec’s scientific strategy across immune-panel design, cellular interaction mapping
                  and translational applications. He is a co-first author of the Nature Methods publication introducing
                  the Interact-omics framework.
                </p>
                <Link href="/team" className="mt-5 inline-flex text-sm font-medium text-teal-deep underline underline-offset-4">
                  Meet the team
                </Link>
              </section>
            </div>
          </div>
        </article>

        <section aria-labelledby="related-insights" className="border-t border-line bg-ink-2 text-paper">
          <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal">Continue exploring</p>
                <h2 id="related-insights" className="mt-4 text-4xl font-medium tracking-tight">Related insights</h2>
              </div>
              <Link href="/insights" className="text-sm text-mist underline underline-offset-4 hover:text-paper">View all insights</Link>
            </div>
            <div className="on-paper mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line text-ink md:grid-cols-2">
              {related.map((item) => <InsightCard key={item.slug} insight={item} />)}
            </div>
          </div>
        </section>

        <section className="bg-teal text-ink">
          <div className="mx-auto grid max-w-[1240px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8 lg:py-16">
            <div className="lg:col-span-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-teal-deep">Next step</p>
              <h2 className="mt-3 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">Can this answer your study question?</h2>
              <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink/70">Share your modality, sample system and available data for a focused feasibility assessment.</p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link href="/#contact" className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-base font-medium text-paper transition-colors hover:bg-paper hover:text-ink">
                Check project feasibility
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </div>
  );
}
