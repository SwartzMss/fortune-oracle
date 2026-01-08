interface Props {
  onStart: () => void
}

export default function LandingPage({ onStart }: Props) {
  return (
    <section className="mx-auto max-w-3xl space-y-4 rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6 shadow-card">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-accent">Fortune Oracle</p>
        <h2 className="text-2xl font-semibold text-neutral-100">结构化解读 · 可追溯</h2>
        <p className="mt-2 text-neutral-300">
          系统基于确定性规则与来源给出洞察，LLM 仅负责语言表达，不生成规则或事实。请提交关注点或出生信息以开始。
        </p>
      </div>
      <div className="flex flex-wrap gap-3 text-sm text-neutral-400">
        <span className="rounded-full bg-neutral-800 px-3 py-1">不做预言</span>
        <span className="rounded-full bg-neutral-800 px-3 py-1">不判吉凶</span>
        <span className="rounded-full bg-neutral-800 px-3 py-1">规则可追溯</span>
        <span className="rounded-full bg-neutral-800 px-3 py-1">结构优先</span>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="inline-flex items-center justify-center rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-surface transition hover:bg-accent-soft"
      >
        创建会话
      </button>
    </section>
  )
}
