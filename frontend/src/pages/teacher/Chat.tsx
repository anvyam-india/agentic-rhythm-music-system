import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { ChatPanel } from '@/components/chat/ChatPanel'

export default function TeacherChat() {
  return (
    <PageContainer contentClassName="min-h-[calc(100vh-12rem)]">
      <PageHeader title="Communication" description="Message parents and students — try sending a note in the demo thread." />
      <ChatPanel className="h-[min(640px,calc(100vh-16rem))]" />
    </PageContainer>
  )
}
