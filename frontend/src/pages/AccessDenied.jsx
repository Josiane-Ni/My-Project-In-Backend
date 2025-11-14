import React from 'react'
import { Container, Paper, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function AccessDenied(){
  const nav = useNavigate()
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Access Denied</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>You do not have permission to view this page.</Typography>
        <Button variant="contained" onClick={()=> nav('/dashboard')}>Go to Dashboard</Button>
      </Paper>
    </Container>
  )
}
