import React from "react";
import { useAuth } from "../../context/AuthContext";
import { getAdminDashboardData } from "../../apis/admin/admin.api";
import { useNavigate } from "react-router-dom";
import { AdminRoutes } from "../../constants/routes";
import { maskWalletAddress } from "../../utils/helper";
import PeopleIcon from "@mui/icons-material/People";
import PersonCheckIcon from "@mui/icons-material/HowToReg";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ShareIcon from "@mui/icons-material/Share";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

// components/StatCard.jsx
const StatCard = ({
  icon, // Tabler icon class e.g. "ti-users"
  label, // Card label
  value, // Displayed value
  badge, // Badge text e.g. "+8.4%"
  trend, // "up" | "down" | "neutral"
  color, // "cyan" | "green" | "red" | "blue" | "yellow" | "pink" | "teal"
}) => {
  const colorMap = {
    cyan: { icon: "rgba(34,211,238,0.12)", text: "#22d3ee", value: "#e6faff" },
    green: { icon: "rgba(52,211,153,0.12)", text: "#34d399", value: "#34d399" },
    red: { icon: "rgba(248,113,113,0.12)", text: "#f87171", value: "#f87171" },
    blue: { icon: "rgba(96,165,250,0.12)", text: "#60a5fa", value: "#60a5fa" },
    yellow: {
      icon: "rgba(250,204,21,0.12)",
      text: "#facc15",
      value: "#facc15",
    },
    pink: { icon: "rgba(232,144,155,0.12)", text: "#e8909b", value: "#e8909b" },
    teal: { icon: "rgba(13,169,212,0.12)", text: "#0da9d4", value: "#0da9d4" },
  };

  const badgeStyle = {
    up: { bg: "rgba(34,211,238,0.1)", color: "#22d3ee" },
    down: { bg: "rgba(183,110,121,0.15)", color: "#e8909b" },
    neutral: { bg: "rgba(255,255,255,0.06)", color: "rgba(230,250,255,0.5)" },
  };

  const c = colorMap[color] || colorMap.cyan;
  const b = badgeStyle[trend] || badgeStyle.neutral;
  const trendIcon =
    trend === "up"
      ? "ti-trending-up"
      : trend === "down"
        ? "ti-trending-down"
        : null;

  return (
    <div
      style={{
        position: "relative",
        background: "rgba(6,22,42,0.85)",
        border: "1px solid rgba(34,211,238,0.12)",
        borderRadius: "16px",
        padding: "18px 18px 16px",
        cursor: "default",
        overflow: "hidden",
        transition: "border-color .25s, transform .2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(34,211,238,0.3)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(34,211,238,0.12)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: c.icon,
          color: c.text,
          fontSize: 17,
          marginBottom: 14,
        }}
      >
        {icon}
      </div>

      {/* Label */}
      <p
        style={{
          fontSize: 11,
          letterSpacing: ".06em",
          textTransform: "uppercase",
          color: "rgba(230,250,255,0.4)",
          marginBottom: 6,
          fontWeight: 500,
        }}
      >
        {label}
      </p>

      {/* Value */}
      <p
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 22,
          fontWeight: 700,
          color: c.value,
          lineHeight: 1,
        }}
      >
        {value}
      </p>

      {/* Badge */}
      {/* {badge && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            marginTop: 10,
            fontSize: 11,
            fontWeight: 500,
            padding: "3px 8px",
            borderRadius: 20,
            background: b.bg,
            color: b.color,
          }}
        >
          {trendIcon && <i className={`ti ${trendIcon}`} aria-hidden="true" />}
          {badge}
        </span>
      )} */}
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const { showLoader, hideLoader } = useAuth();

  const fetchDashboardData = async () => {
    showLoader();
    try {
      const res = await getAdminDashboardData();
      if (res?.success) {
        setData(res?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      hideLoader();
    }
  };

  React.useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen text-white space-y-6">
      {/* 🔥 Header */}
      <div>
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-gray-400">
          Manage users, analytics and system performance
        </p>
      </div>

      {/* 🔥 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={<PeopleIcon />}
          label="Total Users"
          value={data?.totalUsers}
          badge="+8.4%"
          trend="up"
          color="cyan"
        />

        <StatCard
          icon={<PersonCheckIcon />}
          label="Active Users"
          value={data?.activeUsers}
          badge="+3.1%"
          trend="up"
          color="green"
        />

        <StatCard
          icon={<PersonOffIcon />}
          label="Blocked Users"
          value={data?.blockedUsers}
          badge="-0.5%"
          trend="down"
          color="red"
        />

        <StatCard
          icon={<TrendingUpIcon />}
          label="Total Turnover"
          value={`$${data?.totalTurnOver?.toFixed(2)}`}
          badge="All time"
          trend="neutral"
          color="cyan"
        />

        <StatCard
          icon={<CalendarMonthIcon />}
          label="Monthly Turnover"
          value={`$${data?.monthlyTurnOver?.toFixed(2)}`}
          badge="+12.7%"
          trend="up"
          color="blue"
        />

        <StatCard
          icon={<AccountTreeIcon />}
          label="Level Income"
          value={`$${data?.totalLevelIncome?.toFixed(2)}`}
          badge="Level rewards"
          trend="neutral"
          color="yellow"
        />

        <StatCard
          icon={<ShareIcon />}
          label="Referral Income"
          value={`$${data?.totalReferralIncome?.toFixed(2)}`}
          badge="+5.9%"
          trend="up"
          color="green"
        />

        <StatCard
          icon={<AccountBalanceWalletIcon />}
          label="Total Salary"
          value={`$${data?.totalSalary?.toFixed(2)}`}
          badge="Distributed"
          trend="neutral"
          color="teal"
        />

        <StatCard
          icon={<EmojiEventsIcon />}
          label="Rank Income"
          value={`$${data?.totalRankIncome?.toFixed(2)}`}
          badge="+2.3%"
          trend="up"
          color="pink"
        />
      </div>

      {/* 🔥 Main Grid */}
      <div className="">
        {/* 🔥 Recent Users */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-300">
              Recent Users
            </h2>
            <button
              className="text-xs text-blue-400 hover:underline cursor-pointer"
              onClick={() => navigate(AdminRoutes.ALL_USERS)}
            >
              View All
            </button>
          </div>

          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b border-white/10 text-xs uppercase">
              <tr>
                <th className="text-left py-2">Name</th>
                <th className="text-left">Status</th>
                <th className="text-left">Total Investment</th>
                <th className="text-left">Joined</th>
                {/* <th className="text-left"></th> */}
              </tr>
            </thead>

            <tbody>
              {data?.recentUsers?.map((user, i) => (
                <tr
                  key={i}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-3">{maskWalletAddress(user?.userId)}</td>
                  <td>
                    <span
                      className={`px-2 py-1 text-xs rounded bg-${user?.activationDetails?.isActive ? "green" : "red"}-500/10 text-${user?.activationDetails?.isActive ? "green" : "red"}-400`}
                    >
                      {user?.activationDetails?.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>
                  <td>${user?.totalInvestment?.toFixed(2)}</td>
                  <td className="text-gray-400">
                    {new Date(user?.createdAt).toLocaleString()}
                  </td>
                  {/* <td className="text-right">
                    <button className="text-xs text-gray-400 hover:text-white">
                      View
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🔥 System Status */}
        {/* <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
          <h2 className="text-sm font-semibold text-gray-300">
            System Status
          </h2>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Server</span>
            <span className="text-green-400">Online</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Database</span>
            <span className="text-green-400">Healthy</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">API</span>
            <span className="text-yellow-400">Slow</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Errors</span>
            <span className="text-red-400">3 Issues</span>
          </div>
        </div> */}
      </div>

      {/* 🔥 Activity Logs */}
      {/* <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <h2 className="text-sm font-semibold text-gray-300 mb-4">
          Recent Activity
        </h2>

        <ul className="space-y-2 text-sm text-gray-400">
          <li>✔ New user registered</li>
          <li>✔ Payment received</li>
          <li>⚠ API latency increased</li>
          <li>❌ Failed login attempt</li>
        </ul>
      </div> */}
    </div>
  );
};

export default AdminDashboard;
