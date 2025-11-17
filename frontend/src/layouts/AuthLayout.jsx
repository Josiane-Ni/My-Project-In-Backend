import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import DarkModeToggle from '../components/DarkModeToggle'

export default function AuthLayout({ children }){
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Online Travel Booking
          </Typography>
          <DarkModeToggle />
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="md"
        sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{ width: '100%' }}>
          <Paper elevation={0} sx={{ p: { xs: 2, md: 4 } }}>
            {children}
          </Paper>
        </Box>
      </Container>
    </Box>
  )
}
