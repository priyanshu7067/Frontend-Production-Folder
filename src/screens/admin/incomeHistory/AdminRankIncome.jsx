import React, { useEffect, useMemo, useState } from "react";
import TableComponent from "../../../components/ui/TableComponent";
import { getRankIncomeHistory } from "../../../apis/admin/investment.api";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { maskWalletAddress } from "../../../utils/helper";

const AdminRankIncome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showLoader, hideLoader } = useAuth();

  const fetchHistory = async () => {
    showLoader();
    try {
      setLoading(true);

      const res = await getRankIncomeHistory();

      if (res?.success) {
        setData(res?.data?.investments || res?.data || []);
      } else {
        toast.error(res?.message || "Failed to fetch");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
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
        render: (_, i) => i + 1,
      },
      {
        header: "User Wallet",
        render: (row) => (
          <span className="text-gray-300 text-sm font-mono">
            {maskWalletAddress(row?.user?.userId) || "N/A"}
          </span>
        ),
      },
      {
        header: "Current Rank",
        render: (row) => (
          <span className="text-blue-400 text-sm font-medium">
            {row?.currentRank || "N/A"}
          </span>
        ),
      },
      {
        header: "Income",
        render: (row) => (
          <span className="text-green-400 text-sm font-semibold">
            ${Number(row?.income || 0).toLocaleString("en-IN")}
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
    ],
    [],
  );

  return (
    <div className="dashboard-bg min-h-full md:p-6 text-white space-y-4">
      <div>
        <h2 className="text-sm md:text-base font-medium tracking-wide">
          Rank Income History
        </h2>
        <p className="text-xs text-gray-400">
          Track all user rank income history
        </p>
      </div>

      <div className="glow-card p-3">
        <TableComponent
          columns={columns}
          data={data}
          loading={loading}
          rowsPerPage={10}
          searchable={true}
          emptyMessage="No rank history found"
        />
      </div>
    </div>
  );
};

export default AdminRankIncome;
