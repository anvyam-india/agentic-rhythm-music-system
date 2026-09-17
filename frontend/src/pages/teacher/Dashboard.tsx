import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar,
  Users,
  ClipboardCheck,
  FileText,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { StatCard } from '@/components/ui/StatCard/StatCard'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import { classApi } from '@/services/api/classApi'
import { useStudents } from '@/hooks/useStudents'
import type { MusicClass } from '@/types/class'
import { getGreeting, formatTime } from '@/utils/date'

const TEACHER_ID = 'teacher-001'

export default function TeacherDashboard() {
  const [today, setToday] = useState<MusicClass[]>([])
  const { students } = useStudents(TEACHER_ID)
  const greeting = getGreeting()
  const studentsToday = today.reduce((sum, c) => sum + c.studentIds.length, 0)

  useEffect(() => {
    void classApi.getTodaysClasses(TEACHER_ID).then(setToday)
  }, [])

  return (
    <PageContainer>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--accent)]">{greeting}, Jayesh</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--text)] md:text-3xl">
            Teaching day at a glance
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Guitar faculty · mark attendance, review practice, coach Level 2 evening batch.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/teacher/attendance">
            <Button variant="outline" size="sm">
              <ClipboardCheck size={14} /> Mark attendance
            </Button>
          </Link>
          <Link to="/teacher/assignments">
            <Button size="sm">
              <FileText size={14} /> Assignments
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Today's Classes" value={today.length || 4} icon={<Calendar size={18} />} />
        <StatCard title="Students Today" value={studentsToday || 31} icon={<Users size={18} />} />
        <StatCard
          title="Attendance"
          value="94%"
          trend={{ value: 2, direction: 'up' }}
          icon={<ClipboardCheck size={18} />}
        />
        <StatCard
          title="Pending reviews"
          value={7}
          description="Assignments + practice"
          icon={<FileText size={18} />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Today&apos;s classes</CardTitle>
              <CardDescription>
                Timeline for{' '}
                {new Date().toLocaleDateString('en-IN', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'short',
                })}
              </CardDescription>
            </div>
            <Link to="/teacher/classes" className="text-sm font-medium text-[var(--accent)] hover:underline">
              All classes
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {(today.length ? today : []).map((c) => (
              <div
                key={c.id}
                className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <span className="text-sm font-semibold">{formatTime(c.startTime)}</span>
                    <span className="text-[10px] opacity-70">{formatTime(c.endTime)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text)]">{c.title}</p>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--text-secondary)]">
                      <span className="inline-flex items-center gap-1">
                        <Users size={12} /> {c.studentIds.length} students
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} /> Room {c.room}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} /> {c.batch}
                      </span>
                    </p>
                    <Badge variant="accent" className="mt-2 capitalize">
                      {c.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link to={`/teacher/classes/${c.id}`}>
                    <Button variant="outline" size="sm">
                      Open class <ArrowRight size={14} />
                    </Button>
                  </Link>
                  <Link to="/teacher/attendance">
                    <Button size="sm" variant="ghost">
                      Attendance
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
            {today.length === 0 ? (
              <p className="text-sm text-[var(--text-secondary)]">Loading today&apos;s schedule…</p>
            ) : null}
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>My roster</CardTitle>
              <CardDescription>{students.length} active students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {students.slice(0, 6).map((s) => (
                <Link
                  key={s.id}
                  to={`/teacher/students/${s.id}`}
                  className="flex items-center justify-between rounded-xl border border-[var(--border)] px-3 py-2.5 hover:bg-[var(--surface-muted)]"
                >
                  <div>
                    <p className="text-sm font-medium text-[var(--text)]">{s.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {s.instrument} · {s.level}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-[var(--accent)]">{s.progressPercentage}%</span>
                </Link>
              ))}
              <Link to="/teacher/students" className="mt-2 inline-block text-sm font-medium text-[var(--accent)]">
                View all students →
              </Link>
            </CardContent>
          </Card>

          <Card className="border-[var(--accent)]/20 bg-gradient-to-br from-[var(--accent-soft)]/40 to-[var(--surface)]">
            <CardContent className="space-y-2 pt-5">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
                <Sparkles size={14} className="text-[var(--ai)]" /> Coaching tip
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                Aarav & Kabir are ready for barre chords. Give Vivaan a 10-min rhythm warm-up before theory.
              </p>
              <Link to="/teacher/evaluation">
                <Button size="sm" variant="outline" className="mt-2">
                  Open evaluation
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}
