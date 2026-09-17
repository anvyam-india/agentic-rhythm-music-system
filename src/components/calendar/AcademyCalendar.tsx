import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/format'
import { Button } from '@/components/ui/Button/Button'
import { Badge } from '@/components/ui/Badge/Badge'

export type CalendarEventKind = 'class' | 'event' | 'studio' | 'assignment'

export interface CalendarEventItem {
  id: string
  title: string
  date: string
  time?: string
  kind: CalendarEventKind
  meta?: string
}

interface AcademyCalendarProps {
  events: CalendarEventItem[]
  initialMonth?: Date
  onSelectEvent?: (event: CalendarEventItem) => void
}

const KIND_STYLE: Record<CalendarEventKind, string> = {
  class: 'bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)]/20',
  event: 'bg-[var(--ai-soft)] text-[var(--ai)] border-[var(--ai)]/20',
  studio: 'bg-[rgba(22,163,74,0.12)] text-[var(--success)] border-[var(--success)]/20',
  assignment: 'bg-[rgba(217,119,6,0.12)] text-[var(--warning)] border-[var(--warning)]/20',
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function toKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

export function AcademyCalendar({ events, initialMonth, onSelectEvent }: AcademyCalendarProps) {
  const [cursor, setCursor] = useState(() => startOfMonth(initialMonth ?? new Date(2026, 8, 1)))
  const [selectedDay, setSelectedDay] = useState<string | null>('2026-09-17')
  const [view, setView] = useState<'month' | 'week'>('month')

  const byDate = useMemo(() => {
    const map = new Map<string, CalendarEventItem[]>()
    events.forEach((e) => {
      const list = map.get(e.date) ?? []
      list.push(e)
      map.set(e.date, list)
    })
    return map
  }, [events])

  const cells = useMemo(() => {
    const first = startOfMonth(cursor)
    const startPad = first.getDay()
    const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate()
    const result: Array<{ date: Date | null; key: string | null }> = []
    for (let i = 0; i < startPad; i += 1) result.push({ date: null, key: null })
    for (let d = 1; d <= daysInMonth; d += 1) {
      const date = new Date(cursor.getFullYear(), cursor.getMonth(), d)
      result.push({ date, key: toKey(date) })
    }
    while (result.length % 7 !== 0) result.push({ date: null, key: null })
    return result
  }, [cursor])

  const selectedEvents = selectedDay ? (byDate.get(selectedDay) ?? []) : []

  const weekDays = useMemo(() => {
    const base = selectedDay ? new Date(selectedDay) : new Date(2026, 8, 17)
    const start = new Date(base)
    start.setDate(base.getDate() - base.getDay())
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      return d
    })
  }, [selectedDay])

  return (
    <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="!px-2"
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
              aria-label="Previous month"
            >
              <ChevronLeft size={16} />
            </Button>
            <h2 className="min-w-[160px] text-center text-base font-semibold text-[var(--text)]">
              {cursor.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="!px-2"
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
              aria-label="Next month"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
          <div className="flex items-center gap-1 rounded-xl bg-[var(--surface-muted)] p-1">
            <button
              type="button"
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium',
                view === 'month' ? 'bg-[var(--surface)] text-[var(--text)] shadow-sm' : 'text-[var(--text-secondary)]',
              )}
              onClick={() => setView('month')}
            >
              Month
            </button>
            <button
              type="button"
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium',
                view === 'week' ? 'bg-[var(--surface)] text-[var(--text)] shadow-sm' : 'text-[var(--text-secondary)]',
              )}
              onClick={() => setView('week')}
            >
              Week
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-[var(--border)] px-4 py-2 text-[11px]">
          {(Object.keys(KIND_STYLE) as CalendarEventKind[]).map((kind) => (
            <span key={kind} className={cn('rounded-full border px-2 py-0.5 capitalize', KIND_STYLE[kind])}>
              {kind}
            </span>
          ))}
        </div>

        {view === 'month' ? (
          <>
            <div className="grid grid-cols-7 border-b border-[var(--border)] bg-[var(--bg)]">
              {WEEKDAYS.map((d) => (
                <div key={d} className="px-2 py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {cells.map((cell, idx) => {
                const dayEvents = cell.key ? byDate.get(cell.key) ?? [] : []
                const isSelected = cell.key === selectedDay
                const isToday = cell.key === '2026-09-17'
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={!cell.date}
                    onClick={() => cell.key && setSelectedDay(cell.key)}
                    className={cn(
                      'min-h-[96px] border-b border-r border-[var(--border)] p-2 text-left align-top transition',
                      !cell.date && 'bg-[var(--bg)]/50',
                      isSelected && 'bg-[var(--accent-soft)]/40',
                      cell.date && 'hover:bg-[var(--surface-muted)]',
                    )}
                  >
                    {cell.date ? (
                      <>
                        <span
                          className={cn(
                            'inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold',
                            isToday && 'bg-[var(--accent)] text-[var(--on-accent)]',
                            !isToday && 'text-[var(--text)]',
                          )}
                        >
                          {cell.date.getDate()}
                        </span>
                        <div className="mt-1 space-y-1">
                          {dayEvents.slice(0, 2).map((ev) => (
                            <div
                              key={ev.id}
                              className={cn('truncate rounded-md border px-1.5 py-0.5 text-[10px] font-medium', KIND_STYLE[ev.kind])}
                              onClick={(e) => {
                                e.stopPropagation()
                                onSelectEvent?.(ev)
                              }}
                            >
                              {ev.time ? `${ev.time} · ` : ''}
                              {ev.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 ? (
                            <p className="text-[10px] text-[var(--text-muted)]">+{dayEvents.length - 2} more</p>
                          ) : null}
                        </div>
                      </>
                    ) : null}
                  </button>
                )
              })}
            </div>
          </>
        ) : (
          <div className="grid gap-3 p-4 md:grid-cols-7">
            {weekDays.map((d) => {
              const key = toKey(d)
              const dayEvents = byDate.get(key) ?? []
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedDay(key)}
                  className={cn(
                    'rounded-xl border border-[var(--border)] p-3 text-left',
                    selectedDay === key && 'border-[var(--accent)] bg-[var(--accent-soft)]/30',
                  )}
                >
                  <p className="text-[11px] font-medium text-[var(--text-muted)]">
                    {d.toLocaleDateString('en-IN', { weekday: 'short' })}
                  </p>
                  <p className="text-lg font-semibold text-[var(--text)]">{d.getDate()}</p>
                  <div className="mt-2 space-y-1">
                    {dayEvents.slice(0, 3).map((ev) => (
                      <div key={ev.id} className={cn('rounded-md border px-1.5 py-1 text-[10px]', KIND_STYLE[ev.kind])}>
                        {ev.title}
                      </div>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
        <p className="text-sm font-semibold text-[var(--text)]">
          {selectedDay
            ? new Date(selectedDay).toLocaleDateString('en-IN', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })
            : 'Select a day'}
        </p>
        <p className="mt-1 text-xs text-[var(--text-secondary)]">{selectedEvents.length} scheduled items</p>
        <div className="mt-4 space-y-3">
          {selectedEvents.length === 0 ? (
            <p className="rounded-xl border border-dashed border-[var(--border)] px-4 py-8 text-center text-sm text-[var(--text-muted)]">
              No classes, events, or studio sessions on this day.
            </p>
          ) : (
            selectedEvents.map((ev) => (
              <button
                key={ev.id}
                type="button"
                onClick={() => onSelectEvent?.(ev)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3 text-left hover:border-[var(--accent)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-[var(--text)]">{ev.title}</p>
                  <Badge variant="accent" className="capitalize">
                    {ev.kind}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {ev.time ? `${ev.time} · ` : ''}
                  {ev.meta ?? 'Academy schedule'}
                </p>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
