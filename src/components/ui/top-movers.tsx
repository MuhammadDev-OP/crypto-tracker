import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

interface Mover {
  name: string
  symbol: string
  price: number
  change: number
  icon: string
}

interface TopMoversProps {
  gainers: Mover[]
  losers: Mover[]
}

export function TopMovers({ gainers, losers }: TopMoversProps) {
  const MoverItem = ({ mover, isGainer }: { mover: Mover; isGainer: boolean }) => (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
          {mover.icon}
        </div>
        <div>
          <div className="font-medium text-sm">{mover.name}</div>
          <div className="text-xs text-muted-foreground">{mover.symbol}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-semibold text-sm">${mover.price.toLocaleString()}</div>
        <Badge variant={isGainer ? "default" : "destructive"} className="text-xs">
          {isGainer ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {isGainer ? "+" : ""}
          {mover.change.toFixed(2)}%
        </Badge>
      </div>
    </div>
  )

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Top Gainers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {gainers.map((gainer, index) => (
            <MoverItem key={index} mover={gainer} isGainer={true} />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-500" />
            Top Losers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {losers.map((loser, index) => (
            <MoverItem key={index} mover={loser} isGainer={false} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
