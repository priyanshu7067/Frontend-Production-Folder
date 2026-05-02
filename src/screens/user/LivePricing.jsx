import React, { useEffect, useState } from "react";
import CryptoScreenTable from "../../components/CryptoScreenTable";

const LivePricing = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCoins = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&price_change_percentage=24h"
      );
      const data = await res.json();
      setCoins(data);
      setLoading(false);
    } catch (err) {
      console.error("Coin fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();

    // 🔥 5 MIN INTERVAL (SAFE)
    const interval = setInterval(fetchCoins, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-bg min-h-screen p-4 md:p-6 space-y-6">

      {/* 🔥 LIVE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

        {loading
          ? [...Array(4)].map((_, i) => (
              <div key={i} className="glow-card p-4 animate-pulse h-[120px]" />
            ))
          : coins.map((coin) => {
              const change = coin.price_change_percentage_24h || 0;
              const isUp = change >= 0;

              return (
                <div
                  key={coin.id}
                  className="glow-card p-4 hover:scale-[1.02] transition"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img src={coin.image} className="w-7 h-7" />
                    <p className="text-sm text-white font-semibold">
                      {coin.name}
                    </p>
                  </div>

                  <h2 className="text-lg font-bold text-white">
                    ${coin.current_price.toLocaleString()}
                  </h2>

                  <p className="text-xs text-gray-400">
                    MCap: ${(coin.market_cap / 1e9).toFixed(2)}B
                  </p>

                  <p
                    className={`text-xs mt-1 font-semibold ${
                      isUp
                        ? "text-[var(--primary)]"
                        : "text-red-400"
                    }`}
                  >
                    {isUp ? "+" : ""}
                    {change.toFixed(2)}%
                  </p>

                  <div className="h-10 mt-3 rounded bg-gradient-to-r from-transparent via-[var(--primary)]/20 to-transparent" />
                </div>
              );
            })}
      </div>

      {/* 🔥 LIVE TABLE */}
      <CryptoScreenTable />

    </div>
  );
};

export default LivePricing;