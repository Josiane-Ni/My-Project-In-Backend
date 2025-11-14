import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import MenuIcon from '@mui/icons-material/Menu'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import DarkModeToggle from '../DarkModeToggle'
import SearchBar from './SearchBar'
import NotificationBell from './NotificationBell'

export default function Header(){
  const { currentUser, logout } = useAuth()
  const nav = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [navAnchorEl, setNavAnchorEl] = useState(null)
  const [query, setQuery] = useState('')

  const open = Boolean(anchorEl)
  const handleMenu = (e) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const navMenuOpen = Boolean(navAnchorEl)
  const handleNavMenu = (e) => setNavAnchorEl(e.currentTarget)
  const handleNavClose = () => setNavAnchorEl(null)

  const onSearch = (e) => {
    if(e.key === 'Enter'){
      nav(`/flights?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar sx={{ gap: 2 }}>
        <Box component={RouterLink} to={currentUser ? '/dashboard' : '/'} sx={{ color: 'inherit', textDecoration: 'none', mr: 1, display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>
            Online Travel Booking
          </Typography>
        </Box>

        {currentUser && (
          <>
            <IconButton color="inherit" aria-label="open navigation menu" onClick={handleNavMenu} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="nav-menu"
              anchorEl={navAnchorEl}
              open={navMenuOpen}
              onClose={handleNavClose}
              onClick={handleNavClose}
              transformOrigin={{ horizontal: 'left', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
              <MenuItem onClick={()=>nav('/flights')}>Flights</MenuItem>
              <MenuItem onClick={()=>nav('/hotels')}>Hotels</MenuItem>
              <MenuItem onClick={()=>nav('/packages')}>Packages</MenuItem>
              <MenuItem onClick={()=>nav('/bookings')}>My Bookings</MenuItem>
            </Menu>
          </>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {currentUser && (
          <Box sx={{ width: 300, display: { xs: 'none', md: 'block' } }}>
            <SearchBar value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search flights, hotels..." sx={{ bgcolor: 'background.paper', borderRadius: 1 }} onKeyDown={onSearch} />
          </Box>
        )}

        <DarkModeToggle />

        {currentUser ? (
          <>
            <NotificationBell count={0} onClick={()=>nav('/notifications')} />
            <Tooltip title={currentUser.name || 'Account'}>
              <IconButton onClick={handleMenu} size="small" sx={{ ml: 1 }} aria-controls={open ? 'user-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
                <Avatar sx={{ width: 32, height: 32 }}>{(currentUser.name || 'U').charAt(0).toUpperCase()}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu id="user-menu" anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
              <MenuItem onClick={()=>nav('/profile')}>Profile</MenuItem>
              <MenuItem onClick={()=>nav('/dashboard')}>Dashboard</MenuItem>
              {currentUser.role === 'admin' && <MenuItem onClick={()=>nav('/admin')}>Admin Panel</MenuItem>}
              <Divider />
              <MenuItem onClick={async ()=>{ await logout(); nav('/'); }}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/login">Login</Button>
            <Button color="inherit" component={RouterLink} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
