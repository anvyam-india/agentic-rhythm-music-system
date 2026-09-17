import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ChildViewMode, DemoUser, UserRole } from '@/types/roles'
import {
  ACADEMY_BRANCHES,
  DEMO_USERS,
  STORAGE_KEYS,
  type AcademyBranch,
} from '@/constants/roles'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import type { ToastMessage } from '@/types/common'
import type { InsightPanelData } from '@/utils/aiEngine'

interface AppContextValue {
  currentRole: UserRole
  setCurrentRole: (role: UserRole) => void
  currentUser: DemoUser
  isAuthenticated: boolean
  login: (role: UserRole) => void
  logout: () => void
  childView: ChildViewMode
  setChildView: (view: ChildViewMode) => void
  selectedChildId: string
  setSelectedChildId: (id: string) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (value: boolean) => void
  mobileNavOpen: boolean
  setMobileNavOpen: (value: boolean) => void
  toasts: ToastMessage[]
  pushToast: (toast: Omit<ToastMessage, 'id'>) => void
  dismissToast: (id: string) => void
  roleTransitioning: boolean
  currentBranchId: string
  setCurrentBranchId: (id: string) => void
  currentBranch: AcademyBranch
  /** Rhythm AI overlay */
  aiOpen: boolean
  aiMinimized: boolean
  openAi: () => void
  minimizeAi: () => void
  closeAi: () => void
  restoreAi: () => void
  insightData: InsightPanelData | null
  insightOpen: boolean
  setInsight: (data: InsightPanelData | null, open?: boolean) => void
  closeInsight: () => void
  /** Cmd+K module search */
  globalSearchOpen: boolean
  setGlobalSearchOpen: (open: boolean) => void
  /** Voice STT live status for sidebar */
  voiceSttActive: boolean
  voiceSttLabel: string
  voiceSttSeconds: number
  setVoiceStt: (active: boolean, label?: string, seconds?: number) => void
}

const AppContext = createContext<AppContextValue | null>(null)

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [currentRole, setRoleState] = useLocalStorage<UserRole>(STORAGE_KEYS.role, 'admin')
  const [isAuthenticated, setAuthenticated] = useLocalStorage<boolean>(
    STORAGE_KEYS.authenticated,
    false,
  )
  const [childView, setChildView] = useLocalStorage<ChildViewMode>(
    STORAGE_KEYS.childView,
    'student',
  )
  const [currentBranchId, setCurrentBranchId] = useLocalStorage<string>(
    STORAGE_KEYS.branchId,
    'br-south-bopal',
  )
  const [selectedChildId, setSelectedChildId] = useState('student-001')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const [roleTransitioning, setRoleTransitioning] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)
  const [aiMinimized, setAiMinimized] = useState(false)
  const [insightData, setInsightData] = useState<InsightPanelData | null>(null)
  const [insightOpen, setInsightOpen] = useState(false)
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false)
  const [voiceSttActive, setVoiceSttActive] = useState(false)
  const [voiceSttLabel, setVoiceSttLabel] = useState('')
  const [voiceSttSeconds, setVoiceSttSeconds] = useState(0)

  const currentUser = DEMO_USERS[currentRole]
  const currentBranch =
    ACADEMY_BRANCHES.find((b) => b.id === currentBranchId) ?? ACADEMY_BRANCHES[0]!

  const setCurrentRole = useCallback(
    (role: UserRole) => {
      setRoleTransitioning(true)
      window.setTimeout(() => {
        setRoleState(role)
        if (role !== 'child') {
          setChildView('student')
        }
        setRoleTransitioning(false)
      }, 180)
    },
    [setRoleState, setChildView],
  )

  const login = useCallback(
    (role: UserRole) => {
      setRoleState(role)
      setAuthenticated(true)
    },
    [setRoleState, setAuthenticated],
  )

  const logout = useCallback(() => {
    setAuthenticated(false)
    setAiOpen(false)
    setAiMinimized(false)
    setVoiceSttActive(false)
    setVoiceSttLabel('')
    setVoiceSttSeconds(0)
  }, [setAuthenticated])

  const pushToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}`
    setToasts((prev) => [...prev, { ...toast, id }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const openAi = useCallback(() => {
    setAiMinimized(false)
    setAiOpen(true)
  }, [])

  const minimizeAi = useCallback(() => {
    setAiOpen(false)
    setAiMinimized(true)
  }, [])

  const closeAi = useCallback(() => {
    setAiOpen(false)
    setAiMinimized(false)
  }, [])

  const restoreAi = useCallback(() => {
    setAiMinimized(false)
    setAiOpen(true)
  }, [])

  const setInsight = useCallback((data: InsightPanelData | null, open = true) => {
    setInsightData(data)
    setInsightOpen(Boolean(data) && open)
  }, [])

  const closeInsight = useCallback(() => {
    setInsightOpen(false)
  }, [])

  const setVoiceStt = useCallback((active: boolean, label = '', seconds = 0) => {
    setVoiceSttActive(active)
    setVoiceSttLabel(label)
    setVoiceSttSeconds(seconds)
  }, [])

  const value = useMemo(
    () => ({
      currentRole,
      setCurrentRole,
      currentUser,
      isAuthenticated,
      login,
      logout,
      childView,
      setChildView,
      selectedChildId,
      setSelectedChildId,
      sidebarCollapsed,
      setSidebarCollapsed,
      mobileNavOpen,
      setMobileNavOpen,
      toasts,
      pushToast,
      dismissToast,
      roleTransitioning,
      currentBranchId,
      setCurrentBranchId,
      currentBranch,
      aiOpen,
      aiMinimized,
      openAi,
      minimizeAi,
      closeAi,
      restoreAi,
      insightData,
      insightOpen,
      setInsight,
      closeInsight,
      globalSearchOpen,
      setGlobalSearchOpen,
      voiceSttActive,
      voiceSttLabel,
      voiceSttSeconds,
      setVoiceStt,
    }),
    [
      currentRole,
      setCurrentRole,
      currentUser,
      isAuthenticated,
      login,
      logout,
      childView,
      setChildView,
      selectedChildId,
      sidebarCollapsed,
      mobileNavOpen,
      toasts,
      pushToast,
      dismissToast,
      roleTransitioning,
      currentBranchId,
      setCurrentBranchId,
      currentBranch,
      aiOpen,
      aiMinimized,
      openAi,
      minimizeAi,
      closeAi,
      restoreAi,
      insightData,
      insightOpen,
      setInsight,
      closeInsight,
      globalSearchOpen,
      voiceSttActive,
      voiceSttLabel,
      voiceSttSeconds,
      setVoiceStt,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) {
    throw new Error('useApp must be used within AppProvider')
  }
  return ctx
}
