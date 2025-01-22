'use client'

import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { DashboardNav } from './dashboard-nav'
import { MetricCardComponent } from './metric-card'
import { RecentSales } from './recent-sales'
import { SalesChart } from './sales-chart'
import { RevenueChart } from './revenue-chart'
import { CustomerChart } from './customer-chart'
import { format } from 'date-fns'

const metrics = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '20.1%',
    changeType: 'increase' as const,
    changeTimeframe: 'from last month',
  },
  {
    title: 'Subscriptions',
    value: '+2,350',
    change: '180.1%',
    changeType: 'increase' as const,
    changeTimeframe: 'from last month',
  },
  {
    title: 'Sales',
    value: '+12,234',
    change: '19%',
    changeType: 'increase' as const,
    changeTimeframe: 'from last month',
  },
  {
    title: 'Active Now',
    value: '573',
    change: '201',
    changeType: 'increase' as const,
    changeTimeframe: 'since last hour',
  },
]

const recentSales = [
  {
    id: '1',
    customer: {
      name: 'Olivia Martin',
      email: 'olivia.martin@email.com',
      avatar: '/placeholder.svg',
    },
    amount: 1999.0,
  },
  {
    id: '2',
    customer: {
      name: 'Jackson Lee',
      email: 'jackson.lee@email.com',
      avatar: '/placeholder.svg',
    },
    amount: 39.0,
  },
  {
    id: '3',
    customer: {
      name: 'Isabella Nguyen',
      email: 'isabella.nguyen@email.com',
      avatar: '/placeholder.svg',
    },
    amount: 299.0,
  },
  {
    id: '4',
    customer: {
      name: 'William Kim',
      email: 'will@email.com',
      avatar: '/placeholder.svg',
    },
    amount: 99.0,
  },
  {
    id: '5',
    customer: {
      name: 'Sofia Davis',
      email: 'sofia.davis@email.com',
      avatar: '/placeholder.svg',
    },
    amount: 39.0,
  },
]

const data = {
  '7d': {
    sales: [
      { name: '20 Jan', total: 1200 },
      { name: '21 Jan', total: 1800 },
      { name: '22 Jan', total: 1400 },
      { name: '23 Jan', total: 2200 },
      { name: '24 Jan', total: 1600 },
      { name: '25 Jan', total: 2000 },
      { name: '26 Jan', total: 2400 },
    ],
    revenue: [
      { name: '20 Jan', total: 5000 },
      { name: '21 Jan', total: 7500 },
      { name: '22 Jan', total: 6000 },
      { name: '23 Jan', total: 9000 },
      { name: '24 Jan', total: 6500 },
      { name: '25 Jan', total: 8000 },
      { name: '26 Jan', total: 10000 },
    ],
    customers: [
      { name: '20 Jan', total: 50 },
      { name: '21 Jan', total: 75 },
      { name: '22 Jan', total: 60 },
      { name: '23 Jan', total: 90 },
      { name: '24 Jan', total: 70 },
      { name: '25 Jan', total: 85 },
      { name: '26 Jan', total: 100 },
    ],
  },
  '30d': {
    sales: Array.from({ length: 30 }, (_, i) => ({
      name: format(new Date(2023, 0, i + 1), 'dd MMM'),
      total: Math.floor(Math.random() * 3000) + 1000,
    })),
    revenue: Array.from({ length: 30 }, (_, i) => ({
      name: format(new Date(2023, 0, i + 1), 'dd MMM'),
      total: Math.floor(Math.random() * 15000) + 5000,
    })),
    customers: Array.from({ length: 30 }, (_, i) => ({
      name: format(new Date(2023, 0, i + 1), 'dd MMM'),
      total: Math.floor(Math.random() * 100) + 50,
    })),
  },
  '90d': {
    sales: Array.from({ length: 90 }, (_, i) => ({
      name: format(new Date(2023, 0, i + 1), 'dd MMM'),
      total: Math.floor(Math.random() * 3000) + 1000,
    })),
    revenue: Array.from({ length: 90 }, (_, i) => ({
      name: format(new Date(2023, 0, i + 1), 'dd MMM'),
      total: Math.floor(Math.random() * 15000) + 5000,
    })),
    customers: Array.from({ length: 90 }, (_, i) => ({
      name: format(new Date(2023, 0, i + 1), 'dd MMM'),
      total: Math.floor(Math.random() * 100) + 50,
    })),
  },
}

const getDateRangeKey = (
  dateRange: DateRange | undefined,
): '7d' | '30d' | '90d' => {
  if (!dateRange?.from || !dateRange?.to) return '7d'
  const days = Math.ceil(
    (dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24),
  )
  if (days <= 7) return '7d'
  if (days <= 30) return '30d'
  return '90d'
}

export function Dashboard() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: new Date(2023, 1, 9),
  })

  return (
    <div className="flex-1 space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <DashboardNav
        date={date}
        onDateChange={setDate}
        onSearch={() => console.log('Buscar dados para', date)}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <MetricCardComponent key={i} {...metric} />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <SalesChart data={data[getDateRangeKey(date)].sales} />

        <RecentSales sales={recentSales} />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <RevenueChart data={data[getDateRangeKey(date)].revenue} />

        <CustomerChart data={data[getDateRangeKey(date)].customers} />
      </div>
    </div>
  )
}
