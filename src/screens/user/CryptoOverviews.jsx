import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import TopUpModal from "../../components/ui/TopUpModal";

const CryptoOverview = ({ balance = 0, tokens = [] }) => {
  const [openTopup, setOpenTopup] = useState(false);

  // 🔥 CHART DATA (REAL BASED - NO RANDOM)
  const chartData = useMemo(() => {
    return tokens.slice(0, 10).map((coin, i) => ({
      day: (i + 1).toString(),
      value: coin.current_price || 0,
    }));
  }, [tokens]);

  const volumeData = useMemo(() => {
    return tokens.slice(0, 10).map((coin, i) => ({
      day: (i + 1).toString(),
      value: coin.total_volume || 0,
    }));
  }, [tokens]);

  // 🔥 TOP COINS (first 4)
  const topCoins = tokens.slice(0, 4);

  return (
    <>
      <div className="space-y-6">

        {/* 🔥 TOP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">

          {topCoins.map((coin, i) => (
            <div
              key={coin.id || i}
              className="rounded-xl p-5 bg-[#0f172a] border border-white/5 hover:scale-[1.05] transition shadow-md relative"
            >
              <img src={coin.image} className="w-8 h-8 absolute top-4 right-4" />

              <p className="text-xs text-gray-400 uppercase">
                {coin?.name}
              </p>

              <h2 className="text-lg font-bold mt-6 text-white">
               <span className="text-teal-300 font-light"> $</span> {coin.current_price?.toLocaleString()}
              </h2>

              <p className="text-xs text-gray-500">
                MCap: ${(coin.market_cap / 1e9).toFixed(2)}B
              </p>

              <span
                className={`absolute bottom-4 right-4 text-xs font-semibold ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-blue-400"
                    : "text-red-400"
                }`}
              >
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
          ))}

          {/* 🔥 BALANCE CARD */}
          <div className="glow-card p-5 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/100"
                className="w-10 h-10 rounded-full border border-white/20"
              />
              <div>
                <p className="text-xs text-gray-400">My Balance</p>
                <h2 className="text-xl font-bold text-blue-400">
                  ${Number(balance || 0).toLocaleString()}
                </h2>
              </div>
            </div>

            <button
              onClick={() => setOpenTopup(true)}
              className="mt-4 border border-blue-400/30 text-blue-400 rounded-lg py-2 text-sm hover:bg-blue-400/10 transition"
            >
              + Top Up Balance
            </button>
          </div>
        </div>

        {/* 🔥 CHART + SIDEBAR */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">

          {/* LEFT CHARTS */}
          <div className="xl:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* PORTFOLIO */}
            <div className="glow-card p-5 h-[300px]">
              <p className="text-xs text-gray-400 mb-2">Portfolio Growth</p>

              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="day" stroke="#888" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* MARKET */}
            <div className="glow-card p-5 h-[300px]">
              <p className="text-xs text-gray-400 mb-2">Market Activity</p>

              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeData}>
                  <XAxis dataKey="day" stroke="#888" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 🔥 RIGHT SIDEBAR */}
          <div className="space-y-4">

            {/* MINI CHART */}
            <div className="glow-card p-4">
              <p className="text-xs text-gray-400 mb-2">Performance</p>

              <div className="h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Line
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <p className="text-blue-400 font-semibold mt-2 text-sm">
                {tokens[0]?.price_change_percentage_24h?.toFixed(2) || 0}%
              </p>
              <p className="text-[10px] text-gray-500">
                Compared to last 24h
              </p>
            </div>

            {/* TOP CRYPTO LIST */}
            <div className="glow-card p-4">
              <p className="text-xs text-gray-400 mb-3">Top Crypto</p>

              <div className="space-y-3">
                {topCoins.map((coin, i) => (
                  <div
                    key={coin.id || i}
                    className="flex justify-between items-center text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <img src={coin.image} className="w-5 h-5" />
                      <span>{coin.symbol}</span>
                    </div>
                    <span className="text-gray-400">
                      ${coin.current_price?.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {openTopup && (
        <TopUpModal open={openTopup} onClose={() => setOpenTopup(false)} />
      )}
    </>
  );
};

export default CryptoOverview;