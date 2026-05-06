import React, { useMemo, useState, useEffect } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getPromotionHistory } from "../../../apis/user/users.api";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
const PromotionIncome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, showLoader, hideLoader } = useAuth();

  const fetchPromotionHistory = async () => {
    try {
      showLoader();
      const res = await getPromotionHistory();
      setLoading(true);
      if (res?.success) {
        setData(res?.data || []);
      }
      else {
        toast.error(res?.message || "Failed to fetch");
      }

    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
      hideLoader();
    }
  }
  useEffect(() => {
    fetchPromotionHistory();
  }, [])

  const columns = useMemo(() => [
    {
      header: "S.No",
      render: (_, i) => i + 1,
    },

    {
      header: "User",
      render: (row) => (
        <span className="text-purple-400 text-xs font-mono">
          {row?.user?.userId?.slice(0, 4)}.....{row?.user?.userId?.slice(32, 36)}
        </span>
      ),
    },
    {
      header: "Level",
      render: (row) => (
        <span className="text-purple-400 text-xs font-semibold">
          Level {row?.level}
        </span>
      ),
    },
    {
      header: "Type",
      render: (row) => (
        <span className="text-gray-400 text-xs font-mono">
          {row?.type}
        </span>
      ),
    },
    {
      header: "Amount",
      render: (row) => (
        <span className="text-green-400 text-sm font-bold">
          ${Number(row?.amount || 0).toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      header: "Qualified Directs",
      render: (row) => (
        <span className="text-teal-400 text-sm font-bold">
          {row?.qualifiedDirects || 0}
        </span>
      ),
    },
    {
      header: "Qualified Team",
      render: (row) => (
        <span className="text-teal-400 text-sm font-bold">
          {row?.qualifiedTeam || 0}
        </span>
      ),
    },
    {
      header: "Required Team Business",
      render: (row) => (
        <span className="text-teal-400 text-sm font-bold">
          {row?.requiredTeamBusiness || 0}
        </span>
      ),
    },
    {
      header: "Team Business",
      render: (row) => (
        <span className="text-blue-400 text-xs font-semibold">
          ${Number(row?.teamBusiness || 0).toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      header: "Date",
      render: (row) => (
        <span className="text-gray-400 text-xs">
          {row?.createdAt
            ? new Date(row.createdAt).toLocaleString("en-IN")
            : "N/A"}
        </span>
      ),
    },
  ], []);

  return (
    <div className="dashboard-bg min-h-full p-4 md:p-6 text-white space-y-4">
      {/* 🔥 HEADER */}
      <div>
        <h2 className="text-sm md:text-base font-medium tracking-wide">
          Promotion Income
        </h2>
        <p className="text-xs text-gray-400">
          Track your rank-based rewards and achievements
        </p>
      </div>

      {/* 🔥 TABLE */}
      <div className="glow-card p-3">
        <TableComponent
          columns={columns}
          data={data}
          rowsPerPage={5}
          searchable={false}
          emptyMessage="No promotion income records"
        />
      </div>
    </div>
  );
};

export default PromotionIncome;
