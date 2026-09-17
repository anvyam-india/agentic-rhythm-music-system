import { AppProvider } from '@/context/AppContext'
import { AppRouter } from '@/routes'
import { ToastViewport } from '@/components/ui/Toast/Toast'

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
      <ToastViewport />
    </AppProvider>
  )
}
