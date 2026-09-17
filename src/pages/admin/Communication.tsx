import { MessageSquare, Send, Megaphone, Users } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { StatCard } from '@/components/ui/StatCard/StatCard'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import { useToast } from '@/hooks/useToast'

const CAMPAIGNS = [
  {
    title: 'Fee reminder blast',
    channel: 'SMS + WhatsApp',
    audience: '42 parents',
    status: 'Sent',
    meta: '98% delivered',
  },
  {
    title: 'Open mic invite',
    channel: 'Email',
    audience: 'All students',
    status: 'Scheduled',
    meta: 'Fri 10:00 AM',
  },
  {
    title: 'Concert interest nudge',
    channel: 'In-app',
    audience: 'South Bopal',
    status: 'Draft',
    meta: 'Ready to send',
  },
]

const THREADS = [
  { from: 'Jayesh Patel', preview: 'Room 03 confirmed for L2 evening', time: '10m' },
  { from: 'Mr. Rajesh Patel', preview: 'Aarav will be 10 mins late today', time: '1h' },
  { from: 'Riya Mehta', preview: 'Keyboard beginner needs extra sheets', time: '3h' },
]

export default function Communication() {
  const toast = useToast()

  return (
    <PageContainer>
      <PageHeader
        title="Communication"
        description="Broadcasts, parent messages, and faculty threads."
        actions={
          <Button size="sm" onClick={() => toast.success('Composer opened', 'Demo broadcast draft ready')}>
            <Megaphone size={14} /> New broadcast
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Sent this week" value={12} icon={<Send size={18} />} />
        <StatCard title="Open rate" value="72%" icon={<Megaphone size={18} />} />
        <StatCard title="Active threads" value={8} icon={<MessageSquare size={18} />} />
        <StatCard title="Reach" value="248" icon={<Users size={18} />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            Campaigns
          </h3>
          {CAMPAIGNS.map((c) => (
            <Card key={c.title} hover>
              <CardContent className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-[var(--text)]">{c.title}</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {c.channel} · {c.audience}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">{c.meta}</p>
                </div>
                <Badge
                  variant={
                    c.status === 'Sent' ? 'success' : c.status === 'Scheduled' ? 'accent' : 'neutral'
                  }
                >
                  {c.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            Recent messages
          </h3>
          <Card>
            <CardContent className="divide-y divide-[var(--border)] pt-2">
              {THREADS.map((t) => (
                <button
                  key={t.from}
                  type="button"
                  className="flex w-full items-start justify-between gap-3 py-3 text-left hover:bg-[var(--surface-muted)]"
                  onClick={() => toast.success('Thread opened', t.from)}
                >
                  <div className="min-w-0">
                    <p className="font-medium text-[var(--text)]">{t.from}</p>
                    <p className="truncate text-sm text-[var(--text-secondary)]">{t.preview}</p>
                  </div>
                  <span className="shrink-0 text-xs text-[var(--text-muted)]">{t.time}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}
