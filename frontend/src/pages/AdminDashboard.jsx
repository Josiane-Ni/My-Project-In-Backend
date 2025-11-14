import React from 'react'
import { Container, Typography } from '@mui/material'

export default function AdminDashboard(){
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>Admin Dashboard</Typography>
      <Typography>Charts and reports will appear here.</Typography>
    </Container>
  )
}
