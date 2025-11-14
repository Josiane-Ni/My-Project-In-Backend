import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function RoleRoute({ allowed = [], children }){
  const { currentUser } = useAuth()
  const location = useLocation()
  if (!currentUser) return <Navigate to="/login" replace state={{ from: location }} />
  if (allowed.length && !allowed.includes(currentUser.role)) {
    return <Navigate to="/access-denied" replace />
  }
  return children
}
