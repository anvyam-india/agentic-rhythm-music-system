export type ClassStatus = 'upcoming' | 'live' | 'completed' | 'cancelled'

export interface MusicClass {
  id: string
  title: string
  instrument: string
  level: string
  teacherId: string
  teacherName: string
  room: string
  date: string
  startTime: string
  endTime: string
  studentIds: string[]
  status: ClassStatus
  batch: string
}
