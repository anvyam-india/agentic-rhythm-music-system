import { useEffect, useRef, useState } from 'react'
import { Bell } from 'lucide-react'
import { notificationApi } from '@/services/api/notificationApi'
import type { AppNotification } from '@/types/notification'
import { useApp } from '@/context/AppContext'
import { useToast } from '@/hooks/useToast'
import { relativeTime } from '@/utils/date'
import { Button } from '@/components/ui/Button/Button'

export function NotificationCenter() {
  const { currentRole } = useApp()
  const { pushToast } = useToast()
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<AppNotification[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    void notificationApi.getNotifications(currentRole).then(setItems)
  }, [currentRole])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const unread = items.filter((n) => !n.read).length

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="ghost"
        size="sm"
        className="relative !rounded-xl !px-2"
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
      >
        <Bell size={16} />
        {unread > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-[var(--on-accent)]">
            {unread}
          </span>
        ) : null}
      </Button>
      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-80 animate-slide-up rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] sm:w-96">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <p className="font-semibold text-[var(--text)]">Notifications</p>
            <button
              type="button"
              className="text-xs text-[var(--accent)]"
              onClick={async () => {
                await notificationApi.markAllRead()
                setItems((prev) => prev.map((n) => ({ ...n, read: true })))
                pushToast({ title: 'Notification marked as read', type: 'success' })
              }}
            >
              Mark all read
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto scrollbar-thin">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                className="flex w-full flex-col gap-1 border-b border-[var(--border)] px-4 py-3 text-left hover:bg-[var(--surface-muted)]"
                onClick={async () => {
                  await notificationApi.markRead(item.id)
                  setItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, read: true } : n)))
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-[var(--text)]">{item.title}</span>
                  {!item.read ? <span className="h-2 w-2 rounded-full bg-[var(--accent)]" /> : null}
                </div>
                <span className="text-xs text-[var(--text-secondary)]">{item.message}</span>
                <span className="text-[10px] text-[var(--text-muted)]">{relativeTime(item.createdAt)}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
