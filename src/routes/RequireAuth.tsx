import type { ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { getDashboardPath } from '@/utils/role'
import type { UserRole } from '@/types/roles'

export function RequireAuth() {
  const { isAuthenticated } = useApp()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}

interface RoleGateProps {
  role: UserRole
  children: ReactNode
}

export function RoleGate({ role, children }: RoleGateProps) {
  const { currentRole } = useApp()

  if (currentRole !== role) {
    return <Navigate to={getDashboardPath(currentRole)} replace />
  }

  return children
}

export function RootRedirect() {
  const { isAuthenticated, currentRole } = useApp()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Navigate to={getDashboardPath(currentRole)} replace />
}
