import React, { useMemo, useState, useEffect } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getPromotionHistory } from "../../../apis/user/users.api";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { formatINR } from "../../../utils/helper";

const PromotionIncome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showLoader, hideLoader } = useAuth();

  const fetchPromotionHistory = async () => {
    try {
      showLoader();
      setLoading(true);
      const res = await getPromotionHistory();
      if (res?.success) {
        setData(res?.data || []);
      } else {
        toast.error(res?.message || "Failed to fetch promotion income");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  useEffect(() => {
    fetchPromotionHistory();
  }, []);

  const columns = useMemo(() => [
    {
      header: "S.No",
      render: (_, i) => <span className="font-semibold text-slate-600">{i + 1}</span>,
    },
    {
      header: "Member",
      render: (row) => (
        <span className="text-slate-900 text-xs font-mono">
          {row?.user?.userId ? `${row.user.userId.slice(0, 6)}.....${row.user.userId.slice(-4)}` : "N/A"}
        </span>
      ),
    },
    {
      header: "Level",
      render: (row) => (
        <span className="text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded text-xs font-bold">
          Level {row?.level || 1}
        </span>
      ),
    },
    {
      header: "Reward Amount (INR)",
      render: (row) => (
        <span className="text-emerald-600 font-bold text-sm">
          {formatINR(row?.amount || 0)}
        </span>
      ),
    },
    {
      header: "Qualified Directs",
      render: (row) => (
        <span className="text-slate-700 font-bold text-xs">
          {row?.qualifiedDirects || 0}
        </span>
      ),
    },
    {
      header: "Team Business (INR)",
      render: (row) => (
        <span className="text-sky-600 font-semibold text-xs">
          {formatINR(row?.teamBusiness || 0)}
        </span>
      ),
    },
    {
      header: "Date",
      render: (row) => (
        <span className="text-slate-500 text-xs">
          {row?.createdAt
            ? new Date(row.createdAt).toLocaleDateString("en-IN")
            : "N/A"}
        </span>
      ),
    },
  ], []);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Promotion & Reward Income
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Track rank promotions, milestone bonuses, and team business rewards.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-3">
        <TableComponent
          columns={columns}
          data={data}
          loading={loading}
          rowsPerPage={8}
          searchable={true}
          emptyMessage="No promotion income records found"
        />
      </div>
    </div>
  );
};

export default PromotionIncome;
