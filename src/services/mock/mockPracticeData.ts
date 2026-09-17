import type { PracticeSession, PracticePlanItem, PracticeAnalysis, WeeklyPracticeDay } from '@/types/practice'
import type { ProgressSnapshot } from '@/types/progress'

export const mockPracticeSessions: PracticeSession[] = [
  { id: 'prac-001', studentId: 'student-001', date: '2026-09-16', duration: 42, instrument: 'Guitar', practiceType: 'Song Practice', aiScore: 81 },
  { id: 'prac-002', studentId: 'student-001', date: '2026-09-15', duration: 40, instrument: 'Guitar', practiceType: 'Chord Transition', aiScore: 78 },
  { id: 'prac-003', studentId: 'student-001', date: '2026-09-14', duration: 55, instrument: 'Guitar', practiceType: 'Rhythm Exercise', aiScore: 74 },
  { id: 'prac-004', studentId: 'student-001', date: '2026-09-13', duration: 30, instrument: 'Guitar', practiceType: 'Theory', aiScore: 82 },
  { id: 'prac-005', studentId: 'student-001', date: '2026-09-12', duration: 45, instrument: 'Guitar', practiceType: 'Song Practice', aiScore: 79 },
  { id: 'prac-006', studentId: 'student-001', date: '2026-09-11', duration: 35, instrument: 'Guitar', practiceType: 'Technique', aiScore: 76 },
  { id: 'prac-007', studentId: 'student-001', date: '2026-09-10', duration: 28, instrument: 'Guitar', practiceType: 'Chord Transition', aiScore: 72 },
  { id: 'prac-008', studentId: 'student-002', date: '2026-09-16', duration: 25, instrument: 'Keyboard', practiceType: 'Scales', aiScore: 70 },
  { id: 'prac-009', studentId: 'student-002', date: '2026-09-15', duration: 30, instrument: 'Keyboard', practiceType: 'Song Practice', aiScore: 68 },
  { id: 'prac-010', studentId: 'student-003', date: '2026-09-16', duration: 50, instrument: 'Vocal', practiceType: 'Breath Control', aiScore: 85 },
  { id: 'prac-011', studentId: 'student-003', date: '2026-09-15', duration: 40, instrument: 'Vocal', practiceType: 'Song Practice', aiScore: 83 },
  { id: 'prac-012', studentId: 'student-004', date: '2026-09-16', duration: 20, instrument: 'Drums', practiceType: 'Rudiments', aiScore: 65 },
  { id: 'prac-013', studentId: 'student-005', date: '2026-09-16', duration: 60, instrument: 'Piano', practiceType: 'Arpeggios', aiScore: 90 },
  { id: 'prac-014', studentId: 'student-005', date: '2026-09-15', duration: 55, instrument: 'Piano', practiceType: 'Song Practice', aiScore: 88 },
  { id: 'prac-015', studentId: 'student-006', date: '2026-09-16', duration: 35, instrument: 'Guitar', practiceType: 'Chord Transition', aiScore: 75 },
  { id: 'prac-016', studentId: 'student-006', date: '2026-09-14', duration: 40, instrument: 'Guitar', practiceType: 'Rhythm Exercise', aiScore: 73 },
  { id: 'prac-017', studentId: 'student-007', date: '2026-09-15', duration: 22, instrument: 'Ukulele', practiceType: 'Strumming', aiScore: 71 },
  { id: 'prac-018', studentId: 'student-008', date: '2026-09-16', duration: 38, instrument: 'Vocal', practiceType: 'Pitch Training', aiScore: 80 },
  { id: 'prac-019', studentId: 'student-009', date: '2026-09-16', duration: 50, instrument: 'Guitar', practiceType: 'Fingerstyle', aiScore: 87 },
  { id: 'prac-020', studentId: 'student-009', date: '2026-09-15', duration: 45, instrument: 'Guitar', practiceType: 'Song Practice', aiScore: 86 },
  { id: 'prac-021', studentId: 'student-011', date: '2026-09-16', duration: 40, instrument: 'Tabla', practiceType: 'Theka Practice', aiScore: 78 },
  { id: 'prac-022', studentId: 'student-012', date: '2026-09-15', duration: 35, instrument: 'Piano', practiceType: 'Scales', aiScore: 77 },
  { id: 'prac-023', studentId: 'student-013', date: '2026-09-14', duration: 18, instrument: 'Drums', practiceType: 'Rudiments', aiScore: 62 },
  { id: 'prac-024', studentId: 'student-014', date: '2026-09-16', duration: 30, instrument: 'Vocal', practiceType: 'Breath Control', aiScore: 69 },
  { id: 'prac-025', studentId: 'student-016', date: '2026-09-16', duration: 28, instrument: 'Ukulele', practiceType: 'Song Practice', aiScore: 74 },
  { id: 'prac-026', studentId: 'student-001', date: '2026-09-09', duration: 40, instrument: 'Guitar', practiceType: 'Song Practice', aiScore: 77 },
  { id: 'prac-027', studentId: 'student-001', date: '2026-09-08', duration: 32, instrument: 'Guitar', practiceType: 'Technique', aiScore: 75 },
  { id: 'prac-028', studentId: 'student-003', date: '2026-09-14', duration: 45, instrument: 'Vocal', practiceType: 'Song Practice', aiScore: 84 },
  { id: 'prac-029', studentId: 'student-005', date: '2026-09-14', duration: 48, instrument: 'Piano', practiceType: 'Technique', aiScore: 89 },
  { id: 'prac-030', studentId: 'student-008', date: '2026-09-14', duration: 35, instrument: 'Vocal', practiceType: 'Theory', aiScore: 76 },
  { id: 'prac-031', studentId: 'student-011', date: '2026-09-15', duration: 30, instrument: 'Tabla', practiceType: 'Rhythm', aiScore: 75 },
  { id: 'prac-032', studentId: 'student-012', date: '2026-09-16', duration: 42, instrument: 'Piano', practiceType: 'Song Practice', aiScore: 79 },
]

export const mockWeeklyPractice: WeeklyPracticeDay[] = [
  { day: 'Mon', minutes: 45 },
  { day: 'Tue', minutes: 30 },
  { day: 'Wed', minutes: 55 },
  { day: 'Thu', minutes: 15 },
  { day: 'Fri', minutes: 40 },
  { day: 'Sat', minutes: 50 },
  { day: 'Sun', minutes: 40 },
]

export const mockPracticePlan: PracticePlanItem[] = [
  { id: 'plan-001', title: 'Chord Transition', duration: 10, icon: 'guitar', completed: false },
  { id: 'plan-002', title: 'Rhythm Exercise', duration: 10, icon: 'drums', completed: false },
  { id: 'plan-003', title: 'Song Practice', duration: 15, icon: 'music', completed: false },
  { id: 'plan-004', title: 'Music Theory', duration: 5, icon: 'theory', completed: false },
]

export const mockPracticeAnalysis: PracticeAnalysis = {
  pitchAccuracy: 82,
  rhythmAccuracy: 74,
  tempoConsistency: 81,
  technique: 78,
  overall: 79,
  feedback: [
    'Good improvement compared with your previous practice.',
    'Your timing is improving steadily.',
    'Focus more on rhythm consistency during chord changes.',
  ],
  goodPoints: [
    'Pitch stability on open chords',
    'Tempo held with metronome',
  ],
  weakPoints: [
    'Rhythm dips on chord transitions',
    'Slight rush before D chord',
  ],
  recommendations: [
    { title: 'Rhythm Exercise', duration: 10 },
    { title: 'Chord Transition', duration: 10 },
    { title: 'Slow Tempo Practice', duration: 10 },
  ],
}

export const mockProgress: ProgressSnapshot = {
  studentId: 'student-001',
  overall: 78,
  skills: [
    { name: 'Pitch', percentage: 82 },
    { name: 'Rhythm', percentage: 74 },
    { name: 'Technique', percentage: 78 },
    { name: 'Music Theory', percentage: 70 },
    { name: 'Song Performance', percentage: 85 },
  ],
  milestones: [
    { id: 'ms-001', title: 'Beginner Guitar', status: 'completed' },
    { id: 'ms-002', title: 'Basic Chords', status: 'completed' },
    { id: 'ms-003', title: 'Open Chords', status: 'completed' },
    { id: 'ms-004', title: 'Chord Transitions', status: 'current' },
    { id: 'ms-005', title: 'Barre Chords', status: 'upcoming' },
  ],
}
