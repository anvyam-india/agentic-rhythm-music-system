import type { Payment } from '@/types/payment'

export const mockPayments: Payment[] = [
  { id: 'pay-001', studentId: 'student-001', studentName: 'Aarav Patel', month: 'September 2026', amount: 3500, status: 'paid', paidAt: '2026-09-01', dueDate: '2026-09-01', receiptId: 'RCP-2026-0901' },
  { id: 'pay-002', studentId: 'student-001', studentName: 'Aarav Patel', month: 'October 2026', amount: 3500, status: 'pending', dueDate: '2026-10-01' },
  { id: 'pay-003', studentId: 'student-001', studentName: 'Aarav Patel', month: 'August 2026', amount: 3500, status: 'paid', paidAt: '2026-08-01', dueDate: '2026-08-01', receiptId: 'RCP-2026-0801' },
  { id: 'pay-004', studentId: 'student-002', studentName: 'Riya Shah', month: 'September 2026', amount: 3000, status: 'paid', paidAt: '2026-09-02', dueDate: '2026-09-01', receiptId: 'RCP-2026-0902' },
  { id: 'pay-005', studentId: 'student-003', studentName: 'Krish Mehta', month: 'September 2026', amount: 4000, status: 'paid', paidAt: '2026-09-01', dueDate: '2026-09-01', receiptId: 'RCP-2026-0903' },
  { id: 'pay-006', studentId: 'student-004', studentName: 'Dev Patel', month: 'September 2026', amount: 3500, status: 'overdue', dueDate: '2026-09-01' },
  { id: 'pay-007', studentId: 'student-005', studentName: 'Anaya Shah', month: 'September 2026', amount: 4500, status: 'paid', paidAt: '2026-08-28', dueDate: '2026-09-01', receiptId: 'RCP-2026-0904' },
  { id: 'pay-008', studentId: 'student-006', studentName: 'Vivaan Desai', month: 'September 2026', amount: 3500, status: 'paid', paidAt: '2026-09-03', dueDate: '2026-09-01', receiptId: 'RCP-2026-0905' },
  { id: 'pay-009', studentId: 'student-007', studentName: 'Ishaan Joshi', month: 'September 2026', amount: 2800, status: 'pending', dueDate: '2026-09-01' },
  { id: 'pay-010', studentId: 'student-008', studentName: 'Myra Kapoor', month: 'September 2026', amount: 4000, status: 'paid', paidAt: '2026-09-01', dueDate: '2026-09-01', receiptId: 'RCP-2026-0906' },
  { id: 'pay-011', studentId: 'student-009', studentName: 'Kabir Trivedi', month: 'September 2026', amount: 4500, status: 'paid', paidAt: '2026-09-01', dueDate: '2026-09-01', receiptId: 'RCP-2026-0907' },
  { id: 'pay-012', studentId: 'student-010', studentName: 'Sara Banerjee', month: 'September 2026', amount: 3000, status: 'overdue', dueDate: '2026-09-01' },
  { id: 'pay-013', studentId: 'student-011', studentName: 'Aryan Chauhan', month: 'September 2026', amount: 3500, status: 'paid', paidAt: '2026-09-04', dueDate: '2026-09-01', receiptId: 'RCP-2026-0908' },
  { id: 'pay-014', studentId: 'student-012', studentName: 'Diya Mehta', month: 'September 2026', amount: 4000, status: 'paid', paidAt: '2026-09-02', dueDate: '2026-09-01', receiptId: 'RCP-2026-0909' },
  { id: 'pay-015', studentId: 'student-015', studentName: 'Harsh Solanki', month: 'September 2026', amount: 3500, status: 'overdue', dueDate: '2026-09-01' },
  { id: 'pay-016', studentId: 'student-016', studentName: 'Kiara Dave', month: 'September 2026', amount: 2800, status: 'paid', paidAt: '2026-09-01', dueDate: '2026-09-01', receiptId: 'RCP-2026-0910' },
]
