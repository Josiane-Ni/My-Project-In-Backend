import React, { useState } from 'react'
import { Paper, Grid, TextField, Button, MenuItem, Box, FormControl, InputLabel, Select } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const FlightSearchForm = ({ onSearch }) => {
  const [searchData, setSearchData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy',
  })

  const cities = [
    'Kigali (KGL)',
    'Nairobi (NBO)',
    'Addis Ababa (ADD)',
    'Johannesburg (JNB)',
    'Dubai (DXB)',
  ]

  const handleChange = (field) => (event) => {
    setSearchData({ ...searchData, [field]: event.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(searchData)
  }

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField select fullWidth label="From" value={searchData.origin} onChange={handleChange('origin')} required>
              {cities.map((city) => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField select fullWidth label="To" value={searchData.destination} onChange={handleChange('destination')} required>
              {cities.map((city) => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField fullWidth type="date" label="Departure" InputLabelProps={{ shrink: true }} value={searchData.departureDate} onChange={handleChange('departureDate')} required />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField fullWidth type="date" label="Return (Optional)" InputLabelProps={{ shrink: true }} value={searchData.returnDate} onChange={handleChange('returnDate')} />
          </Grid>

          <Grid item xs={12} md={1}>
            <TextField fullWidth label="Passengers" type="number" value={searchData.passengers} onChange={handleChange('passengers')} inputProps={{ min: 1, max: 9 }} required />
          </Grid>

          <Grid item xs={12} md={1}>
            <FormControl fullWidth>
              <InputLabel>Class</InputLabel>
              <Select value={searchData.class} label="Class" onChange={handleChange('class')}>
                <MenuItem value="economy">Economy</MenuItem>
                <MenuItem value="business">Business</MenuItem>
                <MenuItem value="first">First</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" size="large" startIcon={<SearchIcon />} fullWidth sx={{ mt: 1 }}>
              Search Flights
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default FlightSearchForm
