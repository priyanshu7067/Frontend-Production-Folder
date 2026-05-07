import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { getTradIngHistoryDetailsById } from "../../../apis/user/users.api";

const coinIcons = {
    BTC: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    ETH: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
    BNB: "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
    SOL: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
    XRP: "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
    ADA: "https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090",
    DOGE: "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409",
    DOT: "https://coin-images.coingecko.com/coins/images/12171/large/polkadot.jpg?1766533446",
    TRX: "https://coin-images.coingecko.com/coins/images/1094/large/photo_2026-04-13_09-59-16.png?1776048311",
    XMR: "https://coin-images.coingecko.com/coins/images/69/large/monero_logo.png?1696501460",
};

const coinColors = {
    BTC: "#F7931A",
    ETH: "#627EEA",
    BNB: "#F3BA2F",
    SOL: "#9945FF",
    XRP: "#00AAE4",
    ADA: "#0033AD",
    DOGE: "#C2A633",
    DOT: "#E6007A",
    TRX: "#FF0013",
    XMR: "#FF6600",
};

// Mini sparkline bars for visual interest
const MiniChart = ({ positive, seed }) => {
    const bars = Array.from({ length: 12 }, (_, i) => {
        const h = 20 + ((seed * (i + 3) * 17) % 60);
        return h;
    });
    const color = positive ? "#00e676" : "#ff1744";
    return (
        <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "32px", opacity: 0.7 }}>
            {bars.map((h, i) => (
                <div
                    key={i}
                    style={{
                        width: "3px",
                        height: `${h}%`,
                        background: color,
                        borderRadius: "1px",
                        opacity: 0.5 + (i / bars.length) * 0.5,
                    }}
                />
            ))}
        </div>
    );
};

// Animated number counter
const AnimatedNumber = ({ value, prefix = "", suffix = "", decimals = 2, color }) => {
    const [display, setDisplay] = useState(0);
    const rafRef = useRef(null);

    useEffect(() => {
        const start = 0;
        const end = parseFloat(value) || 0;
        const duration = 900;
        const startTime = performance.now();

        const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(start + (end - start) * eased);
            if (progress < 1) rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [value]);

    return (
        <span style={{ color: color || "inherit" }}>
            {prefix}{display.toFixed(decimals)}{suffix}
        </span>
    );
};

// ROI ring progress
const ROIRing = ({ roi }) => {
    const pct = Math.min(Math.abs(roi), 100);
    const r = 30, cx = 38, cy = 38;
    const circumference = 2 * Math.PI * r;
    const offset = circumference - (pct / 100) * circumference;
    const isPos = roi >= 0;

    return (
        <svg width="76" height="76" viewBox="0 0 76 76">
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
            <circle
                cx={cx} cy={cy} r={r}
                fill="none"
                stroke={isPos ? "#00e676" : "#ff1744"}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transform: "rotate(-90deg)", transformOrigin: "38px 38px", transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
            />
            <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle" fill={isPos ? "#00e676" : "#ff1744"} fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="700">
                {isPos ? "+" : ""}{roi.toFixed(2)}%
            </text>
            <text x={cx} y={cy + 13} textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">
                ROI
            </text>
        </svg>
    );
};

const styles = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap');

.trd-root {
    background: #0d1117;
    min-height: 100vh;
    color: #e6edf3;
    font-family: 'Syne', sans-serif;
    position: relative;
    overflow: hidden;
}

.trd-grid-bg {
    position: fixed;
    inset: 0;
    background-image:
        linear-gradient(rgba(0, 230, 118, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 230, 118, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
}

.trd-glow {
    position: fixed;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    height: 300px;
    background: radial-gradient(ellipse, rgba(0, 230, 118, 0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
}

.trd-content {
    position: relative;
    z-index: 1;
    max-width: 1280px;
    margin: 0 auto;
    padding: 10px 4px 80px;
}

/* HEADER */
.trd-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
}

.trd-back-btn {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
}
.trd-back-btn:hover { background: rgba(255,255,255,0.12); }
.trd-back-btn svg { width: 16px; height: 16px; stroke: #aaa; }

.trd-header-title {
    flex: 1;
}
.trd-header-title h1 {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.5px;
    margin: 0;
    color: #e6edf3;
}
.trd-header-title p {
    font-size: 11px;
    color: rgba(255,255,255,0.35);
    margin: 2px 0 0;
    font-family: 'JetBrains Mono', monospace;
}

.trd-live-badge {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    background: rgba(0, 230, 118, 0.08);
    border: 1px solid rgba(0, 230, 118, 0.2);
    border-radius: 20px;
    font-size: 10px;
    font-family: 'JetBrains Mono', monospace;
    color: #00e676;
    font-weight: 600;
    letter-spacing: 0.5px;
}
.trd-live-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #00e676;
    animation: pulse 1.5s infinite;
}
@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
}

/* SUMMARY CARD */
.trd-summary-card {
    background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 16px;
    margin-bottom: 14px;
    position: relative;
    overflow: hidden;
}
.trd-summary-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00e676, transparent);
    opacity: 0.6;
}
.trd-summary-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
}
.trd-summary-left {}
.trd-summary-label {
    font-size: 10px;
    color: rgba(255,255,255,0.3);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 4px;
    font-family: 'JetBrains Mono', monospace;
}
.trd-summary-value {
    font-size: 26px;
    font-weight: 800;
    font-family: 'JetBrains Mono', monospace;
    color: #e6edf3;
    letter-spacing: -0.5px;
}
.trd-profit-chip {
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.3px;
}
.trd-profit-chip.pos {
    background: rgba(0, 230, 118, 0.1);
    border: 1px solid rgba(0, 230, 118, 0.3);
    color: #00e676;
}
.trd-profit-chip.neg {
    background: rgba(255, 23, 68, 0.1);
    border: 1px solid rgba(255, 23, 68, 0.3);
    color: #ff1744;
}

.trd-stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}
.trd-stat-box {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
    padding: 10px;
    text-align: center;
}
.trd-stat-box .lbl {
    font-size: 9px;
    color: rgba(255,255,255,0.3);
    text-transform: uppercase;
    letter-spacing: 0.8px;
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 4px;
}
.trd-stat-box .val {
    font-size: 13px;
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
}

/* ROI SECTION */
.trd-roi-row {
    display: flex;
    align-items: center;
    gap: 14px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    padding: 12px 14px;
    margin-bottom: 14px;
}
.trd-roi-info { flex: 1; }
.trd-roi-info h3 {
    font-size: 12px;
    color: rgba(255,255,255,0.35);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0 0 6px;
    font-family: 'JetBrains Mono', monospace;
}
.trd-roi-breakdown {
    display: flex;
    flex-direction: column;
    gap: 3px;
}
.trd-roi-row-item {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-family: 'JetBrains Mono', monospace;
}
.trd-roi-row-item .k { color: rgba(255,255,255,0.4); }
.trd-roi-row-item .v { color: #e6edf3; font-weight: 600; }
.trd-roi-row-item .v.green { color: #00e676; }
.trd-roi-row-item .v.red { color: #ff1744; }

/* SECTION TITLE */
.trd-section-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 16px 0 10px;
}
.trd-section-title h2 {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: rgba(255,255,255,0.4);
    margin: 0;
    font-family: 'JetBrains Mono', monospace;
}
.trd-section-title span {
    font-size: 10px;
    color: rgba(255,255,255,0.2);
    font-family: 'JetBrains Mono', monospace;
}

/* COIN ROWS */
.trd-coin-list {
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    overflow: hidden;
    background: rgba(255,255,255,0.02);
}

.trd-coin-row {
    display: flex;
    align-items: center;
    padding: 12px 14px;
    gap: 12px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: background 0.15s;
    cursor: default;
    animation: slideIn 0.4s ease forwards;
    opacity: 0;
    transform: translateX(-10px);
}
.trd-coin-row:last-child { border-bottom: none; }
.trd-coin-row:hover { background: rgba(255,255,255,0.03); }

@keyframes slideIn {
    to { opacity: 1; transform: translateX(0); }
}

.trd-coin-icon-wrap {
    position: relative;
    flex-shrink: 0;
}
.trd-coin-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
}
.trd-coin-ring {
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    border: 2px solid transparent;
}

.trd-coin-meta { flex: 1; min-width: 0; }
.trd-coin-name {
    font-size: 13px;
    font-weight: 700;
    color: #e6edf3;
    letter-spacing: 0.3px;
    margin-bottom: 2px;
}
.trd-coin-sub {
    font-size: 10px;
    color: rgba(255,255,255,0.3);
    font-family: 'JetBrains Mono', monospace;
}

.trd-coin-chart { flex-shrink: 0; }

.trd-coin-amount {
    text-align: right;
    flex-shrink: 0;
    min-width: 90px;
}
.trd-coin-amount .amount {
    font-size: 13px;
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
    display: block;
}
.trd-coin-amount .direction-badge {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 9px;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
    letter-spacing: 0.5px;
    padding: 2px 6px;
    border-radius: 4px;
    margin-top: 3px;
}
.trd-coin-amount .direction-badge.pos {
    background: rgba(0, 230, 118, 0.1);
    color: #00e676;
}
.trd-coin-amount .direction-badge.neg {
    background: rgba(255, 23, 68, 0.1);
    color: #ff1744;
}

/* DIVIDER */
.trd-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 14px 0;
}
.trd-divider::before, .trd-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.06);
}
.trd-divider span {
    font-size: 10px;
    font-family: 'JetBrains Mono', monospace;
    color: rgba(255,255,255,0.2);
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* FOOTER */
.trd-footer {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.trd-footer-meta {
    text-align: center;
    font-size: 10px;
    color: rgba(255,255,255,0.2);
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.5px;
}
.trd-back-full-btn {
    width: 100%;
    padding: 13px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.7);
    font-size: 13px;
    font-weight: 600;
    font-family: 'Syne', sans-serif;
    letter-spacing: 0.5px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}
.trd-back-full-btn:hover {
    background: rgba(255,255,255,0.09);
    color: #e6edf3;
}
.trd-back-full-btn svg { width: 15px; height: 15px; }

/* ID tag */
.trd-id-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 10px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    font-size: 10px;
    font-family: 'JetBrains Mono', monospace;
    color: rgba(255,255,255,0.3);
    letter-spacing: 0.5px;
}
`;

const AITradeBotHistoryDetail = () => {
    const { showLoader, hideLoader } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const id = location.state?.id;
    const [data, setData] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (!id) {
            toast.error("Invalid access");
            navigate(-1);
            return;
        }

        const fetchDetail = async () => {
            showLoader();
            try {
                const res = await getTradIngHistoryDetailsById(id);
                if (res?.success) {
                    setData(res?.data);
                } else {
                    toast.error(res?.message || "Failed");
                }
            } catch {
                toast.error("Something went wrong");
            } finally {
                hideLoader();
            }
        };

        fetchDetail();
    }, [id]);

    if (!data) return (
        <div style={{ background: "#0d1117", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
                <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    border: "3px solid rgba(0,230,118,0.2)",
                    borderTopColor: "#00e676",
                    animation: "spin 0.8s linear infinite",
                    margin: "0 auto 12px"
                }} />
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, fontFamily: "monospace" }}>Loading trade data...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        </div>
    );

    const investAmount = data?.investAmount || 0;
    const profit = data?.roiAmount || income || 0;
    const returnAmount = data?.roiAmount || 0;
    const roi = investAmount > 0 ? (profit / investAmount) * 100 : 0;
    const isProfit = profit >= 0;
    const coins = data?.coins || [];
    const tradeDate = data?.createdAt || data?.tradeDate;
    const totolNetPL = investAmount + returnAmount || 0;

    return (
        <>
            <style>{styles}</style>
            <div className="trd-root">
                <div className="trd-grid-bg" />
                <div className="trd-glow" />

                <div className="trd-content">

                    {/* HEADER */}
                    <div className="trd-header">
                        <button className="trd-back-btn" onClick={() => navigate(-1)}>
                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div className="trd-header-title">
                            <h1>Trade History</h1>
                            <p>
                                {tradeDate ? new Date(tradeDate).toLocaleDateString("en-US", {
                                    day: "2-digit", month: "short", year: "numeric",
                                    hour: "2-digit", minute: "2-digit"
                                }) : "—"}
                            </p>
                        </div>
                        <div className="trd-live-badge">
                            <div className="trd-live-dot" />
                            SETTLED
                        </div>
                    </div>

                    {/* MAIN SUMMARY CARD */}
                    <div className="trd-summary-card">
                        <div className="trd-summary-top">
                            <div className="trd-summary-left">
                                <div className="trd-summary-label">Total Return</div>
                                <div className="trd-summary-value">
                                    $<AnimatedNumber value={returnAmount} decimals={2} />
                                </div>
                            </div>
                            <div className={`trd-profit-chip ${isProfit ? "pos" : "neg"}`}>
                                {isProfit ? "▲" : "▼"} $<AnimatedNumber value={Math.abs(profit)} decimals={2} />
                            </div>
                        </div>

                        <div className="trd-stats-grid">
                            <div className="trd-stat-box">
                                <div className="lbl">Invested</div>
                                <div className="val" style={{ color: "#f7f9f9" }}>
                                    $<AnimatedNumber value={investAmount} decimals={2} />
                                </div>
                            </div>
                            <div className="trd-stat-box">
                                <div className="lbl">Income</div>
                                <div
                                    className="val"
                                    style={{ color: returnAmount >= 0 ? "#00e676" : "#ff1744" }}
                                >
                                    {returnAmount >= 0 ? "+" : "-"}$
                                    <AnimatedNumber value={Math.abs(returnAmount)} decimals={2} />
                                </div>

                            </div>
                            <div className="trd-stat-box">
                                <div className="lbl">Pairs</div>
                                <div className="val" style={{ color: "#e6edf3" }}>
                                    {coins?.length}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ROI ROW */}
                    <div className="trd-roi-row">
                        <ROIRing roi={returnAmount} />
                        <div className="trd-roi-info">
                            <h3>Performance</h3>
                            <div className="trd-roi-breakdown">
                                <div className="trd-roi-row-item">
                                    <span className="k">Capital In</span>
                                    <span className="v">${investAmount.toFixed(2)}</span>
                                </div>
                                <div className="trd-roi-row-item">
                                    <span className="k">Capital Out</span>
                                    <span className={`v ${isProfit ? "green" : "red"}`}>
                                        {isProfit ? "+" : ""}${totolNetPL.toFixed(2)}
                                    </span>
                                </div>
                                <div className="trd-roi-row-item">
                                    <span className="k">Net P&L</span>
                                    <span className={`v ${isProfit ? "green" : "red"}`}>${returnAmount.toFixed(2)}</span>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COIN BREAKDOWN */}
                    <div className="trd-section-title">
                        <h2>Asset Breakdown</h2>
                        <span>{coins.length} positions</span>
                    </div>

                    <div className="trd-coin-list">
                        {coins.map((coin, i) => {
                            const isPos = coin.direction === "positive";
                            const accentColor = coinColors[coin.coin] || "#aaa";
                            return (
                                <div
                                    className="trd-coin-row"
                                    key={i}
                                    style={{ animationDelay: `${i * 60}ms` }}
                                >
                                    {/* ICON */}
                                    <div className="trd-coin-icon-wrap">
                                        <img
                                            className="trd-coin-icon"
                                            src={coinIcons[coin.coin]}
                                            alt={coin.coin}
                                            onError={e => { e.target.style.display = "none"; }}
                                        />
                                        <div
                                            className="trd-coin-ring"
                                            style={{ borderColor: accentColor + "55" }}
                                        />
                                    </div>

                                    {/* META */}
                                    <div className="trd-coin-meta">
                                        <div className="trd-coin-name">{coin.coin}</div>
                                        <div className="trd-coin-sub">
                                            {isPos ? "Long" : "Short"} · Auto AI
                                        </div>
                                    </div>

                                    {/* MINI CHART */}
                                    <div className="trd-coin-chart">
                                        <MiniChart positive={isPos} seed={coin.coin.charCodeAt(0) + i * 7} />
                                    </div>

                                    {/* AMOUNT */}
                                    <div className="trd-coin-amount">
                                        <span className="amount" style={{ color: isPos ? "#00e676" : "#ff1744" }}>
                                            {isPos ? "+" : "−"}{Math.abs(coin.amount).toFixed(6)}
                                        </span>
                                        <div className={`direction-badge ${isPos ? "pos" : "neg"}`}>
                                            {isPos ? "▲" : "▼"} {isPos ? "PROFIT" : "LOSS"}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* DIVIDER */}
                    <div className="trd-divider"><span>end of record</span></div>

                    {/* FOOTER */}
                    <div className="trd-footer">
                        <div className="trd-footer-meta">
                            <div className="trd-id-tag">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                TXN #{typeof id === "string" ? id.slice(-8).toUpperCase() : id}
                            </div>
                        </div>

                        <button className="trd-back-full-btn" onClick={() => navigate(-1)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Back to History
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default AITradeBotHistoryDetail;