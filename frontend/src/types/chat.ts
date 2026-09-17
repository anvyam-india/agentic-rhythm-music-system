export type ChatParticipantRole = 'teacher' | 'parent' | 'student'

export interface ChatMessage {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  senderRole: ChatParticipantRole
  content: string
  timestamp: string
  read: boolean
  attachmentType?: 'image' | 'audio'
  attachmentLabel?: string
}

export interface ChatConversation {
  id: string
  title: string
  participants: { id: string; name: string; role: ChatParticipantRole }[]
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
  online: boolean
}
