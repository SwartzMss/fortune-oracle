import type { PropsWithChildren } from 'react'

export default function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-surface text-neutral-100">
      <header className="border-b border-neutral-800/80 bg-surface/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
              Fortune Oracle
            </p>
            <h1 className="text-xl font-semibold text-neutral-100">结构化解读 · 可追溯输出</h1>
          </div>
          <div className="text-right text-xs text-neutral-400">
            <p>非预言 / 不判吉凶 / 用户自主决策</p>
            <p>基于规则与来源的结构化观察</p>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  )
}
