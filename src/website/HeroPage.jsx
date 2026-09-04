import React from "react";
import { motion } from "framer-motion";
import ButtonComponent from "../components/ui/ButtonComponent";
import { AuthRoutes } from "../constants/routes";
import { Link } from "react-router-dom";
import { ShieldCheck, TrendingUp, Zap, ChevronRight, Lock, CheckCircle2 } from "lucide-react";
import { formatINR } from "../utils/helper";

const HeroPage = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-50 py-16 lg:py-24">
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-200/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: HERO HEADLINE & CTAS */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
            India's #1 Automated Financial Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]"
          >
            Grow Your Wealth with{" "}
            <span className="text-gradient-sky">India's Smartest</span> Investment Platform
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl"
          >
            Automated high-yield returns calculated directly in <span className="font-semibold text-slate-900">INR (₹)</span>. Backed by AI portfolio allocation, institutional security, and instant bank withdrawals.
          </motion.p>

          {/* BADGES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-4 text-xs font-medium text-slate-600 pt-1"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-500" /> Instant INR Bank Payouts
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-500" /> Automated AI Trading Bot
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-500" /> Bank-Grade 256-bit Security
            </div>
          </motion.div>

          {/* ACTION BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-3"
          >
            <Link to={AuthRoutes.REGISTER}>
              <ButtonComponent variant="primary" padding="14px 28px">
                Start Investing Now →
              </ButtonComponent>
            </Link>

            <a href="#opportunities">
              <ButtonComponent variant="outline" padding="14px 28px">
                Explore Growth Plans
              </ButtonComponent>
            </a>
          </motion.div>

          {/* HERO STATS BAR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200"
          >
            <div>
              <p className="text-2xl font-bold text-slate-900">{formatINR(250000000).split('.')[0]}+</p>
              <p className="text-xs text-slate-500 mt-0.5">Assets Managed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">50,000+</p>
              <p className="text-xs text-slate-500 mt-0.5">Active Investors</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-sky-600">18.4%</p>
              <p className="text-xs text-slate-500 mt-0.5">Avg Annual Yield</p>
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: PREVIEWS & DASHBOARD METRICS */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-6 relative z-10"
          >
            {/* CARD HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs text-slate-400 font-medium">Verified Portfolio</span>
                <h3 className="text-xl font-bold text-slate-900">{formatINR(125000)}</h3>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full flex items-center gap-1">
                <TrendingUp size={14} /> +2.4% Today
              </span>
            </div>

            {/* QUICK STATS IN CARD */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-500 font-medium">Daily Earnings</p>
                <p className="text-base font-bold text-emerald-600 mt-0.5">{formatINR(3125)}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-500 font-medium">Total ROI Earned</p>
                <p className="text-base font-bold text-sky-600 mt-0.5">{formatINR(42500)}</p>
              </div>
            </div>

            {/* LIVE BOT ACTIVITY PREVIEW */}
            <div className="space-y-3 pt-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Portfolio Allocations</p>

              <div className="flex items-center justify-between p-3 rounded-xl bg-sky-50/70 border border-sky-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-600 text-white font-bold text-xs flex items-center justify-center">
                    AI
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Quant Alpha Plan</p>
                    <p className="text-[11px] text-slate-500">Auto-compounded daily</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900">{formatINR(75000)}</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">+1.8% / day</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold text-xs flex items-center justify-center">
                    INR
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">High-Yield Reserve</p>
                    <p className="text-[11px] text-slate-500">Instant liquidity</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900">{formatINR(50000)}</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">+0.9% / day</p>
                </div>
              </div>
            </div>

            {/* TRUST NOTICE */}
            <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500 border-t border-slate-100">
              <span className="flex items-center gap-1"><Lock size={12} className="text-sky-600" /> End-to-end encrypted</span>
              <span className="font-semibold text-slate-700">BEP-20 Network Supported</span>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HeroPage;