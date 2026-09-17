import { useMemo, useState } from 'react'
import { IndianRupee, Receipt, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { StatCard } from '@/components/ui/StatCard/StatCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import { Modal } from '@/components/ui/Modal/Modal'
import { Select } from '@/components/ui/Select/Select'
import { mockPayments } from '@/services/mock/mockPayments'
import { formatCurrency } from '@/utils/format'
import { useApp } from '@/context/AppContext'
import { useLocation } from 'react-router-dom'
import { useToast } from '@/hooks/useToast'
import type { Payment } from '@/types/payment'

type Tab = 'all' | 'outstanding' | 'receipts'

export default function Payments() {
  const { currentBranch } = useApp()
  const location = useLocation()
  const toast = useToast()
  const [receipt, setReceipt] = useState<Payment | null>(null)
  const [month, setMonth] = useState('September 2026')

  const tab: Tab = location.pathname.includes('outstanding')
    ? 'outstanding'
    : location.pathname.includes('receipts')
      ? 'receipts'
      : 'all'

  const rows = useMemo(() => {
    let list = mockPayments.filter((p) => p.month === month || month === 'All')
    if (tab === 'outstanding') list = list.filter((p) => p.status === 'pending' || p.status === 'overdue')
    if (tab === 'receipts') list = list.filter((p) => p.status === 'paid')
    return list
  }, [month, tab])

  const collected = mockPayments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0)
  const outstanding = mockPayments
    .filter((p) => p.status === 'pending' || p.status === 'overdue')
    .reduce((s, p) => s + p.amount, 0)
  const overdueCount = mockPayments.filter((p) => p.status === 'overdue').length

  const title =
    tab === 'outstanding' ? 'Outstanding fees' : tab === 'receipts' ? 'Receipts' : 'Fees & Payments'

  return (
    <PageContainer>
      <PageHeader
        title={title}
        description={`Collections overview · ${currentBranch.name}`}
        breadcrumbs={[{ label: 'Finance' }, { label: title }]}
      />

      <div className="mb-4 rounded-2xl border border-[var(--border)] bg-[var(--ai-soft)] px-4 py-3">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--ai)]">
          Smart Alerts — Demo
        </p>
        <p className="mt-1 text-sm text-[var(--text)]">
          {overdueCount} accounts overdue · {formatCurrency(outstanding)} outstanding this cycle.
          Ask Rhythm AI: “Is month kitne students ki fees pending hain?”
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Collected (Sep)" value={formatCurrency(collected)} icon={<IndianRupee size={18} />} />
        <StatCard title="Outstanding" value={formatCurrency(outstanding)} icon={<AlertTriangle size={18} />} />
        <StatCard title="Overdue students" value={overdueCount} icon={<AlertTriangle size={18} />} />
        <StatCard
          title="On-time rate"
          value="86%"
          description="Branch average"
          icon={<CheckCircle2 size={18} />}
        />
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2 text-sm">
          <Badge variant={tab === 'all' ? 'accent' : 'neutral'}>All payments</Badge>
          <Badge variant={tab === 'outstanding' ? 'warning' : 'neutral'}>Outstanding</Badge>
          <Badge variant={tab === 'receipts' ? 'success' : 'neutral'}>Receipts</Badge>
        </div>
        <Select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          options={[
            { label: 'September 2026', value: 'September 2026' },
            { label: 'October 2026', value: 'October 2026' },
            { label: 'August 2026', value: 'August 2026' },
            { label: 'All months', value: 'All' },
          ]}
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <div className="hidden grid-cols-12 gap-2 border-b border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] md:grid">
          <span className="col-span-3">Student</span>
          <span className="col-span-2">Period</span>
          <span className="col-span-2">Amount</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-3 text-right">Action</span>
        </div>
        {rows.map((p) => (
          <div
            key={p.id}
            className="grid gap-2 border-b border-[var(--border)] px-4 py-3 last:border-0 md:grid-cols-12 md:items-center"
          >
            <div className="md:col-span-3">
              <p className="font-medium text-[var(--text)]">{p.studentName}</p>
              <p className="text-xs text-[var(--text-muted)]">Due {p.dueDate}</p>
            </div>
            <p className="text-sm text-[var(--text-secondary)] md:col-span-2">{p.month}</p>
            <p className="text-sm font-semibold text-[var(--text)] md:col-span-2">{formatCurrency(p.amount)}</p>
            <div className="md:col-span-2">
              <Badge
                variant={p.status === 'paid' ? 'success' : p.status === 'overdue' ? 'danger' : 'warning'}
                className="capitalize"
              >
                {p.status}
              </Badge>
            </div>
            <div className="flex justify-start gap-2 md:col-span-3 md:justify-end">
              {p.status === 'paid' ? (
                <Button size="sm" variant="outline" onClick={() => setReceipt(p)}>
                  <Receipt size={14} /> Receipt
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast.success('Reminder sent', `SMS queued for ${p.studentName}'s parent`)}
                >
                  Send reminder
                </Button>
              )}
            </div>
          </div>
        ))}
        {rows.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-[var(--text-secondary)]">No records for this filter.</p>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fee plans</CardTitle>
            <CardDescription>Active tuition slabs at this branch</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'Guitar / Keyboard L1–L2', fee: 3500 },
              { name: 'Vocal / Piano Intermediate', fee: 4000 },
              { name: 'Drums / Advanced', fee: 4500 },
              { name: 'Beginner weekend pack', fee: 2800 },
            ].map((plan) => (
              <div
                key={plan.name}
                className="flex items-center justify-between rounded-xl border border-[var(--border)] px-4 py-3"
              >
                <span className="text-sm text-[var(--text)]">{plan.name}</span>
                <span className="font-semibold text-[var(--accent)]">{formatCurrency(plan.fee)}/mo</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Collection tips</CardTitle>
            <CardDescription>Rhythm AI suggestions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-[var(--text-secondary)]">
            <p className="rounded-xl bg-[var(--bg)] px-4 py-3">
              3 overdue accounts above ₹3,000 — send WhatsApp reminder before weekend classes.
            </p>
            <p className="rounded-xl bg-[var(--bg)] px-4 py-3">
              October invoices can go out on 25 Sep for early collection (~12% faster historically).
            </p>
            <p className="rounded-xl bg-[var(--bg)] px-4 py-3">
              Workshop add-on fees for concert prep are 62% collected — follow up Guitar L2 parents.
            </p>
          </CardContent>
        </Card>
      </div>

      <Modal open={Boolean(receipt)} onClose={() => setReceipt(null)} title="Fee receipt">
        {receipt ? (
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-[var(--text)]">Rhythmonic Academy — {currentBranch.name}</p>
            <p>Student: {receipt.studentName}</p>
            <p>Period: {receipt.month}</p>
            <p>Amount: {formatCurrency(receipt.amount)}</p>
            <p>Receipt ID: {receipt.receiptId ?? 'RCP-DEMO'}</p>
            <p>Paid on: {receipt.paidAt ?? '—'}</p>
            <Button
              className="mt-4 w-full"
              onClick={() => toast.success('Downloaded', 'Demo PDF receipt saved.')}
            >
              Download PDF
            </Button>
          </div>
        ) : null}
      </Modal>
    </PageContainer>
  )
}
