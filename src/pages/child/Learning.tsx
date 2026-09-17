import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'

const ITEMS = [
  { title: "Module 3 — Barre chords", subtitle: "6 lessons", meta: "In progress" },
  { title: "Ear training mini", subtitle: "Bonus track", meta: "Optional" }
] as const

export default function Learning() {
  return (
    <PageContainer>
      <PageHeader title="My Learning" description="Courses, modules, and lesson notes." />
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
