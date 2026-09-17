import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Clock, Plus, Target, Upload, Mic } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Button } from '@/components/ui/Button/Button'
import { Modal } from '@/components/ui/Modal/Modal'
import { Input } from '@/components/ui/Input/Input'
import { Select } from '@/components/ui/Select/Select'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { assignmentApi } from '@/services/api/assignmentApi'
import type { Assignment, AssignmentFormData, AssignmentDifficulty } from '@/types/assignment'
import { useToast } from '@/hooks/useToast'
import { formatDate } from '@/utils/date'
import { cn } from '@/utils/format'

const TEACHER_ID = 'teacher-001'
const TEACHER_NAME = 'Jayesh Patel'

const emptyForm: AssignmentFormData = {
  title: '',
  instrument: 'Guitar',
  skill: 'Chord transitions',
  description: '',
  practiceDuration: 30,
  dueDate: '2026-09-22',
  difficulty: 'medium',
  teacherRecording: '',
  hasReferenceRecording: false,
}

const difficultyVariant: Record<AssignmentDifficulty, 'success' | 'warning' | 'danger'> = {
  easy: 'success',
  medium: 'warning',
  hard: 'danger',
}

export default function TeacherAssignments() {
  const toast = useToast()
  const location = useLocation()
  const [items, setItems] = useState<Assignment[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<AssignmentFormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [filter, setFilter] = useState<'all' | Assignment['status']>('all')

  const load = () => {
    void assignmentApi.getByTeacher(TEACHER_ID).then(setItems)
  }

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    if (location.pathname.includes('/create')) setOpen(true)
  }, [location.pathname])

  const create = async () => {
    if (!form.title.trim()) return
    setSaving(true)
    try {
      await assignmentApi.create(form, TEACHER_ID, TEACHER_NAME)
      toast.success('Assignment created', 'Shared with Guitar L2 demo roster.')
      setOpen(false)
      setForm(emptyForm)
      load()
    } finally {
      setSaving(false)
    }
  }

  const visible = filter === 'all' ? items : items.filter((a) => a.status === filter)

  return (
    <PageContainer>
      <PageHeader
        title="Assignments"
        description="Homework tied to skills — Guitar L2 roster included by default."
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus size={16} /> Create assignment
          </Button>
        }
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {(['all', 'active', 'completed', 'overdue'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={cn(
              'rounded-xl px-3 py-1.5 text-sm font-medium capitalize transition',
              filter === s
                ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                : 'bg-[var(--surface-muted)] text-[var(--text-secondary)]',
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {visible.map((a) => (
          <Card key={a.id} hover className="h-full">
            <CardContent className="flex h-full flex-col gap-3 pt-5">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-[var(--text)]">{a.title}</p>
                <Badge variant={difficultyVariant[a.difficulty]} className="capitalize">
                  {a.difficulty}
                </Badge>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{a.description}</p>
              <div className="mt-auto flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
                <span className="inline-flex items-center gap-1">
                  <Target size={12} /> {a.skill}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} /> {a.practiceDuration} min
                </span>
                <span>Due {formatDate(a.dueDate)}</span>
                <Badge variant="neutral" className="capitalize">
                  {a.status}
                </Badge>
              </div>
              <p className="text-xs text-[var(--text-muted)]">{a.studentIds.length} students assigned</p>
              {a.hasReferenceRecording ? (
                <p className="inline-flex items-center gap-1 text-xs font-medium text-[var(--ai)]">
                  <Mic size={12} /> Teacher reference: {a.teacherRecording ?? 'recording.wav'}
                </p>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Create assignment" size="lg">
        <div className="grid gap-3">
          <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              label="Skill focus"
              value={form.skill}
              onChange={(e) => setForm({ ...form, skill: e.target.value })}
            />
            <Input
              label="Practice minutes"
              type="number"
              value={String(form.practiceDuration)}
              onChange={(e) => setForm({ ...form, practiceDuration: Number(e.target.value) })}
            />
            <Input
              label="Due date"
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
            <Select
              label="Difficulty"
              value={form.difficulty}
              onChange={(e) => setForm({ ...form, difficulty: e.target.value as AssignmentDifficulty })}
              options={[
                { label: 'Easy', value: 'easy' },
                { label: 'Medium', value: 'medium' },
                { label: 'Hard', value: 'hard' },
              ]}
            />
          </div>

          <div className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-muted)]/50 p-4">
            <p className="text-sm font-semibold text-[var(--text)]">Teacher reference recording</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Upload a demo take — students match pitch/rhythm against this for AI analysis.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() =>
                setForm({
                  ...form,
                  teacherRecording: `${form.skill.replace(/\s+/g, '_').toLowerCase() || 'practice'}_ref.wav`,
                  hasReferenceRecording: true,
                })
              }
            >
              <Upload size={14} /> Upload reference (demo)
            </Button>
            {form.hasReferenceRecording ? (
              <p className="mt-2 text-xs font-medium text-[var(--ai)]">
                Attached: {form.teacherRecording}
              </p>
            ) : null}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button loading={saving} onClick={() => void create()}>
              Publish
            </Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  )
}
