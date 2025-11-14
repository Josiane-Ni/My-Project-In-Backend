import React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Header from '../components/common/Header'
import { useNavigate } from 'react-router-dom'

const drawerWidth = 220

export default function AdminLayout({ children }){
  const nav = useNavigate()
  const items = [
    { text: 'Dashboard', to: '/admin' },
    { text: 'Flights', to: '/admin/flights' },
    { text: 'Hotels', to: '/admin/hotels' },
    { text: 'Reports', to: '/admin/reports' }
  ]
  return (
    <>
      <Header />
      <Toolbar />
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              top: { xs: 56, sm: 64 },
              height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
            }
          }}
        >
          <List>
            {items.map(i => (
              <ListItem key={i.text} disablePadding>
                <ListItemButton onClick={()=>nav(i.to)}>
                  <ListItemText primary={i.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
          {children}
        </Box>
      </Box>
    </>
  )
}
