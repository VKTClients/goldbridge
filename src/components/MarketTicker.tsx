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
  { symbol: "BTC/USD", price: "97,842.50", change: "+2.14%", up: true },
  { symbol: "ETH/USD", price: "3,456.80", change: "+1.87%", up: true },
  { symbol: "XAU/USD", price: "2,684.30", change: "+0.92%", up: true },
  { symbol: "S&P 500", price: "6,118.40", change: "+0.42%", up: true },
  { symbol: "EUR/USD", price: "1.0842", change: "-0.15%", up: false },
  { symbol: "GBP/USD", price: "1.2634", change: "+0.08%", up: true },
  { symbol: "USD/ZAR", price: "18.42", change: "-0.34%", up: false },
  { symbol: "NASDAQ", price: "19,842.60", change: "+0.68%", up: true },
  { symbol: "DOW", price: "43,256.80", change: "+0.31%", up: true },
  { symbol: "XAG/USD", price: "31.24", change: "+1.12%", up: true },
  { symbol: "SOL/USD", price: "198.45", change: "+3.42%", up: true },
  { symbol: "BNB/USD", price: "612.30", change: "-0.56%", up: false },
  { symbol: "USD/NGN", price: "1,548.20", change: "+0.22%", up: true },
  { symbol: "FTSE 100", price: "8,342.10", change: "+0.18%", up: true },
  { symbol: "OIL/WTI", price: "78.42", change: "-0.82%", up: false },
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
