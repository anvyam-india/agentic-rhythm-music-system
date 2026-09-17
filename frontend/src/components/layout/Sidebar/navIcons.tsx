import type { LucideIcon } from 'lucide-react'
import {
  AudioLines,
  BarChart3,
  BookOpen,
  Building2,
  Calendar,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  FileText,
  GraduationCap,
  Heart,
  Home,
  LayoutDashboard,
  MessageCircle,
  MessageSquare,
  Mic2,
  Music,
  Settings,
  TrendingUp,
  Trophy,
  User,
  Users,
  Wallet,
} from 'lucide-react'

export const NAV_ICON_MAP: Record<string, LucideIcon> = {
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
}

export function getNavIcon(name: string | undefined): LucideIcon {
  if (!name) return LayoutDashboard
  return NAV_ICON_MAP[name] ?? LayoutDashboard
}
