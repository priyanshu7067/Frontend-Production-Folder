import React, { useState } from "react";
import Swal from "sweetalert2";
import { sendSignalApi } from "../../../apis/admin/admin.api";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

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
};

/* ─── tiny keyframes injected once ────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800&family=DM+Sans:wght@400;500&display=swap');

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0);    }
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 var(--glow); opacity:.9; }
    70%  { box-shadow: 0 0 0 10px transparent; opacity:0; }
    100% { box-shadow: 0 0 0 0 transparent; }
  }
  @keyframes scanline {
    0%   { background-position: 0 0; }
    100% { background-position: 0 100px; }
  }
  @keyframes corner-blink {
    0%,100% { opacity:.6; } 50% { opacity:1; }
  }
  .cn-card {
    animation: fadeUp .55s cubic-bezier(.22,1,.36,1) both;
  }
  .cn-send-btn:hover { filter: brightness(1.15); transform: translateY(-2px) scale(1.01); }
  .cn-send-btn:active { transform: translateY(0) scale(.98); }
  .cn-send-btn { transition: filter .2s, transform .2s; }
`;

/* ─── Corner decoration ─────────────────────────────────────────────────── */
const Corner = ({ pos }) => {
  const s = {
    position: "absolute",
    width: 18,
    height: 18,
    animation: "corner-blink 2.4s ease-in-out infinite",
    ...pos,
  };
  const v = (top, right, bottom, left) => ({
    borderTop: top ? `1.5px solid ${T.primary}` : "none",
    borderRight: right ? `1.5px solid ${T.primary}` : "none",
    borderBottom: bottom ? `1.5px solid ${T.primary}` : "none",
    borderLeft: left ? `1.5px solid ${T.primary}` : "none",
  });
  const dir =
    pos.top !== undefined && pos.left !== undefined
      ? v(true, false, false, true)
      : pos.top !== undefined && pos.right !== undefined
        ? v(true, true, false, false)
        : pos.bottom !== undefined && pos.left !== undefined
          ? v(false, false, true, true)
          : v(false, true, true, false);
  return <div style={{ ...s, ...dir }} />;
};

/* ─── Signal toggle chip ─────────────────────────────────────────────────── */
const SignalChip = ({ label, color, glow, selected, onClick }) => (
  <button
    onClick={onClick}
    style={{
      flex: 1,
      padding: "18px 12px",
      borderRadius: 14,
      border: selected
        ? `1.5px solid ${color}`
        : `1px solid rgba(255,255,255,0.07)`,
      background: selected
        ? `radial-gradient(ellipse at center, ${glow} 0%, rgba(2,6,23,0) 70%)`
        : "rgba(255,255,255,0.03)",
      cursor: "pointer",
      transition: "all .25s",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      position: "relative",
      overflow: "hidden",
    }}
  >
    {selected && (
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 14,
          animation: "pulse-ring 1.8s ease-out infinite",
          "--glow": glow,
          pointerEvents: "none",
        }}
      />
    )}

    {/* icon */}
    <span
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: selected ? `${color}18` : "rgba(255,255,255,0.04)",
        border: `1px solid ${selected ? color : "rgba(255,255,255,0.08)"}`,
        fontSize: 22,
        transition: "all .25s",
      }}
    >
      {label === "BUY" ? "↑" : "↓"}
    </span>

    <span
      style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 14,
        fontWeight: 800,
        letterSpacing: ".12em",
        color: selected ? color : "rgba(230,250,255,0.35)",
        transition: "color .25s",
      }}
    >
      {label}
    </span>

    {selected && (
      <span
        style={{
          fontSize: 10,
          fontFamily: "'DM Sans', sans-serif",
          color: `${color}aa`,
          letterSpacing: ".08em",
          textTransform: "uppercase",
        }}
      >
        {label === "BUY" ? "Long Signal" : "Short Signal"}
      </span>
    )}
  </button>
);

/* ─── Main component ────────────────────────────────────────────────────── */
const CreateNotification = () => {
  const [signal, setSignal] = useState(null);
  const [slot, setSlot] = useState(""); // "BUY" | "SALE"
  const { showLoader, hideLoader } = useAuth();

  const timeSlots = [
    { slot: 1, time: "10:30" },
    { slot: 2, time: "14:15" },
    { slot: 3, time: "18:45" },
  ];

  const handleSend = async () => {
    if (!signal || !slot) {
      Swal.fire({
        title: "Select a Signal",
        text: "Please choose BUY/SALE and time slot before sending.",
        icon: "warning",
        background: "#06101a",
        color: T.textPrimary,
        iconColor: "#facc15",
        confirmButtonColor: T.primaryDark,
        confirmButtonText: "Got it",
      });
      return;
    }

    const payload = {
      type: signal === "BUY" ? "Buy" : "Sell",
      slot,
      timestamp: new Date().toISOString(),
      sentBy: "admin",
    };

    showLoader();

    try {
      const res = await sendSignalApi(payload);
      if (res?.success) {
        setSignal(null);
        setSlot("");
        Swal.fire({
          title: `<span style="font-family:'Orbitron',sans-serif;font-size:18px;color:${signal === "BUY" ? T.primary : T.accent}">${signal} Signal Sent</span>`,
          html: `
        <div style="font-family:'DM Sans',sans-serif;font-size:13px;color:rgba(230,250,255,0.6);margin-top:6px;">
          Notification broadcasted to all users.<br/>
          <span style="color:${signal === "BUY" ? T.primary : T.accent};font-weight:500;">
            ${signal === "BUY" ? "↑ Long Signal Active" : "↓ Short Signal Active"}
          </span>
        </div>`,
          icon: "success",
          background: "#06101a",
          color: T.textPrimary,
          iconColor: signal === "BUY" ? T.primary : T.accent,
          confirmButtonColor: signal === "BUY" ? T.primaryDark : T.accent,
          confirmButtonText: "Done",
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      hideLoader();
    }
  };

  return (
    <>
      <style>{css}</style>

      <div
        style={{
          minHeight: "100vh",
          background: `radial-gradient(ellipse at 20% 10%, rgba(34,211,238,0.06) 0%, transparent 55%),
                     radial-gradient(ellipse at 80% 80%, rgba(183,110,121,0.06) 0%, transparent 55%),
                     #020617`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* scanline overlay */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(34,211,238,0.015) 0px, transparent 1px, transparent 3px)",
            backgroundSize: "100% 4px",
            animation: "scanline 8s linear infinite",
          }}
        />

        <div
          className="cn-card"
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: 480,
            background: T.cardBg,
            border: `1px solid ${T.borderSubtle}`,
            borderRadius: 24,
            padding: "36px 32px 32px",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* corner decorations */}
          <Corner pos={{ top: 12, left: 12 }} />
          <Corner pos={{ top: 12, right: 12 }} />
          <Corner pos={{ bottom: 12, left: 12 }} />
          <Corner pos={{ bottom: 12, right: 12 }} />

          {/* header */}
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: T.primary,
                fontWeight: 500,
                marginBottom: 8,
              }}
            >
              ◈ &nbsp; Signal Console &nbsp; ◈
            </p>
            <h1
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 22,
                fontWeight: 800,
                color: T.textPrimary,
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              Broadcast Notification
            </h1>
            <p style={{ fontSize: 13, color: T.textMuted, marginTop: 8 }}>
              Select market direction and send to all users
            </p>
          </div>

          {/* label */}
          <p
            style={{
              fontSize: 11,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: T.textMuted,
              marginBottom: 12,
              fontWeight: 500,
            }}
          >
            Signal Type
          </p>

          {/* toggle chips */}
          <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
            <SignalChip
              label="BUY"
              color={T.primary}
              glow={T.primaryGlow}
              selected={signal === "BUY"}
              onClick={() => setSignal("BUY")}
            />
            <SignalChip
              label="SALE"
              color={T.accent}
              glow={T.accentGlow}
              selected={signal === "SALE"}
              onClick={() => setSignal("SALE")}
            />
          </div>

          {/* time slot */}
          <div style={{ marginBottom: 28 }}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: T.textMuted,
                marginBottom: 12,
                fontWeight: 500,
              }}
            >
              Time Slot
            </p>

            <div style={{ position: "relative" }}>
              <select
                value={slot}
                onChange={(e) => setSlot(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "15px 16px",
                  borderRadius: 14,
                  border: `1px solid ${T.borderSubtle}`,
                  backgroundColor: "#06162a",
                  color: T.textPrimary,
                  fontSize: 14,
                  outline: "none",
                  appearance: "none",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <option
                  value=""
                  disabled
                  style={{
                    backgroundColor: "#06162a",
                    color: "rgba(230,250,255,0.5)",
                  }}
                >
                  Select Time Slot
                </option>

                {timeSlots.map((item) => (
                  <option
                    key={item.slot}
                    value={item.slot}
                    style={{
                      backgroundColor: "#06162a",
                      color: "#e6faff",
                    }}
                  >
                    Slot {item.slot} • {item.time}
                  </option>
                ))}
              </select>

              <span
                style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: T.primary,
                  fontSize: 12,
                }}
              >
                ▼
              </span>
            </div>
          </div>

          {/* preview pill */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${T.borderSubtle}`,
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: 12, color: T.textMuted }}>
              Selected Signal
            </span>
            <span
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color:
                  signal === "BUY"
                    ? T.primary
                    : signal === "SALE"
                      ? T.accent
                      : "rgba(230,250,255,0.2)",
                letterSpacing: ".1em",
                transition: "color .3s",
              }}
            >
              {signal ?? "— NONE —"}
            </span>
            <span
              style={{
                fontSize: 11,
                color: T.textMuted,
              }}
            >
              {slot
                ? `Slot ${slot} • ${
                    timeSlots.find((s) => s.slot === slot)?.time
                  }`
                : "No Slot"}
            </span>
          </div>

          {/* send button */}
          <button
            className="cn-send-btn"
            onClick={handleSend}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: 14,
              border: "none",
              cursor: "pointer",
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: ".14em",
              background: signal
                ? `linear-gradient(135deg, ${signal === "BUY" ? T.primaryDark : T.accent}, ${signal === "BUY" ? T.primary : "#d47b85"})`
                : "rgba(255,255,255,0.06)",
              color: signal ? "#020617" : "rgba(230,250,255,0.25)",
              transition: "background .3s, color .3s",
              boxShadow: signal
                ? `0 0 24px ${signal === "BUY" ? T.primaryGlow : T.accentGlow}`
                : "none",
            }}
          >
            ⟶ &nbsp; BROADCAST SIGNAL
          </button>

          {/* footer */}
          <p
            style={{
              textAlign: "center",
              marginTop: 18,
              fontSize: 11,
              color: "rgba(230,250,255,0.2)",
              letterSpacing: ".06em",
            }}
          >
            ADMIN ONLY &nbsp;·&nbsp; LIVE NETWORK
          </p>
        </div>
      </div>
    </>
  );
};

export default CreateNotification;
