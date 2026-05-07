import React, { useEffect, useState } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getMyTeams } from "../../../apis/user/users.api";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

const MyTeams = () => {
  const [levels, setLevels] = useState([]);
  const [openLevel, setOpenLevel] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showLoader, hideLoader } = useAuth();

  // 🔥 FETCH API
  const fetchTeams = async () => {
    showLoader();
    try {
      setLoading(true);

      const res = await getMyTeams();

      if (res?.success) {
        setLevels(res?.data || []);
      } else {
        toast.error(res?.message || "Failed to fetch teams");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // 🔥 USER TABLE (inner table)
  const userColumns = [
    {
      header: "User Wallet",
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-white font-medium">
            {row?.name}
          </span>
          <span className="text-xs text-white">
            {row?.userId?.slice(0,6)}........{row?.userId?.slice(-4)}
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full ${
            row?.isActive
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {row?.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Investment",
      render: (row) => (
        <span className="text-blue-400 text-xs font-semibold">
          ${Number(row?.totalInvestment || 0).toLocaleString("en-IN")}
        </span>
      ),
    },
  ];

  return (
    <div className="dashboard-bg min-h-full md:p-6 text-white space-y-4">

      {/* 🔥 HEADER */}
      <div>
        <h2 className="text-sm md:text-base font-medium tracking-wide">
          My Teams Overview
        </h2>
        <p className="text-xs text-gray-400">
          View your team structure and performance
        </p>
      </div>

      {/* 🔥 LEVEL CARDS */}
      {levels.map((levelData) => (
        <div key={levelData?.level} className="glow-card overflow-hidden">

          {/* 🔥 TOP SUMMARY */}
          <div
            onClick={() =>
              setOpenLevel(
                openLevel === levelData?.level
                  ? null
                  : levelData?.level
              )
            }
            className="
              p-4 cursor-pointer flex justify-between items-center
              hover:bg-white/5 transition
            "
          >
            {/* LEFT */}
            <div>
              <h3 className="text-sm font-semibold text-purple-400">
                Level {levelData?.level}
              </h3>
              <p className="text-xs text-gray-400">
                {levelData?.count} Members
              </p>
            </div>

            {/* RIGHT STATS */}
            <div className="flex gap-6 text-right">

              <div>
                <p className="text-[10px] text-gray-400">Active</p>
                <p className="text-green-400 text-sm font-semibold">
                  {levelData?.activeCount || 0}
                </p>
              </div>

              <div>
                <p className="text-[10px] text-gray-400">Business</p>
                <p className="text-blue-400 text-sm font-semibold">
                  ${Number(levelData?.business || 0).toLocaleString("en-IN")}
                </p>
              </div>

            </div>
          </div>

          {/* 🔥 EXPAND TABLE */}
          {openLevel === levelData?.level && (
            <div className="p-3 border-t border-white/10">
              <TableComponent
                columns={userColumns}
                data={levelData?.users || []}
                emptyMessage="No users in this level"
              />
            </div>
          )}
        </div>
      ))}

      {/* 🔥 EMPTY */}
      {!loading && levels.length === 0 && (
        <div className="text-center text-gray-400 text-sm">
          No team data available
        </div>
      )}

    </div>
  );
};

export default MyTeams;