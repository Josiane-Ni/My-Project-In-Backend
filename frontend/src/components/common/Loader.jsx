import React from 'react'
import { Box, CircularProgress } from '@mui/material'

export default function Loader({ show = false, message = 'Loading...' }){
  if (!show) return null
  return (
    <Box sx={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(0,0,0,0.25)', zIndex: 2000 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <CircularProgress />
        <span>{message}</span>
      </Box>
    </Box>
  )
}
