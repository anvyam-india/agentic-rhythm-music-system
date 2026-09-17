import type { NavItem } from '@/types/common'
import type { UserRole } from '@/types/roles'

/** Nested sidebar — modules with children under parents */
export const ADMIN_NAV: NavItem[] = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: 'LayoutDashboard' },
  {
    label: 'Academy',
    path: '/admin/academy',
    icon: 'Building2',
    children: [
      { label: 'Overview', path: '/admin/academy', icon: 'Building2' },
      { label: 'Branches', path: '/admin/academy/branches', icon: 'Building2' },
      { label: 'Rooms', path: '/admin/academy/rooms', icon: 'Building2' },
      { label: 'Instruments', path: '/admin/academy/instruments', icon: 'Music' },
    ],
  },
  {
    label: 'Students',
    path: '/admin/students',
    icon: 'Users',
    children: [
      { label: 'All Students', path: '/admin/students', icon: 'Users' },
      { label: 'Admissions', path: '/admin/students/admissions', icon: 'Users' },
      { label: 'Progress', path: '/admin/students/progress', icon: 'TrendingUp' },
    ],
  },
  {
    label: 'Teachers',
    path: '/admin/teachers',
    icon: 'GraduationCap',
    children: [
      { label: 'All Teachers', path: '/admin/teachers', icon: 'GraduationCap' },
      { label: 'Schedule', path: '/admin/teachers/schedule', icon: 'Calendar' },
      { label: 'Attendance', path: '/admin/teachers/attendance', icon: 'ClipboardCheck' },
    ],
  },
  {
    label: 'Academics',
    path: '/admin/courses',
    icon: 'BookOpen',
    children: [
      { label: 'Courses', path: '/admin/courses', icon: 'BookOpen' },
      { label: 'Batches', path: '/admin/batches', icon: 'BookOpen' },
      { label: 'Schedule', path: '/admin/schedule', icon: 'Calendar' },
      { label: 'Curriculum', path: '/admin/curriculum', icon: 'BookOpen' },
    ],
  },
  { label: 'Attendance', path: '/admin/attendance', icon: 'ClipboardCheck' },
  {
    label: 'Practice & Learning',
    path: '/admin/practice',
    icon: 'Music',
    children: [
      { label: 'Practice Activity', path: '/admin/practice', icon: 'Music' },
      { label: 'Assignments', path: '/admin/assignments', icon: 'FileText' },
      { label: 'Learning', path: '/admin/learning', icon: 'TrendingUp' },
    ],
  },
  {
    label: 'Finance',
    path: '/admin/payments',
    icon: 'Wallet',
    children: [
      { label: 'Payments', path: '/admin/payments', icon: 'Wallet' },
      { label: 'Outstanding', path: '/admin/payments/outstanding', icon: 'Wallet' },
      { label: 'Receipts', path: '/admin/payments/receipts', icon: 'Wallet' },
    ],
  },
  { label: 'Communication', path: '/admin/communication', icon: 'MessageSquare' },
  { label: 'Studio', path: '/admin/studio', icon: 'Mic2' },
  { label: 'Cameras', path: '/admin/cameras', icon: 'Camera' },
  { label: 'Events', path: '/admin/events', icon: 'CalendarDays' },
  { label: 'Reports', path: '/admin/reports', icon: 'BarChart3' },
  { label: 'Settings', path: '/admin/settings', icon: 'Settings' },
]

export const TEACHER_NAV: NavItem[] = [
  { label: 'Dashboard', path: '/teacher/dashboard', icon: 'LayoutDashboard' },
  {
    label: 'My Classes',
    path: '/teacher/classes',
    icon: 'Calendar',
    children: [
      { label: 'All Classes', path: '/teacher/classes', icon: 'Calendar' },
      { label: 'Upcoming', path: '/teacher/classes/upcoming', icon: 'Calendar' },
      { label: 'History', path: '/teacher/classes/history', icon: 'Calendar' },
    ],
  },
  {
    label: 'Students',
    path: '/teacher/students',
    icon: 'Users',
    children: [
      { label: 'My Students', path: '/teacher/students', icon: 'Users' },
      { label: 'Progress', path: '/teacher/students/progress', icon: 'TrendingUp' },
    ],
  },
  { label: 'Attendance', path: '/teacher/attendance', icon: 'ClipboardCheck' },
  {
    label: 'Assignments',
    path: '/teacher/assignments',
    icon: 'FileText',
    children: [
      { label: 'Active', path: '/teacher/assignments', icon: 'FileText' },
      { label: 'Create', path: '/teacher/assignments/create', icon: 'FileText' },
    ],
  },
  { label: 'Evaluation', path: '/teacher/evaluation', icon: 'ClipboardList' },
  { label: 'Practice Review', path: '/teacher/practice-review', icon: 'AudioLines' },
  { label: 'Communication', path: '/teacher/chat', icon: 'MessageSquare' },
  { label: 'Calendar', path: '/teacher/calendar', icon: 'CalendarDays' },
  { label: 'Profile', path: '/teacher/profile', icon: 'User' },
]

export const CHILD_NAV: NavItem[] = [
  { label: 'Home', path: '/child/dashboard', icon: 'Home' },
  {
    label: 'My Learning',
    path: '/child/learning',
    icon: 'BookOpen',
    children: [
      { label: 'My Courses', path: '/child/learning', icon: 'BookOpen' },
      { label: 'My Progress', path: '/child/progress', icon: 'TrendingUp' },
      { label: 'My Classes', path: '/child/classes', icon: 'Calendar' },
    ],
  },
  {
    label: 'Practice',
    path: '/child/practice',
    icon: 'Music',
    children: [
      { label: 'Practice Home', path: '/child/practice', icon: 'Music' },
      { label: 'Practice Analysis', path: '/child/practice-analysis', icon: 'AudioLines' },
      { label: 'History', path: '/child/practice/history', icon: 'AudioLines' },
    ],
  },
  { label: 'Assignments', path: '/child/assignments', icon: 'FileText' },
  { label: 'Achievements', path: '/child/achievements', icon: 'Trophy' },
  { label: 'Events', path: '/child/events', icon: 'CalendarDays' },
  { label: 'Calendar', path: '/child/calendar', icon: 'CalendarDays' },
  { label: 'Messages', path: '/child/chat', icon: 'MessageSquare' },
  { label: 'Family View', path: '/child/family', icon: 'Heart' },
  { label: 'Profile', path: '/child/profile', icon: 'User' },
]

export const FAMILY_NAV: NavItem[] = [
  { label: 'Dashboard', path: '/child/family', icon: 'LayoutDashboard' },
  {
    label: 'Learning',
    path: '/child/family/progress',
    icon: 'TrendingUp',
    children: [
      { label: 'Progress', path: '/child/family/progress', icon: 'TrendingUp' },
      { label: 'Practice', path: '/child/family/practice', icon: 'Music' },
      { label: 'Assignments', path: '/child/family/assignments', icon: 'FileText' },
      { label: 'Teacher Feedback', path: '/child/family/feedback', icon: 'MessageCircle' },
    ],
  },
  { label: 'Attendance', path: '/child/family/attendance', icon: 'ClipboardCheck' },
  { label: 'Schedule', path: '/child/family/schedule', icon: 'Calendar' },
  { label: 'Payments', path: '/child/family/payments', icon: 'Wallet' },
  { label: 'Achievements', path: '/child/family/achievements', icon: 'Trophy' },
  { label: 'Events', path: '/child/family/events', icon: 'CalendarDays' },
  { label: 'Messages', path: '/child/family/messages', icon: 'MessageSquare' },
]

export function getNavForRole(role: UserRole, childView: 'student' | 'parent' = 'student'): NavItem[] {
  if (role === 'admin') return ADMIN_NAV
  if (role === 'teacher') return TEACHER_NAV
  if (childView === 'parent') return FAMILY_NAV
  return CHILD_NAV
}

function flattenNav(items: NavItem[]): NavItem[] {
  const out: NavItem[] = []
  for (const item of items) {
    if (item.children?.length) {
      out.push(...item.children)
    } else {
      out.push(item)
    }
  }
  return out
}

/** Flat list for Cmd+K / voice module search */
export function getSearchableModules(role: UserRole, childView: 'student' | 'parent' = 'student'): NavItem[] {
  return flattenNav(getNavForRole(role, childView))
}
