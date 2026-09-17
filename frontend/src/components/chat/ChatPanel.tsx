import { useCallback, useEffect, useState } from 'react'
import { ArrowLeft, MessageCircle, Send } from 'lucide-react'
import { chatApi } from '@/services/api/chatApi'
import type { ChatConversation, ChatMessage } from '@/types/chat'
import { useApp } from '@/context/AppContext'
import { cn, getInitials } from '@/utils/format'
import { Avatar } from '@/components/ui/Avatar/Avatar'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { EmptyState } from '@/components/ui/EmptyState/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton/Skeleton'

interface ChatPanelProps {
  className?: string
}

export function ChatPanel({ className }: ChatPanelProps) {
  const { currentUser, childView } = useApp()

  function senderRole(): ChatMessage['senderRole'] {
    if (currentUser.role === 'teacher') return 'teacher'
    if (currentUser.role === 'child' && childView === 'parent') return 'parent'
    return 'student'
  }

  const [conversations, setConversations] = useState<ChatConversation[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const [loadingList, setLoadingList] = useState(true)
  const [sending, setSending] = useState(false)
  const [mobileShowChat, setMobileShowChat] = useState(false)

  const loadConversations = useCallback(async () => {
    setLoadingList(true)
    try {
      const list = await chatApi.getConversations()
      setConversations(list)
      setActiveId((prev) => prev ?? list[0]?.id ?? null)
    } finally {
      setLoadingList(false)
    }
  }, [])

  useEffect(() => {
    void loadConversations()
  }, [loadConversations])

  useEffect(() => {
    if (!activeId) {
      setMessages([])
      return
    }
    let cancelled = false
    void chatApi.getMessages(activeId).then((msgs) => {
      if (!cancelled) setMessages(msgs)
    })
    return () => {
      cancelled = true
    }
  }, [activeId])

  const activeConversation = conversations.find((c) => c.id === activeId)

  const handleSend = async () => {
    const content = draft.trim()
    if (!content || !activeId || sending) return
    setSending(true)
    setDraft('')
    try {
      const msg = await chatApi.sendMessage(
        activeId,
        content,
        currentUser.id,
        currentUser.name,
        senderRole(),
      )
      setMessages((prev) => [...prev, msg])
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId
            ? { ...c, lastMessage: content, lastMessageAt: msg.timestamp }
            : c,
        ),
      )
    } finally {
      setSending(false)
    }
  }

  const selectConversation = (id: string) => {
    setDraft('')
    setActiveId(id)
    setMobileShowChat(true)
    void chatApi.getMessages(id).then(setMessages)
  }

  return (
    <div
      className={cn(
        'flex h-[min(640px,calc(100vh-14rem))] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]',
        className,
      )}
    >
      <aside
        className={cn(
          'flex w-full shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface-muted)]/50 md:max-w-[280px]',
          mobileShowChat ? 'hidden md:flex' : 'flex',
        )}
      >
        <div className="border-b border-[var(--border)] px-4 py-3">
          <h2 className="text-sm font-semibold text-[var(--text)]">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loadingList ? (
            <div className="space-y-2 p-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                type="button"
                onClick={() => selectConversation(conv.id)}
                className={cn(
                  'flex w-full gap-3 border-b border-[var(--border)] px-4 py-3 text-left',
                  activeId === conv.id ? 'bg-[var(--accent-soft)]' : 'hover:bg-[var(--surface)]',
                )}
              >
                <Avatar initials={getInitials(conv.title)} size="md" online={conv.online} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-[var(--text)]">{conv.title}</span>
                    {conv.unreadCount > 0 ? (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-[var(--on-accent)]">
                        {conv.unreadCount}
                      </span>
                    ) : null}
                  </div>
                  <p className="truncate text-xs text-[var(--text-secondary)]">{conv.lastMessage}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </aside>

      <div
        className={cn(
          'min-w-0 flex-1 flex-col',
          mobileShowChat ? 'flex' : 'hidden md:flex',
        )}
      >
        {activeConversation ? (
          <>
            <div className="flex items-center gap-2 border-b border-[var(--border)] px-3 py-3 sm:px-5 sm:py-4">
              <button
                type="button"
                className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--surface-muted)] md:hidden"
                onClick={() => setMobileShowChat(false)}
                aria-label="Back to conversations"
              >
                <ArrowLeft size={18} />
              </button>
              <div className="min-w-0">
                <p className="truncate font-medium text-[var(--text)]">{activeConversation.title}</p>
                <p className="truncate text-xs text-[var(--text-secondary)]">
                  {activeConversation.online ? 'Online' : 'Offline'} ·{' '}
                  {activeConversation.participants.map((p) => p.name).join(', ')}
                </p>
              </div>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto px-3 py-4 sm:px-5">
              {messages.map((msg) => {
                const mine = msg.senderId === currentUser.id
                return (
                  <div key={msg.id} className={cn('flex', mine ? 'justify-end' : 'justify-start')}>
                    <div
                      className={cn(
                        'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm',
                        mine
                          ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                          : 'border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text)]',
                      )}
                    >
                      {!mine ? (
                        <p className="mb-1 text-xs font-medium text-[var(--text-secondary)]">
                          {msg.senderName}
                        </p>
                      ) : null}
                      <p>{msg.content}</p>
                      <p
                        className={cn(
                          'mt-1 text-[10px]',
                          mine ? 'text-[var(--on-accent)]/70' : 'text-[var(--text-muted)]',
                        )}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex gap-2 border-t border-[var(--border)] p-3 sm:p-4">
              <Input
                placeholder="Type a message…"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    void handleSend()
                  }
                }}
                className="flex-1"
              />
              <Button
                variant="primary"
                onClick={() => void handleSend()}
                loading={sending}
                disabled={!draft.trim()}
                aria-label="Send message"
              >
                <Send size={18} />
              </Button>
            </div>
          </>
        ) : (
          <EmptyState
            className="m-4 flex-1 border-none bg-transparent"
            icon={<MessageCircle size={28} />}
            title="Select a conversation"
            description="Choose a thread from the list to view messages and reply."
          />
        )}
      </div>
    </div>
  )
}
