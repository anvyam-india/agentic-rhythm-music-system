import { TrendingUp, Users, Award } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { StatCard } from '@/components/ui/StatCard/StatCard'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Progress } from '@/components/ui/Progress/Progress'

const PROGRAMMES = [
  { title: 'Guitar Level 2', avg: 78, students: 18, spotlight: 'Aarav 78%' },
  { title: 'Keyboard Beginner', avg: 65, students: 14, spotlight: 'On track' },
  { title: 'Vocal Intermediate', avg: 84, students: 16, spotlight: 'Strong month' },
  { title: 'Drums L1', avg: 72, students: 11, spotlight: 'Steady' },
  { title: 'Piano Advanced', avg: 88, students: 8, spotlight: 'Exam ready' },
  { title: 'Tabla Foundations', avg: 60, students: 9, spotlight: 'Forming' },
]

const TOP = [
  { name: 'Kabir Trivedi', gain: '+12%', course: 'Guitar L2' },
  { name: 'Aarav Patel', gain: '+9%', course: 'Guitar L2' },
  { name: 'Diya Mehta', gain: '+8%', course: 'Vocal' },
]

export default function Learning() {
  return (
    <PageContainer>
      <PageHeader
        title="Learning Progress"
        description="Curriculum completion across programmes."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard title="Avg completion" value="74%" icon={<TrendingUp size={18} />} />
        <StatCard title="Students tracked" value={76} icon={<Users size={18} />} />
        <StatCard title="Improving" value={12} icon={<Award size={18} />} description="This month" />
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {PROGRAMMES.map((p) => (
          <Card key={p.title} hover>
            <CardContent className="space-y-3 pt-5">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-[var(--text)]">{p.title}</p>
                <Badge variant="accent">{p.students} students</Badge>
              </div>
              <Progress label="Avg completion" value={p.avg} />
              <p className="text-xs text-[var(--text-muted)]">{p.spotlight}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-5">
          <h3 className="mb-3 text-base font-semibold text-[var(--text)]">Top improvers</h3>
          <div className="grid gap-2 sm:grid-cols-3">
            {TOP.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3"
              >
                <p className="font-medium text-[var(--text)]">{t.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{t.course}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--success)]">{t.gain}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
