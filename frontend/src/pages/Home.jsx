import React from 'react'
import { Container, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Home(){
  const nav = useNavigate()
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>Online Travel Booking</Typography>
      <Button variant="contained" onClick={()=>nav('/search')}>Search Flights</Button>
    </Container>
  )
}
