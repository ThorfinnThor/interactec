import Link from "next/link";
import type { Insight } from "@/lib/insights";
import { formatInsightDate } from "@/lib/insights";

export default function InsightCard({ insight, index }: { insight: Insight; index?: number }) {
  return (
    <article className="group flex h-full flex-col bg-white/75 p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.13em]">
        <span className="text-teal-deep">{insight.category}</span>
        {typeof index === "number" && <span className="text-ink/35">{String(index + 1).padStart(2, "0")}</span>}
      </div>
      <h2 className="mt-6 text-2xl font-medium leading-tight tracking-tight sm:text-[28px]">
        <Link href={`/insights/${insight.slug}`} className="rounded-sm transition-colors group-hover:text-teal-deep">
          {insight.title}
        </Link>
      </h2>
      <p className="mt-4 text-[15px] leading-relaxed text-ink/68">{insight.description}</p>
      <div className="mt-auto flex items-center justify-between gap-4 border-t border-ink/10 pt-6 text-xs text-ink/55">
        <time dateTime={insight.published}>{formatInsightDate(insight.published)}</time>
        <span>{insight.readTime}</span>
      </div>
    </article>
  );
}
