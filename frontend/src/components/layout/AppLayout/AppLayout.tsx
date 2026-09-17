import { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { useRole } from '@/hooks/useRole'
import { Sidebar } from '@/components/layout/Sidebar/Sidebar'
import { Header } from '@/components/layout/Header/Header'
import { MobileNavigation } from '@/components/layout/MobileNavigation/MobileNavigation'
import { AiAssistantPanel } from '@/components/common/AiAssistantPanel/AiAssistantPanel'
import { CopilotInsightPanel } from '@/components/ai/CopilotInsightPanel'
import { GlobalSearch } from '@/components/common/GlobalSearch/GlobalSearch'
import { RhythmAiAvatar } from '@/components/ai/RhythmAiAvatar'
import { cn } from '@/utils/format'

export function AppLayout() {
  const { isAuthenticated, roleTransitioning, sidebarCollapsed, aiMinimized, restoreAi } = useApp()
  const { role } = useRole()

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark')
    root.classList.remove('role-admin', 'role-teacher', 'role-child')
    root.classList.add(`role-${role}`)
  }, [role])

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      <Sidebar />
      <div
        className={cn(
          'flex min-w-0 flex-1 flex-col transition-[margin] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          'ml-0',
          sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]',
        )}
      >
        <Header />
        <main
          className={cn(
            'flex-1 overflow-y-auto overflow-x-hidden pb-20 lg:pb-0',
            'bg-[radial-gradient(ellipse_600px_280px_at_10%_0%,rgba(15,118,110,0.05),transparent_70%),radial-gradient(ellipse_500px_240px_at_90%_100%,rgba(124,58,237,0.04),transparent_70%)]',
            roleTransitioning && 'opacity-60 transition-opacity',
          )}
        >
          <Outlet />
        </main>
      </div>
      <MobileNavigation />
      <GlobalSearch />
      <AiAssistantPanel />
      <CopilotInsightPanel />

      {aiMinimized ? (
        <button
          type="button"
          className="ai-float-corner"
          onClick={restoreAi}
          aria-label="Restore Rhythm AI"
          title="Rhythm AI — tap to reopen"
        >
          <RhythmAiAvatar size="md" pulse />
          <span className="ai-float-dot" />
        </button>
      ) : null}
    </div>
  )
}
