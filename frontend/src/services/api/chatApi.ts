import type { ChatConversation, ChatMessage } from '@/types/chat'
import { mockRequest } from './apiClient'
import { mockConversations, mockMessages } from '../mock/mockChat'

export const chatApi = {
  async getConversations(): Promise<ChatConversation[]> {
    return mockRequest(mockConversations.map((c) => ({ ...c })))
  },

  async getMessages(conversationId: string): Promise<ChatMessage[]> {
    return mockRequest(
      mockMessages.filter((m) => m.conversationId === conversationId),
      0,
    )
  },

  async sendMessage(
    conversationId: string,
    content: string,
    senderId: string,
    senderName: string,
    senderRole: ChatMessage['senderRole'],
  ): Promise<ChatMessage> {
    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId,
      senderName,
      senderRole,
      content,
      timestamp: new Date().toISOString(),
      read: true,
    }
    mockMessages.push(message)
    const conv = mockConversations.find((c) => c.id === conversationId)
    if (conv) {
      conv.lastMessage = content
      conv.lastMessageAt = message.timestamp
    }
    return mockRequest(message)
  },
}
