import React, { useEffect, useState } from 'react'
import { Button, TextField, Box, Typography, Link, Paper, Container, Alert, CircularProgress } from '@mui/material'
import { useAuth } from '../contexts/AuthContext'
import { Link as RouterLink, useNavigate } from 'react-router-dom'


const Login = () => {
  const { login, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=> {
    if (user) navigate('/dashboard', { replace: true })
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await login(email, password)
    if(res?.success){ navigate('/dashboard', { replace: true }) }
    else setError(res?.message || 'Invalid email or password')
    setLoading(false)
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error === 'User not found' ? 'Invalid email' : error === 'Invalid credentials' ? 'Invalid password' : error}
            {error === 'Email not verified' && (
              <>
                {" "}
                <Link component={RouterLink} to={`/verify-email?email=${encodeURIComponent(email)}`} sx={{ ml: 1 }}>
                  Verify now
                </Link>
              </>
            )}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? (<><CircularProgress size={22} sx={{ mr: 1 }} /> Signing in...</>) : 'Login'}
          </Button>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register">Register here</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login
