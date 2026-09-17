import { Navigate, Route, Routes } from 'react-router-dom'
import TeacherDashboard from '@/pages/teacher/Dashboard'
import TeacherClasses from '@/pages/teacher/Classes'
import TeacherClassDetails from '@/pages/teacher/ClassDetails'
import TeacherStudents from '@/pages/teacher/Students'
import TeacherStudentDetails from '@/pages/teacher/StudentDetails'
import TeacherAttendance from '@/pages/teacher/Attendance'
import TeacherAssignments from '@/pages/teacher/Assignments'
import TeacherEvaluation from '@/pages/teacher/Evaluation'
import TeacherPracticeReview from '@/pages/teacher/PracticeReview'
import TeacherChat from '@/pages/teacher/Chat'
import TeacherCalendar from '@/pages/teacher/Calendar'
import TeacherProfile from '@/pages/teacher/Profile'
import SharedNotifications from '@/pages/shared/Notifications'
import SharedSettings from '@/pages/shared/Settings'

export function TeacherRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<TeacherDashboard />} />
      <Route path="classes" element={<TeacherClasses />} />
      <Route path="classes/upcoming" element={<TeacherClasses />} />
      <Route path="classes/history" element={<TeacherClasses />} />
      <Route path="classes/:id" element={<TeacherClassDetails />} />
      <Route path="students" element={<TeacherStudents />} />
      <Route path="students/progress" element={<TeacherStudents />} />
      <Route path="students/:id" element={<TeacherStudentDetails />} />
      <Route path="attendance" element={<TeacherAttendance />} />
      <Route path="assignments" element={<TeacherAssignments />} />
      <Route path="assignments/create" element={<TeacherAssignments />} />
      <Route path="evaluation" element={<TeacherEvaluation />} />
      <Route path="practice-review" element={<TeacherPracticeReview />} />
      <Route path="chat" element={<TeacherChat />} />
      <Route path="calendar" element={<TeacherCalendar />} />
      <Route path="profile" element={<TeacherProfile />} />
      <Route path="notifications" element={<SharedNotifications />} />
      <Route path="account" element={<SharedSettings />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  )
}
