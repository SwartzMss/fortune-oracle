import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { TenGods } from '@/types/schema'

interface Props {
  data?: TenGods
}

export function TenGodsChart({ data }: Props) {
  if (!data) return <p className="text-sm text-neutral-400">暂无十神数据</p>

  const chartData = Object.entries(data).map(([key, value]) => ({
    key,
    value,
  }))

  return (
    <div className="h-64 rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-3">
      <h3 className="text-sm font-semibold text-neutral-100">十神分布</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 24, left: 24 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis type="number" tick={{ fill: '#e2e8f0' }} />
          <YAxis dataKey="key" type="category" tick={{ fill: '#e2e8f0' }} width={80} />
          <Tooltip
            contentStyle={{ background: '#0b1220', border: '1px solid #1f2937', color: '#e2e8f0' }}
            labelStyle={{ color: '#94a3b8' }}
            formatter={(val: unknown) => [`${val}`, '值']}
          />
          <Bar dataKey="value" fill="#67e8f9" radius={[6, 6, 6, 6]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
