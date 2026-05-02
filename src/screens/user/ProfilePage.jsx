import React from "react";
import ButtonComponent from "../../components/ui/ButtonComponent";

const ProfilePage = () => {
  const user = {
    name: "Rohit Sharma",
    username: "@crypto_rohit",
    email: "rohit@mail.com",
    wallet: "0xA3F9...9D21",
    balance: 12847.32,
    profit: 2345.67,
    trades: 124,
    avatar: "https://i.pravatar.cc/150?img=12",
  };

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
          <h2 className="text-lg md:text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-400">{user.username}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>

        {/* WALLET */}
        <div className="text-center md:text-right">
          <p className="text-xs text-gray-400">Wallet</p>
          <p className="text-sm text-blue-400 font-mono">{user.wallet}</p>
        </div>
      </div>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard label="Balance" value={`$${user.balance}`} color="text-blue-400" />
        <StatCard label="Profit" value={`+$${user.profit}`} color="text-green-400" />
        <StatCard label="Trades" value={user.trades} />
        <StatCard label="AI Status" value="ACTIVE" color="text-purple-400" />

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
          <Row label="KYC" value="Verified" color="text-green-400" />
          {/* <Row label="Last Login" value="Today" /> */}
        </div>
      </div>

      {/* 🔥 ACTION BUTTONS */}
      {/* <div className="flex flex-col sm:flex-row gap-3">
        <ButtonComponent className="w-full sm:w-auto">Edit Profile</ButtonComponent>
        <ButtonComponent className="w-full sm:w-auto" variant="secondary">
          Deposit
        </ButtonComponent>
        <ButtonComponent className="w-full sm:w-auto" variant="danger">
          Withdraw
        </ButtonComponent>
      </div> */}

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