export type EventType = 'concert' | 'workshop' | 'performance' | 'competition'

export interface AcademyEvent {
  id: string
  title: string
  type: EventType
  date: string
  time: string
  location: string
  description: string
  registeredCount: number
  capacity: number
  isRegistered?: boolean
}
