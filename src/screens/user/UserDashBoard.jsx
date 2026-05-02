import React from "react";
import { Wallet, ArrowLeftRight, Bot } from "lucide-react";
import ButtonComponent from "../../components/ui/ButtonComponent";
import TokenScreener from "../../components/CryptoScreenTable";
import CryptoScreenTable from "../../components/CryptoScreenTable";
import CryptoOverview from "./CryptoOverviews";
import TransactionTable from "./TransactionTable";

const UserDashBoard = () => {
    return (
        <div className="min-h-screen p-4 md:p-6 text-white dashboard-bg space-y-6">

            <h1 className="text-xl md:text-2xl font-semibold tracking-wide text-metal text-glow">
                Become Smart Money
            </h1>
            <CryptoOverview />

            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                <div className="glow-card p-5 space-y-5">

               
                    <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#b76e79] to-[#7f9ca8]" />

                    <div className="relative z-10 space-y-5">

                        <div className="grid grid-cols-2 gap-4">

                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-full bg-[rgba(183,110,121,0.15)]">
                                    <Wallet size={20} className="text-[var(--accent-primary)]" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Main Wallet</p>
                                    <h2 className="text-lg font-semibold">$40.10</h2>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-full bg-[rgba(183,110,121,0.15)]">
                                    <Wallet size={20} className="text-[var(--accent-primary)]" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Trading Wallet</p>
                                    <h2 className="text-lg font-semibold">$135.00</h2>
                                </div>
                            </div>

                        </div>

                        <div className="flex justify-around pt-3 border-t border-white/10">

                            <div className="flex flex-col items-center gap-1 text-sm text-gray-300">
                                <div className="p-3 rounded-full bg-white/5 border border-white/10">
                                    <ArrowLeftRight size={18} />
                                </div>
                                Transfer
                            </div>

                            <div className="flex flex-col items-center gap-1 text-sm text-gray-300">
                                <div className="p-3 rounded-full bg-white/5 border border-white/10">
                                    <ArrowLeftRight size={18} />
                                </div>
                                Wallet Transfer
                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-3">
                            <ButtonComponent fullWidth>Deposit</ButtonComponent>
                            <ButtonComponent variant="outline" fullWidth>
                                Withdraw
                            </ButtonComponent>
                        </div>

                    </div>
                </div>

                <div className="glow-card p-5 space-y-4">

                    <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#b76e79] to-[#7f9ca8]" />

                    <div className="relative z-10 space-y-4">
                        <div>
                            <p className="text-xs text-gray-400">Total Trade Profit</p>
                            <h2 className="text-lg font-semibold text-[var(--accent-secondary)]">
                                $0.09
                            </h2>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400">Today Profit</p>
                            <h2 className="text-lg font-semibold text-[var(--accent-primary)]">
                                $0.00
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="glow-card p-5 space-y-4">

                    <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#b76e79] to-[#7f9ca8]" />

                    <div className="relative z-10 space-y-4">

                        <div className="flex justify-between items-center">
                            <h2 className="flex items-center gap-2 text-sm font-semibold">
                                <Bot size={16} className="text-[var(--accent-primary)]" />
                                AI Trade Bot
                            </h2>

                            <span className="text-xs px-2 py-1 rounded-full 
            bg-[rgba(183,110,121,0.15)] text-[var(--accent-primary)]">
                                Level 1
                            </span>
                        </div>

                        <p className="text-xs text-gray-400">
                            Profit Range:{" "}
                            <span className="text-[var(--accent-secondary)]">
                                1.0% - 1.2%
                            </span>
                        </p>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                            <h3 className="text-xs mb-2 text-gray-400">
                                Live Crypto Market
                            </h3>

                            <div className="space-y-2 text-sm">
                                {["BTC", "ETH", "USDT", "XRP"].map((coin, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between items-center py-1 border-b border-white/5"
                                    >
                                        <span>{coin}</span>
                                        <span>$77,152</span>
                                        <span className="text-[var(--accent-secondary)]">
                                            +1.2%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <ButtonComponent fullWidth>AI Trade</ButtonComponent>
                            <ButtonComponent fullWidth>Collect Profit</ButtonComponent>
                        </div>

                    </div>
                </div>

            </div> */}


            <CryptoScreenTable />
            <TransactionTable />
        </div>
    );
};

export default UserDashBoard;