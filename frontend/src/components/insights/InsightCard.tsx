import EvidenceDrawer from './EvidenceDrawer'
import type { Insight } from '@/types/schema'

interface Props {
  insight: Insight
}

export default function InsightCard({ insight }: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-accent">{insight.category ?? '洞察'}</p>
          <h3 className="text-lg font-semibold text-neutral-50">{insight.title}</h3>
        </div>
        {insight.tags?.length ? (
          <div className="flex flex-wrap gap-1">
            {insight.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-800 px-2 py-1 text-[11px] font-semibold text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-neutral-200">{insight.summary}</p>
      <EvidenceDrawer ruleRefs={insight.ruleRefs} />
    </div>
  )
}
