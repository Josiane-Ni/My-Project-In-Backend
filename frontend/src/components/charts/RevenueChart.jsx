import React from 'react'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'

export default function RevenueChart(){
  const data = [
    { month: 'Jan', revenue: 4000, bookings: 24 },
    { month: 'Feb', revenue: 3000, bookings: 18 },
    { month: 'Mar', revenue: 5000, bookings: 30 },
    { month: 'Apr', revenue: 2780, bookings: 22 },
    { month: 'May', revenue: 5890, bookings: 35 },
    { month: 'Jun', revenue: 4390, bookings: 28 },
    { month: 'Jul', revenue: 6490, bookings: 42 },
  ]
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} name="Revenue ($)" />
        <Line type="monotone" dataKey="bookings" stroke="#82ca9d" strokeWidth={2} name="Bookings" />
      </LineChart>
    </ResponsiveContainer>
  )
}
