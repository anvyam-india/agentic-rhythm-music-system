import type { Student, StudentFeedback } from '@/types/student'
import { mockRequest } from './apiClient'
import { mockStudents, mockFeedback } from '../mock/mockStudents'

export const studentApi = {
  async getStudents(): Promise<Student[]> {
    return mockRequest([...mockStudents])
  },

  async getStudentById(id: string): Promise<Student | null> {
    return mockRequest(mockStudents.find((s) => s.id === id) ?? null)
  },

  async getStudentsByTeacher(teacherId: string): Promise<Student[]> {
    return mockRequest(mockStudents.filter((s) => s.teacherId === teacherId))
  },

  async getFeedback(studentId: string): Promise<StudentFeedback[]> {
    return mockRequest(mockFeedback.filter((f) => f.studentId === studentId))
  },

  async addFeedback(feedback: Omit<StudentFeedback, 'id' | 'createdAt'>): Promise<StudentFeedback> {
    const created: StudentFeedback = {
      ...feedback,
      id: `feedback-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    mockFeedback.unshift(created)
    return mockRequest(created)
  },
}
