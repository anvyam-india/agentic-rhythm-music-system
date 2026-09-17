export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused'

export interface AttendanceRecord {
  id: string
  studentId: string
  classId: string
  date: string
  status: AttendanceStatus
  markedBy: string
  notes?: string
}

export interface TeacherAttendanceRecord {
  id: string
  teacherId: string
  date: string
  status: AttendanceStatus
  checkIn?: string
  checkOut?: string
}
