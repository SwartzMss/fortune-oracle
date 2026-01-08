import InsightCard from './InsightCard'
import { FiveElementsChart } from '@/components/charts/FiveElementsChart'
import { TenGodsChart } from '@/components/charts/TenGodsChart'
import type { Facts, Insight } from '@/types/schema'

interface Props {
  insights: Insight[]
  facts?: Facts
}

export default function InsightPanel({ insights, facts }: Props) {
  const hasFacts = facts && (facts.fiveElements || facts.tenGods)

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-neutral-100">结构图表</h2>
          <p className="text-xs text-neutral-500">仅渲染后端提供的结构化结果</p>
        </div>
        {hasFacts ? (
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <FiveElementsChart data={facts?.fiveElements} />
            <TenGodsChart data={facts?.tenGods} />
          </div>
        ) : (
          <p className="mt-3 text-sm text-neutral-400">尚无结构化结果，可先提交输入。</p>
        )}
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-neutral-100">洞察卡片</h2>
          <p className="text-xs text-neutral-500">每条洞察须引用 rule_refs</p>
        </div>
        <div className="mt-3 flex flex-col gap-3">
          {insights.length ? (
            insights.map((insight) => <InsightCard key={insight.id} insight={insight} />)
          ) : (
            <p className="text-sm text-neutral-400">等待输入后生成洞察。</p>
          )}
        </div>
      </div>
    </div>
  )
}
