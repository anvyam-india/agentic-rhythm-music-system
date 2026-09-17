import { Building2, Bell, Sparkles, Shield } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import { useApp } from '@/context/AppContext'
import { useToast } from '@/hooks/useToast'

export default function AdminSettingsPage() {
  const { currentBranch, currentUser } = useApp()
  const toast = useToast()

  return (
    <PageContainer>
      <PageHeader
        title="Academy Settings"
        description="Branding, notifications, and demo preferences."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-base">
              <Building2 size={18} /> Academy profile
            </CardTitle>
            <CardDescription>Public-facing academy details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between gap-2 border-b border-[var(--border)] py-2">
              <span className="text-[var(--text-muted)]">Name</span>
              <span className="font-medium text-[var(--text)]">Rhythmonic Music Studio</span>
            </div>
            <div className="flex justify-between gap-2 border-b border-[var(--border)] py-2">
              <span className="text-[var(--text-muted)]">Branch</span>
              <span className="font-medium text-[var(--text)]">{currentBranch.name}</span>
            </div>
            <div className="flex justify-between gap-2 border-b border-[var(--border)] py-2">
              <span className="text-[var(--text-muted)]">Area</span>
              <span className="font-medium text-[var(--text)]">{currentBranch.area}</span>
            </div>
            <div className="flex justify-between gap-2 py-2">
              <span className="text-[var(--text-muted)]">Admin</span>
              <span className="font-medium text-[var(--text)]">{currentUser.name}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-base">
              <Bell size={18} /> Notifications
            </CardTitle>
            <CardDescription>Parent & faculty alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'Fee reminders', meta: 'SMS + email', on: true },
              { label: 'Class reminders', meta: 'Evening batches', on: true },
              { label: 'Practice nudges', meta: 'Family View', on: true },
              { label: 'Concert alerts', meta: 'Event marketing', on: false },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-xl border border-[var(--border)] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-[var(--text)]">{row.label}</p>
                  <p className="text-xs text-[var(--text-muted)]">{row.meta}</p>
                </div>
                <Badge variant={row.on ? 'success' : 'neutral'}>{row.on ? 'On' : 'Off'}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-base">
              <Sparkles size={18} /> AI & practice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-[var(--text-secondary)]">
            <p>Rhythm AI practice insights enabled for all batches.</p>
            <p>Voice assistant (Hindi STT) available from the sidebar orb.</p>
            <Badge variant="accent">White theme · always on</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-base">
              <Shield size={18} /> Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-[var(--text-secondary)]">
              Camera monitoring and restricted zones managed under Cameras module.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.success('Saved', 'Demo settings updated')}
            >
              Save preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
