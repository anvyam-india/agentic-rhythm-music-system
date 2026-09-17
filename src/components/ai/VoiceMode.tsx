import { useCallback, useEffect, useRef, useState } from 'react'
import { Mic, X } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { speakHindi, preloadHindiVoice, hasHindiVoice } from '@/utils/speakHindi'
import { processAiQuery, getSuggestedPrompts, type AiEngineResult } from '@/utils/aiEngine'
import { useRole } from '@/hooks/useRole'

type VoiceState = 'greeting' | 'listening' | 'thinking' | 'speaking' | 'idle'

interface VoiceModeProps {
  onClose: () => void
  onResult: (userText: string, aiText: string, result?: AiEngineResult) => void
}

interface Turn {
  user: string
  ai: string
}

const THINK_MS = 450
const LISTEN_DELAY_MS = 300

type SpeechRec = {
  lang: string
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
  start: () => void
  stop: () => void
  abort?: () => void
  onstart: (() => void) | null
  onresult: ((e: Event) => void) | null
  onerror: ((e: Event & { error?: string }) => void) | null
  onend: (() => void) | null
}

export function VoiceMode({ onClose, onResult }: VoiceModeProps) {
  const { currentUser, setVoiceStt } = useApp()
  const { role, childView } = useRole()
  const [state, setState] = useState<VoiceState>('greeting')
  const [statusText, setStatusText] = useState('Connecting...')
  const [noHindiVoice, setNoHindiVoice] = useState(false)
  const [turns, setTurns] = useState<Turn[]>([])
  const [liveUserText, setLiveUserText] = useState('')
  const [micError, setMicError] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  const recognitionRef = useRef<SpeechRec | null>(null)
  const greetedRef = useRef(false)
  const isSpeakingRef = useRef(false)
  const shouldListenRef = useRef(true)
  const onResultRef = useRef(onResult)
  const startListeningRef = useRef<() => void>(() => {})
  const chatScrollRef = useRef<HTMLDivElement>(null)
  const sessionStartRef = useRef(Date.now())

  onResultRef.current = onResult
  const firstName = currentUser.name.split(' ')[0] || 'Sir'

  useEffect(() => {
    void preloadHindiVoice().then(() => setNoHindiVoice(!hasHindiVoice()))
  }, [])

  useEffect(() => {
    sessionStartRef.current = Date.now()
    const id = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - sessionStartRef.current) / 1000))
    }, 1000)
    return () => {
      window.clearInterval(id)
      setVoiceStt(false)
    }
  }, [setVoiceStt])

  useEffect(() => {
    const label =
      state === 'listening'
        ? 'Listening'
        : state === 'speaking'
          ? 'Speaking'
          : state === 'thinking'
            ? 'Thinking'
            : state === 'greeting'
              ? 'Greeting'
              : 'Voice STT'
    setVoiceStt(true, label, elapsed)
  }, [state, elapsed, setVoiceStt])

  useEffect(() => {
    chatScrollRef.current?.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [turns, liveUserText])

  const stopListening = useCallback(() => {
    try {
      recognitionRef.current?.abort?.()
      recognitionRef.current?.stop()
    } catch {
      /* ignore */
    }
    recognitionRef.current = null
  }, [])

  const finishSpeaking = useCallback((thenListen = true) => {
    isSpeakingRef.current = false
    setState('idle')
    setLiveUserText('')
    setStatusText('Sun rahi hoon — aap boliye')
    setMicError(false)
    if (thenListen && shouldListenRef.current) {
      setTimeout(() => startListeningRef.current(), LISTEN_DELAY_MS)
    }
  }, [])

  const speakAndRespond = useCallback(
    (userMsg: string, reply: string, result?: AiEngineResult) => {
      stopListening()
      isSpeakingRef.current = true
      setState('speaking')
      setStatusText('Bol rahi hoon...')
      setTurns((prev) => [...prev, { user: userMsg, ai: reply }])
      onResultRef.current(userMsg, reply, result)
      void speakHindi(reply, () => finishSpeaking(true))
    },
    [stopListening, finishSpeaking],
  )

  const processTranscript = useCallback(
    (transcript: string) => {
      const clean = transcript.trim()
      if (!clean || isSpeakingRef.current) return
      setLiveUserText('')
      setState('thinking')
      setStatusText('Samajh rahi hoon...')
      setTimeout(() => {
        const result = processAiQuery(clean, role, childView)
        speakAndRespond(clean, result.speak, result)
      }, THINK_MS)
    },
    [speakAndRespond, role, childView],
  )

  const startListening = useCallback(() => {
    const w = window as Window & {
      SpeechRecognition?: new () => SpeechRec
      webkitSpeechRecognition?: new () => SpeechRec
    }
    const SR = w.SpeechRecognition ?? w.webkitSpeechRecognition
    if (!SR || isSpeakingRef.current || !shouldListenRef.current) return

    stopListening()
    const recognition = new SR()
    recognition.lang = 'hi-IN'
    recognition.interimResults = true
    recognition.maxAlternatives = 3

    recognition.onstart = () => {
      setMicError(false)
      setState('listening')
      setStatusText('Sun rahi hoon...')
    }

    recognition.onresult = (e: Event) => {
      const ev = e as Event & {
        resultIndex: number
        results: ArrayLike<{ 0: { transcript: string }; isFinal: boolean }>
      }
      let interim = ''
      let final = ''
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const t = ev.results[i]?.[0]?.transcript ?? ''
        if (ev.results[i]?.isFinal) final += t
        else interim += t
      }
      if (interim) setLiveUserText(interim)
      if (final.trim()) {
        stopListening()
        processTranscript(final.trim())
      }
    }

    recognition.onerror = (e) => {
      if (e.error === 'aborted') return
      if (e.error === 'no-speech' && shouldListenRef.current && !isSpeakingRef.current) {
        setTimeout(() => startListeningRef.current(), 400)
        return
      }
      setMicError(true)
      setState('idle')
      setStatusText('Mic issue — neeche button try karein')
    }

    recognition.onend = () => {
      recognitionRef.current = null
    }

    recognitionRef.current = recognition
    try {
      recognition.start()
    } catch {
      setTimeout(() => {
        try {
          recognition.start()
        } catch {
          setMicError(true)
        }
      }, 250)
    }
  }, [stopListening, processTranscript])

  startListeningRef.current = startListening

  useEffect(() => {
    if (greetedRef.current) return
    greetedRef.current = true
    const greeting = `Namaste ${firstName} ji! Main Riya hoon — fees, attendance, message, modules — kya madad karun?`
    isSpeakingRef.current = true
    setState('speaking')
    setStatusText('Namaste keh rahi hoon...')
    setTurns([{ user: '', ai: greeting }])
    void preloadHindiVoice().then(() => {
      void speakHindi(greeting, () => {
        onResultRef.current('', greeting)
        finishSpeaking(true)
      })
    })
  }, [firstName, finishSpeaking])

  const handleClose = () => {
    shouldListenRef.current = false
    speechSynthesis.cancel()
    stopListening()
    setVoiceStt(false)
    onClose()
  }

  const isListening = state === 'listening'
  const isActive = isListening || state === 'speaking' || state === 'thinking'
  const chips = getSuggestedPrompts(role, childView).slice(0, 6)

  return (
    <div className="voice-mode-overlay">
      <header className="voice-mode-header">
        <div className="voice-mode-brand">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent-bright)] to-[var(--ai)] text-sm font-bold text-white">
            R
          </div>
          <span>Rhythm AI Assistant</span>
        </div>
        <button type="button" className="voice-mode-close" onClick={handleClose} aria-label="Close">
          <X size={20} />
        </button>
      </header>

      <div className="voice-mode-body">
        <div className={`voice-mode-orb-wrap ${state}`}>
          <div className="voice-ai-orb">
            <div className="voice-orb-ring voice-orb-ring-1" />
            <div className="voice-avatar-glow" />
            <div className="voice-logo-wrap">
              <div className="flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-xl">
                <div className="scale-[1.15]">
                  <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-xl bg-gradient-to-br from-[#14B8A6] via-[#0F766E] to-[#7C3AED]">
                    <svg viewBox="0 0 48 48" className="h-10 w-10 text-white" aria-hidden>
                      <ellipse cx="18" cy="34" rx="7" ry="5" fill="currentColor" />
                      <rect x="23" y="12" width="3.2" height="23" rx="1.2" fill="currentColor" />
                      <path
                        d="M26.2 12.2 C32 10 38 11.5 40 16.5 L40 22 C36.5 19.2 31.5 18 26.2 19.2 Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {isListening ? (
              <div className="voice-listen-pulse">
                <Mic size={14} />
              </div>
            ) : null}
          </div>
        </div>

        <div className="voice-status-pill">
          <span className={`voice-status-dot ${isActive ? 'active' : ''}`} />
          <span>{statusText}</span>
          <span className="ml-2 tabular-nums opacity-80">
            {String(Math.floor(elapsed / 60)).padStart(2, '0')}:{String(elapsed % 60).padStart(2, '0')}
          </span>
        </div>

        {noHindiVoice ? (
          <p className="voice-mode-voice-warn">Chrome browser recommended for best voice</p>
        ) : null}

        <div className="voice-chat-panel" ref={chatScrollRef}>
          {turns.map((t, i) => (
            <div key={i} className="voice-chat-turn">
              {t.user ? (
                <div className="voice-bubble voice-bubble-user">
                  <span className="voice-bubble-label">You</span>
                  <p>{t.user}</p>
                </div>
              ) : null}
              {t.ai ? (
                <div className="voice-bubble voice-bubble-ai">
                  <span className="voice-bubble-label">Rhythm AI</span>
                  <p>{t.ai}</p>
                </div>
              ) : null}
            </div>
          ))}
          {liveUserText ? (
            <div className="voice-bubble voice-bubble-user voice-bubble-live">
              <span className="voice-bubble-label">Listening...</span>
              <p>{liveUserText}</p>
            </div>
          ) : null}
        </div>

        <div className={`voice-visualizer ${isActive ? 'active' : ''}`}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="voice-vis-bar" style={{ animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>
      </div>

      <footer className="voice-mode-footer">
        <p className="voice-examples-title">Try saying</p>
        <div className="voice-examples-list">
          {chips.map((ex) => (
            <button
              key={ex}
              type="button"
              className="voice-example-chip"
              onClick={() => {
                stopListening()
                setLiveUserText('')
                setState('thinking')
                setStatusText('Jawab de rahi hoon...')
                setTimeout(() => {
                  const result = processAiQuery(ex, role, childView)
                  speakAndRespond(ex, result.speak, result)
                }, THINK_MS)
              }}
            >
              {ex}
            </button>
          ))}
        </div>

        {state === 'idle' || micError ? (
          <button type="button" className="voice-mode-mic-btn" onClick={startListening}>
            <Mic size={18} />
            {micError ? 'Mic on karein' : 'Boliye'}
          </button>
        ) : null}
      </footer>
    </div>
  )
}
