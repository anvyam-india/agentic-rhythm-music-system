import type { AttendanceRecord, AttendanceStatus } from '@/types/attendance'
import { mockRequest } from './apiClient'
import { mockAttendance } from '../mock/mockAttendance'

export const attendanceApi = {
  async getAttendance(): Promise<AttendanceRecord[]> {
    return mockRequest([...mockAttendance])
  },

  async getByClass(classId: string): Promise<AttendanceRecord[]> {
    return mockRequest(mockAttendance.filter((a) => a.classId === classId))
  },

  async getByStudent(studentId: string): Promise<AttendanceRecord[]> {
    return mockRequest(mockAttendance.filter((a) => a.studentId === studentId))
  },

  async updateAttendance(
    classId: string,
    studentId: string,
    status: AttendanceStatus,
    markedBy: string,
  ): Promise<AttendanceRecord> {
    const existing = mockAttendance.find(
      (a) => a.classId === classId && a.studentId === studentId,
    )
    if (existing) {
      existing.status = status
      return mockRequest({ ...existing })
    }
    const created: AttendanceRecord = {
      id: `att-${Date.now()}`,
      classId,
      studentId,
      date: new Date().toISOString().slice(0, 10),
      status,
      markedBy,
    }
    mockAttendance.push(created)
    return mockRequest(created)
  },
}
