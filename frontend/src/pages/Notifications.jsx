import React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

export default function Notifications(){
  const items = []
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Notifications</Typography>
      {items.length === 0 ? (
        <Typography color="text.secondary">You're all caught up. No notifications yet.</Typography>
      ) : (
        <List>
          {items.map((n, idx) => (
            <React.Fragment key={idx}>
              <ListItem alignItems="flex-start">
                <ListItemText primary={n.title} secondary={n.message} />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  )
}
