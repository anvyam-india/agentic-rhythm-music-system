import { useState } from 'react'
import { Upload } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Button } from '@/components/ui/Button/Button'
import { SkeletonChart } from '@/components/ui/Skeleton/Skeleton'
import { PracticeAnalysisCard } from '@/components/music/PracticeAnalysis'
import { practiceApi } from '@/services/api/practiceApi'
import type { PracticeAnalysis } from '@/types/practice'

export default function ChildPracticeAnalysis() {
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<PracticeAnalysis | null>(null)

  const runAnalysis = async () => {
    setLoading(true)
    setAnalysis(null)
    try {
      const result = await practiceApi.getAnalysis()
      setAnalysis(result)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer>
      <PageHeader
        title="Practice Analysis"
        description="Upload a mock recording — demo waits ~1.6s then shows AI scores for Aarav's guitar session."
      />

      <div className="mb-8 flex flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-muted)]/40 px-6 py-12 text-center">
        <Upload size={32} className="mb-3 text-[var(--accent)]" />
        <p className="text-sm text-[var(--text-secondary)]">
          Demo file: chord_transition_take_2.wav (simulated)
        </p>
        <Button className="mt-4" loading={loading} onClick={() => void runAnalysis()}>
          Upload & analyze
        </Button>
      </div>

      {loading ? (
        <SkeletonChart />
      ) : null}
      {analysis ? <PracticeAnalysisCard analysis={analysis} /> : null}
    </PageContainer>
  )
}
