import type { ComponentType, ReactNode } from 'react'
import type { UserRole } from './roles'

export interface NavItem {
  label: string
  path: string
  icon?: string
  children?: NavItem[]
}

export interface RouteConfig {
  path: string
  label: string
  element: ReactNode
  roles: UserRole[]
  icon?: ComponentType<{ size?: number; className?: string }>
}

export interface BreadcrumbItem {
  label: string
  path?: string
}

export interface SelectOption {
  label: string
  value: string
}

export interface ChartPoint {
  label: string
  value: number
}

export interface AIInsight {
  id: string
  title: string
  description: string
  severity: 'info' | 'warning' | 'success'
  category: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earnedAt?: string
  unlocked: boolean
}

export interface ToastMessage {
  id: string
  title: string
  description?: string
  type: 'success' | 'error' | 'info' | 'warning'
}
