import { mockPayments } from '@/services/mock/mockPayments'
import { formatCurrency } from '@/utils/format'
import type { Payment } from '@/types/payment'
import type { UserRole } from '@/types/roles'
import type { ChildViewMode } from '@/types/roles'

export interface InsightRow {
  id: string
  name: string
  meta: string
  amount?: number
  status?: string
  /** Direct action — e.g. fee reminder / absent follow-up message */
  actionLabel?: string
  actionLink?: string
}

export interface InsightPanelData {
  title: string
  summary: string
  metrics?: { label: string; value: string; change?: string; positive?: boolean }[]
  highlights?: string[]
  rows?: InsightRow[]
  actions?: { label: string; link: string }[]
  footer?: string
}

export interface AiEngineResult {
  answer: string
  speak: string
  insight?: InsightPanelData
  operation?: {
    type: 'message_teacher' | 'message_parent' | 'open_module'
    toastTitle: string
    toastDescription: string
    path?: string
  }
}

/** Normalize Hindi (Devanagari) + Hinglish into matchable Latin tokens */
export function normalizeAiQuery(raw: string): string {
  let t = raw.toLowerCase().normalize('NFC').trim()
  const pairs: Array<[RegExp, string]> = [
    [/फीस|फ़ीस/g, ' fee '],
    [/पेंडिंग|पेन्डिंग|बकाया|बाकी/g, ' pending '],
    [/स्टूडेंट्स?|स्टूडेंट|विद्यार्थी/g, ' student '],
    [/मंथ|महीन[ेाों]?/g, ' month '],
    [/कितने|कितनी|कितना/g, ' kitne '],
    [/इस/g, ' is '],
    [/मैसेज|मेसेज|संदेश/g, ' message '],
    [/पैरेंट्स?|अभिभावक|पापा|मम्मी|माता|पिता/g, ' parent '],
    [/टीचर|शिक्षक|सर|मैडम/g, ' teacher '],
    [/आरव/g, ' aarav '],
    [/रिया/g, ' riya '],
    [/जयेश/g, ' jayesh '],
    [/ऑफिस|दफ्तर/g, ' office '],
    [/आओ|आना/g, ' aao '],
    [/नहीं\s*आया|आया\s*नहीं|गैरहाज़िर|अनुपस्थित/g, ' absent '],
    [/प्रैक्टिस|अभ्यास/g, ' practice '],
    [/अटेंडेंस|हाज़िरी|हाजिरी/g, ' attendance '],
    [/गिटार/g, ' guitar '],
    [/प्रोग्रेस|प्रगति/g, ' progress '],
    [/ओपन|खोलो|दिखाओ/g, ' open '],
    [/करो|करना|कीजिए|कर दीजिए/g, ' karo '],
    [/बोलो|भेजो|भेज/g, ' message '],
    [/fees?/g, ' fee '],
    [/students?/g, ' student '],
    [/parents?/g, ' parent '],
    [/teachers?/g, ' teacher '],
  ]
  for (const [re, rep] of pairs) {
    t = t.replace(re, rep)
  }
  return t.replace(/[^\p{L}\p{N}\s.-]/gu, ' ').replace(/\s+/g, ' ').trim()
}

export const ADMIN_SUGGESTED = [
  'Is month kitne students ki fees pending hain?',
  'इस मंथ कितने स्टूडेंट की फीस पेंडिंग है',
  'Pichle 7 din se kaun absent hai?',
  'Aaj kitne students absent hain?',
  'Kaunse students overdue fees hain?',
  'Guitar Level 2 ka progress batao',
  'Practice kyun drop hua hai?',
  'Aarav Patel ka attendance kaisa hai?',
  'Riya ko message karo — admin office aao',
  'Aarav ke parent ko message karo — aaj absent tha',
  'Open Finance',
  'Open Students',
] as const

export const TEACHER_SUGGESTED = [
  'Mere students mein kaun absent hai aaj?',
  'Pichle 7 din se kaun nahi aaya?',
  'Pending assignments kitne hain?',
  'Kaunse students ko attention chahiye?',
  'Aarav ka practice score batao',
  'Aarav ke parent ko message karo — aaj absent tha',
  'Open Attendance',
  'Open Assignments',
] as const

export const CHILD_SUGGESTED = [
  'Aaj practice kaise karun?',
  'Mera progress kaisa hai?',
  'Meri next class kab hai?',
  'Assignment kab due hai?',
  'Practice analysis kaise karun?',
  'Open Practice',
  'Open My Progress',
] as const

export const PARENT_SUGGESTED = [
  'Aarav ki fees pending hai kya?',
  'Aaj attendance kaisi thi?',
  'Practice kitna hua is hafte?',
  'Teacher feedback kya hai?',
  'Next class kab hai?',
  'Open Payments',
  'Open Progress',
] as const

/** @deprecated use getSuggestedPrompts */
export const SUGGESTED_PROMPTS = ADMIN_SUGGESTED

export function getSuggestedPrompts(
  role: UserRole,
  childView: ChildViewMode = 'student',
): readonly string[] {
  if (role === 'admin') return ADMIN_SUGGESTED
  if (role === 'teacher') return TEACHER_SUGGESTED
  if (role === 'child' && childView === 'parent') return PARENT_SUGGESTED
  return CHILD_SUGGESTED
}

function pendingFees(): Payment[] {
  return mockPayments.filter((p) => p.status === 'pending' || p.status === 'overdue')
}

function feesInsight(role: UserRole = 'admin'): InsightPanelData {
  const rows = pendingFees()
  const total = rows.reduce((s, p) => s + p.amount, 0)
  const overdue = rows.filter((p) => p.status === 'overdue')
  const msgPath = role === 'teacher' ? '/teacher/chat' : '/admin/communication'
  return {
    title: 'Pending / Overdue Fees',
    summary: `Is mahine ${rows.length} students ki fees pending ya overdue hain. Total outstanding ${formatCurrency(total)}. Har student pe Reminder se message screen open hoga.`,
    metrics: [
      { label: 'Pending accounts', value: String(rows.length), positive: false },
      { label: 'Outstanding', value: formatCurrency(total), positive: false },
      { label: 'Overdue', value: String(overdue.length), positive: false },
      { label: 'Collected (paid)', value: '86%', change: 'Demo snapshot', positive: true },
    ],
    highlights: [
      `${overdue.length} accounts overdue — send reminder recommended`,
      'Tap Reminder on any row to open Communication (demo)',
    ],
    rows: rows.map((p) => ({
      id: p.id,
      name: p.studentName,
      meta: `${p.month} · Due ${p.dueDate}`,
      amount: p.amount,
      status: p.status,
      actionLabel: 'Reminder',
      actionLink: msgPath,
    })),
    actions: [
      { label: 'Send all reminders', link: msgPath },
      { label: 'Open Finance', link: '/admin/payments' },
      { label: 'View Outstanding', link: '/admin/payments/outstanding' },
    ],
    footer: 'Academy Copilot — Demo',
  }
}

function absent7Insight(role: UserRole = 'admin'): InsightPanelData {
  const msgPath = role === 'teacher' ? '/teacher/chat' : '/admin/communication'
  return {
    title: 'Absent — last 7 days',
    summary: 'Pichle 7 din mein repeatedly absent students. Message se parent follow-up open hoga (demo).',
    metrics: [
      { label: 'Students', value: '5', positive: false },
      { label: 'Missed classes', value: '11', positive: false },
    ],
    rows: [
      {
        id: '1',
        name: 'Harsh Solanki',
        meta: 'Guitar L2 · 3 days absent',
        status: 'absent',
        actionLabel: 'Message parent',
        actionLink: msgPath,
      },
      {
        id: '2',
        name: 'Sara Banerjee',
        meta: 'Keyboard · 2 days absent',
        status: 'absent',
        actionLabel: 'Message parent',
        actionLink: msgPath,
      },
      {
        id: '3',
        name: 'Dev Patel',
        meta: 'Guitar L2 · 2 days absent',
        status: 'absent',
        actionLabel: 'Message parent',
        actionLink: msgPath,
      },
      {
        id: '4',
        name: 'Vivaan Desai',
        meta: 'Guitar L2 · 1 day + late',
        status: 'absent',
        actionLabel: 'Message parent',
        actionLink: msgPath,
      },
      {
        id: '5',
        name: 'Riya Shah',
        meta: 'Vocals · 1 day absent',
        status: 'absent',
        actionLabel: 'Message parent',
        actionLink: msgPath,
      },
    ],
    actions: [
      { label: 'Message all parents', link: msgPath },
      { label: 'Open Attendance', link: role === 'teacher' ? '/teacher/attendance' : '/admin/attendance' },
    ],
    footer: 'Academy Copilot — Demo',
  }
}

function modulePathForRole(
  role: UserRole,
  key: string,
): { path: string; label: string } | null {
  const admin: Record<string, { path: string; label: string }> = {
    finance: { path: '/admin/payments', label: 'Finance' },
    fee: { path: '/admin/payments', label: 'Finance' },
    payment: { path: '/admin/payments', label: 'Finance' },
    student: { path: '/admin/students', label: 'Students' },
    teacher: { path: '/admin/teachers', label: 'Teachers' },
    dashboard: { path: '/admin/dashboard', label: 'Dashboard' },
    camera: { path: '/admin/cameras', label: 'Cameras' },
    event: { path: '/admin/events', label: 'Events' },
    report: { path: '/admin/reports', label: 'Reports' },
    attendance: { path: '/admin/attendance', label: 'Attendance' },
    batch: { path: '/admin/batches', label: 'Batches' },
    studio: { path: '/admin/studio', label: 'Studio' },
    admission: { path: '/admin/students/admissions', label: 'Admissions' },
    schedule: { path: '/admin/schedule', label: 'Schedule' },
    practice: { path: '/admin/practice', label: 'Practice' },
    assignment: { path: '/admin/assignments', label: 'Assignments' },
  }
  const teacher: Record<string, { path: string; label: string }> = {
    dashboard: { path: '/teacher/dashboard', label: 'Dashboard' },
    student: { path: '/teacher/students', label: 'Students' },
    attendance: { path: '/teacher/attendance', label: 'Attendance' },
    assignment: { path: '/teacher/assignments', label: 'Assignments' },
    practice: { path: '/teacher/practice-review', label: 'Practice Review' },
    class: { path: '/teacher/classes', label: 'My Classes' },
    chat: { path: '/teacher/chat', label: 'Communication' },
    message: { path: '/teacher/chat', label: 'Communication' },
  }
  const child: Record<string, { path: string; label: string }> = {
    practice: { path: '/child/practice', label: 'Practice' },
    progress: { path: '/child/progress', label: 'My Progress' },
    class: { path: '/child/classes', label: 'My Classes' },
    course: { path: '/child/learning', label: 'My Courses' },
    assignment: { path: '/child/assignments', label: 'Assignments' },
    dashboard: { path: '/child/dashboard', label: 'Home' },
  }
  const parent: Record<string, { path: string; label: string }> = {
    payment: { path: '/child/family/payments', label: 'Payments' },
    fee: { path: '/child/family/payments', label: 'Payments' },
    attendance: { path: '/child/family/attendance', label: 'Attendance' },
    progress: { path: '/child/family/progress', label: 'Progress' },
    practice: { path: '/child/family/practice', label: 'Practice' },
    dashboard: { path: '/child/family', label: 'Family Dashboard' },
  }
  const map =
    role === 'admin' ? admin : role === 'teacher' ? teacher : role === 'child' ? child : admin
  if (role === 'child') {
    /* parent map used via childView in processAiQuery */
  }
  return map[key] ?? parent[key] ?? null
}

export function processAiQuery(
  raw: string,
  role: UserRole = 'admin',
  childView: ChildViewMode = 'student',
): AiEngineResult {
  const original = raw.trim()
  const t = normalizeAiQuery(original)
  if (!t) {
    return {
      answer: 'Kuch poochiye — fees, attendance, practice, ya message operations.',
      speak: 'Kuch poochiye — fees, attendance, practice, ya message operations.',
    }
  }

  // Message teacher FIRST (before open / aarav profile)
  if (
    /\bmessage\b/.test(t) &&
    /\b(riya|jayesh|amit|neha|priya|teacher)\b/.test(t) &&
    !/\bparent\b/.test(t)
  ) {
    let teacher = 'Riya Mehta'
    if (/\bjayesh\b/.test(t)) teacher = 'Jayesh Patel'
    else if (/\bamit\b/.test(t)) teacher = 'Amit Shah'
    else if (/\bneha\b/.test(t)) teacher = 'Neha Desai'
    else if (/\bpriya\b/.test(t)) teacher = 'Priya Nair'
    else if (/\briya\b/.test(t)) teacher = 'Riya Mehta'

    let body = 'Please come to the admin office.'
    if (/\boffice\b/.test(t) || /\baao\b/.test(t)) {
      body = 'Please come to the admin office.'
    }

    const chatPath = role === 'teacher' ? '/teacher/chat' : '/admin/communication'
    return {
      answer: `Message ${teacher} ko bhej diya: “${body}” — inbox mein dikhega (demo).`,
      speak: `${teacher} ko message bhej diya.`,
      insight: {
        title: 'Message sent',
        summary: `To: ${teacher} (Teacher)`,
        highlights: [body, 'Channel: In-app · Status: Delivered (demo)'],
        actions: [{ label: 'Open Communication', link: chatPath }],
        footer: 'Academy Copilot — Demo',
      },
      operation: {
        type: 'message_teacher',
        toastTitle: `Message → ${teacher}`,
        toastDescription: body,
        path: chatPath,
      },
    }
  }

  // Message parent / student family (Aarav etc.) — also "message aarav" / "aarav ko message"
  if (
    (/\bmessage\b/.test(t) && (/\bparent\b/.test(t) || /\baarav\b|\bdev\b|\bsara\b|\bharsh\b/.test(t))) ||
    /\baarav\b.*\bparent\b|\bparent\b.*\baarav\b/.test(t)
  ) {
    let student = 'Aarav Patel'
    let parent = 'Mr. Rajesh Patel'
    if (/\bdev\b/.test(t)) {
      student = 'Dev Patel'
      parent = 'Parent of Dev'
    } else if (/\bsara\b/.test(t)) {
      student = 'Sara Banerjee'
      parent = 'Parent of Sara'
    } else if (/\bharsh\b/.test(t)) {
      student = 'Harsh Solanki'
      parent = 'Parent of Harsh'
    }

    let body = `${student} aaj class mein absent tha. Please confirm.`
    if (/\babsent\b/.test(t)) {
      body = `${student} aaj academy nahi aaya. Attendance follow-up — please call back.`
    } else if (/\blate\b/.test(t)) {
      body = `${student} aaj late aaya. Kindly ensure timely arrival.`
    } else if (/\bfee\b|\bpending\b/.test(t)) {
      body = `${student} ki fees pending hai. Please clear dues.`
    }

    const chatPath =
      role === 'teacher' ? '/teacher/chat' : role === 'admin' ? '/admin/communication' : '/child/chat'

    return {
      answer: `${parent} ko message bhej diya: “${body}”`,
      speak: `${student} ke parent ko message bhej diya.`,
      insight: {
        title: 'Parent message',
        summary: `To: ${parent} · Student: ${student}`,
        highlights: [body, 'Channel: WhatsApp + SMS (demo)', 'Status: Queued'],
        actions: [
          { label: 'Open Communication', link: chatPath },
          { label: 'View Student', link: role === 'admin' ? '/admin/students/student-001' : '/teacher/students/student-001' },
        ],
        footer: 'Academy Copilot — Demo',
      },
      operation: {
        type: 'message_parent',
        toastTitle: `Parent message → ${parent}`,
        toastDescription: body,
        path: chatPath,
      },
    }
  }

  // Open module
  if (/\bopen\b/.test(t) || /^(finance|fee|student|teacher|dashboard|camera|event|report|attendance|batch|studio|practice|assignment|progress|class|course)/.test(t)) {
    const keys = [
      'finance',
      'fee',
      'payment',
      'student',
      'teacher',
      'dashboard',
      'camera',
      'event',
      'report',
      'attendance',
      'batch',
      'studio',
      'admission',
      'schedule',
      'practice',
      'assignment',
      'progress',
      'class',
      'course',
      'chat',
    ] as const
    for (const key of keys) {
      if (t.includes(key)) {
        let hit =
          role === 'child' && childView === 'parent'
            ? modulePathForRole('child', key) // will resolve parent map via fallback
            : modulePathForRole(role, key)
        if (role === 'child' && childView === 'parent') {
          const parentMap: Record<string, { path: string; label: string }> = {
            fee: { path: '/child/family/payments', label: 'Payments' },
            payment: { path: '/child/family/payments', label: 'Payments' },
            attendance: { path: '/child/family/attendance', label: 'Attendance' },
            progress: { path: '/child/family/progress', label: 'Progress' },
            practice: { path: '/child/family/practice', label: 'Practice' },
            dashboard: { path: '/child/family', label: 'Family Dashboard' },
          }
          hit = parentMap[key] ?? hit
        }
        if (hit) {
          return {
            answer: `${hit.label} module open kar rahi hoon.`,
            speak: `${hit.label} module open kar rahi hoon.`,
            operation: {
              type: 'open_module',
              toastTitle: `Opening ${hit.label}`,
              toastDescription: 'Navigation — demo',
              path: hit.path,
            },
          }
        }
      }
    }
  }

  // Fees — Latin OR Hindi tokens after normalize
  if (/\bfee\b/.test(t) && /\b(pending|student|kitne|month|overdue|outstanding)\b/.test(t)) {
    const rows = pendingFees()
    const total = rows.reduce((s, p) => s + p.amount, 0)
    const names = rows.map((p) => p.studentName).join(', ')
    const answer = `Is month ${rows.length} students ki fees pending/overdue hain — total ${formatCurrency(total)}. Students: ${names}. Right panel mein detail dekh lo.`
    return {
      answer,
      speak: `Is mahine ${rows.length} students ki fees pending hain. Total ${formatCurrency(total)}.`,
      insight: feesInsight(role),
    }
  }

  if (/\boverdue\b/.test(t) || (/\b(kaunse|which)\b/.test(t) && /\bfee\b/.test(t))) {
    return {
      answer: 'Overdue accounts right panel mein listed hain — Reminder se direct message screen open karo.',
      speak: 'Overdue fees wale students right panel mein hain.',
      insight: feesInsight(role),
    }
  }

  // 7-day absent
  if (
    (/\b(7|saat|seven)\b/.test(t) && /\b(din|day|absent)\b/.test(t)) ||
    (/\babsent\b/.test(t) && /\b(pichle|last|week|hafte|7)\b/.test(t)) ||
    /\bnahi aaya|nahi aye|nahi aaye/.test(t)
  ) {
    return {
      answer:
        'Pichle 7 din mein 5 students repeatedly absent — Harsh, Sara, Dev, Vivaan, Riya. Right panel se Message parent tap karo.',
      speak: 'Pichle 7 din mein 5 students absent pattern dikha rahe hain. Right panel mein dekh lo.',
      insight: absent7Insight(role),
    }
  }

  // Attendance today
  if (/\babsent\b/.test(t) || /\battendance\b/.test(t) || (/\bkitne\b/.test(t) && /\bstudent\b/.test(t))) {
    const attPath = role === 'teacher' ? '/teacher/attendance' : '/admin/attendance'
    const msgPath = role === 'teacher' ? '/teacher/chat' : '/admin/communication'
    return {
      answer:
        'Aaj attendance — Present 28, Absent 2 (Sara, Harsh), Late 1. Right panel se Message parent follow-up bhej sakte ho.',
      speak: 'Aaj Present 28, Absent 2, Late 1. Sara aur Harsh absent hain.',
      insight: {
        title: "Today's Attendance",
        summary: 'Marked 31 students across evening batches.',
        metrics: [
          { label: 'Present', value: '28', positive: true },
          { label: 'Absent', value: '2', positive: false },
          { label: 'Late', value: '1' },
          { label: 'Rate', value: '90%', positive: true },
        ],
        rows: [
          {
            id: '1',
            name: 'Sara Banerjee',
            meta: 'Keyboard · Absent today',
            status: 'absent',
            actionLabel: 'Message parent',
            actionLink: msgPath,
          },
          {
            id: '2',
            name: 'Harsh Solanki',
            meta: 'Guitar L2 · Absent today',
            status: 'absent',
            actionLabel: 'Message parent',
            actionLink: msgPath,
          },
        ],
        actions: [
          { label: 'Message absent parents', link: msgPath },
          { label: 'Open Attendance', link: attPath },
        ],
        footer: 'Academy Copilot — Demo',
      },
    }
  }

  // Child practice coach
  if (role === 'child' && childView === 'student' && /\b(practice|aaj|plan|improve)\b/.test(t)) {
    return {
      answer:
        'Aaj ka plan: 10 min rhythm metronome, 10 min chord transitions, 15 min song practice. Phir Practice pe “Upload yours” se recording bhejo — AI pitch/rhythm score dega (demo).',
      speak: 'Aaj 10 minute rhythm, 10 minute chords, 15 minute song. Upload yours se analysis karo.',
      insight: {
        title: 'Practice Coach',
        summary: "Today's recommended practice — demo",
        highlights: ['Rhythm 10 min', 'Chord transitions 10 min', 'Song practice 15 min'],
        actions: [
          { label: 'Open Practice', link: '/child/practice' },
          { label: 'Practice Analysis', link: '/child/practice-analysis' },
        ],
        footer: 'Academy Copilot — Demo',
      },
    }
  }

  // Parent fees / attendance
  if (role === 'child' && childView === 'parent') {
    if (/\bfee\b|\bpending\b/.test(t)) {
      return {
        answer: 'Aarav ki October fees ₹3,500 pending hai. Family View → Payments se clear kar sakte ho (demo).',
        speak: 'Aarav ki October fees 3500 rupees pending hai.',
        insight: {
          title: 'Aarav — Fees',
          summary: 'October 2026 invoice pending',
          metrics: [{ label: 'Due', value: '₹3,500', positive: false }],
          actions: [{ label: 'Open Payments', link: '/child/family/payments' }],
          footer: 'Academy Copilot — Demo',
        },
      }
    }
    if (/\battendance\b|\babsent\b|\bpractice\b|\bprogress\b/.test(t)) {
      return {
        answer:
          'Aarav is hafte: attendance 92%, practice 145 min, assignments 4/5. Jayesh sir: rhythm improve ho raha hai.',
        speak: 'Aarav attendance 92 percent, practice 145 minutes is hafte.',
        insight: {
          title: 'Weekly family summary',
          summary: 'Aarav Patel · Guitar L2',
          metrics: [
            { label: 'Attendance', value: '92%', positive: true },
            { label: 'Practice', value: '145 min', positive: true },
            { label: 'Assignments', value: '4/5' },
          ],
          actions: [{ label: 'Open Family View', link: '/child/family' }],
          footer: 'Academy Copilot — Demo',
        },
      }
    }
  }

  // Guitar progress
  if (/\bguitar\b/.test(t) || (/\blevel\b/.test(t) && /\bprogress\b/.test(t)) || /\bbatch\b/.test(t)) {
    return {
      answer:
        'Guitar Level 2 (Jayesh Patel): 8 students, attendance 92%, progress ~78%. Aarav & Kabir aage; Vivaan needs rhythm drills. Next: barre chords.',
      speak: 'Guitar Level 2 progress around 78 percent. Attendance 92 percent.',
      insight: {
        title: 'Guitar Level 2',
        summary: 'Evening batch · Jayesh Patel · Room 03',
        metrics: [
          { label: 'Students', value: '8' },
          { label: 'Attendance', value: '92%', positive: true },
          { label: 'Progress', value: '78%', positive: true },
          { label: 'Practice', value: '81%' },
        ],
        highlights: ['Next milestone: Barre chords', '3 students need rhythm warm-up'],
        actions: [{ label: 'Open Batches', link: role === 'admin' ? '/admin/batches' : '/teacher/classes' }],
        footer: 'Academy Copilot — Demo',
      },
    }
  }

  // Practice drop
  if (/\bpractice\b/.test(t) && /\b(drop|engagement|kyun|why)\b/.test(t)) {
    return {
      answer:
        'Practice engagement is hafte ~8% drop — zyada Guitar L2 evening. 3 students 7+ days se kam practice.',
      speak: 'Practice engagement 8 percent drop hua hai is hafte.',
      insight: {
        title: 'Practice Engagement',
        summary: 'Week-over-week drop across Level 2 guitar.',
        metrics: [
          { label: 'Drop', value: '8%', positive: false },
          { label: 'At risk', value: '3 students', positive: false },
        ],
        rows: [
          { id: 'a', name: 'Vivaan Desai', meta: '7+ days low practice' },
          { id: 'b', name: 'Dev Patel', meta: 'Inconsistent sessions' },
        ],
        actions: [{ label: 'Open Practice', link: role === 'admin' ? '/admin/practice' : '/teacher/practice-review' }],
        footer: 'Academy Copilot — Demo',
      },
    }
  }

  // Aarav profile (only if not messaging)
  if (/\baarav\b/.test(t)) {
    return {
      answer:
        'Aarav Patel — Guitar L2. Attendance 92%, practice streak 12 days, progress 78%. Jayesh sir: chord transitions improve ho rahe hain.',
      speak: 'Aarav Patel attendance 92 percent, progress 78 percent, streak 12 days.',
      insight: {
        title: 'Aarav Patel',
        summary: 'Guitar · Level 2 · Jayesh Patel',
        metrics: [
          { label: 'Attendance', value: '92%', positive: true },
          { label: 'Progress', value: '78%', positive: true },
          { label: 'Streak', value: '12 days', positive: true },
          { label: 'Practice', value: '275 min' },
        ],
        actions: [
          {
            label: 'Open Profile',
            link: role === 'admin' ? '/admin/students/student-001' : '/teacher/students/student-001',
          },
        ],
        footer: 'Academy Copilot — Demo',
      },
    }
  }

  // Concert
  if (/\bconcert\b/.test(t) || /\bevent\b/.test(t) || /\balert\b/.test(t)) {
    return {
      answer:
        'Concert 28 Sep, 6 PM Main Hall. Dashboard pe Concert alert se branches select karke notify karo.',
      speak: 'Concert alert dashboard se bhej sakte ho.',
      insight: {
        title: 'Annual Concert',
        summary: '28 Sep 2026 · 6 PM · Main Hall',
        metrics: [{ label: 'Interest', value: '84', positive: true }],
        actions: [{ label: 'Open Events', link: '/admin/events' }],
        footer: 'Academy Copilot — Demo',
      },
    }
  }

  // Teacher pending assignments
  if (role === 'teacher' && /\bassignment\b/.test(t)) {
    return {
      answer: '4 students ke assignments pending hain — Dev, Vivaan, Harsh, Sara. Practice Review mein submissions check karo.',
      speak: '4 students ke assignments pending hain.',
      insight: {
        title: 'Pending assignments',
        summary: 'Guitar L2 follow-up list',
        rows: [
          { id: '1', name: 'Dev Patel', meta: 'Chord transitions · Due Sep 20' },
          { id: '2', name: 'Vivaan Desai', meta: 'Rhythm drill · Due Sep 21' },
        ],
        actions: [{ label: 'Open Assignments', link: '/teacher/assignments' }],
        footer: 'Academy Copilot — Demo',
      },
    }
  }

  return {
    answer:
      'Samajh gayi — suggested questions try karo: fees pending (Hindi/English), 7 din absent, attendance, parent/teacher message, ya Open Finance.',
    speak: 'Suggested questions try karo — fees, attendance, ya message operations.',
  }
}
