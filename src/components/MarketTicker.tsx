"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { fetchAllMarketData, fallbackMarketData, MarketData } from "@/lib/alphaVantage";

type TickerItem = MarketData;

function randomizePrice(item: TickerItem): TickerItem {
  const priceNum = parseFloat(item.price.replace(/,/g, ""));
  const fluctuation = (Math.random() - 0.48) * 0.004;
  const newPrice = priceNum * (1 + fluctuation);
  const changeNum = parseFloat(item.change.replace("%", "").replace("+", ""));
  const newChange = changeNum + fluctuation * 100;
  const up = newChange >= 0;

  let formatted: string;
  if (newPrice >= 10000) formatted = newPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  else if (newPrice >= 100) formatted = newPrice.toFixed(2);
  else if (newPrice >= 1) formatted = newPrice.toFixed(4);
  else formatted = newPrice.toFixed(2);

  return {
    ...item,
    price: formatted,
    change: `${up ? "+" : ""}${newChange.toFixed(2)}%`,
    up,
  };
}

export default function MarketTicker() {
  const [markets, setMarkets] = useState<TickerItem[]>(fallbackMarketData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch real data on mount
    const fetchInitialData = async () => {
      try {
        const realData = await fetchAllMarketData();
        if (realData.length > 0) {
          setMarkets(realData);
        }
      } catch (error) {
        console.error('Failed to fetch market data, using fallback:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();

    // Update data every 5 minutes (Alpha Vantage has rate limits)
    const interval = setInterval(() => {
      fetchInitialData();
    }, 300000);

    // Small price fluctuations for visual effect
    const fluctuationInterval = setInterval(() => {
      setMarkets((prev) => prev.map(randomizePrice));
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(fluctuationInterval);
    };
  }, []);

  // Duplicate for seamless loop
  const items = [...markets, ...markets];

  return (
    <div className="fixed top-[72px] left-0 right-0 w-full overflow-hidden bg-[#060608]/95 backdrop-blur-sm border-b border-white/[0.03] py-2 z-40">
      <div className="ticker-track flex gap-8 whitespace-nowrap" style={{ minWidth: '200%' }}>
        {items.map((item, i) => (
          <div key={`${item.symbol}-${i}`} className="flex items-center gap-2 flex-shrink-0 px-4">
            <span className="text-[#555] text-[10px] font-medium">{item.symbol}</span>
            <span className="text-white text-[10px] font-semibold tabular-nums">{item.price}</span>
            <span className={`flex items-center gap-0.5 text-[10px] font-medium tabular-nums ${item.up ? "text-emerald-400" : "text-red-400"}`}>
              {item.up ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
