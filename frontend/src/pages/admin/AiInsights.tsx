import { useEffect, useRef, useState } from 'react'
import {
  Send,
  Mic,
  ChevronDown,
  Briefcase,
  Users,
  BookOpen,
  ArrowRight,
} from 'lucide-react'
import { VoiceMode } from '@/components/ai/VoiceMode'
import { rhythmVoiceExamples } from '@/utils/voiceMatch'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'

type AgentType = 'academy' | 'students' | 'practice'

interface Message {
  role: 'user' | 'ai'
  content: string
  agent?: AgentType
}

const agents: { id: AgentType; label: string; icon: typeof Briefcase }[] = [
  { id: 'academy', label: 'Academy Agent', icon: Briefcase },
  { id: 'students', label: 'Students Agent', icon: Users },
  { id: 'practice', label: 'Practice Agent', icon: BookOpen },
]

const SUGGESTIONS = [
  'Aaj kitne students absent hain?',
  'Guitar Level 2 ka progress batao',
  'Concert alert kaise bheju?',
  'Practice kyun drop hua hai?',
  'Aarav Patel ka attendance kaisa hai?',
]

function getTextResponse(q: string): string {
  const lower = q.toLowerCase()
  for (const ex of rhythmVoiceExamples) {
    if (ex.keywords.some((k) => lower.includes(k))) return ex.answerHi
    if (ex.exampleHi.toLowerCase() === lower) return ex.answerHi
  }
  return 'Rhythmonic academy overall healthy hai — attendance ~92%, monthly fees on track. Suggested questions try karo for specific insights.'
}

export default function AiCopilotPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [agent, setAgent] = useState<AgentType>('academy')
  const [agentOpen, setAgentOpen] = useState(false)
  const [thinking, setThinking] = useState(false)
  const [voiceMode, setVoiceMode] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const currentAgent = agents.find((a) => a.id === agent)!

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  const handleSend = (question?: string) => {
    const q = (question || input).trim()
    if (!q || thinking) return
    setMessages((prev) => [...prev, { role: 'user', content: q, agent }])
    setInput('')
    setThinking(true)
    const response = getTextResponse(q)
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'ai', content: response, agent }])
      setThinking(false)
    }, 900)
  }

  const handleVoiceChat = (userText: string, aiText: string) => {
    setMessages((prev) => {
      const next = [...prev]
      if (userText) next.push({ role: 'user', content: userText, agent })
      if (aiText) next.push({ role: 'ai', content: aiText, agent })
      return next
    })
  }

  const AgentIcon = currentAgent.icon

  return (
    <>
      {voiceMode ? (
        <VoiceMode onClose={() => setVoiceMode(false)} onAddToChat={handleVoiceChat} />
      ) : null}

      <PageContainer className="!py-4">
        <div className="copilot-page">
          <div className="copilot-header">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--ai)] text-sm font-bold text-white">
                R
              </div>
              <div>
                <h1 className="text-xl font-bold text-[var(--text)]">Rhythm AI Copilot</h1>
                <p className="text-xs text-[var(--text-muted)]">Chat ya voice se poochiye</p>
              </div>
            </div>
            <button type="button" className="copilot-voice-launch-btn" onClick={() => setVoiceMode(true)}>
              <Mic size={15} /> Voice Assistant
            </button>
          </div>

          <div className="copilot-chat-area">
            {messages.length === 0 ? (
              <div className="copilot-empty-state">
                <div className="copilot-center-logo">
                  <div className="flex h-[88px] w-[88px] items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] via-teal-400 to-[var(--ai)] text-3xl font-bold text-white shadow-lg">
                    R
                  </div>
                </div>
                <h2 className="mt-6 text-lg font-semibold text-[var(--text)]">How can I help you today?</h2>
                <p className="mt-2 max-w-md text-center text-sm text-[var(--text-muted)]">
                  Type below or use Voice Assistant for Hindi conversation
                </p>
                <button type="button" className="copilot-voice-btn mt-5" onClick={() => setVoiceMode(true)}>
                  <Mic size={18} /> Voice Assistant — Hindi mein baat karein
                </button>
                <div className="copilot-suggestions mt-8">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="copilot-suggestion-chip"
                      onClick={() => handleSend(s)}
                    >
                      {s}
                      <ArrowRight size={12} className="ml-1 inline opacity-50" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="copilot-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`copilot-msg ${msg.role}`}>
                    {msg.role === 'ai' ? (
                      <div className="copilot-msg-avatar">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--ai)] text-[10px] font-bold text-white">
                          R
                        </div>
                      </div>
                    ) : null}
                    <div className={`copilot-msg-bubble ${msg.role}`}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {thinking ? (
                  <div className="copilot-msg ai">
                    <div className="copilot-msg-avatar">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--ai)] text-[10px] font-bold text-white">
                        R
                      </div>
                    </div>
                    <div className="copilot-msg-bubble ai thinking">
                      <span className="copilot-typing">
                        <span />
                        <span />
                        <span />
                      </span>
                    </div>
                  </div>
                ) : null}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          <div className="copilot-input-bar">
            <div className="copilot-input-wrap">
              <div className="copilot-agent-select">
                <button type="button" className="copilot-agent-btn" onClick={() => setAgentOpen(!agentOpen)}>
                  <AgentIcon size={14} />
                  <span>{currentAgent.label}</span>
                  <ChevronDown size={12} />
                </button>
                {agentOpen ? (
                  <div className="copilot-agent-dropdown">
                    {agents.map((a) => {
                      const Icon = a.icon
                      return (
                        <button
                          key={a.id}
                          type="button"
                          className={`copilot-agent-option ${agent === a.id ? 'active' : ''}`}
                          onClick={() => {
                            setAgent(a.id)
                            setAgentOpen(false)
                          }}
                        >
                          <Icon size={14} />
                          <span>{a.label}</span>
                        </button>
                      )
                    })}
                  </div>
                ) : null}
              </div>

              <input
                className="copilot-text-input"
                placeholder={`Ask ${currentAgent.label}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />

              <button
                type="button"
                className="copilot-send-btn"
                onClick={() => handleSend()}
                disabled={!input.trim() || thinking}
              >
                <Send size={16} />
              </button>

              <button
                type="button"
                className="copilot-mic-btn"
                onClick={() => setVoiceMode(true)}
                title="Voice Assistant"
              >
                <Mic size={18} />
              </button>
            </div>
            <p className="copilot-input-hint">Type to chat · Mic for Hindi voice assistant</p>
          </div>
        </div>
      </PageContainer>
    </>
  )
}
