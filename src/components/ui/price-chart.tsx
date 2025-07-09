"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PriceData {
  time: string
  price: number
  date: string
}

interface PriceChartProps {
  data: PriceData[]
  cryptoName: string
  cryptoSymbol: string
  currentPrice: number
  priceChange: number
  timePeriod: string
}

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function PriceChart({ data, cryptoName, cryptoSymbol, currentPrice, priceChange, timePeriod }: PriceChartProps) {
  const isPositive = priceChange >= 0

  const formatPrice = (price: number) => {
    if (price < 1) return `$${price.toFixed(4)}`
    if (price < 100) return `$${price.toFixed(2)}`
    return `$${price.toLocaleString()}`
  }

  const getTimePeriodLabel = (period: string) => {
    switch (period) {
      case "1D":
        return "Today"
      case "7D":
        return "Last 7 Days"
      case "28D":
        return "Last 28 Days"
      default:
        return period
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">
              {cryptoName} ({cryptoSymbol})
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{getTimePeriodLabel(timePeriod)} Price Chart</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{formatPrice(currentPrice)}</div>
            <Badge variant={isPositive ? "default" : "destructive"} className="flex items-center gap-1 mt-2">
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {isPositive ? "+" : ""}
              {priceChange.toFixed(2)}%
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="time" className="text-xs" tick={{ fontSize: 12 }} />
              <YAxis className="text-xs" tick={{ fontSize: 12 }} tickFormatter={(value) => formatPrice(value)} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => [formatPrice(value as number), "Price"]}
                    labelFormatter={(label, payload) => {
                      if (payload && payload[0]) {
                        const data = payload[0].payload as PriceData
                        return data.date
                      }
                      return label
                    }}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="var(--color-price)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: "var(--color-price)", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
