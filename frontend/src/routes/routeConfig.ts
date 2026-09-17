import type { UserRole } from '@/types/roles'

export interface AppRouteMeta {
  path: string
  label: string
  roles: UserRole[]
}

export const APP_ROUTES: AppRouteMeta[] = [
  { path: '/admin/dashboard', label: 'Admin Dashboard', roles: ['admin'] },
  { path: '/admin/students', label: 'Students', roles: ['admin'] },
  { path: '/admin/teachers', label: 'Teachers', roles: ['admin'] },
  { path: '/admin/courses', label: 'Courses', roles: ['admin'] },
  { path: '/admin/batches', label: 'Batches', roles: ['admin'] },
  { path: '/admin/schedule', label: 'Schedule', roles: ['admin'] },
  { path: '/admin/attendance', label: 'Attendance', roles: ['admin'] },
  { path: '/admin/assignments', label: 'Assignments', roles: ['admin'] },
  { path: '/admin/payments', label: 'Payments', roles: ['admin'] },
  { path: '/admin/studio', label: 'Studio', roles: ['admin'] },
  { path: '/admin/events', label: 'Events', roles: ['admin'] },
  { path: '/admin/reports', label: 'Reports', roles: ['admin'] },
  { path: '/admin/settings', label: 'Settings', roles: ['admin'] },
  { path: '/admin/academy', label: 'Academy', roles: ['admin'] },
  { path: '/admin/practice', label: 'Practice', roles: ['admin'] },
  { path: '/admin/communication', label: 'Communication', roles: ['admin'] },
  { path: '/admin/learning', label: 'Learning', roles: ['admin'] },
  { path: '/admin/ai-insights', label: 'AI Insights', roles: ['admin'] },
  { path: '/admin/curriculum', label: 'Curriculum', roles: ['admin'] },
  { path: '/teacher/dashboard', label: 'Teacher Dashboard', roles: ['teacher'] },
  { path: '/teacher/classes', label: 'Classes', roles: ['teacher'] },
  { path: '/teacher/students', label: 'Students', roles: ['teacher'] },
  { path: '/child/dashboard', label: 'Home', roles: ['child'] },
  { path: '/child/practice', label: 'Practice', roles: ['child'] },
  { path: '/child/family', label: 'Family View', roles: ['child'] },
]
