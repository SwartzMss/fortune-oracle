import { useState } from 'react'
import type { RuleRef } from '@/types/schema'

interface Props {
  ruleRefs: RuleRef[]
}

export default function EvidenceDrawer({ ruleRefs }: Props) {
  const [open, setOpen] = useState(false)

  if (!ruleRefs.length) return null

  return (
    <div className="mt-2 rounded-xl border border-neutral-800/80 bg-neutral-900/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2 text-xs font-semibold text-neutral-200"
      >
        <span>规则引用</span>
        <span className="text-neutral-500">{open ? '收起' : '展开'}</span>
      </button>
      {open ? (
        <div className="border-t border-neutral-800/80 text-xs text-neutral-300">
          {ruleRefs.map((ref) => (
            <div key={ref.ruleId} className="border-b border-neutral-800/60 px-3 py-2 last:border-0">
              <p className="font-semibold text-neutral-100">{ref.ruleId}</p>
              {ref.statement ? <p className="mt-1 leading-relaxed">{ref.statement}</p> : null}
              {ref.source ? (
                <p className="mt-1 text-[11px] text-neutral-500">
                  来源：{ref.source.book ?? '未标明'}
                  {ref.source.ref ? ` · ${ref.source.ref}` : ''}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
