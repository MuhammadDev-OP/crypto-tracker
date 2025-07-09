import { type NextRequest, NextResponse } from "next/server"

const CG = "https://api.coingecko.com/api/v3"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const ids = searchParams.get("ids")?.split(",") ?? ["bitcoin"]
  const days = searchParams.get("days") ?? "1"
  const vs = searchParams.get("vs") ?? "usd"
  const perPage = Math.min(ids.length, 250)

  try {
    const spotResponse = await fetch(`${CG}/coins/markets?vs_currency=${vs}&ids=${ids.join(",")}&per_page=${perPage}`)

    if (!spotResponse.ok) {
      throw new Error(`CoinGecko markets API error: ${spotResponse.status}`)
    }

    const spot = await spotResponse.json()

    if (!Array.isArray(spot)) {
      throw new Error("Invalid spot data format from CoinGecko")
    }

    const history = await Promise.all(
      ids.map(async (id) => {
        try {
          const historyResponse = await fetch(`${CG}/coins/${id}/market_chart?vs_currency=${vs}&days=${days}`)

          if (!historyResponse.ok) {
            console.error(`CoinGecko history API error for ${id}: ${historyResponse.status}`)
            return {
              id,
              series: [], 
              error: `API error: ${historyResponse.status}`,
            }
          }

          const data = await historyResponse.json()

          // Check if prices data exists and is an array
          if (!data || !Array.isArray(data.prices)) {
            console.error(`Invalid price data for ${id}:`, data)
            return {
              id,
              series: [], 
              error: "Invalid price data format",
            }
          }

          return {
            id,
            series: data.prices.map(([t, p]: [number, number]) => ({ t, close: p })),
          }
        } catch (error) {
          console.error(`Error fetching history for ${id}:`, error)
          return {
            id,
            series: [], 
            error: error instanceof Error ? error.message : "Unknown error",
          }
        }
      }),
    )

    return NextResponse.json(
      { spot, history },
    )
  } catch (error) {
    console.error("CoinGecko API Error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch cryptocurrency data",
        details: error instanceof Error ? error.message : "Unknown error",
        spot: [],
        history: [],
      },
      { status: 500 },
    )
  }
}
