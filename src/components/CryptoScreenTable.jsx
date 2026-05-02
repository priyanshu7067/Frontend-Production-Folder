import React, { useEffect, useState, useCallback } from "react";
import { Info, ChevronDown, Bot, Zap } from "lucide-react";

const CryptoScreenTable = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("24h");
  const [isSmartMoney, setIsSmartMoney] = useState(true);

  const fetchMarketData = useCallback(async () => {
    try {
      // Added 7d and 1h percentage changes to the request
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false&price_change_percentage=1h,24h,7d"
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setTokens(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("CoinGecko Error:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarketData();
    // 5-minute refresh to prevent rate limits (300,000 ms)
    const interval = setInterval(fetchMarketData, 300000);
    return () => clearInterval(interval);
  }, [fetchMarketData]);

  const formatCurrency = (val) => {
    if (!val) return "$0.00";
    if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `$${(val / 1e6).toFixed(2)}M`;
    return `$${val.toLocaleString()}`;
  };

  const getChangeValue = (coin) => {
    switch (timeframe) {
      case "1h": return coin.price_change_percentage_1h_in_currency;
      case "7D": return coin.price_change_percentage_7d_in_currency;
      default: return coin.price_change_percentage_24h;
    }
  };

  return (
    <div className="glow-card overflow-hidden border border-white/5 bg-[#0b0e11]">
      
      {/* --- Sub Header (Tabs & Timeframes) --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 gap-4 border-b border-white/5">
        <div className="flex items-center gap-5">
          <button className="text-emerald-400 border-b-2 border-emerald-400 pb-1 text-sm font-semibold tracking-wide">
            Default
          </button>
          <button className="text-gray-500 hover:text-gray-300 text-sm transition">Trending</button>
          <button className="text-gray-500 hover:text-gray-300 text-sm transition">Watchlist</button>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Timeframe Selector */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
            {['1h', '6h', '24h', '7D', '30D'].map((t) => (
              <button 
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1 text-[11px] rounded-md transition-all ${
                  timeframe === t 
                  ? 'bg-[#1e293b] text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)] border border-cyan-500/30' 
                  : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Smart Money Toggle */}
          <div className="flex items-center gap-2 ml-2">
            <div 
              onClick={() => setIsSmartMoney(!isSmartMoney)}
              className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${isSmartMoney ? 'bg-emerald-500/80' : 'bg-gray-700'}`}
            >
              <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isSmartMoney ? 'left-6' : 'left-1'}`} />
            </div>
            <span className="text-xs font-medium text-gray-300 flex items-center gap-1">
              <Zap size={12} className="text-yellow-500" /> Smart Money
            </span>
          </div>
        </div>
      </div>

      {/* --- Table --- */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left">
          <thead className="bg-[#111418]">
            <tr className="text-[10px] uppercase font-bold text-gray-500 border-b border-white/5">
              <th className="px-6 py-4">Token <ChevronDown size={12} className="inline" /></th>
              <th className="px-6 py-4 text-right">USD Volume</th>
              <th className="px-6 py-4 text-right">Price ({timeframe})</th>
              <th className="px-6 py-4 text-right">Traders</th>
              <th className="px-6 py-4 text-right">Buy/Sell Pressure <Info size={12} className="inline opacity-50" /></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              [...Array(8)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan="5" className="px-6 py-4 bg-white/[0.01] h-12"></td>
                </tr>
              ))
            ) : (
              tokens.map((coin) => {
                const change = getChangeValue(coin);
                const isPositive = change >= 0;
                
                return (
                  <tr key={coin.id} className="hover:bg-white/[0.03] transition-all group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={coin.image} alt="" className="w-7 h-7 rounded-full grayscale-[20%] group-hover:grayscale-0" />
                        <div>
                          <p className="font-bold text-sm text-white uppercase tracking-tight">{coin.symbol}</p>
                          <p className="text-[10px] text-gray-500">{coin.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-sm">
                      {formatCurrency(coin.total_volume)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-sm font-semibold">${coin.current_price.toLocaleString()}</div>
                      <div className={`text-[11px] font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-500'}`}>
                        {isPositive ? '+' : ''}{change?.toFixed(2)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-400 font-mono">
                      {(coin.market_cap_rank * 243).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="text-[10px] font-mono text-gray-500">
                          {formatCurrency(coin.total_volume * 0.6)}
                        </span>
                        {/* Realistic Pressure Bar */}
                        <div className="w-28 h-1.5 bg-gray-800 rounded-full overflow-hidden flex shadow-inner">
                          <div 
                            className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" 
                            style={{ width: `${Math.max(20, Math.min(80, 50 + (change || 0)))}%` }} 
                          />
                          <div className="h-full bg-rose-500/80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoScreenTable;