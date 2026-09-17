import { useEffect, useState, type ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import { Modal } from '@/components/ui/Modal/Modal'
import { ChatPanel } from '@/components/chat/ChatPanel'
import { PracticeCard } from '@/components/music/PracticeCard'
import { attendanceApi } from '@/services/api/attendanceApi'
import { assignmentApi } from '@/services/api/assignmentApi'
import { studentApi } from '@/services/api/studentApi'
import { paymentApi } from '@/services/api/paymentApi'
import { practiceApi } from '@/services/api/practiceApi'
import { mockAchievements } from '@/services/mock/mockApi'
import { classApi } from '@/services/api/classApi'
import type { AttendanceRecord } from '@/types/attendance'
import type { Assignment } from '@/types/assignment'
import type { StudentFeedback } from '@/types/student'
import type { Payment } from '@/types/payment'
import type { PracticeSession } from '@/types/practice'
import type { MusicClass } from '@/types/class'
import { formatCurrency } from '@/utils/format'
import { formatDate as fmtDate, formatTime } from '@/utils/date'
import { useToast } from '@/hooks/useToast'
import { Progress } from '@/components/ui/Progress/Progress'
import { mockStudents } from '@/services/mock/mockStudents'
import ChildEventsPage from '@/pages/child/Events'

const STUDENT_ID = 'student-001'
const AARAV = mockStudents.find((s) => s.id === STUDENT_ID)!

function SectionShell({ children }: { children: ReactNode }) {
  return <div className="space-y-3">{children}</div>
}

export function FamilyAttendanceSection() {
  const [rows, setRows] = useState<AttendanceRecord[]>([])
  useEffect(() => {
    void attendanceApi.getByStudent(STUDENT_ID).then(setRows)
  }, [])
  const present = rows.filter((r) => r.status === 'present').length
  return (
    <SectionShell>
      <div className="mb-2 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
          <p className="text-xs text-[var(--text-muted)]">Present</p>
          <p className="text-xl font-semibold text-[var(--success)]">{present}</p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
          <p className="text-xs text-[var(--text-muted)]">Absent / Late</p>
          <p className="text-xl font-semibold text-[var(--warning)]">{rows.length - present}</p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
          <p className="text-xs text-[var(--text-muted)]">Overall</p>
          <p className="text-xl font-semibold text-[var(--text)]">{AARAV.attendancePercentage}%</p>
        </div>
      </div>
      {rows.map((r) => (
        <div
          key={r.id}
          className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
        >
          <div>
            <p className="font-medium text-[var(--text)]">{fmtDate(r.date)}</p>
            <p className="text-xs text-[var(--text-muted)]">Session · {r.classId}</p>
          </div>
          <Badge variant={r.status === 'present' ? 'success' : r.status === 'late' ? 'warning' : 'danger'}>
            {r.status}
          </Badge>
        </div>
      ))}
    </SectionShell>
  )
}

export function FamilyScheduleSection() {
  const [classes, setClasses] = useState<MusicClass[]>([])
  useEffect(() => {
    void classApi.getClassesByTeacher('teacher-001').then(setClasses)
  }, [])
  return (
    <SectionShell>
      {classes.slice(0, 4).map((c) => (
        <Card key={c.id}>
          <CardContent className="pt-5 text-sm">
            <p className="font-medium text-[var(--text)]">{c.title}</p>
            <p className="text-[var(--text-secondary)]">
              {fmtDate(c.date)} · {formatTime(c.startTime)} · Room {c.room}
            </p>
          </CardContent>
        </Card>
      ))}
    </SectionShell>
  )
}

export function FamilyPracticeSection() {
  const [sessions, setSessions] = useState<PracticeSession[]>([])
  useEffect(() => {
    void practiceApi.getHistory(STUDENT_ID).then(setSessions)
  }, [])
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {sessions.slice(0, 4).map((s) => (
        <PracticeCard key={s.id} session={s} />
      ))}
    </div>
  )
}

export function FamilyProgressSection() {
  return (
    <Card>
      <CardContent className="space-y-3 pt-5">
        <Progress label="Overall" value={AARAV.progressPercentage} />
        <Progress label="Attendance" value={AARAV.attendancePercentage} />
      </CardContent>
    </Card>
  )
}

export function FamilyAssignmentsSection() {
  const [items, setItems] = useState<Assignment[]>([])
  useEffect(() => {
    void assignmentApi.getByStudent(STUDENT_ID).then(setItems)
  }, [])
  return (
    <SectionShell>
      {items.map((a) => (
        <Card key={a.id}>
          <CardContent className="flex justify-between pt-5">
            <span>{a.title}</span>
            <Badge variant="accent">{a.status}</Badge>
          </CardContent>
        </Card>
      ))}
    </SectionShell>
  )
}

export function FamilyFeedbackSection() {
  const [items, setItems] = useState<StudentFeedback[]>([])
  useEffect(() => {
    void studentApi.getFeedback(STUDENT_ID).then(setItems)
  }, [])
  return (
    <SectionShell>
      {items.map((f) => (
        <div key={f.id} className="rounded-2xl bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--text-secondary)]">
          <p className="font-medium text-[var(--text)]">{f.teacherName}</p>
          {f.message}
        </div>
      ))}
    </SectionShell>
  )
}

export function FamilyPaymentsSection() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [receipt, setReceipt] = useState<Payment | null>(null)
  const toast = useToast()

  useEffect(() => {
    void paymentApi.getByStudent(STUDENT_ID).then(setPayments)
  }, [])

  return (
    <>
      <p className="mb-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-xs text-[var(--text-secondary)]">
        Online fee payment — Coming in Production. Receipt preview available for paid rows.
      </p>
      <SectionShell>
        {payments.map((p) => (
          <div key={p.id} className="flex items-center justify-between rounded-2xl border border-[var(--border)] px-4 py-3">
            <div>
              <p className="font-medium">{p.month}</p>
              <p className="text-xs text-[var(--text-muted)]">{formatCurrency(p.amount)}</p>
            </div>
            {p.status === 'paid' ? (
              <Button size="sm" variant="outline" onClick={() => setReceipt(p)}>
                Receipt
              </Button>
            ) : (
              <Badge variant="warning">{p.status}</Badge>
            )}
          </div>
        ))}
      </SectionShell>
      <Modal open={Boolean(receipt)} onClose={() => setReceipt(null)} title="Fee receipt">
        {receipt ? (
          <div className="space-y-2 text-sm">
            <p>Rhythmonic Academy — Satellite Branch</p>
            <p>Student: Aarav Patel</p>
            <p>Period: {receipt.month}</p>
            <p>Amount: {formatCurrency(receipt.amount)}</p>
            <p>Receipt ID: {receipt.receiptId ?? 'RCT-DEMO-001'}</p>
            <Button className="mt-4 w-full" onClick={() => toast.success('Receipt saved', 'Demo PDF download simulated.')}>
              Download PDF
            </Button>
          </div>
        ) : null}
      </Modal>
    </>
  )
}

export function FamilyAchievementsSection() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {mockAchievements.map((a) => (
        <Card key={a.id} className={a.unlocked ? 'overflow-hidden' : 'opacity-70'}>
          {a.unlocked ? <div className="h-1 bg-gradient-to-r from-[var(--accent)] to-amber-400" /> : null}
          <CardContent className="pt-5">
            <div className="mb-2 flex items-start justify-between gap-2">
              <p className="font-semibold text-[var(--text)]">{a.title}</p>
              <Badge variant={a.unlocked ? 'success' : 'neutral'}>{a.unlocked ? 'Unlocked' : 'Locked'}</Badge>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{a.description}</p>
            {a.earnedAt ? (
              <p className="mt-2 text-xs text-[var(--text-muted)]">Earned {fmtDate(a.earnedAt)}</p>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function FamilyEventsSection() {
  return <ChildEventsPage audience="parent" />
}

export function FamilyMessagesSection() {
  return <ChatPanel className="h-[min(520px,70vh)]" />
}
