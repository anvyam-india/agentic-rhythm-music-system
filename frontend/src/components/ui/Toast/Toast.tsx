import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { cn } from '@/utils/format'

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
}

export function ToastViewport() {
  const { toasts, dismissToast } = useApp()

  if (toasts.length === 0) return null

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => {
        const Icon = icons[toast.type]
        return (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow)] animate-slide-up',
            )}
            role="status"
          >
            <Icon size={18} className="mt-0.5 shrink-0 text-[var(--accent)]" />
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text)]">{toast.title}</p>
              {toast.description ? (
                <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{toast.description}</p>
              ) : null}
            </div>
            <button
              type="button"
              className="text-[var(--text-muted)] hover:text-[var(--text)]"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
