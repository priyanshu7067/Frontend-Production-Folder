import React, { useState } from "react";
import {
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const CryptoScreenTable = ({ tokens = [], loading = false }) => {
  const [timeframe, setTimeframe] = useState("24h");

  const generateWaveData = (price) => {
    return Array.from({ length: 20 }, (_, i) => ({
      value:
        price +
        Math.sin(i / 2) * price * 0.02 +
        (Math.random() - 0.5) * price * 0.01,
    }));
  };

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
        <div>
          <p className="text-sm font-semibold text-[var(--primary)]">
            TOP CRYPTOCURRENCY
          </p>
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
              <th className="px-10 py-4">7D Chart</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : tokens.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              tokens.map((coin) => {
                const change = getChangeValue(coin) || 0;
                const isPositive = change >= 0;

                return (
                  <tr key={coin.id} className="hover:bg-white/[0.03]">

                    {/* TOKEN */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={coin.image} className="w-7 h-7" />
                        <div>
                          <p className="text-sm font-bold text-white uppercase">
                            {coin.symbol}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {coin.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* VOLUME */}
                    <td className="px-6 py-4 text-right text-white">
                      {formatCurrency(coin.total_volume)}
                    </td>

                    {/* PRICE */}
                    <td className="px-6 py-4 text-right text-white font-semibold">
                      ${coin.current_price.toLocaleString()}
                    </td>

                    {/* CHANGE */}
                    <td
                      className={`px-6 py-4 text-right text-xs font-bold ${
                        isPositive ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {change.toFixed(2)}%
                    </td>

                    {/* CHART */}
                    <td className="px-6 py-4">
                      <div className="w-32 h-14">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={generateWaveData(coin.current_price)}>
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke={isPositive ? "#22c55e" : "#ef4444"}
                              strokeWidth={2}
                              fillOpacity={0.2}
                              fill={isPositive ? "#22c55e" : "#ef4444"}
                              dot={false}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
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