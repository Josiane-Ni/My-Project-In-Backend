import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Footer(){
  return (
    <Box component="footer" sx={{ mt: 6, py: 3, textAlign: 'center', borderTop: (theme)=>`1px solid ${theme.palette.divider}` }}>
      <Typography variant="body2">© {new Date().getFullYear()} Travel Booking. All rights reserved.</Typography>
    </Box>
  )
}
