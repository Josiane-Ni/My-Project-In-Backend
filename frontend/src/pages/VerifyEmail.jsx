import React, { useState } from 'react'
import { Box, Button, Container, Paper, TextField, Typography, Alert } from '@mui/material'
import { useSearchParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function VerifyEmail(){
  const [params] = useSearchParams()
  const [token, setToken] = useState(params.get('token') || '')
  const [email, setEmail] = useState(params.get('email') || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e)=>{
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('?action=verifyEmail', { token })
      if(res.data?.success){
        navigate('/login', { replace: true })
      } else {
        setError(res.data?.error || 'Verification failed')
      }
    } catch {
      setError('Verification failed')
    } finally { setLoading(false) }
  }

  const resend = async ()=>{
    if(!email) { setError('Provide your email to resend'); return }
    setError('')
    setLoading(true)
    try {
      const res = await api.post('?action=resendVerification', { email })
      if(res.data?.success){
        if(res.data.verification_token){ setToken(res.data.verification_token) }
      } else {
        setError(res.data?.error || 'Resend failed')
      }
    } catch { setError('Resend failed') } finally { setLoading(false) }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Email Verification</Typography>
        {error && <Alert severity="error" sx={{ mb:2 }}>{error}</Alert>}
        <Box component="form" onSubmit={submit} sx={{ display:'flex', flexDirection:'column', gap:2 }}>
          <TextField label="Verification Token" value={token} onChange={e=>setToken(e.target.value)} required fullWidth />
          <Button type="submit" variant="contained" disabled={loading}>{loading ? 'Verifying...' : 'Verify Email'}</Button>
        </Box>
        <Box sx={{ mt:3, display:'flex', gap:1 }}>
          <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} fullWidth />
          <Button onClick={resend} disabled={loading} variant="outlined">Resend</Button>
        </Box>
      </Paper>
    </Container>
  )
}
