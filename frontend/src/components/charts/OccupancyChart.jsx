import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

export default function OccupancyChart(){
  const data = [
    { name: 'Flights', value: 45 },
    { name: 'Hotels', value: 30 },
    { name: 'Packages', value: 25 },
  ]
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28']
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`}>
          {data.map((entry, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
