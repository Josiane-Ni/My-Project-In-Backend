import React, { useState } from 'react'
import { Paper, Grid, TextField, Button, MenuItem, Box, FormControl, InputLabel, Select, Typography } from '@mui/material'

export default function BookingForm({ defaultValues = {}, onSubmit }){
  const [form, setForm] = useState({
    passengers: 1,
    travelDate: '',
    travelClass: 'economy',
    paymentMethod: 'wallet',
    promoCode: '',
    ...defaultValues,
  })

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.travelDate) return
    if (form.passengers < 1) return
    onSubmit?.(form)
  }

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Complete your booking</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField fullWidth type="date" label="Travel date" InputLabelProps={{ shrink: true }} value={form.travelDate} onChange={handleChange('travelDate')} required />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField fullWidth label="Passengers" type="number" value={form.passengers} onChange={handleChange('passengers')} inputProps={{ min: 1, max: 9 }} required />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Class</InputLabel>
              <Select value={form.travelClass} label="Class" onChange={handleChange('travelClass')}>
                <MenuItem value="economy">Economy</MenuItem>
                <MenuItem value="business">Business</MenuItem>
                <MenuItem value="first">First</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Payment</InputLabel>
              <Select value={form.paymentMethod} label="Payment" onChange={handleChange('paymentMethod')}>
                <MenuItem value="wallet">Wallet</MenuItem>
                <MenuItem value="card">Credit Card</MenuItem>
                <MenuItem value="cash">Cash</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField fullWidth label="Promo code" value={form.promoCode} onChange={handleChange('promoCode')} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>Confirm Booking</Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}
