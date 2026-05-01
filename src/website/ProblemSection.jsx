import { TrendingDown, Clock3, AlertTriangle } from "lucide-react";

const problemCards = [
  {
    icon: TrendingDown,
    title: "Overloaded Market Data",
    desc: "Too many charts, signals, and numbers make trading decisions slow and overwhelming.",
  },
  {
    icon: Clock3,
    title: "Manual Trading Delay",
    desc: "Constant monitoring and manual execution reduce speed and limit your potential gains.",
  },
  {
    icon: AlertTriangle,
    title: "Uncontrolled Risk",
    desc: "Without intelligent systems, managing volatility and risk becomes difficult and inconsistent.",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-main)] py-24 text-white">
      
      {/* Grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(127,156,168,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(127,156,168,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Glow blobs */}
      <div className="absolute left-1/2 top-28 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-[#b76e79]/10 blur-[120px]" />
      <div className="absolute left-[-120px] bottom-0 h-[260px] w-[260px] rounded-full bg-[#7f9ca8]/10 blur-[120px]" />
      <div className="absolute right-[-120px] bottom-0 h-[260px] w-[260px] rounded-full bg-[#4f6d7a]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">

        {/* 🔰 Heading */}
        <div className="mx-auto mb-16 max-w-5xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            The Problem
          </p>

          <h2 className="text-metal text-4xl font-black leading-tight md:text-6xl">
            Trading is complex.
            <br />
            <span className="text-white">
              Without automation, it's slow.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-relaxed text-slate-300/70 md:text-xl">
            Modern markets move fast, but manual workflows slow you down. 
            Without intelligent systems, analyzing data and executing trades 
            becomes inefficient and risky.
          </p>
        </div>

        {/* 🔰 Cards */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 md:grid-cols-3">
          {problemCards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="problem-card group rounded-[26px] border border-white/10 p-8 text-center"
              >
                <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition duration-300 group-hover:bg-white/10">
                  <Icon className="h-8 w-8 text-[#7f9ca8]" />
                </div>

                <h3 className="mb-4 text-xl font-black text-white">
                  {item.title}
                </h3>

                <p className="mx-auto max-w-xs text-sm leading-relaxed text-slate-300/65">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* 🔥 CTA SECTION (same component me added) */}
        <div className="mt-20 flex justify-center">
          <div className="w-full max-w-4xl rounded-[30px] border border-white/10 bg-white/[0.035] px-4 py-10 text-center backdrop-blur-xl md:px-12 md:py-14">
            
            <h2 className="text-metal text-3xl font-black md:text-4xl">
              BYNEXA.AI : Your intelligent trading assistant.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-300/75 md:text-xl">
              A platform that combines live market data with artificial intelligence
              to generate actionable insights.
              <span className="font-bold text-[#b76e79]">
                {" "}
                A smart assistant to optimize your trading decisions.
              </span>
            </p>

            <button className="mt-9 rounded-2xl bg-gradient-main px-9 py-4 text-base font-bold text-white shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:opacity-95">
              Discover the Platform
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}