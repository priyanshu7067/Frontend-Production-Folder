import { useState, useEffect, useRef } from "react";
import TransactionTable from "./TransactionTable";
import { buySellAiTradingBot } from "../../apis/user/users.api";
const COINS = [
    { pair: "BTC/USDT", tvSymbol: "BINANCE:BTCUSDT", price: 63420.5, change: 2.34, vol: "1.2B", icon: "₿" },
    { pair: "ETH/USDT", tvSymbol: "BINANCE:ETHUSDT", price: 2305.04, change: 0.4, vol: "480M", icon: "Ξ" },
    { pair: "SOL/USDT", tvSymbol: "BINANCE:SOLUSDT", price: 178.32, change: -1.12, vol: "210M", icon: "◎" },
    { pair: "BNB/USDT", tvSymbol: "BINANCE:BNBUSDT", price: 601.14, change: 1.87, vol: "95M", icon: "⬡" },
    { pair: "XRP/USDT", tvSymbol: "BINANCE:XRPUSDT", price: 0.5812, change: -0.64, vol: "320M", icon: "✕" },
    { pair: "DOGE/USDT", tvSymbol: "BINANCE:DOGEUSDT", price: 0.1623, change: 3.21, vol: "110M", icon: "Ð" },
    { pair: "ADA/USDT", tvSymbol: "BINANCE:ADAUSDT", price: 0.4421, change: -2.05, vol: "75M", icon: "₳" },
    { pair: "AVAX/USDT", tvSymbol: "BINANCE:AVAXUSDT", price: 37.85, change: 1.45, vol: "60M", icon: "▲" },
    { pair: "LINK/USDT", tvSymbol: "BINANCE:LINKUSDT", price: 14.23, change: 0.88, vol: "55M", icon: "⬡" },
    { pair: "DOT/USDT", tvSymbol: "BINANCE:DOTUSDT", price: 7.12, change: -1.33, vol: "40M", icon: "●" },
];

const AI_SIGNALS = [
    { type: "BUY", pair: "ETH/USDT", confidence: 87, reason: "MA7 crossed above MA25, RSI 42 oversold bounce" },
    { type: "SELL", pair: "BNB/USDT", confidence: 73, reason: "Bearish divergence on MACD, resistance at 610" },
    { type: "BUY", pair: "SOL/USDT", confidence: 91, reason: "Strong support at 175, volume spike detected" },
];


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

function TradingViewWidget({ symbol }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Clear previous widget
        container.innerHTML = "";

        const widgetDiv = document.createElement("div");
        widgetDiv.className = "tradingview-widget-container__widget";
        widgetDiv.style.height = "100%";
        widgetDiv.style.width = "100%";
        container.appendChild(widgetDiv);

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
            width: "100%",
            height: "100%",   // 🔥 KEY FIX
            symbol: symbol,
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            backgroundColor: "#0d1421",
            gridColor: "rgba(255,255,255,0.04)",
            allow_symbol_change: false,
            calendar: false,
        });

        container.appendChild(script);

        return () => {
            container.innerHTML = "";
        };
    }, [symbol]);

    return (
        <div
            ref={containerRef}
            className="tradingview-widget-container"
            style={{
                flex: 1,
                margin: "8px 12px 0",
                minHeight: 0,
                borderRadius: 8,
                overflow: "hidden",
                background: "#0d1421",
                position: "relative",
            }}
        />
    );
}

export default function TradingBot() {
    const [selectedCoin, setSelectedCoin] = useState(COINS[1]);
    const [tab, setTab] = useState("market");
    const [orderType, setOrderType] = useState("limit");
    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState("2305.04");
    const [trades, setTrades] = useState([]);
    // const [aiActive, setAiActive] = useState(false);
    const aiActive = true; // 🔥 ALWAYS ON
    const [aiSignal, setAiSignal] = useState(null);
    const [orderBook, setOrderBook] = useState({ asks: [], bids: [] });
    const [livePrice, setLivePrice] = useState(2305.04);
    const [portfolioValue, setPortfolioValue] = useState(12847.32);

    const [isProcessing, setIsProcessing] = useState(false);
    const [timer, setTimer] = useState(0);


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
            const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
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

    const handleOrder = async (side) => {
        if (isProcessing) return;

        setIsProcessing(true);
        setTimer(30);

        try {
            const payload = {
                side, // BUY / SELL
                coin: selectedCoin.pair, // ✅ BTC/USDT etc
                symbol: selectedCoin.tvSymbol, // optional
                amount: Number(amount) || 0, // invest amount
                price: Number(price) || livePrice, // current price
            };

            console.log("Sending Order:", payload);

            const res = await buySellAiTradingBot(payload);

        } catch (err) {
            console.error("Order Error:", err);
        }

        const interval = setInterval(() => {
            setTimer((t) => {
                if (t <= 1) {
                    clearInterval(interval);
                    setIsProcessing(false);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
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

            <div className="flex flex-col xl:flex-row w-full h-full bg-[#060b14] text-white overflow-hidden">
                {/* LEFT PANEL - Coin List */}
                {/* LEFT PANEL */}
                <div className="
                             w-full xl:w-[220px] 
                             border-b xl:border-b-0 xl:border-r 
                             border-white/10 
                             bg-[#0a1120]s
                             flex flex-col
                           h-[200px] sm:h-[250px] xl:h-auto
                           ">
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
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Header bar */}
                    <div className="flex flex-wrap items-center gap-3 p-3 border-b border-white/10 bg-[#0a1120]">                        <div>
                        <div style={{ fontSize: 11, marginLeft: 8, color: "#6b7280", marginBottom: 2, letterSpacing: 1 }}>SELECTED PAIR</div>
                        <div style={{ fontSize: 18, marginLeft: 8, fontWeight: 700, color: "#e2e8f0", fontFamily: "'Rajdhani',sans-serif", letterSpacing: 1 }}>
                            {selectedCoin.pair}
                        </div>
                    </div>
                        <div style={{ height: 32, width: "1px", background: "rgba(255,255,255,0.07)" }} />
                        <Ticker price={livePrice} change={selectedCoin.change} />
                        <div style={{ fontSize: 12, color: selectedCoin.change >= 0 ? "#22c55e" : "#ef4444", fontFamily: "'Rajdhani',sans-serif", fontWeight: 600 }}>
                            {selectedCoin.change >= 0 ? "▲" : "▼"} {Math.abs(selectedCoin.change)}%
                        </div>
                        <div className="flex gap-2 items-center ml-auto w-full sm:w-auto">
                            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "4px 10px", fontSize: 10, color: "#6b7280" }}>
                                <span style={{ color: "#94a3b8" }}>MA(7) </span>
                                <span style={{ color: "#f59e0b" }}>2,296</span>
                                <span style={{ color: "#94a3b8", margin: "0 8px" }}>MA(25) </span>
                                <span style={{ color: "#a855f7" }}>2,303</span>
                            </div>
                            <button
                                className="ai-btn active w-full sm:w-auto 
                                     px-2 sm:px-5 py-1 sm:py-2 
                                     text-[10px] sm:text-sm 
                                     flex items-center justify-center gap-1.5 sm:gap-2 
                                     whitespace-nowrap"
                            >
                                ⚡ <span>AI TRADING ACTIVE</span>
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

                    <div className="w-full h-[250px] sm:h-[400px] xl:h-[500px] min-h-[250px]">
                        <TradingViewWidget symbol={selectedCoin.tvSymbol} style={{
                            width: "100%",
                            height: "100%",
                            margin: "8px 12px 0",
                            borderRadius: 8,
                            overflow: "hidden",
                            background: "#0d1421",
                        }} />
                    </div>

                    {/* Bottom Stats */}
                    <div style={{ padding: "8px 12px", display: "flex", gap: 8, borderTop: "1px solid rgba(255,255,255,0.05)", flexShrink: 0, flexWrap: "wrap" }}>
                        {[
                            { label: "24H HIGH", value: "2,308.34", color: "#22c55e" },
                            { label: "24H LOW", value: "2,292.91", color: "#ef4444" },
                            { label: "VOLUME", value: "480M", color: "#60a5fa" },
                            { label: "PORTFOLIO", value: `$${portfolioValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, color: "#a855f7" },
                        ].map((s) => (
                            <div key={s.label} style={{ flex: 1, minWidth: 100, background: "rgba(255,255,255,0.03)", borderRadius: 6, padding: "6px 10px", border: "1px solid rgba(255,255,255,0.05)" }}>
                                <div style={{ fontSize: 9, color: "#4b5563", letterSpacing: 1, marginBottom: 2, fontFamily: "'Rajdhani',sans-serif" }}>{s.label}</div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: s.color, fontFamily: "'Rajdhani',sans-serif", letterSpacing: 0.5 }}>{s.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT PANEL */}
                {/* RIGHT PANEL */}
                <div className="
  w-full xl:w-[260px]
  border-t xl:border-t-0 xl:border-l
  border-white/10
  bg-[#0a1120]
  flex flex-col
h-[300px] sm:h-[400px] xl:min-h-[550px]
">

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


                    {/* Order Form */}
                    <div style={{ padding: "12px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                        <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
                            {["limit", "market", "stop"].map((t) => (
                                <button key={t} className={`tab-btn ${orderType === t ? "active" : ""}`} onClick={() => setOrderType(t)} style={{ flex: 1, textTransform: "uppercase", fontSize: 10 }}>
                                    {t}
                                </button>
                            ))}
                        </div>

                        {/* <div style={{ marginBottom: 8 }}>
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
                        </div> */}

                        {amount && price && (
                            <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 8, padding: "5px 8px", background: "rgba(255,255,255,0.03)", borderRadius: 4 }}>
                                Total: <span style={{ color: "#94a3b8" }}>${(+price * +amount).toFixed(2)} USDT</span>
                            </div>
                        )}

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                            <button
                                className="order-btn buy-btn"
                                onClick={() => handleOrder("BUY")}

                                disabled={isProcessing}
                                style={{ opacity: isProcessing ? 0.6 : 1 }}
                            >
                                {isProcessing ? `WAIT ${timer}s` : "▲ BUY"}
                            </button>



                            <button
                                className="order-btn sell-btn"
                                onClick={() => handleOrder("SELL")}
                                disabled={isProcessing}
                                style={{ opacity: isProcessing ? 0.6 : 1 }}
                            >
                                {isProcessing ? `WAIT ${timer}s` : "▼ SELL"}
                            </button>
                        </div>
                    </div>
                    {isProcessing && (
                        <h2
                            style={{
                                fontSize: 11,
                                color: "#0ea5e9",
                                marginTop: 8,
                                letterSpacing: 1,
                                textAlign: "center",
                            }}
                        >
                            🤖 AI trade placed successfully — wait {timer}s for balance update
                        </h2>
                    )}                    {/* AI Status Footer */}
                    <div style={{ padding: "8px 12px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 8, background: aiActive ? "rgba(168,85,247,0.06)" : "transparent" }}>
                        <PulsingDot color={aiActive ? "#a855f7" : "#374151"} />
                        <span style={{ fontSize: 10, color: aiActive ? "#a855f7" : "#4b5563", fontFamily: "'Rajdhani',sans-serif", letterSpacing: 1 }}>
                            {aiActive ? "AI TRADING ACTIVE" : "AI TRADING IDLE"}
                        </span>
                    </div>
                </div>
            </div>
            {/* <TransactionTable/> */}
        </>
    );
}