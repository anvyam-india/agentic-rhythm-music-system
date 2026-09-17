import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/format'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: ReactNode
}

export function Input({ label, error, hint, icon, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--text)]">
          {label}
        </label>
      ) : null}
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
            {icon}
          </span>
        ) : null}
        <input
          id={inputId}
          className={cn(
            'h-10 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 text-sm text-[var(--text)]',
            'placeholder:text-[var(--text-muted)] transition-colors',
            'focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            icon ? 'pl-10' : null,
            error && 'border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[rgba(196,92,74,0.15)]',
            className,
          )}
          {...props}
        />
      </div>
      {error ? <p className="text-xs text-[var(--danger)]">{error}</p> : null}
      {!error && hint ? <p className="text-xs text-[var(--text-secondary)]">{hint}</p> : null}
    </div>
  )
}
