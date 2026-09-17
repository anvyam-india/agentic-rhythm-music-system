import { Sparkles } from 'lucide-react'
import { Progress } from '@/components/ui/Progress/Progress'
import { Badge } from '@/components/ui/Badge/Badge'
import type { PracticeAnalysis } from '@/types/practice'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card/Card'

interface PracticeAnalysisCardProps {
  analysis: PracticeAnalysis
}

export function PracticeAnalysisCard({ analysis }: PracticeAnalysisCardProps) {
  const metrics = [
    { label: 'Pitch Accuracy', value: analysis.pitchAccuracy },
    { label: 'Rhythm Accuracy', value: analysis.rhythmAccuracy },
    { label: 'Tempo Consistency', value: analysis.tempoConsistency },
    { label: 'Technique', value: analysis.technique },
  ]

  return (
    <div className="space-y-4 animate-slide-up">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>AI Practice Analysis</CardTitle>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Demo AI Insight — simulated results</p>
          </div>
          <Badge variant="accent">
            <span className="inline-flex items-center gap-1">
              <Sparkles size={12} /> Overall {analysis.overall}%
            </span>
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {metrics.map((m) => (
            <Progress key={m.label} label={m.label} value={m.value} />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {analysis.goodPoints && analysis.goodPoints.length > 0 ? (
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--success)]">Good points</p>
              {analysis.goodPoints.map((item) => (
                <p key={item} className="mb-2 rounded-2xl bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                  {item}
                </p>
              ))}
            </div>
          ) : null}
          {analysis.weakPoints && analysis.weakPoints.length > 0 ? (
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--warning)]">Weak points</p>
              {analysis.weakPoints.map((item) => (
                <p key={item} className="mb-2 rounded-2xl bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                  {item}
                </p>
              ))}
            </div>
          ) : null}
          {analysis.feedback.map((item) => (
            <p key={item} className="rounded-2xl bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--text-secondary)]">
              {item}
            </p>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Practice</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {analysis.recommendations.map((rec, i) => (
            <div key={rec.title} className="flex items-center justify-between rounded-2xl border border-[var(--border)] px-4 py-3">
              <span className="text-sm text-[var(--text)]">
                {i + 1}. {rec.title}
              </span>
              <span className="text-xs text-[var(--text-muted)]">{rec.duration} min</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
