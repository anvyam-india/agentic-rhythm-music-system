import { Link } from 'react-router-dom'
import { Flame, TrendingDown, AlertTriangle, Music } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { StatCard } from '@/components/ui/StatCard/StatCard'
import { BarChart } from '@/components/charts/Charts'
import { mockPracticeEngagement } from '@/services/mock/mockApi'

const WEEK = [
  { label: 'Mon', value: 42 },
  { label: 'Tue', value: 38 },
  { label: 'Wed', value: 51 },
  { label: 'Thu', value: 29 },
  { label: 'Fri', value: 44 },
  { label: 'Sat', value: 57 },
  { label: 'Sun', value: 36 },
]

const INACTIVE = [
  { name: 'Harsh Solanki', days: 9, instrument: 'Guitar' },
  { name: 'Sara Banerjee', days: 8, instrument: 'Keyboard' },
  { name: 'Dev Patel', days: 7, instrument: 'Drums' },
]

export default function Practice() {
  return (
    <PageContainer>
      <PageHeader
        title="Practice activity"
        description="Weekly engagement, streaks, and inactive student alerts across the academy."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Avg practice / student" value="38m" icon={<Music size={18} />} description="This week" />
        <StatCard
          title="Engagement"
          value="78%"
          icon={<TrendingDown size={18} />}
          trend={{ value: 8, direction: 'down' }}
        />
        <StatCard title="Active streaks" value={86} icon={<Flame size={18} />} description="3+ days" />
        <StatCard title="Inactive 7+ days" value={3} icon={<AlertTriangle size={18} />} description="Needs nudge" />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle>Practice minutes · this week</CardTitle>
            <CardDescription>Academy-wide daily totals (avg minutes)</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart data={WEEK} valueSuffix="m" />
          </CardContent>
        </Card>
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>Engagement trend</CardTitle>
            <CardDescription>Last 4 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart data={mockPracticeEngagement} valueSuffix="%" color="var(--chart-3)" />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Inactive practice alerts</CardTitle>
            <CardDescription>Students with no meaningful practice for 7+ days</CardDescription>
          </div>
          <Badge variant="warning">AI flagged</Badge>
        </CardHeader>
        <CardContent className="space-y-2">
          {INACTIVE.map((s) => (
            <div
              key={s.name}
              className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3"
            >
              <div>
                <p className="font-medium text-[var(--text)]">{s.name}</p>
                <p className="text-sm text-[var(--text-secondary)]">{s.instrument}</p>
              </div>
              <Badge variant="danger">{s.days} days</Badge>
            </div>
          ))}
          <Link to="/admin/ai-insights" className="inline-block pt-2 text-sm font-medium text-[var(--accent)]">
            Open AI insights →
          </Link>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
