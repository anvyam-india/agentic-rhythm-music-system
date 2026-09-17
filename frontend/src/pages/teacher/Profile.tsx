import { Mail, Phone, Music2, Calendar, Award, Wallet } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Avatar } from '@/components/ui/Avatar/Avatar'
import { Progress } from '@/components/ui/Progress/Progress'
import { mockTeachers } from '@/services/mock/mockTeachers'

const JAYESH = mockTeachers.find((t) => t.id === 'teacher-001')!

export default function Profile() {
  return (
    <PageContainer>
      <PageHeader title="Profile" description="Your faculty profile, preferences, and teaching load." />

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-4">
          <CardContent className="flex flex-col items-center pt-8 text-center">
            <Avatar initials={JAYESH.avatarInitials} size="lg" online />
            <h2 className="mt-4 text-xl font-semibold text-[var(--text)]">{JAYESH.name}</h2>
            <p className="text-sm text-[var(--text-secondary)]">Lead Guitar Faculty</p>
            <Badge variant="success" className="mt-3 capitalize">
              {JAYESH.status}
            </Badge>
            <div className="mt-6 w-full space-y-2 text-left text-sm text-[var(--text-secondary)]">
              <p className="inline-flex w-full items-center gap-2 rounded-xl bg-[var(--bg)] px-3 py-2">
                <Mail size={14} className="text-[var(--accent)]" /> {JAYESH.email}
              </p>
              <p className="inline-flex w-full items-center gap-2 rounded-xl bg-[var(--bg)] px-3 py-2">
                <Phone size={14} className="text-[var(--accent)]" /> {JAYESH.phone}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-5">
                <p className="text-xs text-[var(--text-muted)]">Experience</p>
                <p className="mt-1 text-2xl font-semibold text-[var(--text)]">{JAYESH.experienceYears} yrs</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5">
                <p className="text-xs text-[var(--text-muted)]">Active students</p>
                <p className="mt-1 text-2xl font-semibold text-[var(--text)]">{JAYESH.studentsCount}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5">
                <p className="text-xs text-[var(--text-muted)]">Attendance</p>
                <p className="mt-1 text-2xl font-semibold text-[var(--accent)]">{JAYESH.attendancePercentage}%</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2">
                <Music2 size={18} /> Instruments & specialties
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {JAYESH.instruments.map((i) => (
                <Badge key={i} variant="accent">
                  {i}
                </Badge>
              ))}
              {JAYESH.specialties.map((s) => (
                <Badge key={s} variant="neutral">
                  {s}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2">
                <Calendar size={18} /> This week
              </CardTitle>
              <CardDescription>Teaching load snapshot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress label="Classes completed" value={72} />
              <Progress label="Assignments reviewed" value={58} />
              <Progress label="Practice feedbacks" value={64} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2">
                <Wallet size={18} /> Salary history
              </CardTitle>
              <CardDescription>Payouts — demo ledger</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { month: 'August 2026', amount: '₹42,000', status: 'Paid' },
                { month: 'July 2026', amount: '₹42,000', status: 'Paid' },
                { month: 'June 2026', amount: '₹40,500', status: 'Paid' },
                { month: 'September 2026', amount: '₹42,000', status: 'Processing' },
              ].map((row) => (
                <div
                  key={row.month}
                  className="flex items-center justify-between rounded-xl border border-[var(--border)] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-[var(--text)]">{row.month}</p>
                    <p className="text-xs text-[var(--text-muted)]">{row.status}</p>
                  </div>
                  <p className="font-semibold text-[var(--text)]">{row.amount}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2">
                <Award size={18} /> Recognition
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {[
                { title: 'Faculty of the Month', meta: 'August 2026' },
                { title: 'Concert Mentor', meta: 'Annual Showcase' },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-[var(--border)] px-4 py-3">
                  <p className="font-medium text-[var(--text)]">{item.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">{item.meta}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}
