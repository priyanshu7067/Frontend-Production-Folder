import React from "react";
import CryptoOverview from "./CryptoOverviews";
import TransactionTable from "./TransactionTable";
import { useAuth } from "../../context/AuthContext";

const UserDashBoard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen text-slate-900 space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Portfolio & Wealth Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track your daily automated INR yield, principal capital, and transaction history.
          </p>
        </div>
      </div>

      {/* INR PORTFOLIO METRICS & CHARTS */}
      <CryptoOverview user={user} />

      {/* RECENT TRANSACTIONS TABLE */}
      <TransactionTable />
    </div>
  );
};

export default UserDashBoard;