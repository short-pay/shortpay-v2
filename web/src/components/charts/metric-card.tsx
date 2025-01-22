import { Card, CardContent } from '@/components/ui/card'
import { ArrowDown, ArrowUp } from 'lucide-react'
import type { MetricCard } from '@/@types/charts'

export function MetricCardComponent({
  title,
  value,
  change,
  changeType,
  changeTimeframe,
}: MetricCard) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">{value}</h2>
            <span
              className={`flex items-center text-sm ${
                changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {changeType === 'increase' ? (
                <ArrowUp className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4" />
              )}
              {change}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{changeTimeframe}</p>
        </div>
      </CardContent>
    </Card>
  )
}
