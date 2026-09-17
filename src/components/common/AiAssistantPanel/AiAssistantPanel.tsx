import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mic, Minimize2, Send, PanelRight, X } from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'
import { RhythmAiAvatar } from '@/components/ai/RhythmAiAvatar'
import { VoiceMode } from '@/components/ai/VoiceMode'
import { useApp } from '@/context/AppContext'
import { useRole } from '@/hooks/useRole'
import { cn } from '@/utils/format'
import {
  processAiQuery,
  getSuggestedPrompts,
  type AiEngineResult,
  type InsightPanelData,
} from '@/utils/aiEngine'

interface AiMessage {
  id: string
  role: 'assistant' | 'user'
  content: string
  insight?: InsightPanelData
}

function welcomeFor(role: string, childView: string): string {
  if (role === 'teacher') {
    return 'Namaste 👋 Main Riya hoon — Teacher Copilot. Attendance, pending assignments, parent messages — poochho ya Voice se bolo.'
  }
  if (role === 'child' && childView === 'parent') {
    return 'Namaste 👋 Main Riya hoon — Family Copilot. Fees, attendance, practice summary — poochho.'
  }
  if (role === 'child') {
    return 'Namaste 👋 Main Riya hoon — Practice Coach. Aaj kya practice karna hai, progress, assignments — poochho!'
  }
  return 'Namaste 👋 Main Riya hoon — Academy Copilot. Fees, attendance, 7-din absent, teacher/parent message — Hindi/English dono chalega.'
}

function streamText(full: string, onChunk: (partial: string) => void, onDone: () => void): () => void {
  let i = 0
  const id = window.setInterval(() => {
    i += Math.max(1, Math.floor(full.length / 70))
    onChunk(full.slice(0, i))
    if (i >= full.length) {
      window.clearInterval(id)
      onDone()
    }
  }, 24)
  return () => window.clearInterval(id)
}

export function AiAssistantPanel() {
  const navigate = useNavigate()
  const { role, childView } = useRole()
  const {
    aiOpen,
    minimizeAi,
    closeAi,
    setInsight,
    insightOpen,
    insightData,
    closeInsight,
    pushToast,
  } = useApp()

  const prompts = getSuggestedPrompts(role, childView)
  const [messages, setMessages] = useState<AiMessage[]>([
    { id: 'welcome', role: 'assistant', content: welcomeFor(role, childView) },
  ])
  const [draft, setDraft] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [voiceMode, setVoiceMode] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    setMessages([{ id: 'welcome', role: 'assistant', content: welcomeFor(role, childView) }])
  }, [role, childView])

  useEffect(() => {
    if (!aiOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !voiceMode) minimizeAi()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [aiOpen, minimizeAi, voiceMode])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming, aiOpen])

  useEffect(() => () => cancelRef.current?.(), [])

  const applyResult = (result: AiEngineResult) => {
    if (result.insight) {
      setInsight(result.insight, true)
    }
    if (result.operation) {
      pushToast({
        title: result.operation.toastTitle,
        description: result.operation.toastDescription,
        type: 'success',
      })
      if (result.operation.path && result.operation.type === 'open_module') {
        window.setTimeout(() => {
          minimizeAi()
          navigate(result.operation!.path!)
        }, 450)
      }
    }
  }

  const respond = (raw: string) => {
    const content = raw.trim()
    if (!content || streaming) return
    cancelRef.current?.()
    const result = processAiQuery(content, role, childView)
    const assistantId = `a-${Date.now()}`
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: 'user', content },
      { id: assistantId, role: 'assistant', content: '', insight: result.insight },
    ])
    setDraft('')
    setStreaming(true)
    cancelRef.current = streamText(
      result.answer,
      (partial) => {
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: partial } : m)),
        )
      },
      () => {
        setStreaming(false)
        applyResult(result)
      },
    )
  }

  const handleVoiceResult = (userText: string, aiText: string, result?: AiEngineResult) => {
    setMessages((prev) => {
      const next = [...prev]
      if (userText) next.push({ id: `u-${Date.now()}`, role: 'user', content: userText })
      if (aiText) {
        next.push({
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: aiText,
          insight: result?.insight,
        })
      }
      return next
    })
    if (result) applyResult(result)
  }

  if (!aiOpen) return null

  return (
    <>
      {voiceMode ? (
        <VoiceMode onClose={() => setVoiceMode(false)} onResult={handleVoiceResult} />
      ) : null}

      <div className="fixed inset-0 z-[70] flex flex-col bg-[var(--bg)]">
        <div
          className="relative z-10 flex h-full w-full flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Rhythm AI"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-[var(--border)] px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <RhythmAiAvatar size="sm" />
              <div>
                <p className="font-semibold text-[var(--text)]">Riya · Academy Copilot</p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {streaming ? 'Typing…' : 'Chat · Voice STT · Demo'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="!px-2"
                onClick={() => {
                  if (insightOpen) closeInsight()
                  else if (insightData) setInsight(insightData, true)
                }}
                aria-label="Toggle insights"
                title="Insights"
              >
                <PanelRight size={18} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="!px-2"
                onClick={minimizeAi}
                aria-label="Minimize"
                title="Minimize to corner"
              >
                <Minimize2 size={18} />
              </Button>
              <Button variant="ghost" size="sm" className="!px-2" onClick={closeAi} aria-label="Close">
                <X size={18} />
              </Button>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-center px-4 py-5 sm:py-8">
            <button
              type="button"
              onClick={() => setVoiceMode(true)}
              className="group relative"
              aria-label="Start voice"
            >
              <RhythmAiAvatar size="xl" pulse className="transition group-hover:scale-105" />
              <span className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--ai)] text-white shadow-md">
                <Mic size={16} />
              </span>
            </button>
            <p className="mt-4 max-w-lg text-center text-sm text-[var(--text-secondary)]">
              Tap avatar for Voice — Hindi/English fees, attendance, messages
            </p>
          </div>

          <div className="mx-auto w-full max-w-4xl flex-1 space-y-3 overflow-y-auto px-4 pb-3 scrollbar-thin sm:px-8">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                <button
                  type="button"
                  disabled={!msg.insight}
                  onClick={() => {
                    if (msg.insight) setInsight(msg.insight, true)
                  }}
                  className={cn(
                    'max-w-[92%] rounded-2xl px-4 py-3 text-left text-sm leading-relaxed sm:max-w-[75%]',
                    msg.role === 'user'
                      ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                      : 'border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] shadow-sm',
                    msg.insight && 'cursor-pointer hover:border-[var(--ai)]',
                  )}
                >
                  {msg.content}
                  {streaming &&
                  msg.role === 'assistant' &&
                  msg.id === messages[messages.length - 1]?.id ? (
                    <span className="ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-[var(--accent)] align-middle" />
                  ) : null}
                  {msg.insight && !streaming ? (
                    <span className="mt-2 block text-[11px] font-semibold text-[var(--ai)]">
                      View insight panel →
                    </span>
                  ) : null}
                </button>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="shrink-0 border-t border-[var(--border)] bg-[var(--surface)] px-4 py-3 sm:px-8 sm:py-4">
            <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              Suggested questions
            </p>
            <div className="mb-3 flex max-h-28 flex-wrap justify-center gap-2 overflow-y-auto sm:max-h-none">
              {prompts.map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled={streaming}
                  onClick={() => respond(q)}
                  className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-left text-xs font-medium text-[var(--text-secondary)] hover:border-[var(--ai)] hover:text-[var(--ai)] disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
            <form
              className="mx-auto flex max-w-4xl gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                respond(draft)
              }}
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Hindi/English — fees, absent, message…"
                disabled={streaming}
                className="h-11 flex-1 rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)] sm:h-12"
              />
              <Button
                type="button"
                variant="outline"
                className="!h-11 !rounded-2xl !px-3 sm:!h-12"
                onClick={() => setVoiceMode(true)}
                aria-label="Voice"
              >
                <Mic size={18} />
              </Button>
              <Button
                type="submit"
                className="!h-11 !rounded-2xl sm:!h-12"
                disabled={!draft.trim() || streaming}
              >
                <Send size={16} />
              </Button>
            </form>
            <p className="mt-2 text-center text-[10px] text-[var(--text-muted)]">
              Academy Copilot — Demo · Leave → bottom-right avatar to reopen
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
