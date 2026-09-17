import { Mail, Phone, Music2, Flame, Calendar, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Avatar } from '@/components/ui/Avatar/Avatar'
import { Progress } from '@/components/ui/Progress/Progress'
import { Button } from '@/components/ui/Button/Button'
import { mockStudents } from '@/services/mock/mockStudents'
import { formatDate } from '@/utils/date'

const AARAV = mockStudents.find((s) => s.id === 'student-001')!

export default function Profile() {
  return (
    <PageContainer>
      <PageHeader title="My Profile" description="Your student profile, batch, and family contacts." />

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-4">
          <CardContent className="flex flex-col items-center pt-8 text-center">
            <Avatar initials={AARAV.avatarInitials} size="lg" online />
            <h2 className="mt-4 text-xl font-semibold text-[var(--text)]">{AARAV.name}</h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Age {AARAV.age} · {AARAV.instrument} · {AARAV.level}
            </p>
            <Badge variant="success" className="mt-3 capitalize">
              {AARAV.status}
            </Badge>
            <Link to="/child/family" className="mt-6 w-full">
              <Button variant="outline" className="w-full">
                <Heart size={14} /> Open Family View
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-5">
                <p className="text-xs text-[var(--text-muted)]">Attendance</p>
                <p className="mt-1 text-2xl font-semibold text-[var(--text)]">{AARAV.attendancePercentage}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5">
                <p className="text-xs text-[var(--text-muted)]">Progress</p>
                <p className="mt-1 text-2xl font-semibold text-[var(--accent)]">{AARAV.progressPercentage}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5">
                <p className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  <Flame size={12} /> Streak
                </p>
                <p className="mt-1 text-2xl font-semibold text-[var(--text)]">{AARAV.streak} days</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2">
                <Music2 size={18} /> Learning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="accent">{AARAV.batch}</Badge>
                <Badge variant="neutral">Teacher: Jayesh Patel</Badge>
                <Badge variant="neutral">Joined {formatDate(AARAV.joinedAt)}</Badge>
              </div>
              <Progress label="Level 2 curriculum" value={AARAV.progressPercentage} />
              <Progress label="Weekly practice goal" value={87} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2">
                <Heart size={18} /> Parent / guardian
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-[var(--text-secondary)]">
              <p className="font-medium text-[var(--text)]">{AARAV.parentName}</p>
              <p className="inline-flex items-center gap-2">
                <Phone size={14} className="text-[var(--accent)]" /> {AARAV.parentPhone}
              </p>
              <p className="inline-flex items-center gap-2">
                <Mail size={14} className="text-[var(--accent)]" /> rajesh.patel@email.com
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2">
                <Calendar size={18} /> Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2 text-sm">
              <div className="rounded-xl bg-[var(--bg)] px-4 py-3">
                <p className="text-xs text-[var(--text-muted)]">Preferred practice time</p>
                <p className="font-medium text-[var(--text)]">Evening · 30–40 min</p>
              </div>
              <div className="rounded-xl bg-[var(--bg)] px-4 py-3">
                <p className="text-xs text-[var(--text-muted)]">Notifications</p>
                <p className="font-medium text-[var(--text)]">Class + assignment alerts</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}
