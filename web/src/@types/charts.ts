export interface Sale {
  id: string
  customer: {
    name: string
    email: string
    avatar: string
  }
  amount: number
}

export interface MetricCard {
  title: string
  value: string
  change: string
  changeType: 'increase' | 'decrease'
  changeTimeframe: string
}
