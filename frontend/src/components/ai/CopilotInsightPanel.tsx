import { ArrowRight, MessageSquare, TrendingUp, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { formatCurrency, cn } from '@/utils/format'

export function CopilotInsightPanel() {
  const { insightOpen, insightData, closeInsight, minimizeAi, pushToast } = useApp()
  const navigate = useNavigate()

  if (!insightOpen || !insightData) return null

  const goMessage = (label: string, link: string, studentName?: string) => {
    closeInsight()
    minimizeAi()
    pushToast({
      title: studentName ? `${label} → ${studentName}` : label,
      description: 'Opening Communication — demo',
      type: 'success',
    })
    navigate(link)
  }

  return (
    <>
      <button
        type="button"
        className="copilot-panel-overlay"
        aria-label="Close insight panel"
        onClick={closeInsight}
      />
      <aside className="copilot-panel" role="complementary" aria-label="AI insight">
        <div className="copilot-panel-header">
          <div>
            <p className="copilot-panel-label">Academy Copilot — Demo</p>
            <h3 className="copilot-panel-title">{insightData.title}</h3>
          </div>
          <button type="button" className="copilot-panel-close" onClick={closeInsight} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="copilot-panel-body">
          <p className="copilot-panel-summary">{insightData.summary}</p>

          {insightData.metrics && insightData.metrics.length > 0 ? (
            <div className="copilot-metrics">
              {insightData.metrics.map((m) => (
                <div key={m.label} className="copilot-metric-card">
                  <p className="copilot-metric-label">{m.label}</p>
                  <p className="copilot-metric-value">{m.value}</p>
                  {m.change ? (
                    <p
                      className={cn(
                        'copilot-metric-change',
                        m.positive === false ? 'negative' : 'positive',
                      )}
                    >
                      {m.change}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}

          {insightData.rows && insightData.rows.length > 0 ? (
            <div className="copilot-insight-rows">
              <p className="copilot-section-title">Students</p>
              <ul>
                {insightData.rows.map((row) => (
                  <li key={row.id} className="copilot-insight-row">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[var(--text)]">{row.name}</p>
                      <p className="truncate text-xs text-[var(--text-muted)]">{row.meta}</p>
                      {row.actionLabel && row.actionLink ? (
                        <button
                          type="button"
                          className="mt-1.5 inline-flex items-center gap-1 rounded-lg bg-[var(--ai-soft)] px-2 py-1 text-[11px] font-semibold text-[var(--ai)] hover:opacity-90"
                          onClick={() => goMessage(row.actionLabel!, row.actionLink!, row.name)}
                        >
                          <MessageSquare size={11} />
                          {row.actionLabel}
                        </button>
                      ) : null}
                    </div>
                    <div className="shrink-0 text-right">
                      {typeof row.amount === 'number' ? (
                        <p className="text-sm font-bold text-[var(--text)]">
                          {formatCurrency(row.amount)}
                        </p>
                      ) : null}
                      {row.status ? (
                        <span
                          className={cn(
                            'text-[10px] font-semibold uppercase tracking-wide',
                            row.status === 'overdue' || row.status === 'absent'
                              ? 'text-[var(--danger)]'
                              : row.status === 'pending'
                                ? 'text-[var(--warning)]'
                                : 'text-[var(--text-muted)]',
                          )}
                        >
                          {row.status}
                        </span>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {insightData.highlights && insightData.highlights.length > 0 ? (
            <div className="copilot-highlights">
              <p className="copilot-section-title">Key findings</p>
              <ul>
                {insightData.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {insightData.actions && insightData.actions.length > 0 ? (
            <div className="copilot-actions">
              {insightData.actions.map((action) => (
                <button
                  key={action.link + action.label}
                  type="button"
                  className="copilot-action-btn"
                  onClick={() => {
                    if (/message|reminder/i.test(action.label)) {
                      goMessage(action.label, action.link)
                    } else {
                      closeInsight()
                      minimizeAi()
                      navigate(action.link)
                    }
                  }}
                >
                  {action.label}
                  <ArrowRight size={14} />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="copilot-panel-footer">
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <TrendingUp size={12} className="text-[var(--ai)]" />
            <span>{insightData.footer ?? 'Academy Copilot — Demo'}</span>
          </div>
        </div>
      </aside>
    </>
  )
}
