import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = ({ drawerWidth = 220 }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          top: { xs: 56, sm: 64 },
          height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
        },
      }}
    >
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/flights">
          <ListItemText primary="Flights" />
        </ListItem>
        <ListItem button component={Link} to="/hotels">
          <ListItemText primary="Hotels" />
        </ListItem>
        <ListItem button component={Link} to="/packages">
          <ListItemText primary="Packages" />
        </ListItem>
        <ListItem button component={Link} to="/bookings">
          <ListItemText primary="My Bookings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
