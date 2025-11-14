import React from 'react'
import { Container, Paper, Typography, Stack, Avatar, Button } from '@mui/material'
import { useAuth } from '../contexts/AuthContext'

export default function Profile(){
  const { currentUser, logout } = useAuth()
  if(!currentUser) return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 4 }} elevation={3}>
        <Typography variant="h5">You are not logged in.</Typography>
      </Paper>
    </Container>
  )
  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 4 }} elevation={3}>
        <Stack spacing={2} alignItems="center">
          <Avatar sx={{ width: 72, height: 72 }}>{(currentUser.name||currentUser.email||'?').slice(0,1).toUpperCase()}</Avatar>
          <Typography variant="h5">{currentUser.name || 'Customer'}</Typography>
          <Typography color="text.secondary">{currentUser.email}</Typography>
          <Button variant="outlined" onClick={logout}>Logout</Button>
        </Stack>
      </Paper>
    </Container>
  )
}
