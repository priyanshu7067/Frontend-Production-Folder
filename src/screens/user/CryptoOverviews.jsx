import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import TopUpModal from "../../components/ui/TopUpModal";
import { formatINR } from "../../utils/helper";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { Wallet, TrendingUp, ArrowUpRight, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const CryptoOverview = ({ user }) => {
  const [openTopup, setOpenTopup] = useState(false);

  const principal = user?.wallets?.principalWallet || 0;
  const earnings = user?.wallets?.earningsWallet || 0;
  const totalBalance = principal + earnings;

  // INR Portfolio Growth Trend Data
  const inrGrowthData = useMemo(() => {
    const base = principal || 50000;
    return [
      { month: "Jan", balance: base * 0.7 },
      { month: "Feb", balance: base * 0.78 },
      { month: "Mar", balance: base * 0.85 },
      { month: "Apr", balance: base * 0.92 },
      { month: "May", balance: base * 0.98 },
      { month: "Jun", balance: base * 1.05 },
      { month: "Jul", balance: base * 1.12 },
      { month: "Aug", balance: base * 1.20 },
      { month: "Sep", balance: totalBalance || base * 1.25 },
    ];
  }, [principal, totalBalance]);

  // Monthly INR Returns Distribution Data
  const monthlyReturnsData = useMemo(() => {
    const baseReturns = earnings || 8500;
    return [
      { month: "Jan", yield: Math.round(baseReturns * 0.5) },
      { month: "Feb", yield: Math.round(baseReturns * 0.65) },
      { month: "Mar", yield: Math.round(baseReturns * 0.7) },
      { month: "Apr", yield: Math.round(baseReturns * 0.82) },
      { month: "May", yield: Math.round(baseReturns * 0.9) },
      { month: "Jun", yield: Math.round(baseReturns * 1.0) },
    ];
  }, [earnings]);

  return (
    <>
      <div className="space-y-6">
        
        {/* TOP METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* TOTAL PORTFOLIO */}
          <div className="bg-white border border-sky-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Total Portfolio Value</span>
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                <Wallet size={18} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-3">
              {formatINR(totalBalance)}
            </h2>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-2">
              <ArrowUpRight size={14} /> +1.8% Daily Yield Active
            </div>
          </div>

          {/* PRINCIPAL WALLET */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Principal Investment</span>
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <Zap size={18} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-3">
              {formatINR(principal)}
            </h2>
            <p className="text-xs text-slate-500 mt-2 font-medium">Active Locked Capital</p>
          </div>

          {/* EARNINGS WALLET */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Earnings & Yield</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp size={18} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-emerald-600 mt-3">
              {formatINR(earnings)}
            </h2>
            <p className="text-xs text-slate-500 mt-2 font-medium">Available for Instant Payout</p>
          </div>

          {/* TOP UP QUICK ACTION */}
          <div className="bg-gradient-to-br from-sky-50 to-white border border-sky-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Portfolio Management</span>
              <p className="text-xs text-slate-600 mt-1 font-medium">Add funds to increase daily ROI returns.</p>
            </div>
            <div className="mt-4">
              <ButtonComponent
                variant="primary"
                fullWidth
                padding="10px 16px"
                onClick={() => setOpenTopup(true)}
              >
                + Top Up Wallet
              </ButtonComponent>
            </div>
          </div>

        </div>

        {/* CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* INR PORTFOLIO GROWTH CHART */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Portfolio Growth Trend (INR)</h3>
                <p className="text-xs text-slate-500">Historical performance & yield progression</p>
              </div>
              <span className="px-3 py-1 bg-sky-50 text-sky-700 border border-sky-100 rounded-full text-xs font-bold">
                INR Currency
              </span>
            </div>

            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={inrGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                  <Tooltip
                    formatter={(value) => [formatINR(value), "Portfolio Balance"]}
                    contentStyle={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#0284c7"
                    strokeWidth={3}
                    dot={{ fill: "#0284c7", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* MONTHLY RETURNS BAR CHART */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Monthly ROI Yield</h3>
              <p className="text-xs text-slate-500 mb-4">Credited returns breakdown</p>

              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyReturnsData}>
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                    <Tooltip
                      formatter={(val) => [formatINR(val), "Monthly Yield"]}
                      contentStyle={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                    />
                    <Bar dataKey="yield" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Avg Monthly ROI</span>
              <span className="text-emerald-600 font-bold">+18.4%</span>
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