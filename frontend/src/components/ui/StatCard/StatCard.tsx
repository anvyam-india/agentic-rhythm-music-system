import type { ReactNode } from 'react'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { cn } from '@/utils/format'

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  trend?: { value: number; direction: 'up' | 'down' }
  icon?: ReactNode
  className?: string
}

export function StatCard({ title, value, description, trend, icon, className }: StatCardProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="pt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-[var(--text-secondary)]">{title}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text)]">{value}</p>
            {description ? <p className="mt-1 text-xs text-[var(--text-muted)]">{description}</p> : null}
            {trend ? (
              <p
                className={cn(
                  'mt-2 inline-flex items-center gap-1 text-xs font-medium',
                  trend.direction === 'up' ? 'text-[var(--success)]' : 'text-[var(--danger)]',
                )}
              >
                {trend.direction === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {trend.value}%
              </p>
            ) : null}
          </div>
          {icon ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
              {icon}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
