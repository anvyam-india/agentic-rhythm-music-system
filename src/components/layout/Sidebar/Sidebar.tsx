import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  Music,
  Wallet,
  MessageSquare,
  Mic2,
  CalendarDays,
  BarChart3,
  Settings,
  Calendar,
  FileText,
  ClipboardList,
  AudioLines,
  User,
  Home,
  Trophy,
  Heart,
  TrendingUp,
  MessageCircle,
  Search,
  Sparkles,
  Camera,
  ChevronDown,
  Mic,
} from 'lucide-react'
import type { ComponentType } from 'react'
import { useMemo, useState } from 'react'
import { getNavForRole } from '@/constants/navigation'
import { useApp } from '@/context/AppContext'
import { useRole } from '@/hooks/useRole'
import type { NavItem } from '@/types/common'
import { cn } from '@/utils/format'
import { RhythmAiAvatar } from '@/components/ai/RhythmAiAvatar'

type IconComponent = ComponentType<{ size?: number; className?: string }>

const iconMap: Record<string, IconComponent> = {
  LayoutDashboard,
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  Music,
  Wallet,
  MessageSquare,
  Mic2,
  CalendarDays,
  BarChart3,
  Settings,
  Calendar,
  FileText,
  ClipboardList,
  AudioLines,
  User,
  Home,
  Trophy,
  Heart,
  TrendingUp,
  MessageCircle,
  Camera,
  Sparkles,
}

function isPathActive(pathname: string, path: string, children?: NavItem[]): boolean {
  if (pathname === path || pathname.startsWith(`${path}/`)) return true
  return children?.some((c) => pathname === c.path || pathname.startsWith(`${c.path}/`)) ?? false
}

function NavNode({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { setMobileNavOpen } = useApp()
  const [expanded, setExpanded] = useState(
    () => item.children?.some((c) => location.pathname === c.path || location.pathname.startsWith(`${c.path}/`)) ?? false,
  )
  const Icon = item.icon ? iconMap[item.icon] : undefined
  const hasChildren = Boolean(item.children?.length)
  const active = isPathActive(location.pathname, item.path, item.children)

  if (hasChildren && item.children) {
    if (collapsed) {
      return (
        <button
          type="button"
          title={item.label}
          onClick={() => {
            navigate(item.path)
            setMobileNavOpen(false)
          }}
          className={cn(
            'mx-auto flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
            active
              ? 'bg-[var(--sidebar-active)] text-[var(--accent)]'
              : 'text-[var(--sidebar-muted)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--sidebar-text)]',
          )}
        >
          {Icon ? <Icon size={18} /> : null}
        </button>
      )
    }

    return (
      <div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className={cn(
            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors',
            active
              ? 'bg-[var(--sidebar-active)] text-[var(--accent)]'
              : 'text-[var(--sidebar-muted)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--sidebar-text)]',
          )}
        >
          {Icon ? <Icon size={18} /> : null}
          <span className="flex-1 text-left font-medium">{item.label}</span>
          <ChevronDown size={14} className={cn('transition-transform', expanded && 'rotate-180')} />
        </button>
        <div
          className={cn(
            'grid transition-[grid-template-rows] duration-300',
            expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className="overflow-hidden">
            <div className="ml-3 space-y-0.5 border-l border-[var(--border)] py-1 pl-3">
              {item.children.map((child) => (
                <NavLink
                  key={child.path + child.label}
                  to={child.path}
                  onClick={() => setMobileNavOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'block rounded-lg px-3 py-2 text-sm transition-colors',
                      isActive
                        ? 'bg-[var(--sidebar-active)] font-medium text-[var(--accent)]'
                        : 'text-[var(--sidebar-muted)] hover:text-[var(--sidebar-text)]',
                    )
                  }
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (collapsed) {
    return (
      <NavLink
        to={item.path}
        title={item.label}
        onClick={() => setMobileNavOpen(false)}
        className={({ isActive }) =>
          cn(
            'mx-auto flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
            isActive
              ? 'bg-[var(--sidebar-active)] text-[var(--accent)]'
              : 'text-[var(--sidebar-muted)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--sidebar-text)]',
          )
        }
      >
        {Icon ? <Icon size={18} /> : null}
      </NavLink>
    )
  }

  return (
    <NavLink
      to={item.path}
      title={item.label}
      onClick={() => setMobileNavOpen(false)}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
          isActive
            ? 'bg-[var(--sidebar-active)] text-[var(--accent)]'
            : 'text-[var(--sidebar-muted)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--sidebar-text)]',
        )
      }
    >
      {Icon ? <Icon size={18} /> : null}
      <span>{item.label}</span>
    </NavLink>
  )
}

function filterNav(items: NavItem[], query: string): NavItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return items
  return items
    .map((item) => {
      const selfMatch = item.label.toLowerCase().includes(q)
      const children = item.children?.filter((c) => c.label.toLowerCase().includes(q))
      if (selfMatch) return item
      if (children && children.length > 0) return { ...item, children }
      return null
    })
    .filter((item): item is NavItem => item !== null)
}

export function Sidebar() {
  const {
    sidebarCollapsed,
    mobileNavOpen,
    setMobileNavOpen,
    setSidebarCollapsed,
    openAi,
    setGlobalSearchOpen,
    voiceSttActive,
    voiceSttLabel,
    voiceSttSeconds,
  } = useApp()
  const { role, childView } = useRole()
  const [query, setQuery] = useState('')
  const nav = useMemo(
    () => filterNav(getNavForRole(role, childView), query),
    [role, childView, query],
  )

  const sttClock = `${String(Math.floor(voiceSttSeconds / 60)).padStart(2, '0')}:${String(voiceSttSeconds % 60).padStart(2, '0')}`

  return (
    <>
      {mobileNavOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          aria-label="Close navigation"
          onClick={() => setMobileNavOpen(false)}
        />
      ) : null}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex h-screen flex-col border-r border-[var(--border)] bg-[var(--sidebar)] text-[var(--sidebar-text)]',
          'shadow-[2px_0_16px_rgba(23,32,51,0.04)] transition-[width,transform] duration-300',
          sidebarCollapsed ? 'w-[72px]' : 'w-[260px]',
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div
          className={cn(
            'flex h-14 shrink-0 items-center border-b border-[var(--border)] sm:h-[64px]',
            sidebarCollapsed ? 'justify-center px-2' : 'gap-3 px-4',
          )}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-bright)] text-sm font-bold text-white">
            R
          </div>
          {!sidebarCollapsed ? (
            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-[var(--text)]">Rhythmonic</div>
              <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                Music Academy
              </div>
            </div>
          ) : null}
        </div>

        <div className={cn('shrink-0 px-3 py-3', sidebarCollapsed && 'px-2')}>
          <button
            type="button"
            onClick={openAi}
            className={cn(
              'group mx-auto flex items-center justify-center transition',
              sidebarCollapsed
                ? 'h-11 w-11'
                : 'w-full flex-col gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-3 hover:border-[var(--accent)]/40 hover:bg-[var(--accent-soft)]/40 sm:p-4',
              voiceSttActive && 'border-[var(--ai)]/50 bg-[var(--ai-soft)]/50',
            )}
            aria-label="Open Rhythm AI chat"
            title="Open Rhythm AI"
          >
            <div className="relative">
              <RhythmAiAvatar size={sidebarCollapsed ? 'sm' : 'lg'} pulse={voiceSttActive} />
              <span
                className={cn(
                  'absolute flex items-center justify-center rounded-full border-2 border-[var(--sidebar)] text-white',
                  voiceSttActive ? 'bg-[var(--danger)]' : 'bg-[var(--ai)]',
                  sidebarCollapsed ? '-bottom-0.5 -right-0.5 h-4 w-4' : '-bottom-1 -right-1 h-6 w-6',
                )}
              >
                {voiceSttActive ? (
                  <Mic size={sidebarCollapsed ? 8 : 12} />
                ) : (
                  <Sparkles size={sidebarCollapsed ? 8 : 12} />
                )}
              </span>
            </div>
            {!sidebarCollapsed ? (
              <div className="text-center">
                <p className="text-sm font-semibold text-[var(--text)]">Rhythm AI</p>
                {voiceSttActive ? (
                  <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[var(--ai-soft)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--ai)]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--danger)]" />
                    {voiceSttLabel} · {sttClock}
                  </p>
                ) : (
                  <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">Tap to chat · voice</p>
                )}
              </div>
            ) : null}
          </button>
          {sidebarCollapsed && voiceSttActive ? (
            <p className="mt-1 text-center text-[9px] font-bold tabular-nums text-[var(--ai)]">{sttClock}</p>
          ) : null}
        </div>

        <div className={cn('shrink-0 px-3', sidebarCollapsed && 'px-2')}>
          {sidebarCollapsed ? (
            <button
              type="button"
              className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl text-[var(--sidebar-muted)] hover:bg-[var(--sidebar-hover)]"
              onClick={() => setGlobalSearchOpen(true)}
              aria-label="Search modules"
            >
              <Search size={16} />
            </button>
          ) : (
            <label className="relative block">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter modules…"
                className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] pl-9 pr-3 text-sm outline-none focus:border-[var(--accent)]"
              />
            </label>
          )}
        </div>

        {!sidebarCollapsed ? (
          <div className="shrink-0 px-4 pb-1 pt-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
              Modules
            </p>
          </div>
        ) : (
          <div className="h-2 shrink-0" />
        )}

        <nav
          className={cn(
            'sidebar-scroll flex-1 space-y-0.5 overflow-y-auto overflow-x-hidden pb-6',
            sidebarCollapsed ? 'px-2' : 'px-3',
          )}
        >
          {nav.map((item) => (
            <NavNode key={item.path + item.label} item={item} collapsed={sidebarCollapsed} />
          ))}
        </nav>

        {!sidebarCollapsed ? (
          <button
            type="button"
            className="mx-3 mb-3 hidden rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] lg:block"
            onClick={() => setSidebarCollapsed(true)}
          >
            Collapse sidebar
          </button>
        ) : null}
      </aside>
    </>
  )
}
