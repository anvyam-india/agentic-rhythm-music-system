import { NavLink } from 'react-router-dom'
import { Home, Users, Calendar, Music, Heart } from 'lucide-react'
import { useRole } from '@/hooks/useRole'
import { cn } from '@/utils/format'

export function MobileNavigation() {
  const { role } = useRole()

  const items =
    role === 'admin'
      ? [
          { to: '/admin/dashboard', label: 'Home', icon: Home },
          { to: '/admin/students', label: 'Students', icon: Users },
          { to: '/admin/schedule', label: 'Schedule', icon: Calendar },
          { to: '/admin/studio', label: 'Studio', icon: Music },
        ]
      : role === 'teacher'
        ? [
            { to: '/teacher/dashboard', label: 'Home', icon: Home },
            { to: '/teacher/classes', label: 'Classes', icon: Calendar },
            { to: '/teacher/students', label: 'Students', icon: Users },
            { to: '/teacher/assignments', label: 'Tasks', icon: Music },
          ]
        : [
            { to: '/child/dashboard', label: 'Home', icon: Home },
            { to: '/child/practice', label: 'Practice', icon: Music },
            { to: '/child/progress', label: 'Progress', icon: Calendar },
            { to: '/child/family', label: 'Family', icon: Heart },
          ]

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 flex border-t border-[var(--border)] bg-[var(--surface)] px-2 py-2 lg:hidden">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-medium',
                isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]',
              )
            }
          >
            <Icon size={18} />
            {item.label}
          </NavLink>
        )
      })}
    </nav>
  )
}
