import React from 'react'
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material'
import {
  MoreVert,
  TrendingUp,
  People,
  Flight,
  Hotel,
  AttachMoney,
  Download,
} from '@mui/icons-material'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = React.useState('month')
  const [anchorEl, setAnchorEl] = React.useState(null)

  const revenueData = [
    { month: 'Jan', revenue: 40000, bookings: 240 },
    { month: 'Feb', revenue: 30000, bookings: 198 },
    { month: 'Mar', revenue: 50000, bookings: 260 },
    { month: 'Apr', revenue: 27800, bookings: 190 },
    { month: 'May', revenue: 58900, bookings: 320 },
    { month: 'Jun', revenue: 43900, bookings: 280 },
    { month: 'Jul', revenue: 74900, bookings: 410 },
  ]

  const bookingTypesData = [
    { name: 'Flights', value: 45 },
    { name: 'Hotels', value: 30 },
    { name: 'Packages', value: 25 },
  ]

  const topDestinations = [
    { destination: 'Paris', bookings: 156, revenue: 78400 },
    { destination: 'London', bookings: 142, revenue: 71200 },
    { destination: 'New York', bookings: 128, revenue: 64500 },
    { destination: 'Tokyo', bookings: 98, revenue: 49200 },
    { destination: 'Dubai', bookings: 87, revenue: 43800 },
  ]

  const userStats = [
    { role: 'Customers', count: 1245, growth: 12 },
    { role: 'Agents', count: 45, growth: 5 },
    { role: 'Admins', count: 3, growth: 0 },
  ]

  const recentBookings = [
    { id: 'BK001', user: 'John Doe', type: 'Flight', amount: 450, status: 'Confirmed', date: '2025-01-15' },
    { id: 'BK002', user: 'Jane Smith', type: 'Hotel', amount: 320, status: 'Pending', date: '2025-01-14' },
    { id: 'BK003', user: 'Mike Johnson', type: 'Package', amount: 1200, status: 'Confirmed', date: '2025-01-14' },
    { id: 'BK004', user: 'Sarah Wilson', type: 'Flight', amount: 380, status: 'Cancelled', date: '2025-01-13' },
    { id: 'BK005', user: 'Tom Brown', type: 'Hotel', amount: 275, status: 'Confirmed', date: '2025-01-12' },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'success'
      case 'Pending':
        return 'warning'
      case 'Cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  const statsCards = [
    {
      title: 'Total Revenue',
      value: '$324,800',
      change: 12.5,
      icon: <AttachMoney sx={{ fontSize: 40, color: '#4CAF50' }} />,
      color: '#4CAF50',
    },
    {
      title: 'Total Bookings',
      value: '2,847',
      change: 8.2,
      icon: <TrendingUp sx={{ fontSize: 40, color: '#2196F3' }} />,
      color: '#2196F3',
    },
    {
      title: 'Active Users',
      value: '1,293',
      change: 15.3,
      icon: <People sx={{ fontSize: 40, color: '#FF9800' }} />,
      color: '#FF9800',
    },
    {
      title: 'Occupancy Rate',
      value: '78.5%',
      change: 3.7,
      icon: <Hotel sx={{ fontSize: 40, color: '#9C27B0' }} />,
      color: '#9C27B0',
    },
  ]

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="week">Last Week</MenuItem>
              <MenuItem value="month">Last Month</MenuItem>
              <MenuItem value="quarter">Last Quarter</MenuItem>
              <MenuItem value="year">Last Year</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<Download />}>
            Export Report
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={3}
              sx={{
                borderLeft: `4px solid ${stat.color}`,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: stat.change >= 0 ? 'success.main' : 'error.main',
                        mt: 1,
                      }}
                    >
                      {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}% from last period
                    </Typography>
                  </Box>
                  {stat.icon}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <Paper elevation={2} sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Revenue &amp; Bookings Trend
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                  name="Revenue ($)"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="bookings"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.3}
                  name="Bookings"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper elevation={2} sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Booking Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={bookingTypesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {bookingTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Top Destinations
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={topDestinations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="destination" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#8884d8" name="Bookings" />
                <Bar dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              User Statistics
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={userStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#ffc658" name="User Count" />
                <Bar dataKey="growth" fill="#ff7300" name="Growth (%)" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Recent Bookings</Typography>
          <Button variant="outlined">View All Bookings</Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Booking ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {booking.id}
                    </Typography>
                  </TableCell>
                  <TableCell>{booking.user}</TableCell>
                  <TableCell>
                    <Chip
                      label={booking.type}
                      size="small"
                      color={
                        booking.type === 'Flight'
                          ? 'primary'
                          : booking.type === 'Hotel'
                          ? 'secondary'
                          : 'default'
                      }
                    />
                  </TableCell>
                  <TableCell>${booking.amount}</TableCell>
                  <TableCell>
                    <Chip
                      label={booking.status}
                      color={getStatusColor(booking.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={handleMenuOpen}>
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Flight sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Manage Flights
              </Typography>
              <Button variant="contained" size="small">
                View Flights
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Hotel sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Manage Hotels
              </Typography>
              <Button variant="contained" size="small" color="secondary">
                View Hotels
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <People sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                User Management
              </Typography>
              <Button variant="contained" size="small" color="success">
                Manage Users
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <AttachMoney sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Promotions
              </Typography>
              <Button variant="contained" size="small" color="warning">
                Create Offer
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit Booking</MenuItem>
        <MenuItem onClick={handleMenuClose}>Cancel Booking</MenuItem>
        <MenuItem onClick={handleMenuClose}>Generate Invoice</MenuItem>
      </Menu>
    </Box>
  )
}

export default AdminDashboard
