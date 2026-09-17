import { useEffect, useState } from 'react'
import { BellRing, Heart, MapPin, Users, CalendarDays } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import { Modal } from '@/components/ui/Modal/Modal'
import { eventApi } from '@/services/api/eventApi'
import type { AcademyEvent } from '@/types/event'
import { formatDate, formatTime } from '@/utils/date'
import { useToast } from '@/hooks/useToast'

export default function AdminEvents() {
  const toast = useToast()
  const [events, setEvents] = useState<AcademyEvent[]>([])
  const [interest, setInterest] = useState<Record<string, number>>({})
  const [alerted, setAlerted] = useState<Record<string, boolean>>({})
  const [alertTarget, setAlertTarget] = useState<AcademyEvent | null>(null)

  useEffect(() => {
    void eventApi.getEvents().then((list) => {
      setEvents(list)
      const seed: Record<string, number> = {}
      list.forEach((e) => {
        seed[e.id] = Math.round(e.registeredCount * 0.45)
      })
      setInterest(seed)
    })
  }, [])

  const sendAlert = (event: AcademyEvent) => {
    setAlerted((prev) => ({ ...prev, [event.id]: true }))
    setInterest((prev) => ({ ...prev, [event.id]: (prev[event.id] ?? 0) + 8 }))
    setAlertTarget(null)
    toast.success('Alert sent', `Students notified about ${event.title}.`)
  }

  const markInterest = (id: string) => {
    setInterest((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }))
    toast.success('Interest logged', 'Student interest recorded for this demo.')
  }

  return (
    <PageContainer>
      <PageHeader
        title="Events & concerts"
        description="Publish performances, workshops, and send alerts so students know what to prepare for."
        actions={
          <Button
            onClick={() => {
              const concert = events.find((e) => e.type === 'concert')
              if (concert) setAlertTarget(concert)
            }}
          >
            <BellRing size={16} /> Concert alert
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardContent className="pt-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge variant="accent" className="mb-2 capitalize">
                    {event.type}
                  </Badge>
                  <h3 className="text-lg font-semibold text-[var(--text)]">{event.title}</h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{event.description}</p>
                </div>
                {alerted[event.id] ? <Badge variant="success">Alerted</Badge> : null}
              </div>

              <div className="mt-4 grid gap-2 text-sm text-[var(--text-secondary)] sm:grid-cols-2">
                <p className="inline-flex items-center gap-2">
                  <CalendarDays size={14} className="text-[var(--accent)]" />
                  {formatDate(event.date)} · {formatTime(event.time)}
                </p>
                <p className="inline-flex items-center gap-2">
                  <MapPin size={14} className="text-[var(--accent)]" />
                  {event.location}
                </p>
                <p className="inline-flex items-center gap-2">
                  <Users size={14} className="text-[var(--accent)]" />
                  {event.registeredCount}/{event.capacity} registered
                </p>
                <p className="inline-flex items-center gap-2">
                  <Heart size={14} className="text-[var(--ai)]" />
                  {interest[event.id] ?? 0} interested
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => markInterest(event.id)}>
                  <Heart size={14} /> Show interest
                </Button>
                <Button size="sm" onClick={() => setAlertTarget(event)}>
                  <BellRing size={14} /> Alert students
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        open={Boolean(alertTarget)}
        onClose={() => setAlertTarget(null)}
        title="Send event alert"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setAlertTarget(null)}>
              Cancel
            </Button>
            <Button onClick={() => alertTarget && sendAlert(alertTarget)}>
              <BellRing size={16} /> Send alert
            </Button>
          </div>
        }
      >
        {alertTarget ? (
          <div className="space-y-3 text-sm text-[var(--text-secondary)]">
            <p>
              Push a notification for <strong className="text-[var(--text)]">{alertTarget.title}</strong> to all
              active students and parents.
            </p>
            <div className="rounded-xl bg-[var(--surface-muted)] p-4">
              <p className="font-medium text-[var(--text)]">Preview</p>
              <p className="mt-2">
                “{alertTarget.title} is on {formatDate(alertTarget.date)} at {formatTime(alertTarget.time)}. Tap
                Interest if you want to perform or attend with family.”
              </p>
            </div>
          </div>
        ) : null}
      </Modal>
    </PageContainer>
  )
}
