"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  up: boolean;
}

const baseMarkets: TickerItem[] = [
  { symbol: "BTC/USD", price: "70,779.98", change: "+1.89%", up: true },
  { symbol: "ETH/USD", price: "2,845.32", change: "+1.42%", up: true },
  { symbol: "XAU/USD", price: "2,936.50", change: "+0.68%", up: true },
  { symbol: "S&P 500", price: "6,114.63", change: "+0.24%", up: true },
  { symbol: "EUR/USD", price: "1.0485", change: "-0.12%", up: false },
  { symbol: "GBP/USD", price: "1.2568", change: "+0.15%", up: true },
  { symbol: "USD/ZAR", price: "18.24", change: "-0.28%", up: false },
  { symbol: "NASDAQ", price: "19,945.64", change: "+0.41%", up: true },
  { symbol: "DOW", price: "44,546.08", change: "+0.18%", up: true },
  { symbol: "XAG/USD", price: "32.85", change: "+0.94%", up: true },
  { symbol: "SOL/USD", price: "178.42", change: "+2.86%", up: true },
  { symbol: "BNB/USD", price: "658.45", change: "+0.72%", up: true },
  { symbol: "USD/NGN", price: "1,548.20", change: "+0.22%", up: true },
  { symbol: "FTSE 100", price: "8,732.46", change: "+0.32%", up: true },
  { symbol: "OIL/WTI", price: "71.28", change: "-0.54%", up: false },
];

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
  const [markets, setMarkets] = useState<TickerItem[]>(baseMarkets);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets((prev) => prev.map(randomizePrice));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Duplicate for seamless loop
  const items = [...markets, ...markets];

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full overflow-hidden bg-[#060608]/95 backdrop-blur-sm border-t border-white/[0.03] py-2.5 z-50">
      <div className="ticker-track flex gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <div key={`${item.symbol}-${i}`} className="flex items-center gap-2 flex-shrink-0">
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
