import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronDown } from 'lucide-react'
import { ROLE_WORKSPACES } from '@/constants/roles'
import { useRole } from '@/hooks/useRole'
import type { UserRole } from '@/types/roles'
import { cn } from '@/utils/format'

export function RoleSwitcher() {
  const { role, setRole } = useRole()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const current = ROLE_WORKSPACES.find((w) => w.role === role)

  const handleSelect = (next: UserRole) => {
    if (next === role) {
      setOpen(false)
      return
    }
    setRole(next)
    setOpen(false)
    navigate(`/${next}/dashboard`)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5 text-xs font-medium text-[var(--text)] transition hover:border-[var(--border-strong)] sm:gap-2 sm:rounded-2xl sm:px-3 sm:py-2 sm:text-sm"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
        <span className="max-w-[4.5rem] truncate sm:max-w-none">{current?.label ?? 'Admin'}</span>
        <ChevronDown size={14} className={cn('shrink-0 text-[var(--text-muted)] transition', open && 'rotate-180')} />
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-[min(18rem,calc(100vw-1.5rem))] animate-slide-up rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[var(--shadow)]">
          <p className="px-2 pb-2 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
            Switch workspace
          </p>
          <ul role="listbox" className="space-y-1">
            {ROLE_WORKSPACES.map((workspace) => {
              const selected = workspace.role === role
              return (
                <li key={workspace.role}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => handleSelect(workspace.role)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition',
                      selected ? 'bg-[var(--accent-soft)]' : 'hover:bg-[var(--surface-muted)]',
                    )}
                  >
                    <span
                      className={cn(
                        'mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border',
                        selected ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)]' : 'border-[var(--border)]',
                      )}
                    >
                      {selected ? <Check size={10} /> : null}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-[var(--text)]">{workspace.label}</span>
                      <span className="block text-xs text-[var(--text-secondary)]">{workspace.description}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
