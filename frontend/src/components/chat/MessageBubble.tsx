import clsx from 'clsx'
import type { Message } from '@/types/schema'

interface Props {
  message: Message
}

const roleStyle: Record<Message['role'], string> = {
  user: 'border-accent/60 bg-accent/10 text-neutral-50',
  assistant: 'border-neutral-800 bg-neutral-900/70 text-neutral-100',
  system: 'border-neutral-800 bg-neutral-800/70 text-neutral-200',
}

export default function MessageBubble({ message }: Props) {
  return (
    <div
      className={clsx(
        'rounded-2xl border p-3 shadow-sm shadow-black/30',
        roleStyle[message.role],
      )}
    >
      <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
      {message.createdAt ? (
        <p className="mt-1 text-right text-[11px] uppercase tracking-wide text-neutral-500">
          {new Date(message.createdAt).toLocaleTimeString()}
        </p>
      ) : null}
    </div>
  )
}
