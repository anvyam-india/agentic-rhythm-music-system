import type { ReactNode } from 'react'
import { cn } from '@/utils/format'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-[1.125rem] border border-dashed border-[var(--border-strong)] bg-[var(--surface)] px-6 py-12 text-center', className)}>
      {icon ? <div className="mb-4 text-[var(--text-muted)]">{icon}</div> : null}
      <h3 className="text-base font-semibold text-[var(--text)]">{title}</h3>
      {description ? <p className="mt-1 max-w-sm text-sm text-[var(--text-secondary)]">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}
