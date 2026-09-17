import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { useApp } from '@/context/AppContext'

export default function SharedSettings() {
  const { currentUser, currentBranch } = useApp()

  return (
    <PageContainer>
      <PageHeader title="Settings" description="Demo preferences for your Rhythmonic workspace." />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="space-y-3 pt-5">
            <p className="text-sm font-medium text-[var(--text)]">Appearance</p>
            <p className="text-sm text-[var(--text-secondary)]">
              Rhythmonic uses a fixed light theme for a clean academy look.
            </p>
            <Badge variant="accent">White theme · always on</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-2 pt-5 text-sm text-[var(--text-secondary)]">
            <p className="font-medium text-[var(--text)]">Signed in as</p>
            <p>{currentUser.name}</p>
            <p>{currentUser.email}</p>
            <p>{currentUser.title}</p>
            <p className="pt-2 text-xs text-[var(--text-muted)]">Branch: {currentBranch.name}</p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
