import { Navigate, Route, Routes } from 'react-router-dom'
import AdminDashboard from '@/pages/admin/Dashboard'
import AdminStudents from '@/pages/admin/Students'
import AdminStudentDetails from '@/pages/admin/StudentDetails'
import AdminAdmissions from '@/pages/admin/Admissions'
import AdminTeachers from '@/pages/admin/Teachers'
import AdminCourses from '@/pages/admin/Courses'
import AdminBatches from '@/pages/admin/Batches'
import AdminSchedule from '@/pages/admin/Schedule'
import AdminAttendance from '@/pages/admin/Attendance'
import AdminAssignments from '@/pages/admin/Assignments'
import AdminPayments from '@/pages/admin/Payments'
import AdminStudio from '@/pages/admin/Studio'
import AdminEvents from '@/pages/admin/Events'
import AdminReports from '@/pages/admin/Reports'
import AdminSettingsPage from '@/pages/admin/Settings'
import AdminAcademy from '@/pages/admin/Academy'
import AdminPractice from '@/pages/admin/Practice'
import AdminCommunication from '@/pages/admin/Communication'
import AdminLearning from '@/pages/admin/Learning'
import AdminAiInsights from '@/pages/admin/AiInsights'
import AdminCurriculum from '@/pages/admin/Curriculum'
import AdminCameras from '@/pages/admin/Cameras'
import SharedNotifications from '@/pages/shared/Notifications'
import SharedSettings from '@/pages/shared/Settings'

export function AdminRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="students" element={<AdminStudents />} />
      <Route path="students/admissions" element={<AdminAdmissions />} />
      <Route path="students/progress" element={<AdminLearning />} />
      <Route path="students/:id" element={<AdminStudentDetails />} />
      <Route path="teachers" element={<AdminTeachers />} />
      <Route path="teachers/schedule" element={<AdminSchedule />} />
      <Route path="teachers/attendance" element={<AdminAttendance />} />
      <Route path="courses" element={<AdminCourses />} />
      <Route path="batches" element={<AdminBatches />} />
      <Route path="schedule" element={<AdminSchedule />} />
      <Route path="attendance" element={<AdminAttendance />} />
      <Route path="assignments" element={<AdminAssignments />} />
      <Route path="payments" element={<AdminPayments />} />
      <Route path="payments/outstanding" element={<AdminPayments />} />
      <Route path="payments/receipts" element={<AdminPayments />} />
      <Route path="studio" element={<AdminStudio />} />
      <Route path="cameras" element={<AdminCameras />} />
      <Route path="cameras/detections" element={<AdminCameras />} />
      <Route path="cameras/incidents" element={<AdminCameras />} />
      <Route path="events" element={<AdminEvents />} />
      <Route path="reports" element={<AdminReports />} />
      <Route path="settings" element={<AdminSettingsPage />} />
      <Route path="academy" element={<AdminAcademy />} />
      <Route path="academy/branches" element={<AdminAcademy />} />
      <Route path="academy/rooms" element={<AdminAcademy />} />
      <Route path="academy/instruments" element={<AdminAcademy />} />
      <Route path="practice" element={<AdminPractice />} />
      <Route path="communication" element={<AdminCommunication />} />
      <Route path="learning" element={<AdminLearning />} />
      <Route path="ai-insights" element={<AdminAiInsights />} />
      <Route path="ai-copilot" element={<AdminAiInsights />} />
      <Route path="curriculum" element={<AdminCurriculum />} />
      <Route path="notifications" element={<SharedNotifications />} />
      <Route path="account" element={<SharedSettings />} />
      <Route path="profile" element={<Navigate to="/admin/settings" replace />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  )
}
