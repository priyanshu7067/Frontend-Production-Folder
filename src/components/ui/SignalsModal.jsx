import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { getSignals } from "../../apis/user/users.api";

/* ─── theme tokens ─────────────────────────────────────────────────────── */
const T = {
  bgMain: "#020617",
  primary: "#22d3ee",
  primaryDark: "#06b6d4",
  primaryGlow: "rgba(34,211,238,0.35)",
  accent: "#b76e79",
  accentGlow: "rgba(183,110,121,0.35)",
  textPrimary: "#e6faff",
  textMuted: "rgba(230,250,255,0.4)",
  borderSubtle: "rgba(34,211,238,0.12)",
  borderHover: "rgba(34,211,238,0.35)",
  cardBg: "rgba(6,22,42,0.9)",
  success: "#10b981",
  successGlow: "rgba(16,185,129,0.35)",
};

/* ─── keyframes ────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px var(--glow), 0 0 40px var(--glow-dim); }
    50% { box-shadow: 0 0 30px var(--glow), 0 0 60px var(--glow-dim); }
  }
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  @keyframes scanline {
    0% { background-position: 0 0; }
    100% { background-position: 0 100px; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  @keyframes border-flow {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  .sig-card {
    animation: fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  .sig-card:nth-child(1) { animation-delay: 0s; }
  .sig-card:nth-child(2) { animation-delay: 0.1s; }
  .sig-card:nth-child(3) { animation-delay: 0.2s; }

  .sig-live-dot {
    animation: blink 1.5s ease-in-out infinite;
  }

  .sig-orb {
    animation: float 4s ease-in-out infinite;
  }
  .sig-orb:nth-child(2) { animation-delay: 1.3s; }
  .sig-orb:nth-child(3) { animation-delay: 2.6s; }

  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(34, 211, 238, 0.2);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(34, 211, 238, 0.4);
  }
`;

/* ─── Signal Card Component ────────────────────────────────────────────── */
const SignalCard = ({ signal, index }) => {
  const isBuy = signal?.type === "Buy";
  const color = isBuy ? T.primary : T.accent;
  const glow = isBuy ? T.primaryGlow : T.accentGlow;
  const label = isBuy ? "BUY" : "SELL";

  const getTimeRemaining = () => {
    if (!signal?.expiresAt) return null;
    const now = new Date();
    const expires = new Date(signal.expiresAt);
    const diff = expires - now;

    if (diff <= 0) return { text: "Expired", expired: true };

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return { text: `${hours}h ${minutes}m left`, expired: false };
    }
    return { text: `${minutes}m left`, expired: false };
  };

  const timeRemaining = getTimeRemaining();

  return (
    <div
      className="sig-card"
      style={{
        position: "relative",
        background: T.cardBg,
        border: `1px solid ${T.borderSubtle}`,
        borderRadius: 20,
        padding: "20px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        marginBottom: "16px",
      }}
    >
      {/* Animated border gradient on hover */}
      <div
        style={{
          position: "absolute",
          inset: -1,
          borderRadius: 21,
          padding: 1,
          background: `linear-gradient(90deg, ${color}, transparent, ${color})`,
          backgroundSize: "200% 100%",
          animation: "border-flow 3s linear infinite",
          opacity: 0,
          transition: "opacity 0.3s",
          zIndex: 0,
        }}
        className="sig-border-anim"
      />

      {/* Glow effect */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
          opacity: 0.4,
          filter: "blur(30px)",
        }}
        className="sig-orb"
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Signal Icon */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: `${color}15`,
              border: `1.5px solid ${color}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: color,
              boxShadow: `0 0 15px ${glow}`,
            }}
          >
            {isBuy ? "↑" : "↓"}
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: color,
                letterSpacing: ".1em",
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontSize: 10,
                color: T.textMuted,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              {isBuy ? "Long Signal" : "Short Signal"}
            </div>
          </div>
        </div>

        {/* Live Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: 20,
            padding: "4px 10px",
          }}
        >
          <span
            className="sig-live-dot"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: T.success,
              boxShadow: `0 0 6px ${T.success}`,
            }}
          />
          <span
            style={{
              fontSize: 9,
              fontWeight: 600,
              color: T.success,
              letterSpacing: ".1em",
              textTransform: "uppercase",
            }}
          >
            Active
          </span>
        </div>
      </div>

      {/* Slot Info */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginBottom: 16,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: 10,
            padding: "10px 12px",
          }}
        >
          <div
            style={{
              fontSize: 9,
              color: T.textMuted,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Slot
          </div>
          <div
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: T.textPrimary,
            }}
          >
            {signal?.slot || "-"}
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: 10,
            padding: "10px 12px",
          }}
        >
          <div
            style={{
              fontSize: 9,
              color: T.textMuted,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Slot Time
          </div>
          <div
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: T.textPrimary,
            }}
          >
            {signal?.slotTime || "--:--"}
          </div>
        </div>
      </div>

      {/* Expiry */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 12,
          borderTop: `1px solid ${T.borderSubtle}`,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 9,
              color: T.textMuted,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              marginBottom: 2,
            }}
          >
            Expires At
          </div>
          <div
            style={{
              fontSize: 11,
              color: T.textPrimary,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
            }}
          >
            {signal?.expiresAt
              ? new Date(signal.expiresAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "-"}
          </div>
        </div>

        <div
          style={{
            textAlign: "right",
          }}
        >
          <div
            style={{
              fontSize: 9,
              color: T.textMuted,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              marginBottom: 2,
            }}
          >
            Time Left
          </div>
          <div
            style={{
              fontSize: 12,
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 600,
              color: timeRemaining?.expired ? T.accent : T.primary,
              letterSpacing: ".05em",
            }}
          >
            {timeRemaining?.text || "--"}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Empty State ───────────────────────────────────────────────────────── */
const EmptyState = () => (
  <div
    style={{
      textAlign: "center",
      padding: "40px 20px",
    }}
  >
    <div
      style={{
        width: 60,
        height: 60,
        margin: "0 auto 16px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${T.borderSubtle}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
        opacity: 0.5,
      }}
    >
      📡
    </div>
    <h3
      style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 16,
        fontWeight: 700,
        color: T.textPrimary,
        marginBottom: 8,
      }}
    >
      No Active Signals
    </h3>
    <p
      style={{
        fontSize: 12,
        color: T.textMuted,
        maxWidth: 240,
        margin: "0 auto",
        lineHeight: 1.6,
      }}
    >
      Currently there are no active trading signals.
    </p>
  </div>
);

/* ─── Main Component ────────────────────────────────────────────────────── */
const SignalsModal = ({ open, onClose }) => {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showLoader, hideLoader } = useAuth();

  const fetchActiveSignals = async () => {
    // We don't want to show the full screen loader for a popup if possible, 
    // but the original code had it. Let's keep it consistent or use local loading.
    setLoading(true);

    try {
      const response = await getSignals();

      if (response?.success) {
        const allSignals = Array.isArray(response?.data)
          ? response.data
          : response?.data
            ? [response.data]
            : [];

        // Filter only active signals
        const activeSignals = allSignals.filter((signal) => {
          if (!signal?.expiresAt) return false;
          return new Date(signal.expiresAt) > new Date();
        });

        setSignals(activeSignals);
      }
    } catch (error) {
      console.error("Error fetching signals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchActiveSignals();
    }
  }, [open]);

  // Auto-refresh every 30 seconds to update expiry status
  useEffect(() => {
    if (!open) return;
    
    const interval = setInterval(() => {
      setSignals((prev) =>
        prev.filter((signal) => new Date(signal.expiresAt) > new Date()),
      );
    }, 30000);

    return () => clearInterval(interval);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1203] flex items-center justify-center p-4">
        <style>{css}</style>
        {/* Backdrop */}
        <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-md" 
            onClick={onClose}
        />
        
        {/* Modal Container */}
        <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col glass overflow-hidden rounded-2xl border border-[#22d3ee]/20 animate-fade-in">
            {/* Header */}
            <div className="p-6 border-b border-[#22d3ee]/10 flex items-center justify-between bg-[#06162a]/80">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-2 h-2 rounded-full bg-[#22d3ee] sig-live-dot absolute -top-1 -right-1 shadow-[0_0_8px_#22d3ee]" />
                        <span className="text-2xl">📡</span>
                    </div>
                    <div>
                        <h2 className="font-['Orbitron'] text-lg font-bold text-white tracking-wider">LIVE SIGNALS</h2>
                        <p className="text-[10px] text-[#22d3ee]/60 uppercase tracking-[0.2em]">Market Intelligence</p>
                    </div>
                </div>
                <button 
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                >
                    ✕
                </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar bg-[#020617]/40">
                {loading ? (
                    <div className="py-20 text-center flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-2 border-[#22d3ee]/20 border-t-[#22d3ee] rounded-full animate-spin" />
                        <span className="text-xs text-[#22d3ee]/60 font-medium uppercase tracking-widest">Scanning Markets...</span>
                    </div>
                ) : signals.length > 0 ? (
                    <div className="space-y-4">
                        {signals.map((signal, index) => (
                            <SignalCard
                                key={signal?._id || index}
                                signal={signal}
                                index={index}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState />
                )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#06162a]/90 border-t border-[#22d3ee]/10 text-center">
                <p className="text-[10px] text-white/30 uppercase tracking-[0.15em]">
                    Signals refresh automatically • Trade at your own risk
                </p>
            </div>
        </div>
    </div>
  );
};

export default SignalsModal;
