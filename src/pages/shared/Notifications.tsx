import { useEffect, useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Badge } from '@/components/ui/Badge/Badge'
import { notificationApi } from '@/services/api/notificationApi'
import type { AppNotification } from '@/types/notification'
import { relativeTime } from '@/utils/date'

export default function SharedNotifications() {
  const [items, setItems] = useState<AppNotification[]>([])

  useEffect(() => {
    void notificationApi.getNotifications().then(setItems)
  }, [])

  return (
    <PageContainer>
      <PageHeader title="Notifications" description="Academy alerts, class reminders, and payment notices." />
      <div className="space-y-3">
        {items.map((n) => (
          <div key={n.id} className="rounded-2xl border border-[var(--border)] px-4 py-3">
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium text-[var(--text)]">{n.title}</p>
              <Badge variant={n.read ? 'neutral' : 'accent'}>{n.read ? 'Read' : 'New'}</Badge>
            </div>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{n.message}</p>
            <p className="mt-2 text-xs text-[var(--text-muted)]">{relativeTime(n.createdAt)}</p>
          </div>
        ))}
      </div>
    </PageContainer>
  )
}
