import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getSignals } from "../../apis/user/users.api";
import { Radio, X, TrendingUp, TrendingDown, Clock } from "lucide-react";

const SignalCard = ({ signal }) => {
  const isBuy = signal?.type === "Buy";
  const colorClass = isBuy ? "text-emerald-600 bg-emerald-50 border-emerald-200" : "text-rose-600 bg-rose-50 border-rose-200";

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
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-sky-300 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-lg ${colorClass}`}>
            {isBuy ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 tracking-wide">
              {isBuy ? "BUY SIGNAL (LONG)" : "SELL SIGNAL (SHORT)"}
            </h4>
            <p className="text-[11px] text-slate-500 font-medium">Algorithmic Trade Alert</p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Active
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">Slot</p>
          <p className="text-sm font-bold text-slate-900">{signal?.slot || "-"}</p>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">Slot Time</p>
          <p className="text-sm font-bold text-slate-900">{signal?.slotTime || "--:--"}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
        <div>
          <p className="text-[10px] font-semibold uppercase text-slate-400">Expires At</p>
          <p className="text-slate-700 font-medium text-[11px]">
            {signal?.expiresAt
              ? new Date(signal.expiresAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "-"}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] font-semibold uppercase text-slate-400">Time Remaining</p>
          <p className={`font-bold text-xs ${timeRemaining?.expired ? "text-rose-600" : "text-sky-600"}`}>
            {timeRemaining?.text || "--"}
          </p>
        </div>
      </div>
    </div>
  );
};

const SignalsModal = ({ open, onClose }) => {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActiveSignals = async () => {
    setLoading(true);
    try {
      const response = await getSignals();
      if (response?.success) {
        const allSignals = Array.isArray(response?.data)
          ? response.data
          : response?.data
          ? [response.data]
          : [];

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

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      setSignals((prev) =>
        prev.filter((signal) => new Date(signal.expiresAt) > new Date())
      );
    }, 30000);
    return () => clearInterval(interval);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1203] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg max-h-[85vh] flex flex-col bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* HEADER */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Radio size={20} className="animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">LIVE MARKET SIGNALS</h2>
              <p className="text-[11px] text-slate-500 font-medium">Real-time Quant Alerts</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Scanning AI Market Signals...</p>
            </div>
          ) : signals.length > 0 ? (
            signals.map((signal, index) => (
              <SignalCard key={signal?._id || index} signal={signal} />
            ))
          ) : (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl font-bold">
                📡
              </div>
              <h3 className="text-sm font-bold text-slate-900">No Active Signals</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                There are currently no live trading signals active. Please check back shortly.
              </p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-400">
          Signals refresh automatically • Execution at investor discretion
        </div>

      </div>
    </div>
  );
};

export default SignalsModal;
