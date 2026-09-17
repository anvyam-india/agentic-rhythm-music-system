import { useMemo, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Camera,
  AlertTriangle,
  Eye,
  Play,
  MessageCircle,
  Users,
  Shield,
} from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { StatCard } from '@/components/ui/StatCard/StatCard'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import { Modal } from '@/components/ui/Modal/Modal'
import { useApp } from '@/context/AppContext'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/utils/format'
import {
  mockCameras,
  mockCameraDetections,
  mockCameraIncidents,
  mockCameraZones,
} from '@/services/mock/mockCameras'

type Tab = 'cameras' | 'detections' | 'incidents' | 'zones'

export default function Cameras() {
  const { currentBranch, currentBranchId } = useApp()
  const location = useLocation()
  const toast = useToast()
  const initialTab: Tab = location.pathname.includes('incidents')
    ? 'incidents'
    : location.pathname.includes('detections')
      ? 'detections'
      : 'cameras'
  const [tab, setTab] = useState<Tab>(initialTab)
  const [videoOpen, setVideoOpen] = useState(false)
  const [selectedCam, setSelectedCam] = useState('')

  useEffect(() => {
    if (location.pathname.includes('incidents')) setTab('incidents')
    else if (location.pathname.includes('detections')) setTab('detections')
    else setTab('cameras')
  }, [location.pathname])

  const cameras = useMemo(
    () => mockCameras.filter((c) => c.branchId === currentBranchId || c.branch === 'All Branches'),
    [currentBranchId],
  )
  const detections = useMemo(
    () =>
      mockCameraDetections.filter(
        (d) => d.branch === currentBranch.name || d.branch === 'All Branches',
      ),
    [currentBranch.name],
  )
  const incidents = useMemo(
    () =>
      mockCameraIncidents.filter(
        (i) => i.branch === currentBranch.name || i.branch === 'All Branches',
      ),
    [currentBranch.name],
  )

  const online = cameras.filter((c) => c.status === 'Online').length

  const openVideo = (name: string) => {
    setSelectedCam(name)
    setVideoOpen(true)
  }

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'cameras', label: 'Live Cameras', count: cameras.length },
    { id: 'detections', label: 'AI Detection', count: detections.length },
    { id: 'incidents', label: 'Incidents', count: incidents.length },
    { id: 'zones', label: 'Restricted Zones' },
  ]

  return (
    <PageContainer>
      <PageHeader
        title="Camera Management"
        description={`CCTV monitoring, AI detection & zone alerts · ${currentBranch.name}`}
        breadcrumbs={[{ label: 'Studio' }, { label: 'Cameras' }]}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Cameras online" value={`${online}/${cameras.length || mockCameras.length}`} icon={<Camera size={18} />} />
        <StatCard
          title="People detected"
          value={detections.filter((d) => d.status === 'Active').length}
          icon={<Users size={18} />}
        />
        <StatCard
          title="Active incidents"
          value={incidents.filter((i) => i.status === 'Investigating').length}
          icon={<AlertTriangle size={18} />}
        />
        <StatCard title="Zones armed" value={mockCameraZones.length} icon={<Shield size={18} />} />
      </div>

      <Card className="mb-6 overflow-hidden border-0 bg-gradient-to-r from-[var(--text)] to-[#1e293b] text-white">
        <CardContent className="pt-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/60">AI pipeline</p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {['Camera Feed', '→', 'AI Detection', '→', 'Person Event', '→', 'Video Clip', '→', 'Dashboard'].map(
              (step, i) => (
                <span
                  key={`${step}-${i}`}
                  className={
                    step === '→'
                      ? 'text-white/40'
                      : 'rounded-lg bg-white/10 px-3 py-1.5 font-medium'
                  }
                >
                  {step}
                </span>
              ),
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mb-5 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              'rounded-xl px-3 py-1.5 text-sm font-medium transition',
              tab === t.id
                ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                : 'bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text)]',
            )}
          >
            {t.label}
            {t.count !== undefined ? ` · ${t.count}` : ''}
          </button>
        ))}
      </div>

      {tab === 'cameras' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(cameras.length ? cameras : mockCameras.filter((c) => c.branchId === 'br-south-bopal')).map(
            (cam) => (
              <button
                key={cam.id}
                type="button"
                onClick={() => openVideo(cam.name)}
                className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-left shadow-sm transition hover:shadow-[var(--shadow)]"
              >
                <div className="relative flex h-36 items-center justify-center bg-[#0f172a]">
                  <Camera size={32} className="text-white/25" />
                  <div className="absolute left-2 top-2 flex items-center gap-1.5 rounded bg-black/50 px-2 py-1">
                    <span
                      className={cn(
                        'h-2 w-2 rounded-full',
                        cam.status === 'Online' ? 'animate-pulse bg-[var(--success)]' : 'bg-[var(--warning)]',
                      )}
                    />
                    <span className="text-xs font-medium text-white">
                      {cam.status === 'Online' ? 'LIVE' : cam.status}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
                    <Play size={32} className="text-white" />
                  </div>
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-semibold text-[var(--text)]">{cam.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {cam.location} · {cam.lastEvent}
                  </p>
                </div>
              </button>
            ),
          )}
        </div>
      ) : null}

      {tab === 'detections' ? (
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="hidden grid-cols-12 gap-2 border-b border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] md:grid">
            <span className="col-span-3">Person</span>
            <span className="col-span-3">Camera</span>
            <span className="col-span-2">Time</span>
            <span className="col-span-2">Confidence</span>
            <span className="col-span-2">Status</span>
          </div>
          {detections.map((d) => (
            <div
              key={d.id}
              className="grid gap-2 border-b border-[var(--border)] px-4 py-3 last:border-0 md:grid-cols-12 md:items-center"
            >
              <div className="md:col-span-3">
                <p className="font-medium text-[var(--text)]">{d.person}</p>
                <p className="text-xs capitalize text-[var(--text-muted)]">{d.role}</p>
              </div>
              <p className="text-sm text-[var(--text-secondary)] md:col-span-3">
                {d.camera}
                <span className="block text-xs text-[var(--text-muted)]">{d.location}</span>
              </p>
              <p className="text-sm text-[var(--text-secondary)] md:col-span-2">{d.time}</p>
              <p className="text-sm font-semibold text-[var(--accent)] md:col-span-2">{d.confidence}%</p>
              <div className="md:col-span-2">
                <Badge
                  variant={
                    d.status === 'Alert'
                      ? 'danger'
                      : d.status === 'Active'
                        ? 'success'
                        : d.status === 'Verified'
                          ? 'accent'
                          : 'neutral'
                  }
                >
                  {d.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {tab === 'incidents' ? (
        <div className="space-y-3">
          {incidents.map((inc) => (
            <Card
              key={inc.id}
              className={cn(inc.status === 'Investigating' && 'border-l-4 border-l-[var(--danger)]')}
            >
              <CardContent className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <AlertTriangle size={16} className="text-[var(--warning)]" />
                    <h3 className="text-sm font-semibold text-[var(--text)]">{inc.type}</h3>
                    <Badge
                      variant={
                        inc.status === 'Resolved'
                          ? 'success'
                          : inc.status === 'Investigating'
                            ? 'danger'
                            : 'warning'
                      }
                    >
                      {inc.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{inc.description}</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    {inc.camera} · {inc.time} · {inc.action}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button size="sm" variant="outline" onClick={() => openVideo(inc.camera)}>
                    <Play size={14} /> Clip
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => toast.success('Alert sent', 'WhatsApp notified security team')}
                  >
                    <MessageCircle size={14} /> Alert
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      {tab === 'zones' ? (
        <div className="grid gap-4 md:grid-cols-2">
          {mockCameraZones.map((zone) => (
            <Card key={zone.zone}>
              <CardContent className="pt-5">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-[var(--text)]">{zone.zone}</h3>
                  <Badge variant={zone.status === 'Armed' ? 'warning' : 'success'}>{zone.status}</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Branch</span>
                    <span className="text-[var(--text)]">{zone.branch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Access</span>
                    <span className="text-[var(--text)]">{zone.access}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Alerts today</span>
                    <span
                      className={cn(
                        'font-medium',
                        zone.alerts > 0 ? 'text-[var(--danger)]' : 'text-[var(--success)]',
                      )}
                    >
                      {zone.alerts}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      <Modal open={videoOpen} onClose={() => setVideoOpen(false)} title={selectedCam} size="lg">
        <div className="space-y-4">
          <div className="relative flex h-64 items-center justify-center rounded-xl bg-[#0f172a]">
            <Camera size={48} className="text-white/20" />
            <button
              type="button"
              className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur hover:bg-white/30"
              onClick={() => toast.success('Demo playback', 'Video clip placeholder')}
            >
              <Play size={28} className="ml-1 text-white" />
            </button>
            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded bg-black/50 px-2 py-1">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--danger)]" />
              <span className="text-xs text-white">REC</span>
            </div>
          </div>
          <p className="text-center text-sm text-[var(--text-muted)]">
            17 Sep 2026 · Demo recording · AI detection overlay
          </p>
          <div className="flex gap-2">
            <Button className="flex-1" onClick={() => toast.success('Playing', 'Demo mode clip')}>
              <Play size={14} /> Play clip
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => toast.success('Saved', 'Clip bookmarked for review')}
            >
              <Eye size={14} /> Save for review
            </Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  )
}
