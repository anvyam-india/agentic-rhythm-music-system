import type { ReactNode } from 'react'
import { cn } from '@/utils/format'

interface PageContainerProps {
  children: ReactNode
  className?: string
  contentClassName?: string
}

export function PageContainer({ children, className, contentClassName }: PageContainerProps) {
  return (
    <div className={cn('animate-page mx-auto w-full max-w-[1400px] p-3 sm:p-4 md:p-6 lg:p-8', className, contentClassName)}>
      {children}
    </div>
  )
}
