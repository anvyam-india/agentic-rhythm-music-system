import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Flame, Music, Calendar, ArrowRight, Guitar } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { Button } from '@/components/ui/Button/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Progress } from '@/components/ui/Progress/Progress'
import { BarChart } from '@/components/charts/Charts'
import { classApi } from '@/services/api/classApi'
import { practiceApi } from '@/services/api/practiceApi'
import { mockStudents } from '@/services/mock/mockStudents'
import type { MusicClass } from '@/types/class'
import type { WeeklyPracticeDay } from '@/types/practice'
import { formatTime, getGreeting } from '@/utils/date'
import { formatMinutes } from '@/utils/format'

const AARAV = mockStudents.find((s) => s.id === 'student-001')!

export default function ChildDashboard() {
  const [nextClass, setNextClass] = useState<MusicClass | null>(null)
  const [week, setWeek] = useState<WeeklyPracticeDay[]>([])

  useEffect(() => {
    void classApi.getTodaysClasses('teacher-001').then((list) => setNextClass(list[0] ?? null))
    void practiceApi.getWeeklyPractice().then(setWeek)
  }, [])

  const weekTotal = week.reduce((sum, d) => sum + d.minutes, 0)
  const weekGoal = 300
  const weekChart = week.map((d) => ({ label: d.day, value: d.minutes }))

  return (
    <PageContainer>
      <div className="mb-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]">
        <div className="grid gap-6 p-6 md:grid-cols-[1.4fr_1fr] md:p-8">
          <div>
            <p className="text-sm font-medium text-[var(--accent)]">
              {getGreeting()}, Aarav
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--text)] md:text-3xl">
              Keep making music
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge variant="accent">
                <span className="inline-flex items-center gap-1">
                  <Guitar size={12} /> Guitar · Level 2
                </span>
              </Badge>
              <Badge variant="warning">
                <span className="inline-flex items-center gap-1">
                  <Flame size={12} /> {AARAV.streak} day streak
                </span>
              </Badge>
            </div>
            <p className="mt-4 max-w-lg text-sm text-[var(--text-secondary)]">
              This week: {formatMinutes(weekTotal)} / 5h · Progress {AARAV.progressPercentage}%. One focused
              session today keeps you on track for the annual concert.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/child/practice">
                <Button size="md">
                  <Music size={16} /> Practice Now
                </Button>
              </Link>
              <Link to="/child/progress">
                <Button size="md" variant="outline">
                  View Progress <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>

          <Card className="border-[var(--border)] bg-[var(--bg)] shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar size={16} className="text-[var(--accent)]" /> Next class
              </CardTitle>
            </CardHeader>
            <CardContent>
              {nextClass ? (
                <>
                  <Badge variant="success" className="mb-3">
                    Today
                  </Badge>
                  <p className="text-lg font-semibold text-[var(--text)]">{nextClass.title}</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {formatTime(nextClass.startTime)} · Jayesh Sir · Room {nextClass.room}
                  </p>
                  <Progress className="mt-4" label="Weekly practice goal" value={(weekTotal / weekGoal) * 100} />
                </>
              ) : (
                <p className="text-sm text-[var(--text-secondary)]">No upcoming class loaded.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 pt-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <Flame size={20} />
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Practice streak</p>
              <p className="text-2xl font-semibold text-[var(--text)]">{AARAV.streak} days</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-sm text-[var(--text-secondary)]">This week</p>
            <p className="text-2xl font-semibold text-[var(--text)]">
              {formatMinutes(weekTotal)} <span className="text-sm font-normal text-[var(--text-muted)]">/ 5h</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-sm text-[var(--text-secondary)]">Overall progress</p>
            <p className="text-2xl font-semibold text-[var(--text)]">{AARAV.progressPercentage}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly practice</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={weekChart} valueSuffix="m" height={200} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Level 2 focus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress label="Pitch" value={82} />
            <Progress label="Rhythm" value={74} />
            <Progress label="Technique" value={78} />
            <Progress label="Song performance" value={85} />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
