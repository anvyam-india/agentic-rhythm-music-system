import type { ReactNode } from 'react'
import { cn } from '@/utils/format'

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'accent'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const styles: Record<BadgeVariant, string> = {
  success: 'bg-[rgba(22,163,74,0.12)] text-[var(--success)]',
  warning: 'bg-[rgba(217,119,6,0.12)] text-[var(--warning)]',
  danger: 'bg-[rgba(220,38,38,0.12)] text-[var(--danger)]',
  info: 'bg-[var(--accent-soft)] text-[var(--accent)]',
  neutral: 'bg-[var(--surface-muted)] text-[var(--text-secondary)]',
  accent: 'bg-[var(--accent-soft)] text-[var(--accent)]',
}

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
