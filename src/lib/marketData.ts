// Hybrid Free Market Data Service
// Combines CoinGecko (crypto) + Yahoo Finance (stocks/forex) + Fallback

export interface MarketData {
  symbol: string;
  price: string;
  change: string;
  up: boolean;
}

// CoinGecko API for crypto data
const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';

// Yahoo Finance API for stocks/forex (unofficial but free)
const YAHOO_BASE = 'https://query1.finance.yahoo.com/v8/finance/chart';

// Fallback data when APIs fail
export const fallbackMarketData: MarketData[] = [
  // Major Crypto
  { symbol: 'BTC/USD', price: '70,779.98', change: '+1.89%', up: true },
  { symbol: 'ETH/USD', price: '2,845.32', change: '+1.42%', up: true },
  { symbol: 'XRP/USD', price: '2.48', change: '+3.12%', up: true },
  { symbol: 'SOL/USD', price: '178.42', change: '+2.86%', up: true },
  // Precious Metals
  { symbol: 'XAU/USD', price: '2,936.50', change: '+0.68%', up: true },
  { symbol: 'XAG/USD', price: '32.85', change: '+0.94%', up: true },
  { symbol: 'PLATINUM', price: '1,024.80', change: '+0.42%', up: true },
  // Major Indices
  { symbol: 'NASDAQ', price: '19,945.64', change: '+0.41%', up: true },
  { symbol: 'S&P 500', price: '6,114.63', change: '+0.24%', up: true },
  { symbol: 'DOW JONES', price: '44,546.08', change: '+0.18%', up: true },
  { symbol: 'RUSSELL 2000', price: '2,284.35', change: '+0.52%', up: true },
  // Major Forex
  { symbol: 'EUR/USD', price: '1.0485', change: '-0.12%', up: false },
  { symbol: 'GBP/USD', price: '1.2568', change: '+0.15%', up: true },
  { symbol: 'USD/JPY', price: '152.45', change: '+0.08%', up: true },
  { symbol: 'AUD/USD', price: '0.6342', change: '-0.22%', up: false },
  { symbol: 'USD/ZAR', price: '18.24', change: '-0.28%', up: false },
  // More Crypto
  { symbol: 'BNB/USD', price: '658.45', change: '+0.72%', up: true },
  { symbol: 'ADA/USD', price: '0.7845', change: '+1.24%', up: true },
  { symbol: 'DOGE/USD', price: '0.2456', change: '+4.52%', up: true },
];

// Crypto symbols for CoinGecko
const cryptoMap: Record<string, string> = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum', 
  'XRP': 'ripple',
  'SOL': 'solana',
  'BNB': 'binancecoin',
  'ADA': 'cardano',
  'DOGE': 'dogecoin',
  'DOT': 'polkadot',
  'LINK': 'chainlink',
  'AVAX': 'avalanche-2',
};

// Stock symbols for Yahoo Finance
const stockMap: Record<string, string> = {
  'NASDAQ': '^IXIC',
  'S&P 500': '^GSPC',
  'DOW JONES': '^DJI',
  'RUSSELL 2000': '^RUT',
  'EUR/USD': 'EURUSD=X',
  'GBP/USD': 'GBPUSD=X',
  'USD/JPY': 'JPY=X',
  'AUD/USD': 'AUDUSD=X',
  'USD/ZAR': 'ZAR=X',
};

// Fetch crypto data from CoinGecko
async function fetchCryptoData(symbol: string, display: string): Promise<MarketData | null> {
  try {
    const coinId = cryptoMap[symbol];
    if (!coinId) return null;

    const response = await fetch(
      `${COINGECKO_BASE}/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true`,
      {
        headers: {
          'User-Agent': 'Goldbridge/1.0',
        },
      }
    );

    if (!response.ok) return null;
    
    const data = await response.json();
    const coinData = data[coinId];
    
    if (!coinData) return null;

    const price = coinData.usd;
    const change = coinData.usd_24h_change || 0;

    return {
      symbol: display,
      price: price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
      up: change >= 0,
    };
  } catch (error) {
    console.warn(`CoinGecko API error for ${symbol}:`, error);
    return null;
  }
}

// Fetch stock/forex data from Yahoo Finance
async function fetchYahooData(symbol: string, display: string): Promise<MarketData | null> {
  try {
    const ticker = stockMap[symbol];
    if (!ticker) return null;

    const response = await fetch(`${YAHOO_BASE}/${ticker}?interval=1d&range=1d`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Goldbridge/1.0)',
      },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const chart = data.chart?.result?.[0];
    
    if (!chart) return null;

    const currentPrice = chart.meta?.regularMarketPrice;
    const previousClose = chart.meta?.previousClose;
    
    if (!currentPrice || !previousClose) return null;

    const change = currentPrice - previousClose;
    const changePercent = (change / previousClose) * 100;

    return {
      symbol: display,
      price: currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      change: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
      up: changePercent >= 0,
    };
  } catch (error) {
    console.warn(`Yahoo Finance API error for ${symbol}:`, error);
    return null;
  }
}

// Main function to fetch all market data
export async function fetchAllMarketData(): Promise<MarketData[]> {
  const allData: MarketData[] = [];
  const errors: string[] = [];

  // Fetch crypto data from CoinGecko (priority)
  const cryptoPromises = Object.keys(cryptoMap).map(async (symbol) => {
    const display = `${symbol}/USD`;
    const data = await fetchCryptoData(symbol, display);
    if (data) allData.push(data);
    else errors.push(`Failed to fetch ${display}`);
  });

  // Fetch stock/forex data from Yahoo Finance
  const stockPromises = Object.keys(stockMap).map(async (symbol) => {
    const data = await fetchYahooData(symbol, symbol);
    if (data) allData.push(data);
    else errors.push(`Failed to fetch ${symbol}`);
  });

  // Wait for all requests with timeout
  try {
    await Promise.race([
      Promise.allSettled([...cryptoPromises, ...stockPromises]),
      new Promise(resolve => setTimeout(resolve, 5000)) // 5 second timeout
    ]);
  } catch (error) {
    console.warn('Market data fetch timeout:', error);
  }

  // Log errors but don't fail
  if (errors.length > 0) {
    console.warn('Some market data failed to fetch:', errors);
  }

  // If we got some data, return it
  if (allData.length > 0) {
    console.log(`Successfully fetched ${allData.length} market data points`);
    return allData;
  }

  // Fallback to static data if all APIs fail
  console.log('Using fallback market data');
  return fallbackMarketData;
}

// Helper function to get market data with caching
let cachedData: MarketData[] | null = null;
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCachedMarketData(): Promise<MarketData[]> {
  const now = Date.now();
  
  // Return cached data if still valid
  if (cachedData && (now - lastFetch) < CACHE_DURATION) {
    return cachedData;
  }

  // Fetch fresh data
  try {
    const data = await fetchAllMarketData();
    cachedData = data;
    lastFetch = now;
    return data;
  } catch (error) {
    console.error('Failed to fetch market data:', error);
    // Return cached data even if expired, or fallback
    return cachedData || fallbackMarketData;
  }
}
