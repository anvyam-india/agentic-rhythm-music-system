import type { PracticeSession } from '@/types/practice'
import { Calendar, Clock, Guitar } from 'lucide-react'
import { cn } from '@/utils/format'
import { formatMinutes } from '@/utils/format'
import { Badge } from '@/components/ui/Badge/Badge'
import { Card, CardContent } from '@/components/ui/Card/Card'

interface PracticeCardProps {
  session: PracticeSession
  onClick?: () => void
  className?: string
}

function scoreVariant(score: number): 'success' | 'warning' | 'accent' {
  if (score >= 80) return 'success'
  if (score >= 70) return 'accent'
  return 'warning'
}

export function PracticeCard({ session, onClick, className }: PracticeCardProps) {
  const dateLabel = new Date(session.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <Card hover={Boolean(onClick)} onClick={onClick} className={cn('overflow-hidden', className)}>
      <CardContent className="pt-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <p className="font-medium text-[var(--text)]">{session.practiceType}</p>
            <p className="text-sm text-[var(--text-secondary)]">{session.instrument}</p>
          </div>
          <Badge variant={scoreVariant(session.aiScore)}>AI {session.aiScore}</Badge>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-[var(--text-secondary)]">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={14} />
            {dateLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} />
            {formatMinutes(session.duration)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Guitar size={14} />
            Session
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
