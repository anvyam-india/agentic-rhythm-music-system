import type { MusicClass } from '@/types/class'
import { mockRequest } from './apiClient'
import { mockClasses } from '../mock/mockClasses'

export const classApi = {
  async getClasses(): Promise<MusicClass[]> {
    return mockRequest([...mockClasses])
  },

  async getClassById(id: string): Promise<MusicClass | null> {
    return mockRequest(mockClasses.find((c) => c.id === id) ?? null)
  },

  async getClassesByTeacher(teacherId: string): Promise<MusicClass[]> {
    return mockRequest(mockClasses.filter((c) => c.teacherId === teacherId))
  },

  async getTodaysClasses(teacherId?: string): Promise<MusicClass[]> {
    const today = '2026-09-17'
    let classes = mockClasses.filter((c) => c.date === today)
    if (teacherId) {
      classes = classes.filter((c) => c.teacherId === teacherId)
    }
    return mockRequest(classes)
  },
}
