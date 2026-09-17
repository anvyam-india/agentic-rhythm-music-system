import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout/AppLayout'
import Login from '@/pages/auth/Login'
import { AdminRoutes } from '@/routes/adminRoutes'
import { TeacherRoutes } from '@/routes/teacherRoutes'
import { ChildRoutes } from '@/routes/childRoutes'
import { RequireAuth, RoleGate, RootRedirect } from '@/routes/RequireAuth'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/admin/*" element={<RoleGate role="admin"><AdminRoutes /></RoleGate>} />
            <Route path="/teacher/*" element={<RoleGate role="teacher"><TeacherRoutes /></RoleGate>} />
            <Route path="/child/*" element={<RoleGate role="child"><ChildRoutes /></RoleGate>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
