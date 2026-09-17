import { useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import type { UserRole } from '@/types/roles'
import { ROLE_WORKSPACES } from '@/constants/roles'
import { Waveform } from '@/components/music/Waveform'

export default function Login() {
  const { login } = useApp()
  const navigate = useNavigate()

  const continueAs = (role: UserRole) => {
    login(role)
    navigate(`/${role}/dashboard`)
  }

  return (
    <div className="min-h-screen">
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg)] px-4 py-10 text-[var(--text)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(15,118,110,0.08),_transparent_55%)]" />
        <div className="relative z-10 grid w-full max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)]">
                <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden>
                  <path d="M8 20V12" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M13 22V10" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M18 18V14" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="24" cy="11" r="3" fill="var(--accent)" />
                </svg>
              </div>
              <div>
                <p className="font-display text-3xl text-[var(--text)]">Rhythmonic</p>
                <p className="text-sm text-[var(--text-secondary)]">Music Academy & Studio · South Bopal</p>
              </div>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
              Premium academy operations, beautifully simple.
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
              Manage students, teachers, practice, finance, and cameras — demo-ready for client walkthroughs.
            </p>
            <div className="mt-8">
              <Waveform />
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] md:p-8">
            <p className="text-sm font-semibold text-[var(--text)]">Continue as demo role</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">No password — pick a workspace to explore.</p>
            <div className="mt-5 space-y-3">
              {ROLE_WORKSPACES.map((ws) => (
                <button
                  key={ws.role}
                  type="button"
                  onClick={() => continueAs(ws.role)}
                  className="flex w-full items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-4 text-left transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]/40"
                >
                  <span>
                    <span className="block text-sm font-semibold text-[var(--text)]">{ws.label}</span>
                    <span className="block text-xs text-[var(--text-secondary)]">{ws.description}</span>
                  </span>
                  <span className="inline-flex h-8 items-center rounded-xl bg-[var(--accent)] px-3 text-xs font-medium text-[var(--on-accent)]">
                    Enter
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
