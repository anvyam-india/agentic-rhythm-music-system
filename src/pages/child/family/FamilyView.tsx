import { useEffect } from 'react'
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom'
import {
  ClipboardCheck,
  Calendar,
  Music,
  TrendingUp,
  MessageCircle,
  Wallet,
  Trophy,
  Heart,
} from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card/Card'
import { Progress } from '@/components/ui/Progress/Progress'
import { Badge } from '@/components/ui/Badge/Badge'
import { Avatar } from '@/components/ui/Avatar/Avatar'
import { Button } from '@/components/ui/Button/Button'
import { mockStudents } from '@/services/mock/mockStudents'
import { cn } from '@/utils/format'
import { useApp } from '@/context/AppContext'

const AARAV = mockStudents.find((s) => s.id === 'student-001')!

const FAMILY_LINKS = [
  { to: '/child/family', label: 'Overview', end: true },
  { to: '/child/family/attendance', label: 'Attendance' },
  { to: '/child/family/schedule', label: 'Schedule' },
  { to: '/child/family/practice', label: 'Practice' },
  { to: '/child/family/progress', label: 'Progress' },
  { to: '/child/family/assignments', label: 'Assignments' },
  { to: '/child/family/feedback', label: 'Feedback' },
  { to: '/child/family/payments', label: 'Payments' },
  { to: '/child/family/achievements', label: 'Achievements' },
  { to: '/child/family/events', label: 'Events' },
  { to: '/child/family/messages', label: 'Messages' },
]

export default function FamilyView() {
  const location = useLocation()
  const { setChildView } = useApp()
  const isOverview = location.pathname === '/child/family' || location.pathname === '/child/family/'

  useEffect(() => {
    setChildView('parent')
  }, [setChildView])

  return (
    <PageContainer>
      <PageHeader
        title="Family View"
        description={`Parent dashboard for ${AARAV.name}`}
        actions={
          <Button variant="outline" size="sm" onClick={() => setChildView('student')}>
            Switch to student view
          </Button>
        }
      />

      <div className="mb-6 flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-gradient-to-r from-[var(--accent-soft)]/40 to-[var(--surface)] p-4">
        <Avatar initials={AARAV.avatarInitials} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="text-sm text-[var(--text-secondary)]">Hello, {AARAV.parentName}</p>
          <p className="font-semibold text-[var(--text)]">
            Monitoring {AARAV.name} · {AARAV.instrument} · {AARAV.level}
          </p>
          <div className="mt-1 flex flex-wrap gap-2">
            <Badge variant="accent">{AARAV.batch}</Badge>
            <Badge variant="neutral">{AARAV.streak}-day streak</Badge>
          </div>
        </div>
        <Heart className="hidden text-[var(--accent)] sm:block" size={28} />
      </div>

      <nav className="mb-6 flex gap-1 overflow-x-auto rounded-2xl bg-[var(--surface-muted)] p-1 scrollbar-thin">
        {FAMILY_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              cn(
                'whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition',
                isActive
                  ? 'bg-[var(--surface)] text-[var(--text)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text)]',
              )
            }
            onClick={() => setChildView('parent')}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {isOverview ? (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { label: 'Attendance', value: `${AARAV.attendancePercentage}%`, icon: ClipboardCheck },
              { label: 'Practice', value: '4h 35m', icon: Music },
              { label: 'Progress', value: `${AARAV.progressPercentage}%`, icon: TrendingUp },
              { label: 'Streak', value: `${AARAV.streak} days`, icon: Trophy },
              { label: 'Next class', value: 'Today 6 PM', icon: Calendar },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="pt-5">
                  <p className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <stat.icon size={12} /> {stat.label}
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-[var(--text)]">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-2 text-base">
                  <MessageCircle size={16} /> Teacher feedback
                </CardTitle>
                <CardDescription>Latest from Jayesh Patel</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  Excellent improvement in chord transitions. Please continue rhythm exercises at home —
                  10 minutes with a metronome before each practice.
                </p>
                <p className="mt-3 text-xs text-[var(--text-muted)]">15 Sep 2026</p>
                <Link to="/child/family/feedback" className="mt-3 inline-block text-sm font-medium text-[var(--accent)]">
                  All feedback →
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Practice this week</CardTitle>
                <CardDescription>Goal: 5 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-2xl font-semibold text-[var(--text)]">4h 35m</p>
                <Progress label="Weekly goal" value={87} />
                <Link to="/child/family/practice" className="inline-block text-sm font-medium text-[var(--accent)]">
                  Practice history →
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-2 text-base">
                  <Wallet size={16} /> Payments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between rounded-xl bg-[var(--bg)] px-3 py-2">
                  <span className="text-sm text-[var(--text)]">September fee</span>
                  <Badge variant="success">Paid · ₹3,500</Badge>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">Next due: 01 October</p>
                <p className="text-xs text-[var(--text-muted)]">Online payment — Coming in Production</p>
                <Link to="/child/family/payments" className="inline-block text-sm font-medium text-[var(--accent)]">
                  View receipts →
                </Link>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Quick links</CardTitle>
                <CardDescription>Jump into detailed family modules</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { to: '/child/family/attendance', label: 'Attendance log' },
                { to: '/child/family/schedule', label: 'Class schedule' },
                { to: '/child/family/assignments', label: 'Homework' },
                { to: '/child/family/achievements', label: 'Badges' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-medium text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {link.label} →
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      ) : null}

      <Outlet />
    </PageContainer>
  )
}
