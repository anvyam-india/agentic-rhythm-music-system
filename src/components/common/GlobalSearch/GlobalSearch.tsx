import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Command,
  LayoutDashboard,
  Mic,
  MicOff,
  Search,
  X,
  type LucideIcon,
} from 'lucide-react'
import {
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  Music,
  Wallet,
  MessageSquare,
  Mic2,
  CalendarDays,
  BarChart3,
  Settings,
  Calendar,
  FileText,
  ClipboardList,
  AudioLines,
  User,
  Home,
  Trophy,
  Heart,
  TrendingUp,
  MessageCircle,
  Camera,
} from 'lucide-react'
import { getSearchableModules } from '@/constants/navigation'
import { useApp } from '@/context/AppContext'
import { useRole } from '@/hooks/useRole'
import { mockStudents } from '@/services/mock/mockStudents'
import { mockTeachers } from '@/services/mock/mockTeachers'
import { mockEvents } from '@/services/mock/mockEvents'
import { cn } from '@/utils/format'

interface SearchItem {
  id: string
  path: string
  label: string
  category: string
  icon: LucideIcon
}

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  Music,
  Wallet,
  MessageSquare,
  Mic2,
  CalendarDays,
  BarChart3,
  Settings,
  Calendar,
  FileText,
  ClipboardList,
  AudioLines,
  User,
  Home,
  Trophy,
  Heart,
  TrendingUp,
  MessageCircle,
  Camera,
}

const VOICE_TIPS = [
  'Open Dashboard',
  'Open Finance',
  'Open Students',
  'Open Teachers',
  'Open Attendance',
  'Open Cameras',
  'Open Events',
]

type SpeechRec = {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  start: () => void
  stop: () => void
  onstart: (() => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  onresult: ((e: Event) => void) | null
}

interface GlobalSearchTriggerProps {
  className?: string
}

/** Header / toolbar trigger only */
export function GlobalSearchTrigger({ className }: GlobalSearchTriggerProps) {
  const { setGlobalSearchOpen } = useApp()
  return (
    <button
      type="button"
      className={cn('global-search-trigger', className)}
      onClick={() => setGlobalSearchOpen(true)}
    >
      <Search size={15} />
      <span className="flex-1 truncate text-left">Search modules… try “Open Finance”</span>
      <kbd className="global-search-kbd">
        <Command size={10} />K
      </kbd>
    </button>
  )
}

/** Always mounted modal + Cmd+K (place in AppLayout) */
export function GlobalSearch() {
  const navigate = useNavigate()
  const { role, childView } = useRole()
  const { globalSearchOpen, setGlobalSearchOpen, pushToast } = useApp()
  const [query, setQuery] = useState('')
  const [listening, setListening] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<SpeechRec | null>(null)

  const moduleItems = useMemo<SearchItem[]>(() => {
    return getSearchableModules(role, childView).map((item) => ({
      id: `mod-${item.path}`,
      path: item.path,
      label: item.label,
      category: 'Module',
      icon: (item.icon && iconMap[item.icon]) || LayoutDashboard,
    }))
  }, [role, childView])

  const entityItems = useMemo<SearchItem[]>(() => {
    const items: SearchItem[] = []
    if (role === 'admin') {
      mockStudents.forEach((s) => {
        items.push({
          id: s.id,
          path: `/admin/students/${s.id}`,
          label: s.name,
          category: 'Student',
          icon: Users,
        })
      })
      mockTeachers.forEach((t) => {
        items.push({
          id: t.id,
          path: '/admin/teachers',
          label: t.name,
          category: 'Teacher',
          icon: GraduationCap,
        })
      })
      mockEvents.forEach((e) => {
        items.push({
          id: e.id,
          path: '/admin/events',
          label: e.title,
          category: 'Event',
          icon: CalendarDays,
        })
      })
    }
    return items
  }, [role])

  const allItems = useMemo(() => [...moduleItems, ...entityItems], [moduleItems, entityItems])

  const matchQuery = useCallback(
    (q: string) => {
      const raw = q.toLowerCase().trim()
      if (!raw) return moduleItems.slice(0, 10)
      const cleaned = raw
        .replace(/^(open|go to|navigate to|show|launch|kholo|dikhao)\s+/i, '')
        .trim()
      return allItems
        .filter(
          (item) =>
            item.label.toLowerCase().includes(cleaned) ||
            item.category.toLowerCase().includes(cleaned) ||
            item.path.toLowerCase().includes(cleaned.replace(/\s+/g, '')),
        )
        .slice(0, 12)
    },
    [allItems, moduleItems],
  )

  const results = useMemo(() => matchQuery(query), [query, matchQuery])

  const navigateTo = useCallback(
    (path: string, label?: string) => {
      pushToast({
        title: `Opening ${label ?? 'module'}`,
        description: 'Navigation — demo',
        type: 'success',
      })
      setGlobalSearchOpen(false)
      setQuery('')
      window.setTimeout(() => navigate(path), 280)
    },
    [navigate, pushToast, setGlobalSearchOpen],
  )

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
    setListening(false)
  }, [])

  const startListening = () => {
    const w = window as Window & {
      SpeechRecognition?: new () => SpeechRec
      webkitSpeechRecognition?: new () => SpeechRec
    }
    const SR = w.SpeechRecognition ?? w.webkitSpeechRecognition
    if (!SR) return
    const recognition = new SR()
    recognition.lang = 'en-IN'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.onstart = () => setListening(true)
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognition.onresult = (e: Event) => {
      const ev = e as Event & {
        results: ArrayLike<ArrayLike<{ transcript: string }>>
      }
      const transcript = ev.results[0]?.[0]?.transcript ?? ''
      setQuery(transcript)
      const matched = matchQuery(transcript)
      if (matched[0]) navigateTo(matched[0].path, matched[0].label)
    }
    recognitionRef.current = recognition
    recognition.start()
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setGlobalSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setGlobalSearchOpen])

  useEffect(() => {
    if (globalSearchOpen) {
      setQuery('')
      setActiveIndex(0)
      window.setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      stopListening()
    }
  }, [globalSearchOpen, stopListening])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    if (!globalSearchOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setGlobalSearchOpen(false)
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, Math.max(results.length - 1, 0)))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter' && results[activeIndex]) {
        navigateTo(results[activeIndex].path, results[activeIndex].label)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [globalSearchOpen, results, activeIndex, navigateTo, setGlobalSearchOpen])

  if (!globalSearchOpen) return null

  return (
    <div
      className="global-search-overlay"
      onClick={() => setGlobalSearchOpen(false)}
      role="presentation"
    >
      <div
        className="global-search-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Module search"
      >
        <div className="global-search-input-wrap">
          <Search size={18} className="global-search-icon" />
          <input
            ref={inputRef}
            className="global-search-input"
            placeholder="Search modules — say Open Students"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            className={`global-search-mic ${listening ? 'listening' : ''}`}
            onClick={listening ? stopListening : startListening}
            title={listening ? 'Stop' : 'Voice search'}
          >
            {listening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
          {query ? (
            <button type="button" className="global-search-clear" onClick={() => setQuery('')}>
              <X size={16} />
            </button>
          ) : null}
        </div>

        {listening ? (
          <div className="global-search-voice-hint">
            <span className="voice-pulse" />
            Listening… say “Open Finance” or “Open Students”
          </div>
        ) : null}

        <div className="global-search-section">
          <p className="global-search-section-title">
            {query.trim() ? `Results (${results.length})` : 'Modules'}
          </p>
          <div className="global-search-list">
            {results.length === 0 ? (
              <p className="global-search-empty">No modules found for “{query}”</p>
            ) : (
              results.map((item, i) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`global-search-item ${i === activeIndex ? 'active' : ''}`}
                    onClick={() => navigateTo(item.path, item.label)}
                    onMouseEnter={() => setActiveIndex(i)}
                  >
                    <div className="global-search-item-icon">
                      <Icon size={16} />
                    </div>
                    <div className="global-search-item-text">
                      <span className="global-search-item-label">{item.label}</span>
                      <span className="global-search-item-category">{item.category}</span>
                    </div>
                    <ArrowRight size={14} className="global-search-item-arrow" />
                  </button>
                )
              })
            )}
          </div>
        </div>

        {!query.trim() ? (
          <div className="global-search-voice-tips">
            <p className="global-search-section-title">Try saying</p>
            <div className="global-search-chips">
              {VOICE_TIPS.map((tip) => (
                <button
                  key={tip}
                  type="button"
                  className="global-search-chip"
                  onClick={() => setQuery(tip)}
                >
                  <Mic size={12} /> {tip}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="global-search-footer">
          <span>
            <Command size={12} /> K open
          </span>
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  )
}
