import { useMemo } from 'react'
import { FileText, Clock, Users } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { StatCard } from '@/components/ui/StatCard/StatCard'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { mockAssignments } from '@/services/mock/mockAssignments'
import { formatDate } from '@/utils/date'

export default function Assignments() {
  const items = mockAssignments
  const active = items.filter((a) => a.status === 'active').length

  const byInstrument = useMemo(() => {
    const map = new Map<string, number>()
    items.forEach((a) => map.set(a.instrument, (map.get(a.instrument) ?? 0) + 1))
    return [...map.entries()]
  }, [items])

  return (
    <PageContainer>
      <PageHeader
        title="Assignments"
        description="Academy-wide homework and practice tasks."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard title="Total tasks" value={items.length} icon={<FileText size={18} />} />
        <StatCard title="Active" value={active} icon={<Clock size={18} />} />
        <StatCard title="Instruments" value={byInstrument.length} icon={<Users size={18} />} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((a) => (
          <Card key={a.id} hover className="h-full">
            <CardContent className="flex h-full flex-col gap-3 pt-5">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-[var(--text)]">{a.title}</p>
                <Badge
                  variant={
                    a.difficulty === 'easy' ? 'success' : a.difficulty === 'hard' ? 'danger' : 'warning'
                  }
                  className="capitalize"
                >
                  {a.difficulty}
                </Badge>
              </div>
              <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{a.description}</p>
              <div className="mt-auto flex flex-wrap gap-2 text-xs text-[var(--text-muted)]">
                <Badge variant="neutral">{a.instrument}</Badge>
                <span>Due {formatDate(a.dueDate)}</span>
                <span>{a.practiceDuration} min</span>
                <span>{a.studentIds.length} students</span>
              </div>
              <p className="text-xs text-[var(--text-muted)]">By {a.teacherName}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  )
}
