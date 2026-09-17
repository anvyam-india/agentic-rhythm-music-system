import type { ReactNode } from 'react'
import { Breadcrumbs } from '@/components/common/Breadcrumbs/Breadcrumbs'
import type { BreadcrumbItem } from '@/types/common'

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
  breadcrumbs?: BreadcrumbItem[]
}

export function PageHeader({ title, description, actions, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <div className="mb-2">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        ) : null}
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)] md:text-3xl">{title}</h1>
        {description ? <p className="mt-1 max-w-2xl text-sm text-[var(--text-secondary)]">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  )
}
