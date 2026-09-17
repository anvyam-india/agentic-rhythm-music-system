export interface SkillProgress {
  name: string
  percentage: number
}

export interface ProgressSnapshot {
  studentId: string
  overall: number
  skills: SkillProgress[]
  milestones: {
    id: string
    title: string
    status: 'completed' | 'current' | 'upcoming'
  }[]
}
