import React, { useState } from "react";
import { ResponsiveContainer, Area, AreaChart } from "recharts";

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
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4 border-b border-slate-200 bg-slate-50/50">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-sky-600">
            Market Data Overview (BEP-20 / Crypto Assets)
          </p>
        </div>

        {/* TIMEFRAME TOGGLE */}
        <div className="flex gap-1 bg-white p-1 rounded-xl border border-slate-200">
          {["1h", "24h", "7D"].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                timeframe === t
                  ? "bg-sky-600 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-xs uppercase font-bold text-slate-900">
              <th className="px-6 py-3.5">Asset</th>
              <th className="px-6 py-3.5 text-right">Volume</th>
              <th className="px-6 py-3.5 text-right">Price</th>
              <th className="px-6 py-3.5 text-right">Change</th>
              <th className="px-6 py-3.5">Trend</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-slate-400">
                  Loading market data...
                </td>
              </tr>
            ) : tokens.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-slate-400">
                  No data available
                </td>
              </tr>
            ) : (
              tokens.map((coin) => {
                const change = getChangeValue(coin) || 0;
                const isPositive = change >= 0;

                return (
                  <tr key={coin.id} className="hover:bg-sky-50/40 transition-colors">
                    {/* TOKEN */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={coin?.image} alt={coin.name} className="w-7 h-7" />
                        <div>
                          <p className="text-sm font-bold text-slate-900 uppercase">
                            {coin.symbol}
                          </p>
                          <p className="text-[11px] text-slate-500">{coin.name}</p>
                        </div>
                      </div>
                    </td>

                    {/* VOLUME */}
                    <td className="px-6 py-4 text-right font-medium text-slate-700">
                      {formatCurrency(coin.total_volume)}
                    </td>

                    {/* PRICE */}
                    <td className="px-6 py-4 text-right font-bold text-slate-900">
                      ${coin.current_price?.toLocaleString()}
                    </td>

                    {/* CHANGE */}
                    <td
                      className={`px-6 py-4 text-right text-xs font-bold ${
                        isPositive ? "text-emerald-600" : "text-rose-500"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {change.toFixed(2)}%
                    </td>

                    {/* CHART */}
                    <td className="px-6 py-4">
                      <div className="w-28 h-10">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={generateWaveData(coin.current_price)}>
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke={isPositive ? "#10b981" : "#f43f5e"}
                              strokeWidth={2}
                              fillOpacity={0.15}
                              fill={isPositive ? "#10b981" : "#f43f5e"}
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