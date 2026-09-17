export type TeacherStatus = 'active' | 'on_leave'

export interface Teacher {
  id: string
  name: string
  avatarInitials: string
  email: string
  phone: string
  instruments: string[]
  experienceYears: number
  studentsCount: number
  attendancePercentage: number
  status: TeacherStatus
  specialties: string[]
}
