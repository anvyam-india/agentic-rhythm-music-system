export type StudioSessionStatus = 'scheduled' | 'completed' | 'cancelled'

export interface StudioSession {
  id: string
  studentName: string
  sessionType: string
  room: string
  teacherName: string
  date: string
  time: string
  status: StudioSessionStatus
  notes?: string
}
