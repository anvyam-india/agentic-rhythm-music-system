import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Tabs } from '@/components/ui/Tabs/Tabs'
import { Avatar } from '@/components/ui/Avatar/Avatar'
import { Badge } from '@/components/ui/Badge/Badge'
import { Progress } from '@/components/ui/Progress/Progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card/Card'
import { DonutChart } from '@/components/charts/Charts'
import { PracticeCard } from '@/components/music/PracticeCard'
import { SkeletonProfile } from '@/components/ui/Skeleton/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState/EmptyState'
import { studentApi } from '@/services/api/studentApi'
import { attendanceApi } from '@/services/api/attendanceApi'
import { assignmentApi } from '@/services/api/assignmentApi'
import { practiceApi } from '@/services/api/practiceApi'
import { paymentApi } from '@/services/api/paymentApi'
import { mockAchievements } from '@/services/mock/mockApi'
import type { Student } from '@/types/student'
import type { AttendanceRecord } from '@/types/attendance'
import type { Assignment } from '@/types/assignment'
import type { PracticeSession } from '@/types/practice'
import type { Payment } from '@/types/payment'
import type { StudentFeedback } from '@/types/student'
import { formatDate } from '@/utils/date'
import { formatCurrency, formatMinutes } from '@/utils/format'

const TAB_IDS = [
  'overview',
  'attendance',
  'progress',
  'practice',
  'assignments',
  'feedback',
  'payments',
  'achievements',
] as const

type TabId = (typeof TAB_IDS)[number]

const TAB_LABELS: Record<TabId, string> = {
  overview: 'Overview',
  attendance: 'Attendance',
  progress: 'Progress',
  practice: 'Practice',
  assignments: 'Assignments',
  feedback: 'Feedback',
  payments: 'Payments',
  achievements: 'Achievements',
}

export default function AdminStudentDetails() {
  const { id = 'student-001' } = useParams<{ id: string }>()
  const [tab, setTab] = useState<TabId>('overview')
  const [student, setStudent] = useState<Student | null>(null)
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [practice, setPractice] = useState<PracticeSession[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [feedback, setFeedback] = useState<StudentFeedback[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)
    void Promise.all([
      studentApi.getStudentById(id),
      attendanceApi.getByStudent(id),
      assignmentApi.getByStudent(id),
      practiceApi.getHistory(id),
      paymentApi.getByStudent(id),
      studentApi.getFeedback(id),
    ]).then(([s, att, asn, pr, pay, fb]) => {
      if (!active) return
      setStudent(s)
      setAttendance(att)
      setAssignments(asn)
      setPractice(pr)
      setPayments(pay)
      setFeedback(fb)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [id])

  if (loading) {
    return (
      <PageContainer>
        <SkeletonProfile />
      </PageContainer>
    )
  }

  if (!student) {
    return (
      <PageContainer>
        <EmptyState
          title="Student not found"
          description="Return to the roster to pick another profile."
          action={
            <Link to="/admin/students" className="text-[var(--accent)] hover:underline">
              Back to students
            </Link>
          }
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageHeader
        title={student.name}
        description={`${student.instrument} · ${student.level} · ${student.batch}`}
        breadcrumbs={[
          { label: 'Students', path: '/admin/students' },
          { label: student.name },
        ]}
        actions={<Badge variant="success">{student.status.replace('_', ' ')}</Badge>}
      />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Avatar initials={student.avatarInitials} size="lg" />
        <div className="grid flex-1 gap-2 text-sm sm:grid-cols-3">
          <p className="text-[var(--text-secondary)]">
            Parent: <span className="text-[var(--text)]">{student.parentName}</span>
          </p>
          <p className="text-[var(--text-secondary)]">
            Practice: <span className="text-[var(--text)]">{formatMinutes(student.practiceMinutes)}</span> this month
          </p>
          <p className="text-[var(--text-secondary)]">
            Streak: <span className="text-[var(--text)]">{student.streak} days</span>
          </p>
        </div>
      </div>

      <Tabs
        tabs={TAB_IDS.map((t) => ({ id: t, label: TAB_LABELS[t] }))}
        active={tab}
        onChange={(v) => setTab(v as TabId)}
        className="mb-6"
      />

      {tab === 'overview' && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <DonutChart value={student.attendancePercentage} label="Present" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <DonutChart value={student.progressPercentage} label="Curriculum" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-[var(--text-secondary)]">
              <p>Joined {formatDate(student.joinedAt)}</p>
              <p>Teacher ID: {student.teacherId} (Jayesh Patel for hero demo)</p>
              <p>Parent contact: {student.parentPhone}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === 'attendance' && (
        <div className="space-y-2">
          {attendance.length === 0 ? (
            <EmptyState title="No attendance rows" description="Records appear after classes are marked." />
          ) : (
            attendance.map((row) => (
              <div key={row.id} className="flex items-center justify-between rounded-2xl border border-[var(--border)] px-4 py-3">
                <span className="text-sm text-[var(--text)]">{formatDate(row.date)}</span>
                <Badge variant={row.status === 'present' ? 'success' : row.status === 'late' ? 'warning' : 'danger'}>
                  {row.status}
                </Badge>
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'progress' && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <Progress label="Overall curriculum" value={student.progressPercentage} />
            <Progress label="Attendance consistency" value={student.attendancePercentage} />
            <Progress label="Practice engagement" value={Math.min(100, Math.round(student.practiceMinutes / 4))} />
          </CardContent>
        </Card>
      )}

      {tab === 'practice' && (
        <div className="grid gap-4 md:grid-cols-2">
          {practice.map((session) => (
            <PracticeCard key={session.id} session={session} />
          ))}
        </div>
      )}

      {tab === 'assignments' && (
        <div className="space-y-3">
          {assignments.map((a) => (
            <Card key={a.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-2 pt-5">
                <div>
                  <p className="font-medium text-[var(--text)]">{a.title}</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Due {formatDate(a.dueDate)} · {a.skill}
                  </p>
                </div>
                <Badge variant={a.status === 'overdue' ? 'danger' : 'accent'}>{a.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === 'feedback' && (
        <div className="space-y-3">
          {feedback.map((f) => (
            <Card key={f.id}>
              <CardContent className="pt-5">
                <p className="text-sm font-medium text-[var(--text)]">{f.teacherName}</p>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{f.message}</p>
                <p className="mt-2 text-xs text-[var(--text-muted)]">{formatDate(f.createdAt.slice(0, 10))}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === 'payments' && (
        <div className="space-y-3">
          {payments.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-2xl border border-[var(--border)] px-4 py-3">
              <div>
                <p className="font-medium text-[var(--text)]">{p.month}</p>
                <p className="text-xs text-[var(--text-muted)]">Due {formatDate(p.dueDate)}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-[var(--text)]">{formatCurrency(p.amount)}</p>
                <Badge variant={p.status === 'paid' ? 'success' : p.status === 'overdue' ? 'danger' : 'warning'}>
                  {p.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'achievements' && (
        <div className="grid gap-4 md:grid-cols-2">
          {mockAchievements.map((ach) => (
            <Card key={ach.id} className={ach.unlocked ? '' : 'opacity-60'}>
              <CardContent className="pt-5">
                <p className="font-medium text-[var(--text)]">{ach.title}</p>
                <p className="text-sm text-[var(--text-secondary)]">{ach.description}</p>
                {ach.earnedAt ? (
                  <p className="mt-2 text-xs text-[var(--text-muted)]">Earned {formatDate(ach.earnedAt)}</p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </PageContainer>
  )
}
