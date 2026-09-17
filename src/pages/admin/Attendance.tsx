import { useMemo } from 'react'
import { Users, GraduationCap, UserCheck, UserX, Clock } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { StatCard } from '@/components/ui/StatCard/StatCard'
import { mockAttendance } from '@/services/mock/mockAttendance'
import { mockStudents } from '@/services/mock/mockStudents'
import { mockTeachers } from '@/services/mock/mockTeachers'
import { mockClasses } from '@/services/mock/mockClasses'

export default function AdminAttendance() {
  const today = '2026-09-17'
  const todayRows = mockAttendance.filter((a) => a.date === today)

  const studentStats = useMemo(() => {
    const present = todayRows.filter((a) => a.status === 'present').length
    const absent = todayRows.filter((a) => a.status === 'absent').length
    const late = todayRows.filter((a) => a.status === 'late').length
    const excused = todayRows.filter((a) => a.status === 'excused').length
    const total = present + absent + late + excused
    return { total, present, absent, late, excused }
  }, [todayRows])

  const teacherStats = {
    total: mockTeachers.length,
    present: 16,
    absent: 2,
    late: 0,
  }

  const byClass = mockClasses
    .filter((c) => c.date === today)
    .map((c) => {
      const rows = todayRows.filter((a) => a.classId === c.id)
      const present = rows.filter((a) => a.status === 'present').length
      const absent = rows.filter((a) => a.status === 'absent').length
      const late = rows.filter((a) => a.status === 'late').length
      const total = c.studentIds.length
      return { class: c, total, present, absent, late }
    })

  return (
    <PageContainer>
      <PageHeader
        title="Attendance"
        description="Today’s live counts for students and teachers — present, absent, and late."
      />

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
        Students · today
      </h2>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Total marked" value={studentStats.total || 31} icon={<Users size={18} />} />
        <StatCard title="Present" value={studentStats.present || 28} icon={<UserCheck size={18} />} />
        <StatCard title="Absent" value={studentStats.absent || 2} icon={<UserX size={18} />} />
        <StatCard title="Late" value={studentStats.late || 1} icon={<Clock size={18} />} />
        <StatCard title="Active roster" value={mockStudents.filter((s) => s.status === 'active').length} icon={<Users size={18} />} />
      </div>

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
        Teachers · today
      </h2>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total teachers" value={teacherStats.total} icon={<GraduationCap size={18} />} />
        <StatCard title="Present" value={teacherStats.present} icon={<UserCheck size={18} />} />
        <StatCard title="Absent" value={teacherStats.absent} icon={<UserX size={18} />} />
        <StatCard title="On leave" value={0} icon={<Clock size={18} />} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class-wise breakdown</CardTitle>
          <CardDescription>Total / Present / Absent / Late for today&apos;s batches</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {byClass.map(({ class: c, total, present, absent, late }) => (
            <div
              key={c.id}
              className="flex flex-col gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-[var(--text)]">{c.title}</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {c.teacherName} · Room {c.room}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="neutral">Total {total}</Badge>
                <Badge variant="success">Present {present || Math.max(total - 2, 0)}</Badge>
                <Badge variant="danger">Absent {absent || 1}</Badge>
                <Badge variant="warning">Late {late || 1}</Badge>
              </div>
            </div>
          ))}
          {byClass.length === 0 ? (
            <p className="text-sm text-[var(--text-secondary)]">No classes for the demo date.</p>
          ) : null}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Absent — last 7 days</CardTitle>
          <CardDescription>Students with repeated absences · Smart Insights — Demo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { name: 'Harsh Solanki', meta: 'Guitar L2 · 3 days', teacher: 'Jayesh Patel' },
            { name: 'Sara Banerjee', meta: 'Keyboard · 2 days', teacher: 'Riya Mehta' },
            { name: 'Dev Patel', meta: 'Guitar L2 · 2 days', teacher: 'Jayesh Patel' },
            { name: 'Vivaan Desai', meta: 'Guitar L2 · 1 day + late', teacher: 'Jayesh Patel' },
            { name: 'Riya Shah', meta: 'Vocals · 1 day', teacher: 'Neha Desai' },
          ].map((s) => (
            <div
              key={s.name}
              className="flex flex-col gap-1 rounded-xl border border-[var(--border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-[var(--text)]">{s.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{s.meta}</p>
              </div>
              <Badge variant="danger">{s.teacher}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageContainer>
  )
}
