import { Mic2, Clock, CheckCircle2, Wrench } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { StatCard } from '@/components/ui/StatCard/StatCard'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/utils/format'

const ROOMS = [
  {
    id: 'a',
    name: 'Studio A',
    status: 'booked' as const,
    slot: '5:30–6:30 PM',
    who: 'Aarav Patel · Guitar demo',
    gear: '2 mics · Interface',
  },
  {
    id: 'b',
    name: 'Studio B',
    status: 'available' as const,
    slot: 'Next free 7:00 PM',
    who: 'Open for booking',
    gear: 'Vocal booth ready',
  },
  {
    id: 'c',
    name: 'Live Room',
    status: 'maintenance' as const,
    slot: 'Sat deep clean',
    who: 'Closed till Sunday',
    gear: 'Drum kit + amps',
  },
  {
    id: 'd',
    name: 'Podcast Nook',
    status: 'available' as const,
    slot: 'Anytime today',
    who: 'Open for booking',
    gear: 'USB mic · Quiet',
  },
]

const QUEUE = [
  { time: '6:30 PM', title: 'Kabir · Fingerstyle take', room: 'Studio A' },
  { time: '7:00 PM', title: 'Vocal Intermediate group', room: 'Studio B' },
  { time: '8:00 PM', title: 'Parent showcase edit', room: 'Studio A' },
]

export default function Studio() {
  const toast = useToast()

  return (
    <PageContainer>
      <PageHeader
        title="Recording Studio"
        description="Room status, bookings, and demo session queue."
        actions={
          <Button
            size="sm"
            onClick={() => toast.success('Slot held', 'Studio B reserved for 7 PM (demo)')}
          >
            Book room
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Rooms" value={ROOMS.length} icon={<Mic2 size={18} />} />
        <StatCard title="Available now" value={2} icon={<CheckCircle2 size={18} />} />
        <StatCard title="In session" value={1} icon={<Clock size={18} />} />
        <StatCard title="Maintenance" value={1} icon={<Wrench size={18} />} />
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ROOMS.map((r) => (
          <Card key={r.id} hover className="h-full">
            <CardContent className="space-y-3 pt-5">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-[var(--text)]">{r.name}</p>
                <Badge
                  variant={
                    r.status === 'available' ? 'success' : r.status === 'booked' ? 'accent' : 'warning'
                  }
                  className="capitalize"
                >
                  {r.status}
                </Badge>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{r.who}</p>
              <p className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                <Clock size={12} /> {r.slot}
              </p>
              <p className="rounded-xl bg-[var(--bg)] px-3 py-2 text-xs text-[var(--text-secondary)]">
                {r.gear}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-5">
          <h3 className="mb-4 text-base font-semibold text-[var(--text)]">Today&apos;s queue</h3>
          <div className="space-y-2">
            {QUEUE.map((q, i) => (
              <div
                key={q.time}
                className={cn(
                  'flex flex-col gap-1 rounded-xl border border-[var(--border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between',
                  i === 0 && 'border-[var(--accent)] bg-[var(--accent-soft)]/30',
                )}
              >
                <div>
                  <p className="font-medium text-[var(--text)]">{q.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">{q.room}</p>
                </div>
                <span className="text-sm font-semibold text-[var(--accent)]">{q.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
