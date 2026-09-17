import { Navigate, Route, Routes } from 'react-router-dom'
import ChildDashboard from '@/pages/child/Dashboard'
import ChildPractice from '@/pages/child/Practice'
import ChildPracticeAnalysis from '@/pages/child/PracticeAnalysis'
import ChildPracticeHistory from '@/pages/child/PracticeHistory'
import ChildProgress from '@/pages/child/Progress'
import ChildAssignments from '@/pages/child/Assignments'
import ChildAchievements from '@/pages/child/Achievements'
import ChildCalendar from '@/pages/child/Calendar'
import ChildChat from '@/pages/child/Chat'
import ChildProfile from '@/pages/child/Profile'
import ChildLearning from '@/pages/child/Learning'
import ChildClasses from '@/pages/child/Classes'
import ChildEvents from '@/pages/child/Events'
import FamilyView from '@/pages/child/family/FamilyView'
import {
  FamilyAchievementsSection,
  FamilyAssignmentsSection,
  FamilyAttendanceSection,
  FamilyEventsSection,
  FamilyFeedbackSection,
  FamilyMessagesSection,
  FamilyPaymentsSection,
  FamilyPracticeSection,
  FamilyProgressSection,
  FamilyScheduleSection,
} from '@/pages/child/family/FamilySections'
import SharedNotifications from '@/pages/shared/Notifications'
import SharedSettings from '@/pages/shared/Settings'

export function ChildRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<ChildDashboard />} />
      <Route path="practice" element={<ChildPractice />} />
      <Route path="practice/plan" element={<ChildPractice />} />
      <Route path="practice/history" element={<ChildPracticeHistory />} />
      <Route path="practice-analysis" element={<ChildPracticeAnalysis />} />
      <Route path="progress" element={<ChildProgress />} />
      <Route path="assignments" element={<ChildAssignments />} />
      <Route path="achievements" element={<ChildAchievements />} />
      <Route path="events" element={<ChildEvents />} />
      <Route path="calendar" element={<ChildCalendar />} />
      <Route path="chat" element={<ChildChat />} />
      <Route path="profile" element={<ChildProfile />} />
      <Route path="learning" element={<ChildLearning />} />
      <Route path="classes" element={<ChildClasses />} />
      <Route path="family" element={<FamilyView />}>
        <Route index element={null} />
        <Route path="attendance" element={<FamilyAttendanceSection />} />
        <Route path="schedule" element={<FamilyScheduleSection />} />
        <Route path="practice" element={<FamilyPracticeSection />} />
        <Route path="progress" element={<FamilyProgressSection />} />
        <Route path="assignments" element={<FamilyAssignmentsSection />} />
        <Route path="feedback" element={<FamilyFeedbackSection />} />
        <Route path="payments" element={<FamilyPaymentsSection />} />
        <Route path="achievements" element={<FamilyAchievementsSection />} />
        <Route path="events" element={<FamilyEventsSection />} />
        <Route path="messages" element={<FamilyMessagesSection />} />
      </Route>
      <Route path="notifications" element={<SharedNotifications />} />
      <Route path="account" element={<SharedSettings />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  )
}
