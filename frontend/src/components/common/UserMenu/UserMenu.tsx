import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, User } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { Avatar } from '@/components/ui/Avatar/Avatar'

export function UserMenu() {
  const { currentUser, logout } = useApp()
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

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] py-1 pl-1 pr-3 transition hover:border-[var(--border-strong)]"
        aria-label="User menu"
      >
        <Avatar initials={currentUser.avatarInitials} size="sm" />
        <span className="hidden text-sm font-medium text-[var(--text)] sm:inline">{currentUser.avatarInitials}</span>
      </button>
      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-56 animate-slide-up rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[var(--shadow)]">
          <div className="border-b border-[var(--border)] px-3 py-2">
            <p className="text-sm font-semibold text-[var(--text)]">{currentUser.name}</p>
            <p className="text-xs text-[var(--text-secondary)]">{currentUser.title}</p>
          </div>
          <button
            type="button"
            className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
            onClick={() => {
              setOpen(false)
              navigate(`/${currentUser.role}/profile`)
            }}
          >
            <User size={14} /> Profile
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-[var(--danger)] hover:bg-[var(--surface-muted)]"
            onClick={() => {
              logout()
              navigate('/login')
            }}
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      ) : null}
    </div>
  )
}
