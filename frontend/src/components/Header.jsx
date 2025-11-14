import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import DarkModeToggle from './DarkModeToggle'

export default function Header(){
  const { currentUser, logout } = useAuth()
  const nav = useNavigate()
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to={currentUser ? '/dashboard' : '/'} sx={{ color: 'inherit', textDecoration: 'none', mr: 2 }}>
          Travel Booking
        </Typography>
        {currentUser && <Button color="inherit" component={RouterLink} to="/search">Flights</Button>}
        {currentUser && <Button color="inherit" component={RouterLink} to="/dashboard">Dashboard</Button>}
        <Box sx={{ flexGrow: 1 }} />
        <DarkModeToggle />
        {currentUser ? (
          <>
            <Button color="inherit" component={RouterLink} to="/profile">{currentUser.name || 'Profile'}</Button>
            <Button color="inherit" onClick={async ()=> { await logout(); nav('/'); }}>Logout</Button>
          </>
        ) : (
          <Button color="inherit" component={RouterLink} to="/login">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
