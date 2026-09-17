export type PaymentStatus = 'paid' | 'pending' | 'overdue'

export interface Payment {
  id: string
  studentId: string
  studentName: string
  month: string
  amount: number
  status: PaymentStatus
  paidAt?: string
  dueDate: string
  receiptId?: string
}
