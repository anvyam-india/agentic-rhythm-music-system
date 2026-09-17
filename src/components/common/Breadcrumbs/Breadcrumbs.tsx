import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import type { BreadcrumbItem } from '@/types/common'
import { cn } from '@/utils/format'

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
}

function titleCase(segment: string): string {
  return segment
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function crumbsFromPath(pathname: string): BreadcrumbItem[] {
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length === 0) return [{ label: 'Home' }]

  const items: BreadcrumbItem[] = []
  let acc = ''

  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i]
    if (!part) continue
    acc += `/${part}`
    const isLast = i === parts.length - 1
    items.push({
      label: titleCase(part),
      path: isLast ? undefined : acc,
    })
  }

  return items
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const { pathname } = useLocation()
  const crumbs = items ?? crumbsFromPath(pathname)

  if (crumbs.length <= 1) return null

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1
          const isFirst = index === 0

          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-1">
              {index > 0 ? (
                <ChevronRight size={14} className="shrink-0 text-[var(--text-muted)]" aria-hidden />
              ) : null}
              {crumb.path && !isLast ? (
                <Link
                  to={crumb.path}
                  className="inline-flex items-center gap-1 rounded-lg px-1.5 py-0.5 text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--text)]"
                >
                  {isFirst ? <Home size={14} className="opacity-70" /> : null}
                  <span>{crumb.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    'inline-flex items-center gap-1 px-1.5 py-0.5',
                    isLast ? 'font-medium text-[var(--text)]' : 'text-[var(--text-secondary)]',
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {isFirst && !crumb.path ? <Home size={14} className="opacity-70" /> : null}
                  {crumb.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
