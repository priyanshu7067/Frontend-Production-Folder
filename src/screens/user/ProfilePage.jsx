import React, { useState } from "react";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();
  console.log(user);
  const referralLink = `${window.location.origin}/register?ref=${user?.userId}`;
  // console.log(user);
  return (
    <div className="dashboard-bg min-h-full p-2 md:p-4 text-white space-y-6">

      {/* 🔥 PROFILE CARD */}
      <div className="glow-card flex flex-col md:flex-row items-center gap-4 md:gap-6 p-4 md:p-5">

        {/* IMAGE */}
        <div className="relative">
          <img
            src={user.avatar}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-blue-500"
          />
          <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border border-black" />
        </div>

        {/* INFO */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-lg md:text-xl font-semibold">{user.name || "Kyc Not Verified"}</h2>
          <p className="text-sm text-gray-400">{user.username || "username"}</p>
          <p className="text-xs text-gray-500">{user.email || "N/A"}</p>
        </div>

        {/* WALLET */}
        <div className="text-center md:text-right">
          <p className="text-xs text-gray-400">Wallet</p>
          <p className="text-sm text-blue-400 font-mono">{user.userId || "N/A"}</p>
        </div>
      </div>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard label="Balance" value={`$${user?.balance || "0.00"}`} color="text-blue-400" />
        <StatCard label="Profit" value={`+$${user?.profit || "0.00"}`} color="text-green-400" />
        <StatCard label="Trades" value={user?.trades || "0"} />
        <StatCard label="AI Status" value="ACTIVE" color="text-purple-400" />

      </div>
      {/* 🔥 REFERRAL SECTION */}
      <div className="glow-card p-4 md:p-5 space-y-4">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-sm md:text-base font-semibold">
              Your Referral Link
            </h3>
            <p className="text-xs text-gray-400">
              Invite users & earn rewards 💰
            </p>
          </div>

          <span className="text-[10px] px-2 py-1 rounded-full bg-green-500/10 text-green-400 w-fit">
            Active
          </span>
        </div>

        {/* LINK BOX */}
        {/* LINK BOX */}
        <div className="flex flex-col sm:flex-row items-stretch gap-2">

          <div className="flex-1 relative">
            <input
              value={referralLink}
              readOnly
              className="
        w-full px-3 py-2 text-xs md:text-sm
        bg-black/40 border border-white/10
        rounded-lg text-blue-400 font-mono
        focus:outline-none pr-10
      "
            />

            {/* subtle glow */}
            <div className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
          </div>

          {/* COPY BUTTON */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(referralLink);
              setCopied(true);

              setTimeout(() => setCopied(false), 2000);
            }}
            className={`
      px-4 py-2 text-xs md:text-sm font-semibold
      rounded-lg transition-all duration-300
      ${copied
                ? "bg-green-500 text-white"
                : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 cursor-pointer"
              }
      shadow-lg
    `}
          >
            {copied ? "Copied ✅" : "Copy"}
          </button>
        </div>
      </div>

      {/* 🔥 WALLET + SECURITY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* WALLET */}
        <div className="glow-card p-4 space-y-3">
          <h3 className="text-sm text-gray-400">Wallet Overview</h3>

          <Row label="BTC" value="0.45 BTC" />
          <Row label="ETH" value="2.1 ETH" />
          <Row label="USDT" value="5230 USDT" />
        </div>

        {/* SECURITY */}
        <div className="glow-card p-4 space-y-3">
          <h3 className="text-sm text-gray-400">Security</h3>

          <Row label="2FA" value="Enabled" color="text-green-400" />
          <Row label="KYC" value={user?.isKycVerified ? "Verified" : "Not Verified"} color="text-green-400" />
          {/* <Row label="Last Login" value="Today" /> */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;


// 🔥 SMALL COMPONENTS

const StatCard = ({ label, value, color = "text-white" }) => (
  <div className="glow-card p-4">
    <p className="text-xs text-gray-400">{label}</p>
    <h2 className={`text-lg font-semibold ${color}`}>{value}</h2>
  </div>
);

const Row = ({ label, value, color = "text-white" }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-400">{label}</span>
    <span className={color}>{value}</span>
  </div>
);