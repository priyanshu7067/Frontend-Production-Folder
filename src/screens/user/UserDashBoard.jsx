import React, { useEffect, useState } from "react";
import CryptoScreenTable from "../../components/CryptoScreenTable";
import CryptoOverview from "./CryptoOverviews";
import TransactionTable from "./TransactionTable";
import { useAuth } from "../../context/AuthContext";
import SignalsModal from "../../components/ui/SignalsModal";

const UserDashBoard = () => {
  const { user } = useAuth();

  const [tokens, setTokens] = useState([]);
  const [isSignalsOpen, setIsSignalsOpen] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchMarketData = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&price_change_percentage=24h"
        );
        const data = await res.json();

        if (isMounted) {
          setTokens(data || []);
        }
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    // 🔥 INITIAL CALL (important)
    fetchMarketData();

    // 🔥 3 MIN INTERVAL (180000 ms)
    const interval = setInterval(fetchMarketData, 180000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen text-white space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold">
        Become Smart Money
      </h1>

      {/* 🔥 SAME DATA USE */}
      <CryptoOverview
        balance={user?.wallets?.principalWallet || 0}
        tokens={tokens}
      />

      <CryptoScreenTable tokens={tokens} />

      <TransactionTable />

      <SignalsModal
        open={isSignalsOpen}
        onClose={() => setIsSignalsOpen(false)}
      />
    </div>
  );
};

export default UserDashBoard;