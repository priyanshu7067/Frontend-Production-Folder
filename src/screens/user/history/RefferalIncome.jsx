import React, { useEffect, useMemo, useState } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getReferralHistory } from "../../../apis/user/users.api";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { formatINR } from "../../../utils/helper";

const RefferalIncome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showLoader, hideLoader } = useAuth();

  const fetchReferral = async () => {
    showLoader();
    try {
      setLoading(true);
      const res = await getReferralHistory();
      if (res?.success) {
        setData(res?.data || []);
      } else {
        toast.error(res?.message || "Failed to fetch referral income");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  useEffect(() => {
    fetchReferral();
  }, []);

  const columns = useMemo(() => [
    {
      header: "S.No",
      render: (_, i) => <span className="font-semibold text-slate-600">{i + 1}</span>,
    },
    {
      header: "From Member",
      render: (row) => (
        <span className="text-slate-900 text-xs font-mono">
          {row?.fromUser?.userId ? `${row.fromUser.userId.slice(0, 6)}.....${row.fromUser.userId.slice(-4)}` : "N/A"}
        </span>
      ),
    },
    {
      header: "Recipient",
      render: (row) => (
        <span className="text-slate-600 text-xs font-mono">
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
      header: "Commission Rate",
      render: (row) => (
        <span className="text-emerald-700 font-bold text-xs">
          {row?.percentage || 0}%
        </span>
      ),
    },
    {
      header: "Income (INR)",
      render: (row) => (
        <span className="text-emerald-600 font-bold text-sm">
          {formatINR(row?.income || 0)}
        </span>
      ),
    },
    {
      header: "Base Investment",
      render: (row) => (
        <span className="text-slate-700 text-xs font-medium">
          {formatINR(row?.amount || 0)}
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
          Referral Income History
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Direct referral rewards and commission history in INR.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-3">
        <TableComponent
          columns={columns}
          data={data}
          loading={loading}
          rowsPerPage={8}
          searchable={true}
          emptyMessage="No referral income records found"
        />
      </div>
    </div>
  );
};

export default RefferalIncome;