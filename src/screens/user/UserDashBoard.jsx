import React from "react";
import { Wallet, ArrowLeftRight, Bot } from "lucide-react";
import ButtonComponent from "../../components/ui/ButtonComponent";
import TokenScreener from "../../components/CryptoScreenTable";
import CryptoScreenTable from "../../components/CryptoScreenTable";
import CryptoOverview from "./CryptoOverviews";
import TransactionTable from "./TransactionTable";
import { useAuth } from "../../context/AuthContext";

const UserDashBoard = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen text-white space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold tracking-wide text-metal text-glow">
        Become Smart Money
      </h1>
      <CryptoOverview balance={user?.wallets?.principalWallet || 0} />
      <CryptoScreenTable />
      <TransactionTable />
    </div>
  );
};

export default UserDashBoard;
