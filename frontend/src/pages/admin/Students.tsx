import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Input } from '@/components/ui/Input/Input'
import { Select } from '@/components/ui/Select/Select'
import { Badge } from '@/components/ui/Badge/Badge'
import { SkeletonTable } from '@/components/ui/Skeleton/Skeleton'
import { useStudents } from '@/hooks/useStudents'
import { mockTeachers } from '@/services/mock/mockTeachers'
import type { StudentStatus } from '@/types/student'

const PAGE_SIZE = 8

export default function AdminStudents() {
  const { students, loading } = useStudents()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [instrument, setInstrument] = useState('all')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState('name')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let list = [...students]
    if (query) {
      const q = query.toLowerCase()
      list = list.filter((s) => s.name.toLowerCase().includes(q) || s.instrument.toLowerCase().includes(q))
    }
    if (instrument !== 'all') list = list.filter((s) => s.instrument === instrument)
    if (status !== 'all') list = list.filter((s) => s.status === status)
    list.sort((a, b) => {
      if (sort === 'attendance') return b.attendancePercentage - a.attendancePercentage
      if (sort === 'progress') return b.progressPercentage - a.progressPercentage
      return a.name.localeCompare(b.name)
    })
    return list
  }, [students, query, instrument, status, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const statusVariant = (s: StudentStatus) =>
    s === 'active' ? 'success' : s === 'on_hold' ? 'warning' : 'neutral'

  return (
    <PageContainer>
      <PageHeader
        title="Students"
        description="All enrolled students — progress, attendance & practice."
        breadcrumbs={[{ label: 'Students' }, { label: 'All Students' }]}
      />

      <div className="mb-4 grid gap-3 md:grid-cols-4">
        <Input
          icon={<Search size={16} />}
          placeholder="Search students…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setPage(1)
          }}
        />
        <Select
          options={[
            { label: 'All instruments', value: 'all' },
            ...Array.from(new Set(students.map((s) => s.instrument))).map((i) => ({ label: i, value: i })),
          ]}
          value={instrument}
          onChange={(e) => {
            setInstrument(e.target.value)
            setPage(1)
          }}
        />
        <Select
          options={[
            { label: 'All statuses', value: 'all' },
            { label: 'Active', value: 'active' },
            { label: 'On Hold', value: 'on_hold' },
            { label: 'Inactive', value: 'inactive' },
          ]}
          value={status}
          onChange={(e) => {
            setStatus(e.target.value)
            setPage(1)
          }}
        />
        <Select
          options={[
            { label: 'Sort by name', value: 'name' },
            { label: 'Sort by attendance', value: 'attendance' },
            { label: 'Sort by progress', value: 'progress' },
          ]}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        />
      </div>

      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-[1.125rem] border border-[var(--border)] bg-[var(--surface)] md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text-muted)]">
                <tr>
                  <th className="px-4 py-3 font-medium">Student</th>
                  <th className="px-4 py-3 font-medium">Instrument</th>
                  <th className="px-4 py-3 font-medium">Level</th>
                  <th className="px-4 py-3 font-medium">Batch</th>
                  <th className="px-4 py-3 font-medium">Teacher</th>
                  <th className="px-4 py-3 font-medium">Attendance</th>
                  <th className="px-4 py-3 font-medium">Practice</th>
                  <th className="px-4 py-3 font-medium">Progress</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((student) => {
                  const teacher = mockTeachers.find((t) => t.id === student.teacherId)
                  const needsAttention =
                    student.attendancePercentage < 85 || student.progressPercentage < 72
                  return (
                    <tr
                      key={student.id}
                      className="cursor-pointer border-b border-[var(--border)] transition hover:bg-[var(--surface-muted)]"
                      onClick={() => navigate(`/admin/students/${student.id}`)}
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-[var(--text)]">{student.name}</p>
                        {needsAttention ? (
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--warning)]">
                            Needs attention
                          </p>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 text-[var(--text-secondary)]">{student.instrument}</td>
                      <td className="px-4 py-3 text-[var(--text-secondary)]">{student.level}</td>
                      <td className="px-4 py-3 text-[var(--text-secondary)]">{student.batch}</td>
                      <td className="px-4 py-3 text-[var(--text-secondary)]">{teacher?.name ?? '—'}</td>
                      <td className="px-4 py-3">{student.attendancePercentage}%</td>
                      <td className="px-4 py-3">{student.practiceMinutes}m</td>
                      <td className="px-4 py-3">{student.progressPercentage}%</td>
                      <td className="px-4 py-3">
                        <Badge variant={statusVariant(student.status)}>{student.status.replace('_', ' ')}</Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {pageItems.map((student) => (
              <button
                key={student.id}
                type="button"
                className="w-full rounded-[1.125rem] border border-[var(--border)] bg-[var(--surface)] p-4 text-left"
                onClick={() => navigate(`/admin/students/${student.id}`)}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-[var(--text)]">{student.name}</p>
                  <Badge variant={statusVariant(student.status)}>{student.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {student.instrument} · {student.level}
                </p>
                <p className="mt-2 text-xs text-[var(--text-muted)]">
                  Attendance {student.attendancePercentage}% · Progress {student.progressPercentage}%
                </p>
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <p className="text-[var(--text-muted)]">
              {filtered.length} students · Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-xl border border-[var(--border)] px-3 py-1.5 disabled:opacity-40"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </button>
              <button
                type="button"
                className="rounded-xl border border-[var(--border)] px-3 py-1.5 disabled:opacity-40"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </PageContainer>
  )
}
