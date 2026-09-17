import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'

const ITEMS = [
  { title: "Aarav — Chord transitions", subtitle: "AI score 81", meta: "Reviewed today" },
  { title: "Vihaan — Fingerstyle", subtitle: "AI score 87", meta: "Pending" }
] as const

export default function PracticeReview() {
  return (
    <PageContainer>
      <PageHeader title="Practice Review" description="Listen to uploads and leave AI-assisted notes." />
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
