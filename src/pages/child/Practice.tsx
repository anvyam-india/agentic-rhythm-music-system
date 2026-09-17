import { Link } from 'react-router-dom'
import { Sparkles, Upload } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Button } from '@/components/ui/Button/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card/Card'
import { PracticeCard } from '@/components/music/PracticeCard'
import { mockPracticeSessions, mockPracticePlan } from '@/services/mock/mockPracticeData'

const SESSIONS = mockPracticeSessions.filter((s) => s.studentId === 'student-001').slice(0, 3)

export default function ChildPractice() {
  return (
    <PageContainer>
      <PageHeader
        title="Practice Dashboard"
        description="Daily plan from Jayesh Patel — assignments with teacher recording + Upload yours."
        actions={
          <div className="flex flex-wrap gap-2">
            <Link to="/child/assignments">
              <Button variant="outline">
                <Upload size={16} /> Assignment uploads
              </Button>
            </Link>
            <Link to="/child/practice-analysis">
              <Button>
                <Sparkles size={16} /> Analyze upload
              </Button>
            </Link>
          </div>
        }
      />

      <Card className="mb-6 border-[var(--ai)]/30 bg-[var(--ai-soft)]/40">
        <CardContent className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-[var(--text)]">Teacher assigned: Chord transitions</p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Jayesh sir ne reference recording di hai — Upload yours se AI pitch/rhythm score milega.
            </p>
          </div>
          <Link to="/child/assignments">
            <Button size="sm">
              <Upload size={14} /> Upload yours
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Today&apos;s plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {mockPracticePlan.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl border border-[var(--border)] px-4 py-3"
            >
              <span className="text-sm text-[var(--text)]">{item.title}</span>
              <span className="text-xs text-[var(--text-muted)]">
                {item.duration} min · {item.icon}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <h2 className="mb-3 text-sm font-medium text-[var(--text-secondary)]">Recent sessions</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {SESSIONS.map((s) => (
          <PracticeCard key={s.id} session={s} />
        ))}
      </div>
      <Link to="/child/practice/history" className="mt-4 inline-block text-sm text-[var(--accent)]">
        Full practice history
      </Link>
    </PageContainer>
  )
}
