import type { Teacher } from '@/types/teacher'
import { mockRequest } from './apiClient'
import { mockTeachers } from '../mock/mockTeachers'

export const teacherApi = {
  async getTeachers(): Promise<Teacher[]> {
    return mockRequest([...mockTeachers])
  },

  async getTeacherById(id: string): Promise<Teacher | null> {
    return mockRequest(mockTeachers.find((t) => t.id === id) ?? null)
  },
}
