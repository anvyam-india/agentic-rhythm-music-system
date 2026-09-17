import type { UserRole } from '@/types/roles'

export function getDashboardPath(role: UserRole): string {
  return `/${role}/dashboard`
}

export function isRolePath(pathname: string, role: UserRole): boolean {
  return pathname.startsWith(`/${role}`)
}
