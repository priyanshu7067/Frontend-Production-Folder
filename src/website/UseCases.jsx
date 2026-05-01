import { useEffect, useState } from "react";
import {
  Shield,
  Zap,
  FileText,
  Brain,
  BarChart3,
  Database,
  Bot,
  Lock,
} from "lucide-react";


  const useCases = [
  {
    icon: Shield,
    title: "Secure Trading Engine",
    desc: "Enterprise-grade security to protect your assets and ensure safe transactions in real-time markets.",
    color: "green",
    points: ["End-to-end encryption", "Secure wallet integration", "Real-time threat detection"],
  },
  {
    icon: Zap,
    title: "High-Speed Execution",
    desc: "Execute trades instantly with lightning-fast performance and minimal latency.",
    color: "orange",
    points: ["Ultra-fast order matching", "Low latency execution", "Optimized trading flow"],
  },
  {
    icon: FileText,
    title: "Smart Insights & Reports",
    desc: "Get intelligent reports and insights to make better trading decisions.",
    color: "blue",
    points: ["AI-based analytics", "Market trend reports", "Performance tracking"],
  },
  {
    icon: Brain,
    title: "AI-Powered Predictions",
    desc: "Leverage AI models to predict market trends and maximize your profits.",
    color: "purple",
    points: ["Predictive analysis", "Smart signals", "Advanced forecasting"],
  },
  {
    icon: BarChart3,
    title: "Real-Time Market Data",
    desc: "Stay ahead with live market updates and deep analytics dashboards.",
    color: "green",
    points: ["Live charts", "Advanced indicators", "Real-time tracking"],
  },
  {
    icon: Database,
    title: "Unified Data Platform",
    desc: "Access all your trading data in one place with seamless integration.",
    color: "blue",
    points: ["Multi-source data", "Centralized dashboard", "Instant access"],
  },
  {
    icon: Bot,
    title: "Automated Trading Bots",
    desc: "Automate your strategies with intelligent trading bots that work 24/7.",
    color: "purple",
    points: ["Auto trading", "Custom strategies", "24/7 execution"],
  },
  {
    icon: Lock,
    title: "Advanced Risk Control",
    desc: "Manage risks effectively with built-in protection tools and smart controls.",
    color: "green",
    points: ["Stop-loss automation", "Risk alerts", "Portfolio protection"],
  },
];
const colorClasses = {
  green: {
    bg: "from-[#22c55e]/16 to-transparent",
    border: "border-[#22c55e]/15",
    text: "text-[#22c55e]",
  },
  orange: {
    bg: "from-[#f97316]/16 to-transparent",
    border: "border-[#f97316]/15",
    text: "text-[#f97316]",
  },
  blue: {
    bg: "from-[#38bdf8]/16 to-transparent",
    border: "border-[#38bdf8]/15",
    text: "text-[#38bdf8]",
  },
  purple: {
    bg: "from-[#a855f7]/16 to-transparent",
    border: "border-[#a855f7]/15",
    text: "text-[#a855f7]",
  },
};

export default function UseCases() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % useCases.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % useCases.length);
  };

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + useCases.length) % useCases.length);
  };

  const getPosition = (index) => {
    const total = useCases.length;
    const diff = (index - active + total) % total;

    if (diff === 0) return "center-card";
    if (diff === 1) return "right-card-1";
    if (diff === 2) return "right-card-2";
    if (diff === total - 1) return "left-card-1";
    if (diff === total - 2) return "left-card-2";

    return "hidden-card";
  };

  return (
    <section className="relative overflow-hidden bg-[var(--bg-main)] py-24 text-[var(--text-main)]">
      <div className="absolute inset-0 opacity-35">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(127,156,168,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(127,156,168,0.045)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="absolute left-1/2 top-24 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#22c55e]/10 blur-[120px]" />
      <div className="absolute -left-40 bottom-20 h-[280px] w-[280px] rounded-full bg-[#b76e79]/10 blur-[120px]" />
      <div className="absolute -right-40 top-40 h-[280px] w-[280px] rounded-full bg-[#7f9ca8]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Use Cases
          </p>

          <h2 className="text-metal text-4xl font-black md:text-5xl">
            Powering the Future of Trading
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300/65 md:text-lg">
            Explore advanced tools, AI-driven insights, and high-performance systems designed
    to give you a competitive edge in the modern trading ecosystem.077ytjj
          </p>
        </div>

        <div className="relative mx-auto h-[500px] max-w-7xl">
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 z-40 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white backdrop-blur-xl transition hover:bg-white/[0.08] md:flex"
          >
            ←
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 z-40 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white backdrop-blur-xl transition hover:bg-white/[0.08] md:flex"
          >
            →
          </button>

          <div className="relative flex h-full items-center justify-center">
            {useCases.map((item, index) => {
              const Icon = item.icon;
              const colors = colorClasses[item.color];
              const position = getPosition(index);

              return (
                <div
                  key={item.title}
                  className={`usecase-card absolute w-[88%] max-w-[410px] rounded-[28px] border p-6 transition-all duration-700 ease-out md:w-[410px] ${position} ${colors.border}`}
                >
                  <div
                    className={`mb-7 flex h-[72px] items-center justify-center rounded-2xl border border-white/8 bg-gradient-to-r ${colors.bg}`}
                  >
                    <Icon className={`h-9 w-9 ${colors.text}`} />
                  </div>

                  <h3 className="mb-4 text-center text-2xl font-black text-white">
                    {item.title}
                  </h3>

                  <p className="mx-auto mb-7 max-w-sm text-center text-sm leading-relaxed text-slate-300/65">
                    {item.desc}
                  </p>

                  <div className="space-y-3">
                    {item.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-slate-200/90 backdrop-blur-md"
                      >
                        <span className="h-2 w-2 rounded-full bg-[#22c55e]/80" />
                        {point}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <span className="text-[#22c55e]">♧</span>
                    Propulsé par IA
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {useCases.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === index
                  ? "w-8 bg-[#22c55e]/80"
                  : "w-2 bg-white/20 hover:bg-white/35"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}