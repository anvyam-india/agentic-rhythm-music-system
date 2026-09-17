import { FileText, Download, BarChart3 } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { StatCard } from '@/components/ui/StatCard/StatCard'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import { BarChart } from '@/components/charts/Charts'
import { mockStudentGrowth } from '@/services/mock/mockApi'
import { useToast } from '@/hooks/useToast'

const REPORTS = [
  {
    title: 'Monthly enrollment',
    format: 'PDF',
    updated: 'Updated today',
    meta: '248 students',
  },
  {
    title: 'Revenue summary',
    format: 'Excel',
    updated: 'September',
    meta: '₹4.82L',
  },
  {
    title: 'Faculty utilization',
    format: 'PDF',
    updated: 'Weekly',
    meta: '18 teachers',
  },
  {
    title: 'Attendance pack',
    format: 'PDF',
    updated: 'This week',
    meta: '92.4% avg',
  },
  {
    title: 'Practice engagement',
    format: 'CSV',
    updated: 'Live',
    meta: '78% goal',
  },
  {
    title: 'Concert interest',
    format: 'PDF',
    updated: 'Event',
    meta: '84 interested',
  },
]

export default function Reports() {
  const toast = useToast()

  return (
    <PageContainer>
      <PageHeader
        title="Reports"
        description="Export-ready analytics for leadership reviews."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard title="Report packs" value={REPORTS.length} icon={<FileText size={18} />} />
        <StatCard title="Exports today" value={3} icon={<Download size={18} />} />
        <StatCard title="Dashboards" value={4} icon={<BarChart3 size={18} />} />
      </div>

      <Card className="mb-6">
        <CardContent className="pt-5">
          <h3 className="mb-4 text-base font-semibold text-[var(--text)]">Enrollment trend</h3>
          <BarChart data={mockStudentGrowth} height={220} />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {REPORTS.map((r) => (
          <Card key={r.title} hover>
            <CardContent className="flex h-full flex-col gap-3 pt-5">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-[var(--text)]">{r.title}</p>
                <Badge variant="neutral">{r.format}</Badge>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{r.updated}</p>
              <p className="text-xs text-[var(--text-muted)]">{r.meta}</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-auto"
                onClick={() => toast.success('Download started', `${r.title} · demo file`)}
              >
                <Download size={14} /> Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  )
}
