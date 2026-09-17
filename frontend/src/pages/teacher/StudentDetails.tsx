import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Button } from '@/components/ui/Button/Button'
import { Modal } from '@/components/ui/Modal/Modal'
import { Input } from '@/components/ui/Input/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card/Card'
import { Progress } from '@/components/ui/Progress/Progress'
import { Avatar } from '@/components/ui/Avatar/Avatar'
import { studentApi } from '@/services/api/studentApi'
import type { Student, StudentFeedback } from '@/types/student'
import { useToast } from '@/hooks/useToast'
import { formatDate } from '@/utils/date'

const TEACHER_ID = 'teacher-001'
const TEACHER_NAME = 'Jayesh Patel'

export default function TeacherStudentDetails() {
  const { id = 'student-001' } = useParams<{ id: string }>()
  const toast = useToast()
  const [student, setStudent] = useState<Student | null>(null)
  const [feedback, setFeedback] = useState<StudentFeedback[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    void studentApi.getStudentById(id).then(setStudent)
    void studentApi.getFeedback(id).then(setFeedback)
  }, [id])

  const submitFeedback = async () => {
    const text = message.trim()
    if (!text || !student) return
    const created = await studentApi.addFeedback({
      studentId: student.id,
      teacherId: TEACHER_ID,
      teacherName: TEACHER_NAME,
      message: text,
      skills: [{ name: 'Rhythm', percentage: 82 }],
    })
    setFeedback((prev) => [created, ...prev])
    setMessage('')
    setModalOpen(false)
    toast.success('Feedback sent', 'Parent and student will see this in their apps.')
  }

  if (!student) {
    return (
      <PageContainer>
        <Link to="/teacher/students" className="text-[var(--accent)]">
          Back to students
        </Link>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageHeader
        title={student.name}
        description={`${student.instrument} · ${student.level}`}
        breadcrumbs={[
          { label: 'Students', path: '/teacher/students' },
          { label: student.name },
        ]}
        actions={
          <Button onClick={() => setModalOpen(true)}>Add feedback</Button>
        }
      />

      <div className="mb-6 flex items-center gap-4">
        <Avatar initials={student.avatarInitials} size="lg" />
        <div className="grid gap-2 sm:grid-cols-3 text-sm">
          <p>Attendance: {student.attendancePercentage}%</p>
          <p>Streak: {student.streak} days</p>
          <p>Joined: {formatDate(student.joinedAt)}</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Evaluation snapshot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Progress label="Curriculum progress" value={student.progressPercentage} />
          <Progress label="Technique" value={84} />
          <Progress label="Rhythm & timing" value={79} />
          <p className="text-sm text-[var(--text-secondary)]">
            Recommendation: Continue barre chord module; Aarav is ready for performance piece selection.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feedback history</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {feedback.map((f) => (
            <div key={f.id} className="rounded-2xl bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--text-secondary)]">
              {f.message}
            </div>
          ))}
        </CardContent>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Teacher feedback">
        <div className="space-y-4">
          <Input
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share progress notes for Aarav and his parent…"
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => void submitFeedback()}>Send feedback</Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  )
}
