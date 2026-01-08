import MessageBubble from './MessageBubble'
import type { Message } from '@/types/schema'

interface Props {
  messages: Message[]
}

export default function ChatStream({ messages }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  )
}
