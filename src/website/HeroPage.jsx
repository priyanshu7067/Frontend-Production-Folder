import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PriceCard = ({
  icon,
  iconBg,
  symbol,
  name,
  price,
  change,
  isUp,
  bars,
  delay,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.92 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ scale: 1.05, y: -6 }}
    className="glass hero-card rounded-3xl p-4 min-w-[190px] pointer-events-auto"
  >
    <div className="flex items-center gap-3 mb-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base shadow-lg"
        style={{ background: iconBg }}
      >
        {icon}
      </div>

      <div className="flex-1">
        <div className="text-white text-sm font-bold leading-none">
          {symbol}
        </div>
        <div className="text-xs mt-1 text-slate-400">{name}</div>
      </div>

      <div className="text-right">
        <div className="text-white text-sm font-bold">{price}</div>
        <div
          className={`text-xs font-semibold ${
            isUp ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {isUp ? "▲" : "▼"} {change}
        </div>
      </div>
    </div>

    <div className="flex items-end gap-1 h-8 mt-2">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-full"
          style={{
            height: `${h}%`,
            background: isUp
              ? `linear-gradient(to top, rgba(16,185,129,.25), rgba(74,222,128,.95))`
              : `linear-gradient(to top, rgba(244,63,94,.25), rgba(251,113,133,.95))`,
            transformOrigin: "bottom",
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            delay: delay + i * 0.05,
            duration: 0.45,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  </motion.div>
);

const Stat = ({ num, label, delay }) => {
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    const timer = setTimeout(() => {
      const target = parseFloat(num);
      const suffix = num.replace(/[\d.]/g, "");
      const duration = 1600;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const value = target * ease;

        setDisplayed(
          (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) +
            suffix
        );

        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    }, delay * 1000 + 500);

    return () => clearTimeout(timer);
  }, [num, delay]);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
    >
      <div className="text-metal text-3xl md:text-4xl font-black">
        {displayed}
      </div>
      <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400 mt-1">
        {label}
      </p>
    </motion.div>
  );
};

const Particle = ({ style }) => (
  <motion.div
    className="absolute rounded-full"
    style={style}
    initial={{ y: "100vh", opacity: 0 }}
    animate={{ y: -30, opacity: [0, 0.8, 0.45, 0] }}
    transition={{
      duration: style.duration,
      delay: style.delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

const HeroPage = () => {
  const particles = Array.from({ length: 36 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    width: `${1 + Math.random() * 3}px`,
    height: `${1 + Math.random() * 3}px`,
    background: i % 2 === 0 ? "#b76e79" : "#7f9ca8",
    boxShadow:
      i % 2 === 0
        ? "0 0 16px rgba(183,110,121,.8)"
        : "0 0 16px rgba(127,156,168,.8)",
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 10,
  }));

  const cryptos = [
    {
      icon: "₿",
      iconBg: "linear-gradient(135deg,#f59e0b,#d97706)",
      symbol: "BTC/USDT",
      name: "Bitcoin",
      price: "$67,420",
      change: "2.41%",
      isUp: true,
      bars: [28, 48, 34, 72, 60, 88, 68, 96],
      delay: 0.9,
    },
    {
      icon: "Ξ",
      iconBg: "linear-gradient(135deg,#7f9ca8,#4f6d7a)",
      symbol: "ETH/USDT",
      name: "Ethereum",
      price: "$3,512",
      change: "0.87%",
      isUp: false,
      bars: [70, 48, 62, 34, 78, 55, 28, 42],
      delay: 1.05,
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--bg-main)] text-white">
      {/* 3D GIF Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://media.giphy.com/media/l0HlNaQ6gWfllcjDO/giphy.gif"
          alt="3d animated background"
          className="w-full h-full object-cover opacity-[0.16]"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-[1] bg-[#020617]/88 backdrop-blur-[2px]" />

      {/* Premium Gradient Layers */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_25%_20%,rgba(183,110,121,0.35),transparent_35%),radial-gradient(circle_at_75%_75%,rgba(127,156,168,0.32),transparent_38%),radial-gradient(circle_at_50%_45%,rgba(79,109,122,0.22),transparent_48%)]" />

      {/* Grid */}
      <div className="grid-bg z-[3]" />

      {/* Orbs */}
      <div className="orb orb-1 z-[4]" />
      <div className="orb orb-2 z-[4]" />
      <div className="orb orb-3 z-[4]" />

      {/* Particles */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        {particles.map((p, i) => (
          <Particle key={i} style={p} />
        ))}
      </div>

      {/* Floating Cards */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden lg:block">
        <div className="absolute left-8 top-[34%] float-l">
          <PriceCard {...cryptos[0]} />
        </div>

        <div className="absolute right-8 top-[40%] float-r">
          <PriceCard {...cryptos[1]} />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="glass hero-card absolute left-[10%] top-[14%] rounded-3xl p-4 float-soft"
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400 mb-1">
            Market Cap
          </p>
          <h3 className="text-2xl font-black text-white">$2.84T</h3>
          <p className="text-xs text-emerald-400 mt-1">▲ 5.2% today</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.35, duration: 0.7 }}
          className="glass hero-card absolute right-[9%] bottom-[19%] rounded-3xl p-4 float-soft-two"
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400 mb-3">
            24h Volume
          </p>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br from-violet-400 to-violet-700">
              ◎
            </div>

            <div>
              <h3 className="text-white text-sm font-bold">184.2 SOL</h3>
              <p className="text-xs text-slate-400">≈ $32,400</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-8 glass badge-glow"
        >
          <span className="badge-dot w-2.5 h-2.5 rounded-full bg-[#b76e79]" />
          <span className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.24em] text-[#d3a6a6]">
            Live Trading • $2.84T Market Cap
          </span>
        </motion.div>

        <motion.h1
          className="text-glow text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <motion.span
            className="block text-white"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Trade the
          </motion.span>

          <motion.span
            className="block text-metal"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            Future of Finance
          </motion.span>

          <motion.span
            className="block text-white"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            with Precision
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-base md:text-xl max-w-2xl mx-auto mt-7 mb-10 leading-relaxed text-slate-300/75"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.7 }}
        >
          Institutional-grade crypto trading powered by real-time data,
          advanced analytics, and military-level security. Your edge in the
          decentralized economy.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
        >
          <button className="btn-glow relative overflow-hidden px-9 py-4 rounded-full font-bold text-white text-base cursor-pointer">
            Start Trading Free →
          </button>

          <button className="btn-outline px-9 py-4 rounded-full font-semibold text-base cursor-pointer text-slate-300">
            View Live Markets
          </button>
        </motion.div>

        <motion.div
          className="glass stats-box mx-auto max-w-4xl rounded-[32px] px-5 py-6 flex flex-wrap justify-center items-center gap-7 sm:gap-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.88, duration: 0.6 }}
        >
          {[
            { num: "48B+", label: "Volume Traded", delay: 0.85 },
            { num: "2.1M+", label: "Active Traders", delay: 0.95 },
            { num: "180+", label: "Crypto Assets", delay: 1.05 },
            { num: "99.9%", label: "Uptime SLA", delay: 1.15 },
          ].map((s, i, arr) => (
            <div key={s.label} className="flex items-center gap-7 sm:gap-10">
              <Stat {...s} />

              {i < arr.length - 1 && (
                <div className="h-11 w-px hidden sm:block bg-white/10" />
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.25, duration: 0.7 }}
        >
          <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
            Trusted by traders in 120+ countries
          </p>

          <div className="flex items-center gap-3">
            {["🇺🇸", "🇬🇧", "🇯🇵", "🇩🇪", "🇸🇬", "🇦🇺", "🇧🇷"].map(
              (flag, i) => (
                <motion.span
                  key={i}
                  className="text-xl"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + i * 0.05, duration: 0.3 }}
                >
                  {flag}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px z-30 bg-gradient-to-r from-transparent via-[#b76e79] to-transparent" />
    </section>
  );
};

export default HeroPage;