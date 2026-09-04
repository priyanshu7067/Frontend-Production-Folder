import React from "react";
import { ShieldCheck, Lock, Award, Server, Cpu, RefreshCw, CheckCircle2 } from "lucide-react";
import ButtonComponent from "../components/ui/ButtonComponent";
import { Link } from "react-router-dom";
import { AuthRoutes } from "../constants/routes";

const features = [
  {
    icon: ShieldCheck,
    title: "Institutional Security Standards",
    desc: "Your assets are protected with multi-signature cold storage, hardware security modules, and strict compliance controls.",
  },
  {
    icon: RefreshCw,
    title: "Automated Daily Earnings",
    desc: "No manual calculations needed. Daily yields are automatically computed and credited directly to your INR dashboard.",
  },
  {
    icon: Server,
    title: "99.9% Infrastructure Uptime",
    desc: "Built on enterprise cloud clusters ensuring high availability, continuous trade execution, and instant API access.",
  },
  {
    icon: Award,
    title: "Regulated & Transparent",
    desc: "Complete financial transparency with detailed ROI transaction logs, user referral hierarchies, and downloadable statements.",
  },
];

export default function ProblemSection() {
  return (
    <section id="security" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* WHY CHOOSE US */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
              Institutional Quality
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Why Smart Investors Choose Finor Capital
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              We eliminate complex manual trading hurdles by providing a secure, automated fintech platform tailored specifically for Indian investors.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              {features.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                      <Icon size={20} />
                    </div>
                    <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

          </div>

          {/* SECURITY & TRUST CARD */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-sky-600 rounded-2xl text-white">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Security & Risk Architecture</h3>
                    <p className="text-xs text-slate-400">Zero-compromise protection for your capital</p>
                  </div>
                </div>

                <div className="space-y-3.5 pt-2">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    <CheckCircle2 size={18} className="text-sky-400 mt-0.5 shrink-0" />
                    <div>
                      <h5 className="text-xs font-bold text-white">Multi-Signature Wallet Governance</h5>
                      <p className="text-[11px] text-slate-400">Transactions require multiple trusted key approvals before authorization.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    <CheckCircle2 size={18} className="text-sky-400 mt-0.5 shrink-0" />
                    <div>
                      <h5 className="text-xs font-bold text-white">Automated Risk Stop-Loss</h5>
                      <p className="text-[11px] text-slate-400">AI bots automatically enforce strict risk mitigation algorithms to safeguard principal.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    <CheckCircle2 size={18} className="text-sky-400 mt-0.5 shrink-0" />
                    <div>
                      <h5 className="text-xs font-bold text-white">Instant Audit Trail Access</h5>
                      <p className="text-[11px] text-slate-400">Track all incoming investments, referral bonuses, and bank payouts seamlessly.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
                  <span>Support: 24/7 Priority Desk</span>
                  <Link to={AuthRoutes.REGISTER} className="text-sky-400 font-semibold hover:underline">
                    Get Started Free →
                  </Link>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}