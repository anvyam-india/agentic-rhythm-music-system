import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'

const ITEMS = [
  { title: "Guitar — Level 2", subtitle: "Today 18:00", meta: "Jayesh Patel" },
  { title: "Vocal crossover", subtitle: "Fri 20:00", meta: "Optional ensemble" }
] as const

export default function Classes() {
  return (
    <PageContainer>
      <PageHeader title="My Classes" description="Upcoming and past sessions." />
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
