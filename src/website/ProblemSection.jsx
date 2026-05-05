import React from "react";
import { Zap, BarChart3, ShieldCheck } from "lucide-react";
import ButtonComponent from "../components/ui/ButtonComponent";
import { Link } from "react-router-dom";
import { AuthRoutes } from "../constants/routes";

const opportunityCards = [
  {
    icon: BarChart3,
    title: "Data-Driven Precision",
    desc: "Cut through market noise with AI-filtered signals that highlight high-probability opportunities in real-time.",
  },
  {
    icon: Zap,
    title: "Instant Execution",
    desc: "Eliminate manual latency. Our infrastructure ensures your strategies execute at the speed of the market.",
  },
  {
    icon: ShieldCheck,
    title: "Adaptive Risk Logic",
    desc: "Navigate crypto volatility with automated guardrails designed to protect capital and lock in gains.",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-main)] py-24 text-white" id="solution">

      {/* Background Tech Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(127,156,168,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(127,156,168,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Strategic Glow Effects */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />
      <div className="absolute right-[-10%] bottom-[-10%] h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">

        {/* 🔰 Heading Section */}
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gradient">
            Strategic Intelligence
          </p>

          <h2 className="text-4xl font-black leading-[1.1] md:text-6xl text-metal">
            Trade with the edge of
            <br />
            <span className="text-white">Institutional Logic.</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
            Stop reacting and start anticipating. BYNEXA.AI transforms raw crypto volatility
            into a structured, high-performance trading environment.
          </p>
        </div>

        {/* 🔰 Opportunity Cards */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {opportunityCards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative rounded-[32px] border border-white/5 bg-white/[0.02] p-10 transition-all duration-500 hover:border-teal-500 hover:bg-white/[0.04] hover:-translate-y-2 overflow-hidden"
              >
                {/* Subtle Hover Glow inside card */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#0e8fa3] blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#0e8fa3] bg-teal-500 text-gradient shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-transform duration-500 group-hover:scale-110">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mb-4 text-xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* 🔥 Unified CTA Platform Section */}
        <div className="mt-28 flex justify-center">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[40px] border border-white/10 bg-[#11141a]/50 px-6 py-12 text-center backdrop-blur-2xl md:px-20 md:py-10">

            {/* Background Accent for CTA */}
            <div className="absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />

            <h2 className="text-3xl font-black md:text-5xl tracking-tight text-glow">
              M.F Finor<span className="text-gray-500">|</span> The Smart Money Protocol
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-gray-400 md:text-xl">
              We bridges the gap between complex market data and
              <span className="text-gradient font-semibold"> profitable execution. </span>
              Experience the future of decentralized asset management.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={AuthRoutes.REGISTER}>
                <ButtonComponent variant="neon">
                  Launch
                </ButtonComponent >
              </Link>
              <ButtonComponent variant="outline" >
                View Documentation
              </ButtonComponent>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}