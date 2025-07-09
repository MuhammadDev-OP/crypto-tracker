"use client"

import { useState } from "react"
import { Search, Bell, Settings, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TopMovers } from "../ui/top-movers"
import { MarketStats } from "../ui/market-stats"
import { PriceChart } from "../ui/price-chart"
import { CryptoCard } from "../ui/crypto-card"

// Mock data
const cryptoData = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 67420,
    change24h: 2.34,
    marketCap: 1320000000000,
    volume: 28500000000,
    icon: "₿",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 3890,
    change24h: -1.23,
    marketCap: 467000000000,
    volume: 15200000000,
    icon: "Ξ",
  },
  {
    name: "Binance Coin",
    symbol: "BNB",
    price: 635,
    change24h: 0.87,
    marketCap: 92000000000,
    volume: 1800000000,
    icon: "B",
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: 178,
    change24h: 5.67,
    marketCap: 84000000000,
    volume: 3200000000,
    icon: "S",
  },
  {
    name: "XRP",
    symbol: "XRP",
    price: 0.62,
    change24h: -2.45,
    marketCap: 35000000000,
    volume: 1500000000,
    icon: "X",
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: 0.48,
    change24h: 3.21,
    marketCap: 17000000000,
    volume: 890000000,
    icon: "A",
  },
]

const chartData = [
  { time: "00:00", price: 65200 },
  { time: "04:00", price: 66100 },
  { time: "08:00", price: 65800 },
  { time: "12:00", price: 67200 },
  { time: "16:00", price: 66900 },
  { time: "20:00", price: 67420 },
]

const gainers = [
  { name: "Solana", symbol: "SOL", price: 178, change: 5.67, icon: "S" },
  { name: "Cardano", symbol: "ADA", price: 0.48, change: 3.21, icon: "A" },
  { name: "Bitcoin", symbol: "BTC", price: 67420, change: 2.34, icon: "₿" },
]

const losers = [
  { name: "XRP", symbol: "XRP", price: 0.62, change: -2.45, icon: "X" },
  { name: "Ethereum", symbol: "ETH", price: 3890, change: -1.23, icon: "Ξ" },
  { name: "Dogecoin", symbol: "DOGE", price: 0.08, change: -3.12, icon: "D" },
]

export default function CryptoDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const filteredCryptos = cryptoData.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CryptoTracker
              </h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search cryptocurrencies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Market Stats */}
        <MarketStats
          totalMarketCap={2450000000000}
          totalVolume={89000000000}
          btcDominance={53.8}
          marketCapChange={1.24}
        />

        {/* Price Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <PriceChart name="Bitcoin" symbol="BTC" currentPrice={67420} change24h={2.34} data={chartData} />
          <PriceChart
            name="Ethereum"
            symbol="ETH"
            currentPrice={3890}
            change24h={-1.23}
            data={chartData.map((d) => ({ ...d, price: d.price * 0.058 }))}
          />
        </div>

        {/* Top Movers */}
        <TopMovers gainers={gainers} losers={losers} />

        {/* Cryptocurrency Grid */}
        <div>
          <h2 className="text-xl font-semibold mb-4">All Cryptocurrencies</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCryptos.map((crypto, index) => (
              <CryptoCard key={index} {...crypto} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
