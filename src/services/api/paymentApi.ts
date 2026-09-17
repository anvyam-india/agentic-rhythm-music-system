import type { Payment } from '@/types/payment'
import { mockRequest } from './apiClient'
import { mockPayments } from '../mock/mockPayments'

export const paymentApi = {
  async getPayments(): Promise<Payment[]> {
    return mockRequest([...mockPayments])
  },

  async getByStudent(studentId: string): Promise<Payment[]> {
    return mockRequest(mockPayments.filter((p) => p.studentId === studentId))
  },
}
