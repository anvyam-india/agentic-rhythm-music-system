const VOICE_SCORES: Array<{ test: (v: SpeechSynthesisVoice) => boolean; score: number }> = [
  { test: (v) => /google/i.test(v.name) && /hindi|हिन्दी|हिंदी/i.test(v.name), score: 120 },
  { test: (v) => /microsoft.*heera/i.test(v.name), score: 115 },
  { test: (v) => /lekha/i.test(v.name), score: 112 },
  { test: (v) => v.lang === 'hi-IN', score: 40 },
  { test: (v) => v.lang.startsWith('hi'), score: 30 },
  { test: (v) => /hindi|हिन्दी|हिंदी/i.test(v.name), score: 20 },
  { test: (v) => v.lang.startsWith('en'), score: 5 },
]

let cachedHindiVoice: SpeechSynthesisVoice | null = null
let voiceLoadPromise: Promise<SpeechSynthesisVoice | null> | null = null

const getAllVoices = (): SpeechSynthesisVoice[] => {
  if (!('speechSynthesis' in window)) return []
  return speechSynthesis.getVoices()
}

const isUsableVoice = (v: SpeechSynthesisVoice): boolean => {
  if (v.lang.startsWith('hi')) return true
  if (/hindi|हिन्दी|हिंदी|heera|lekha/i.test(v.name)) return true
  return v.lang.startsWith('en')
}

const scoreVoice = (v: SpeechSynthesisVoice): number => {
  let score = 0
  for (const { test, score: pts } of VOICE_SCORES) {
    if (test(v)) score += pts
  }
  if (v.localService) score += 15
  return score
}

const pickBestVoice = (): SpeechSynthesisVoice | null => {
  const all = getAllVoices()
  const candidates = all.filter(isUsableVoice)
  const pool = candidates.length > 0 ? candidates : all
  if (pool.length === 0) return null
  return [...pool].sort((a, b) => scoreVoice(b) - scoreVoice(a))[0] ?? null
}

export const preloadHindiVoice = (): Promise<SpeechSynthesisVoice | null> => {
  if (voiceLoadPromise) return voiceLoadPromise
  voiceLoadPromise = new Promise((resolve) => {
    const finalize = () => {
      cachedHindiVoice = pickBestVoice()
      resolve(cachedHindiVoice)
    }
    if (getAllVoices().length > 0) {
      finalize()
      return
    }
    let settled = false
    const done = () => {
      if (settled) return
      settled = true
      speechSynthesis.removeEventListener('voiceschanged', done)
      finalize()
    }
    speechSynthesis.addEventListener('voiceschanged', done)
    // Kick Chrome voice list
    try {
      speechSynthesis.getVoices()
    } catch {
      /* ignore */
    }
    setTimeout(done, 1200)
  })
  return voiceLoadPromise
}

export const normalizeHindiSpeakText = (text: string): string =>
  text.replace(/₹/g, ' rupees ').replace(/%/g, ' percent ').replace(/\s+/g, ' ').trim()

const pause = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

const unlockSpeech = () => {
  try {
    speechSynthesis.cancel()
    speechSynthesis.resume()
    const warm = new SpeechSynthesisUtterance(' ')
    warm.volume = 0
    warm.rate = 2
    speechSynthesis.speak(warm)
    speechSynthesis.cancel()
  } catch {
    /* ignore */
  }
}

const speakSentence = (text: string, voice: SpeechSynthesisVoice | null): Promise<void> =>
  new Promise((resolve) => {
    const clean = normalizeHindiSpeakText(text)
    if (!clean) {
      resolve()
      return
    }
    const u = new SpeechSynthesisUtterance(clean)
    u.lang = voice?.lang?.startsWith('hi') ? 'hi-IN' : voice?.lang || 'hi-IN'
    u.rate = 0.9
    u.pitch = 1.05
    u.volume = 1
    if (voice) u.voice = voice
    let done = false
    const finish = () => {
      if (done) return
      done = true
      resolve()
    }
    u.onend = finish
    u.onerror = finish
    try {
      speechSynthesis.resume()
      speechSynthesis.speak(u)
    } catch {
      finish()
    }
    // Safety timeout if browser stalls
    window.setTimeout(finish, Math.min(12000, 800 + clean.length * 80))
  })

export const speakHindi = async (text: string, onEnd?: () => void) => {
  if (!('speechSynthesis' in window)) {
    onEnd?.()
    return
  }
  unlockSpeech()
  await pause(100)
  let voice = await preloadHindiVoice()
  if (!voice) {
    await pause(500)
    voiceLoadPromise = null
    voice = await preloadHindiVoice()
  }
  unlockSpeech()
  await pause(60)
  const chunks = normalizeHindiSpeakText(text)
    .split(/(?<=[।.!?,\u0964])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
  const toSpeak = chunks.length > 0 ? chunks : [normalizeHindiSpeakText(text)]
  for (let i = 0; i < toSpeak.length; i++) {
    await speakSentence(toSpeak[i]!, voice)
    if (i < toSpeak.length - 1) await pause(120)
  }
  onEnd?.()
}

export const hasHindiVoice = (): boolean => !!cachedHindiVoice
