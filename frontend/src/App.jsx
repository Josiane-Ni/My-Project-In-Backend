import React from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ThemeProvider from './theme/ThemeProvider'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import AuthLayout from './layouts/AuthLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import FlightSearch from './pages/FlightSearch'
import FlightDetails from './pages/FlightDetails'
import BookingSteps from './pages/BookingSteps'
import Hotels from './pages/Hotels'
import Packages from './pages/Packages'
import MyBookings from './pages/MyBookings'
import Notifications from './pages/Notifications'
import AdminDashboard from './pages/AdminDashboard'
import AgentDashboard from './pages/AgentDashboard'
import AdminFlights from './pages/AdminFlights'
import AdminHotels from './pages/AdminHotels'
import Reports from './pages/Reports'
import Dashboard from './pages/Dashboard'
import VerifyEmail from './pages/VerifyEmail'
import ProtectedRoute from './routes/ProtectedRoute'
import RoleRoute from './routes/RoleRoute'
import AccessDenied from './pages/AccessDenied'

export default function App(){
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
        <Route path="/profile" element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>} />
        <Route path="/verify-email" element={<MainLayout><VerifyEmail /></MainLayout>} />
        <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><MainLayout><FlightSearch /></MainLayout></ProtectedRoute>} />
        <Route path="/flights" element={<ProtectedRoute><MainLayout><FlightSearch /></MainLayout></ProtectedRoute>} />
        <Route path="/hotels" element={<ProtectedRoute><MainLayout><Hotels /></MainLayout></ProtectedRoute>} />
        <Route path="/packages" element={<ProtectedRoute><MainLayout><Packages /></MainLayout></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><MainLayout><MyBookings /></MainLayout></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><MainLayout><Notifications /></MainLayout></ProtectedRoute>} />
        <Route path="/flight/:id" element={<ProtectedRoute><MainLayout><FlightDetails /></MainLayout></ProtectedRoute>} />
        <Route path="/book" element={<ProtectedRoute><MainLayout><BookingSteps /></MainLayout></ProtectedRoute>} />

        <Route path="/admin" element={<RoleRoute allowed={["admin"]}><AdminLayout><AdminDashboard /></AdminLayout></RoleRoute>} />
        <Route path="/admin/flights" element={<RoleRoute allowed={["admin","agent"]}><AdminLayout><AdminFlights /></AdminLayout></RoleRoute>} />
        <Route path="/admin/hotels" element={<RoleRoute allowed={["admin","agent"]}><AdminLayout><AdminHotels /></AdminLayout></RoleRoute>} />
        <Route path="/admin/reports" element={<RoleRoute allowed={["admin"]}><AdminLayout><Reports /></AdminLayout></RoleRoute>} />

        <Route path="/agent" element={<RoleRoute allowed={["agent"]}><AdminLayout><AgentDashboard /></AdminLayout></RoleRoute>} />

        <Route path="/access-denied" element={<MainLayout><AccessDenied /></MainLayout>} />
      </>
    )
  )

  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} future={{ v7_startTransition: true, v7_relativeSplatPath: true }} />
      </ThemeProvider>
    </AuthProvider>
  )
}
