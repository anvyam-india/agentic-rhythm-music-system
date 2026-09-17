import { cn } from '@/utils/format'

type AvatarSize = 'sm' | 'md' | 'lg'

interface AvatarProps {
  initials: string
  size?: AvatarSize
  className?: string
  online?: boolean
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
}

const dotSize: Record<AvatarSize, string> = {
  sm: 'h-2 w-2 border',
  md: 'h-2.5 w-2.5 border-2',
  lg: 'h-3 w-3 border-2',
}

export function Avatar({ initials, size = 'md', className, online }: AvatarProps) {
  return (
    <span className={cn('relative inline-flex shrink-0', className)}>
      <span
        className={cn(
          'inline-flex items-center justify-center rounded-full bg-[var(--accent-soft)] font-semibold text-[var(--accent)] ring-2 ring-[var(--surface)]',
          sizeClasses[size],
        )}
        aria-hidden
      >
        {initials.slice(0, 2).toUpperCase()}
      </span>
      {online !== undefined ? (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-[var(--surface)]',
            dotSize[size],
            online ? 'bg-[var(--success)]' : 'bg-[var(--text-muted)]',
          )}
          aria-label={online ? 'Online' : 'Offline'}
        />
      ) : null}
    </span>
  )
}
