export type UserRole = 'admin' | 'teacher' | 'child'

export type ChildViewMode = 'student' | 'parent'

export interface DemoUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatarInitials: string
  title?: string
}

export interface RoleWorkspace {
  role: UserRole
  label: string
  description: string
}
