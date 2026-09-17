export type AssignmentDifficulty = 'easy' | 'medium' | 'hard'
export type AssignmentStatus = 'active' | 'completed' | 'overdue'

export interface Assignment {
  id: string
  title: string
  instrument: string
  skill: string
  description: string
  practiceDuration: number
  dueDate: string
  difficulty: AssignmentDifficulty
  status: AssignmentStatus
  teacherId: string
  teacherName: string
  studentIds: string[]
  createdAt: string
  /** Teacher reference recording label (demo) */
  teacherRecording?: string
  hasReferenceRecording?: boolean
}

export interface AssignmentFormData {
  title: string
  instrument: string
  skill: string
  description: string
  practiceDuration: number
  dueDate: string
  difficulty: AssignmentDifficulty
  teacherRecording?: string
  hasReferenceRecording?: boolean
}

export interface AssignmentSubmissionAnalysis {
  overall: number
  pitch: number
  rhythm: number
  tempo: number
  technique: number
  goodPoints: string[]
  weakPoints: string[]
  feedback: string
}
