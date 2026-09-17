import { Mail, Phone, Users } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { StatCard } from '@/components/ui/StatCard/StatCard'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Avatar } from '@/components/ui/Avatar/Avatar'
import { mockTeachers } from '@/services/mock/mockTeachers'
import { useApp } from '@/context/AppContext'

export default function Teachers() {
  const { currentBranch } = useApp()
  const totalStudents = mockTeachers.reduce((s, t) => s + t.studentsCount, 0)
  const avgAttendance = Math.round(
    mockTeachers.reduce((s, t) => s + t.attendancePercentage, 0) / mockTeachers.length,
  )

  return (
    <PageContainer>
      <PageHeader
        title="Teachers"
        description={`Faculty roster, load & specialties · ${currentBranch.name}`}
        breadcrumbs={[{ label: 'Teachers' }, { label: 'All Teachers' }]}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Faculty" value={mockTeachers.length} icon={<Users size={18} />} />
        <StatCard title="Students taught" value={totalStudents} icon={<Users size={18} />} />
        <StatCard title="Avg attendance" value={`${avgAttendance}%`} />
        <StatCard title="Instruments covered" value={8} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mockTeachers.map((t) => (
          <Card key={t.id} hover className="h-full">
            <CardContent className="space-y-4 pt-5">
              <div className="flex items-start gap-3">
                <Avatar initials={t.avatarInitials} size="lg" online={t.status === 'active'} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-[var(--text)]">{t.name}</p>
                    <Badge variant="success" className="capitalize">
                      {t.status}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-[var(--text-secondary)]">
                    {t.instruments.join(' · ')} · {t.experienceYears} yrs
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {t.specialties.map((s) => (
                  <Badge key={s} variant="neutral">
                    {s}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 rounded-xl bg-[var(--bg)] p-3 text-sm">
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Students</p>
                  <p className="font-semibold text-[var(--text)]">{t.studentsCount}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Attendance</p>
                  <p className="font-semibold text-[var(--accent)]">{t.attendancePercentage}%</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                <p className="inline-flex items-center gap-1.5">
                  <Mail size={12} /> {t.email}
                </p>
                <p className="inline-flex items-center gap-1.5">
                  <Phone size={12} /> {t.phone}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  )
}
