"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { RefreshCw, AlertCircle, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

import { CryptoSelector } from "../ui/crypto-selector"
import { TimePeriodSelector } from "../ui/time-period-selector"
import { PriceChart } from "../ui/price-chart"

const cryptoOptions = [
  { value: "bitcoin", label: "Bitcoin", symbol: "BTC", icon: "₿" },
  { value: "ethereum", label: "Ethereum", symbol: "ETH", icon: "Ξ" },
  { value: "solana", label: "Solana", symbol: "SOL", icon: "S" },
  { value: "cardano", label: "Cardano", symbol: "ADA", icon: "A" },
  { value: "ripple", label: "XRP", symbol: "XRP", icon: "X" },
]

function getDaysForPeriod(period: string): string {
  switch (period) {
    case "1D":
      return "1"
    case "7D":
      return "7"
    case "28D":
      return "30"
    default:
      return "7"
  }
}

function formatTimeForChart(timestamp: number, days: string): string {
  const date = new Date(timestamp)
  const numDays = Number.parseInt(days)

  if (numDays <= 1) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  } else if (numDays <= 7) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }
}

export default function CryptoDashboard() {
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin")
  const [selectedPeriod, setSelectedPeriod] = useState("7D")

  const ids = [selectedCrypto]
  const days = getDaysForPeriod(selectedPeriod)
  const vs = "usd"


  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["cg", ids, days, vs],
    queryFn: () => fetch(`/api/crypto?ids=${ids.join(",")}&days=${days}&vs=${vs}`).then((r) => r.json()),
    refetchInterval: 60_000, 
  })

  const selectedCryptoData = cryptoOptions.find((crypto) => crypto.value === selectedCrypto)

  const spotData = data?.spot?.[0]
  const historyData = data?.history?.[0]
  const hasHistoryError = historyData?.error


  const chartData =
    historyData?.series?.map((point: any) => ({
      time: formatTimeForChart(point.t, days),
      date: new Date(point.t).toLocaleString(),
      price: point.close,
    })) || [];

  const currentPrice = spotData?.current_price || 0;
  const priceChange = spotData?.price_change_percentage_24h || 0;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Crypto Price Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time cryptocurrency prices with TanStack Query
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Cryptocurrency:</span>
            <CryptoSelector
              value={selectedCrypto}
              onValueChange={setSelectedCrypto}
              options={cryptoOptions}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Time Period:</span>
            <TimePeriodSelector
              value={selectedPeriod}
              onValueChange={setSelectedPeriod}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isLoading || isRefetching}
            className="flex items-center gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        {spotData && (
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {selectedCryptoData?.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedCryptoData?.label}
                  </h2>
                  <p className="text-muted-foreground">
                    {selectedCryptoData?.symbol}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  ${currentPrice.toLocaleString()}
                </div>
                <Badge
                  variant={priceChange >= 0 ? "default" : "destructive"}
                  className="flex items-center gap-1 mt-2"
                >
                  {priceChange >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {priceChange >= 0 ? "+" : ""}
                  {priceChange.toFixed(2)}%
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
              <div>
                <p className="text-sm text-muted-foreground">Market Cap</p>
                <p className="text-lg font-semibold">
                  $
                  {spotData.market_cap
                    ? (spotData.market_cap / 1e9).toFixed(2) + "B"
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">24h Volume</p>
                <p className="text-lg font-semibold">
                  $
                  {spotData.total_volume
                    ? (spotData.total_volume / 1e9).toFixed(2) + "B"
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">24h High</p>
                <p className="text-lg font-semibold">
                  ${spotData.high_24h?.toLocaleString() || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">24h Low</p>
                <p className="text-lg font-semibold">
                  ${spotData.low_24h?.toLocaleString() || "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 animate-spin" />
              <span>Loading data...</span>
            </div>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to fetch data:{" "}
              {error instanceof Error ? error.message : "Unknown error"}
            </AlertDescription>
          </Alert>
        )}

        {hasHistoryError && !isLoading && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Chart data unavailable: {historyData.error}. Showing current price
              only.
            </AlertDescription>
          </Alert>
        )}

        {chartData.length > 0 && (
          <PriceChart
            data={chartData}
            cryptoName={selectedCryptoData?.label || ""}
            cryptoSymbol={selectedCryptoData?.symbol || ""}
            currentPrice={currentPrice}
            priceChange={priceChange}
            timePeriod={selectedPeriod}
          />
        )}

        {data && (
          <details className="bg-muted p-4 rounded-lg">
            <summary className="cursor-pointer font-medium mb-2">
              Raw API Data
            </summary>
            <pre className="text-xs overflow-auto max-h-96">
              {JSON.stringify(data, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
