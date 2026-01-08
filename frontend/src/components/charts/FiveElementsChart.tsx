import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import type { FiveElements } from '@/types/schema'

interface Props {
  data?: FiveElements
}

export function FiveElementsChart({ data }: Props) {
  if (!data) {
    return <p className="text-sm text-neutral-400">暂无五行数据</p>
  }

  const chartData = [
    { key: '木', value: data.wood },
    { key: '火', value: data.fire },
    { key: '土', value: data.earth },
    { key: '金', value: data.metal },
    { key: '水', value: data.water },
  ]

  return (
    <div className="h-64 rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-3">
      <h3 className="text-sm font-semibold text-neutral-100">五行分布</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData} margin={{ top: 20, right: 20, bottom: 0, left: 20 }}>
          <PolarGrid stroke="#1f2937" />
          <PolarAngleAxis dataKey="key" tick={{ fill: '#e2e8f0', fontSize: 12 }} />
          <Tooltip
            contentStyle={{ background: '#0b1220', border: '1px solid #1f2937', color: '#e2e8f0' }}
            labelStyle={{ color: '#94a3b8' }}
            formatter={(val: unknown) => [`${val}`, '值']}
          />
          <Radar dataKey="value" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.35} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
