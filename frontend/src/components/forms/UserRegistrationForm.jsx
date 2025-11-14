import React, { useState } from 'react'
import { Paper, Grid, TextField, Button, Box, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export default function UserRegistrationForm({ onSubmit }){
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name:'', email:'', password:'', confirmPassword:'', role:'customer', phone:'' })

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if(form.password !== form.confirmPassword){ setError('Passwords do not match'); return }
    setLoading(true)
    try {
      await onSubmit?.({ name: form.name, email: form.email, password: form.password, role: form.role, phone: form.phone })
    } catch(err){
      setError(err?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}><TextField fullWidth label="Full name" value={form.name} onChange={handleChange('name')} required /></Grid>
          <Grid item xs={12} md={6}><TextField fullWidth label="Email" value={form.email} onChange={handleChange('email')} required /></Grid>
          <Grid item xs={12} md={6}><TextField fullWidth label="Password" type="password" value={form.password} onChange={handleChange('password')} required /></Grid>
          <Grid item xs={12} md={6}><TextField fullWidth label="Confirm password" type="password" value={form.confirmPassword} onChange={handleChange('confirmPassword')} required /></Grid>
          <Grid item xs={12} md={6}><TextField fullWidth label="Phone" value={form.phone} onChange={handleChange('phone')} /></Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select value={form.role} label="Role" onChange={handleChange('role')}>
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="agent">Travel Agent</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}><Button type="submit" variant="contained" fullWidth disabled={loading}>{loading ? 'Submitting...' : 'Sign Up'}</Button></Grid>
        </Grid>
      </Box>
    </Paper>
  )
}
