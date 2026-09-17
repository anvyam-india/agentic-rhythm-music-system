import { Link } from 'react-router-dom'
import { UserCheck, UserX, Users, Clock } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { StatCard } from '@/components/ui/StatCard/StatCard'
import { Button } from '@/components/ui/Button/Button'
import { mockClasses } from '@/services/mock/mockClasses'
import { mockAttendance } from '@/services/mock/mockAttendance'

const TEACHER_ID = 'teacher-001'

export default function TeacherAttendance() {
  const today = '2026-09-17'
  const myClasses = mockClasses.filter((c) => c.teacherId === TEACHER_ID && c.date === today)
  const classId = myClasses[0]?.id
  const rows = mockAttendance.filter((a) => a.classId === classId)

  const total = myClasses[0]?.studentIds.length ?? 8
  const present = rows.filter((r) => r.status === 'present').length || 6
  const absent = rows.filter((r) => r.status === 'absent').length || 1
  const late = rows.filter((r) => r.status === 'late').length || 1

  return (
    <PageContainer>
      <PageHeader
        title="Attendance"
        description="Mark and review attendance for your batches — clear present / absent counts."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Students today" value={total} icon={<Users size={18} />} />
        <StatCard title="Present" value={present} icon={<UserCheck size={18} />} />
        <StatCard title="Absent" value={absent} icon={<UserX size={18} />} />
        <StatCard title="Late" value={late} icon={<Clock size={18} />} />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Today&apos;s batches</CardTitle>
            <CardDescription>Open a class to mark attendance live</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {myClasses.map((c) => (
            <div
              key={c.id}
              className="flex flex-col gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-[var(--text)]">{c.title}</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Room {c.room} · {c.studentIds.length} students
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="neutral">Total {c.studentIds.length}</Badge>
                  <Badge variant="success">Present {present}</Badge>
                  <Badge variant="danger">Absent {absent}</Badge>
                  <Badge variant="warning">Late {late}</Badge>
                </div>
              </div>
              <Link to={`/teacher/classes/${c.id}`}>
                <Button size="sm">Mark attendance</Button>
              </Link>
            </div>
          ))}
          {myClasses.length === 0 ? (
            <p className="text-sm text-[var(--text-secondary)]">No classes today in the demo schedule.</p>
          ) : null}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>My students — absent last 7 days</CardTitle>
          <CardDescription>Follow-up recommended · Demo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { name: 'Harsh Solanki', meta: '3 days absent · Guitar L2' },
            { name: 'Dev Patel', meta: '2 days absent · Guitar L2' },
            { name: 'Vivaan Desai', meta: '1 day absent + late' },
          ].map((s) => (
            <div
              key={s.name}
              className="flex items-center justify-between rounded-xl border border-[var(--border)] px-4 py-3"
            >
              <div>
                <p className="font-medium text-[var(--text)]">{s.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{s.meta}</p>
              </div>
              <Badge variant="danger">Absent</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageContainer>
  )
}
