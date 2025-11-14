import React, { useEffect, useState } from 'react'
import { Paper, Typography, Stack, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import api from '../services/api'

export default function AdminHotels(){
  const [hotels, setHotels] = useState([])
  const [form, setForm] = useState({ name:'', city:'', stars:3, description:'' })

  const load = async ()=>{
    // Placeholder: fetch hotels when backend endpoint exists
    setHotels([])
  }
  useEffect(()=>{ load() }, [])

  const create = async ()=>{
    alert('Implement backend Hotel create/list endpoints to enable this action.')
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Manage Hotels</Typography>
      <Paper sx={{ p:2 }}>
        <Typography variant="subtitle1" gutterBottom>Create Hotel</Typography>
        <Stack direction={{ xs:'column', md:'row' }} spacing={2}>
          <TextField label="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          <TextField label="City" value={form.city} onChange={e=>setForm({...form, city:e.target.value})} />
          <TextField label="Stars" type="number" value={form.stars} onChange={e=>setForm({...form, stars:Number(e.target.value)})} />
          <TextField label="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
          <Button variant="contained" onClick={create}>Create</Button>
        </Stack>
      </Paper>
      <Paper>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Stars</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hotels.map(h=> (
              <TableRow key={h.hotel_id}>
                <TableCell>{h.hotel_id}</TableCell>
                <TableCell>{h.name}</TableCell>
                <TableCell>{h.city}</TableCell>
                <TableCell>{h.stars}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Stack>
  )
}
