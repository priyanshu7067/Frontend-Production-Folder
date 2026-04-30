import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

// ─── Floating Price Card ────────────────────────────────────────────────────
const PriceCard = ({ icon, iconBg, symbol, name, price, change, isUp, bars, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.92 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="glass rounded-2xl p-3 min-w-[180px] pointer-events-auto"
    style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      backdropFilter: "blur(16px)",
    }}
    whileHover={{ scale: 1.04, y: -4 }}
  >
    <div className="flex items-center gap-2 mb-2">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-white text-sm font-semibold leading-none">{symbol}</div>
        <div className="text-xs mt-0.5" style={{ color: "rgba(148,163,184,0.6)" }}>{name}</div>
      </div>
      <div className="text-right">
        <div className="text-white text-sm font-bold">{price}</div>
        <div className={`text-xs font-medium ${isUp ? "text-emerald-400" : "text-rose-400"}`}>
          {isUp ? "▲" : "▼"} {change}
        </div>
      </div>
    </div>
    {/* Mini sparkline */}
    <div className="flex items-end gap-0.5 h-7 mt-1">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm"
          style={{
            height: `${h}%`,
            background: isUp
              ? `rgba(74,222,128,${0.3 + i * 0.07})`
              : `rgba(248,113,113,${0.3 + i * 0.07})`,
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: delay + i * 0.05, duration: 0.4, ease: "easeOut" }}
        //   style={{ originY: 1, height: `${h}%`, background: isUp ? `rgba(74,222,128,${0.3 + i*0.07})` : `rgba(248,113,113,${0.3+i*0.07})` }}
        />
      ))}
    </div>
  </motion.div>
);

// ─── Stat ───────────────────────────────────────────────────────────────────
const Stat = ({ num, label, delay }) => {
  const [displayed, setDisplayed] = useState("0");
  useEffect(() => {
    const timer = setTimeout(() => {
      const target = parseFloat(num);
      const suffix = num.replace(/[\d.]/g, "");
      let start = 0;
      const dur = 1600;
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const val = start + (target - start) * ease;
        setDisplayed(
          (Number.isInteger(target) ? Math.round(val) : val.toFixed(1)) + suffix
        );
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay * 1000 + 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
    >
      <div
        className="font-extrabold text-3xl"
        style={{
        //   fontFamily: "'Syne', sans-serif",
          background: "linear-gradient(120deg,#b76e79,#7f9ca8,#d3a6a6,#4f6d7a)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "shine 4s linear infinite",
        }}
      >
        {displayed}
      </div>
      <div
        className="text-xs uppercase tracking-widest mt-1"
        style={{ color: "rgba(148,163,184,0.55)" }}
      >
        {label}
      </div>
    </motion.div>
  );
};

// ─── Particle ───────────────────────────────────────────────────────────────
const Particle = ({ style }) => (
  <motion.div
    className="absolute rounded-full"
    style={style}
    initial={{ y: "100vh", opacity: 0 }}
    animate={{ y: -20, opacity: [0, 0.7, 0.4, 0] }}
    transition={{
      duration: style.duration,
      delay: style.delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

// ─── Main Hero ──────────────────────────────────────────────────────────────
const HeroPage = () => {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    width: `${1 + Math.random() * 2}px`,
    height: `${1 + Math.random() * 2}px`,
    background: i % 2 === 0 ? "#b76e79" : "#7f9ca8",
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 15,
  }));

  const cryptos = [
    {
      icon: "₿", iconBg: "linear-gradient(135deg,#f59e0b,#d97706)",
      symbol: "BTC/USDT", name: "Bitcoin",
      price: "$67,420", change: "2.41%", isUp: true,
      bars: [28, 48, 34, 72, 60, 88, 68, 96],
      delay: 0.9,
    },
    {
      icon: "Ξ", iconBg: "linear-gradient(135deg,#7f9ca8,#4f6d7a)",
      symbol: "ETH/USDT", name: "Ethereum",
      price: "$3,512", change: "0.87%", isUp: false,
      bars: [70, 48, 62, 34, 78, 55, 28, 42],
      delay: 1.05,
    },
  ];

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @keyframes shine { to { background-position: 200% center; } }
        @keyframes orb1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(40px,-50px) scale(1.08); }
          66% { transform: translate(-30px,40px) scale(0.94); }
        }
        @keyframes orb2 {
          0%,100% { transform: translate(0,0) scale(1); }
          40% { transform: translate(-50px,30px) scale(1.06); }
          70% { transform: translate(30px,-40px) scale(0.96); }
        }
        @keyframes orb3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(20px,-30px) scale(1.04); }
        }
        @keyframes pulse-dot {
          0%,100% { box-shadow: 0 0 0 0 rgba(183,110,121,0.7); }
          50% { box-shadow: 0 0 0 7px rgba(183,110,121,0); }
        }
        @keyframes float-card-l {
          0%,100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-14px) rotate(-1deg); }
        }
        @keyframes float-card-r {
          0%,100% { transform: translateY(0px) rotate(1deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        .orb { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.35; }
        .orb-1 { width: 560px; height: 560px; background: radial-gradient(circle,#b76e79,transparent 70%); top: -140px; left: -160px; animation: orb1 14s ease-in-out infinite; }
        .orb-2 { width: 460px; height: 460px; background: radial-gradient(circle,#7f9ca8,transparent 70%); bottom: -100px; right: -120px; animation: orb2 18s ease-in-out infinite; }
        .orb-3 { width: 320px; height: 320px; background: radial-gradient(circle,#4f6d7a,transparent 70%); top: 45%; left: 55%; animation: orb3 22s ease-in-out infinite; }
        .grid-bg {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(127,156,168,0.07) 1px,transparent 1px),
            linear-gradient(90deg,rgba(127,156,168,0.07) 1px,transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%,black 40%,transparent 100%);
        }
        .text-metal {
          background: linear-gradient(120deg,#b76e79,#7f9ca8,#d3a6a6,#4f6d7a,#b76e79);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shine 4s linear infinite;
        }
        .text-glow {
          filter: drop-shadow(0 0 40px rgba(183,110,121,0.3));
        }
        .badge-dot { animation: pulse-dot 2s ease-in-out infinite; }
        .float-l { animation: float-card-l 6s ease-in-out infinite; }
        .float-r { animation: float-card-r 7s ease-in-out 1s infinite; }
        .btn-glow {
          box-shadow: 0 0 28px rgba(183,110,121,0.45), 0 0 60px rgba(183,110,121,0.18);
          transition: box-shadow 0.3s ease, transform 0.2s ease;
        }
        .btn-glow:hover {
          box-shadow: 0 0 48px rgba(183,110,121,0.7), 0 0 90px rgba(183,110,121,0.3);
          transform: translateY(-2px) scale(1.02);
        }
        .btn-outline {
          border: 1px solid rgba(127,156,168,0.35);
          backdrop-filter: blur(10px);
          transition: all 0.25s ease;
        }
        .btn-outline:hover {
          border-color: rgba(127,156,168,0.75);
          background: rgba(127,156,168,0.1);
          transform: translateY(-2px);
          color: #fff;
        }
        .glass-stat {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(12px);
        }
      `}</style>

      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "#020617", fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {/* Grid */}
        <div className="grid-bg" />

        {/* Particles */}
        {particles.map((p, i) => (
          <Particle key={i} style={p} />
        ))}

        {/* Floating Price Cards */}
        <div className="absolute inset-0 pointer-events-none z-10 hidden lg:block">
          {/* Left card */}
          <div className="absolute left-6 top-1/3 float-l">
            <PriceCard {...cryptos[0]} />
          </div>
          {/* Right card */}
          <div className="absolute right-6 top-[38%] float-r">
            <PriceCard {...cryptos[1]} />
          </div>

          {/* Top-left mini card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="absolute left-[10%] top-[14%] rounded-2xl p-3"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
              animation: "float-card-l 8s ease-in-out 0.5s infinite",
            }}
          >
            <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(148,163,184,0.5)" }}>
              Market Cap
            </div>
            <div className="text-xl font-bold text-white" style={{ fontFamily: "'Syne',sans-serif" }}>
              $2.84T
            </div>
            <div className="text-xs text-emerald-400 mt-0.5">▲ 5.2% today</div>
          </motion.div>

          {/* Bottom-right mini card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.35, duration: 0.7 }}
            className="absolute right-[9%] bottom-[20%] rounded-2xl p-3"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
              animation: "float-card-r 5.5s ease-in-out 2s infinite",
            }}
          >
            <div className="text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(148,163,184,0.5)" }}>
              24h Volume
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg,#a78bfa,#7c3aed)" }}
              >
                ◎
              </div>
              <div>
                <div className="text-white text-sm font-bold">184.2 SOL</div>
                <div className="text-xs" style={{ color: "rgba(148,163,184,0.6)" }}>≈ $32,400</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Main Content ── */}
        <div className="relative z-20 text-center max-w-4xl mx-auto px-6 py-24">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
            style={{
              background: "rgba(183,110,121,0.12)",
              border: "1px solid rgba(183,110,121,0.3)",
            }}
          >
            <span
              className="badge-dot w-2 h-2 rounded-full"
              style={{ background: "#b76e79" }}
            />
            <span
              className="text-xs font-medium uppercase tracking-widest"
              style={{ color: "#d3a6a6" }}
            >
              Live Trading • $2.84T Market Cap
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            className="text-glow mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <motion.h1
              style={{ fontFamily: "'Syne', sans-serif", lineHeight: 1.06 }}
              className="text-3xl md:text-3xl lg:text-5xl font-extrabold"
            >
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                Trade the
              </motion.span>
              <motion.span
                className="block text-red-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                Future of Finance
              </motion.span>
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                with Precision
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Sub */}
          <motion.p
            className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: "rgba(203,213,225,0.62)", fontWeight: 300 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            Institutional-grade crypto trading powered by real-time data, advanced analytics,
            and military-level security. Your edge in the decentralized economy.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.6 }}
          >
            <button
              className="btn-glow px-8 py-4 rounded-full font-semibold text-white text-base cursor-pointer"
              style={{
                background: "linear-gradient(135deg,#b76e79,#7f9ca8)",
                border: "none",
                // fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Start Trading Free →
            </button>
            <button
              className="btn-outline px-8 py-4 rounded-full font-medium text-base cursor-pointer"
              style={{
                color: "rgba(203,213,225,0.8)",
                // fontFamily: "'DM Sans', sans-serif",
                background: "transparent",
              }}
            >
              View Live Markets
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-6 sm:gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
          >
            {[
              { num: "48B+", label: "Volume Traded", delay: 0.85 },
              { num: "2.1M+", label: "Active Traders", delay: 0.95 },
              { num: "180+", label: "Crypto Assets", delay: 1.05 },
              { num: "99.9%", label: "Uptime SLA", delay: 1.15 },
            ].map((s, i, arr) => (
              <div key={s.label} className="flex items-center gap-6 sm:gap-10">
                <Stat {...s} />
                {i < arr.length - 1 && (
                  <div
                    className="h-10 w-px hidden sm:block"
                    style={{ background: "rgba(127,156,168,0.2)" }}
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Trusted by row */}
          <motion.div
            className="mt-14 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25, duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(148,163,184,0.4)" }}>
              Trusted by traders in 120+ countries
            </p>
            <div className="flex items-center gap-3">
              {["🇺🇸","🇬🇧","🇯🇵","🇩🇪","🇸🇬","🇦🇺","🇧🇷"].map((flag, i) => (
                <motion.span
                  key={i}
                  className="text-lg"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + i * 0.05, duration: 0.3 }}
                >
                  {flag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg,transparent,rgba(183,110,121,0.5),rgba(127,156,168,0.5),transparent)",
          }}
        />
      </section>
    </>
  );
};

export default HeroPage;