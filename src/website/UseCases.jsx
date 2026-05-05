import React, { useEffect, useState } from "react";
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
    bg: "from-[#22c55e]/10 to-transparent",
    border: "border-[#22c55e]/20",
    text: "text-[#22c55e]",
  },
  orange: {
    bg: "from-[#f97316]/10 to-transparent",
    border: "border-[#f97316]/20",
    text: "text-[#f97316]",
  },
  blue: {
    bg: "from-[#38bdf8]/10 to-transparent",
    border: "border-[#38bdf8]/20",
    text: "text-[#38bdf8]",
  },
  purple: {
    bg: "from-[#a855f7]/10 to-transparent",
    border: "border-[#a855f7]/20",
    text: "text-[#a855f7]",
  },
};

export default function UseCases() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % useCases.length);
    }, 4000); // Increased time for better readability
    return () => clearInterval(timer);
  }, []);

  const getPosition = (index) => {
    const total = useCases.length;
    const diff = (index - active + total) % total;

    if (diff === 0) return "scale-100 opacity-100 z-30 translate-x-0";
    if (diff === 1) return "scale-90 opacity-60 z-20 translate-x-[40%] md:translate-x-[60%] blur-[1px]";
    if (diff === 2) return "scale-75 opacity-30 z-10 translate-x-[70%] md:translate-x-[110%] blur-[2px]";
    if (diff === total - 1) return "scale-90 opacity-60 z-20 -translate-x-[40%] md:-translate-x-[60%] blur-[1px]";
    if (diff === total - 2) return "scale-75 opacity-30 z-10 -translate-x-[70%] md:-translate-x-[110%] blur-[2px]";

    return "scale-50 opacity-0 z-0 translate-x-0 pointer-events-none";
  };

  return (
    <section className="relative overflow-hidden bg-[var(--bg-main)] py-24 text-white">
      {/* Background Grids */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(127,156,168,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(127,156,168,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-emerald-500">
            Use Cases
          </p>
          <h2 className="text-4xl font-black md:text-6xl text-metal">
            Powering the Future of Trading
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative mx-auto flex h-[550px] w-full items-center justify-center overflow-visible">
          {useCases.map((item, index) => {
            const Icon = item.icon;
            const colors = colorClasses[item.color];
            const positionClass = getPosition(index);

            return (
              <div
                key={item.title}
                className={`absolute w-[90%] max-w-[400px] rounded-[32px] border bg-[#11141a]/80 p-8 backdrop-blur-xl transition-all duration-700 ease-in-out ${positionClass} ${colors.border}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/5 bg-gradient-to-br ${colors.bg}`}>
                  <Icon className={`h-8 w-8 ${colors.text}`} />
                </div>

                <h3 className="mb-3 text-2xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-gray-400">
                  {item.desc}
                </p>

                <div className="space-y-3">
                  {item.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.03] bg-white/[0.02] px-4 py-3 text-xs font-medium text-gray-300 transition hover:bg-white/[0.05]"
                    >
                      <div className={`h-1.5 w-1.5 rounded-full ${colors.text} shadow-[0_0_8px_currentColor]`} />
                      {point}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  <span className="h-px w-8 bg-gray-800" />
                  Propulsé par IA
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Dots */}
        <div className="mt-12 flex justify-center gap-3">
          {useCases.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                active === index ? "w-10 bg-emerald-500" : "w-2 bg-gray-700 hover:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}