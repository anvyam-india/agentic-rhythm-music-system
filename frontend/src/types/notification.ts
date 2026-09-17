export type NotificationType =
  | 'class_reminder'
  | 'attendance'
  | 'assignment'
  | 'teacher_feedback'
  | 'practice_reminder'
  | 'payment'
  | 'event'
  | 'achievement'

export interface AppNotification {
  id: string
  type: NotificationType
  title: string
  message: string
  createdAt: string
  read: boolean
  role?: 'admin' | 'teacher' | 'child' | 'parent'
}
