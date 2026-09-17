import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { ChatPanel } from '@/components/chat/ChatPanel'

export default function ChildChat() {
  return (
    <PageContainer>
      <PageHeader title="Messages" description="Chat with Jayesh Patel — send a practice update." />
      <ChatPanel className="h-[min(640px,calc(100vh-16rem))]" />
    </PageContainer>
  )
}
