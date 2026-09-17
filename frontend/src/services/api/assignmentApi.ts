import type { Assignment, AssignmentFormData } from '@/types/assignment'
import { mockRequest } from './apiClient'
import { mockAssignments } from '../mock/mockAssignments'

export const assignmentApi = {
  async getAssignments(): Promise<Assignment[]> {
    return mockRequest([...mockAssignments])
  },

  async getByStudent(studentId: string): Promise<Assignment[]> {
    return mockRequest(mockAssignments.filter((a) => a.studentIds.includes(studentId)))
  },

  async getByTeacher(teacherId: string): Promise<Assignment[]> {
    return mockRequest(mockAssignments.filter((a) => a.teacherId === teacherId))
  },

  async create(data: AssignmentFormData, teacherId: string, teacherName: string): Promise<Assignment> {
    const created: Assignment = {
      id: `assign-${Date.now()}`,
      title: data.title,
      instrument: data.instrument,
      skill: data.skill,
      description: data.description,
      practiceDuration: data.practiceDuration,
      dueDate: data.dueDate,
      difficulty: data.difficulty,
      status: 'active',
      teacherId,
      teacherName,
      studentIds: ['student-001', 'student-006', 'student-009', 'student-015'],
      createdAt: new Date().toISOString().slice(0, 10),
      teacherRecording: data.teacherRecording,
      hasReferenceRecording: data.hasReferenceRecording ?? Boolean(data.teacherRecording),
    }
    mockAssignments.unshift(created)
    return mockRequest(created)
  },
}
