import { useApp } from '@/context/AppContext'

export function useToast(): {
  pushToast: (toast: { title: string; description?: string; type: 'success' | 'error' | 'info' | 'warning' }) => void
  success: (title: string, description?: string) => void
  error: (title: string, description?: string) => void
} {
  const { pushToast } = useApp()
  return {
    pushToast,
    success: (title, description) => pushToast({ title, description, type: 'success' }),
    error: (title, description) => pushToast({ title, description, type: 'error' }),
  }
}
