import { useState } from 'react'
import { CheckCircle2, ClipboardList, UserPlus } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { StatCard } from '@/components/ui/StatCard/StatCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { Select } from '@/components/ui/Select/Select'
import { Modal } from '@/components/ui/Modal/Modal'
import { useToast } from '@/hooks/useToast'
import { useApp } from '@/context/AppContext'
import { cn } from '@/utils/format'

type LeadStatus = 'new' | 'trial' | 'registered' | 'waitlist'

interface AdmissionLead {
  id: string
  studentName: string
  parentName: string
  phone: string
  instrument: string
  preferredSlot: string
  status: LeadStatus
  source: string
  date: string
}

const INITIAL: AdmissionLead[] = [
  {
    id: 'adm-1',
    studentName: 'Vihaan Kapoor',
    parentName: 'Mrs. Anjali Kapoor',
    phone: '+91 98250 11001',
    instrument: 'Guitar',
    preferredSlot: 'Evening',
    status: 'trial',
    source: 'Walk-in',
    date: '2026-09-15',
  },
  {
    id: 'adm-2',
    studentName: 'Aanya Mehta',
    parentName: 'Mr. Kunal Mehta',
    phone: '+91 98250 11002',
    instrument: 'Keyboard',
    preferredSlot: 'Weekend',
    status: 'new',
    source: 'Instagram',
    date: '2026-09-16',
  },
  {
    id: 'adm-3',
    studentName: 'Reyansh Joshi',
    parentName: 'Mrs. Nidhi Joshi',
    phone: '+91 98250 11003',
    instrument: 'Vocal',
    preferredSlot: 'Morning',
    status: 'registered',
    source: 'Referral',
    date: '2026-09-12',
  },
  {
    id: 'adm-4',
    studentName: 'Mia Shah',
    parentName: 'Mr. Parth Shah',
    phone: '+91 98250 11004',
    instrument: 'Piano',
    preferredSlot: 'Evening',
    status: 'waitlist',
    source: 'Website',
    date: '2026-09-14',
  },
  {
    id: 'adm-5',
    studentName: 'Arjun Desai',
    parentName: 'Mrs. Kavya Desai',
    phone: '+91 98250 11005',
    instrument: 'Drums',
    preferredSlot: 'Evening',
    status: 'trial',
    source: 'Open house',
    date: '2026-09-17',
  },
]

const statusVariant: Record<LeadStatus, 'accent' | 'warning' | 'success' | 'neutral'> = {
  new: 'accent',
  trial: 'warning',
  registered: 'success',
  waitlist: 'neutral',
}

export default function Admissions() {
  const toast = useToast()
  const { currentBranch } = useApp()
  const [leads, setLeads] = useState(INITIAL)
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | LeadStatus>('all')
  const [form, setForm] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    instrument: 'Guitar',
    preferredSlot: 'Evening',
  })

  const filtered = filter === 'all' ? leads : leads.filter((l) => l.status === filter)

  const register = () => {
    if (!form.studentName.trim() || !form.parentName.trim()) {
      toast.error('Missing details', 'Student and parent name are required.')
      return
    }
    const lead: AdmissionLead = {
      id: `adm-${Date.now()}`,
      ...form,
      status: 'registered',
      source: 'Front desk',
      date: '2026-09-17',
    }
    setLeads((prev) => [lead, ...prev])
    setOpen(false)
    setForm({ studentName: '', parentName: '', phone: '', instrument: 'Guitar', preferredSlot: 'Evening' })
    toast.success('Student registered', `${lead.studentName} added for ${currentBranch.name}`)
  }

  const advance = (id: string, status: LeadStatus) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
    toast.success('Status updated', `Moved to ${status}`)
  }

  return (
    <PageContainer>
      <PageHeader
        title="Admissions"
        description={`New inquiries & student registration · ${currentBranch.name}`}
        breadcrumbs={[{ label: 'Students' }, { label: 'Admissions' }]}
        actions={
          <Button onClick={() => setOpen(true)}>
            <UserPlus size={16} /> Register student
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="New inquiries" value={leads.filter((l) => l.status === 'new').length} icon={<ClipboardList size={18} />} />
        <StatCard title="Trial booked" value={leads.filter((l) => l.status === 'trial').length} icon={<ClipboardList size={18} />} />
        <StatCard title="Registered" value={leads.filter((l) => l.status === 'registered').length} icon={<CheckCircle2 size={18} />} />
        <StatCard title="Waitlist" value={leads.filter((l) => l.status === 'waitlist').length} icon={<UserPlus size={18} />} />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {(['all', 'new', 'trial', 'registered', 'waitlist'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={cn(
              'rounded-xl px-3 py-1.5 text-sm font-medium capitalize transition',
              filter === s
                ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                : 'bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text)]',
            )}
          >
            {s === 'all' ? 'All leads' : s}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <div className="hidden grid-cols-12 gap-2 border-b border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] md:grid">
          <span className="col-span-3">Student</span>
          <span className="col-span-2">Instrument</span>
          <span className="col-span-2">Slot</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-3 text-right">Actions</span>
        </div>
        {filtered.map((lead) => (
          <div
            key={lead.id}
            className="grid gap-3 border-b border-[var(--border)] px-4 py-4 last:border-0 md:grid-cols-12 md:items-center md:gap-2"
          >
            <div className="md:col-span-3">
              <p className="font-semibold text-[var(--text)]">{lead.studentName}</p>
              <p className="text-xs text-[var(--text-secondary)]">
                {lead.parentName} · {lead.phone}
              </p>
              <p className="mt-1 text-[11px] text-[var(--text-muted)]">
                {lead.source} · {lead.date}
              </p>
            </div>
            <p className="text-sm text-[var(--text-secondary)] md:col-span-2">{lead.instrument}</p>
            <p className="text-sm text-[var(--text-secondary)] md:col-span-2">{lead.preferredSlot}</p>
            <div className="md:col-span-2">
              <Badge variant={statusVariant[lead.status]} className="capitalize">
                {lead.status}
              </Badge>
            </div>
            <div className="flex flex-wrap justify-start gap-2 md:col-span-3 md:justify-end">
              {lead.status === 'new' ? (
                <Button size="sm" variant="outline" onClick={() => advance(lead.id, 'trial')}>
                  Book trial
                </Button>
              ) : null}
              {lead.status === 'trial' || lead.status === 'waitlist' ? (
                <Button size="sm" onClick={() => advance(lead.id, 'registered')}>
                  Confirm join
                </Button>
              ) : null}
              {lead.status === 'registered' ? (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--success)]">
                  <CheckCircle2 size={14} /> Enrolled
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Admission funnel</CardTitle>
          <CardDescription>Demo pipeline for {currentBranch.area}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-4">
          {[
            { label: 'Inquiry', value: '100%' },
            { label: 'Trial', value: '68%' },
            { label: 'Enrolled', value: '41%' },
            { label: 'Avg close', value: '6 days' },
          ].map((step) => (
            <div key={step.label} className="rounded-xl bg-[var(--bg)] px-4 py-3">
              <p className="text-xs text-[var(--text-muted)]">{step.label}</p>
              <p className="mt-1 text-lg font-semibold text-[var(--text)]">{step.value}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Register new student" size="lg">
        <div className="grid gap-3">
          <Input
            label="Student name"
            value={form.studentName}
            onChange={(e) => setForm({ ...form, studentName: e.target.value })}
            placeholder="e.g. Aarav Patel"
          />
          <Input
            label="Parent / guardian"
            value={form.parentName}
            onChange={(e) => setForm({ ...form, parentName: e.target.value })}
          />
          <Input
            label="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+91 …"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Select
              label="Instrument"
              value={form.instrument}
              onChange={(e) => setForm({ ...form, instrument: e.target.value })}
              options={['Guitar', 'Keyboard', 'Vocal', 'Drums', 'Piano', 'Tabla'].map((i) => ({
                label: i,
                value: i,
              }))}
            />
            <Select
              label="Preferred slot"
              value={form.preferredSlot}
              onChange={(e) => setForm({ ...form, preferredSlot: e.target.value })}
              options={['Morning', 'Evening', 'Weekend'].map((i) => ({ label: i, value: i }))}
            />
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Branch: <span className="font-medium text-[var(--text)]">{currentBranch.name}</span>
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={register}>Save & register</Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  )
}
