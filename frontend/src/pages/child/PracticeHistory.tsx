import { useCallback, useEffect, useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Button } from '@/components/ui/Button/Button'
import { PracticeCard } from '@/components/music/PracticeCard'
import { EmptyState } from '@/components/ui/EmptyState/EmptyState'
import { SkeletonTable } from '@/components/ui/Skeleton/Skeleton'
import { practiceApi } from '@/services/api/practiceApi'
import type { PracticeSession } from '@/types/practice'

export default function ChildPracticeHistory() {
  const [sessions, setSessions] = useState<PracticeSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await practiceApi.getHistory('student-001')
      setSessions(data)
    } catch {
      setError('Unable to load practice history.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const simulateError = () => {
    practiceApi.simulateHistoryError()
    void load()
  }

  return (
    <PageContainer>
      <PageHeader
        title="Practice History"
        description="All logged sessions for Aarav Patel — demo includes one-time error simulation."
        actions={
          <Button variant="outline" size="sm" onClick={simulateError}>
            Simulate error once
          </Button>
        }
      />

      {loading ? (
        <SkeletonTable />
      ) : error ? (
        <EmptyState
          title="Something went wrong"
          description={error}
          action={
            <Button onClick={() => void load()}>Retry</Button>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {sessions.map((s) => (
            <PracticeCard key={s.id} session={s} />
          ))}
        </div>
      )}
    </PageContainer>
  )
}
