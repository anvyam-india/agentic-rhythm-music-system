import type { PracticeSession, PracticePlanItem, PracticeAnalysis, WeeklyPracticeDay } from '@/types/practice'
import type { ProgressSnapshot } from '@/types/progress'
import { mockRequest, MockApiError } from './apiClient'
import {
  mockPracticeSessions,
  mockWeeklyPractice,
  mockPracticePlan,
  mockPracticeAnalysis,
  mockProgress,
} from '../mock/mockPracticeData'

let failPracticeHistoryOnce = false

export const practiceApi = {
  async getHistory(studentId: string): Promise<PracticeSession[]> {
    if (failPracticeHistoryOnce) {
      failPracticeHistoryOnce = false
      await mockRequest(null, 400)
      throw new MockApiError('Unable to load practice history.')
    }
    return mockRequest(mockPracticeSessions.filter((p) => p.studentId === studentId))
  },

  async getWeeklyPractice(): Promise<WeeklyPracticeDay[]> {
    return mockRequest([...mockWeeklyPractice])
  },

  async getPracticePlan(): Promise<PracticePlanItem[]> {
    return mockRequest(mockPracticePlan.map((item) => ({ ...item })))
  },

  async getAnalysis(): Promise<PracticeAnalysis> {
    await mockRequest(null, 1600)
    return mockPracticeAnalysis
  },

  async getProgress(studentId: string): Promise<ProgressSnapshot> {
    return mockRequest({ ...mockProgress, studentId })
  },

  simulateHistoryError(): void {
    failPracticeHistoryOnce = true
  },
}
