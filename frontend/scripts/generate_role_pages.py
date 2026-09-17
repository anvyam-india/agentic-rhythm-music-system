#!/usr/bin/env python3
import os

BASE = os.path.join(os.path.dirname(__file__), "..", "src", "pages")

def simple_page(folder, name, title, desc, items):
    component = name.replace(".tsx", "")
    items_str = ",\n".join(
        f'  {{ title: "{a}", subtitle: "{b}", meta: "{c}" }}' for a, b, c in items
    )
    content = f'''import {{ PageContainer }} from '@/components/layout/PageContainer/PageContainer'
import {{ PageHeader }} from '@/components/ui/PageHeader/PageHeader'
import {{ Card, CardContent, CardHeader, CardTitle }} from '@/components/ui/Card/Card'
import {{ Badge }} from '@/components/ui/Badge/Badge'

const ITEMS = [
{items_str}
] as const

export default function {component}() {{
  return (
    <PageContainer>
      <PageHeader title="{title}" description="{desc}" />
      <div className="grid gap-4 md:grid-cols-2">
        {{ITEMS.map((item) => (
          <Card key={{item.title}} hover>
            <CardHeader><CardTitle className="text-lg">{{item.title}}</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-[var(--text-secondary)]">{{item.subtitle}}</p>
              <Badge variant="accent">{{item.meta}}</Badge>
            </CardContent>
          </Card>
        ))}}
      </div>
    </PageContainer>
  )
}}
'''
    path = os.path.join(BASE, folder, name)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content)

teacher = [
    ("Attendance.tsx", "Attendance", "Mark and review attendance across your batches.", [
        ("Guitar L2 — Evening", "92% this week", "Jayesh Patel"),
        ("Make-up session", "Sat 11:00", "Room 03"),
    ]),
    ("Evaluation.tsx", "Student Evaluation", "Structured rubrics for monthly assessments.", [
        ("Aarav Patel", "Guitar L2 · Ready for barre module", "Score 82"),
        ("Dhruv Shah", "Needs rhythm work", "Score 71"),
    ]),
    ("PracticeReview.tsx", "Practice Review", "Listen to uploads and leave AI-assisted notes.", [
        ("Aarav — Chord transitions", "AI score 81", "Reviewed today"),
        ("Vihaan — Fingerstyle", "AI score 87", "Pending"),
    ]),
    ("Calendar.tsx", "Calendar", "Your teaching calendar and academy events.", [
        ("Today · Guitar L2", "18:00 Room 03", "8 students"),
        ("Open mic prep", "28 Sep", "Academy event"),
    ]),
    ("Profile.tsx", "Profile", "Jayesh Patel — guitar faculty profile and preferences.", [
        ("Instruments", "Guitar, Ukulele", "8 years experience"),
        ("Students", "28 active", "Evening batches"),
    ]),
]

child = [
    ("Progress.tsx", "My Progress", "Track curriculum milestones for Aarav Patel.", [
        ("Level 2 Guitar", "78% complete", "Module 3 in progress"),
        ("Chord transitions", "Skill 84%", "Teacher approved"),
    ]),
    ("Assignments.tsx", "Assignments", "Homework from Jayesh Patel and practice targets.", [
        ("Barre chord drill", "Due 20 Sep", "40 min practice"),
        ("Rhythm pattern #4", "Due 18 Sep", "Medium"),
    ]),
    ("Achievements.tsx", "Achievements", "Badges earned through practice and performances.", [
        ("12 Day Streak", "Earned 16 Sep", "Unlocked"),
        ("First Performance", "Open mic Mar 2026", "Unlocked"),
    ]),
    ("Calendar.tsx", "Calendar", "Classes, workshops, and recitals.", [
        ("Guitar L2", "Today 18:00", "Room 03"),
        ("Monsoon Open Mic", "28 Sep", "Register now"),
    ]),
    ("Profile.tsx", "Profile", "Aarav Patel — student profile and preferences.", [
        ("Instrument", "Guitar Level 2", "Jayesh Patel"),
        ("Parent", "Mr. Rajesh Patel", "Family view enabled"),
    ]),
    ("Learning.tsx", "My Learning", "Courses, modules, and lesson notes.", [
        ("Module 3 — Barre chords", "6 lessons", "In progress"),
        ("Ear training mini", "Bonus track", "Optional"),
    ]),
    ("Classes.tsx", "My Classes", "Upcoming and past sessions.", [
        ("Guitar — Level 2", "Today 18:00", "Jayesh Patel"),
        ("Vocal crossover", "Fri 20:00", "Optional ensemble"),
    ]),
]

for fname, title, desc, items in teacher:
    simple_page("teacher", fname, title, desc, items)

for fname, title, desc, items in child:
    simple_page("child", fname, title, desc, items)

print("teacher/child simple pages done")
