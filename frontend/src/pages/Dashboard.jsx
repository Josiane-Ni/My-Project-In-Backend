import React from 'react';
import { Box, Grid, Paper, Typography, Card, CardContent, Avatar, Stack, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext'
import { Link as RouterLink } from 'react-router-dom'
import TrendsChart from '../components/charts/TrendsChart'
import OccupancyChart from '../components/charts/OccupancyChart'


const Dashboard = () => {
  const { user } = useAuth()
  const initials = (user?.name || user?.email || 'User').split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase()
  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Section with Avatar */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome back{user?.name ? `, ${user.name}` : ''}!
          </Typography>
          <Typography variant="body1">
            Here's an overview of your travel bookings and activities.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: 'primary.main' }}>{initials}</Avatar>
          <Button component={RouterLink} to="/profile" variant="outlined" size="small">Profile</Button>
        </Stack>
      </Stack>


      {/* Summary Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#667eea', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Flights</Typography>
              <Typography variant="h4">5</Typography>
              <Typography variant="body2">Upcoming flights</Typography>
            </CardContent>
          </Card>
        </Grid>


        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#764ba2', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Hotels</Typography>
              <Typography variant="h4">3</Typography>
              <Typography variant="body2">Booked hotels</Typography>
            </CardContent>
          </Card>
        </Grid>


        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#f6ad55', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Packages</Typography>
              <Typography variant="h4">2</Typography>
              <Typography variant="body2">Travel packages</Typography>
            </CardContent>
          </Card>
        </Grid>


        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#38b2ac', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Bookings</Typography>
              <Typography variant="h4">7</Typography>
              <Typography variant="body2">Total bookings</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>


      {/* Charts */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Booking Trends</Typography>
            <TrendsChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Travel Distribution</Typography>
            <OccupancyChart />
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Activity Section */}
      <Paper sx={{ mt: 5, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        <Typography variant="body2">
          You recently booked a flight to Paris and a hotel in New York.
          Keep exploring new destinations!
        </Typography>
      </Paper>
    </Box>
  );
};


export default Dashboard;
