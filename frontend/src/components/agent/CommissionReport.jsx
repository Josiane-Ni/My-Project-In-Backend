import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { TrendingUp, AttachMoney, CalendarToday } from '@mui/icons-material';

const CommissionReport = () => {
  const commissionData = [
    { month: 'January', bookings: 18, revenue: 32400, commission: 3240 },
    { month: 'February', bookings: 22, revenue: 41800, commission: 4180 },
    { month: 'March', bookings: 25, revenue: 51200, commission: 5120 },
    { month: 'April', bookings: 19, revenue: 38700, commission: 3870 },
    { month: 'May', bookings: 28, revenue: 64500, commission: 6450 },
    { month: 'June', bookings: 24, revenue: 52800, commission: 5280 },
  ];

  const totalCommission = commissionData.reduce((sum, item) => sum + item.commission, 0);
  const totalBookings = commissionData.reduce((sum, item) => sum + item.bookings, 0);
  const totalRevenue = commissionData.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Commission Reports
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <AttachMoney sx={{ fontSize: 40, color: 'success.main', mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                ${totalCommission.toLocaleString()}
              </Typography>
              <Typography color="textSecondary">Total Commission (YTD)</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <TrendingUp sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                {totalBookings}
              </Typography>
              <Typography color="textSecondary">Total Bookings (YTD)</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <CalendarToday sx={{ fontSize: 40, color: 'warning.main', mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                ${totalRevenue.toLocaleString()}
              </Typography>
              <Typography color="textSecondary">Total Revenue (YTD)</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell align="right">Bookings</TableCell>
                <TableCell align="right">Revenue</TableCell>
                <TableCell align="right">Commission (10%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {commissionData.map((row) => (
                <TableRow key={row.month}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell align="right">{row.bookings}</TableCell>
                  <TableCell align="right">${row.revenue.toLocaleString()}</TableCell>
                  <TableCell align="right">
                    <Typography variant="body1" color="success.main" fontWeight="bold">
                      ${row.commission.toLocaleString()}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default CommissionReport;
