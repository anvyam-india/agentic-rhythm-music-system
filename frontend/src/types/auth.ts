import type { UserRole } from './roles'

export interface AuthSession {
  isAuthenticated: boolean
  role: UserRole | null
  userId: string | null
}
