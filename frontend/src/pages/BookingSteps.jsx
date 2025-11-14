import React, { useState } from 'react'
import { Container, Button, Stepper, Step, StepLabel, Typography } from '@mui/material'
import api from '../services/api'
import { useLocation } from 'react-router-dom'

export default function BookingSteps(){
  const location = useLocation()
  const flight = location.state?.flight
  const [active, setActive] = useState(0)
  const [seats, setSeats] = useState(1)
  const steps = ['Select seats', 'Passenger details', 'Payment', 'Confirm']

  const handleConfirm = async () => {
    const res = await api.post('?action=bookFlight', { flight_id: flight.flight_id, seats, paymentMethod: 'wallet' })
    if(res.data?.booking_id) alert('Booking confirmed: ' + res.data.booking_id)
    else alert('Booking failed: ' + (res.data?.error||'Unknown'))
  }

  if(!flight) return <Container sx={{ mt: 3 }}><Typography>No flight selected.</Typography></Container>

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5">Booking: {flight.airline} {flight.origin} → {flight.destination}</Typography>
      <Stepper activeStep={active} sx={{ my: 2 }}>
        {steps.map(s=> <Step key={s}><StepLabel>{s}</StepLabel></Step>)}
      </Stepper>
      {active === 0 && (
        <div>
          <Typography>Available seats: {flight.seats_available}</Typography>
          <input type="number" min="1" max={flight.seats_available} value={seats} onChange={e=>setSeats(Number(e.target.value))} />
          <Button onClick={()=>setActive(1)}>Next</Button>
        </div>
      )}
      {active === 1 && (
        <div>
          <Typography>Passenger details (simplified)</Typography>
          <Button onClick={()=>setActive(0)}>Back</Button>
          <Button onClick={()=>setActive(2)}>Next</Button>
        </div>
      )}
      {active === 2 && (
        <div>
          <Typography>Payment simulation: choose wallet or card</Typography>
          <Button onClick={()=>setActive(1)}>Back</Button>
          <Button onClick={()=>setActive(3)}>Next</Button>
        </div>
      )}
      {active === 3 && (
        <div>
          <Button onClick={()=>setActive(2)}>Back</Button>
          <Button variant="contained" onClick={handleConfirm}>Confirm Booking</Button>
        </div>
      )}
    </Container>
  )
}
