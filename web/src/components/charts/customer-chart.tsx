'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

interface CustomerChartProps {
  data: { name: string; total: number }[]
}

export function CustomerChart({ data }: CustomerChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Novos Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
