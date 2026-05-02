import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const CryptoOverview = ({ balance = 1086000 }) => {

  // 🔥 ALL DATA INSIDE COMPONENT (no constants file)
  const coins = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      amount: "0.2231345",
      usd: "$11,032.24",
      change: "+12.5%",
      color: "bg-[#E8D5B7]",
    },
    {
      name: "Tether",
      symbol: "USDT",
      amount: "1.2345",
      usd: "$1,032.24",
      change: "-1.5%",
      color: "bg-[#BFD8D2]",
    },
    {
      name: "Cardano",
      symbol: "ADA",
      amount: "1.2370",
      usd: "$532.94",
      change: "+12.5%",
      color: "bg-[#C8D0E3]",
    },
    {
      name: "Binance",
      symbol: "BUSD",
      amount: "240.55",
      usd: "$340.24",
      change: "+1.5%",
      color: "bg-[#E6DDBE]",
    },
  ];

  const chartData = [
    { day: "1", value: 20 },
    { day: "2", value: 18 },
    { day: "3", value: 30 },
    { day: "4", value: 40 },
    { day: "5", value: 55 },
    { day: "6", value: 35 },
    { day: "7", value: 60 },
    { day: "8", value: 75 },
    { day: "9", value: 85 },
    { day: "10", value: 50 },
  ];

  const volumeData = [
    { day: "1", value: 10 },
    { day: "2", value: 20 },
    { day: "3", value: 40 },
    { day: "4", value: 55 },
    { day: "5", value: 60 },
    { day: "6", value: 45 },
    { day: "7", value: 70 },
    { day: "8", value: 90 },
    { day: "9", value: 100 },
    { day: "10", value: 60 },
  ];

  return (
    <div className="space-y-6">

      {/* 🔥 TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">

        {coins.map((coin, i) => (
          <div
            key={i}
            className={`rounded-xl p-5 text-black ${coin.color} relative transition hover:scale-[1.03]`}
          >
            <p className="text-xs uppercase tracking-wide">{coin.name}</p>

            <h2 className="text-lg font-bold mt-6">
              {coin.amount} {coin.symbol}
            </h2>

            <p className="text-xs opacity-70">{coin.usd}</p>

            <span className="absolute bottom-4 right-4 text-xs font-semibold">
              {coin.change}
            </span>
          </div>
        ))}

        {/* 🔥 BALANCE CARD */}
        <div className="glow-card p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs text-gray-400">My Balance</p>
            <h2 className="text-2xl font-bold text-[var(--accent-primary)] mt-2">
              ₹{balance.toLocaleString()}
            </h2>
          </div>

          <button className="mt-4 border border-white/10 rounded-lg py-2 text-sm hover:bg-white/5 transition">
            + Top Up Balance
          </button>
        </div>
      </div>

      {/* 🔥 CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* LINE CHART */}
        <div className="glow-card p-5 h-[300px]">
          <p className="text-xs text-gray-400 mb-2">Liquidity</p>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="day" stroke="#888" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="glow-card p-5 h-[300px]">
          <p className="text-xs text-gray-400 mb-2">Volume 24h</p>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volumeData}>
              <XAxis dataKey="day" stroke="#888" />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CryptoOverview;