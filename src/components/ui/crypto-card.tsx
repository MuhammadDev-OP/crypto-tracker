import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

interface CryptoCardProps {
  name: string
  symbol: string
  price: number
  change24h: number
  marketCap: number
  volume: number
  icon: string
}

export function CryptoCard({ name, symbol, price, change24h, marketCap, volume, icon }: CryptoCardProps) {
  const isPositive = change24h >= 0

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
            {icon}
          </div>
          <div>
            <div className="font-semibold">{name}</div>
            <div className="text-xs text-muted-foreground">{symbol}</div>
          </div>
        </CardTitle>
        <Badge variant={isPositive ? "default" : "destructive"} className="flex items-center gap-1">
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isPositive ? "+" : ""}
          {change24h.toFixed(2)}%
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${price.toLocaleString()}</div>
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div>
            <p className="text-muted-foreground">Market Cap</p>
            <p className="font-semibold">{formatNumber(marketCap)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Volume (24h)</p>
            <p className="font-semibold">{formatNumber(volume)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
