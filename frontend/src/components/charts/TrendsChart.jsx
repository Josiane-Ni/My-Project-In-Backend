import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

export default function TrendsChart(){
  const data = [
    { month: 'Jan', flights: 12, hotels: 8, packages: 4 },
    { month: 'Feb', flights: 8, hotels: 12, packages: 6 },
    { month: 'Mar', flights: 15, hotels: 9, packages: 7 },
    { month: 'Apr', flights: 10, hotels: 11, packages: 5 },
    { month: 'May', flights: 18, hotels: 14, packages: 8 },
    { month: 'Jun', flights: 22, hotels: 16, packages: 10 },
  ]
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="flights" fill="#8884d8" name="Flights" />
        <Bar dataKey="hotels" fill="#82ca9d" name="Hotels" />
        <Bar dataKey="packages" fill="#ffc658" name="Packages" />
      </BarChart>
    </ResponsiveContainer>
  )
}
