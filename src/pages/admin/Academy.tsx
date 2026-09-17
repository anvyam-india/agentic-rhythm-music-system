import { Building2, MapPin, Music2, DoorOpen } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Progress } from '@/components/ui/Progress/Progress'

const BRANCHES = [
  {
    name: 'South Bopal',
    tag: 'Flagship',
    address: 'Opp. Softwan Circle, South Bopal, Ahmedabad',
    students: 148,
    teachers: 11,
    rooms: 8,
    util: 86,
  },
  {
    name: 'Prahlad Nagar',
    tag: 'Satellite',
    address: 'Commerce Six Roads vicinity, Prahlad Nagar',
    students: 62,
    teachers: 5,
    rooms: 4,
    util: 74,
  },
  {
    name: 'Bopal Cross Roads',
    tag: 'Growing',
    address: 'Near Iscon Cross Roads corridor',
    students: 38,
    teachers: 2,
    rooms: 3,
    util: 61,
  },
]

const ROOMS = [
  { name: 'Room 01', use: 'Vocal', branch: 'South Bopal' },
  { name: 'Room 03', use: 'Guitar lab', branch: 'South Bopal' },
  { name: 'Studio A', use: 'Recording', branch: 'South Bopal' },
  { name: 'Room PN-2', use: 'Keyboard', branch: 'Prahlad Nagar' },
]

export default function AdminAcademy() {
  return (
    <PageContainer>
      <PageHeader
        title="Academy & branches"
        description="Campuses, rooms, and capacity across Rhythmonic locations."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {BRANCHES.map((b) => (
          <Card key={b.name}>
            <CardContent className="pt-5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text)]">{b.name}</p>
                    <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <MapPin size={11} /> {b.address}
                    </p>
                  </div>
                </div>
                <Badge variant="accent">{b.tag}</Badge>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-[var(--bg)] p-3 text-center">
                <div>
                  <p className="text-lg font-semibold">{b.students}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">Students</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{b.teachers}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">Teachers</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{b.rooms}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">Rooms</p>
                </div>
              </div>
              <div className="mt-4">
                <Progress label="Room utilisation" value={b.util} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-base font-semibold text-[var(--text)]">Rooms & studios</h2>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {ROOMS.map((r) => (
          <Card key={r.name}>
            <CardContent className="flex items-center gap-3 pt-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-muted)] text-[var(--accent)]">
                {r.use === 'Recording' ? <Music2 size={18} /> : <DoorOpen size={18} />}
              </div>
              <div>
                <p className="font-medium text-[var(--text)]">{r.name}</p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {r.use} · {r.branch}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  )
}
