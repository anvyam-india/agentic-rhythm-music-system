import { processAiQuery } from '@/utils/aiEngine'

export interface VoiceExample {
  id: string
  exampleHi: string
  answerSpeak: string
  answerHi: string
  keywords: string[]
}

export const rhythmVoiceExamples: VoiceExample[] = [
  {
    id: 'fees',
    exampleHi: 'Is month kitne students ki fees pending hain?',
    answerHi: 'Pending fees right panel mein.',
    answerSpeak: 'Pending fees right panel mein hain.',
    keywords: ['fees', 'pending', 'month'],
  },
  {
    id: 'fees-hi',
    exampleHi: 'इस मंथ कितने स्टूडेंट की फीस पेंडिंग है',
    answerHi: 'Pending fees detail right panel mein.',
    answerSpeak: 'Fees pending students right panel mein hain.',
    keywords: ['फीस', 'पेंडिंग', 'स्टूडेंट'],
  },
]

export function matchVoiceQuery(transcript: string): { display: string; speak: string } {
  const result = processAiQuery(transcript)
  return { display: result.answer, speak: result.speak }
}
