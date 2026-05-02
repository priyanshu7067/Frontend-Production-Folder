import React, { useEffect, useState, useCallback } from "react";
import { Info, ChevronDown, Zap } from "lucide-react";

const CryptoScreenTable = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("24h");

  const fetchMarketData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&price_change_percentage=1h,24h,7d"
      );
      const data = await response.json();
      setTokens(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error("CoinGecko Error:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarketData();

    // 🔥 LIVE FEEL (every 30 sec instead of 5 min)
    const interval = setInterval(fetchMarketData, 30000);
    return () => clearInterval(interval);
  }, [fetchMarketData]);

  const formatCurrency = (val) => {
    if (!val) return "$0";
    if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `$${(val / 1e6).toFixed(2)}M`;
    return `$${val.toLocaleString()}`;
  };

  const getChangeValue = (coin) => {
    switch (timeframe) {
      case "1h":
        return coin.price_change_percentage_1h_in_currency;
      case "7D":
        return coin.price_change_percentage_7d_in_currency;
      default:
        return coin.price_change_percentage_24h;
    }
  };

  return (
    <div className="glow-card overflow-hidden border border-white/5 bg-[#0b0e11]">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between p-4 gap-4 border-b border-white/5">
        <div className="flex items-center gap-5">
          <button className="text-[var(--primary)] border-b-2 border-[var(--primary)] pb-1 text-sm font-semibold">
            TOP CRYPTOCURRENCY
          </button>
        </div>

        {/* TIMEFRAME */}
        <div className="flex gap-2 bg-black/40 p-1 rounded-lg border border-white/10">
          {["1h", "24h", "7D"].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 text-[11px] rounded-md ${
                timeframe === t
                  ? "bg-[#1e293b] text-[var(--primary)] border border-[var(--primary)]/30"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">

          <thead className="bg-[#111418]">
            <tr className="text-[10px] uppercase text-gray-100 border-b border-white/5">
              <th className="px-6 py-4">Token</th>
              <th className="px-6 py-4 text-right">Volume</th>
              <th className="px-6 py-4 text-right">Price</th>
              <th className="px-6 py-4 text-right">Change</th>
              <th className="px-6 py-4 text-right">Pressure</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-200">
                  Loading market data...
                </td>
              </tr>
            ) : (
              tokens.map((coin) => {
                const change = getChangeValue(coin) || 0;
                const isPositive = change >= 0;

                return (
                  <tr
                    key={coin.id}
                    className="hover:bg-white/[0.03] transition"
                  >
                    {/* TOKEN */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={coin.image}
                          className="w-7 h-7 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-bold text-white uppercase">
                            {coin.symbol}
                          </p>
                          <p className="text-[10px] text-gray-100">
                            {coin.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* VOLUME */}
                    <td className="px-6 py-4 text-white text-right">
                      {formatCurrency(coin.total_volume)}
                    </td>

                    {/* PRICE */}
                    <td className="px-6 py-4 text-right text-white font-semibold">
                      ${coin.current_price.toLocaleString()}
                    </td>

                    {/* CHANGE */}
                    <td
                      className={`px-6 py-4 text-right text-xs font-bold ${
                        isPositive
                          ? "text-[var(--primary)]"
                          : "text-red-400"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {change.toFixed(2)}%
                    </td>

                    {/* PRESSURE BAR */}
                    <td className="px-6 py-4 text-right">
                      <div className="w-28 h-1.5 bg-gray-800 rounded-full overflow-hidden flex">
                        <div
                          className="h-full bg-[var(--primary)]"
                          style={{
                            width: `${Math.max(
                              20,
                              Math.min(80, 50 + change)
                            )}%`,
                          }}
                        />
                        <div className="h-full bg-red-500/60" />
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