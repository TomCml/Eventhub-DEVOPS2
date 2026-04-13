import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppWrapper } from './modules/app/components/AppWrapper'
import { Layout } from './modules/app/components/Layout'
import { ProtectedRoute } from './modules/app/components/ProtectedRoute'
import { Box, CircularProgress } from '@mui/material'
import './App.css'

const LoginForm = lazy(() => import('./modules/authentification/components/LoginForm').then(m => ({ default: m.LoginForm })))
const RegisterForm = lazy(() => import('./modules/authentification/components/RegisterForm').then(m => ({ default: m.RegisterForm })))
const OtpVerifyPage = lazy(() => import('./modules/authentification/components/OtpVerifyPage').then(m => ({ default: m.OtpVerifyPage })))
const ProfilePage = lazy(() => import('./modules/user/components/ProfilePage').then(m => ({ default: m.ProfilePage })))
const EventsPage = lazy(() => import('./modules/events/components/EventsPage').then(m => ({ default: m.EventsPage })))
const DashboardPage = lazy(() => import('./modules/dashboard/components/DashboardPage').then(m => ({ default: m.DashboardPage })))

const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
    <CircularProgress size={60} thickness={4} />
  </Box>
)
import './App.css'


//Browerrouter to provide routing
//Routes to provide routes
function App() {
  return (
    <AppWrapper>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/otp-verify" element={<OtpVerifyPage />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/stats" element={<DashboardPage />} />
              </Route>
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </AppWrapper>
  )
}

export default App
