import React, { useEffect, useState } from 'react'
import { Paper, Typography } from '@mui/material'

export default function Reports(){
  const [data] = useState([
    { month: 'Jan', revenue: 1200 },
    { month: 'Feb', revenue: 1800 },
    { month: 'Mar', revenue: 1500 }
  ])

  useEffect(()=>{
    // TODO: call backend report endpoint when available
  }, [])

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Reports</Typography>
      <Typography variant="body2" color="text.secondary">Backend aggregation endpoint pending. Placeholder chart/data here.</Typography>
      <pre style={{ marginTop: 12 }}>{JSON.stringify(data, null, 2)}</pre>
    </Paper>
  )
}
