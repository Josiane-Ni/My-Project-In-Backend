import React, { useState } from 'react'
import { Container, Grid, Typography } from '@mui/material'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import FlightCard from '../components/FlightCard'
import FlightSearchForm from '../components/forms/FlightSearchForm'

export default function FlightSearch(){
  const [results,setResults] = useState([])
  const nav = useNavigate()

  const normalizeCity = (s='') => s.replace(/\s*\([^)]*\)\s*/g,'').trim()

  const handleSearch = async (data) => {
    const origin = normalizeCity(data.origin)
    const destination = normalizeCity(data.destination)
    const date = data.departureDate
    const res = await api.get('', { params: { action: 'searchFlights', origin, destination, date }})
    setResults(res.data || [])
  }

  return (
    <Container sx={{ mt: 3 }}>
      <FlightSearchForm onSearch={handleSearch} />
      <Typography variant="h6" sx={{ mb: 1 }}>Results</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {results.map(f => (
          <Grid item xs={12} key={f.flight_id}>
            <FlightCard
              flight={{
                ...f,
                price_economy: f.price ?? f.price_economy ?? 0,
                price_business: f.price_business ?? Math.round((f.price ?? 0) * 1.6),
                price_first: f.price_first ?? Math.round((f.price ?? 0) * 2.2),
              }}
              onBook={(flight)=> nav('/book', { state: { flight } })}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
