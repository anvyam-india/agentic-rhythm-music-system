import type { DemoUser, RoleWorkspace, UserRole } from '@/types/roles'

export const ROLE_WORKSPACES: RoleWorkspace[] = [
  {
    role: 'admin',
    label: 'Admin',
    description: 'Academy Management',
  },
  {
    role: 'teacher',
    label: 'Teacher',
    description: 'Teaching & Student Management',
  },
  {
    role: 'child',
    label: 'Child',
    description: 'Learning & Practice',
  },
]

export const DEMO_USERS: Record<UserRole, DemoUser> = {
  admin: {
    id: 'user-admin',
    name: 'Kaushal Admin',
    email: 'admin@rhythmonic.in',
    role: 'admin',
    avatarInitials: 'KA',
    title: 'Academy Director',
  },
  teacher: {
    id: 'teacher-001',
    name: 'Jayesh Patel',
    email: 'jayesh@rhythmonic.in',
    role: 'teacher',
    avatarInitials: 'JP',
    title: 'Guitar Faculty',
  },
  child: {
    id: 'student-001',
    name: 'Aarav Patel',
    email: 'aarav@rhythmonic.in',
    role: 'child',
    avatarInitials: 'AP',
    title: 'Guitar — Level 2',
  },
}

export const STORAGE_KEYS = {
  role: 'rhythmonic.role',
  theme: 'rhythmonic.theme',
  authenticated: 'rhythmonic.authenticated',
  childView: 'rhythmonic.childView',
  branchId: 'rhythmonic.branchId',
} as const

export interface AcademyBranch {
  id: string
  name: string
  area: string
  students: number
  teachers: number
}

export const ACADEMY_BRANCHES: AcademyBranch[] = [
  {
    id: 'br-south-bopal',
    name: 'South Bopal',
    area: 'Flagship · Ahmedabad',
    students: 148,
    teachers: 11,
  },
  {
    id: 'br-prahlad-nagar',
    name: 'Prahlad Nagar',
    area: 'Satellite campus',
    students: 62,
    teachers: 5,
  },
  {
    id: 'br-bopal-cross',
    name: 'Bopal Cross Roads',
    area: 'Weekend + evening',
    students: 38,
    teachers: 2,
  },
]

