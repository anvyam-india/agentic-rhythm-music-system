import { useEffect, useState } from 'react'
import { Clock, Target, CheckCircle2, Upload, Mic, Sparkles } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import { Modal } from '@/components/ui/Modal/Modal'
import { Progress } from '@/components/ui/Progress/Progress'
import { assignmentApi } from '@/services/api/assignmentApi'
import type { Assignment, AssignmentSubmissionAnalysis } from '@/types/assignment'
import { formatDate } from '@/utils/date'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/utils/format'

const STUDENT_ID = 'student-001'

function mockAnalysis(): AssignmentSubmissionAnalysis {
  return {
    overall: 84,
    pitch: 86,
    rhythm: 79,
    tempo: 91,
    technique: 82,
    goodPoints: [
      'Pitch stability improved on G → C transition',
      'Tempo held steadily with metronome at 60 BPM',
      'Clean fretting on Em chord',
    ],
    weakPoints: [
      'Slight rush on downstroke before D chord',
      'Rhythm consistency dips in bar 3–4',
      'Mute residual string noise on transitions',
    ],
    feedback:
      'Strong match against teacher reference. Focus 10 min on rhythm subdivisions before increasing speed.',
  }
}

export default function Assignments() {
  const toast = useToast()
  const [items, setItems] = useState<Assignment[]>([])
  const [done, setDone] = useState<string[]>([])
  const [uploadFor, setUploadFor] = useState<Assignment | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<AssignmentSubmissionAnalysis | null>(null)

  useEffect(() => {
    void assignmentApi.getByStudent(STUDENT_ID).then(setItems)
  }, [])

  const runUpload = () => {
    if (!uploadFor) return
    setAnalyzing(true)
    setAnalysis(null)
    window.setTimeout(() => {
      setAnalysis(mockAnalysis())
      setAnalyzing(false)
      setDone((d) => (d.includes(uploadFor.id) ? d : [...d, uploadFor.id]))
      toast.success('Upload analyzed', 'AI Practice Analysis — Demo')
    }, 1400)
  }

  return (
    <PageContainer>
      <PageHeader
        title="My Assignments"
        description="Teacher reference + your upload — AI scores pitch, rhythm, tempo (demo)."
      />

      <div className="mb-5 flex flex-wrap gap-3 text-sm">
        <Badge variant="accent">{items.filter((a) => a.status === 'active').length} active</Badge>
        <Badge variant="success">{done.length} uploaded</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((a) => {
          const isDone = done.includes(a.id) || a.status === 'completed'
          return (
            <Card key={a.id} hover className={cn('h-full', isDone && 'opacity-90')}>
              <CardContent className="flex h-full flex-col gap-3 pt-5">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-[var(--text)]">{a.title}</p>
                  <Badge
                    variant={a.difficulty === 'easy' ? 'success' : a.difficulty === 'hard' ? 'danger' : 'warning'}
                    className="capitalize"
                  >
                    {a.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">{a.description}</p>
                {a.hasReferenceRecording ? (
                  <p className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--ai-soft)] px-3 py-2 text-xs font-medium text-[var(--ai)]">
                    <Mic size={12} /> Teacher ref: {a.teacherRecording ?? 'reference.wav'}
                  </p>
                ) : null}
                <div className="mt-auto flex flex-wrap gap-3 text-xs text-[var(--text-muted)]">
                  <span className="inline-flex items-center gap-1">
                    <Target size={12} /> {a.skill}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {a.practiceDuration} min
                  </span>
                  <span>Due {formatDate(a.dueDate)}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <p className="text-xs text-[var(--text-muted)]">From {a.teacherName}</p>
                  {isDone ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--success)]">
                      <CheckCircle2 size={14} /> Submitted
                    </span>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => {
                        setUploadFor(a)
                        setAnalysis(null)
                      }}
                    >
                      <Upload size={14} /> Upload yours
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Modal
        open={Boolean(uploadFor)}
        onClose={() => {
          setUploadFor(null)
          setAnalysis(null)
          setAnalyzing(false)
        }}
        title={uploadFor ? `Upload — ${uploadFor.title}` : 'Upload'}
        size="lg"
      >
        <div className="space-y-4">
          {uploadFor?.hasReferenceRecording ? (
            <p className="rounded-xl bg-[var(--ai-soft)] px-3 py-2 text-sm text-[var(--ai)]">
              Matching against teacher reference: {uploadFor.teacherRecording}
            </p>
          ) : null}
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-muted)]/40 px-4 py-8 text-center">
            <Upload size={28} className="mb-2 text-[var(--accent)]" />
            <p className="text-sm text-[var(--text-secondary)]">Demo file: my_chord_take.wav</p>
            <Button className="mt-4" loading={analyzing} onClick={runUpload}>
              <Sparkles size={16} /> Upload & analyze
            </Button>
            <p className="mt-2 text-[10px] text-[var(--text-muted)]">AI Practice Analysis — Demo</p>
          </div>

          {analysis ? (
            <div className="space-y-4 animate-slide-up">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-[var(--text)]">Your score vs teacher ref</p>
                <Badge variant="accent">Overall {analysis.overall}%</Badge>
              </div>
              <Progress label="Pitch" value={analysis.pitch} />
              <Progress label="Rhythm" value={analysis.rhythm} />
              <Progress label="Tempo" value={analysis.tempo} />
              <Progress label="Technique" value={analysis.technique} />
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--success)]">
                  Good points
                </p>
                <ul className="space-y-1.5">
                  {analysis.goodPoints.map((g) => (
                    <li
                      key={g}
                      className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-secondary)]"
                    >
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--warning)]">
                  Weak points
                </p>
                <ul className="space-y-1.5">
                  {analysis.weakPoints.map((w) => (
                    <li
                      key={w}
                      className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-secondary)]"
                    >
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="rounded-xl bg-[var(--ai-soft)] px-3 py-3 text-sm text-[var(--text)]">
                {analysis.feedback}
              </p>
            </div>
          ) : null}
        </div>
      </Modal>
    </PageContainer>
  )
}
