import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

export default function AuthLayout({ children }){
  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ width: '100%' }}>
        <Paper elevation={0} sx={{ p: { xs: 2, md: 4 } }}>
          {children}
        </Paper>
      </Box>
    </Container>
  )
}
