import { Link, useNavigate } from 'react-router-dom'
import {
  TrendingUp,
  TrendingDown,
  Users,
  GraduationCap,
  Calendar,
  Wallet,
  ClipboardCheck,
  Music,
  ArrowRight,
  Sparkles,
  Camera,
  CheckCircle2,
  XCircle,
  BellRing,
} from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import { AreaChart } from '@/components/charts/Charts'
import {
  mockAIInsights,
  mockRevenueTrend,
  mockAttendanceTrend,
} from '@/services/mock/mockApi'
import { mockClasses } from '@/services/mock/mockClasses'
import { mockTeachers } from '@/services/mock/mockTeachers'
import { mockCameraIncidents } from '@/services/mock/mockCameras'
import { ACADEMY_BRANCHES } from '@/constants/roles'
import { useApp } from '@/context/AppContext'
import { formatTime } from '@/utils/date'

const KPI = [
  { label: "Today's Classes", value: '24', change: 4, icon: Calendar, color: '#0F766E' },
  { label: 'Active Students', value: '248', change: 4.2, icon: Users, color: '#14B8A6' },
  { label: 'Teachers Present', value: '16/18', change: 2, icon: GraduationCap, color: '#16A34A' },
  { label: 'Monthly Fees', value: '₹4.82L', change: 3.1, icon: Wallet, color: '#7C3AED' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { currentBranch, openAi } = useApp()
  const todayClasses = mockClasses.filter((c) => c.date === '2026-09-17')
  const presentTeachers = mockTeachers.slice(0, 5)
  const absentTeachers = mockTeachers.slice(5, 7)
  const cameraAlerts = mockCameraIncidents.slice(0, 3)

  return (
    <PageContainer className="animate-fade-in">
      {/* Live command strip — B&B style */}
      <div className="live-command-strip mb-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex items-center gap-3">
            <span className="live-pulse-badge">
              <span className="live-dot" /> LIVE
            </span>
            <div>
              <h3 className="text-base font-semibold text-white">Academy Command Center</h3>
              <p className="mt-0.5 text-xs text-white/60">
                Real-time snapshot · {currentBranch.name}
              </p>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-2xl">
            <div className="live-stat-box">
              <p className="live-stat-value text-teal-300">31</p>
              <p className="live-stat-label">In class now</p>
            </div>
            <div className="live-stat-box">
              <p className="live-stat-value text-green-400">16/18</p>
              <p className="live-stat-label">Teachers present</p>
            </div>
            <div className="live-stat-box">
              <p className="live-stat-value text-red-400">2</p>
              <p className="live-stat-label">Absent today</p>
            </div>
            <div className="live-stat-box">
              <p className="live-stat-value text-white">7</p>
              <p className="live-stat-label">Live cameras</p>
            </div>
          </div>
          <Button
            size="sm"
            className="shrink-0 !bg-[var(--accent-bright)]"
            onClick={() => navigate('/admin/cameras')}
          >
            Cameras <ArrowRight size={14} />
          </Button>
        </div>
      </div>

      {/* KPI row */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPI.map((card) => (
          <div key={card.label} className="bb-kpi">
            <div className="flex items-start justify-between">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  {card.label}
                </p>
                <p className="text-2xl font-bold text-[var(--text)]">{card.value}</p>
              </div>
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: `${card.color}15` }}
              >
                <card.icon size={20} style={{ color: card.color }} />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              {card.change >= 0 ? (
                <TrendingUp size={14} className="text-[var(--success)]" />
              ) : (
                <TrendingDown size={14} className="text-[var(--danger)]" />
              )}
              <span
                className={`text-sm font-medium ${card.change >= 0 ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}
              >
                {card.change >= 0 ? '+' : ''}
                {card.change}%
              </span>
              <span className="ml-1 text-xs text-[var(--text-muted)]">vs yesterday</span>
            </div>
          </div>
        ))}
      </div>

      {/* Present / Absent teachers */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="bb-card">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[var(--success)]" />
            <h3 className="text-base font-semibold text-[var(--text)]">
              Present faculty ({presentTeachers.length}/18)
            </h3>
          </div>
          <div className="max-h-56 space-y-1 overflow-y-auto">
            {presentTeachers.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-[var(--surface-muted)]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-50 text-xs font-semibold text-green-700">
                    {t.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[var(--text)]">{t.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{t.instruments.join(', ')}</p>
                  </div>
                </div>
                <span className="shrink-0 text-xs font-medium text-[var(--success)]">In</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bb-card">
          <div className="mb-4 flex items-center gap-2">
            <XCircle size={18} className="text-[var(--danger)]" />
            <h3 className="text-base font-semibold text-[var(--text)]">
              Absent / leave ({absentTeachers.length})
            </h3>
          </div>
          <div className="space-y-2">
            {absentTeachers.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between rounded-xl border border-red-50 bg-red-50/40 px-3 py-2.5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-semibold text-red-600">
                    {t.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[var(--text)]">{t.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">Leave applied</p>
                  </div>
                </div>
                <Badge variant="warning">On leave</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue + Branches */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="bb-card lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-[var(--text)]">Fee collections</h3>
            <span className="text-xs text-[var(--text-muted)]">Last 6 months</span>
          </div>
          <AreaChart data={mockRevenueTrend} height={260} />
        </div>
        <div className="bb-card">
          <h3 className="mb-4 text-base font-semibold text-[var(--text)]">Branch performance</h3>
          <div className="space-y-3">
            {ACADEMY_BRANCHES.map((b, i) => (
              <div
                key={b.id}
                className="flex items-center justify-between border-b border-[var(--border)] py-2 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-[var(--text)]">{b.name}</p>
                  <p className="text-lg font-bold text-[var(--text)]">{b.students} students</p>
                </div>
                <span
                  className={`flex items-center gap-1 text-sm font-medium ${i === 0 ? 'text-[var(--success)]' : 'text-[var(--text-secondary)]'}`}
                >
                  {i === 0 ? '↑' : '→'}
                  {i === 0 ? '14%' : i === 1 ? '8%' : '3%'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI + Cameras + Today classes */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="ai-card">
          <div className="relative z-10 mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)]">
              <Sparkles size={20} className="text-[var(--accent)]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[var(--text)]">Smart Academy Insights</h3>
              <p className="text-xs text-[var(--text-muted)]">Smart Insights — Demo</p>
            </div>
          </div>
          <div className="relative z-10 max-h-48 space-y-2 overflow-y-auto">
            {mockAIInsights.slice(0, 3).map((insight) => (
              <div key={insight.id} className="rounded-lg bg-white/70 p-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                <span className="font-medium text-[var(--text)]">{insight.title}</span>
                <span className="mt-0.5 block text-xs">{insight.description}</span>
              </div>
            ))}
          </div>
          <Button
            size="sm"
            className="relative z-10 mt-3 w-full"
            onClick={openAi}
          >
            Ask Rhythm AI
          </Button>
        </div>

        <div className="bb-card">
          <div className="mb-4 flex items-center gap-2">
            <Camera size={18} className="text-[var(--danger)]" />
            <h3 className="text-base font-semibold text-[var(--text)]">Camera alerts</h3>
          </div>
          <div className="space-y-2">
            {cameraAlerts.map((a) => (
              <div key={a.id} className="rounded-xl border border-[var(--border)] px-3 py-2.5">
                <p className="truncate text-sm font-medium text-[var(--text)]">{a.camera}</p>
                <p className="text-xs text-[var(--text-muted)]">
                  {a.type} · {a.time}
                </p>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-3 w-full text-sm font-medium text-[var(--accent)] hover:underline"
            onClick={() => navigate('/admin/cameras')}
          >
            View all cameras →
          </button>
        </div>

        <div className="bb-card">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music size={18} className="text-[var(--accent)]" />
              <h3 className="text-base font-semibold text-[var(--text)]">Today&apos;s classes</h3>
            </div>
            <Link to="/admin/schedule" className="text-xs font-medium text-[var(--accent)]">
              Schedule
            </Link>
          </div>
          <div className="space-y-2">
            {todayClasses.slice(0, 4).map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between rounded-xl bg-[var(--surface-muted)] px-3 py-2.5"
              >
                <div>
                  <p className="text-sm font-medium text-[var(--text)]">{c.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {formatTime(c.startTime)} · Room {c.room}
                  </p>
                </div>
                <Badge variant="accent" className="capitalize">
                  {c.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance trend + quick actions */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="bb-card lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <ClipboardCheck size={18} className="text-[var(--accent)]" />
            <h3 className="text-base font-semibold text-[var(--text)]">Attendance trend</h3>
          </div>
          <AreaChart data={mockAttendanceTrend} height={220} />
        </div>
        <div className="bb-card">
          <h3 className="mb-4 text-base font-semibold text-[var(--text)]">Quick actions</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate('/admin/students/admissions')}
            >
              <Users size={16} /> New admission
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate('/admin/events')}
            >
              <BellRing size={16} /> Concert alert
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={openAi}
            >
              <Sparkles size={16} /> Open Rhythm AI
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate('/admin/payments')}
            >
              <Wallet size={16} /> Fees & payments
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
