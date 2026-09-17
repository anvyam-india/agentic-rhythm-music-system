import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/format'

export interface SelectOption {
  label: string
  value: string
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string
  options: SelectOption[]
  error?: string
}

export function Select({ label, options, error, className, id, ...props }: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={selectId} className="text-sm font-medium text-[var(--text)]">
          {label}
        </label>
      ) : null}
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            'h-10 w-full appearance-none rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 pr-10 text-sm text-[var(--text)]',
            'transition-colors focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-[var(--danger)]',
            className,
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
        />
      </div>
      {error ? <p className="text-xs text-[var(--danger)]">{error}</p> : null}
    </div>
  )
}
