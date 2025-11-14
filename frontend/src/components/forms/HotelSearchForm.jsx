import React, { useState } from 'react'
import { Paper, Grid, TextField, Button, MenuItem, Box, FormControl, InputLabel, Select } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function HotelSearchForm({ onSearch }){
  const [form, setForm] = useState({ city: '', checkIn: '', checkOut: '', guests: 1, rooms: 1, stars: '' })
  const cities = ['Kigali', 'Nairobi', 'Addis Ababa', 'Johannesburg', 'Dubai']

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value })
  const handleSubmit = (e) => { e.preventDefault(); onSearch?.(form) }

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField select fullWidth label="City" value={form.city} onChange={handleChange('city')} required>
              {cities.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField fullWidth type="date" label="Check-in" InputLabelProps={{ shrink: true }} value={form.checkIn} onChange={handleChange('checkIn')} required />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField fullWidth type="date" label="Check-out" InputLabelProps={{ shrink: true }} value={form.checkOut} onChange={handleChange('checkOut')} required />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField fullWidth label="Guests" type="number" value={form.guests} onChange={handleChange('guests')} inputProps={{ min: 1, max: 10 }} required />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField fullWidth label="Rooms" type="number" value={form.rooms} onChange={handleChange('rooms')} inputProps={{ min: 1, max: 5 }} required />
          </Grid>
          <Grid item xs={12} md={1}>
            <FormControl fullWidth>
              <InputLabel>Stars</InputLabel>
              <Select value={form.stars} label="Stars" onChange={handleChange('stars')}>
                <MenuItem value="">Any</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" size="large" startIcon={<SearchIcon />} fullWidth sx={{ mt: 1 }}>
              Search Hotels
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}
