import { useState, useEffect, useRef, useCallback } from "react";

const COINS = [
  { pair: "BTC/USDT", price: 63420.5, change: 2.34, vol: "1.2B", icon: "₿" },
  { pair: "ETH/USDT", price: 2305.04, change: 0.4, vol: "480M", icon: "Ξ" },
  { pair: "SOL/USDT", price: 178.32, change: -1.12, vol: "210M", icon: "◎" },
  { pair: "BNB/USDT", price: 601.14, change: 1.87, vol: "95M", icon: "⬡" },
  { pair: "XRP/USDT", price: 0.5812, change: -0.64, vol: "320M", icon: "✕" },
  { pair: "DOGE/USDT", price: 0.1623, change: 3.21, vol: "110M", icon: "Ð" },
  { pair: "ADA/USDT", price: 0.4421, change: -2.05, vol: "75M", icon: "₳" },
  { pair: "AVAX/USDT", price: 37.85, change: 1.45, vol: "60M", icon: "▲" },
  { pair: "LINK/USDT", price: 14.23, change: 0.88, vol: "55M", icon: "⬡" },
  { pair: "DOT/USDT", price: 7.12, change: -1.33, vol: "40M", icon: "●" },
  { pair: "MATIC/USDT", price: 0.8934, change: 2.11, vol: "88M", icon: "◆" },
  { pair: "UNI/USDT", price: 8.45, change: -0.77, vol: "32M", icon: "🦄" },
];

const AI_SIGNALS = [
  { type: "BUY", pair: "ETH/USDT", confidence: 87, reason: "MA7 crossed above MA25, RSI 42 oversold bounce" },
  { type: "SELL", pair: "BNB/USDT", confidence: 73, reason: "Bearish divergence on MACD, resistance at 610" },
  { type: "BUY", pair: "SOL/USDT", confidence: 91, reason: "Strong support at 175, volume spike detected" },
];

function generateCandles(n = 80) {
  const candles = [];
  let price = 2200;
  for (let i = 0; i < n; i++) {
    const open = price;
    const move = (Math.random() - 0.48) * 40;
    const close = open + move;
    const high = Math.max(open, close) + Math.random() * 20;
    const low = Math.min(open, close) - Math.random() * 20;
    const volume = 100000 + Math.random() * 300000;
    candles.push({ open, close, high, low, volume });
    price = close;
  }
  return candles;
}

function CandleChart({ candles, width = 620, height = 260 }) {
  const paddingLeft = 8;
  const paddingRight = 50;
  const paddingTop = 10;
  const paddingBottom = 10;
  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  const prices = candles.flatMap((c) => [c.high, c.low]);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const range = maxP - minP || 1;

  const candleW = Math.max(2, chartW / candles.length - 1.5);
  const toY = (p) => paddingTop + chartH - ((p - minP) / range) * chartH;
  const toX = (i) => paddingLeft + i * (chartW / candles.length) + candleW / 2;

  // MA lines
  const ma = (data, period) => data.map((_, i) => {
    if (i < period - 1) return null;
    return data.slice(i - period + 1, i + 1).reduce((s, c) => s + c.close, 0) / period;
  });

  const ma7 = ma(candles, 7);
  const ma25 = ma(candles, 25);

  const linePoints = (values) =>
    values
      .map((v, i) => (v !== null ? `${toX(i)},${toY(v)}` : null))
      .filter(Boolean)
      .join(" ");

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = paddingTop + chartH * t;
        const price = maxP - t * range;
        return (
          <g key={t}>
            <line x1={paddingLeft} x2={width - paddingRight} y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <text x={width - paddingRight + 4} y={y + 4} fill="#6b7280" fontSize="9" fontFamily="monospace">
              {price.toFixed(0)}
            </text>
          </g>
        );
      })}

      {/* Candles */}
      {candles.map((c, i) => {
        const bullish = c.close >= c.open;
        const color = bullish ? "#22c55e" : "#ef4444";
        const x = toX(i);
        const openY = toY(c.open);
        const closeY = toY(c.close);
        const highY = toY(c.high);
        const lowY = toY(c.low);
        const bodyTop = Math.min(openY, closeY);
        const bodyH = Math.max(1, Math.abs(openY - closeY));
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={highY} y2={lowY} stroke={color} strokeWidth="1" opacity="0.7" />
            <rect x={x - candleW / 2} y={bodyTop} width={candleW} height={bodyH} fill={color} opacity="0.85" rx="0.5" />
          </g>
        );
      })}

      {/* MA Lines */}
      <polyline points={linePoints(ma7)} fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.9" />
      <polyline points={linePoints(ma25)} fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0.9" />

      {/* Current price line */}
      <line
        x1={paddingLeft}
        x2={width - paddingRight}
        y1={toY(candles[candles.length - 1].close)}
        y2={toY(candles[candles.length - 1].close)}
        stroke="#3b82f6"
        strokeWidth="1"
        strokeDasharray="4,3"
        opacity="0.6"
      />
    </svg>
  );
}

function VolumeChart({ candles, width = 620, height = 70 }) {
  const maxVol = Math.max(...candles.map((c) => c.volume));
  const barW = Math.max(2, (width / candles.length) - 1.5);
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
      {candles.map((c, i) => {
        const bullish = c.close >= c.open;
        const h = (c.volume / maxVol) * (height - 4);
        return (
          <rect
            key={i}
            x={i * (width / candles.length)}
            y={height - h - 2}
            width={barW}
            height={h}
            fill={bullish ? "#22c55e" : "#ef4444"}
            opacity="0.5"
            rx="0.5"
          />
        );
      })}
    </svg>
  );
}

function Ticker({ price, change }) {
  const [display, setDisplay] = useState(price);
  const [flash, setFlash] = useState(null);
  const prev = useRef(price);

  useEffect(() => {
    const id = setInterval(() => {
      const delta = (Math.random() - 0.5) * 2;
      setDisplay((p) => {
        const next = +(p + delta).toFixed(2);
        setFlash(next > prev.current ? "up" : "down");
        prev.current = next;
        setTimeout(() => setFlash(null), 400);
        return next;
      });
    }, 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      style={{
        fontSize: 26,
        fontWeight: 700,
        fontFamily: "monospace",
        color: flash === "up" ? "#22c55e" : flash === "down" ? "#ef4444" : "#f1f5f9",
        transition: "color 0.3s",
        letterSpacing: 1,
      }}
    >
      ${display.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </span>
  );
}

function PulsingDot({ color }) {
  return (
    <span style={{ position: "relative", display: "inline-block", width: 10, height: 10, marginRight: 6 }}>
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: color,
          animation: "ping 1.2s cubic-bezier(0,0,0.2,1) infinite",
          opacity: 0.75,
        }}
      />
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: color,
        }}
      />
    </span>
  );
}

export default function TradingBot() {
  const [candles] = useState(() => generateCandles(80));
  const [selectedCoin, setSelectedCoin] = useState(COINS[1]);
  const [tab, setTab] = useState("market");
  const [orderType, setOrderType] = useState("limit");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("2305.04");
  const [trades, setTrades] = useState([]);
  const [aiActive, setAiActive] = useState(false);
  const [aiSignal, setAiSignal] = useState(null);
  const [orderBook, setOrderBook] = useState({ asks: [], bids: [] });
  const [livePrice, setLivePrice] = useState(2305.04);
  const [portfolioValue, setPortfolioValue] = useState(12847.32);

  // Generate order book
  useEffect(() => {
    const gen = () => {
      const mid = livePrice;
      const asks = Array.from({ length: 8 }, (_, i) => ({
        price: +(mid + (i + 1) * 0.5 + Math.random() * 0.3).toFixed(2),
        amount: +(Math.random() * 5).toFixed(4),
      })).sort((a, b) => a.price - b.price);
      const bids = Array.from({ length: 8 }, (_, i) => ({
        price: +(mid - (i + 1) * 0.5 - Math.random() * 0.3).toFixed(2),
        amount: +(Math.random() * 5).toFixed(4),
      })).sort((a, b) => b.price - a.price);
      setOrderBook({ asks, bids });
    };
    gen();
    const id = setInterval(gen, 1500);
    return () => clearInterval(id);
  }, [livePrice]);

  // Live price
  useEffect(() => {
    const id = setInterval(() => {
      setLivePrice((p) => +(p + (Math.random() - 0.5) * 3).toFixed(2));
    }, 800);
    return () => clearInterval(id);
  }, []);

  // Live market trades feed
  useEffect(() => {
    const id = setInterval(() => {
      const side = Math.random() > 0.5 ? "BUY" : "SELL";
      const tradePrice = +(livePrice + (Math.random() - 0.5) * 2).toFixed(2);
      const tradeAmt = +(Math.random() * 0.5).toFixed(4);
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}:${now.getSeconds().toString().padStart(2,"0")}`;
      setTrades((prev) => [{ side, price: tradePrice, amount: tradeAmt, time }, ...prev.slice(0, 19)]);
    }, 600);
    return () => clearInterval(id);
  }, [livePrice]);

  // AI scanning
  useEffect(() => {
    if (!aiActive) { setAiSignal(null); return; }
    const id = setInterval(() => {
      const sig = AI_SIGNALS[Math.floor(Math.random() * AI_SIGNALS.length)];
      setAiSignal(sig);
    }, 4000);
    return () => clearInterval(id);
  }, [aiActive]);

  const handleOrder = (side) => {
    if (!amount) return;
    const total = (+price * +amount).toFixed(2);
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`;
    setTrades((prev) => [
      { side, price: +price, amount: +amount, time, own: true },
      ...prev.slice(0, 19),
    ]);
    setPortfolioValue((v) => side === "BUY" ? v - +total : v + +total);
    setAmount("");
  };

  const maxAsk = Math.max(...orderBook.asks.map((a) => a.amount), 1);
  const maxBid = Math.max(...orderBook.bids.map((b) => b.amount), 1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Rajdhani:wght@500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060b14; }
        @keyframes ping { 75%,100% { transform: scale(2); opacity: 0; } }
        @keyframes slideIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:none; } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 8px rgba(59,130,246,0.3); } 50% { box-shadow: 0 0 20px rgba(59,130,246,0.7); } }
        @keyframes scanLine { 0% { top:0; } 100% { top:100%; } }
        @keyframes fadeSlide { from { opacity:0; transform:translateX(10px); } to { opacity:1; transform:none; } }
        .coin-row:hover { background: rgba(59,130,246,0.1) !important; cursor:pointer; }
        .tab-btn { background:none; border:none; cursor:pointer; padding:6px 14px; border-radius:6px; font-size:12px; font-family:'Space Mono',monospace; transition:all .2s; }
        .tab-btn.active { background:rgba(59,130,246,0.2); color:#60a5fa; }
        .tab-btn:not(.active) { color:#6b7280; }
        .tab-btn:hover:not(.active) { color:#9ca3af; }
        .order-btn { border:none; border-radius:8px; padding:12px; font-family:'Rajdhani',sans-serif; font-weight:700; font-size:15px; cursor:pointer; letter-spacing:1px; transition:all .15s; width:100%; }
        .order-btn:active { transform:scale(0.97); }
        .buy-btn { background:linear-gradient(135deg,#16a34a,#22c55e); color:#fff; }
        .buy-btn:hover { background:linear-gradient(135deg,#15803d,#16a34a); box-shadow:0 0 20px rgba(34,197,94,0.3); }
        .sell-btn { background:linear-gradient(135deg,#dc2626,#ef4444); color:#fff; }
        .sell-btn:hover { background:linear-gradient(135deg,#b91c1c,#dc2626); box-shadow:0 0 20px rgba(239,68,68,0.3); }
        .ai-btn { background:linear-gradient(135deg,#1d4ed8,#3b82f6); color:#fff; border:none; border-radius:8px; padding:10px 20px; cursor:pointer; font-family:'Rajdhani',sans-serif; font-weight:700; font-size:13px; letter-spacing:1px; transition:all .2s; }
        .ai-btn.active { background:linear-gradient(135deg,#7c3aed,#a855f7); animation:glow 1.5s infinite; }
        .tv-container { position:relative; width:100%; border-radius:8px; overflow:hidden; background:#0d1421; }
        input[type=number] { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:6px; padding:8px 12px; color:#f1f5f9; font-family:'Space Mono',monospace; font-size:13px; width:100%; outline:none; }
        input[type=number]:focus { border-color:rgba(59,130,246,0.5); }
        input[type=number]::-webkit-inner-spin-button { display:none; }
        .scrollbar::-webkit-scrollbar { width:4px; }
        .scrollbar::-webkit-scrollbar-track { background:transparent; }
        .scrollbar::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); border-radius:4px; }
      `}</style>

      <div style={{ display: "flex", height: "100vh", minHeight: 600, background: "#060b14", fontFamily: "'Space Mono', monospace", color: "#f1f5f9", overflow: "hidden" }}>

        {/* LEFT PANEL - Coin List */}
        <div style={{ width: 220, minWidth: 180, background: "#0a1120", borderRight: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <div style={{ padding: "14px 12px 10px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <PulsingDot color="#22c55e" />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", letterSpacing: 2, fontFamily: "'Rajdhani',sans-serif" }}>LIVE MARKET</span>
            </div>
          </div>
          <div style={{ padding: "6px 12px 4px", display: "grid", gridTemplateColumns: "1fr auto", fontSize: 10, color: "#4b5563" }}>
            <span>PAIR</span><span>CHANGE</span>
          </div>
          <div className="scrollbar" style={{ overflowY: "auto", flex: 1 }}>
            {COINS.map((coin) => (
              <div
                key={coin.pair}
                className="coin-row"
                onClick={() => setSelectedCoin(coin)}
                style={{
                  padding: "8px 12px",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignItems: "center",
                  borderBottom: "1px solid rgba(255,255,255,0.03)",
                  background: selectedCoin.pair === coin.pair ? "rgba(59,130,246,0.1)" : "transparent",
                  borderLeft: selectedCoin.pair === coin.pair ? "2px solid #3b82f6" : "2px solid transparent",
                  transition: "all .15s",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 14, width: 18 }}>{coin.icon}</span>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#e2e8f0", fontFamily: "'Rajdhani',sans-serif", letterSpacing: 0.5 }}>
                        {coin.pair.split("/")[0]}
                      </div>
                      <div style={{ fontSize: 9, color: "#4b5563" }}>/{coin.pair.split("/")[1]}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2, fontFamily: "'Rajdhani',sans-serif" }}>
                    ${coin.price < 1 ? coin.price.toFixed(4) : coin.price.toLocaleString()}
                  </div>
                </div>
                <div style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: coin.change >= 0 ? "#22c55e" : "#ef4444",
                  background: coin.change >= 0 ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                  padding: "2px 5px",
                  borderRadius: 4,
                  fontFamily: "'Rajdhani',sans-serif",
                  letterSpacing: 0.5,
                }}>
                  {coin.change >= 0 ? "+" : ""}{coin.change}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER - Chart Area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

          {/* Header bar */}
          <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 20, background: "#0a1120", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2, letterSpacing: 1 }}>SELECTED PAIR</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#e2e8f0", fontFamily: "'Rajdhani',sans-serif", letterSpacing: 1 }}>
                {selectedCoin.pair}
              </div>
            </div>
            <div style={{ height: 32, width: "1px", background: "rgba(255,255,255,0.07)" }} />
            <Ticker price={livePrice} change={selectedCoin.change} />
            <div style={{ fontSize: 12, color: selectedCoin.change >= 0 ? "#22c55e" : "#ef4444", fontFamily: "'Rajdhani',sans-serif", fontWeight: 600 }}>
              {selectedCoin.change >= 0 ? "▲" : "▼"} {Math.abs(selectedCoin.change)}%
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "4px 10px", fontSize: 10, color: "#6b7280" }}>
                <span style={{ color: "#94a3b8" }}>MA(7) </span>
                <span style={{ color: "#f59e0b" }}>2,296</span>
                <span style={{ color: "#94a3b8", margin: "0 8px" }}>MA(25) </span>
                <span style={{ color: "#a855f7" }}>2,303</span>
              </div>
              <button
                className={`ai-btn ${aiActive ? "active" : ""}`}
                onClick={() => setAiActive((a) => !a)}
              >
                {aiActive ? "⚡ AI ON" : "⚡ AI OFF"}
              </button>
            </div>
          </div>

          {/* AI Signal Banner */}
          {aiSignal && (
            <div style={{
              margin: "8px 12px 0",
              padding: "8px 14px",
              background: aiSignal.type === "BUY" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
              border: `1px solid ${aiSignal.type === "BUY" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 12,
              animation: "slideIn 0.3s ease",
              flexShrink: 0,
            }}>
              <PulsingDot color={aiSignal.type === "BUY" ? "#22c55e" : "#ef4444"} />
              <span style={{ fontSize: 11, fontWeight: 700, color: aiSignal.type === "BUY" ? "#22c55e" : "#ef4444", fontFamily: "'Rajdhani',sans-serif", letterSpacing: 1 }}>
                AI {aiSignal.type} SIGNAL
              </span>
              <span style={{ fontSize: 10, color: "#94a3b8" }}>{aiSignal.pair}</span>
              <span style={{ fontSize: 10, color: "#64748b" }}>•</span>
              <span style={{ fontSize: 10, color: "#94a3b8", flex: 1 }}>{aiSignal.reason}</span>
              <span style={{
                fontSize: 11, fontWeight: 700, color: "#f1f5f9",
                background: "rgba(255,255,255,0.1)", padding: "2px 8px", borderRadius: 4,
                fontFamily: "'Rajdhani',sans-serif",
              }}>
                {aiSignal.confidence}% conf.
              </span>
            </div>
          )}

          {/* TradingView Chart */}
          <div className="tv-container" style={{ flex: 1, margin: "8px 12px 0", minHeight: 0 }}>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
              <div style={{
                position: "absolute",
                left: 0, right: 0,
                height: "2px",
                background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)",
                animation: "scanLine 3s linear infinite",
                opacity: 0.5,
              }} />
            </div>
            <iframe
              src={`https://s3.tradingview.com/widgetembed/?symbol=BINANCE:${selectedCoin.pair.replace("/","")}&interval=D&theme=dark&style=1&locale=en&toolbar_bg=%230d1421&enable_publishing=false&hide_side_toolbar=0&allow_symbol_change=0&studies=MASimple%4014%2CMASimple%4050&withdateranges=1&hide_volume=0`}
              style={{ width: "100%", height: "100%", border: "none", display: "block" }}
              title="TradingView Chart"
            />
          </div>

          {/* Bottom Stats */}
          <div style={{ padding: "8px 12px", display: "flex", gap: 8, borderTop: "1px solid rgba(255,255,255,0.05)", flexShrink: 0, flexWrap: "wrap" }}>
            {[
              { label: "24H HIGH", value: "2,308.34", color: "#22c55e" },
              { label: "24H LOW", value: "2,292.91", color: "#ef4444" },
              { label: "VOLUME", value: "480M", color: "#60a5fa" },
              { label: "PORTFOLIO", value: `$${portfolioValue.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`, color: "#a855f7" },
            ].map((s) => (
              <div key={s.label} style={{ flex: 1, minWidth: 100, background: "rgba(255,255,255,0.03)", borderRadius: 6, padding: "6px 10px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: 9, color: "#4b5563", letterSpacing: 1, marginBottom: 2, fontFamily: "'Rajdhani',sans-serif" }}>{s.label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: s.color, fontFamily: "'Rajdhani',sans-serif", letterSpacing: 0.5 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ width: 260, minWidth: 240, background: "#0a1120", borderLeft: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", flexShrink: 0 }}>

          {/* Order Form */}
          <div style={{ padding: "12px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
              {["limit", "market", "stop"].map((t) => (
                <button key={t} className={`tab-btn ${orderType === t ? "active" : ""}`} onClick={() => setOrderType(t)} style={{ flex: 1, textTransform: "uppercase", fontSize: 10 }}>
                  {t}
                </button>
              ))}
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ fontSize: 10, color: "#4b5563", display: "block", marginBottom: 4, letterSpacing: 1 }}>PRICE (USDT)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 10, color: "#4b5563", display: "block", marginBottom: 4, letterSpacing: 1 }}>AMOUNT (ETH)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0000"
              />
            </div>

            {amount && price && (
              <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 8, padding: "5px 8px", background: "rgba(255,255,255,0.03)", borderRadius: 4 }}>
                Total: <span style={{ color: "#94a3b8" }}>${(+price * +amount).toFixed(2)} USDT</span>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              <button className="order-btn buy-btn" onClick={() => handleOrder("BUY")}>▲ BUY</button>
              <button className="order-btn sell-btn" onClick={() => handleOrder("SELL")}>▼ SELL</button>
            </div>
          </div>

          {/* Order Book */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: "8px 12px 4px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", gap: 2 }}>
                <button className={`tab-btn ${tab === "market" ? "active" : ""}`} onClick={() => setTab("market")}>Order Book</button>
                <button className={`tab-btn ${tab === "trades" ? "active" : ""}`} onClick={() => setTab("trades")}>Trades</button>
              </div>
            </div>

            {tab === "market" ? (
              <div className="scrollbar" style={{ flex: 1, overflowY: "auto", padding: "4px 0" }}>
                <div style={{ padding: "2px 12px 4px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontSize: 9, color: "#4b5563", letterSpacing: 0.5 }}>
                  <span>PRICE</span><span style={{ textAlign: "center" }}>AMOUNT</span><span style={{ textAlign: "right" }}>TOTAL</span>
                </div>
                {/* Asks (sell orders) */}
                {[...orderBook.asks].reverse().map((a, i) => (
                  <div key={i} style={{ position: "relative", padding: "2px 12px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, background: "rgba(239,68,68,0.08)", width: `${(a.amount / maxAsk) * 100}%` }} />
                    <span style={{ fontSize: 10, color: "#ef4444", fontFamily: "monospace", position: "relative" }}>{a.price.toFixed(2)}</span>
                    <span style={{ fontSize: 10, color: "#94a3b8", textAlign: "center", position: "relative" }}>{a.amount.toFixed(3)}</span>
                    <span style={{ fontSize: 10, color: "#64748b", textAlign: "right", position: "relative" }}>{(a.price * a.amount).toFixed(1)}</span>
                  </div>
                ))}

                {/* Spread */}
                <div style={{ padding: "4px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", margin: "2px 0" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9", fontFamily: "'Rajdhani',sans-serif" }}>
                    {livePrice.toFixed(2)}
                  </span>
                  <span style={{ fontSize: 9, color: "#4b5563" }}>SPREAD</span>
                </div>

                {/* Bids (buy orders) */}
                {orderBook.bids.map((b, i) => (
                  <div key={i} style={{ position: "relative", padding: "2px 12px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, background: "rgba(34,197,94,0.08)", width: `${(b.amount / maxBid) * 100}%` }} />
                    <span style={{ fontSize: 10, color: "#22c55e", fontFamily: "monospace", position: "relative" }}>{b.price.toFixed(2)}</span>
                    <span style={{ fontSize: 10, color: "#94a3b8", textAlign: "center", position: "relative" }}>{b.amount.toFixed(3)}</span>
                    <span style={{ fontSize: 10, color: "#64748b", textAlign: "right", position: "relative" }}>{(b.price * b.amount).toFixed(1)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="scrollbar" style={{ flex: 1, overflowY: "auto" }}>
                <div style={{ padding: "2px 12px 4px", display: "grid", gridTemplateColumns: "1fr 1fr auto", fontSize: 9, color: "#4b5563", letterSpacing: 0.5 }}>
                  <span>PRICE</span><span style={{ textAlign: "center" }}>AMOUNT</span><span>TIME</span>
                </div>
                {trades.map((t, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "3px 12px",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr auto",
                      animation: i === 0 ? "fadeSlide 0.3s ease" : "none",
                      background: t.own ? "rgba(59,130,246,0.08)" : "transparent",
                    }}
                  >
                    <span style={{ fontSize: 10, color: t.side === "BUY" ? "#22c55e" : "#ef4444", fontFamily: "monospace" }}>{t.price.toFixed(2)}</span>
                    <span style={{ fontSize: 10, color: "#94a3b8", textAlign: "center" }}>{t.amount.toFixed(4)}</span>
                    <span style={{ fontSize: 9, color: "#4b5563" }}>{t.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Status Footer */}
          <div style={{ padding: "8px 12px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 8, background: aiActive ? "rgba(168,85,247,0.06)" : "transparent" }}>
            <PulsingDot color={aiActive ? "#a855f7" : "#374151"} />
            <span style={{ fontSize: 10, color: aiActive ? "#a855f7" : "#4b5563", fontFamily: "'Rajdhani',sans-serif", letterSpacing: 1 }}>
              {aiActive ? "AI TRADING ACTIVE" : "AI TRADING IDLE"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}