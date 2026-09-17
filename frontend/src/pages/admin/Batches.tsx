import { Link } from 'react-router-dom'
import { Clock, MapPin, Users, Music2 } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { StatCard } from '@/components/ui/StatCard/StatCard'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Progress } from '@/components/ui/Progress/Progress'
import { Button } from '@/components/ui/Button/Button'
import { useApp } from '@/context/AppContext'

const BATCHES = [
  {
    id: 'b1',
    title: 'Guitar L2 — Evening',
    teacher: 'Jayesh Patel',
    room: '03',
    students: 18,
    capacity: 20,
    schedule: 'Mon · Wed · Fri · 6:00–7:00 PM',
    attendance: 92,
    progress: 78,
    instrument: 'Guitar',
    status: 'active' as const,
  },
  {
    id: 'b2',
    title: 'Keyboard Beginner',
    teacher: 'Riya Mehta',
    room: '02',
    students: 14,
    capacity: 16,
    schedule: 'Tue · Thu · 7:00–8:00 PM',
    attendance: 88,
    progress: 65,
    instrument: 'Keyboard',
    status: 'active' as const,
  },
  {
    id: 'b3',
    title: 'Vocal Intermediate',
    teacher: 'Amit Shah',
    room: '01',
    students: 16,
    capacity: 18,
    schedule: 'Mon · Thu · 8:00–9:00 PM',
    attendance: 94,
    progress: 81,
    instrument: 'Vocal',
    status: 'active' as const,
  },
  {
    id: 'b4',
    title: 'Drums L1',
    teacher: 'Neha Desai',
    room: '04',
    students: 11,
    capacity: 12,
    schedule: 'Wed · Sat · 5:00–6:00 PM',
    attendance: 90,
    progress: 72,
    instrument: 'Drums',
    status: 'active' as const,
  },
  {
    id: 'b5',
    title: 'Piano Advanced',
    teacher: 'Priya Nair',
    room: '05',
    students: 8,
    capacity: 10,
    schedule: 'Tue · Fri · 4:00–5:00 PM',
    attendance: 96,
    progress: 88,
    instrument: 'Piano',
    status: 'active' as const,
  },
  {
    id: 'b6',
    title: 'Tabla Foundations',
    teacher: 'Rohan Bhatt',
    room: '06',
    students: 9,
    capacity: 12,
    schedule: 'Sat · Sun · 10:00–11:00 AM',
    attendance: 85,
    progress: 60,
    instrument: 'Tabla',
    status: 'forming' as const,
  },
]

export default function Batches() {
  const { currentBranch } = useApp()
  const totalStudents = BATCHES.reduce((s, b) => s + b.students, 0)

  return (
    <PageContainer>
      <PageHeader
        title="Batches"
        description={`Live cohorts · rooms · faculty · ${currentBranch.name}`}
        breadcrumbs={[{ label: 'Academics' }, { label: 'Batches' }]}
        actions={
          <Link to="/admin/schedule">
            <Button variant="outline">View schedule</Button>
          </Link>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Active batches" value={BATCHES.filter((b) => b.status === 'active').length} icon={<Music2 size={18} />} />
        <StatCard title="Students enrolled" value={totalStudents} icon={<Users size={18} />} />
        <StatCard title="Avg attendance" value="91%" icon={<Clock size={18} />} />
        <StatCard title="Rooms in use" value={6} icon={<MapPin size={18} />} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {BATCHES.map((batch) => (
          <Card key={batch.id} hover className="h-full overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-[var(--accent)] to-[var(--ai)]" />
            <CardContent className="space-y-4 pt-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-[var(--text)]">{batch.title}</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{batch.teacher}</p>
                </div>
                <Badge variant={batch.status === 'active' ? 'success' : 'warning'} className="capitalize">
                  {batch.status}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--text-muted)]">
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} /> Room {batch.room}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users size={12} /> {batch.students}/{batch.capacity}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Music2 size={12} /> {batch.instrument}
                </span>
              </div>

              <p className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                <Clock size={14} className="text-[var(--accent)]" />
                {batch.schedule}
              </p>

              <Progress label={`Attendance ${batch.attendance}%`} value={batch.attendance} />
              <Progress label={`Curriculum ${batch.progress}%`} value={batch.progress} />
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  )
}
