import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Avatar,
  IconButton
} from '@mui/material';
import { Email, Phone, Edit, Star } from '@mui/icons-material';

const ClientManagement = () => {
  const clients = [
    {
      id: 1,
      name: 'TechCorp Inc.',
      contact: 'John Smith',
      email: 'john@techcorp.com',
      phone: '+1-555-0123',
      bookings: 24,
      revenue: 45800,
      status: 'Active',
      rating: 4.8,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Client Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Bookings</TableCell>
              <TableCell>Revenue</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {client.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body1" fontWeight="bold">
                        {client.name}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{client.contact}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {client.email}
                  </Typography>
                </TableCell>
                <TableCell>{client.bookings}</TableCell>
                <TableCell>${client.revenue.toLocaleString()}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Star sx={{ color: 'gold', fontSize: 18 }} />
                    <Typography variant="body2">{client.rating}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={client.status}
                    color={client.status === 'Active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" color="primary">
                      <Email />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <Phone />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <Edit />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClientManagement;
