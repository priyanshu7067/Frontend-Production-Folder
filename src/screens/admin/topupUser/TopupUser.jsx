import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { topupUserApi } from "../../../apis/admin/admin.api";
import { getUserInfo } from "../../../apis/user/users.api";
import ReusableInput from "../../../components/global/ReusableInput";
import ButtonComponent from "../../../components/ui/ButtonComponent";

/* ─── theme tokens ─────────────────────────────────────────────────────── */
const T = {
  bgMain: "#020617",
  primary: "#22d3ee",
  primaryDark: "#06b6d4",
  primaryGlow: "rgba(34,211,238,0.35)",
  accent: "#b76e79",
  textPrimary: "#e6faff",
  textMuted: "rgba(230,250,255,0.4)",
  textDim: "rgba(230,250,255,0.18)",
  borderSubtle: "rgba(34,211,238,0.12)",
  borderHover: "rgba(34,211,238,0.35)",
  cardBg: "rgba(6,22,42,0.92)",
  green: "#4ade80",
  greenFaint: "rgba(74,222,128,0.08)",
  greenBorder: "rgba(74,222,128,0.25)",
};

/* ─── injected styles ───────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800&family=DM+Sans:wght@300;400;500&display=swap');

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes scanline {
    0%   { background-position: 0 0; }
    100% { background-position: 0 100px; }
  }
  @keyframes corner-blink {
    0%,100% { opacity:.5; }
    50%      { opacity:1; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(34,211,238,0.35); }
    70%  { box-shadow: 0 0 0 8px transparent; }
    100% { box-shadow: 0 0 0 0 transparent; }
  }
  @keyframes user-reveal {
    from { opacity:0; transform:translateY(10px) scaleY(.96); }
    to   { opacity:1; transform:translateY(0) scaleY(1); }
  }
  @keyframes dot-blink {
    0%,100% { opacity:1; } 50% { opacity:.25; }
  }
  @keyframes amount-glow {
    0%,100% { box-shadow: 0 0 0 0 rgba(34,211,238,0); }
    50%      { box-shadow: 0 0 18px rgba(34,211,238,0.18); }
  }

  .tu-wrap {
    animation: fadeUp .55s cubic-bezier(.22,1,.36,1) both;
  }

  .tu-corner {
    position: absolute;
    width: 16px;
    height: 16px;
    animation: corner-blink 2.6s ease-in-out infinite;
  }

  .tu-input-row { transition: all .2s; }
  .tu-input-row:focus-within {
    border-color: rgba(34,211,238,0.45) !important;
    box-shadow: 0 0 0 3px rgba(34,211,238,0.07);
  }

  .tu-submit:hover:not(:disabled) {
    filter: brightness(1.12);
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 0 32px rgba(34,211,238,0.45) !important;
  }
  .tu-submit:active:not(:disabled) {
    transform: translateY(0) scale(.98);
  }
  .tu-submit { transition: filter .2s, transform .2s, box-shadow .2s; }
  .tu-submit:disabled { opacity: .45; cursor: not-allowed; }

  .tu-user-card {
    animation: user-reveal .35s cubic-bezier(.22,1,.36,1) both;
  }

  .tu-fetching-dot {
    display: inline-block;
    animation: dot-blink 1s ease-in-out infinite;
  }
  .tu-fetching-dot:nth-child(2) { animation-delay: .2s; }
  .tu-fetching-dot:nth-child(3) { animation-delay: .4s; }

  .tu-amount-active {
    animation: amount-glow 2.4s ease-in-out infinite;
  }

  .tu-quick-btn:hover {
    background: rgba(34,211,238,0.14) !important;
    border-color: rgba(34,211,238,0.45) !important;
    color: #22d3ee !important;
  }
  .tu-quick-btn { transition: all .18s; cursor: pointer; }
`;

/* ─── Corner decoration ─────────────────────────────────────────────────── */
const Corner = ({ pos }) => {
  const posStyle = {
    topLeft:     { top: 12, left: 12, borderTop: `1.5px solid ${T.primary}`, borderLeft: `1.5px solid ${T.primary}` },
    topRight:    { top: 12, right: 12, borderTop: `1.5px solid ${T.primary}`, borderRight: `1.5px solid ${T.primary}` },
    bottomLeft:  { bottom: 12, left: 12, borderBottom: `1.5px solid ${T.primary}`, borderLeft: `1.5px solid ${T.primary}` },
    bottomRight: { bottom: 12, right: 12, borderBottom: `1.5px solid ${T.primary}`, borderRight: `1.5px solid ${T.primary}` },
  };
  return <div className="tu-corner" style={posStyle[pos]} />;
};

/* ─── Field wrapper ─────────────────────────────────────────────────────── */
const FieldBlock = ({ label, children, icon }) => (
  <div style={{ marginBottom: 22 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 9 }}>
      {icon && (
        <span style={{ fontSize: 13, color: T.primary, lineHeight: 1 }}>{icon}</span>
      )}
      <span
        style={{
          fontSize: 10,
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: T.textMuted,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </div>
    {children}
  </div>
);

/* ─── Quick amount chip ─────────────────────────────────────────────────── */
const QuickChip = ({ value, onClick, active }) => (
  <button
    type="button"
    className="tu-quick-btn"
    onClick={onClick}
    style={{
      padding: "6px 14px",
      borderRadius: 8,
      border: `1px solid ${active ? "rgba(34,211,238,0.45)" : T.borderSubtle}`,
      background: active ? "rgba(34,211,238,0.1)" : "rgba(255,255,255,0.02)",
      color: active ? T.primary : T.textMuted,
      fontSize: 12,
      fontFamily: "'Orbitron', sans-serif",
      fontWeight: 600,
      letterSpacing: ".06em",
    }}
  >
    {value}
  </button>
);

/* ─── Main Component ─────────────────────────────────────────────────────── */
const TopupUser = () => {
  const [formData, setFormData] = useState({ userId: "", amount: "" });
  const [userInfo, setUserInfo]   = useState(null);
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const { showLoader, hideLoader } = useAuth();

  const QUICK_AMOUNTS = [50, 100, 250, 500];

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (formData.userId.length >= 5) {
        fetchUserData(formData.userId);
      } else {
        setUserInfo(null);
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [formData.userId]);

  const fetchUserData = async (wallet) => {
    setIsFetchingUser(true);
    try {
      const res = await getUserInfo(wallet);
      setUserInfo(res?.success ? res?.data : null);
    } catch {
      setUserInfo(null);
    } finally {
      setIsFetchingUser(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userId || !formData.amount) {
      toast.error("Please fill all fields");
      return;
    }
    if (Number(formData.amount) < 50) {
      toast.error("Minimum topup amount is 50 USDT");
      return;
    }
    showLoader();
    try {
      const res = await topupUserApi(formData);
      if (res?.success) {
        Swal.fire({
          title: `<span style="font-family:'Orbitron',sans-serif;font-size:17px;color:${T.primary}">Topup Successful</span>`,
          html: `<div style="font-family:'DM Sans',sans-serif;font-size:13px;color:rgba(230,250,255,0.6);margin-top:6px;">
                   ${res?.message || "User balance has been updated."}<br/>
                   <span style="color:${T.primary};font-weight:500;">+${formData.amount} USDT credited</span>
                 </div>`,
          icon: "success",
          background: "#06101a",
          color: T.textPrimary,
          iconColor: T.primary,
          confirmButtonColor: T.primaryDark,
          confirmButtonText: "Done",
          timer: 3500,
          timerProgressBar: true,
        });
        setFormData({ userId: "", amount: "" });
        setUserInfo(null);
      } else {
        toast.error(res?.message || "Topup failed");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      hideLoader();
    }
  };

  const truncateWallet = (w) =>
    w && w.length > 14 ? `${w.slice(0, 6)}…${w.slice(-6)}` : w;

  return (
    <>
      <style>{css}</style>

      {/* page bg */}
      <div
        style={{
          minHeight: "100vh",
          background: `radial-gradient(ellipse at 20% 15%, rgba(34,211,238,0.06) 0%, transparent 55%),
                       radial-gradient(ellipse at 80% 80%, rgba(183,110,121,0.05) 0%, transparent 55%),
                       #020617`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem",
          fontFamily: "'DM Sans', sans-serif",
          position: "relative",
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
              "repeating-linear-gradient(0deg, rgba(34,211,238,0.013) 0px, transparent 1px, transparent 3px)",
            backgroundSize: "100% 4px",
            animation: "scanline 9s linear infinite",
          }}
        />

        {/* card */}
        <div
          className="tu-wrap"
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: 460,
            background: T.cardBg,
            border: `1px solid ${T.borderSubtle}`,
            borderRadius: 24,
            padding: "38px 34px 34px",
            backdropFilter: "blur(22px)",
          }}
        >
          <Corner pos="topLeft" />
          <Corner pos="topRight" />
          <Corner pos="bottomLeft" />
          <Corner pos="bottomRight" />

          {/* header */}
          <div style={{ textAlign: "center", marginBottom: 34 }}>
            {/* icon ring */}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                border: `1.5px solid ${T.primary}`,
                background: "rgba(34,211,238,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                fontSize: 24,
                animation: "pulse-ring 2.4s ease-out infinite",
              }}
            >
              ⬆
            </div>
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
              ◈ &nbsp; Admin Console &nbsp; ◈
            </p>
            <h1
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 21,
                fontWeight: 800,
                color: T.textPrimary,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              User Topup
            </h1>
            <p style={{ fontSize: 13, color: T.textMuted, marginTop: 7 }}>
              Credit USDT balance to a user account
            </p>
          </div>

          {/* divider */}
          <div
            style={{
              height: 1,
              background: `linear-gradient(90deg, transparent, ${T.primary}25, transparent)`,
              marginBottom: 28,
            }}
          />

          <form onSubmit={handleSubmit}>

            {/* wallet field */}
            <FieldBlock label="Wallet Address / User ID" icon="◎">
              <div
                className="tu-input-row"
                style={{
                  background: "#06162a",
                  border: `1px solid ${T.borderSubtle}`,
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <ReusableInput
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  placeholder="Enter wallet address or User ID"
                  required
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: T.textPrimary,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    width: "100%",
                    padding: "14px 16px",
                  }}
                />
              </div>
            </FieldBlock>

            {/* fetching indicator */}
            {isFetchingUser && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 18,
                  padding: "10px 14px",
                  background: "rgba(34,211,238,0.04)",
                  border: `1px solid ${T.borderSubtle}`,
                  borderRadius: 10,
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    border: `1.5px solid ${T.primary}`,
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 12, color: T.primary, fontFamily: "'DM Sans', sans-serif", letterSpacing: ".05em" }}>
                  Looking up user
                  <span className="tu-fetching-dot"> .</span>
                  <span className="tu-fetching-dot"> .</span>
                  <span className="tu-fetching-dot"> .</span>
                </span>
              </div>
            )}

            {/* user info card */}
            {userInfo && !isFetchingUser && (
              <div
                className="tu-user-card"
                style={{
                  background: T.greenFaint,
                  border: `1px solid ${T.greenBorder}`,
                  borderRadius: 14,
                  padding: "14px 16px",
                  marginBottom: 22,
                }}
              >
                {/* found header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    marginBottom: 12,
                    paddingBottom: 10,
                    borderBottom: `1px solid ${T.greenBorder}`,
                  }}
                >
                  <span style={{ fontSize: 14, color: T.green }}>✓</span>
                  <span
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      color: T.green,
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                    }}
                  >
                    User Verified
                  </span>
                </div>

                {/* info rows */}
                {[
                  { label: "Name",    value: userInfo?.name    || "N/A" },
                  { label: "Email",   value: userInfo?.email   || "N/A" },
                  { label: "User ID", value: truncateWallet(userInfo?.userId) },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 7,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: T.textMuted,
                        fontFamily: "'DM Sans', sans-serif",
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {row.label}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        color: T.textPrimary,
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* amount field */}
            <FieldBlock label="Topup Amount (USDT)" icon="◈">
              <div
                className={`tu-input-row ${formData.amount ? "tu-amount-active" : ""}`}
                style={{
                  background: "#06162a",
                  border: `1px solid ${T.borderSubtle}`,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    paddingLeft: 16,
                    fontSize: 13,
                    color: T.primary,
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: 600,
                    flexShrink: 0,
                    letterSpacing: ".04em",
                  }}
                >
                  $
                </span>
                <ReusableInput
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  min={50}
                  required
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: T.textPrimary,
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    flex: 1,
                    padding: "14px 16px 14px 8px",
                  }}
                />
                <span
                  style={{
                    paddingRight: 16,
                    fontSize: 11,
                    color: T.textMuted,
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: ".1em",
                    flexShrink: 0,
                  }}
                >
                  USDT
                </span>
              </div>

              {/* quick-select chips */}
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                {QUICK_AMOUNTS.map((v) => (
                  <QuickChip
                    key={v}
                    value={`+${v}`}
                    active={Number(formData.amount) === v}
                    onClick={() => setFormData((p) => ({ ...p, amount: String(v) }))}
                  />
                ))}
              </div>
              <p style={{ fontSize: 11, color: T.textDim, marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>
                Minimum: 50 USDT
              </p>
            </FieldBlock>

            {/* preview pill */}
            {formData.userId && formData.amount && (
              <div
                style={{
                  background: "rgba(34,211,238,0.04)",
                  border: `1px solid ${T.borderSubtle}`,
                  borderRadius: 12,
                  padding: "12px 16px",
                  marginBottom: 22,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 11, color: T.textMuted, fontFamily: "'DM Sans', sans-serif", letterSpacing: ".06em", textTransform: "uppercase" }}>
                  Crediting
                </span>
                <span
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 14,
                    fontWeight: 800,
                    color: T.primary,
                    letterSpacing: ".08em",
                  }}
                >
                  {formData.amount} USDT
                </span>
                <span style={{ fontSize: 11, color: T.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                  → {truncateWallet(formData.userId)}
                </span>
              </div>
            )}

            {/* submit */}
            <button
              type="submit"
              className="tu-submit"
              disabled={isFetchingUser}
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
                background:
                  formData.userId && formData.amount
                    ? `linear-gradient(135deg, ${T.primaryDark}, ${T.primary})`
                    : "rgba(255,255,255,0.06)",
                color:
                  formData.userId && formData.amount
                    ? "#020617"
                    : "rgba(230,250,255,0.22)",
                transition: "background .3s, color .3s",
                boxShadow:
                  formData.userId && formData.amount
                    ? `0 0 24px ${T.primaryGlow}`
                    : "none",
              }}
            >
              ⟶ &nbsp; SUBMIT TOPUP
            </button>
          </form>

          {/* footer */}
          <p
            style={{
              textAlign: "center",
              marginTop: 18,
              fontSize: 11,
              color: "rgba(230,250,255,0.18)",
              letterSpacing: ".06em",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            ADMIN ONLY &nbsp;·&nbsp; IRREVERSIBLE ACTION
          </p>
        </div>
      </div>
    </>
  );
};

export default TopupUser;