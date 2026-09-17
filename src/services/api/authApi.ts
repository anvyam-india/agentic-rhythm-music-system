import type { UserRole } from '@/types/roles'
import { DEMO_USERS } from '@/constants/roles'
import { mockRequest } from './apiClient'

export const authApi = {
  async loginAs(role: UserRole) {
    return mockRequest({
      isAuthenticated: true,
      role,
      user: DEMO_USERS[role],
    })
  },
}
