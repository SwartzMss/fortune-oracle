import { useState } from 'react'
import type { FormEvent } from 'react'

interface Props {
  onSend: (value: string) => void
  loading?: boolean
  placeholder?: string
}

export default function InputBar({ onSend, loading, placeholder }: Props) {
  const [value, setValue] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSend(value)
    setValue('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-2 shadow-inner shadow-black/40"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder ?? '输入要关注的主题或补充上下文…'}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-surface transition hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? '发送中…' : '发送'}
      </button>
    </form>
  )
}
