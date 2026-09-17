export interface PracticeSession {
  id: string
  studentId: string
  date: string
  duration: number
  instrument: string
  practiceType: string
  aiScore: number
}

export interface PracticePlanItem {
  id: string
  title: string
  duration: number
  icon: string
  completed: boolean
}

export interface PracticeAnalysis {
  pitchAccuracy: number
  rhythmAccuracy: number
  tempoConsistency: number
  technique: number
  overall: number
  feedback: string[]
  recommendations: { title: string; duration: number }[]
  goodPoints?: string[]
  weakPoints?: string[]
}

export interface WeeklyPracticeDay {
  day: string
  minutes: number
}
