import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

export default function Packages(){
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const onSearch = (e) => {
    e.preventDefault()
    // TODO: backend call
    setResults([])
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Travel Packages</Typography>

      <Box component="form" onSubmit={onSearch} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search destination" size="small" InputProps={{ startAdornment: <InputAdornment position="start">🌍</InputAdornment> }} />
        <Button type="submit" variant="contained">Search</Button>
      </Box>

      <Box sx={{ mt: 3 }}>
        {results.length === 0 ? (
          <Typography color="text.secondary">No packages yet. Try searching a destination.</Typography>
        ) : (
          <Grid container spacing={2}>
            {results.map(p => (
              <Grid item xs={12} sm={6} md={4} key={p.id}>
                <Card>
                  <CardMedia component="img" height={140} image={p.image || 'https://source.unsplash.com/600x400/?travel'} alt={p.title} />
                  <CardContent>
                    <Typography variant="h6">{p.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{p.nights || 5} nights • {p.city}</Typography>
                    <Box sx={{ display: 'flex', gap: 1, my: 1, flexWrap: 'wrap' }}>
                      {(p.features || ['Flights','Hotel','Breakfast']).map((f,i)=> <Chip size="small" key={i} label={f} />)}
                    </Box>
                    <Typography variant="subtitle1">${p.price || 899}</Typography>
                    <Button variant="contained" size="small" sx={{ mt: 1 }}>View details</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  )
}
