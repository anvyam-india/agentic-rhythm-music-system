import { useMemo } from 'react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { AcademyCalendar, type CalendarEventItem } from '@/components/calendar/AcademyCalendar'
import { mockClasses } from '@/services/mock/mockClasses'
import { mockEvents } from '@/services/mock/mockEvents'
import { mockStudioSessions } from '@/services/mock/mockStudio'
import { mockAssignments } from '@/services/mock/mockAssignments'
import { useToast } from '@/hooks/useToast'
import { formatTime } from '@/utils/date'

interface AcademyCalendarPageProps {
  title?: string
  description?: string
}

export default function AcademyCalendarPage({
  title = 'Academy calendar',
  description = 'Classes, concerts, studio sessions, and assignment due dates in one view.',
}: AcademyCalendarPageProps) {
  const toast = useToast()

  const events = useMemo<CalendarEventItem[]>(() => {
    const classItems: CalendarEventItem[] = mockClasses.map((c) => ({
      id: c.id,
      title: c.title,
      date: c.date,
      time: formatTime(c.startTime),
      kind: 'class',
      meta: `${c.teacherName} · Room ${c.room}`,
    }))
    const eventItems: CalendarEventItem[] = mockEvents.map((e) => ({
      id: e.id,
      title: e.title,
      date: e.date,
      time: formatTime(e.time),
      kind: 'event',
      meta: e.location,
    }))
    const studioItems: CalendarEventItem[] = mockStudioSessions.map((s) => ({
      id: s.id,
      title: s.sessionType,
      date: s.date,
      time: formatTime(s.time),
      kind: 'studio',
      meta: `${s.studentName} · ${s.room}`,
    }))
    const assignmentItems: CalendarEventItem[] = mockAssignments.slice(0, 6).map((a) => ({
      id: a.id,
      title: a.title,
      date: a.dueDate,
      kind: 'assignment',
      meta: `Due · ${a.instrument}`,
    }))
    return [...classItems, ...eventItems, ...studioItems, ...assignmentItems]
  }, [])

  return (
    <PageContainer>
      <PageHeader title={title} description={description} />
      <AcademyCalendar
        events={events}
        onSelectEvent={(ev) => toast.success(ev.title, ev.meta ?? ev.kind)}
      />
    </PageContainer>
  )
}
