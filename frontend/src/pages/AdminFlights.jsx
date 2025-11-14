import React, { useEffect, useMemo, useState } from 'react'
import { Paper, Typography, Stack, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, TablePagination } from '@mui/material'
import api from '../services/api'

export default function AdminFlights(){
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ airline:'', origin:'', destination:'', departure_time:'', arrival_time:'', seats_total:0, seats_available:0, price:0 })
  const [query, setQuery] = useState({ airline:'', origin:'', destination:'' })
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const load = async ()=>{
    setLoading(true)
    try {
      const res = await api.get('', { params: { action: 'searchFlights' } })
      setFlights(res.data || [])
    } catch {
    } finally { setLoading(false) }
  }
  useEffect(()=>{ load() }, [])

  const create = async ()=>{
    // Placeholder: backend route not implemented here. Keep UI ready.
    alert('Implement backend createFlight endpoint to enable this action.')
  }

  const filtered = useMemo(()=>{
    return flights.filter(f => (
      (query.airline ? f.airline.toLowerCase().includes(query.airline.toLowerCase()) : true) &&
      (query.origin ? f.origin.toLowerCase().includes(query.origin.toLowerCase()) : true) &&
      (query.destination ? f.destination.toLowerCase().includes(query.destination.toLowerCase()) : true)
    ))
  }, [flights, query])

  const paged = useMemo(()=>{
    const start = page * rowsPerPage
    return filtered.slice(start, start + rowsPerPage)
  }, [filtered, page, rowsPerPage])

  const toggleSelect = (id, checked) => {
    setSelected(prev => checked ? [...prev, id] : prev.filter(x => x !== id))
  }

  const toggleSelectAll = (checked) => {
    setSelected(checked ? paged.map(f => f.flight_id) : [])
  }

  const deleteSelected = async () => {
    if(selected.length === 0) return
    if(!confirm(`Delete ${selected.length} flight(s)?`)) return
    try {
      const res = await api.post('?action=deleteFlights', { ids: selected })
      setSelected([])
      await load()
    } catch {
    }
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Manage Flights</Typography>
      <Paper sx={{ p:2 }}>
        <Typography variant="subtitle1" gutterBottom>Create Flight</Typography>
        <Stack direction={{ xs:'column', md:'row' }} spacing={2}>
          <TextField label="Airline" value={form.airline} onChange={e=>setForm({...form, airline:e.target.value})} />
          <TextField label="Origin" value={form.origin} onChange={e=>setForm({...form, origin:e.target.value})} />
          <TextField label="Destination" value={form.destination} onChange={e=>setForm({...form, destination:e.target.value})} />
          <TextField label="Departure" type="datetime-local" InputLabelProps={{shrink:true}} value={form.departure_time} onChange={e=>setForm({...form, departure_time:e.target.value})} />
          <TextField label="Arrival" type="datetime-local" InputLabelProps={{shrink:true}} value={form.arrival_time} onChange={e=>setForm({...form, arrival_time:e.target.value})} />
          <TextField label="Seats" type="number" value={form.seats_total} onChange={e=>setForm({...form, seats_total:Number(e.target.value), seats_available:Number(e.target.value)})} />
          <TextField label="Price" type="number" value={form.price} onChange={e=>setForm({...form, price:Number(e.target.value)})} />
          <Button variant="contained" onClick={create}>Create</Button>
        </Stack>
      </Paper>
      <Paper>
        <Stack direction={{ xs:'column', md:'row' }} spacing={2} sx={{ p:2, alignItems:'center' }}>
          <TextField label="Filter Airline" value={query.airline} onChange={e=>setQuery({...query, airline:e.target.value})} size="small" />
          <TextField label="Filter Origin" value={query.origin} onChange={e=>setQuery({...query, origin:e.target.value})} size="small" />
          <TextField label="Filter Destination" value={query.destination} onChange={e=>setQuery({...query, destination:e.target.value})} size="small" />
          <Button color="error" variant="outlined" onClick={deleteSelected} disabled={selected.length===0}>Delete Selected</Button>
        </Stack>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length>0 && selected.length<paged.length}
                  checked={paged.length>0 && selected.length===paged.length}
                  onChange={e=>toggleSelectAll(e.target.checked)}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Airline</TableCell>
              <TableCell>Route</TableCell>
              <TableCell>Departure</TableCell>
              <TableCell>Seats</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paged.map(f=> (
              <TableRow key={f.flight_id} hover>
                <TableCell padding="checkbox">
                  <Checkbox checked={selected.includes(f.flight_id)} onChange={e=>toggleSelect(f.flight_id, e.target.checked)} />
                </TableCell>
                <TableCell>{f.flight_id}</TableCell>
                <TableCell>{f.airline}</TableCell>
                <TableCell>{f.origin} → {f.destination}</TableCell>
                <TableCell>{f.departure_time}</TableCell>
                <TableCell>{f.seats_available}/{f.seats_total}</TableCell>
                <TableCell>${f.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={(e, p)=>setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={e=>{ setRowsPerPage(parseInt(e.target.value,10)); setPage(0) }}
          rowsPerPageOptions={[5,10,25,50]}
        />
      </Paper>
    </Stack>
  )
}
