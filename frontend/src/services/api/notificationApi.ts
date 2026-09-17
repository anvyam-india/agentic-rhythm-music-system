import type { AppNotification } from '@/types/notification'
import type { UserRole } from '@/types/roles'
import { mockRequest } from './apiClient'
import { mockNotifications } from '../mock/mockNotifications'

export const notificationApi = {
  async getNotifications(role?: UserRole): Promise<AppNotification[]> {
    let items = [...mockNotifications]
    if (role) {
      items = items.filter(
        (n) =>
          !n.role ||
          n.role === role ||
          (role === 'child' && (n.role === 'child' || n.role === 'parent')),
      )
    }
    return mockRequest(items)
  },

  async markRead(id: string): Promise<AppNotification | null> {
    const item = mockNotifications.find((n) => n.id === id)
    if (!item) return mockRequest(null)
    item.read = true
    return mockRequest({ ...item })
  },

  async markAllRead(): Promise<void> {
    mockNotifications.forEach((n) => {
      n.read = true
    })
    await mockRequest(null, 150)
  },
}
