import { useEffect, useState } from 'react'
import { Heart, Bell, MapPin, CalendarDays } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import { eventApi } from '@/services/api/eventApi'
import type { AcademyEvent } from '@/types/event'
import { formatDate, formatTime } from '@/utils/date'
import { useToast } from '@/hooks/useToast'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface EventsInterestPageProps {
  audience?: 'student' | 'parent'
}

export default function ChildEventsPage({ audience = 'student' }: EventsInterestPageProps) {
  const toast = useToast()
  const [events, setEvents] = useState<AcademyEvent[]>([])
  const [interested, setInterested] = useLocalStorage<string[]>('rhythmonic.eventInterest', [])

  useEffect(() => {
    void eventApi.getEvents().then(setEvents)
  }, [])

  const toggleInterest = (id: string, title: string) => {
    setInterested((prev) => {
      if (prev.includes(id)) {
        toast.success('Interest removed', `${title} se interest hata diya.`)
        return prev.filter((x) => x !== id)
      }
      toast.success('Interest saved', `${audience === 'parent' ? 'Parent' : 'Student'} interest noted for ${title}.`)
      return [...prev, id]
    })
  }

  const register = async (event: AcademyEvent) => {
    await eventApi.register(event.id)
    toast.success('Registered', `${event.title} ke liye register ho gaya.`)
    void eventApi.getEvents().then(setEvents)
  }

  return (
    <PageContainer>
      <PageHeader
        title={audience === 'parent' ? 'Events for family' : 'Events & concerts'}
        description={
          audience === 'parent'
            ? 'Admin ke alerts yahan dikhte hain — interest mark karein aur registration track karein.'
            : 'Admin events create karta hai. Yahan interest dikhao aur register karo.'
        }
      />

      <div className="mb-4 rounded-2xl border border-[var(--ai)]/20 bg-[var(--ai-soft)] px-4 py-3 text-sm text-[var(--text-secondary)]">
        <span className="inline-flex items-center gap-2 font-medium text-[var(--ai)]">
          <Bell size={14} /> Alerts from Admin
        </span>
        <p className="mt-1">
          Jab admin concert alert bhejta hai, woh notification + yahan interest option ke saath dikhta hai.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {events.map((event) => {
          const isInterested = interested.includes(event.id)
          return (
            <Card key={event.id}>
              <CardContent className="pt-5">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="accent" className="capitalize">
                    {event.type}
                  </Badge>
                  {isInterested ? <Badge variant="success">Interested</Badge> : null}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-[var(--text)]">{event.title}</h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">{event.description}</p>
                <div className="mt-3 space-y-1 text-sm text-[var(--text-secondary)]">
                  <p className="inline-flex items-center gap-2">
                    <CalendarDays size={14} className="text-[var(--accent)]" />
                    {formatDate(event.date)} · {formatTime(event.time)}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={14} className="text-[var(--accent)]" />
                    {event.location}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={isInterested ? 'secondary' : 'outline'}
                    onClick={() => toggleInterest(event.id, event.title)}
                  >
                    <Heart size={14} /> {isInterested ? 'Interested' : 'Show interest'}
                  </Button>
                  {event.isRegistered ? (
                    <Badge variant="success">Registered</Badge>
                  ) : (
                    <Button size="sm" onClick={() => void register(event)}>
                      Register
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </PageContainer>
  )
}
