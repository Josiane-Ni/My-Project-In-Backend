import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import DataTable from '../components/common/DataTable'

export default function MyBookings(){
  const columns = [
    { field: 'id', headerName: 'Ref', width: 120 },
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'details', headerName: 'Details', flex: 1 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'total', headerName: 'Total', width: 120 },
    { field: 'status', headerName: 'Status', width: 130 },
    {
      field: 'actions', headerName: 'Actions', width: 200, sortable: false, filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined">View</Button>
          <Button size="small" variant="text" color="error">Cancel</Button>
        </Stack>
      )
    }
  ]

  const rows = []

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>My Bookings</Typography>
      <DataTable rows={rows} columns={columns} height={520} />
    </Box>
  )
}
