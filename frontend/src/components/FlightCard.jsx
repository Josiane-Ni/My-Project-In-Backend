import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Grid,
} from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';

const FlightCard = ({ flight, onBook }) => {
  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card sx={{ mb: 2, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <FlightIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" component="div">
                {flight.airline}
              </Typography>
            </Box>
            <Chip
              icon={<AirlineSeatReclineNormalIcon />}
              label={`${flight.seats_available} seats left`}
              color={flight.seats_available < 10 ? 'error' : 'success'}
              size="small"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box textAlign="center">
                <Typography variant="h6" fontWeight="bold">
                  {formatTime(flight.departure_time)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {flight.origin}
                </Typography>
              </Box>

              <Box textAlign="center" sx={{ mx: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {flight.duration || '2h 30m'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Direct
                </Typography>
              </Box>

              <Box textAlign="center">
                <Typography variant="h6" fontWeight="bold">
                  {formatTime(flight.arrival_time)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {flight.destination}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" color="primary" fontWeight="bold">
                ${flight.price_economy}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Economy
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Chip label={`Business $${flight.price_business}`} variant="outlined" size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                <Chip label={`First $${flight.price_first}`} variant="outlined" size="small" />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => onBook(flight)}
              disabled={flight.seats_available === 0}
            >
              {flight.seats_available === 0 ? 'Sold Out' : 'Book Now'}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
