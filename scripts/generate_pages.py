#!/usr/bin/env python3
"""Generate standard admin list pages for Rhythmonic demo."""
import os

ROOT = os.path.join(os.path.dirname(__file__), "..", "src", "pages", "admin")

PAGES = {
    "Courses.tsx": ("Courses", "Structured programmes across guitar, keyboard, vocal, and drums.", "BookOpen", [
        ("Guitar Foundation", "12 weeks · Beginner", "248 enrolled"),
        ("Guitar Level 2", "16 weeks · Intermediate", "86 enrolled"),
        ("Keyboard Explorer", "10 weeks · Beginner", "64 enrolled"),
        ("Vocal Intermediate", "14 weeks · Intermediate", "52 enrolled"),
        ("Drums Groove Lab", "12 weeks · Level 1", "38 enrolled"),
    ]),
    "Batches.tsx": ("Batches", "Live cohorts mapped to rooms and faculty.", "Layers", [
        ("Guitar L2 — Evening", "Jayesh Patel · Room 03", "18 students"),
        ("Keyboard Beginner", "Riya Mehta · Room 02", "14 students"),
        ("Vocal Intermediate", "Amit Shah · Room 01", "16 students"),
        ("Drums L1", "Neha Desai · Room 04", "11 students"),
    ]),
    "Schedule.tsx": ("Class Schedule", "Today and upcoming sessions across the academy.", "Calendar", [
        ("18:00 · Guitar L2", "Jayesh Patel · Room 03", "8 students"),
        ("19:00 · Keyboard Beginner", "Riya Mehta · Room 02", "6 students"),
        ("20:00 · Vocal Intermediate", "Amit Shah · Room 01", "10 students"),
    ]),
    "Attendance.tsx": ("Attendance", "Daily attendance snapshot and exceptions.", "ClipboardCheck", [
        ("Guitar L2 — Evening", "92% present today", "1 late"),
        ("Keyboard Beginner", "88% present today", "2 absent"),
        ("Vocal Intermediate", "95% present today", "All clear"),
    ]),
    "Assignments.tsx": ("Assignments", "Academy-wide homework and practice tasks.", "FileText", [
        ("Chord transition drill", "Guitar · Due 20 Sep", "24 active"),
        ("Scale practice C major", "Keyboard · Due 19 Sep", "14 active"),
        ("Breath control exercise", "Vocal · Due 21 Sep", "16 active"),
    ]),
    "Payments.tsx": ("Fees & Payments", "Collections, outstanding fees, and receipts.", "Wallet", [
        ("September tuition", "₹4.82L collected", "92% on time"),
        ("Outstanding — Level 2", "₹42,500 pending", "6 students"),
        ("Workshop fees", "₹18,200 collected", "Open mic prep"),
    ]),
    "Studio.tsx": ("Recording Studio", "Room bookings and demo session queue.", "Mic2", [
        ("Studio A", "Booked · 17:30 — Aarav Patel", "Guitar demo"),
        ("Studio B", "Available", "Next slot 19:00"),
        ("Live room", "Maintenance window Sat", "Deep clean"),
    ]),
    "Events.tsx": ("Events", "Recitals, workshops, and open mic nights.", "CalendarDays", [
        ("Monsoon Open Mic", "28 Sep · Auditorium", "42 registered"),
        ("Parent Showcase", "12 Oct · Main hall", "Registration open"),
        ("Rhythm Workshop", "5 Oct · Room 01", "18 seats left"),
    ]),
    "Reports.tsx": ("Reports", "Export-ready analytics for leadership reviews.", "BarChart3", [
        ("Monthly enrollment", "PDF · Updated today", "248 students"),
        ("Revenue summary", "Excel · September", "₹4.82L"),
        ("Faculty utilization", "PDF · Weekly", "18 teachers"),
    ]),
    "Settings.tsx": ("Academy Settings", "Branding, notifications, and demo preferences.", "Settings", [
        ("Academy profile", "Rhythmonic Music Studio", "Ahmedabad"),
        ("Fee reminders", "SMS + email", "Enabled"),
        ("AI practice insights", "Beta", "Enabled for all batches"),
    ]),
    "Academy.tsx": ("Academy Overview", "Branches, rooms, and instrument inventory.", "Building2", [
        ("Satellite Branch", "12 active rooms", "248 students"),
        ("Room 03", "Guitar lab · 12 seats", "Evening batch"),
        ("Instrument inventory", "24 guitars · 8 keyboards", "Maintained weekly"),
    ]),
    "Practice.tsx": ("Practice Activity", "Engagement trends and inactive student alerts.", "Music", [
        ("Weekly minutes", "↓ 8% vs last week", "Level 2 guitar"),
        ("Inactive 7+ days", "3 students flagged", "AI alert sent"),
        ("Top streak", "Aarav Patel · 12 days", "Guitar L2"),
    ]),
    "Communication.tsx": ("Communication", "Broadcasts and parent messaging overview.", "MessageSquare", [
        ("Fee reminder blast", "Sent to 42 parents", "98% delivered"),
        ("Open mic invite", "Scheduled Fri 10:00", "Draft ready"),
        ("Teacher channel", "Jayesh ↔ Admin", "Room 03 confirmed"),
    ]),
    "Learning.tsx": ("Learning Progress", "Curriculum completion across programmes.", "TrendingUp", [
        ("Guitar Level 2", "78% avg completion", "Aarav at 78%"),
        ("Keyboard Beginner", "65% avg completion", "On track"),
        ("Vocal Intermediate", "84% avg completion", "Strong month"),
    ]),
    "AiInsights.tsx": ("AI Insights", "Predictive alerts powered by practice and attendance data.", "Sparkles", [
        ("Practice drop", "Level 2 guitar batches", "Review plan"),
        ("Attendance risk", "5 students below 75%", "Counselor follow-up"),
        ("Improvement spotlight", "12 students up this month", "Share with faculty"),
    ]),
    "Curriculum.tsx": ("Curriculum", "Module maps and assessment rubrics.", "BookMarked", [
        ("Guitar L2 Module 3", "Barre chords + rhythm", "6 lessons"),
        ("Keyboard scales", "Major + minor patterns", "4 lessons"),
        ("Vocal breath module", "Diaphragm drills", "5 lessons"),
    ]),
    "Teachers.tsx": ("Teachers", "Faculty roster, load, and performance.", "GraduationCap", [
        ("Jayesh Patel", "Guitar · 28 students", "98% attendance"),
        ("Riya Mehta", "Keyboard · 22 students", "96% attendance"),
        ("Amit Shah", "Vocal · 24 students", "97% attendance"),
        ("Neha Desai", "Drums · 18 students", "94% attendance"),
    ]),
}

TEMPLATE = '''import {{ {icon} }} from 'lucide-react'
import {{ PageContainer }} from '@/components/layout/PageContainer/PageContainer'
import {{ PageHeader }} from '@/components/ui/PageHeader/PageHeader'
import {{ Card, CardContent, CardHeader, CardTitle }} from '@/components/ui/Card/Card'
import {{ Badge }} from '@/components/ui/Badge/Badge'

const ITEMS = [
{items}
] as const

export default function {component}() {{
  return (
    <PageContainer>
      <PageHeader
        title="{title}"
        description="{desc}"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {{ITEMS.map((item) => (
          <Card key={{item.title}} hover className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">{{item.title}}</CardTitle>
            </CardHeader>
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

ICON_MAP = {
    "BookOpen": "BookOpen",
    "Layers": "Layers",
    "Calendar": "Calendar",
    "ClipboardCheck": "ClipboardCheck",
    "FileText": "FileText",
    "Wallet": "Wallet",
    "Mic2": "Mic2",
    "CalendarDays": "CalendarDays",
    "BarChart3": "BarChart3",
    "Settings": "Settings",
    "Building2": "Building2",
    "Music": "Music",
    "MessageSquare": "MessageSquare",
    "TrendingUp": "TrendingUp",
    "Sparkles": "Sparkles",
    "BookMarked": "BookMarked",
    "GraduationCap": "GraduationCap",
}

os.makedirs(ROOT, exist_ok=True)
for filename, (title, desc, icon_key, rows) in PAGES.items():
    component = filename.replace(".tsx", "")
    items = ",\n".join(
        f'  {{ title: "{r[0]}", subtitle: "{r[1]}", meta: "{r[2]}" }}' for r in rows
    )
    icon = ICON_MAP[icon_key]
    content = TEMPLATE.format(
        icon=icon,
        items=items,
        component=component,
        title=title,
        desc=desc,
    )
    path = os.path.join(ROOT, filename)
    with open(path, "w") as f:
        f.write(content)
    print("wrote", path)

print("done")
