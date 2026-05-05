import React, { useEffect, useMemo, useState } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getLevelncomeHistory } from "../../../apis/user/users.api";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

const LevelIncome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { showLoader, hideLoader } = useAuth();

  // 🔥 FETCH API
  const fetchLevelIncome = async () => {
    showLoader();
    try {
      setLoading(true);

      const res = await getLevelncomeHistory();
      console.log("LEVEL INCOME:", res);

      if (res?.success) {
        setData(res?.data || []);
      } else {
        toast.error(res?.message || "Failed to fetch level income");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  useEffect(() => {
    fetchLevelIncome();
  }, []);

  // 🔥 CORRECT COLUMNS (render use karo)
  const columns = useMemo(() => [
    {
      header: "Level",
      render: (row) => (
        <span className="text-purple-400 text-xs font-semibold">
          Level {row?.level || 0}
        </span>
      ),
    },
    {
      header: "From User",
      render: (row) => (
        <span className="text-white text-sm">
          {row?.fromUser?.userId?.slice(0, 10) || "N/A"}...
        </span>
      ),
    },
    {
      header: "To User",
      render: (row) => (
        <span className="text-gray-400 text-xs">
          {row?.user?.userId?.slice(0, 10) || "N/A"}...
        </span>
      ),
    },
    {
      header: "Income",
      render: (row) => (
        <span className="text-green-400 font-semibold">
          ${Number(row?.income || 0).toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      header: "Amount",
      render: (row) => (
        <span className="text-blue-400 text-xs">
          ${Number(row?.amount || 0).toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      header: "Note",
      render: (row) => (
        <span className="text-gray-300 text-xs">
          {row?.note || "N/A"}
        </span>
      ),
    },
    {
      header: "Date",
      render: (row) => (
        <span className="text-gray-400 text-xs">
          {row?.createdAt
            ? new Date(row.createdAt).toLocaleDateString("en-IN")
            : "N/A"}
        </span>
      ),
    },
  ], []);

  return (
    <div className="dashboard-bg min-h-full p-4 md:p-6 text-white space-y-5">

      {/* HEADER */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold tracking-wide">
          Level Income History
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Track your earnings from referral levels
        </p>
      </div>

      {/* TABLE */}
      <div className="glow-card p-4">
        <TableComponent
          columns={columns}
          data={data}
          loading={loading}
          rowsPerPage={5}
          searchable={true}
          emptyMessage="No income records found"
        />
      </div>

    </div>
  );
};

export default LevelIncome;