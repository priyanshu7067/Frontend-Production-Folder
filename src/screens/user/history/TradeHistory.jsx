import React, { useEffect, useMemo, useState } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getTradIngHistory } from "../../../apis/user/users.api";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Authenticated from "../../../navigations/Authenticated";
import { User } from "lucide-react";
import { UserRoutes } from "../../../constants/routes";

const TradeHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showLoader, hideLoader } = useAuth();
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate("/dashboard/aitrade-bot-history-detail", {
      state: { id },
    });
  };

  // 🔥 FETCH API (same pattern)
  const fetchHistory = async () => {
    showLoader();
    try {
      setLoading(true);

      const res = await getTradIngHistory();

      if (res?.success) {
        setData(res?.data || []);
      } else {
        toast.error(res?.message || "Failed to fetch trade history");
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
    fetchHistory();
  }, []);

  // 🔥 COLUMNS (render based like your style)
  const columns = useMemo(
    () => [
      {
        header: "S.No",
        render: (_, i) => i + 1,
      },
      {
        header: "Trade #",
        render: (row) => (
          <span className="text-blue-400 text-xs font-semibold">
            {row?.tradeNumber}
          </span>
        ),
      },
      {
        header: "Type",
        render: (row) => (
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full ${row?.tradeType === "profit"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
              }`}
          >
            {row?.tradeType?.toUpperCase()}
          </span>
        ),
      },
      {
        header: "Amount",
        render: (row) => (
          <span className="text-gray-300 text-xs">
            ${Number(row?.amount || 0).toLocaleString("en-IN")}
          </span>
        ),
      },
      // {
      //   header: "Percentage %",
      //   render: (row) => (
      //     <span className="text-yellow-400 text-xs font-semibold">
      //       {Number(row?.percentage || 0).toFixed(2)}%
      //     </span>
      //   ),
      // },
      {
        header: "P/L",
        render: (row) => (
          <span
            className={`text-xs font-semibold ${Number(row?.income) >= 0
              ? "text-green-400"
              : "text-red-400"
              }`}
          >
            {Number(row?.income) >= 0 ? "+" : ""}
            ${Number(row?.income || 0)}
          </span>
        ),
      },
      {
        header: "Action",
        render: (row) => (
          <button
            onClick={() => handleView(row?._id)}
            className="text-[10px] px-3 py-1 rounded-md bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
          >
            View Details
          </button>
        ),
      },
      {
        header: "Date",
        render: (row) => (
          <span className="text-gray-400 text-xs">
            {row?.tradeDate
              ? new Date(row.tradeDate).toLocaleDateString("en-IN")
              : "N/A"}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div className="dashboard-bg min-h-full md:p-6 text-white space-y-4">

      {/* 🔥 HEADER */}
      <div>
        <h2 className="text-sm md:text-base font-medium tracking-wide">
          Trade History
        </h2>
        <p className="text-xs text-gray-400">
          Monitor all your trading activity and performance
        </p>
      </div>

      {/* 🔥 TABLE */}
      <div className="glow-card p-3">
        <TableComponent
          columns={columns}
          data={data}
          loading={loading}
          rowsPerPage={5}
          searchable={true}
          emptyMessage="No trade history found"
        />
      </div>
    </div>
  );
};

export default TradeHistory;