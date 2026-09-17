import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'

const ITEMS = [
  { title: "Level 2 Guitar", subtitle: "78% complete", meta: "Module 3 in progress" },
  { title: "Chord transitions", subtitle: "Skill 84%", meta: "Teacher approved" }
] as const

export default function Progress() {
  return (
    <PageContainer>
      <PageHeader title="My Progress" description="Track curriculum milestones for Aarav Patel." />
      <div className="grid gap-4 md:grid-cols-2">
        {ITEMS.map((item) => (
          <Card key={item.title} hover>
            <CardHeader><CardTitle className="text-lg">{item.title}</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-[var(--text-secondary)]">{item.subtitle}</p>
              <Badge variant="accent">{item.meta}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  )
}
