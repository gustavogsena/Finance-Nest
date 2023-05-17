
export type SingleStockRequestType = {
  change: number
  close: number
  logo: string
  market_cap: number | null
  name: string
  sector: string
  stock: string
  volume: number
}

export type FullStockRequestType = {
  "symbol": string
  "shortName": string,
  "longName": string
  "currency": string
  "regularMarketPrice": number,
  "regularMarketDayHigh": number,
  "regularMarketDayLow": number,
  "regularMarketDayRange": string
  "regularMarketChange": number,
  "regularMarketChangePercent": number,
  "regularMarketTime": Date
  "marketCap": number,
  "regularMarketVolume": number,
  "regularMarketPreviousClose": number,
  "regularMarketOpen": number,
  "averageDailyVolume10Day": number,
  "averageDailyVolume3Month": number,
  "fiftyTwoWeekLowChange": number,
  "fiftyTwoWeekLowChangePercent": number,
  "fiftyTwoWeekRange": "9.31 - 10.49",
  "fiftyTwoWeekHighChange": number,
  "fiftyTwoWeekHighChangePercent": number,
  "fiftyTwoWeekLow": number,
  "fiftyTwoWeekHigh": number,
  "twoHundredDayAverage": number,
  "twoHundredDayAverageChange": number,
  "twoHundredDayAverageChangePercent": number
}