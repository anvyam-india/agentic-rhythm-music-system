import type { ChatConversation, ChatMessage } from '@/types/chat'
import type { Achievement, AIInsight, ChartPoint } from '@/types/common'

export const mockConversations: ChatConversation[] = [
  {
    id: 'conv-001',
    title: "Aarav's Parent",
    participants: [
      { id: 'teacher-001', name: 'Jayesh Patel', role: 'teacher' },
      { id: 'parent-001', name: 'Mr. Rajesh Patel', role: 'parent' },
    ],
    lastMessage: 'Please continue the rhythm exercises.',
    lastMessageAt: '2026-09-16T19:20:00',
    unreadCount: 0,
    online: true,
  },
  {
    id: 'conv-002',
    title: 'Aarav Patel',
    participants: [
      { id: 'teacher-001', name: 'Jayesh Patel', role: 'teacher' },
      { id: 'student-001', name: 'Aarav Patel', role: 'student' },
    ],
    lastMessage: 'Sir, I practiced the chord transitions today!',
    lastMessageAt: '2026-09-16T20:05:00',
    unreadCount: 1,
    online: true,
  },
  {
    id: 'conv-003',
    title: "Riya's Parent",
    participants: [
      { id: 'teacher-002', name: 'Riya Mehta', role: 'teacher' },
      { id: 'parent-002', name: 'Mrs. Meena Shah', role: 'parent' },
    ],
    lastMessage: 'Thank you for the update on scales.',
    lastMessageAt: '2026-09-15T17:40:00',
    unreadCount: 0,
    online: false,
  },
  {
    id: 'conv-004',
    title: 'Krish Mehta',
    participants: [
      { id: 'teacher-003', name: 'Amit Shah', role: 'teacher' },
      { id: 'student-003', name: 'Krish Mehta', role: 'student' },
    ],
    lastMessage: 'I will practice breath drills tonight.',
    lastMessageAt: '2026-09-15T21:10:00',
    unreadCount: 0,
    online: false,
  },
  {
    id: 'conv-005',
    title: 'Academy Admin',
    participants: [
      { id: 'teacher-001', name: 'Jayesh Patel', role: 'teacher' },
      { id: 'user-admin', name: 'Kaushal Admin', role: 'teacher' },
    ],
    lastMessage: 'Room 03 is confirmed for evening batch.',
    lastMessageAt: '2026-09-14T11:00:00',
    unreadCount: 0,
    online: true,
  },
]

export const mockMessages: ChatMessage[] = [
  {
    id: 'msg-001',
    conversationId: 'conv-001',
    senderId: 'teacher-001',
    senderName: 'Jayesh Patel',
    senderRole: 'teacher',
    content: 'Aarav has improved a lot this week.',
    timestamp: '2026-09-16T19:10:00',
    read: true,
  },
  {
    id: 'msg-002',
    conversationId: 'conv-001',
    senderId: 'parent-001',
    senderName: 'Mr. Rajesh Patel',
    senderRole: 'parent',
    content: 'Thank you sir.',
    timestamp: '2026-09-16T19:15:00',
    read: true,
  },
  {
    id: 'msg-003',
    conversationId: 'conv-001',
    senderId: 'teacher-001',
    senderName: 'Jayesh Patel',
    senderRole: 'teacher',
    content: 'Please continue the rhythm exercises.',
    timestamp: '2026-09-16T19:20:00',
    read: true,
  },
  {
    id: 'msg-004',
    conversationId: 'conv-002',
    senderId: 'student-001',
    senderName: 'Aarav Patel',
    senderRole: 'student',
    content: 'Sir, I practiced the chord transitions today!',
    timestamp: '2026-09-16T20:05:00',
    read: false,
  },
  {
    id: 'msg-005',
    conversationId: 'conv-002',
    senderId: 'teacher-001',
    senderName: 'Jayesh Patel',
    senderRole: 'teacher',
    content: 'Great work! Upload your practice for AI analysis.',
    timestamp: '2026-09-16T19:50:00',
    read: true,
  },
]

export const mockAchievements: Achievement[] = [
  {
    id: 'ach-001',
    title: 'Level 1 Completed',
    description: 'Finished Beginner Guitar curriculum',
    icon: 'trophy',
    earnedAt: '2025-12-10',
    unlocked: true,
  },
  {
    id: 'ach-002',
    title: '30 Day Practice Streak',
    description: 'Practiced for 30 consecutive days',
    icon: 'flame',
    unlocked: false,
  },
  {
    id: 'ach-003',
    title: 'First Performance',
    description: 'Performed at academy open mic',
    icon: 'guitar',
    earnedAt: '2026-03-22',
    unlocked: true,
  },
  {
    id: 'ach-004',
    title: 'Rhythm Challenge',
    description: 'Scored 80%+ on rhythm assessment',
    icon: 'music',
    earnedAt: '2026-06-15',
    unlocked: true,
  },
  {
    id: 'ach-005',
    title: 'Monthly Star Student',
    description: 'Recognised as top performer in August',
    icon: 'medal',
    unlocked: false,
  },
  {
    id: 'ach-006',
    title: '12 Day Streak',
    description: 'Current practice streak milestone',
    icon: 'flame',
    earnedAt: '2026-09-16',
    unlocked: true,
  },
]

export const mockAIInsights: AIInsight[] = [
  {
    id: 'ai-001',
    title: 'Practice engagement dropped',
    description: 'Practice engagement dropped by 8% this week across Level 2 guitar batches.',
    severity: 'warning',
    category: 'Practice',
  },
  {
    id: 'ai-002',
    title: 'Inactive practice alert',
    description: '3 students have not practiced for 7+ days.',
    severity: 'warning',
    category: 'Practice',
  },
  {
    id: 'ai-003',
    title: 'Attendance risk',
    description: '5 students have attendance below 75%.',
    severity: 'warning',
    category: 'Attendance',
  },
  {
    id: 'ai-004',
    title: 'Significant improvement',
    description: '12 students showed significant improvement this month.',
    severity: 'success',
    category: 'Progress',
  },
]

export const mockStudentGrowth: ChartPoint[] = [
  { label: 'Apr', value: 180 },
  { label: 'May', value: 195 },
  { label: 'Jun', value: 210 },
  { label: 'Jul', value: 220 },
  { label: 'Aug', value: 235 },
  { label: 'Sep', value: 248 },
]

export const mockRevenueTrend: ChartPoint[] = [
  { label: 'Apr', value: 3.8 },
  { label: 'May', value: 4.1 },
  { label: 'Jun', value: 4.0 },
  { label: 'Jul', value: 4.4 },
  { label: 'Aug', value: 4.6 },
  { label: 'Sep', value: 4.82 },
]

export const mockAttendanceTrend: ChartPoint[] = [
  { label: 'Mon', value: 91 },
  { label: 'Tue', value: 94 },
  { label: 'Wed', value: 89 },
  { label: 'Thu', value: 93 },
  { label: 'Fri', value: 95 },
  { label: 'Sat', value: 92 },
]

export const mockPracticeEngagement: ChartPoint[] = [
  { label: 'W1', value: 82 },
  { label: 'W2', value: 80 },
  { label: 'W3', value: 76 },
  { label: 'W4', value: 78 },
]
