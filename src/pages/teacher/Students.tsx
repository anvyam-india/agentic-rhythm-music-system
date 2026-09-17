import { Link } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Avatar } from '@/components/ui/Avatar/Avatar'
import { Progress } from '@/components/ui/Progress/Progress'
import { useStudents } from '@/hooks/useStudents'
import { SkeletonTable } from '@/components/ui/Skeleton/Skeleton'

const TEACHER_ID = 'teacher-001'

export default function TeacherStudents() {
  const { students, loading } = useStudents(TEACHER_ID)

  return (
    <PageContainer>
      <PageHeader
        title="My Students"
        description="Tap Aarav Patel for evaluation notes and feedback."
      />
      {loading ? (
        <SkeletonTable />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {students.map((s) => (
            <Link key={s.id} to={`/teacher/students/${s.id}`}>
              <Card hover>
                <CardContent className="flex gap-4 pt-5">
                  <Avatar initials={s.avatarInitials} size="lg" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-[var(--text)]">{s.name}</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {s.instrument} · {s.batch}
                    </p>
                    <div className="mt-3">
                      <Progress label="Progress" value={s.progressPercentage} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </PageContainer>
  )
}
