import React from "react";
import {
  ShieldCheck,
  Zap,
  TrendingUp,
  Brain,
  BarChart3,
  Lock,
  Wallet,
  Users,
} from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "High-Yield Daily Returns",
    desc: "Earn automated daily yields directly credited to your INR wallet with compounding options.",
    badge: "Automated Growth",
  },
  {
    icon: Brain,
    title: "AI Quantitative Engine",
    desc: "Smart algorithmic trading strategies analyzing real-time market data for high probability execution.",
    badge: "Smart AI",
  },
  {
    icon: Zap,
    title: "Instant INR Payouts",
    desc: "Withdraw your profits and principal directly into your Indian bank account without unnecessary delay.",
    badge: "0% Delay",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Grade Encryption",
    desc: "Institutional 256-bit SSL protection, multi-sig asset storage, and rigorous audit trails.",
    badge: "Secure",
  },
  {
    icon: Users,
    title: "Multi-Tier Referral Rewards",
    desc: "Earn direct referral bonuses and multi-level team commissions as your network grows.",
    badge: "Passive Income",
  },
  {
    icon: BarChart3,
    title: "Real-Time Portfolio Tracking",
    desc: "Complete visibility over your active plans, daily ROI breakdown, and transaction history.",
    badge: "Full Transparency",
  },
];

export default function UseCases() {
  return (
    <section id="benefits" className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
            Why Invest With Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
            Designed for Superior Capital Growth
          </h2>
          <p className="text-slate-600 text-base mt-3">
            Combine institutional trading intelligence with simple, seamless INR wealth management.
          </p>
        </div>

        {/* BENEFITS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-slate-50/70 border border-slate-200 rounded-3xl p-7 hover:bg-white hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors">
                      <Icon size={24} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-xs">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-sky-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Learn more →
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}