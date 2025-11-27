import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import ForgotPassword from './pages/Auth/ForgotPassword'
import Homepage from './pages/Home'
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'
import VerifyCode from './pages/Auth/VerifyCode'
import ResetPassword from './pages/Auth/ResetPassword'

function App() {

  const initializeAuth = useAuthStore((state) => state.initializeAuth)

    useEffect(() => {
      initializeAuth()
    }, [initializeAuth])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App