import { Menu, PanelLeft, Search } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { useRole } from '@/hooks/useRole'
import { RoleSwitcher } from '@/components/common/RoleSwitcher/RoleSwitcher'
import { UserMenu } from '@/components/common/UserMenu/UserMenu'
import { GlobalSearchTrigger } from '@/components/common/GlobalSearch/GlobalSearch'
import { NotificationCenter } from '@/components/common/NotificationCenter/NotificationCenter'
import { BranchSwitcher } from '@/components/common/BranchSwitcher/BranchSwitcher'
import { RhythmAiAvatar } from '@/components/ai/RhythmAiAvatar'
import { Button } from '@/components/ui/Button/Button'
import { cn } from '@/utils/format'
import { getGreeting } from '@/utils/date'

export function Header() {
  const {
    setMobileNavOpen,
    sidebarCollapsed,
    setSidebarCollapsed,
    roleTransitioning,
    currentUser,
    aiMinimized,
    openAi,
    setGlobalSearchOpen,
  } = useApp()
  const { role, childView, setChildView } = useRole()

  const firstName = currentUser.name.split(' ')[0] ?? 'there'
  const greetingLabel =
    role === 'admin' ? `${getGreeting()}, Rhythmonic` : `${getGreeting()}, ${firstName}`

  return (
    <header className={cn('app-header z-30 gap-1 !px-2 sm:!px-4', roleTransitioning && 'opacity-70')}>
      <div className="app-header-left !gap-1 sm:!gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden !rounded-xl !px-2"
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={18} />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="hidden !rounded-xl !px-2 lg:inline-flex"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <PanelLeft
            size={18}
            className={cn('transition-transform duration-300', sidebarCollapsed && 'rotate-180')}
          />
        </Button>

        <div className="flex min-w-0 items-center gap-2">
          <span className="hidden truncate text-sm font-semibold text-[var(--text)] md:inline">
            {greetingLabel}
          </span>
          <span className="hidden text-[var(--border-strong)] md:inline">|</span>
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="hidden h-2 w-2 shrink-0 rounded-full bg-[var(--success)] xs:block sm:inline" />
            <BranchSwitcher compact />
          </div>
        </div>
      </div>

      <div className="app-header-center hidden md:block">
        <GlobalSearchTrigger />
      </div>

      <div className="app-header-right !gap-1 sm:!gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden !rounded-xl !px-2"
          onClick={() => setGlobalSearchOpen(true)}
          aria-label="Search modules"
        >
          <Search size={18} />
        </Button>

        {aiMinimized ? null : (
          <button
            type="button"
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)]"
            onClick={openAi}
            aria-label="Open Rhythm AI"
          >
            <RhythmAiAvatar size="sm" />
          </button>
        )}

        {role === 'child' ? (
          <div className="flex items-center rounded-xl bg-[var(--surface-muted)] p-0.5">
            <button
              type="button"
              className={cn(
                'rounded-lg px-2 py-1.5 text-[10px] font-medium transition sm:px-2.5 sm:text-xs',
                childView === 'student'
                  ? 'bg-[var(--surface)] text-[var(--text)] shadow-sm'
                  : 'text-[var(--text-secondary)]',
              )}
              onClick={() => setChildView('student')}
            >
              Student
            </button>
            <button
              type="button"
              className={cn(
                'rounded-lg px-2 py-1.5 text-[10px] font-medium transition sm:px-2.5 sm:text-xs',
                childView === 'parent'
                  ? 'bg-[var(--surface)] text-[var(--text)] shadow-sm'
                  : 'text-[var(--text-secondary)]',
              )}
              onClick={() => setChildView('parent')}
            >
              Parent
            </button>
          </div>
        ) : null}

        <RoleSwitcher />
        <NotificationCenter />
        <UserMenu />
      </div>
    </header>
  )
}
