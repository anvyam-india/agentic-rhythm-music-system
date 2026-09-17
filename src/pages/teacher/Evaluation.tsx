import { useState } from 'react'
import { Star, Save } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import { Avatar } from '@/components/ui/Avatar/Avatar'
import { Progress } from '@/components/ui/Progress/Progress'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/utils/format'

interface EvalStudent {
  id: string
  name: string
  initials: string
  batch: string
  scores: { technique: number; rhythm: number; theory: number; attitude: number }
  note: string
  ready: string
}

const INITIAL: EvalStudent[] = [
  {
    id: 'student-001',
    name: 'Aarav Patel',
    initials: 'AP',
    batch: 'Guitar L2',
    scores: { technique: 82, rhythm: 78, theory: 85, attitude: 90 },
    note: 'Ready for barre module. Chord transitions much smoother.',
    ready: 'Barre chords',
  },
  {
    id: 'student-006',
    name: 'Vivaan Desai',
    initials: 'VD',
    batch: 'Guitar L2',
    scores: { technique: 70, rhythm: 62, theory: 74, attitude: 80 },
    note: 'Needs metronome drills before next assessment.',
    ready: 'Rhythm foundations',
  },
  {
    id: 'student-009',
    name: 'Kabir Trivedi',
    initials: 'KT',
    batch: 'Guitar L2',
    scores: { technique: 88, rhythm: 84, theory: 80, attitude: 92 },
    note: 'Strong fingerstyle progress. Can mentor peers on warm-ups.',
    ready: 'Fingerstyle intro',
  },
  {
    id: 'student-004',
    name: 'Dev Patel',
    initials: 'DP',
    batch: 'Guitar L2',
    scores: { technique: 75, rhythm: 71, theory: 68, attitude: 85 },
    note: 'Attendance recovered. Keep short daily practice goals.',
    ready: 'Open chords fluency',
  },
]

function avg(s: EvalStudent['scores']) {
  return Math.round((s.technique + s.rhythm + s.theory + s.attitude) / 4)
}

export default function Evaluation() {
  const toast = useToast()
  const [students, setStudents] = useState(INITIAL)
  const [selectedId, setSelectedId] = useState(INITIAL[0]!.id)
  const selected = students.find((s) => s.id === selectedId)!

  const setScore = (key: keyof EvalStudent['scores'], value: number) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === selectedId ? { ...s, scores: { ...s.scores, [key]: value } } : s,
      ),
    )
  }

  return (
    <PageContainer>
      <PageHeader
        title="Student Evaluation"
        description="Monthly rubrics for Guitar L2 — technique, rhythm, theory & attitude."
        actions={
          <Button
            onClick={() => toast.success('Evaluation saved', `${selected.name} · score ${avg(selected.scores)}`)}
          >
            <Save size={16} /> Save evaluation
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-4">
          {students.map((s) => {
            const score = avg(s.scores)
            const active = s.id === selectedId
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedId(s.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition',
                  active
                    ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                    : 'border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-muted)]',
                )}
              >
                <Avatar initials={s.initials} />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[var(--text)]">{s.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{s.batch}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-[var(--accent)]">{score}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">avg</p>
                </div>
              </button>
            )
          })}
        </div>

        <Card className="lg:col-span-8">
          <CardHeader className="flex flex-row items-start justify-between gap-3">
            <div>
              <CardTitle>{selected.name}</CardTitle>
              <CardDescription>
                {selected.batch} · Next focus: {selected.ready}
              </CardDescription>
            </div>
            <Badge variant="accent" className="inline-flex items-center gap-1">
              <Star size={12} /> Score {avg(selected.scores)}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            {(
              [
                ['technique', 'Technique'],
                ['rhythm', 'Rhythm'],
                ['theory', 'Theory'],
                ['attitude', 'Attitude'],
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-[var(--text)]">{label}</span>
                  <span className="text-sm font-semibold text-[var(--accent)]">{selected.scores[key]}</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={100}
                  value={selected.scores[key]}
                  onChange={(e) => setScore(key, Number(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
                <Progress value={selected.scores[key]} showValue={false} size="sm" className="mt-2" />
              </div>
            ))}

            <div className="rounded-2xl bg-[var(--bg)] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                Teacher notes
              </p>
              <textarea
                className="mt-2 w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]"
                rows={3}
                value={selected.note}
                onChange={(e) =>
                  setStudents((prev) =>
                    prev.map((s) => (s.id === selectedId ? { ...s, note: e.target.value } : s)),
                  )
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
