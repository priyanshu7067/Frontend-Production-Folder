import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import TransactionTable from "./TransactionTable";
import TopUpModal from "../../components/ui/TopUpModal";

const CryptoOverview = ({ balance = 1086000 }) => {
  // 🔥 LIVE STATE
  const [chartData, setChartData] = useState([
    { day: "1", value: 20 },
    { day: "2", value: 30 },
    { day: "3", value: 25 },
    { day: "4", value: 40 },
    { day: "5", value: 35 },
  ]);

  const [openTopup, setOpenTopup] = useState(false)

  const [volumeData, setVolumeData] = useState([
    { day: "1", value: 100 },
    { day: "2", value: 40 },
    { day: "3", value: 60 },
    { day: "4", value: 30 },
    { day: "5", value: 50 },
    { day: "6", value: 70 },
    { day: "7", value: 60 },
    { day: "8", value: 70 },
    { day: "9", value: 55 },
    { day: "10", value: 65 },
    { day: "11", value: 95 },
    { day: "12", value: 90 },
  ]);

  // 🔥 FAKE REAL-TIME
  // useEffect(() => {
  //     const interval = setInterval(() => {
  //         setChartData((prev) => {
  //             const next = [...prev.slice(1)];
  //             next.push({
  //                 day: (parseInt(prev[prev.length - 1].day) + 1).toString(),
  //                 value: Math.floor(Math.random() * 100),
  //             });
  //             return next;
  //         });

  //         setVolumeData((prev) => {
  //             const next = [...prev.slice(1)];
  //             next.push({
  //                 day: (parseInt(prev[prev.length - 1].day) + 1).toString(),
  //                 value: Math.floor(Math.random() * 100),
  //             });
  //             return next;
  //         });
  //     }, 2000);

  //     return () => clearInterval(interval);
  // }, []);

  // 🔥 COINS
  const coins = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      amount: "0.2231345",
      usd: "$11,032.24",
      change: "+12.5%",
      color: "bg-[#1e293b]",
      logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    },
    {
      name: "Tether",
      symbol: "USDT",
      amount: "1.2345",
      usd: "$1,032.24",
      change: "-1.5%",
      color: "bg-[#1e293b]",
      logo: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    },
    {
      name: "Cardano",
      symbol: "ADA",
      amount: "1.2370",
      usd: "$532.94",
      change: "+12.5%",
      color: "bg-[#1e293b]",
      logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
    },
    {
      name: "Binance",
      symbol: "BNB",
      amount: "240.55",
      usd: "$340.24",
      change: "+1.5%",
      color: "bg-[#1e293b]",
      logo: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    },
  ];

  return (
    <>
      <div className="space-y-6">
        {/* 🔥 TOP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
          {coins.map((coin, i) => (
            <div
              key={i}
              className="rounded-xl p-5 bg-[#0f172a] border border-white/5 hover:scale-[1.05] transition shadow-md relative"
            >
              <img src={coin.logo} className="w-8 h-8 absolute top-4 right-4" />

              <p className="text-xs text-gray-400 uppercase">{coin.name}</p>

              <h2 className="text-lg font-bold mt-6 text-white">
                {coin.amount} {coin.symbol}
              </h2>

              <p className="text-xs text-gray-500">{coin.usd}</p>

              <span
                className={`absolute bottom-4 right-4 text-xs font-semibold ${
                  coin.change.includes("+") ? "text-blue-400" : "text-red-400"
                }`}
              >
                {coin.change}
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
                  ${balance.toLocaleString()}
                </h2>
              </div>
            </div>

            <button
              onClick={() => setOpenTopup(true)}
              className="mt-4 border cursor-pointer border-blue-400/30 text-blue-400 rounded-lg py-2 text-sm hover:bg-blue-400/10 transition"
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

              <p className="text-blue-400 font-semibold mt-2 text-sm">74.8%</p>
              <p className="text-[10px] text-gray-500">Compared to last week</p>
            </div>

            {/* TOP CRYPTO LIST */}
            <div className="glow-card p-4">
              <p className="text-xs text-gray-400 mb-3">Top Crypto</p>

              <div className="space-y-3">
                {coins.map((coin, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <img src={coin.logo} className="w-5 h-5" />
                      <span>{coin.symbol}</span>
                    </div>
                    <span className="text-gray-400">{coin.usd}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {openTopup && <TopUpModal open={openTopup} onClose={()=>setOpenTopup(false)} />}
    </>
  );
};

export default CryptoOverview;
