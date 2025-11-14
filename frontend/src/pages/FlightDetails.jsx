import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { Card, CardContent, Typography, Stack, Button } from '@mui/material'
import api from '../services/api'

export default function FlightDetails(){
  const { id } = useParams()
  const location = useLocation()
  const nav = useNavigate()
  const [flight, setFlight] = useState(location.state?.flight || null)

  useEffect(()=>{
    const fetchIt = async ()=>{
      if(!flight){
        const res = await api.get('', { params: { action: 'searchFlights' } })
        const f = (res.data||[]).find(x=> String(x.flight_id) === String(id))
        if(f) setFlight(f)
      }
    }
    fetchIt()
  }, [id])

  if(!flight) return <Typography>Loading...</Typography>

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>{flight.airline} — {flight.origin} → {flight.destination}</Typography>
        <Stack spacing={1}>
          <div>Departure: {flight.departure_time}</div>
          <div>Arrival: {flight.arrival_time}</div>
          <div>Seats available: {flight.seats_available}</div>
          <div>Price: ${flight.price}</div>
        </Stack>
        <Button sx={{ mt: 2 }} variant="contained" onClick={()=> nav('/book', { state: { flight } })}>Book now</Button>
      </CardContent>
    </Card>
  )
}
