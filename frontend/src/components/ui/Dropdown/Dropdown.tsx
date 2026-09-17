import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/utils/format'

interface DropdownProps {
  trigger: ReactNode
  children: ReactNode
  align?: 'left' | 'right'
  className?: string
}

export function Dropdown({ trigger, children, align = 'right', className }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  return (
    <div ref={rootRef} className={cn('relative inline-block', className)}>
      <div onClick={() => setOpen((v) => !v)} onKeyDown={(e) => e.key === 'Enter' && setOpen((v) => !v)}>
        {trigger}
      </div>
      {open ? (
        <div
          className={cn(
            'absolute z-50 mt-2 min-w-[10rem] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] py-1 shadow-[var(--shadow)]',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          <div onClick={() => setOpen(false)}>{children}</div>
        </div>
      ) : null}
    </div>
  )
}

interface DropdownItemProps {
  children: ReactNode
  onClick?: () => void
  destructive?: boolean
  className?: string
}

export function DropdownItem({ children, onClick, destructive, className }: DropdownItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors',
        destructive
          ? 'text-[var(--danger)] hover:bg-[rgba(196,92,74,0.08)]'
          : 'text-[var(--text)] hover:bg-[var(--surface-muted)]',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function DropdownDivider() {
  return <div className="my-1 h-px bg-[var(--border)]" />
}
