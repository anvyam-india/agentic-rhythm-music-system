import { PageContainer } from '@/components/layout/PageContainer/PageContainer'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card/Card'
import { Badge } from '@/components/ui/Badge/Badge'
import { Progress } from '@/components/ui/Progress/Progress'
import { Tabs } from '@/components/ui/Tabs/Tabs'
import { useState } from 'react'
import { BookOpen, Clock, Users } from 'lucide-react'

const COURSES = [
  {
    title: 'Guitar Foundation',
    level: 'Beginner',
    weeks: 12,
    enrolled: 48,
    teacher: 'Jayesh Patel',
    progress: 62,
    instrument: 'Guitar',
  },
  {
    title: 'Guitar Level 2',
    level: 'Level 2',
    weeks: 16,
    enrolled: 32,
    teacher: 'Jayesh Patel',
    progress: 78,
    instrument: 'Guitar',
  },
  {
    title: 'Keyboard Explorer',
    level: 'Beginner',
    weeks: 10,
    enrolled: 28,
    teacher: 'Riya Mehta',
    progress: 54,
    instrument: 'Keyboard',
  },
  {
    title: 'Vocal Intermediate',
    level: 'Intermediate',
    weeks: 14,
    enrolled: 24,
    teacher: 'Amit Shah',
    progress: 71,
    instrument: 'Vocal',
  },
  {
    title: 'Drums Groove Lab',
    level: 'Level 1',
    weeks: 12,
    enrolled: 18,
    teacher: 'Neha Desai',
    progress: 49,
    instrument: 'Drums',
  },
  {
    title: 'Piano Advanced',
    level: 'Advanced',
    weeks: 18,
    enrolled: 12,
    teacher: 'Priya Nair',
    progress: 88,
    instrument: 'Piano',
  },
]

export default function Courses() {
  const [tab, setTab] = useState('all')
  const filtered =
    tab === 'all' ? COURSES : COURSES.filter((c) => c.instrument.toLowerCase() === tab)

  return (
    <PageContainer>
      <PageHeader
        title="Courses & academics"
        description="Structured programmes across instruments — curriculum, batch size, and progress."
      />

      <Tabs
        className="mb-5"
        tabs={[
          { id: 'all', label: 'All' },
          { id: 'guitar', label: 'Guitar' },
          { id: 'keyboard', label: 'Keyboard' },
          { id: 'vocal', label: 'Vocal' },
          { id: 'drums', label: 'Drums' },
          { id: 'piano', label: 'Piano' },
        ]}
        active={tab}
        onChange={setTab}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((course) => (
          <Card key={course.title} className="h-full">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <Badge variant="accent">{course.level}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-3 text-xs text-[var(--text-secondary)]">
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} /> {course.weeks} weeks
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users size={12} /> {course.enrolled} enrolled
                </span>
                <span className="inline-flex items-center gap-1">
                  <BookOpen size={12} /> {course.teacher}
                </span>
              </div>
              <Progress label="Avg batch progress" value={course.progress} />
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  )
}
