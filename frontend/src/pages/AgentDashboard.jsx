import React from 'react';
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
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress
} from '@mui/material';
import {
  People,
  AttachMoney,
  Business,
  TrendingUp,
  Notifications,
  Add,
  Download,
  Email,
  Phone,
  CalendarToday,
  Star,
  Group
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

const AgentDashboard = () => {
  const commissionData = [
    { month: 'Jan', commission: 3200, bookings: 45 },
    { month: 'Feb', commission: 2800, bookings: 38 },
    { month: 'Mar', commission: 4100, bookings: 52 },
    { month: 'Apr', commission: 3500, bookings: 48 },
    { month: 'May', commission: 5200, bookings: 65 },
    { month: 'Jun', commission: 4800, bookings: 58 },
  ];

  const bookingTypesData = [
    { name: 'Corporate', value: 60, color: '#0088FE' },
    { name: 'Individual', value: 25, color: '#00C49F' },
    { name: 'Group', value: 15, color: '#FFBB28' },
  ];

  const topClients = [
    { name: 'TechCorp Inc.', bookings: 24, revenue: 45800, status: 'Active' },
    { name: 'Global Solutions', bookings: 18, revenue: 32500, status: 'Active' },
    { name: 'StartUp Ventures', bookings: 12, revenue: 19800, status: 'Active' },
    { name: 'Innovate LLC', bookings: 8, revenue: 15200, status: 'Inactive' },
    { name: 'Enterprise Partners', bookings: 6, revenue: 11200, status: 'Active' },
  ];

  const recentBookings = [
    { id: 'BK-A001', client: 'TechCorp Inc.', type: 'Business Trip', travelers: 3, amount: 4500, commission: 450, status: 'Confirmed', date: '2025-01-15' },
    { id: 'BK-A002', client: 'Global Solutions', type: 'Conference', travelers: 12, amount: 12800, commission: 1280, status: 'Pending', date: '2025-01-14' },
    { id: 'BK-A003', client: 'StartUp Ventures', type: 'Team Retreat', travelers: 8, amount: 7600, commission: 760, status: 'Confirmed', date: '2025-01-14' },
    { id: 'BK-A004', client: 'Enterprise Partners', type: 'Client Meeting', travelers: 2, amount: 3200, commission: 320, status: 'Confirmed', date: '2025-01-13' },
    { id: 'BK-A005', client: 'Innovate LLC', type: 'Training', travelers: 5, amount: 5800, commission: 580, status: 'Cancelled', date: '2025-01-12' },
  ];

  const pendingTasks = [
    { task: 'Follow up with TechCorp on Q2 travel plans', priority: 'High', due: '2025-01-18' },
    { task: 'Prepare group booking for Global Solutions conference', priority: 'Medium', due: '2025-01-20' },
    { task: 'Renew corporate contracts', priority: 'High', due: '2025-01-25' },
    { task: 'Send quarterly reports to clients', priority: 'Low', due: '2025-01-30' },
  ];

  const quickStats = [
    {
      title: 'Total Commission',
      value: '$28,600',
      change: 15.2,
      subtitle: 'Year to Date',
      icon: <AttachMoney sx={{ fontSize: 40, color: '#4CAF50' }} />,
      color: '#4CAF50',
    },
    {
      title: 'Active Clients',
      value: '24',
      change: 8.3,
      subtitle: 'Corporate Accounts',
      icon: <Business sx={{ fontSize: 40, color: '#2196F3' }} />,
      color: '#2196F3',
    },
    {
      title: 'Total Bookings',
      value: '156',
      change: 12.7,
      subtitle: 'This Year',
      icon: <TrendingUp sx={{ fontSize: 40, color: '#FF9800' }} />,
      color: '#FF9800',
    },
    {
      title: 'Satisfaction Rate',
      value: '94%',
      change: 2.1,
      subtitle: 'Client Reviews',
      icon: <Star sx={{ fontSize: 40, color: '#9C27B0' }} />,
      color: '#9C27B0',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
      case 'Active':
        return 'success'
      case 'Pending':
        return 'warning'
      case 'Cancelled':
        return 'error'
      case 'Inactive':
        return 'default'
      default:
        return 'default'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'error'
      case 'Medium':
        return 'warning'
      case 'Low':
        return 'info'
      default:
        return 'default'
    }
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Agent Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your corporate clients and bookings
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Download />}>
            Export Report
          </Button>
          <Button variant="contained" startIcon={<Add />}>
            New Booking
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickStats.map((stat, index) => (
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
                    <Typography variant="body2" color="text.secondary">
                      {stat.subtitle}
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

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3, height: 400 }}>
                <Typography variant="h6" gutterBottom>
                  Commission &amp; Bookings Trend
                </Typography>
                <ResponsiveContainer width="100%" height="90%">
                  <AreaChart data={commissionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip
                      formatter={(value, name) => [
                        name === 'commission' ? `$${value}` : value,
                        name === 'commission' ? 'Commission' : 'Bookings',
                      ]}
                    />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="commission"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                      name="Commission"
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

            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, height: 300 }}>
                <Typography variant="h6" gutterBottom>
                  Client Distribution
                </Typography>
                <ResponsiveContainer width="100%" height="85%">
                  <PieChart>
                    <Pie
                      data={bookingTypesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {bookingTypesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, height: 300 }}>
                <Typography variant="h6" gutterBottom>
                  Monthly Performance
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" sx={{ mr: 2 }}>
                    94%
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    ↑ 5% from last month
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Booking Success Rate
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={94}
                  sx={{ height: 8, borderRadius: 4, mb: 3 }}
                  color="success"
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Response Time</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    2.3h
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={85}
                  sx={{ height: 6, borderRadius: 4, mb: 3 }}
                  color="info"
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Client Satisfaction</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    4.8/5
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={96}
                  sx={{ height: 6, borderRadius: 4 }}
                  color="warning"
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Top Clients</Typography>
                  <Button size="small">View All</Button>
                </Box>
                <List dense>
                  {topClients.map((client, index) => (
                    <ListItem key={index} divider={index < topClients.length - 1}>
                      <ListItemIcon>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                          {client.name.charAt(0)}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={client.name}
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              {client.bookings} bookings • ${client.revenue.toLocaleString()}
                            </Typography>
                            <Chip
                              label={client.status}
                              size="small"
                              color={getStatusColor(client.status)}
                              sx={{ mt: 0.5 }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Pending Tasks</Typography>
                  <Badge badgeContent={pendingTasks.length} color="error">
                    <Notifications color="action" />
                  </Badge>
                </Box>
                <List dense>
                  {pendingTasks.map((task, index) => (
                    <ListItem key={index} divider={index < pendingTasks.length - 1}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              label={task.priority}
                              size="small"
                              color={getPriorityColor(task.priority)}
                            />
                            <Typography variant="body2">{task.task}</Typography>
                          </Box>
                        }
                        secondary={`Due: ${task.due}`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                  View All Tasks
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Email />}
                      size="small"
                      sx={{ mb: 1 }}
                    >
                      Email Client
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Phone />}
                      size="small"
                      sx={{ mb: 1 }}
                    >
                      Call Client
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<CalendarToday />}
                      size="small"
                    >
                      Schedule
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Group />}
                      size="small"
                    >
                      Group Booking
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Recent Corporate Bookings</Typography>
              <Button variant="outlined" startIcon={<Download />}>
                Export Bookings
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Booking ID</TableCell>
                    <TableCell>Client</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Travelers</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Commission</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentBookings.map((booking) => (
                    <TableRow key={booking.id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {booking.id}
                        </Typography>
                      </TableCell>
                      <TableCell>{booking.client}</TableCell>
                      <TableCell>
                        <Chip label={booking.type} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <People sx={{ fontSize: 16, mr: 0.5 }} />
                          {booking.travelers}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          ${booking.amount.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="success.main" sx={{ fontWeight: 'bold' }}>
                          ${booking.commission}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={booking.status}
                          color={getStatusColor(booking.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{booking.date}</TableCell>
                      <TableCell>
                        <Button size="small" variant="outlined">
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AgentDashboard;
