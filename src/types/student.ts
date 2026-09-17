export type StudentStatus = 'active' | 'inactive' | 'on_hold'

export interface Student {
  id: string
  name: string
  avatarInitials: string
  age: number
  parentName: string
  parentPhone: string
  instrument: string
  level: string
  batch: string
  teacherId: string
  attendancePercentage: number
  practiceMinutes: number
  progressPercentage: number
  status: StudentStatus
  streak: number
  joinedAt: string
  email?: string
}

export interface StudentSkill {
  name: string
  percentage: number
}

export interface LearningMilestone {
  id: string
  title: string
  status: 'completed' | 'current' | 'upcoming'
}

export interface StudentFeedback {
  id: string
  studentId: string
  teacherId: string
  teacherName: string
  message: string
  createdAt: string
  skills?: StudentSkill[]
}
