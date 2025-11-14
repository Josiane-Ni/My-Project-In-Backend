import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import HotelSearchForm from '../components/forms/HotelSearchForm'

export default function Hotels(){
  const [results, setResults] = useState([])
  const handleSearch = async (payload) => {
    // TODO: call backend when ready
    setResults([])
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Find Hotels</Typography>
      <HotelSearchForm onSubmit={handleSearch} />

      <Box sx={{ mt: 3 }}>
        {results.length === 0 ? (
          <Typography color="text.secondary">No hotels yet. Use the search form above.</Typography>
        ) : (
          <Grid container spacing={2}>
            {results.map(h => (
              <Grid item xs={12} sm={6} md={4} key={h.id}>
                <Card>
                  <CardMedia component="img" height={140} image={h.image || 'https://source.unsplash.com/600x400/?hotel'} alt={h.name} />
                  <CardContent>
                    <Typography variant="h6">{h.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{h.city}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <Rating size="small" value={h.stars || 4} readOnly />
                      <Typography variant="body2">${h.pricePerNight || 120}/night</Typography>
                    </Box>
                    <Button variant="contained" size="small" sx={{ mt: 1 }}>View rooms</Button>
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
