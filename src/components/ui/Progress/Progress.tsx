import { cn } from '@/utils/format'

interface ProgressProps {
  value: number
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showValue?: boolean
  showLabel?: boolean
}

const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-3.5' }

export function Progress({
  value,
  label,
  size = 'md',
  className,
  showValue = true,
  showLabel,
}: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const displayValue = showLabel === false ? false : showValue
  return (
    <div className={cn('w-full', className)}>
      {(label || displayValue) && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          {label ? <span className="text-[var(--text-secondary)]">{label}</span> : <span />}
          {displayValue ? <span className="font-medium text-[var(--text)]">{Math.round(clamped)}%</span> : null}
        </div>
      )}
      <div className={cn('w-full overflow-hidden rounded-full bg-[var(--surface-muted)]', heights[size])} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
