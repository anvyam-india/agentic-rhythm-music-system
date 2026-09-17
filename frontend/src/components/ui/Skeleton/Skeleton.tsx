import { cn } from '@/utils/format'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('skeleton', className)} />
}

export function SkeletonCard() {
  return (
    <div className="rounded-[1.125rem] border border-[var(--border)] bg-[var(--surface)] p-5">
      <Skeleton className="mb-3 h-4 w-24" />
      <Skeleton className="mb-2 h-8 w-32" />
      <Skeleton className="h-3 w-40" />
    </div>
  )
}

export function SkeletonTable() {
  return (
    <div className="space-y-3 rounded-[1.125rem] border border-[var(--border)] bg-[var(--surface)] p-5">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  )
}

export function SkeletonChart() {
  return (
    <div className="rounded-[1.125rem] border border-[var(--border)] bg-[var(--surface)] p-5">
      <Skeleton className="mb-4 h-4 w-32" />
      <Skeleton className="h-48 w-full" />
    </div>
  )
}

export function SkeletonProfile() {
  return (
    <div className="flex gap-4 rounded-[1.125rem] border border-[var(--border)] bg-[var(--surface)] p-5">
      <Skeleton className="h-16 w-16 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  )
}
