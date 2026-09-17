import type { StudioSession } from '@/types/studio'
import { mockRequest } from './apiClient'
import { mockStudioSessions } from '../mock/mockStudio'

export const studioApi = {
  async getSessions(): Promise<StudioSession[]> {
    return mockRequest([...mockStudioSessions])
  },

  async getSessionById(id: string): Promise<StudioSession | null> {
    return mockRequest(mockStudioSessions.find((s) => s.id === id) ?? null)
  },
}
