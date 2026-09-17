import { useApp } from '@/context/AppContext'
import type { ChildViewMode, DemoUser, UserRole } from '@/types/roles'

export function useRole(): {
  role: UserRole
  setRole: (role: UserRole) => void
  currentUser: DemoUser
  childView: ChildViewMode
  setChildView: (view: ChildViewMode) => void
  roleTransitioning: boolean
} {
  const {
    currentRole,
    setCurrentRole,
    currentUser,
    childView,
    setChildView,
    roleTransitioning,
  } = useApp()

  return {
    role: currentRole,
    setRole: setCurrentRole,
    currentUser,
    childView,
    setChildView,
    roleTransitioning,
  }
}
