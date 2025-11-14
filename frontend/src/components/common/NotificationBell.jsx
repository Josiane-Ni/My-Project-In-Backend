import React from 'react'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'

export default function NotificationBell({ count = 0, onClick }){
  return (
    <IconButton color="inherit" onClick={onClick} aria-label="notifications">
      <Badge badgeContent={count} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  )
}
