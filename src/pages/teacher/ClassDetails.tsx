import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Button } from '@/components/ui/Button/Button'
import { Badge } from '@/components/ui/Badge/Badge'
import { Avatar } from '@/components/ui/Avatar/Avatar'
import { SkeletonProfile } from '@/components/ui/Skeleton/Skeleton'
import { classApi } from '@/services/api/classApi'
import { studentApi } from '@/services/api/studentApi'
import { attendanceApi } from '@/services/api/attendanceApi'
import type { MusicClass } from '@/types/class'
import type { Student } from '@/types/student'
import type { AttendanceRecord, AttendanceStatus } from '@/types/attendance'
import { useToast } from '@/hooks/useToast'
import { formatDate, formatTime } from '@/utils/date'

const TEACHER_ID = 'teacher-001'

export default function TeacherClassDetails() {
  const { id = 'class-001' } = useParams<{ id: string }>()
  const toast = useToast()
  const [musicClass, setMusicClass] = useState<MusicClass | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const cls = await classApi.getClassById(id)
    setMusicClass(cls)
    if (cls) {
      const roster = await Promise.all(cls.studentIds.map((sid) => studentApi.getStudentById(sid)))
      setStudents(roster.filter((s): s is Student => s !== null))
      const att = await attendanceApi.getByClass(id)
      setAttendance(att)
    }
    setLoading(false)
  }, [id])

  useEffect(() => {
    void load()
  }, [load])

  const statusMap = useMemo(() => {
    const map = new Map<string, AttendanceStatus>()
    attendance.forEach((a) => map.set(a.studentId, a.status))
    return map
  }, [attendance])

  const mark = async (studentId: string, status: AttendanceStatus) => {
    await attendanceApi.updateAttendance(id, studentId, status, TEACHER_ID)
    toast.success('Attendance updated', `${status} recorded for student`)
    const att = await attendanceApi.getByClass(id)
    setAttendance(att)
  }

  if (loading) {
    return (
      <PageContainer>
        <SkeletonProfile />
      </PageContainer>
    )
  }

  if (!musicClass) {
    return (
      <PageContainer>
        <p className="text-[var(--text-secondary)]">Class not found.</p>
        <Link to="/teacher/classes" className="text-[var(--accent)]">
          Back
        </Link>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageHeader
        title={musicClass.title}
        description={`${formatDate(musicClass.date)} · ${formatTime(musicClass.startTime)} · Room ${musicClass.room}`}
        breadcrumbs={[
          { label: 'Classes', path: '/teacher/classes' },
          { label: musicClass.title },
        ]}
      />

      <div className="space-y-3">
        {students.map((student) => {
          const status = statusMap.get(student.id) ?? 'absent'
          return (
            <div
              key={student.id}
              className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <Avatar initials={student.avatarInitials} />
                <div>
                  <p className="font-medium text-[var(--text)]">{student.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{student.level}</p>
                </div>
                <Badge
                  variant={
                    status === 'present' ? 'success' : status === 'late' ? 'warning' : status === 'absent' ? 'danger' : 'neutral'
                  }
                >
                  {status}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant={status === 'present' ? 'primary' : 'outline'} onClick={() => mark(student.id, 'present')}>
                  Present
                </Button>
                <Button size="sm" variant={status === 'late' ? 'primary' : 'outline'} onClick={() => mark(student.id, 'late')}>
                  Late
                </Button>
                <Button size="sm" variant={status === 'absent' ? 'danger' : 'outline'} onClick={() => mark(student.id, 'absent')}>
                  Absent
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </PageContainer>
  )
}
