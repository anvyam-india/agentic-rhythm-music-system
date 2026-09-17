import type { AcademyEvent } from '@/types/event'
import { mockRequest } from './apiClient'
import { mockEvents } from '../mock/mockEvents'

export const eventApi = {
  async getEvents(): Promise<AcademyEvent[]> {
    return mockRequest(mockEvents.map((e) => ({ ...e })))
  },

  async register(eventId: string): Promise<AcademyEvent | null> {
    const event = mockEvents.find((e) => e.id === eventId)
    if (!event) return mockRequest(null)
    event.isRegistered = true
    event.registeredCount += 1
    return mockRequest({ ...event })
  },
}
