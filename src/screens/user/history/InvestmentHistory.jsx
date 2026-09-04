import React, { useEffect, useMemo, useState } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getInvestmentHistory } from "../../../apis/user/users.api";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { formatINR } from "../../../utils/helper";

const InvestmentHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showLoader, hideLoader } = useAuth();

  const fetchHistory = async () => {
    showLoader();
    try {
      setLoading(true);
      const res = await getInvestmentHistory();
      if (res?.success) {
        setData(res?.data || []);
      } else {
        toast.error(res?.message || "Failed to fetch investment history");
      }
    } catch (err) {
      toast.error("Something went wrong");
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
        header: "Transaction Hash",
        render: (row) => (
          <span className="text-slate-600 text-xs font-mono">
            {row?.transactionHash || "N/A"}
          </span>
        ),
      },
      {
        header: "Investment Amount",
        render: (row) => (
          <span className="text-sky-600 text-sm font-bold">
            {formatINR(row?.investment || 0)}
          </span>
        ),
      },
      {
        header: "Investment Date",
        render: (row) => (
          <span className="text-slate-500 text-xs">
            {row?.investmentDate
              ? new Date(row.investmentDate).toLocaleDateString("en-IN")
              : "N/A"}
          </span>
        ),
      },
      {
        header: "Total Return",
        render: (row) => (
          <span className="text-emerald-600 text-xs font-bold">
            {formatINR(row?.returnInvestment || 0)}
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
          Investment History
        </h1>
        <p className="text-xs text-slate-500 mt-1">Track all your active and past INR investments.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-3">
        <TableComponent
          columns={columns}
          data={data}
          loading={loading}
          rowsPerPage={8}
          searchable={true}
          emptyMessage="No investment history found"
        />
      </div>
    </div>
  );
};

export default InvestmentHistory;
