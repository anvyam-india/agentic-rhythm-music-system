import { useEffect, useRef, useState } from 'react'
import { Building2, Check, ChevronDown } from 'lucide-react'
import { ACADEMY_BRANCHES } from '@/constants/roles'
import { useApp } from '@/context/AppContext'
import { cn } from '@/utils/format'
import { useToast } from '@/hooks/useToast'

interface BranchSwitcherProps {
  /** Inline select look for B&B-style header left */
  compact?: boolean
}

export function BranchSwitcher({ compact = false }: BranchSwitcherProps) {
  const { currentRole, currentBranch, currentBranchId, setCurrentBranchId } = useApp()
  const toast = useToast()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  // Non-admin: show branch label only (read-only like B&B role-locked branch)
  if (currentRole !== 'admin') {
    return (
      <span className="truncate text-sm font-medium text-[var(--text)]">
        {currentBranch.name}
      </span>
    )
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex max-w-[200px] items-center gap-1.5 text-sm font-medium text-[var(--text)]',
          compact
            ? 'bg-transparent py-1 pr-1 hover:text-[var(--accent)]'
            : 'rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 hover:border-[var(--accent)]',
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {!compact ? <Building2 size={14} className="shrink-0 text-[var(--accent)]" /> : null}
        <span className="truncate">{currentBranch.name}</span>
        <ChevronDown size={14} className={cn('shrink-0 text-[var(--text-muted)] transition', open && 'rotate-180')} />
      </button>
      {open ? (
        <div
          className={cn(
            'absolute z-50 mt-2 w-72 animate-slide-up rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[var(--shadow)]',
            compact ? 'left-0' : 'right-0',
          )}
        >
          <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            Switch branch
          </p>
          {ACADEMY_BRANCHES.map((branch) => {
            const selected = branch.id === currentBranchId
            return (
              <button
                key={branch.id}
                type="button"
                className={cn(
                  'flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left',
                  selected ? 'bg-[var(--accent-soft)]' : 'hover:bg-[var(--surface-muted)]',
                )}
                onClick={() => {
                  setCurrentBranchId(branch.id)
                  setOpen(false)
                  toast.success('Branch switched', `Now viewing ${branch.name}`)
                }}
              >
                <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-[var(--border)]">
                  {selected ? <Check size={10} className="text-[var(--accent)]" /> : null}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-[var(--text)]">{branch.name}</span>
                  <span className="block text-xs text-[var(--text-secondary)]">
                    {branch.area} · {branch.students} students
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
