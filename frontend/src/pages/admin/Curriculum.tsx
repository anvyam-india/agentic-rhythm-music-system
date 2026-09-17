import { BookOpen, CheckCircle2, Clock, Layers } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { StatCard } from '@/components/ui/StatCard/StatCard'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Progress } from '@/components/ui/Progress/Progress'
import { useApp } from '@/context/AppContext'

const MODULES = [
  {
    id: 'm1',
    instrument: 'Guitar',
    level: 'Level 2',
    title: 'Barre chords & rhythm',
    lessons: 6,
    done: 4,
    weeks: 'Weeks 5–8',
    focus: ['F barre', 'B minor', 'Strum patterns'],
  },
  {
    id: 'm2',
    instrument: 'Keyboard',
    level: 'Beginner',
    title: 'Major & minor scales',
    lessons: 4,
    done: 2,
    weeks: 'Weeks 3–4',
    focus: ['C major', 'A minor', 'Finger numbers'],
  },
  {
    id: 'm3',
    instrument: 'Vocal',
    level: 'Intermediate',
    title: 'Breath & resonance',
    lessons: 5,
    done: 5,
    weeks: 'Weeks 1–3',
    focus: ['Diaphragm', 'Warm-ups', 'Pitch match'],
  },
  {
    id: 'm4',
    instrument: 'Drums',
    level: 'Level 1',
    title: 'Groove foundations',
    lessons: 5,
    done: 3,
    weeks: 'Weeks 2–5',
    focus: ['4/4 groove', 'Hi-hat', 'Fills'],
  },
  {
    id: 'm5',
    instrument: 'Piano',
    level: 'Advanced',
    title: 'Exam repertoire',
    lessons: 8,
    done: 5,
    weeks: 'Term plan',
    focus: ['Etudes', 'Sight reading', 'Dynamics'],
  },
  {
    id: 'm6',
    instrument: 'Tabla',
    level: 'Foundations',
    title: 'Teentaal basics',
    lessons: 4,
    done: 1,
    weeks: 'Weeks 1–4',
    focus: ['Bol', 'Kayda', 'Hand posture'],
  },
]

export default function Curriculum() {
  const { currentBranch } = useApp()
  const totalLessons = MODULES.reduce((s, m) => s + m.lessons, 0)
  const doneLessons = MODULES.reduce((s, m) => s + m.done, 0)

  return (
    <PageContainer>
      <PageHeader
        title="Curriculum"
        description={`Module maps & lesson progress · ${currentBranch.name}`}
        breadcrumbs={[{ label: 'Academics' }, { label: 'Curriculum' }]}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Active modules" value={MODULES.length} icon={<Layers size={18} />} />
        <StatCard title="Total lessons" value={totalLessons} icon={<BookOpen size={18} />} />
        <StatCard title="Completed" value={doneLessons} icon={<CheckCircle2 size={18} />} />
        <StatCard title="Avg pace" value="On track" icon={<Clock size={18} />} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {MODULES.map((m) => {
          const pct = Math.round((m.done / m.lessons) * 100)
          return (
            <Card key={m.id} hover className="h-full overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--ai)]" />
              <CardContent className="space-y-3 pt-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[var(--text)]">{m.title}</p>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      {m.instrument} · {m.level}
                    </p>
                  </div>
                  <Badge variant="accent">{m.weeks}</Badge>
                </div>
                <Progress label={`${m.done}/${m.lessons} lessons`} value={pct} />
                <div className="flex flex-wrap gap-1.5">
                  {m.focus.map((f) => (
                    <Badge key={f} variant="neutral">
                      {f}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </PageContainer>
  )
}
