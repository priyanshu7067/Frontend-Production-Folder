import React, { useEffect, useMemo, useState } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getTradIngHistory } from "../../../apis/user/users.api";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { formatINR } from "../../../utils/helper";

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
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const columns = useMemo(
    () => [
      {
        header: "S.No",
        render: (_, i) => <span className="font-semibold text-slate-600">{i + 1}</span>,
      },
      {
        header: "Trade #",
        render: (row) => (
          <span className="text-sky-600 text-xs font-bold font-mono">
            #{row?.tradeNumber || "N/A"}
          </span>
        ),
      },
      {
        header: "Type",
        render: (row) => (
          <span
            className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
              row?.tradeType === "profit"
                ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                : "bg-rose-100 text-rose-700 border border-rose-200"
            }`}
          >
            {row?.tradeType || "Profit"}
          </span>
        ),
      },
      {
        header: "Trade Capital",
        render: (row) => (
          <span className="text-slate-900 text-xs font-semibold">
            {formatINR(row?.amount || 0)}
          </span>
        ),
      },
      {
        header: "Profit / Yield",
        render: (row) => (
          <span
            className={`text-xs font-bold ${
              Number(row?.income) >= 0 ? "text-emerald-600" : "text-rose-500"
            }`}
          >
            {Number(row?.income) >= 0 ? "+" : ""}
            {formatINR(row?.income || 0)}
          </span>
        ),
      },
      {
        header: "Action",
        render: (row) => (
          <button
            onClick={() => handleView(row?._id)}
            className="text-xs font-semibold px-3 py-1 rounded-lg bg-sky-50 text-sky-600 border border-sky-200 hover:bg-sky-600 hover:text-white transition-colors cursor-pointer"
          >
            Details →
          </button>
        ),
      },
      {
        header: "Date",
        render: (row) => (
          <span className="text-slate-500 text-xs">
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
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          AI Trade Bot History
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor all automated trade executions and daily yield gains.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-3">
        <TableComponent
          columns={columns}
          data={data}
          loading={loading}
          rowsPerPage={8}
          searchable={true}
          emptyMessage="No trade history found"
        />
      </div>
    </div>
  );
};

export default TradeHistory;