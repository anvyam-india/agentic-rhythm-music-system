import { Flame, Guitar, Medal, Music, Trophy, Lock } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { StatCard } from '@/components/ui/StatCard/StatCard'
import { Progress } from '@/components/ui/Progress/Progress'
import { mockAchievements } from '@/services/mock/mockApi'
import { formatDate } from '@/utils/date'
import { cn } from '@/utils/format'
import type { LucideIcon } from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  trophy: Trophy,
  flame: Flame,
  guitar: Guitar,
  music: Music,
  medal: Medal,
}

export default function Achievements() {
  const unlocked = mockAchievements.filter((a) => a.unlocked)
  const locked = mockAchievements.filter((a) => !a.unlocked)

  return (
    <PageContainer>
      <PageHeader
        title="Achievements"
        description="Badges earned through practice, performances, and milestones."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard title="Unlocked" value={unlocked.length} icon={<Trophy size={18} />} />
        <StatCard title="In progress" value={locked.length} icon={<Flame size={18} />} />
        <StatCard title="Practice streak" value="12 days" icon={<Flame size={18} />} />
      </div>

      <div className="mb-8 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--accent-soft)]/50 to-[var(--surface)] p-6">
        <p className="text-sm font-medium text-[var(--accent)]">Next badge</p>
        <h2 className="mt-1 text-xl font-semibold text-[var(--text)]">30 Day Practice Streak</h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Keep going — you&apos;re 12 days in. 18 more days to unlock.
        </p>
        <Progress className="mt-4" label="Streak progress" value={40} />
      </div>

      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
        Unlocked
      </h3>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {unlocked.map((a) => {
          const Icon = ICONS[a.icon] ?? Trophy
          return (
            <Card key={a.id} hover className="overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-[var(--accent)] to-amber-400" />
              <CardContent className="pt-5">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon size={22} />
                </div>
                <p className="font-semibold text-[var(--text)]">{a.title}</p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">{a.description}</p>
                <Badge variant="success" className="mt-3">
                  Unlocked {a.earnedAt ? formatDate(a.earnedAt) : ''}
                </Badge>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
        Locked
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {locked.map((a) => {
          const Icon = ICONS[a.icon] ?? Lock
          return (
            <Card key={a.id} className={cn('opacity-75')}>
              <CardContent className="pt-5">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-[var(--text-muted)]">
                  <Icon size={22} />
                </div>
                <p className="font-semibold text-[var(--text)]">{a.title}</p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">{a.description}</p>
                <Badge variant="neutral" className="mt-3">
                  Locked
                </Badge>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </PageContainer>
  )
}
