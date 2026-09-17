import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MapPin, Users, Clock, ArrowRight } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import { classApi } from '@/services/api/classApi'
import type { MusicClass } from '@/types/class'
import { formatDate, formatTime } from '@/utils/date'
import { cn } from '@/utils/format'

const TEACHER_ID = 'teacher-001'

type Filter = 'today' | 'upcoming' | 'history'

export default function TeacherClasses() {
  const location = useLocation()
  const [classes, setClasses] = useState<MusicClass[]>([])

  const filter: Filter = location.pathname.includes('upcoming')
    ? 'upcoming'
    : location.pathname.includes('history')
      ? 'history'
      : 'today'

  useEffect(() => {
    void classApi.getClassesByTeacher(TEACHER_ID).then(setClasses)
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'history') return classes.filter((c) => c.status === 'completed')
    if (filter === 'upcoming') return classes.filter((c) => c.status === 'upcoming' && c.date !== '2026-09-17')
    return classes.filter((c) => c.date === '2026-09-17' || c.status === 'upcoming')
  }, [classes, filter])

  const title =
    filter === 'upcoming' ? 'Upcoming classes' : filter === 'history' ? 'Class history' : "Today's classes"

  return (
    <PageContainer>
      <PageHeader
        title={title}
        description="Open a session to take attendance, share notes, or jump into evaluation."
        breadcrumbs={[{ label: 'My Classes' }, { label: title }]}
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {[
          { key: 'today' as const, label: "Today's", to: '/teacher/classes' },
          { key: 'upcoming' as const, label: 'Upcoming', to: '/teacher/classes/upcoming' },
          { key: 'history' as const, label: 'History', to: '/teacher/classes/history' },
        ].map((tab) => (
          <Link
            key={tab.key}
            to={tab.to}
            className={cn(
              'rounded-xl px-3 py-1.5 text-sm font-medium transition',
              filter === tab.key
                ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                : 'bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text)]',
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((c) => (
          <Card key={c.id} hover className="h-full overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-[var(--accent)] to-teal-300" />
            <CardContent className="flex h-full flex-col gap-4 pt-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-lg font-semibold text-[var(--text)]">{c.title}</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{c.batch}</p>
                </div>
                <Badge variant={c.status === 'completed' ? 'neutral' : 'accent'} className="capitalize">
                  {c.status}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--text-secondary)]">
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} className="text-[var(--accent)]" />
                  {formatDate(c.date)} · {formatTime(c.startTime)}–{formatTime(c.endTime)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} /> Room {c.room}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users size={14} /> {c.studentIds.length} students
                </span>
              </div>

              <div className="mt-auto flex gap-2 pt-2">
                <Link to={`/teacher/classes/${c.id}`} className="flex-1">
                  <Button className="w-full" size="sm">
                    Open class <ArrowRight size={14} />
                  </Button>
                </Link>
                <Link to="/teacher/attendance">
                  <Button variant="outline" size="sm">
                    Attendance
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm text-[var(--text-secondary)]">No classes in this view.</p>
      ) : null}
    </PageContainer>
  )
}
